// api/create-subscription.js

// Use 'require' as it's the standard for Node.js environments like Vercel Serverless Functions
const Stripe = require('stripe');

// Initialize Stripe with the secret key from environment variables.
// IMPORTANT: In Vercel, server-side environment variables do NOT use the `VITE_` prefix.
// Make sure your variable in the Vercel dashboard is named `STRIPE_SECRET_KEY`.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Your Stripe Price ID for the subscription.
// This should also NOT have the VITE_ prefix in Vercel. Name it `STRIPE_PRICE_ID`.
const priceId = process.env.STRIPE_PRICE_ID;

// Define the handler for the serverless function.
module.exports = async (req, res) => {
  // --- Best Practice: Only allow POST requests ---
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // --- Best Practice: Set CORS headers for security and compatibility ---
  // Replace 'https://www.blockfit.app' with '*' for local testing if needed, but use your domain in production.
  res.setHeader('Access-Control-Allow-Origin', 'https://www.blockfit.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle pre-flight CORS OPTIONS request from the browser
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }
    
    // --- FIX #1: Check for environment variables and provide a clear error if they're missing ---
    if (!priceId || !process.env.STRIPE_SECRET_KEY) {
        throw new Error("Server configuration error: Stripe environment variables are not set.");
    }

    // --- FIX #2: Find or Create customer to prevent duplicates ---
    let customer;
    const customers = await stripe.customers.list({ email: email, limit: 1 });

    if (customers.data.length > 0) {
      // Customer already exists
      customer = customers.data[0];
    } else {
      // If not, create a new customer
      customer = await stripe.customers.create({ 
          email,
          description: 'BlockFit Premium Customer',
      });
    }

    // Create a subscription for the found or new customer
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    // Send the client secret for the payment intent back to the client
    res.status(200).json({
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
    
  } catch (error) {
    console.error('Stripe API Error:', error.message);
    res.status(500).json({ error: { message: `Server error: ${error.message}` } });
  }
};