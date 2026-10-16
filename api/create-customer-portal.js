// /api/create-customer-portal.js

import { createHandler, requireString } from '../server/http.js';
import { stripe, assertCustomerOwnedBy } from '../server/stripeHelpers.js';

export default createHandler(async (req, res) => {
  const customerId = requireString(req.body.customerId, 'Customer ID');

  // Only the owner of this billing account can open its portal.
  await assertCustomerOwnedBy(customerId, req.user);

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    // Use SITE_URL (without VITE_ prefix) for server-side environment variables
    return_url: process.env.SITE_URL || process.env.VERCEL_URL || 'https://blockfit.app',
  });

  res.status(200).json({ url: portalSession.url });
});