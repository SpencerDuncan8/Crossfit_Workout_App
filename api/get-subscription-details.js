// api/get-subscription-details.js

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { customerId } = req.body;

    if (!customerId) {
      return res.status(400).json({ error: 'Customer ID is required' });
    }

    console.log('Fetching subscriptions for customer:', customerId);

    // Get all subscriptions for this customer
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'all',
      limit: 1
    });

    if (subscriptions.data.length === 0) {
      return res.status(404).json({ error: 'No subscriptions found' });
    }

    const subscription = subscriptions.data[0];
    console.log('Found subscription:', subscription.id);

    // Return subscription details
    return res.status(200).json({
      subscriptionId: subscription.id,
      subscriptionStatus: subscription.status,
      subscriptionPriceId: subscription.items.data[0]?.price?.id || null,
      subscriptionCurrentPeriodEnd: subscription.current_period_end,
      subscriptionCancelAtPeriodEnd: subscription.cancel_at_period_end,
      isPremium: subscription.status === 'active' || subscription.status === 'trialing'
    });

  } catch (error) {
    console.error('Error fetching subscription:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch subscription details',
      details: error.message 
    });
  }
}