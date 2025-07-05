// api/create-subscription.js

const Stripe = require('stripe');

// Use the correct, non-prefixed environment variable names for the server.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const priceId = process.env.STRIPE_PRICE_ID;

module.exports = async (req, res) => {
  // Set CORS headers for every response.
  // This allows your Vercel-hosted frontend to communicate with this function.
  res.setHeader('Access-Control-Allow-Origin', 'https://www.blockfit.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // --- THIS IS THE CRITICAL FIX ---
  // Handle the browser's preflight OPTIONS request first.
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Now, ensure the method is POST for all other requests.
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: { message: 'Email is required.' } });
    }
    
    if (!priceId || !process.env.STRIPE_SECRET_KEY) {
      console.error("Server configuration error: Stripe environment variables are not set.");
      return res.status(500).json({ error: { message: "Payment system is not configured correctly. Please contact support." } });
    }

    // Find or Create a customer to prevent duplicates
    let customer;
    const customers = await stripe.customers.list({ email: email, limit: 1 });
    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({ email, description: 'BlockFit Premium Customer' });
    }

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    res.status(200).json({
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
    
  } catch (error) {
    console.error('Stripe API Error:', error.message);
    res.status(500).json({ error: { message: `Server error: ${error.message}` } });
  }
};