// api/create-subscription.js

import Stripe from 'stripe';

export default async function handler(req, res) {
  // Set CORS headers for every response
  res.setHeader('Access-Control-Allow-Origin', 'https://www.blockfit.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle the browser's preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Ensure the method is POST for all other requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: { message: 'Method Not Allowed' } });
  }

  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const priceId = process.env.STRIPE_PRICE_ID;

    if (!stripeSecretKey || !priceId) {
      console.error("Server configuration error: Stripe environment variables are missing.");
      return res.status(500).json({ error: { message: "Payment system is not configured correctly. Please contact support." } });
    }
    
    const stripe = new Stripe(stripeSecretKey);

    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: { message: 'Email is required.' } });
    }

    // Find or Create customer to prevent duplicates
    let customer;
    const customers = await stripe.customers.list({ email: email, limit: 1 });
    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({ email, description: 'BlockFit Premium Customer' });
    }

    // Create the subscription with expand to get all necessary objects
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent', 'latest_invoice'],
    });

    // Debug logging
    console.log('Subscription created:', subscription.id);
    console.log('Subscription status:', subscription.status);
    console.log('Latest invoice exists:', !!subscription.latest_invoice);
    console.log('Latest invoice object type:', typeof subscription.latest_invoice);
    
    // Handle the case where latest_invoice might be a string ID instead of an object
    let invoice = subscription.latest_invoice;
    if (typeof invoice === 'string') {
      console.log('Fetching invoice separately:', invoice);
      invoice = await stripe.invoices.retrieve(invoice, {
        expand: ['payment_intent']
      });
    }

    // Check if payment_intent exists
    if (!invoice || !invoice.payment_intent || !invoice.payment_intent.client_secret) {
      console.error('Payment intent issue:', {
        invoice_exists: !!invoice,
        payment_intent_exists: !!invoice?.payment_intent,
        client_secret_exists: !!invoice?.payment_intent?.client_secret,
        invoice_status: invoice?.status,
        payment_intent_status: invoice?.payment_intent?.status
      });

      // Try to finalize the invoice if it's in draft status
      if (invoice && invoice.status === 'draft') {
        console.log('Finalizing draft invoice...');
        invoice = await stripe.invoices.finalizeInvoice(invoice.id, {
          expand: ['payment_intent']
        });
      }

      // Final check after potential finalization
      if (!invoice?.payment_intent?.client_secret) {
        return res.status(500).json({ 
          error: { 
            message: 'Failed to create payment session. Please contact support.',
            details: process.env.NODE_ENV === 'development' ? {
              invoice_status: invoice?.status,
              payment_intent_exists: !!invoice?.payment_intent
            } : undefined
          } 
        });
      }
    }

    return res.status(200).json({
      clientSecret: invoice.payment_intent.client_secret,
    });
    
  } catch (error) {
    console.error('Stripe API Error:', error.message);
    console.error('Error type:', error.type);
    console.error('Error code:', error.code);
    return res.status(500).json({ error: { message: `Server error: ${error.message}` } });
  }
}