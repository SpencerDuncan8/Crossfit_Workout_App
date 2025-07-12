// api/complete-subscription.js

import Stripe from 'stripe';
import admin from 'firebase-admin';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Initialize Firebase Admin (this is safe; it won't re-initialize)
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
const authAdmin = admin.auth();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method Not Allowed' } });
  }

  try {
    const { customerId, paymentMethodId, userEmail } = req.body;

    if (!customerId || !paymentMethodId || !userEmail) {
      return res.status(400).json({ error: { message: 'Customer ID, Payment Method, and Email are required.' } });
    }

    // Create the Stripe subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: process.env.STRIPE_PRICE_ID }],
      default_payment_method: paymentMethodId,
      expand: ['latest_invoice.payment_intent'],
      metadata: { userEmail: userEmail }
    });

    // --- NEW CRITICAL LOGIC ---
    // Find the user in Firebase Auth by their email to get their UID.
    // This assumes the user has just been created by the client-side `createUserWithEmailAndPassword`.
    const userRecord = await authAdmin.getUserByEmail(userEmail);
    const uid = userRecord.uid;

    if (!uid) {
        throw new Error("Could not find Firebase user by email to update Firestore.");
    }
    
    // Create the initial Firestore document with subscription data.
    // This happens *before* the webhook arrives, solving the race condition.
    const userDocRef = doc(db, 'users', uid);
    await setDoc(userDocRef, {
        email: userEmail,
        stripeCustomerId: customerId,
        subscriptionId: subscription.id,
        subscriptionStatus: subscription.status,
        subscriptionPriceId: subscription.items.data[0]?.price?.id || null,
        subscriptionCurrentPeriodEnd: Timestamp.fromMillis(subscription.current_period_end * 1000),
        subscriptionCancelAtPeriodEnd: subscription.cancel_at_period_end,
        isPremium: true,
    }, { merge: true }); // Use merge:true to avoid overwriting other data

    console.log(`Initial Firestore doc created for user ${uid}`);

    return res.status(200).json({
      success: true,
      subscription: subscription
    });
    
  } catch (error) {
    console.error('Error in complete-subscription:', error);
    return res.status(500).json({ error: { message: error.message } });
  }
}