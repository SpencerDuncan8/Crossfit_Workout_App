// api/stripe-webhook.js
// Temporary version without Firebase Admin to test basic functionality

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  console.log('=== WEBHOOK START ===');
  
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Environment check:');
    console.log('STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY);
    console.log('STRIPE_WEBHOOK_SECRET exists:', !!process.env.STRIPE_WEBHOOK_SECRET);

    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error('Missing STRIPE_WEBHOOK_SECRET');
      return res.status(500).json({ error: 'Webhook secret not configured' });
    }

    if (!sig) {
      console.log('No stripe signature - manual test');
      return res.status(200).json({ 
        message: 'Webhook endpoint working!',
        note: 'Firebase integration temporarily disabled for testing'
      });
    }

    // Verify webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      console.log('✅ Webhook signature verified:', event.type);
    } catch (err) {
      console.error('❌ Webhook signature verification failed:', err.message);
      return res.status(400).json({ error: `Webhook Error: ${err.message}` });
    }

    // Log the event but don't update Firebase yet
    console.log('📝 Received event:', event.type);
    console.log('📝 Customer ID:', event.data.object.customer);
    
    // TODO: Add Firebase Admin update here once we fix the configuration
    console.log('⏳ Would update user premium status here (Firebase disabled for testing)');

    res.status(200).json({ 
      received: true, 
      eventType: event.type,
      message: 'Event logged successfully (Firebase update disabled for testing)'
    });

  } catch (error) {
    console.error('❌ Webhook error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Webhook processing failed',
      details: error.message 
    });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}