// /api/stripe-webhook.js
import Stripe from 'stripe';
import admin from 'firebase-admin';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Initialize Firebase Admin if not already initialized
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

// CRITICAL: Disable body parsing to get raw body for Stripe signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to get raw body
async function getRawBody(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

// Helper to find a user in Firestore, trying customerId first then email as a fallback.
const findUserInFirestore = async (customerId, customerEmail) => {
    if (!customerId) return null;

    // 1. Try to find user by their Stripe Customer ID (most reliable)
    let query = db.collection('users').where('stripeCustomerId', '==', customerId).limit(1);
    let snapshot = await query.get();

    // 2. If not found, fall back to searching by email
    if (snapshot.empty && customerEmail) {
        console.log(`Webhook: User not found by stripeCustomerId. Falling back to email: ${customerEmail}`);
        query = db.collection('users').where('email', '==', customerEmail).limit(1);
        snapshot = await query.get();
    }

    if (snapshot.empty) {
        console.log(`Webhook: User not found for customer ${customerId} after trying ID and email.`);
        return null;
    }

    return snapshot.docs[0];
};


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const rawBody = await getRawBody(req);
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      if (!sig || !webhookSecret) {
        return res.status(400).send('Webhook secret not found.');
      }
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
      console.log(`Webhook received: ${event.type}`);
    } catch (err) {
      console.log(`❌ Error message: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    try {
        switch (event.type) {
            case 'customer.subscription.created':
            case 'customer.subscription.updated': {
                const subscription = event.data.object;
                const customerId = subscription.customer;
                const customer = await stripe.customers.retrieve(customerId);

                const userDoc = await findUserInFirestore(customerId, customer.email);
                if (userDoc) {
                    const updateData = {
                        subscriptionId: subscription.id,
                        subscriptionStatus: subscription.status,
                        subscriptionPriceId: subscription.items.data[0]?.price?.id || null,
                        subscriptionCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
                        subscriptionCancelAtPeriodEnd: subscription.cancel_at_period_end,
                        isPremium: subscription.status === 'active' || subscription.status === 'trialing',
                    };
                    await userDoc.ref.update(updateData);
                    console.log(`Updated user ${userDoc.id} for subscription ${event.type}`);
                }
                break;
            }
            case 'customer.subscription.deleted': {
                const subscription = event.data.object;
                const customerId = subscription.customer;
                const customer = await stripe.customers.retrieve(customerId);

                const userDoc = await findUserInFirestore(customerId, customer.email);
                if (userDoc) {
                    await userDoc.ref.update({
                        subscriptionStatus: 'canceled',
                        isPremium: false,
                        subscriptionEndDate: admin.firestore.FieldValue.serverTimestamp(),
                        subscriptionCancelAtPeriodEnd: false,
                    });
                    console.log(`Canceled subscription for user ${userDoc.id}`);
                }
                break;
            }
            // You can add other cases like 'invoice.payment_failed' here if needed
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }
    } catch (error) {
        console.error('Error processing webhook event:', error);
        // Return 200 to acknowledge receipt and prevent retries, even if our processing fails.
        return res.status(200).json({ received: true, error: 'Internal processing error.' });
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}