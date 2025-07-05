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
      console.log('Found existing customer:', customer.id);
    } else {
      customer = await stripe.customers.create({ email, description: 'BlockFit Premium Customer' });
      console.log('Created new customer:', customer.id);
    }

    // Check for existing incomplete subscriptions to avoid duplicates
    const existingSubscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: 'incomplete',
      limit: 10
    });

    console.log('Found', existingSubscriptions.data.length, 'incomplete subscriptions');

    // Try to reuse an existing incomplete subscription with a payment intent
    for (const subscription of existingSubscriptions.data) {
      if (subscription.latest_invoice) {
        const invoice = await stripe.invoices.retrieve(
          subscription.latest_invoice,
          { expand: ['payment_intent'] }
        );
        
        // Check if this subscription has a valid payment intent we can use
        if (invoice.payment_intent?.status === 'requires_payment_method' && 
            invoice.payment_intent?.client_secret) {
          console.log('Reusing existing subscription:', subscription.id);
          return res.status(200).json({
            clientSecret: invoice.payment_intent.client_secret,
            subscriptionId: subscription.id,
            type: 'payment'
          });
        }
      }
    }

    // Cancel all incomplete subscriptions before creating a new one
    for (const subscription of existingSubscriptions.data) {
      console.log('Canceling incomplete subscription:', subscription.id);
      await stripe.subscriptions.cancel(subscription.id);
    }

    // Create a new subscription
    console.log('Creating new subscription for customer:', customer.id);
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
      payment_settings: { 
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription' 
      },
    });

    console.log('Subscription created:', subscription.id);
    console.log('Subscription status:', subscription.status);

    // Check if payment intent was created
    if (subscription.latest_invoice?.payment_intent?.client_secret) {
      console.log('Payment intent created with subscription');
      return res.status(200).json({
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        subscriptionId: subscription.id,
        type: 'payment'
      });
    }

    // If no payment intent on invoice, manually create one
    if (subscription.latest_invoice) {
      const invoiceId = typeof subscription.latest_invoice === 'string' 
        ? subscription.latest_invoice 
        : subscription.latest_invoice.id;
        
      const invoice = await stripe.invoices.retrieve(invoiceId);
      
      if (invoice.amount_due > 0 && !invoice.payment_intent) {
        console.log('Creating payment intent for invoice...');
        
        // Create a payment intent for this invoice
        const paymentIntent = await stripe.paymentIntents.create({
          amount: invoice.amount_due,
          currency: invoice.currency,
          customer: customer.id,
          metadata: {
            subscription_id: subscription.id,
            invoice_id: invoice.id
          },
          automatic_payment_methods: {
            enabled: true,
          },
        });
        
        console.log('Created payment intent:', paymentIntent.id);
        
        return res.status(200).json({
          clientSecret: paymentIntent.client_secret,
          subscriptionId: subscription.id,
          type: 'payment'
        });
      }
    }

    // This shouldn't happen, but handle it gracefully
    console.error('Failed to create payment intent');
    return res.status(500).json({ 
      error: { message: 'Failed to create payment session. Please try again.' } 
    });
    
  } catch (error) {
    console.error('Stripe API Error:', error.message);
    return res.status(500).json({ error: { message: `Server error: ${error.message}` } });
  }
}