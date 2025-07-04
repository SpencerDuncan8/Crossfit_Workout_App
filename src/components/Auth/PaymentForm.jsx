// src/components/Auth/PaymentForm.jsx

import React, { useState, useEffect, useContext } from 'react';
// ... other imports

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// The CheckoutForm component remains unchanged.
const CheckoutForm = ({ onSuccess }) => { /* ... NO CHANGES HERE ... */ };

const PaymentForm = ({ onSuccess, userEmail }) => {
    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        if (userEmail) {
            // --- THIS IS THE FIX ---
            // Construct the full, absolute URL to your Vercel API endpoint.
            const apiUrl = `${import.meta.env.VITE_VERCEL_URL}/api/create-subscription`;

            console.log("Attempting to fetch from:", apiUrl); // Add this for debugging

            fetch(apiUrl, { // Use the absolute URL
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail }),
            })
            .then((res) => {
                if (!res.ok) {
                    // Try to get more info from the response if it fails
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
        appearance: { /* ... unchanged ... */ }
    };

    return (
        // The JSX part of this component remains unchanged
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