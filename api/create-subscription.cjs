// api/create-subscription.js

const Stripe = require('stripe');

const SCRIPT_VERSION = "1.4_ULTIMATE_DEBUG";

module.exports = async (req, res) => {
  console.log(`[${SCRIPT_VERSION}] Function invoked. Method: ${req.method}`);
  
  res.setHeader('Access-Control-Allow-Origin', 'https://www.blockfit.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    console.log(`[${SCRIPT_VERSION}] Responding to OPTIONS preflight.`);
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method Not Allowed' }, version: SCRIPT_VERSION });
  }

  try {
    console.log(`[${SCRIPT_VERSION}] STEP 1: Checking environment variables.`);
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const priceId = process.env.STRIPE_PRICE_ID;

    if (!stripeSecretKey || !priceId) {
      console.error(`[${SCRIPT_VERSION}] FATAL: Environment variables are missing.`);
      console.error(`[${SCRIPT_VERSION}] STRIPE_SECRET_KEY is set: ${!!stripeSecretKey}`);
      console.error(`[${SCRIPT_VERSION}] STRIPE_PRICE_ID is set: ${!!priceId}`);
      return res.status(500).json({ error: { message: "Server payment configuration is incomplete." }, version: SCRIPT_VERSION });
    }
    console.log(`[${SCRIPT_VERSION}] STEP 1 PASSED: Variables appear to be set.`);

    console.log(`[${SCRIPT_VERSION}] STEP 2: Initializing Stripe SDK.`);
    const stripe = new Stripe(stripeSecretKey);
    console.log(`[${SCRIPT_VERSION}] STEP 2 PASSED: Stripe SDK initialized.`);

    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: { message: 'Email is required.' }, version: SCRIPT_VERSION });
    }
    console.log(`[${SCRIPT_VERSION}] Received email: ${email}`);

    console.log(`[${SCRIPT_VERSION}] STEP 3: Finding or creating customer.`);
    let customer;
    const customers = await stripe.customers.list({ email: email, limit: 1 });
    if (customers.data.length > 0) {
      customer = customers.data[0];
      console.log(`[${SCRIPT_VERSION}] Found existing customer: ${customer.id}`);
    } else {
      customer = await stripe.customers.create({ email, description: 'BlockFit Premium Customer' });
      console.log(`[${SCRIPT_VERSION}] Created new customer: ${customer.id}`);
    }
    console.log(`[${SCRIPT_VERSION}] STEP 3 PASSED: Customer handling complete.`);

    console.log(`[${SCRIPT_VERSION}] STEP 4: Creating subscription with Price ID: ${priceId}`);
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });
    console.log(`[${SCRIPT_VERSION}] STEP 4 PASSED: Subscription created successfully.`);

    return res.status(200).json({
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      version: SCRIPT_VERSION,
    });
    
  } catch (error) {
    console.error(`[${SCRIPT_VERSION}] --- CATCH BLOCK ERROR ---`);
    console.error(error); // Log the full error object from Stripe
    return res.status(500).json({ error: { message: `Server error: ${error.message}` }, version: SCRIPT_VERSION });
  }
};