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

    // Find or Create customer
    let customer;
    const customers = await stripe.customers.list({ email: email, limit: 1 });
    if (customers.data.length > 0) {
      customer = customers.data[0];
      console.log('Found existing customer:', customer.id);
    } else {
      customer = await stripe.customers.create({ email, description: 'BlockFit Premium Customer' });
      console.log('Created new customer:', customer.id);
    }

    // Check for existing active subscription
    const activeSubscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'active',
      limit: 1
    });

    if (activeSubscriptions.data.length > 0) {
      console.log('Customer already has active subscription');
      return res.status(400).json({ 
        error: { message: 'You already have an active subscription.' } 
      });
    }

    // Check for existing incomplete subscription with a usable payment intent
    const incompleteSubscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'incomplete',
      limit: 1,
      expand: ['data.latest_invoice.payment_intent']
    });

    if (incompleteSubscriptions.data.length > 0) {
      const existingSub = incompleteSubscriptions.data[0];
      console.log('Found existing incomplete subscription:', existingSub.id);
      
      // Check if it has a usable payment intent
      if (existingSub.latest_invoice?.payment_intent?.client_secret &&
          existingSub.latest_invoice.payment_intent.status === 'requires_payment_method') {
        console.log('Reusing existing subscription payment intent');
        return res.status(200).json({
          clientSecret: existingSub.latest_invoice.payment_intent.client_secret,
          subscriptionId: existingSub.id,
          type: 'payment'
        });
      }
      
      // Cancel the unusable incomplete subscription
      console.log('Canceling unusable incomplete subscription');
      await stripe.subscriptions.cancel(existingSub.id);
    }

    // Create new subscription - let Stripe handle payment intent creation
    console.log('Creating new subscription...');
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription',
        payment_method_types: ['card']
      },
      expand: ['latest_invoice.payment_intent']
    });

    console.log('Subscription created:', subscription.id);
    console.log('Invoice status:', subscription.latest_invoice?.status);
    console.log('Payment intent status:', subscription.latest_invoice?.payment_intent?.status);

    // Verify we have a payment intent
    if (!subscription.latest_invoice?.payment_intent?.client_secret) {
      console.error('No payment intent created with subscription');
      
      // Try to finalize the invoice to force payment intent creation
      if (subscription.latest_invoice?.status === 'draft') {
        console.log('Finalizing draft invoice...');
        const finalizedInvoice = await stripe.invoices.finalizeInvoice(
          subscription.latest_invoice.id
        );
        
        // Retrieve the subscription again with payment intent
        const updatedSub = await stripe.subscriptions.retrieve(
          subscription.id,
          { expand: ['latest_invoice.payment_intent'] }
        );
        
        if (updatedSub.latest_invoice?.payment_intent?.client_secret) {
          return res.status(200).json({
            clientSecret: updatedSub.latest_invoice.payment_intent.client_secret,
            subscriptionId: subscription.id,
            type: 'payment'
          });
        }
      }
      
      // If still no payment intent, something is wrong
      throw new Error('Failed to create payment intent for subscription');
    }

    return res.status(200).json({
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      subscriptionId: subscription.id,
      type: 'payment'
    });
    
  } catch (error) {
    console.error('Stripe API Error:', error.message);
    return res.status(500).json({ error: { message: `Server error: ${error.message}` } });
  }
}