// src/components/Auth/Auth.jsx

import React, { useState, useContext } from 'react';
import { AppStateContext } from '../../context/AppContext';
import { X } from 'lucide-react';
import './Auth.css';
import PaymentForm from './PaymentForm';
// --- 1. IMPORT FIREBASE AUTH FUNCTIONS ---
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/config.js';

const Auth = ({ closeModal, defaultMode = "signin" }) => {
  const { logIn } = useContext(AppStateContext);
  const [isLogin, setIsLogin] = useState(defaultMode === "signin");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [authStep, setAuthStep] = useState('credentials');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await logIn(email, password);
        closeModal();
      } else {
        setAuthStep('payment');
      }
    } catch (err) {
      let message = "An unknown error occurred.";
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        message = 'Invalid email or password.';
      } else if (err.code === 'auth/email-already-in-use') {
        message = 'This email address is already in use.';
      } else if (err.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters.';
      } else if (err.message === "Login cancelled by user.") {
        message = "Login cancelled to prevent overwriting local data."
      }
      setError(message);
    }
  };

  // --- 2. NEW HANDLER FUNCTION FOR PASSWORD RESET ---
  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address to reset your password.");
      return;
    }
    setError(''); // Clear previous errors
    
    try {
      await sendPasswordResetEmail(auth, email);
      // Provide feedback to the user
      alert("Password reset email sent! Please check your inbox (and spam folder).");
      closeModal(); // Close the modal after sending the email
    } catch (err) {
      console.error("Password reset error:", err);
      // Provide a user-friendly error message
      setError("Could not send reset email. Please ensure the email address is correct and try again.");
    }
  };


  return (
    <div className="auth-card" style={{animation: 'none'}}>
      <button className="modal-close-btn" onClick={closeModal} style={{position: 'absolute', top: '16px', right: '16px', zIndex: 10}}>
          <X size={24} />
      </button>

      {authStep === 'credentials' ? (
        <>
          <div className="auth-header">
            <h1 className="auth-title">BlockFit Premium</h1>
            <p className="auth-subtitle">
              {defaultMode === "upgrade" ? 
                (isLogin ? 'Log in to upgrade to Premium' : 'Create your account to upgrade to Premium') :
                (isLogin ? 'Log in to upgrade to Premium' : 'Create your Premium account')
              }
            </p>
          </div>
          <form className="auth-form" onSubmit={handleSubmit}>
            <input type="email" className="auth-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" className="auth-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {error && <p className="auth-error">{error}</p>}
            
            {/* --- 3. ADD THE "FORGOT PASSWORD?" BUTTON --- */}
            {/* This button only appears when the user is in the "Log In" view. */}
            {isLogin && (
              <button 
                type="button" // Important: type="button" prevents it from submitting the form
                onClick={handleForgotPassword}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#3b82f6', // Use a theme-friendly color
                  cursor: 'pointer',
                  textAlign: 'right',
                  fontSize: '14px',
                  padding: '0 4px 8px 0', // Adjust padding as needed
                  alignSelf: 'flex-end' // Aligns the button to the right
                }}>
                Forgot Password?
              </button>
            )}
            {/* --- END OF UPDATE --- */}
            
            <button type="submit" className="auth-button">
              {isLogin ? 'Log In' : 'Continue to Payment'}
            </button>
          </form>
          <div className="auth-toggle-text">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button onClick={() => { setIsLogin(!isLogin); setError(''); }}>
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </div>
        </>
      ) : (
        <PaymentForm onSuccess={closeModal} userEmail={email} userPassword={password} />
      )}
    </div>
  );
};

export default Auth;