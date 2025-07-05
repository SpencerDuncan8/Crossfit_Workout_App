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

    // Create the subscription with immediate billing
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
      collection_method: 'charge_automatically',
      trial_end: 'now' // This forces immediate billing
    });

    console.log('Subscription created:', subscription.id);
    console.log('Subscription status:', subscription.status);
    console.log('Invoice amount due:', subscription.latest_invoice?.amount_due);

    // Check if payment intent exists
    if (subscription.latest_invoice?.payment_intent?.client_secret) {
      console.log('Payment intent found on invoice');
      return res.status(200).json({
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        subscriptionId: subscription.id,
        type: 'payment'
      });
    }

    // If no payment intent, try to finalize the invoice
    if (subscription.latest_invoice && !subscription.latest_invoice.payment_intent) {
      console.log('No payment intent found, finalizing invoice...');
      
      try {
        // Finalize the invoice to create payment intent
        const finalizedInvoice = await stripe.invoices.finalizeInvoice(subscription.latest_invoice.id);
        
        // Retrieve the subscription again with expanded payment intent
        const updatedSubscription = await stripe.subscriptions.retrieve(subscription.id, {
          expand: ['latest_invoice.payment_intent']
        });
        
        if (updatedSubscription.latest_invoice?.payment_intent?.client_secret) {
          return res.status(200).json({
            clientSecret: updatedSubscription.latest_invoice.payment_intent.client_secret,
            subscriptionId: subscription.id,
            type: 'payment'
          });
        }
      } catch (finalizeError) {
        console.error('Error finalizing invoice:', finalizeError);
      }
    }

    // Fallback: Create a SetupIntent if we still don't have a payment intent
    console.log('Creating SetupIntent as fallback...');
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      payment_method_types: ['card'],
      usage: 'off_session',
      metadata: {
        subscription_id: subscription.id
      }
    });

    return res.status(200).json({
      clientSecret: setupIntent.client_secret,
      subscriptionId: subscription.id,
      type: 'setup'
    });
    
  } catch (error) {
    console.error('Stripe API Error:', error.message);
    console.error('Error type:', error.type);
    console.error('Error code:', error.code);
    return res.status(500).json({ error: { message: `Server error: ${error.message}` } });
  }
}