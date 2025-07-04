// src/components/Auth/Auth.jsx

import React, { useState, useContext } from 'react';
import { AppStateContext } from '../../context/AppContext';
import { X, AlertTriangle } from 'lucide-react';
import './Auth.css';

// --- STRIPE IMPORTS ---
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm.jsx';

// Initialize Stripe outside of the component to avoid re-creating on every render.
// Use the environment variable for your publishable key.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


const Auth = ({ closeModal }) => {
  const { appState, signUp, logIn } = useContext(AppStateContext);
  
  // --- NEW STATE MANAGEMENT FOR THE FLOW ---
  const [view, setView] = useState('credentials'); // 'credentials', 'payment', 'overwrite_warning'
  const [clientSecret, setClientSecret] = useState('');
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // --- API CALL TO OUR VERCEL FUNCTION ---
  const createSubscription = async (userEmail) => {
    try {
        const response = await fetch('/api/create-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userEmail }),
        });
        if (!response.ok) {
            const { error } = await response.json();
            throw new Error(error.message || 'Failed to start subscription.');
        }
        const data = await response.json();
        setClientSecret(data.clientSecret);
        setView('payment'); // Move to the payment view
    } catch (err) {
        setError(err.message);
        setView('credentials'); // Go back to the form on error
    }
  };


  const handleConfirmLogin = async () => {
    setError('');
    try {
      await logIn(email, password);
      closeModal();
    } catch (err) {
      handleAuthError(err);
    }
  };

  const handleAuthError = (err) => {
    let message = "An unknown error occurred.";
    if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
      message = 'Invalid email or password.';
    } else if (err.code === 'auth/email-already-in-use') {
      message = 'This email address is already in use.';
    } else if (err.code === 'auth/weak-password') {
      message = 'Password should be at least 6 characters.';
    } else if (err.message === "Login cancelled by user.") {
      return; 
    }
    setError(message);
    setView('credentials'); // Always go back to credentials view on error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const hasLocalData = appState.totalWorkoutsCompleted > 0 || appState.programs.length > 0;
      if (hasLocalData) {
        setView('overwrite_warning'); // Show warning view
        return;
      }
      // If no local data, proceed with login directly
      await handleConfirmLogin();
    } else {
      // --- SIGN UP FLOW ---
      try {
        const userCredential = await signUp(email, password);
        // After successful Firebase account creation, create the subscription
        await createSubscription(userCredential.user.email);
      } catch (err) {
        handleAuthError(err);
      }
    }
  };

  const renderOverwriteWarning = () => (
    <div className="auth-warning-container">
      <div className="auth-warning-icon"><AlertTriangle size={32} /></div>
      <div className="auth-header"><h1 className="auth-title" style={{fontSize: '24px'}}>Replace Local Data?</h1></div>
      <p className="auth-warning-text">You have unsynced data on this device. Logging in will replace it with your saved cloud data. This action cannot be undone.</p>
      <div className="auth-actions">
        <button className="auth-action-btn" onClick={() => setView('credentials')}>Cancel</button>
        <button className="auth-action-btn danger" onClick={handleConfirmLogin}>Log In & Replace</button>
      </div>
    </div>
  );

  const renderAuthForm = () => (
    <>
      <div className="auth-header">
        <h1 className="auth-title">{isLogin ? 'Log In' : 'Create Account'}</h1>
        <p className="auth-subtitle">{isLogin ? 'Log in to sync your data' : 'First, create your account credentials.'}</p>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="email" className="auth-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" className="auth-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" className="auth-button">{isLogin ? 'Log In' : 'Continue to Payment'}</button>
      </form>
      <div className="auth-toggle-text">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}
        <button onClick={() => { setIsLogin(!isLogin); setError(''); setView('credentials'); }}>
          {isLogin ? 'Sign Up' : 'Log In'}
        </button>
      </div>
    </>
  );

  const renderPaymentForm = () => (
    <>
        <div className="auth-header">
            <h1 className="auth-title">Subscribe to Premium</h1>
            <p className="auth-subtitle">Enter your payment details to unlock cloud sync and unlimited programs.</p>
        </div>
        {clientSecret && (
            <Elements options={{ clientSecret, appearance: { theme: 'night', labels: 'floating' } }} stripe={stripePromise}>
                <CheckoutForm onSuccess={() => {
                    alert('Payment successful! Welcome to BlockFit Premium.');
                    closeModal();
                }} />
            </Elements>
        )}
    </>
  );

  const renderContent = () => {
    switch(view) {
        case 'payment': return renderPaymentForm();
        case 'overwrite_warning': return renderOverwriteWarning();
        case 'credentials':
        default:
            return renderAuthForm();
    }
  }

  return (
    <div className="auth-card" style={{animation: 'none'}}>
      <button className="modal-close-btn" onClick={closeModal} style={{position: 'absolute', top: '16px', right: '16px', zIndex: 10}}>
          <X size={24} />
      </button>
      {renderContent()}
    </div>
  );
};

export default Auth;