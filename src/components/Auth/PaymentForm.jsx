// src/components/Auth/PaymentForm.jsx

import React, { useState, useEffect, useContext } from 'react';
import { AppStateContext } from '../../context/AppContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import LoadingSpinner from '../Common/LoadingSpinner';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// The internal form that does the work
const CheckoutForm = ({ onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { currentUser, updateUserPremiumStatus } = useContext(AppStateContext);

    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required'
        });

        if (error) {
            setErrorMessage(error.message);
            setIsProcessing(false);
        } else {
            console.log("Subscription payment successful!");
            await updateUserPremiumStatus(currentUser.uid, true);
            onSuccess();
        }
    };
    
    if (isProcessing) {
        return <LoadingSpinner />;
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


// The main component that wraps the form
const PaymentForm = ({ onSuccess, userEmail }) => {
    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        if (userEmail) {
            // Construct the full, absolute URL to your Vercel API endpoint.
            const apiUrl = `${import.meta.env.VITE_VERCEL_URL}/api/create-subscription`;

            console.log("Attempting to fetch from:", apiUrl);

            fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail }),
            })
            .then((res) => {
                if (!res.ok) {
                    return res.text().then(text => {
                        throw new Error(`HTTP error! status: ${res.status}, body: ${text}`);
                    });
                }
                return res.json();
            })
            .then((data) => {
                if (data.clientSecret) {
                    setClientSecret(data.clientSecret);
                } else {
                    console.error("API Error:", data.error?.message || "Failed to get client secret.");
                }
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
        }
    }, [userEmail]);

    const options = {
        clientSecret,
        appearance: {
            theme: 'night',
            variables: {
                colorPrimary: '#8b5cf6',
                colorBackground: '#1a1f2e',
                colorText: '#ffffff',
                colorDanger: '#ef4444',
                fontFamily: 'Inter, system-ui, sans-serif',
                spacingUnit: '4px',
                borderRadius: '8px',
            }
        },
    };

    return (
        <div>
            <div className="auth-header">
                 <h1 className="auth-title">Unlock Premium</h1>
                 <p className="auth-subtitle">Final step! Your account is ready. Subscribe to activate cloud sync.</p>
            </div>
            
            {!clientSecret ? (
                <div style={{minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <LoadingSpinner />
                </div>
            ) : (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm onSuccess={onSuccess} />
                </Elements>
            )}
        </div>
    );
};

export default PaymentForm;