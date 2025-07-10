// src/components/Auth/PaymentForm.jsx

import React, { useState, useEffect, useContext } from 'react';
import { AppStateContext, ThemeContext } from '../../context/AppContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import LoadingSpinner from '../Common/LoadingSpinner';
import './CheckoutForm.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// This is the actual form component that will be wrapped by Elements
const CheckoutForm = ({ onSuccess, customerId, userEmail, userPassword }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { createUserAfterPayment } = useContext(AppStateContext);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setIsProcessing(true);
        setErrorMessage('');

        try {
            // Step 1: Confirm SetupIntent
            const { error, setupIntent } = await stripe.confirmSetup({
                elements,
                confirmParams: { return_url: window.location.href },
                redirect: 'if_required'
            });

            if (error) throw new Error(error.message);

            // Step 2: Create Subscription
            const response = await fetch('/api/complete-subscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerId: customerId,
                    paymentMethodId: setupIntent.payment_method,
                    userEmail: userEmail,
                })
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.error?.message || 'Failed to create subscription');

            // --- THIS IS YOUR CORRECT CHANGE ---
            // Step 3: Create user with full subscription data
            await createUserAfterPayment(userEmail, userPassword, customerId, result.subscription);
            onSuccess();

        } catch (error) {
            console.error('Error:', error);
            setErrorMessage(error.message || 'An error occurred. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="stripe-container">
            <form onSubmit={handleSubmit}>
                <div className="stripe-elements-wrapper">
                    <PaymentElement 
                        options={{
                            layout: 'tabs',
                            defaultValues: { billingDetails: { email: userEmail } }
                        }}
                    />
                </div>
                {errorMessage && (
                    <div className="auth-error" style={{ marginTop: '16px' }}>{errorMessage}</div>
                )}
                <button 
                    disabled={!stripe || !elements || isProcessing} 
                    className="auth-button" 
                    style={{ marginTop: '24px' }}
                >
                    <span>{isProcessing ? "Processing..." : "Subscribe for $4.99/month"}</span>
                </button>
            </form>
        </div>
    );
};

// This is the main exported component. It fetches data and handles loading/error states.
const PaymentFormWrapper = ({ onSuccess, userEmail, userPassword }) => {
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
        },
    };

    const elementsOptions = { clientSecret, appearance };

    if (loading) {
        return (
            <div>
                <div className="auth-header"><h1 className="auth-title">Unlock Premium</h1><p className="auth-subtitle">Preparing payment form...</p></div>
                <div style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LoadingSpinner /></div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <div className="auth-header"><h1 className="auth-title">Unlock Premium</h1><p className="auth-subtitle">Account setup failed. Please try again.</p></div>
                <div className="auth-error" style={{ textAlign: 'center', lineHeight: 1.6 }}><strong>Could not initialize payment.</strong><br />{error}</div>
            </div>
        );
    }

    if (!clientSecret) {
        return (
            <div>
                <div className="auth-header"><h1 className="auth-title">Unlock Premium</h1><p className="auth-subtitle">Final step! Complete payment to activate your account.</p></div>
                <div className="auth-error" style={{ textAlign: 'center' }}>Failed to load payment form. Please refresh and try again.</div>
            </div>
        );
    }

    return (
        <div>
            <div className="auth-header"><h1 className="auth-title">Unlock Premium</h1><p className="auth-subtitle">Final step! Complete payment to activate your account.</p></div>
            <Elements options={elementsOptions} stripe={stripePromise}>
                <CheckoutForm onSuccess={onSuccess} customerId={customerId} userEmail={userEmail} userPassword={userPassword} />
            </Elements>
        </div>
    );
};

// EXPORT THE WRAPPER COMPONENT AS THE DEFAULT
export default PaymentFormWrapper;