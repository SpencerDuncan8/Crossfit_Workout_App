// /api/reactivate-subscription.js

import { admin, db } from '../server/firebaseAdmin.js';
import { createHandler, HttpError, requireString } from '../server/http.js';
import { stripe, assertCustomerOwnedBy } from '../server/stripeHelpers.js';

export default createHandler(async (req, res) => {
  const { uid } = req.user; // from the verified login token
  const customerId = requireString(req.body.customerId, 'Customer ID');

  // 1. The customer must belong to the signed-in user.
  const customer = await assertCustomerOwnedBy(customerId, req.user);

  const existing = await stripe.subscriptions.list({ customer: customerId, status: 'active', limit: 1 });
  if (existing.data.length > 0) {
    throw new HttpError(400, 'You already have an active subscription.');
  }

  // 2. Find their default payment method.
  const defaultPaymentMethod = customer.invoice_settings?.default_payment_method;
  if (!defaultPaymentMethod) {
    throw new HttpError(
      400,
      'No default payment method found on file. Please add a payment method via the customer portal.',
      { code: 'NO_PAYMENT_METHOD' }
    );
  }

  // 3. Create the new subscription.
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: process.env.STRIPE_PRICE_ID }],
    default_payment_method: defaultPaymentMethod,
    metadata: { uid },
  });

  // 4. Save the new subscription details.
  const periodEndSeconds = subscription.items.data[0]?.current_period_end ?? subscription.current_period_end;
  const periodEndTimestamp = typeof periodEndSeconds === 'number'
    ? admin.firestore.Timestamp.fromMillis(periodEndSeconds * 1000)
    : null;

  await db.collection('users').doc(uid).set({
    isPremium: true,
    stripeCustomerId: customerId,
    subscriptionId: subscription.id,
    subscriptionStatus: subscription.status,
    subscriptionPriceId: subscription.items.data[0]?.price?.id || null,
    subscriptionCurrentPeriodEnd: periodEndTimestamp,
    subscriptionCancelAtPeriodEnd: subscription.cancel_at_period_end,
    subscriptionEndDate: null,
  }, { merge: true });

  console.log(`Successfully reactivated subscription for user ${uid}`);
  return res.status(200).json({ success: true, subscriptionId: subscription.id });
}, { errorShape: 'object' });