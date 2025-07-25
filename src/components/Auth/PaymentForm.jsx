// src/components/Auth/PaymentForm.jsx

import React, { useState, useEffect, useContext } from 'react';
import { AppStateContext, ThemeContext } from '../../context/AppContext';
import { auth } from '../../firebase/config.js'; 
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'; // <-- 1. IMPORT sendEmailVerification
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import LoadingSpinner from '../Common/LoadingSpinner';
import './CheckoutForm.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// This is the actual form component that will be wrapped by Elements
const CheckoutForm = ({ onSuccess, customerId, userEmail, userPassword }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { updateAppState } = useContext(AppStateContext);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

        const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setIsProcessing(true);
        setErrorMessage('');

        try {
            // Step 1: Confirm the payment with Stripe FIRST.
            const { error, setupIntent } = await stripe.confirmSetup({
                elements,
                confirmParams: { return_url: window.location.href },
                redirect: 'if_required'
            });

            // Step 2: If the payment method fails, stop everything.
            if (error) {
                throw new Error(error.message);
            }

            // Step 3: ONLY if the payment method was successful, create the Firebase user.
            const userCredential = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
            const user = userCredential.user;

            // --- 2. SEND VERIFICATION EMAIL ---
            // After the user is created, we immediately trigger the verification email.
            // This is a "fire-and-forget" action; we don't need to wait for it
            // to complete to proceed with the subscription.
            sendEmailVerification(user)
              .then(() => {
                console.log("Verification email sent successfully.");
              })
              .catch((error) => {
                console.error("Error sending verification email:", error);
              });
            // --- END OF UPDATE ---

            if (!user || !user.uid) {
                throw new Error("Failed to create user account after payment. Please contact support.");
            }

            // Step 4: Call the server API with the new user's UID to create the subscription.
            const response = await fetch('/api/complete-subscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                    customerId: customerId,
                    paymentMethodId: setupIntent.payment_method
                })
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error?.message || 'Failed to finalize subscription on server.');
            }

            // Step 5: Update the local React state to reflect premium status.
            updateAppState({
                isPremium: true,
                stripeCustomerId: customerId,
                email: user.email,
                subscriptionId: result.subscription.id,
                subscriptionStatus: result.subscription.status,
                subscriptionCurrentPeriodEnd: new Date(result.subscription.current_period_end * 1000),
                subscriptionCancelAtPeriodEnd: result.subscription.cancel_at_period_end,
            });
            
            onSuccess(); // Close the modal and celebrate!

        } catch (error) {
            console.error('Error during signup process:', error);
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
const PaymentForm = ({ onSuccess, userEmail, userPassword }) => {
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

export default PaymentForm;