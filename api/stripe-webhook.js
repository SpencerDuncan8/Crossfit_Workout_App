// /api/stripe-webhook.js
import Stripe from 'stripe';
import admin from 'firebase-admin';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

// CRITICAL: Disable body parsing to get raw body for Stripe signature verification
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

// Helper function to get raw body without micro package
async function getRawBody(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

// Helper function to set CORS headers
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, stripe-signature'
  );
}

export default async function handler(req, res) {
  // Log incoming request for debugging
  console.log(`[${new Date().toISOString()}] Webhook endpoint hit`);
  console.log('Method:', req.method);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  
  // Set CORS headers for all requests
  setCorsHeaders(res);

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS preflight request');
    return res.status(200).end();
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    console.log(`Method ${req.method} not allowed`);
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: `Received ${req.method} request, only POST is accepted`
    });
  }

  // Get Stripe signature from headers
  const sig = req.headers['stripe-signature'];
  
  if (!sig) {
    console.error('No stripe-signature header found');
    return res.status(400).json({ 
      error: 'Missing stripe-signature header',
      headers: Object.keys(req.headers)
    });
  }

  let event;
  let rawBody;

  try {
    // Get the raw body using our custom function
    rawBody = await getRawBody(req);
    console.log('Raw body received, length:', rawBody.length);
    
    // Verify webhook signature and construct event
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
    console.log('Webhook signature verified successfully');
    console.log('Event type:', event.type);
    console.log('Event ID:', event.id);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    console.error('Error type:', err.type);
    console.error('Webhook secret starts with:', process.env.STRIPE_WEBHOOK_SECRET?.substring(0, 10));
    
    return res.status(400).json({ 
      error: `Webhook Error: ${err.message}`,
      type: err.type
    });
  }

  // Handle different event types
  try {
    switch (event.type) {
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;
        
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;
        
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;
        
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;
        
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;
        
      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    // Log successful processing
    console.log(`Successfully processed ${event.type} event`);
    
    // Return success response
    return res.status(200).json({ 
      received: true,
      type: event.type,
      processed: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error processing webhook:', error);
    console.error('Error stack:', error.stack);
    
    // Return 200 to acknowledge receipt even if processing failed
    // This prevents Stripe from retrying
    return res.status(200).json({ 
      received: true,
      error: 'Processing failed but webhook acknowledged',
      message: error.message
    });
  }
}

// Handler functions for different event types
async function handleSubscriptionCreated(subscription) {
  console.log('Processing subscription created:', subscription.id);
  console.log('Customer ID:', subscription.customer);
  console.log('Metadata:', subscription.metadata);
  
  // Try to find user by stripeCustomerId since userId might not be available yet
  try {
    const usersSnapshot = await db.collection('users')
      .where('stripeCustomerId', '==', subscription.customer)
      .limit(1)
      .get();
    
    if (usersSnapshot.empty) {
      console.log('No user found with stripeCustomerId:', subscription.customer);
      // User might not be created yet, this is okay
      // The user creation process will handle setting the subscription data
      return;
    }
    
    const userDoc = usersSnapshot.docs[0];
    const userId = userDoc.id;
    
    // Log the subscription object to debug
    console.log('Full subscription object:', JSON.stringify(subscription, null, 2));
    
    const updateData = {
      subscriptionId: subscription.id,
      subscriptionStatus: subscription.status,
      isPremium: true, // New subscriptions are always premium
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    
    // Safely access the price ID
    if (subscription.items && subscription.items.data && subscription.items.data.length > 0) {
      const firstItem = subscription.items.data[0];
      if (firstItem.price && firstItem.price.id) {
        updateData.subscriptionPriceId = firstItem.price.id;
      }
    }
    
    // Only add current_period_end if it exists and is valid
    if (subscription.current_period_end && !isNaN(subscription.current_period_end)) {
      updateData.subscriptionCurrentPeriodEnd = new Date(subscription.current_period_end * 1000);
    }
    
    console.log('Update data being saved:', updateData);
    
    await userDoc.ref.update(updateData);
    
    console.log(`Updated user ${userId} with new subscription ${subscription.id}`);
  } catch (error) {
    console.error('Error updating user subscription:', error);
  }
}

async function handleSubscriptionUpdated(subscription) {
  console.log('Processing subscription updated:', subscription.id);
  console.log('Customer ID:', subscription.customer);
  console.log('Status:', subscription.status);
  console.log('Cancel at period end:', subscription.cancel_at_period_end);
  
  try {
    // Find user by stripeCustomerId
    const usersSnapshot = await db.collection('users')
      .where('stripeCustomerId', '==', subscription.customer)
      .limit(1)
      .get();
    
    if (usersSnapshot.empty) {
      console.log('No user found with stripeCustomerId:', subscription.customer);
      return;
    }
    
    const userDoc = usersSnapshot.docs[0];
    const userId = userDoc.id;

    const updateData = {
      subscriptionStatus: subscription.status,
      subscriptionPriceId: subscription.items.data[0]?.price?.id || null,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    
    // Only add current_period_end if it exists and is valid
    if (subscription.current_period_end && !isNaN(subscription.current_period_end)) {
      updateData.subscriptionCurrentPeriodEnd = new Date(subscription.current_period_end * 1000);
    }
    
    // Handle subscription cancellation scheduling
    if (subscription.cancel_at_period_end) {
      console.log('Subscription set to cancel at period end');
      updateData.subscriptionCancelAtPeriodEnd = true;
      // Premium status remains true until period ends
      updateData.isPremium = true;
    } else if (subscription.status === 'active') {
      // Subscription is active and not set to cancel
      updateData.subscriptionCancelAtPeriodEnd = false;
      updateData.isPremium = true;
    }
    
    // Only set isPremium to false if subscription is actually canceled/unpaid
    if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
      updateData.isPremium = false;
    }
    
    await userDoc.ref.update(updateData);
    
    console.log(`Updated subscription for user ${userId} - Premium: ${updateData.isPremium}`);
  } catch (error) {
    console.error('Error updating user subscription:', error);
  }
}

async function handleSubscriptionDeleted(subscription) {
  console.log('Processing subscription deleted:', subscription.id);
  console.log('Customer ID:', subscription.customer);
  console.log('Final status:', subscription.status);
  
  try {
    // Find user by stripeCustomerId
    const usersSnapshot = await db.collection('users')
      .where('stripeCustomerId', '==', subscription.customer)
      .limit(1)
      .get();
    
    if (usersSnapshot.empty) {
      console.log('No user found with stripeCustomerId:', subscription.customer);
      return;
    }
    
    const userDoc = usersSnapshot.docs[0];
    const userId = userDoc.id;

    // When subscription is deleted, set isPremium to false
    await userDoc.ref.update({
      subscriptionStatus: 'canceled',
      isPremium: false,
      subscriptionEndDate: admin.firestore.FieldValue.serverTimestamp(),
      subscriptionCancelAtPeriodEnd: false,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    console.log(`Canceled subscription for user ${userId} - Premium access removed`);
  } catch (error) {
    console.error('Error updating user subscription:', error);
  }
}

async function handleCheckoutCompleted(session) {
  console.log('Processing checkout completed:', session.id);
  
  // Get the user ID from client_reference_id or metadata
  const userId = session.client_reference_id || session.metadata?.userId;
  if (!userId) {
    console.error('No userId in checkout session');
    return;
  }

  // If this is a subscription checkout
  if (session.mode === 'subscription') {
    const subscriptionId = session.subscription;
    console.log(`Checkout completed for subscription ${subscriptionId}`);
    
    // The subscription.created event will handle the actual update
    // This is just for logging/tracking
  }
}

async function handlePaymentSucceeded(invoice) {
  console.log('Processing payment succeeded:', invoice.id);
  
  // You can add logic here to handle successful payments
  // For example, sending a receipt email or updating payment history
}

async function handlePaymentFailed(invoice) {
  console.log('Processing payment failed:', invoice.id);
  
  // You can add logic here to handle failed payments
  // For example, sending a payment failed email or updating user status
}