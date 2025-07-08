// api/stripe-webhook.js
// Debug version to identify signature verification issue

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  console.log('=== WEBHOOK DEBUG START ===');
  console.log('Method:', req.method);
  console.log('Headers:', Object.keys(req.headers));
  
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('=== ENVIRONMENT CHECK ===');
    console.log('STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY);
    console.log('STRIPE_SECRET_KEY starts with:', process.env.STRIPE_SECRET_KEY?.substring(0, 7));
    console.log('STRIPE_WEBHOOK_SECRET exists:', !!process.env.STRIPE_WEBHOOK_SECRET);
    console.log('STRIPE_WEBHOOK_SECRET starts with:', process.env.STRIPE_WEBHOOK_SECRET?.substring(0, 7));

    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    console.log('=== SIGNATURE CHECK ===');
    console.log('Stripe signature header exists:', !!sig);
    console.log('Webhook secret configured:', !!webhookSecret);

    if (!webhookSecret) {
      console.error('❌ Missing STRIPE_WEBHOOK_SECRET');
      return res.status(500).json({ error: 'Webhook secret not configured' });
    }

    if (!sig) {
      console.log('ℹ️ No stripe signature - manual test');
      return res.status(200).json({ 
        message: 'Webhook endpoint working!',
        note: 'No Stripe signature found - this is a manual test'
      });
    }

    // Try to verify webhook signature with detailed error logging
    let event;
    try {
      console.log('🔍 Attempting signature verification...');
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      console.log('✅ Webhook signature verified successfully!');
      console.log('📝 Event type:', event.type);
      console.log('📝 Event ID:', event.id);
    } catch (err) {
      console.error('❌ SIGNATURE VERIFICATION FAILED');
      console.error('Error name:', err.name);
      console.error('Error message:', err.message);
      console.error('Error code:', err.code);
      console.error('Webhook secret length:', webhookSecret.length);
      console.error('Signature header length:', sig.length);
      
      // Return detailed error for debugging
      return res.status(400).json({ 
        error: 'Webhook signature verification failed',
        details: err.message,
        debugInfo: {
          webhookSecretLength: webhookSecret.length,
          signatureHeaderLength: sig.length,
          webhookSecretPrefix: webhookSecret.substring(0, 7)
        }
      });
    }

    // If we get here, signature verification succeeded
    console.log('🎉 Processing webhook event:', event.type);
    
    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object;
      console.log('📞 Subscription cancelled:', subscription.id);
      console.log('👤 Customer ID:', subscription.customer);
      console.log('⏳ Would update user premium status (Firebase disabled for testing)');
    }

    res.status(200).json({ 
      received: true, 
      eventType: event.type,
      eventId: event.id,
      message: 'Webhook processed successfully!'
    });

  } catch (error) {
    console.error('❌ UNEXPECTED ERROR');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    res.status(500).json({ 
      error: 'Webhook processing failed',
      details: error.message,
      errorType: error.constructor.name
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