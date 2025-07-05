import Stripe from 'stripe';

// Initializes with the SECRET key (no prefix)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

    let customer;
    const existingCustomers = await stripe.customers.list({ email: email, limit: 1 });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({ email: email, name: email });
    }

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      // Uses the PRICE ID (no prefix)
      items: [{ price: process.env.STRIPE_PRICE_ID }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    const paymentIntent = subscription.latest_invoice.payment_intent;

    if (paymentIntent && paymentIntent.client_secret) {
      res.status(200).json({
        subscriptionId: subscription.id,
        clientSecret: paymentIntent.client_secret,
        type: 'payment',
      });
    } else {
      console.error('Error: Subscription created but no PaymentIntent was found. Check Stripe Price/Product configuration.');
      throw new Error('Could not create a payment for the subscription. Please check your Stripe Price settings.');
    }
  } catch (error) {
    console.error('Stripe API Error:', error);
    return res.status(500).json({
      error: {
        message: error.message || 'An internal server error occurred.',
      },
    });
  }
}