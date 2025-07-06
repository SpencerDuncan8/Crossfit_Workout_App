// src/components/Auth/PaymentForm.jsx

import React, { useState, useEffect, useContext, useMemo } from 'react';
import { AppStateContext, ThemeContext } from '../../context/AppContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import LoadingSpinner from '../Common/LoadingSpinner';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// DEFINED AS A SEPARATE COMPONENT
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
            const { error, setupIntent } = await stripe.confirmSetup({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/payment-complete`, // Good practice
                },
                redirect: 'if_required'
            });

            if (error) {
                throw new Error(error.message || "An error occurred during payment setup.");
            }

            if (setupIntent.status === 'succeeded') {
                // Step 2: Create the subscription with the saved payment method
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

                // Step 3: Update user status in your app
                await updateUserPremiumStatus(currentUser.uid, true);
                onSuccess();
            } else {
                 throw new Error(`Payment setup failed. Status: ${setupIntent.status}`);
            }

        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(error.message || 'An error occurred. Please try again.');
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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


// MAIN COMPONENT
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

    const options = useMemo(() => {
        if (!clientSecret) return undefined;
        
        return {
            clientSecret,
            appearance: {
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
            }
        };
    }, [clientSecret, darkMode]);

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

    if (error || !clientSecret || !options) {
        return (
            <div>
                <div className="auth-header">
                    <h1 className="auth-title">Unlock Premium</h1>
                </div>
                <div className="auth-error" style={{ textAlign: 'center', lineHeight: 1.6 }}>
                    <strong>Could not initialize payment.</strong><br />
                    {error || 'Please refresh and try again.'}
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
            <Elements options={options} stripe={stripePromise}>
                <CheckoutForm onSuccess={onSuccess} customerId={customerId} />
            </Elements>
        </div>
    );
};

export default PaymentForm;