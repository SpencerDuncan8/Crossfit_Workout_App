// api/create-subscription.js

import Stripe from 'stripe';

// --- MODIFIED: Use the variable with the VITE_ prefix ---
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const customer = await stripe.customers.create({
      email: email,
      description: 'BlockFit Premium Customer',
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      // --- MODIFIED: Use the variable with the VITE_ prefix ---
      items: [{ price: process.env.VITE_STRIPE_PRICE_ID }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    res.status(200).json({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    console.error('Stripe API Error:', error.message);
    res.status(500).json({ error: { message: error.message } });
  }
}