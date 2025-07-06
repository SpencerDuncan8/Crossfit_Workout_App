// /api/create-subscription.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: { message: 'Email is required.' } });
  }

  try {
    // Step 1: Find or Create a Stripe Customer with the user's email
    let customer;
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
      console.log(`Found existing customer: ${customer.id}`);
    } else {
      customer = await stripe.customers.create({ email: email });
      console.log(`Created new customer: ${customer.id}`);
    }

    // Step 2: Create a SetupIntent. This is used to securely save a
    // payment method for future use without making an immediate charge.
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      payment_method_types: ['card'],
    });
    
    console.log(`Created SetupIntent for customer ${customer.id}`);

    // Step 3: Send the client secret and customer ID back to the frontend.
    // The client secret is what allows the PaymentElement to render securely.
    res.status(200).json({
      clientSecret: setupIntent.client_secret,
      customerId: customer.id,
    });

  } catch (error) {
    console.error('Stripe API Error in /api/create-subscription:', error.message);
    // IMPORTANT: Always return a JSON error object
    return res.status(500).json({ error: { message: error.message } });
  }
}