// src/components/Auth/PaymentForm.jsx

import React, { useState, useEffect, useContext, useMemo } from 'react';
import { AppStateContext, ThemeContext } from '../../context/AppContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import LoadingSpinner from '../Common/LoadingSpinner';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// STEP 1: Defined as a separate, stable component outside of the parent.
const CheckoutForm = ({ onSuccess, customerId, userEmail }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { currentUser, updateUserPremiumStatus } = useContext(AppStateContext);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setIsProcessing(true);
        setErrorMessage('');

        try {
            const { error, setupIntent } = await stripe.confirmSetup({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/payment-complete`,
                },
                redirect: 'if_required'
            });

            if (error) {
                throw new Error(error.message || "An error occurred during payment setup.");
            }

            if (setupIntent.status === 'succeeded') {
                const response = await fetch('/api/complete-subscription', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        customerId: customerId,
                        paymentMethodId: setupIntent.payment_method
                    })
                });

                const subscriptionResult = await response.json();
                if (!response.ok) {
                    throw new Error(subscriptionResult.error?.message || 'Failed to create subscription.');
                }

                await updateUserPremiumStatus(currentUser.uid, true);
                onSuccess();

            } else {
                 throw new Error(`Payment setup failed. Unexpected status: ${setupIntent.status}`);
            }

        } catch (error) {
            console.error("PaymentForm Error:", error);
            setErrorMessage(error.message || 'An unexpected error occurred. Please try again.');
            setIsProcessing(false);
        }
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement />
            {errorMessage && (
                <div className="auth-error" style={{ marginTop: '16px' }}>
                    {errorMessage}
                </div>
            )}
            <button 
                disabled={!stripe || !elements || isProcessing} 
                className="auth-button" 
                style={{ marginTop: '24px' }}
            >
                <span>{isProcessing ? "Processing..." : "Subscribe for $4.99/month"}</span>
            </button>
        </form>
    );
};


// Main component that provides the Stripe Elements context
const PaymentForm = ({ onSuccess, userEmail }) => {
    const [clientSecret, setClientSecret] = useState(null);
    const [customerId, setCustomerId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { darkMode } = useContext(ThemeContext);

    useEffect(() => {
        if (!userEmail) return;

        fetch('/api/create-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userEmail }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) setError(data.error.message);
                else {
                    setClientSecret(data.clientSecret);
                    setCustomerId(data.customerId);
                }
            })
            .catch(err => setError('Failed to initialize payment form.'))
            .finally(() => setLoading(false));
    }, [userEmail]);
    
    // This is the definitive set of options to stabilize the PaymentElement.
    const options = useMemo(() => {
        if (!clientSecret) return undefined;
        
        return {
            clientSecret,
            // STEP 2: Disable Stripe Link to prevent its UI conflicts
            paymentMethodCreation: 'manual', 
            // STEP 3: Pre-fill the user's email to stabilize the form
            defaultValues: {
                billingDetails: {
                    email: userEmail,
                }
            },
            appearance: {
                theme: darkMode ? 'night' : 'stripe',
                variables: {
                    colorPrimary: '#3b82f6',
                },
                fields: {
                    billingDetails: {
                        email: 'never', // Hides the email field since we pre-fill it
                    }
                }
            },
        };
    }, [clientSecret, darkMode, userEmail]);

    if (loading) {
        return <div style={{ minHeight: '200px' }}><LoadingSpinner /></div>;
    }

    if (error || !clientSecret || !options) {
        return (
            <div className="auth-error" style={{ textAlign: 'center' }}>
                <strong>Could not initialize payment.</strong><br />
                {error || 'Please refresh and try again.'}
            </div>
        );
    }
    
    return (
        <div>
            <div className="auth-header">
                <h1 className="auth-title">Unlock Premium</h1>
                <p className="auth-subtitle">Final step! Your account is ready. Subscribe to activate cloud sync.</p>
            </div>
            <Elements options={options} stripe={stripePromise}>
                <CheckoutForm onSuccess={onSuccess} customerId={customerId} userEmail={userEmail} />
            </Elements>
        </div>
    );
};

export default PaymentForm;