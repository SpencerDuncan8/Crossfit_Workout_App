// api/create-customer-portal.js

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Add CORS headers for cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { customerId } = req.body;

    console.log('Creating customer portal for:', customerId);

    if (!customerId) {
      return res.status(400).json({ error: 'Customer ID is required' });
    }

    // Verify the customer exists
    try {
      await stripe.customers.retrieve(customerId);
    } catch (customerError) {
      console.error('Customer not found:', customerError);
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Create the customer portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      // Use SITE_URL (without VITE_ prefix) for server-side environment variables
      return_url: process.env.SITE_URL || process.env.VERCEL_URL || 'https://blockfit.app',
    });

    console.log('Portal session created:', portalSession.id);

    res.status(200).json({ url: portalSession.url });

  } catch (error) {
    console.error('Error creating customer portal:', error);
    
    // Return more specific error information
    res.status(500).json({ 
      error: 'Failed to create customer portal session',
      details: error.message 
    });
  }
}