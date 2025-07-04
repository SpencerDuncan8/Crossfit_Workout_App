// src/components/Auth/Auth.jsx

import React, { useState, useContext } from 'react';
import { AppStateContext } from '../../context/AppContext';
import { X } from 'lucide-react';
import './Auth.css';

const Auth = ({ closeModal }) => {
  const { signUp, logIn } = useContext(AppStateContext);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      if (isLogin) {
        await logIn(email, password);
      } else {
        await signUp(email, password);
      }
      // On success, the AppContext will handle the user state change
      // and the modal will be closed by the parent component.
      closeModal();
    } catch (err) {
      // Map common Firebase errors to user-friendly messages
      let message = "An unknown error occurred.";
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        message = 'Invalid email or password.';
      } else if (err.code === 'auth/email-already-in-use') {
        message = 'This email address is already in use.';
      } else if (err.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters.';
      }
      setError(message);
    }
  };

  return (
    // This is now designed to be inside a modal
    <div className="auth-card" style={{animation: 'none'}}>
      <button className="modal-close-btn" onClick={closeModal} style={{position: 'absolute', top: '16px', right: '16px', zIndex: 10}}>
          <X size={24} />
      </button>
      <div className="auth-header">
        <h1 className="auth-title">Sync to Cloud</h1>
        <p className="auth-subtitle">
          {isLogin ? 'Log in to sync your data' : 'Create an account to save your progress'}
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="auth-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="auth-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="auth-button">
          {isLogin ? 'Log In' : 'Sign Up & Sync'}
        </button>
      </form>

      <div className="auth-toggle-text">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Sign Up' : 'Log In'}
        </button>
      </div>
    </div>
  );
};

export default Auth;