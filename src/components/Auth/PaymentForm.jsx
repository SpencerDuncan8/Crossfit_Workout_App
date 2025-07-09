// src/components/Auth/PaymentForm.jsx

import React, { useState, useEffect, useContext } from 'react';
import { AppStateContext, ThemeContext } from '../../context/AppContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import LoadingSpinner from '../Common/LoadingSpinner';
import './CheckoutForm.css'; // Import the CSS fix

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ onSuccess, customerId, userEmail, userPassword }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { createUserAfterPayment } = useContext(AppStateContext);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Effect to ensure Stripe elements are properly interactive
    useEffect(() => {
        if (!stripe || !elements) return;
        
        const timer = setTimeout(() => {
            // Force interaction capability on Stripe elements
            const stripeFrames = document.querySelectorAll('iframe[name^="__privateStripeFrame"]');
            stripeFrames.forEach(frame => {
                if (frame.style) {
                    frame.style.pointerEvents = 'auto';
                    frame.style.userSelect = 'auto';
                }
            });
            
            // Specifically target phone inputs that might be problematic
            const phoneInputs = document.querySelectorAll('input[type="tel"], input[name="phone"]');
            phoneInputs.forEach(input => {
                input.style.pointerEvents = 'auto';
                input.style.userSelect = 'text';
                input.style.webkitUserSelect = 'text';
                input.removeAttribute('disabled');
                
                // Add event listeners to ensure proper functionality
                input.addEventListener('focus', (e) => {
                    e.stopPropagation();
                });
                
                input.addEventListener('click', (e) => {
                    e.stopPropagation();
                });
            });
        }, 1000);

        return () => clearTimeout(timer);
    }, [stripe, elements]);

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
                    paymentMethodId: setupIntent.payment_method,
                    userEmail: userEmail,
                    userPassword: userPassword
                })
            });

            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error?.message || 'Failed to create subscription');
            }

            console.log('Subscription created successfully:', result);

            // Step 3: Create Firebase user and update premium status
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
                {/* CRITICAL: Use the stripe-elements-wrapper cIlass */}
                <div className="stripe-elements-wrapper">
                    <PaymentElement 
                        options={{
                            // Additional options to help with input functionality
                            layout: 'tabs',
                            defaultValues: {
                                billingDetails: {
                                    email: userEmail,
                                }
                            }
                        }}
                    />
                </div>
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
        </div>
    );
};

const PaymentForm = ({ onSuccess, userEmail, userPassword }) => {
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
        },
        rules: {
            '.Input': {
                fontSize: '16px',
                pointerEvents: 'auto',
                userSelect: 'text',
                WebkitUserSelect: 'text',
                touchAction: 'manipulation',
            },
            '.Input:focus': {
                outline: 'none',
                pointerEvents: 'auto',
            },
            // Specifically target Stripe Link elements
            '.p-Link .Input': {
                pointerEvents: 'auto',
                userSelect: 'text',
                WebkitUserSelect: 'text',
            },
            // Target phone number inputs specifically
            '.Input[data-testid="phone-number-input"]': {
                pointerEvents: 'auto',
                userSelect: 'text',
                WebkitUserSelect: 'text',
                touchAction: 'manipulation',
            }
        }
    };

    const elementsOptions = {
        clientSecret,
        appearance,
        fonts: [{
            cssSrc: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
        }]
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
                    <p className="auth-subtitle">Account setup failed. Please try again.</p>
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
                    <p className="auth-subtitle">Final step! Complete payment to activate your account.</p>
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
                <p className="auth-subtitle">Final step! Complete payment to activate your account.</p>
            </div>
            <Elements options={elementsOptions} stripe={stripePromise}>
                <CheckoutForm onSuccess={onSuccess} customerId={customerId} userEmail={userEmail} userPassword={userPassword} />
            </Elements>
        </div>
    );
};

export default PaymentForm;