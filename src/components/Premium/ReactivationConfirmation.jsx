// src/components/Premium/ReactivationConfirmation.jsx

import React, { useState, useContext } from 'react';
import { AppStateContext } from '../../context/AppContext';
import { Crown } from 'lucide-react';

const ReactivationConfirmation = ({ onConfirm, onCancel }) => {
  const { appState, currentUser, refreshSubscriptionData } = useContext(AppStateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/reactivate-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: currentUser.uid,
          customerId: appState.stripeCustomerId,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || 'An unknown error occurred.');
      }

      await refreshSubscriptionData(); // Refresh data to get the new subscription status
      onConfirm(); // Close the modal

    } catch (err) {
      console.error('Reactivation failed:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-form-container">
      <p className="modal-confirm-text" style={{ textAlign: 'left', marginBottom: '24px' }}>
        You are about to re-subscribe to <strong>BlockFit Premium</strong> for <strong>$4.99/month</strong>, charged to your card on file.
        <br/><br/>
        This will immediately restore your access to all premium features.
      </p>
      
      {error && <p className="auth-error">{error}</p>}

      <div className="modal-actions">
        <button type="button" className="action-btn" onClick={onCancel} disabled={isLoading}>
          Cancel
        </button>
        <button type="button" className="action-btn schedule-btn" onClick={handleConfirm} disabled={isLoading}>
          {isLoading ? 'Processing...' : <><Crown size={16} /> Confirm & Pay</>}
        </button>
      </div>
    </div>
  );
};

export default ReactivationConfirmation;