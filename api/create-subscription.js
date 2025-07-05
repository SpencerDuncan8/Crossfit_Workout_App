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

    console.log('Creating subscription for customer:', customer.id);

    // Create the subscription - using different parameters to ensure payment intent creation
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent', 'pending_setup_intent'],
      payment_settings: { 
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription' 
      },
    });

    console.log('Subscription created:', subscription.id);
    console.log('Subscription status:', subscription.status);
    console.log('Latest invoice:', subscription.latest_invoice?.id);
    console.log('Payment intent on invoice:', !!subscription.latest_invoice?.payment_intent);
    console.log('Pending setup intent:', !!subscription.pending_setup_intent);

    // First, check if there's a payment intent on the invoice
    if (subscription.latest_invoice?.payment_intent?.client_secret) {
      console.log('Using payment intent from invoice');
      return res.status(200).json({
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        subscriptionId: subscription.id,
        type: 'payment'
      });
    }

    // Check if there's a pending setup intent (for $0 invoices or trials)
    if (subscription.pending_setup_intent?.client_secret) {
      console.log('Using pending setup intent from subscription');
      return res.status(200).json({
        clientSecret: subscription.pending_setup_intent.client_secret,
        subscriptionId: subscription.id,
        type: 'setup'
      });
    }

    // If we have an invoice but no payment intent, we need to handle it
    if (subscription.latest_invoice) {
      const invoiceId = typeof subscription.latest_invoice === 'string' 
        ? subscription.latest_invoice 
        : subscription.latest_invoice.id;

      console.log('Retrieving invoice details...');
      const invoice = await stripe.invoices.retrieve(invoiceId);

      console.log('Invoice details:');
      console.log('- Status:', invoice.status);
      console.log('- Amount due:', invoice.amount_due);
      console.log('- Collection method:', invoice.collection_method);
      console.log('- Billing reason:', invoice.billing_reason);

      // For invoices with amount due, manually create the payment flow
      if (invoice.amount_due > 0 && invoice.status === 'open') {
        console.log('Creating payment intent for invoice manually...');

        // Create a payment intent directly
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

        // Update the invoice to use this payment intent
        await stripe.invoices.update(invoiceId, {
          default_payment_method: paymentIntent.payment_method,
        });

        return res.status(200).json({
          clientSecret: paymentIntent.client_secret,
          subscriptionId: subscription.id,
          type: 'payment'
        });
      }
    }

    // Final fallback: Create a SetupIntent
    console.log('Creating SetupIntent as final fallback...');
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
    console.error('Full error:', error);
    return res.status(500).json({ error: { message: `Server error: ${error.message}` } });
  }
}