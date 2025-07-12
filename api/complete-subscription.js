// api/complete-subscription.js

import Stripe from 'stripe';
import admin from 'firebase-admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method Not Allowed' } });
  }

  try {
    const { uid, email, customerId, paymentMethodId } = req.body;

    if (!uid || !email || !customerId || !paymentMethodId) {
      return res.status(400).json({ error: { message: 'Missing required parameters.' } });
    }

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: process.env.STRIPE_PRICE_ID }],
      default_payment_method: paymentMethodId,
      metadata: { uid: uid }
    });

    const userDocRef = db.collection('users').doc(uid);

    // --- THE FINAL FIX IS HERE ---
    // Add a check to ensure `current_period_end` is a valid number before converting.
    const periodEndTimestamp = 
      typeof subscription.current_period_end === 'number'
        ? admin.firestore.Timestamp.fromMillis(subscription.current_period_end * 1000)
        : null;

    await userDocRef.set({
        email: email,
        stripeCustomerId: customerId,
        subscriptionId: subscription.id,
        subscriptionStatus: subscription.status,
        subscriptionPriceId: subscription.items.data[0]?.price?.id || null,
        subscriptionCurrentPeriodEnd: periodEndTimestamp, // Use the validated timestamp or null
        subscriptionCancelAtPeriodEnd: subscription.cancel_at_period_end,
        isPremium: true,
    }, { merge: true });

    console.log(`Firestore document created/updated for user ${uid}`);

    return res.status(200).json({
      success: true,
      subscription: subscription
    });
    
  } catch (error) {
    console.error('Error in complete-subscription:', error);
    return res.status(500).json({ error: { message: error.message } });
  }
}