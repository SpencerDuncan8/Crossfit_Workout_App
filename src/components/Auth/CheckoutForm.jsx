// src/components/Auth/CheckoutForm.jsx

import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import './CheckoutForm.css';

export default function CheckoutForm({ onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // We don't need a return_url as we handle the result directly.
      },
      // This will prevent the user from being redirected.
      redirect: "if_required",
    });

    if (error) {
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }
    } else {
      // Payment was successful!
      setMessage(null);
      onSuccess();
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="checkout-form-container">
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit" className="payment-submit-btn">
        <span id="button-text">
          {isLoading ? <div className="spinner-sm" id="spinner"></div> : "Pay $4.99 / month"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}