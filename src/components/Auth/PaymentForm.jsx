// src/components/Auth/PaymentForm.jsx

import React, { useState, useEffect, useContext } from 'react';
import { AppStateContext, ThemeContext } from '../../context/AppContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import LoadingSpinner from '../Common/LoadingSpinner';

// This is correct: Initialize Stripe outside of the component render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { currentUser, updateUserPremiumStatus } = useContext(AppStateContext);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) { return; }
        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required' // Prevents a full-page redirect.
        });

        if (error) {
            setErrorMessage(error.type === "card_error" || error.type === "validation_error" ? error.message : "An unexpected error occurred.");
            setIsProcessing(false);
        } else {
            // Payment was successful.
            setErrorMessage('');
            console.log("Subscription payment successful!");
            await updateUserPremiumStatus(currentUser.uid, true);
            onSuccess(); // This closes the modal.
        }
    };
    
    // The spinner inside the form is only for when the payment is being confirmed.
    if (isProcessing) {
        return <div style={{ minHeight: '150px' }}><LoadingSpinner /></div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            {errorMessage && <div className="auth-error" style={{marginTop: '16px'}}>{errorMessage}</div>}
            <button disabled={isProcessing || !stripe || !elements} className="auth-button" style={{marginTop: '24px'}}>
                <span>{isProcessing ? "Processing..." : "Subscribe for $4.99/month"}</span>
            </button>
        </form>
    );
};

const PaymentForm = ({ onSuccess, userEmail }) => {
    const [clientSecret, setClientSecret] = useState(null);
    const [fetchError, setFetchError] = useState(null); // --- NEW: State for fetch errors
    const { darkMode } = useContext(ThemeContext);

    useEffect(() => {
        if (userEmail) {
            setFetchError(null); // Reset error on new attempt
            const apiUrl = '/api/create-subscription';
            
            fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail }),
            })
            .then(async (res) => { // Make this async to properly handle error bodies
                if (!res.ok) {
                    const errorBody = await res.json().catch(() => ({ error: { message: 'An unknown server error occurred.' }}));
                    throw new Error(errorBody.error.message || `HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (data.clientSecret) {
                    setClientSecret(data.clientSecret);
                } else {
                    // --- NEW: Handle cases where the API returns a 200 OK but no secret ---
                    throw new Error("Failed to retrieve a valid payment session from the server.");
                }
            })
            .catch(error => {
                // --- NEW: Set the user-facing error message ---
                console.error("Fetch error:", error);
                setFetchError(error.message);
            });
        }
    }, [userEmail]);

    // --- NEW: Stripe appearance object to match your app's theme ---
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

    const options = {
        clientSecret,
        appearance,
    };

    const renderContent = () => {
        // --- NEW: Render error state if fetch fails ---
        if (fetchError) {
            return (
                <div className="auth-error" style={{ textAlign: 'center', lineHeight: 1.6 }}>
                    <strong>Could not initialize payment.</strong><br/>
                    {fetchError}
                </div>
            );
        }

        // Show loading spinner while waiting for the clientSecret
        if (!clientSecret) {
            return (
                <div style={{minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <LoadingSpinner />
                </div>
            );
        }

        // Show the payment form once the secret is loaded
        return (
            <Elements options={options} stripe={stripePromise}>
                <CheckoutForm onSuccess={onSuccess} />
            </Elements>
        );
    }

    return (
        <div>
            <div className="auth-header">
                 <h1 className="auth-title">Unlock Premium</h1>
                 <p className="auth-subtitle">Final step! Your account is ready. Subscribe to activate cloud sync.</p>
            </div>
            {renderContent()}
        </div>
    );
};

export default PaymentForm;