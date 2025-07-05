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

    // Create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    console.log('Subscription created:', subscription.id);
    console.log('Invoice amount due:', subscription.latest_invoice?.amount_due);

    let clientSecret;

    // Check if there's a payment intent on the invoice
    if (subscription.latest_invoice?.payment_intent?.client_secret) {
      clientSecret = subscription.latest_invoice.payment_intent.client_secret;
      console.log('Using payment intent from invoice');
    } else {
      // No payment intent - create a SetupIntent instead
      console.log('Creating SetupIntent for future payments');
      
      const setupIntent = await stripe.setupIntents.create({
        customer: customer.id,
        payment_method_types: ['card'],
        usage: 'off_session',
        metadata: {
          subscription_id: subscription.id
        }
      });

      clientSecret = setupIntent.client_secret;
    }

    return res.status(200).json({
      clientSecret: clientSecret,
      subscriptionId: subscription.id,
      type: clientSecret.startsWith('seti_') ? 'setup' : 'payment'
    });
    
  } catch (error) {
    console.error('Stripe API Error:', error.message);
    return res.status(500).json({ error: { message: `Server error: ${error.message}` } });
  }
}