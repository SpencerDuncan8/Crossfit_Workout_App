// /api/stripe-webhook.js
import Stripe from 'stripe';
import admin from 'firebase-admin';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}
const db = admin.firestore();

// Disable Vercel's default body parser to access the raw request body
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to read the raw body from the request
async function getRawBody(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

// Helper to find the user document in Firestore using their Stripe Customer ID
const findUserInFirestore = async (customerId) => {
    if (!customerId) return null;
    const query = db.collection('users').where('stripeCustomerId', '==', customerId).limit(1);
    const snapshot = await query.get();
    if (snapshot.empty) {
        console.log(`Webhook: User not found by stripeCustomerId: ${customerId}.`);
        return null;
    }
    return snapshot.docs[0];
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const rawBody = await getRawBody(req);
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    const subscription = event.data.object;
    const customerId = subscription.customer;
    const userDoc = await findUserInFirestore(customerId);

    if (!userDoc) {
        return res.status(200).json({ received: true, message: `User not found for customer ${customerId}, but webhook acknowledged.` });
    }

    const userId = userDoc.id;

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const periodEndSeconds = subscription.items.data[0]?.current_period_end;
        
        const periodEndTimestamp = typeof periodEndSeconds === 'number'
          ? admin.firestore.Timestamp.fromMillis(periodEndSeconds * 1000)
          : null;

        const updateData = {
          subscriptionId: subscription.id,
          subscriptionStatus: subscription.status,
          subscriptionPriceId: subscription.items.data[0]?.price?.id,
          subscriptionCurrentPeriodEnd: periodEndTimestamp,
          // THIS IS THE CORRECTED LINE: It now correctly syncs the cancellation status
          subscriptionCancelAtPeriodEnd: subscription.cancel_at_period_end,
          isPremium: subscription.status === 'active' || subscription.status === 'trialing',
        };
        
        console.log(`Attempting to update user ${userId} with data:`, JSON.stringify(updateData));
        await userDoc.ref.update(updateData);
        console.log(`Successfully processed [${event.type}] for user ${userId}`);
        break;
      }
      case 'customer.subscription.deleted': {
        const updateData = {
            subscriptionStatus: 'canceled',
            isPremium: false,
            subscriptionEndDate: admin.firestore.FieldValue.serverTimestamp(),
            // Ensure this is reset when the subscription is fully deleted
            subscriptionCancelAtPeriodEnd: false, 
        };

        console.log(`Attempting to cancel subscription for user ${userId} with data:`, JSON.stringify(updateData));
        await userDoc.ref.update(updateData);
        console.log(`Successfully processed [customer.subscription.deleted] for user ${userId}. Premium access revoked.`);
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    res.status(200).json({ received: true });
  } catch (error) {
    console.error(`Error processing webhook for event ${event.type}:`, error);
    res.status(500).json({ error: `Internal server error while processing webhook: ${error.message}` });
  }
}