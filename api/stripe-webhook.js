// api/stripe-webhook.js
// Version with raw body handling for Vercel

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Log EVERYTHING first, before any processing
  console.log('=== WEBHOOK ENTRY POINT ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Headers present:', Object.keys(req.headers).join(', '));
  
  try {
    if (req.method !== 'POST') {
      console.log('Non-POST request - returning 405');
      return res.status(405).json({ error: 'Method not allowed' });
    }

    console.log('=== POST REQUEST PROCESSING ===');
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Content-Length:', req.headers['content-length']);
    console.log('Stripe-Signature present:', !!req.headers['stripe-signature']);
    
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    console.log('=== ENVIRONMENT VARIABLES ===');
    console.log('STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY);
    console.log('STRIPE_WEBHOOK_SECRET exists:', !!webhookSecret);
    
    if (!webhookSecret) {
      console.error('Missing webhook secret');
      return res.status(500).json({ error: 'Webhook secret not configured' });
    }

    if (!sig) {
      console.log('No Stripe signature found');
      return res.status(400).json({ error: 'No Stripe signature' });
    }

    console.log('=== BODY PROCESSING ===');
    
    // Get raw body - Vercel should provide this as req.body for webhooks
    let body;
    if (Buffer.isBuffer(req.body)) {
      body = req.body;
      console.log('Body is Buffer, length:', body.length);
    } else if (typeof req.body === 'string') {
      body = Buffer.from(req.body, 'utf8');
      console.log('Body is string, converted to Buffer, length:', body.length);
    } else {
      body = Buffer.from(JSON.stringify(req.body), 'utf8');
      console.log('Body is object, stringified and converted, length:', body.length);
    }

    console.log('=== SIGNATURE VERIFICATION ===');
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
      console.log('✅ Signature verification successful!');
      console.log('Event type:', event.type);
      console.log('Event ID:', event.id);
    } catch (err) {
      console.error('❌ Signature verification failed:');
      console.error('Error message:', err.message);
      console.error('Error type:', err.constructor.name);
      console.error('Webhook secret prefix:', webhookSecret.substring(0, 10) + '...');
      console.error('Signature prefix:', sig.substring(0, 20) + '...');
      console.error('Body length:', body.length);
      
      return res.status(400).json({ 
        error: 'Webhook signature verification failed',
        details: err.message
      });
    }

    console.log('=== EVENT PROCESSING ===');
    console.log('Processing event:', event.type);

    // Handle different event types
    switch (event.type) {
      case 'customer.subscription.deleted':
        console.log('🔴 Subscription cancelled:', event.data.object.id);
        console.log('Customer ID:', event.data.object.customer);
        break;
      case 'customer.subscription.updated':
        console.log('🔄 Subscription updated:', event.data.object.id);
        console.log('Status:', event.data.object.status);
        break;
      default:
        console.log('ℹ️ Unhandled event type:', event.type);
    }

    console.log('=== SUCCESSFUL COMPLETION ===');
    res.status(200).json({ 
      received: true,
      eventType: event.type,
      processed: true
    });

  } catch (error) {
    console.error('=== FATAL ERROR ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message
    });
  }
}

// Critical: Configure Vercel to send raw body for webhook signature verification
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}