import Stripe from 'stripe';

// Initialize Stripe with the standard environment variable name.
// This runs on the server, so it does NOT use the VITE_ prefix.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // Ensure the request is a POST request.
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: { message: 'Email is required.' } });
    }

    // 1. Idempotent Customer Creation: Find an existing customer by email
    // or create a new one to avoid duplicates.
    let customer;
    const existingCustomers = await stripe.customers.list({ email: email, limit: 1 });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({ email: email, name: email });
    }

    // 2. Create the Subscription.
    // The price ID comes from your environment variables.
    // 'expand' is crucial to get the full PaymentIntent object back in one call.
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: process.env.VITE_STRIPE_PRICE_ID }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    // 3. Securely get the client_secret from the nested PaymentIntent.
    // This will only exist if the subscription requires a payment.
    const paymentIntent = subscription.latest_invoice.payment_intent;

    if (paymentIntent && paymentIntent.client_secret) {
      // 4. Send the necessary information to the frontend.
      res.status(200).json({
        subscriptionId: subscription.id,
        clientSecret: paymentIntent.client_secret,
        type: 'payment', // Explicitly tell the frontend this is a payment flow.
      });
    } else {
      // This is a critical failure case. It means your Stripe product might be
      // configured as free, or something else is wrong. We must not proceed.
      console.error('Error: Subscription created but no PaymentIntent was found. Check Stripe Price/Product configuration.');
      throw new Error('Could not create a payment for the subscription. Please check your Stripe Price settings.');
    }
  } catch (error) {
    // Catch any errors from the process and return a helpful message.
    console.error('Stripe API Error:', error);
    return res.status(500).json({
      error: {
        message: error.message || 'An internal server error occurred.',
      },
    });
  }
}