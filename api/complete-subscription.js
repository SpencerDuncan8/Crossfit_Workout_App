// api/complete-subscription.js

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
    const { customerId, paymentMethodId, userEmail } = req.body;

    if (!customerId || !paymentMethodId) {
      return res.status(400).json({ 
        error: { message: 'Customer ID and Payment Method ID are required.' } 
      });
    }

    console.log('Creating subscription for customer:', customerId);
    console.log('Payment method:', paymentMethodId);

    // Set the payment method as default for the customer
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId
      }
    });

    // Create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: process.env.STRIPE_PRICE_ID }],
      default_payment_method: paymentMethodId,
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        userEmail: userEmail,
        premiumUser: 'true'
      }
    });

    console.log('Subscription created:', subscription.id);
    console.log('Status:', subscription.status);

    // If not active, try to pay the invoice
    if (subscription.latest_invoice && subscription.status === 'incomplete') {
      const invoiceId = typeof subscription.latest_invoice === 'string'
        ? subscription.latest_invoice
        : subscription.latest_invoice.id;

      try {
        await stripe.invoices.pay(invoiceId);

        // FIX: Refetch the subscription to get its final state after payment
        const updatedSubscription = await stripe.subscriptions.retrieve(subscription.id);

        return res.status(200).json({
          success: true,
          subscription: updatedSubscription // FIX: Return the full, updated object
        });
      } catch (payError) {
        console.error('Error paying invoice:', payError);
        await stripe.subscriptions.cancel(subscription.id);
        return res.status(400).json({ 
          error: { message: 'Payment failed. Please check your payment method and try again.' }
        });
      }
    }

    // FIX: This now handles the 'active' case and any other successful statuses.
    // It returns the full subscription object every time.
    return res.status(200).json({
      success: true,
      subscription: subscription
    });

  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({ error: { message: error.message } });
  }
}