// /api/reactivate-subscription.js

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
    const { uid, customerId } = req.body;

    if (!uid || !customerId) {
      return res.status(400).json({ error: { message: 'User ID and Customer ID are required.' } });
    }

    // 1. Retrieve the customer to find their default payment method
    const customer = await stripe.customers.retrieve(customerId);
    const defaultPaymentMethod = customer.invoice_settings?.default_payment_method;

    if (!defaultPaymentMethod) {
      return res.status(400).json({ 
        error: { 
          message: 'No default payment method found on file. Please add a payment method via the customer portal.',
          code: 'NO_PAYMENT_METHOD' 
        } 
      });
    }

    // 2. Create a new subscription using the default payment method
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: process.env.STRIPE_PRICE_ID }],
      default_payment_method: defaultPaymentMethod,
      metadata: { uid: uid }
    });
    
    // 3. Update the user's document in Firestore with the new subscription details
    const userDocRef = db.collection('users').doc(uid);
    const periodEndTimestamp = typeof subscription.current_period_end === 'number'
      ? admin.firestore.Timestamp.fromMillis(subscription.current_period_end * 1000)
      : null;

    await userDocRef.update({
      isPremium: true,
      subscriptionId: subscription.id,
      subscriptionStatus: subscription.status,
      subscriptionPriceId: subscription.items.data[0]?.price?.id,
      subscriptionCurrentPeriodEnd: periodEndTimestamp,
      subscriptionCancelAtPeriodEnd: subscription.cancel_at_period_end,
      subscriptionEndDate: null, // Clear any old end date
    });

    console.log(`Successfully reactivated subscription for user ${uid}`);

    return res.status(200).json({ success: true, subscriptionId: subscription.id });

  } catch (error) {
    console.error('Reactivation Error:', error);
    return res.status(500).json({ error: { message: error.message } });
  }
}