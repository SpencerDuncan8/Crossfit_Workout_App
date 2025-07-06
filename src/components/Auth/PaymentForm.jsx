// src/components/Auth/PaymentForm.jsx
// Simplified two-step approach: Save payment method first, then create subscription

import React, { useState, useEffect, useContext } from 'react';
import { AppStateContext, ThemeContext } from '../../context/AppContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import LoadingSpinner from '../Common/LoadingSpinner';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ onSuccess, customerId }) => {
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
            // Step 1: Confirm the SetupIntent to save the payment method
            console.log('Saving payment method...');
            const { error, setupIntent } = await stripe.confirmSetup({
                elements,
                confirmParams: {
                    return_url: window.location.href,
                },
                redirect: 'if_required'
            });

            if (error) {
                throw new Error(error.message);
            }

            console.log('Payment method saved:', setupIntent.payment_method);

            // Step 2: Create the subscription with the saved payment method
            console.log('Creating subscription...');
            const response = await fetch('/api/complete-subscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerId: customerId,
                    paymentMethodId: setupIntent.payment_method
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error?.message || 'Failed to create subscription');
            }

            console.log('Subscription created successfully:', result);

            // Step 3: Update user status in your app
            await updateUserPremiumStatus(currentUser.uid, true);
            onSuccess();

        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(error.message || 'An error occurred. Please try again.');
            setIsProcessing(false);
        }
    };
    
    // --- THIS IS THE FIX ---
    // We define the payment element options here, changing 'always' to 'auto' for the name field.
    const paymentElementOptions = {
        fields: {
            billingDetails: {
                name: 'auto',   // 'auto' will show the field when appropriate (which is the default for cards).
                email: 'never', // This correctly hides the email field.
                phone: 'never'  // This correctly hides the phone field.
            }
        },
        layout: 'tabs'
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement options={paymentElementOptions} />
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

const PaymentForm = ({ onSuccess, userEmail }) => {
    const [clientSecret, setClientSecret] = useState(null);
    const [customerId, setCustomerId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { darkMode } = useContext(ThemeContext);

    useEffect(() => {
        if (!userEmail) return;

        // Initialize payment setup
        fetch('/api/create-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userEmail }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error.message);
                } else {
                    setClientSecret(data.clientSecret);
                    setCustomerId(data.customerId);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error:', err);
                setError('Failed to initialize payment form.');
                setLoading(false);
            });
    }, [userEmail]);

    const appearance = {
        theme: darkMode ? 'night' : 'stripe',
        variables: {
            colorPrimary: '#3b82f6',
            colorBackground: darkMode ? '#1a1f2e' : '#ffffff',
            colorText: darkMode ? '#ffffff' : '#111827',
            colorDanger: '#ef4444',
            fontFamily: 'Inter, system-ui, sans-serif',
            spacingUnit: '4px',
            borderRadius: '8px',
        }
    };

    if (loading) {
        return (
            <div>
                <div className="auth-header">
                    <h1 className="auth-title">Unlock Premium</h1>
                    <p className="auth-subtitle">Preparing payment form...</p>
                </div>
                <div style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <LoadingSpinner />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <div className="auth-header">
                    <h1 className="auth-title">Unlock Premium</h1>
                    <p className="auth-subtitle">Final step! Your account is ready. Subscribe to activate cloud sync.</p>
                </div>
                <div className="auth-error" style={{ textAlign: 'center', lineHeight: 1.6 }}>
                    <strong>Could not initialize payment.</strong><br />
                    {error}
                </div>
            </div>
        );
    }

    if (!clientSecret) {
        return (
            <div>
                <div className="auth-header">
                    <h1 className="auth-title">Unlock Premium</h1>
                    <p className="auth-subtitle">Final step! Your account is ready. Subscribe to activate cloud sync.</p>
                </div>
                <div className="auth-error" style={{ textAlign: 'center' }}>
                    Failed to load payment form. Please refresh and try again.
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="auth-header">
                <h1 className="auth-title">Unlock Premium</h1>
                <p className="auth-subtitle">Final step! Your account is ready. Subscribe to activate cloud sync.</p>
            </div>
            <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
                <CheckoutForm onSuccess={onSuccess} customerId={customerId} />
            </Elements>
        </div>
    );
};

export default PaymentForm;