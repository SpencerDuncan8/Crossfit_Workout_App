// api/stripe-webhook.js
// Fixed version for Vercel webhook handling

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  console.log('=== WEBHOOK START ===');
  console.log('Method:', req.method);
  console.log('Timestamp:', new Date().toISOString());
  
  if (req.method !== 'POST') {
    console.log('Method not allowed');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('=== PROCESSING WEBHOOK ===');
    
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    console.log('Signature exists:', !!sig);
    console.log('Webhook secret exists:', !!webhookSecret);

    if (!webhookSecret) {
      console.error('Missing webhook secret');
      return res.status(500).json({ error: 'Webhook secret not configured' });
    }

    if (!sig) {
      console.error('Missing Stripe signature');
      return res.status(400).json({ error: 'Missing Stripe signature' });
    }

    // Handle body - Vercel provides raw string for webhooks when bodyParser is disabled
    const body = req.body;
    console.log('Body type:', typeof body);
    console.log('Body length:', body?.length || 'undefined');

    let event;
    try {
      // Stripe expects raw body as string or buffer
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
      console.log('✅ Signature verified successfully!');
      console.log('Event type:', event.type);
      console.log('Event ID:', event.id);
    } catch (err) {
      console.error('❌ Signature verification failed:', err.message);
      console.error('Webhook secret starts with:', webhookSecret.substring(0, 7));
      console.error('Body preview:', typeof body === 'string' ? body.substring(0, 100) : 'Not a string');
      
      return res.status(400).json({ 
        error: 'Webhook signature verification failed',
        details: err.message
      });
    }

    // Process the event
    console.log('🎉 Processing event:', event.type);
    
    switch (event.type) {
      case 'customer.subscription.created':
        console.log('📝 Subscription created:', event.data.object.id);
        console.log('📝 Customer:', event.data.object.customer);
        break;
        
      case 'customer.subscription.updated':
        console.log('📝 Subscription updated:', event.data.object.id);
        console.log('📝 Status:', event.data.object.status);
        break;
        
      case 'customer.subscription.deleted':
        console.log('📝 Subscription cancelled:', event.data.object.id);
        console.log('📝 Customer:', event.data.object.customer);
        break;
        
      default:
        console.log('📝 Unhandled event type:', event.type);
    }

    console.log('✅ Webhook processed successfully');
    res.status(200).json({ 
      received: true, 
      eventType: event.type,
      message: 'Webhook processed successfully'
    });

  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    console.error('❌ Stack:', error.stack);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}

// CRITICAL: Disable bodyParser so Vercel sends raw body for signature verification
export const config = {
  api: {
    bodyParser: false, // This is the key fix!
  },
}