// src/components/Auth/PaymentForm.jsx

import React, { useState, useEffect, useContext } from 'react';
import { AppStateContext, ThemeContext } from '../../context/AppContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import LoadingSpinner from '../Common/LoadingSpinner';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ onSuccess, intentType, subscriptionId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { currentUser, updateUserPremiumStatus } = useContext(AppStateContext);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) { return; }
        setIsProcessing(true);

        try {
            let result;
            
            if (intentType === 'setup') {
                // Handle SetupIntent confirmation
                result = await stripe.confirmSetup({
                    elements,
                    redirect: 'if_required'
                });
            } else {
                // Handle PaymentIntent confirmation
                result = await stripe.confirmPayment({
                    elements,
                    redirect: 'if_required'
                });
            }

            if (result.error) {
                setErrorMessage(result.error.type === "card_error" || result.error.type === "validation_error" 
                    ? result.error.message 
                    : "An unexpected error occurred.");
                setIsProcessing(false);
            } else {
                console.log(`${intentType === 'setup' ? 'Setup' : 'Payment'} successful!`);
                
                // If it was a setup intent, we might need to activate the subscription
                // This depends on your backend implementation
                if (intentType === 'setup' && subscriptionId) {
                    console.log('Payment method attached to subscription:', subscriptionId);
                }
                
                await updateUserPremiumStatus(currentUser.uid, true);
                onSuccess();
            }
        } catch (error) {
            console.error('Error during confirmation:', error);
            setErrorMessage('An unexpected error occurred. Please try again.');
            setIsProcessing(false);
        }
    };
    
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
    const [intentType, setIntentType] = useState(null);
    const [subscriptionId, setSubscriptionId] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const { darkMode } = useContext(ThemeContext);

    useEffect(() => {
        if (userEmail) {
            setFetchError(null);
            const apiUrl = '/api/create-subscription';
            
            fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail }),
            })
            .then(async (res) => {
                const resBody = await res.json().catch(() => ({}));
                if (!res.ok) {
                    throw new Error(resBody.error?.message || `HTTP error! Status: ${res.status}`);
                }
                return resBody;
            })
            .then((data) => {
                if (data.clientSecret) {
                    setClientSecret(data.clientSecret);
                    setIntentType(data.type || 'payment');
                    setSubscriptionId(data.subscriptionId);
                } else {
                    throw new Error("Failed to initialize payment session.");
                }
            })
            .catch(error => {
                console.error("Fetch error:", error);
                setFetchError(error.message || 'A network error occurred. Please check your connection and try again.');
            });
        }
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

    const options = { 
        clientSecret, 
        appearance,
        // Add additional options for SetupIntent if needed
        ...(intentType === 'setup' && {
            // SetupIntent specific options can go here
        })
    };

    const renderContent = () => {
        if (fetchError) {
            return (
                <div className="auth-error" style={{ textAlign: 'center', lineHeight: 1.6 }}>
                    <strong>Could not initialize payment.</strong><br/>
                    {fetchError}
                </div>
            );
        }
        if (!clientSecret) {
            return (
                <div style={{minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <LoadingSpinner />
                </div>
            );
        }
        return (
            <Elements options={options} stripe={stripePromise}>
                <CheckoutForm 
                    onSuccess={onSuccess} 
                    intentType={intentType}
                    subscriptionId={subscriptionId}
                />
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