// api/activate-subscription.js

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
    const { subscriptionId } = req.body;

    if (!subscriptionId) {
      return res.status(400).json({ error: { message: 'Subscription ID is required.' } });
    }

    console.log('Activating subscription:', subscriptionId);

    // Retrieve the subscription with expanded fields
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['latest_invoice', 'default_payment_method', 'customer.invoice_settings.default_payment_method']
    });

    console.log('Subscription status:', subscription.status);
    console.log('Latest invoice:', subscription.latest_invoice?.id);

    // If subscription is already active, we're done
    if (subscription.status === 'active') {
      console.log('Subscription is already active');
      return res.status(200).json({ 
        success: true, 
        subscription: {
          id: subscription.id,
          status: subscription.status
        }
      });
    }

    // If subscription is incomplete, we need to pay the invoice
    if (subscription.status === 'incomplete' && subscription.latest_invoice) {
      const invoiceId = typeof subscription.latest_invoice === 'string'
        ? subscription.latest_invoice
        : subscription.latest_invoice.id;

      console.log('Attempting to pay invoice:', invoiceId);

      try {
        // Pay the invoice
        const paidInvoice = await stripe.invoices.pay(invoiceId);
        console.log('Invoice paid successfully:', paidInvoice.status);

        // Retrieve the updated subscription
        const updatedSubscription = await stripe.subscriptions.retrieve(subscriptionId);
        
        return res.status(200).json({ 
          success: true, 
          subscription: {
            id: updatedSubscription.id,
            status: updatedSubscription.status
          }
        });
      } catch (payError) {
        console.error('Error paying invoice:', payError.message);
        
        // If payment fails, try to update the subscription status directly
        if (payError.code === 'invoice_payment_intent_requires_action') {
          return res.status(400).json({ 
            error: { 
              message: 'Payment requires additional authentication. Please complete the payment process.',
              code: 'payment_action_required'
            } 
          });
        }
        
        throw payError;
      }
    }

    // If we get here, something unexpected happened
    console.log('Unexpected subscription state:', {
      status: subscription.status,
      latest_invoice: subscription.latest_invoice?.id
    });

    return res.status(400).json({ 
      error: { 
        message: `Unable to activate subscription in ${subscription.status} status.` 
      } 
    });
    
  } catch (error) {
    console.error('Error activating subscription:', error);
    return res.status(500).json({ error: { message: error.message } });
  }
}