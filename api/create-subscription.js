// api/create-subscription.js
// Alternative approach: Create SetupIntent first, then subscription after payment method is saved

import Stripe from 'stripe';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://www.blockfit.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method Not Allowed' } });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: { message: 'Email is required.' } });
    }

    // Find or create customer
    let customer;
    const customers = await stripe.customers.list({ email, limit: 1 });
    
    if (customers.data.length > 0) {
      customer = customers.data[0];
      console.log('Found existing customer:', customer.id);
      
      // Check if already subscribed
      const activeSubs = await stripe.subscriptions.list({
        customer: customer.id,
        status: 'active',
        limit: 1
      });
      
      if (activeSubs.data.length > 0) {
        return res.status(400).json({ 
          error: { message: 'You already have an active subscription.' } 
        });
      }
    } else {
      customer = await stripe.customers.create({ 
        email, 
        description: 'BlockFit Premium Customer' 
      });
      console.log('Created customer:', customer.id);
    }

    // Create a SetupIntent to collect payment method
    console.log('Creating SetupIntent...');
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      payment_method_types: ['card'],
      usage: 'off_session',
      metadata: {
        price_id: process.env.STRIPE_PRICE_ID,
        subscription_pending: 'true'
      }
    });

    console.log('SetupIntent created:', setupIntent.id);

    return res.status(200).json({
      clientSecret: setupIntent.client_secret,
      customerId: customer.id,
      type: 'setup'
    });
    
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ error: { message: error.message } });
  }
}