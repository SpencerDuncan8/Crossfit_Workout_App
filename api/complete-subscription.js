// /api/complete-subscription.js

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
    // Step 1: Retrieve the PaymentMethod to access the name from billing_details
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    const customerName = paymentMethod.billing_details.name;

    // Step 2: Update the Stripe Customer with the new name (if it was provided)
    if (customerName) {
      await stripe.customers.update(customerId, {
        name: customerName,
      });
      console.log(`Updated customer ${customerId} name to: ${customerName}`);
    }

    // Step 3: Attach the payment method to the customer and set it as the default
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Step 4: Create the subscription
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: process.env.STRIPE_PRICE_ID, // Ensure this env var is set in Vercel
        },
      ],
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
    console.error('Stripe API Error in /api/complete-subscription:', error.message);
    return res.status(500).json({ error: { message: error.message } });
  }
}