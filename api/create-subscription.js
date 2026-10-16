// /api/create-subscription.js
// Step 1 of signup: create a SetupIntent so the card can be collected.
// This runs BEFORE the Firebase account exists, so it cannot require a login.
// The money-moving step (complete-subscription) does require one.

import { createHandler, HttpError } from '../server/http.js';
import { stripe } from '../server/stripeHelpers.js';

export default createHandler(async (req, res) => {
  const email = typeof req.body.email === 'string' ? req.body.email.trim() : '';
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new HttpError(400, 'A valid email is required.');
  }

  // Find or create customer
  let customer;
  const customers = await stripe.customers.list({ email, limit: 1 });

  if (customers.data.length > 0) {
    customer = customers.data[0];

    const activeSubs = await stripe.subscriptions.list({ customer: customer.id, status: 'active', limit: 1 });
    if (activeSubs.data.length > 0) {
      throw new HttpError(400, 'You already have an active subscription.');
    }
  } else {
    customer = await stripe.customers.create({ email, description: 'BlockFit Premium Customer' });
  }

  const setupIntent = await stripe.setupIntents.create({
    customer: customer.id,
    payment_method_types: ['card'],
    usage: 'off_session',
    metadata: { price_id: process.env.STRIPE_PRICE_ID, subscription_pending: 'true' },
  });

  return res.status(200).json({
    clientSecret: setupIntent.client_secret,
    customerId: customer.id,
    type: 'setup',
  });
}, { auth: false, errorShape: 'object' });