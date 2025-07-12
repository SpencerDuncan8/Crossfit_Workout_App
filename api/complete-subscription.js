// /api/complete-subscription.js

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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method Not Allowed' } });
  }

  try {
    const { uid, email, customerId, paymentMethodId } = req.body;

    if (!uid || !email || !customerId || !paymentMethodId) {
      return res.status(400).json({ error: { message: 'Missing required parameters.' } });
    }

    // Create the Stripe subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: process.env.STRIPE_PRICE_ID }],
      default_payment_method: paymentMethodId,
      metadata: { uid: uid } // Store uid in metadata for future reference
    });

    // Directly access the Firestore document using the UID from the client
    const userDocRef = db.collection('users').doc(uid);

    // Get the period end date from the correct location: inside the first subscription item
    const periodEndSeconds = subscription.items.data[0]?.current_period_end;

    // Safely create the Firestore Timestamp object
    const periodEndTimestamp = 
      typeof periodEndSeconds === 'number'
        ? admin.firestore.Timestamp.fromMillis(periodEndSeconds * 1000)
        : null;

    // Log a critical error if the date is still not found
    if (!periodEndTimestamp) {
        console.error('CRITICAL: Could not find current_period_end in subscription items. Full object:', JSON.stringify(subscription, null, 2));
    }

    // Set the complete user data in Firestore
    await userDocRef.set({
        email: email,
        stripeCustomerId: customerId,
        subscriptionId: subscription.id,
        subscriptionStatus: subscription.status,
        subscriptionPriceId: subscription.items.data[0]?.price?.id || null,
        subscriptionCurrentPeriodEnd: periodEndTimestamp, // Use the validated timestamp
        subscriptionCancelAtPeriodEnd: subscription.cancel_at_period_end,
        isPremium: true,
    }, { merge: true }); // Use merge:true to be safe

    console.log(`Firestore document created/updated for user ${uid}`);

    // Return the full subscription object to the client
    return res.status(200).json({
      success: true,
      subscription: subscription
    });
    
  } catch (error) {
    console.error('Error in complete-subscription:', error);
    return res.status(500).json({ error: { message: error.message } });
  }
}