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
        console.log('=== FORM SUBMISSION STARTED ===');
        
        if (!stripe || !elements) {
            console.error('Stripe not ready:', { stripe: !!stripe, elements: !!elements });
            return;
        }

        setIsProcessing(true);
        console.log('Processing payment, type:', intentType);

        try {
            // Validate the form first
            const { error: submitError } = await elements.submit();
            if (submitError) {
                console.error('Form validation error:', submitError);
                setErrorMessage(submitError.message);
                setIsProcessing(false);
                return;
            }

            let result;
            
            if (intentType === 'setup') {
                console.log('Confirming SetupIntent...');
                result = await stripe.confirmSetup({
                    elements,
                    confirmParams: {
                        return_url: window.location.origin,
                    },
                    redirect: 'if_required'
                });
            } else {
                console.log('Confirming PaymentIntent...');
                result = await stripe.confirmPayment({
                    elements,
                    confirmParams: {
                        return_url: window.location.origin,
                    },
                    redirect: 'if_required'
                });
            }

            console.log('Confirmation result:', result);

            if (result.error) {
                console.error('Stripe error:', result.error);
                setErrorMessage(result.error.message);
                setIsProcessing(false);
            } else {
                console.log('Payment confirmed successfully!');
                console.log('PaymentIntent:', result.paymentIntent);
                
                // If it was a setup intent, activate the subscription
                if (intentType === 'setup' && subscriptionId) {
                    console.log('Activating subscription...');
                    try {
                        const response = await fetch('/api/activate-subscription', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ subscriptionId }),
                        });
                        
                        const data = await response.json();
                        if (!response.ok) {
                            throw new Error(data.error?.message || 'Failed to activate subscription');
                        }
                        
                        console.log('Subscription activated:', data);
                    } catch (error) {
                        console.error('Error activating subscription:', error);
                        setErrorMessage('Payment method saved but subscription activation failed. Please contact support.');
                        setIsProcessing(false);
                        return;
                    }
                }
                
                // Update user status
                console.log('Updating premium status...');
                await updateUserPremiumStatus(currentUser.uid, true);
                console.log('Calling onSuccess...');
                onSuccess();
            }
        } catch (error) {
            console.error('Unexpected error:', error);
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

    // Debug logging when payment form is ready
    useEffect(() => {
        if (clientSecret && intentType) {
            console.log('=== PAYMENT FORM READY ===');
            console.log('Client Secret:', clientSecret.substring(0, 30) + '...');
            console.log('Intent Type:', intentType);
            console.log('Subscription ID:', subscriptionId);
        }
    }, [clientSecret, intentType, subscriptionId]);

    useEffect(() => {
        if (userEmail) {
            console.log('=== FETCHING PAYMENT INTENT ===');
            console.log('User email:', userEmail);
            
            setFetchError(null);
            const apiUrl = '/api/create-subscription';
            
            fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail }),
            })
            .then(async (res) => {
                console.log('API Response status:', res.status);
                const resBody = await res.json().catch(() => ({}));
                console.log('API Response body:', resBody);
                
                if (!res.ok) {
                    throw new Error(resBody.error?.message || `HTTP error! Status: ${res.status}`);
                }
                return resBody;
            })
            .then((data) => {
                if (data.clientSecret) {
                    console.log('Received client secret, type:', data.type);
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