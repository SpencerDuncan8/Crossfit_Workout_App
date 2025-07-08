// api/create-customer-portal.js

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { customerId } = req.body;

    if (!customerId) {
      return res.status(400).json({ error: 'Customer ID is required' });
    }

    // Create the customer portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.VITE_SITE_URL || 'https://your-domain.com'}`, // Return to your app
    });

    res.status(200).json({ url: portalSession.url });

  } catch (error) {
    console.error('Error creating customer portal:', error);
    res.status(500).json({ error: 'Failed to create customer portal session' });
  }
}