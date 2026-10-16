// /api/complete-subscription.js

import { admin, db } from '../server/firebaseAdmin.js';
import { createHandler, HttpError, requireString } from '../server/http.js';
import { stripe, assertCustomerOwnedBy } from '../server/stripeHelpers.js';

export default createHandler(async (req, res) => {
  // Who is subscribing comes from the verified login token, never from the request body.
  const { uid, email } = req.user;
  if (!email) throw new HttpError(400, 'Your account has no email address.');

  const customerId = requireString(req.body.customerId, 'Customer ID');
  const paymentMethodId = requireString(req.body.paymentMethodId, 'Payment method');

  // The Stripe customer and the saved card must both belong to this user.
  await assertCustomerOwnedBy(customerId, req.user);
  const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
  if (paymentMethod.customer !== customerId) {
    throw new HttpError(403, 'That payment method does not belong to your account.');
  }

  // Don't let a double-click (or a replay) create a second subscription.
  const existing = await stripe.subscriptions.list({ customer: customerId, status: 'active', limit: 1 });
  if (existing.data.length > 0) {
    throw new HttpError(400, 'You already have an active subscription.');
  }

  // Tag the customer with this user so future billing calls can prove ownership.
  await stripe.customers.update(customerId, { metadata: { uid } });

  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: process.env.STRIPE_PRICE_ID }],
    default_payment_method: paymentMethodId,
    metadata: { uid },
  });

  const periodEndSeconds = subscription.items.data[0]?.current_period_end;
  const periodEndTimestamp = typeof periodEndSeconds === 'number'
    ? admin.firestore.Timestamp.fromMillis(periodEndSeconds * 1000)
    : null;

  if (!periodEndTimestamp) {
    console.error('CRITICAL: Could not find current_period_end in subscription items. Full object:', JSON.stringify(subscription, null, 2));
  }

  await db.collection('users').doc(uid).set({
    email,
    stripeCustomerId: customerId,
    subscriptionId: subscription.id,
    subscriptionStatus: subscription.status,
    subscriptionPriceId: subscription.items.data[0]?.price?.id || null,
    subscriptionCurrentPeriodEnd: periodEndTimestamp,
    subscriptionCancelAtPeriodEnd: subscription.cancel_at_period_end,
    isPremium: true,
  }, { merge: true });

  console.log(`Firestore document created/updated for user ${uid}`);

  return res.status(200).json({ success: true, subscription });
}, { errorShape: 'object' });