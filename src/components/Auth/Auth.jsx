// src/components/Auth/Auth.jsx

import React, { useState, useContext } from 'react';
import { AppStateContext } from '../../context/AppContext';
import { X } from 'lucide-react';
import './Auth.css';
import PaymentForm from './PaymentForm';

const Auth = ({ closeModal }) => {
  const { logIn } = useContext(AppStateContext); // Remove signUp from here
  const [isLogin, setIsLogin] = useState(true);
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
        // NEW: Don't create Firebase user yet, just proceed to payment
        setAuthStep('payment');
      }
    } catch (err) {
      let message = "An unknown error occurred.";
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
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
                {isLogin ? 'Log in to upgrade to Premium' : 'Create your Premium account'}
            </p>
          </div>
          <form className="auth-form" onSubmit={handleSubmit}>
            <input type="email" className="auth-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" className="auth-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {error && <p className="auth-error">{error}</p>}
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