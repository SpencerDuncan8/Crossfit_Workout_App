// api/stripe-webhook.js

import Stripe from 'stripe';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { credential } from 'firebase-admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Initialize Firebase Admin (only if not already initialized)
if (!getApps().length) {
  initializeApp({
    credential: credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = getFirestore();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('Missing STRIPE_WEBHOOK_SECRET environment variable');
    return res.status(500).json({ error: 'Webhook secret not configured' });
  }

  let event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    console.log('✅ Webhook signature verified:', event.type);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  try {
    // Handle the event
    switch (event.type) {
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}

async function handleSubscriptionCreated(subscription) {
  console.log('🎉 Subscription created:', subscription.id);
  await updateUserPremiumStatus(subscription.customer, true, 'subscription_created');
}

async function handleSubscriptionUpdated(subscription) {
  console.log('🔄 Subscription updated:', subscription.id, 'Status:', subscription.status);
  
  const isPremium = subscription.status === 'active';
  await updateUserPremiumStatus(subscription.customer, isPremium, `subscription_${subscription.status}`);
}

async function handleSubscriptionDeleted(subscription) {
  console.log('❌ Subscription cancelled:', subscription.id);
  await updateUserPremiumStatus(subscription.customer, false, 'subscription_cancelled');
}

async function handlePaymentSucceeded(invoice) {
  if (invoice.subscription) {
    console.log('💳 Payment succeeded for subscription:', invoice.subscription);
    await updateUserPremiumStatus(invoice.customer, true, 'payment_succeeded');
  }
}

async function handlePaymentFailed(invoice) {
  if (invoice.subscription) {
    console.log('💳❌ Payment failed for subscription:', invoice.subscription);
    // Don't immediately downgrade on first payment failure
    // Stripe will retry payments and eventually cancel subscription if they keep failing
    console.log('Payment failed - waiting for subscription cancellation before downgrading');
  }
}

async function updateUserPremiumStatus(stripeCustomerId, isPremium, reason) {
  try {
    console.log(`🔍 Searching for user with Stripe customer ID: ${stripeCustomerId}`);
    
    // Query Firestore to find user with this Stripe customer ID
    const usersRef = db.collection('users');
    const query = usersRef.where('stripeCustomerId', '==', stripeCustomerId);
    const snapshot = await query.get();

    if (snapshot.empty) {
      console.error('❌ No user found with Stripe customer ID:', stripeCustomerId);
      return;
    }

    // Update each user found (should be only one)
    const batch = db.batch();
    let userCount = 0;

    snapshot.forEach((doc) => {
      console.log(`📝 Updating user ${doc.id}: isPremium = ${isPremium} (${reason})`);
      batch.update(doc.ref, { 
        isPremium: isPremium,
        lastUpdated: new Date(),
        lastUpdateReason: reason
      });
      userCount++;
    });

    await batch.commit();
    console.log(`✅ Successfully updated ${userCount} user(s) premium status`);

  } catch (error) {
    console.error('❌ Error updating user premium status:', error);
    throw error;
  }
}

// Vercel requires this for proper body parsing
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}