import Stripe from 'stripe';

// Initialize Stripe with your secret key from environment variables
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: { message: 'Email is required.' } });
    }

    // 1. Find an existing customer or create a new one.
    let customer;
    const existingCustomers = await stripe.customers.list({ email: email, limit: 1 });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({ email: email, name: email });
    }

    // 2. Create the subscription.
    // Ensure your STRIPE_PRICE_ID is set in your Vercel environment variables.
    // It looks like `price_...` in your Stripe Dashboard.
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: process.env.VITE_STRIPE_PRICE_ID }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'], // This is crucial!
    });

    // 3. Check for the Payment Intent and send its client_secret to the frontend.
    const paymentIntent = subscription.latest_invoice.payment_intent;

    if (paymentIntent) {
      res.status(200).json({
        subscriptionId: subscription.id,
        clientSecret: paymentIntent.client_secret,
        type: 'payment', // Explicitly tell the frontend this is a PaymentIntent
      });
    } else {
      // This path indicates a configuration error (e.g., a free trial on the price)
      // Throwing an error is better than silently failing payment.
      console.error('Subscription created without a PaymentIntent for a paid plan.');
      throw new Error('Could not create payment for subscription. Please check Stripe configuration.');
    }
  } catch (error) {
    console.error('Stripe API Error:', error.message);
    return res.status(500).json({
      error: {
        message: 'Failed to initialize payment session. ' + error.message,
      },
    });
  }
}