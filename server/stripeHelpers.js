// server/stripeHelpers.js

import Stripe from 'stripe';
import { HttpError } from './http.js';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Makes sure the Stripe customer really belongs to the signed-in user.
// Newer customers carry metadata.uid; older ones are matched by the email they signed up with.
export const assertCustomerOwnedBy = async (customerId, user) => {
  if (typeof customerId !== 'string' || !customerId.startsWith('cus_')) {
    throw new HttpError(400, 'A valid customer ID is required.');
  }
  let customer;
  try {
    customer = await stripe.customers.retrieve(customerId);
  } catch {
    throw new HttpError(404, 'Customer not found.');
  }
  if (!customer || customer.deleted) throw new HttpError(404, 'Customer not found.');

  const ownerUid = customer.metadata?.uid;
  const sameEmail = !!customer.email && !!user.email &&
    customer.email.toLowerCase() === user.email.toLowerCase();

  if (ownerUid ? ownerUid !== user.uid : !sameEmail) {
    throw new HttpError(403, 'That billing account does not belong to you.');
  }
  return customer;
};