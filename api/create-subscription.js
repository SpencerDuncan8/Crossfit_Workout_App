// api/create-subscription.js

// This imports the Stripe library and initializes it with your secret key.
// process.env.STRIPE_SECRET_KEY is automatically populated by Vercel/Replit.
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// This is the main function that will be executed when the endpoint is called.
export default async function handler(req, res) {
  // We only want to handle POST requests for creating a subscription.
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // 1. Create a new Customer in Stripe.
    // This allows you to view their payment methods and subscriptions in the Stripe dashboard.
    const customer = await stripe.customers.create({
      email: email,
      description: 'BlockFit Premium Customer',
    });

    // 2. Create the Subscription.
    // We link it to the customer we just created and specify the price ID for the plan.
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: process.env.STRIPE_PRICE_ID }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    // 3. Send the client secret back to the frontend.
    // The client secret is a temporary, safe key that allows the frontend to securely
    // complete the payment for this specific subscription attempt.
    res.status(200).json({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
  } catch (error) {
    console.error('Stripe API Error:', error);
    // Send a generic error message back to the frontend.
    return res.status(500).json({ error: { message: error.message } });
  }
}