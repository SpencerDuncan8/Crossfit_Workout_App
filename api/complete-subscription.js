// /api/complete-subscription.js

// This is a Vercel Serverless Function.
// It assumes you have `stripe` installed as a dependency.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { customerId, paymentMethodId } = req.body;

  if (!customerId || !paymentMethodId) {
    return res.status(400).json({ error: { message: 'Missing customerId or paymentMethodId.' } });
  }

  try {
    // --- Step 1: Get the customer name from the payment method details ---
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    const customerName = paymentMethod.billing_details.name;

    // --- Step 2: Update the Stripe Customer with the new name (if provided) ---
    if (customerName) {
      await stripe.customers.update(customerId, {
        name: customerName,
      });
      console.log(`Updated customer ${customerId} name to: ${customerName}`);
    }

    // --- Step 3: Attach the payment method and set it as default ---
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // --- Step 4: Create the subscription ---
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          // IMPORTANT: Replace with your actual Price ID from your Stripe Dashboard
          // or set it as an environment variable STRIPE_PRICE_ID
          price: process.env.STRIPE_PRICE_ID,
        },
      ],
      // This helps handle payments that require 3D Secure or other authentication steps
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    console.log(`Subscription ${subscription.id} created for customer ${customerId}.`);

    res.status(200).json({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    console.error('Stripe API Error:', error.message);
    return res.status(500).json({ error: { message: error.message } });
  }
}