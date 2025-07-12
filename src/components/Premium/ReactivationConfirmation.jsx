// src/components/Premium/ReactivationConfirmation.jsx

import React, { useState, useContext } from 'react';
import { AppStateContext } from '../../context/AppContext';
import { Crown, AlertTriangle, Settings } from 'lucide-react';

const ReactivationConfirmation = ({ onConfirm, onCancel }) => {
  const { appState, currentUser, refreshSubscriptionData } = useContext(AppStateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPortalButton, setShowPortalButton] = useState(false);

  const handleGoToPortal = async () => {
    // This is a simplified version of the logic in AccountModal
    setIsLoading(true);
    try {
      const response = await fetch('/api/create-customer-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: appState.stripeCustomerId }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError("Could not open the customer portal. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    setError('');
    setShowPortalButton(false);

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
        // --- THIS IS THE NEW LOGIC ---
        // Check for our specific error code from the API.
        if (result.error?.code === 'NO_PAYMENT_METHOD') {
          setError("We couldn't find a payment method on file. Please add one in the customer portal to re-subscribe.");
          setShowPortalButton(true); // Show the "Go to Portal" button
        } else {
          throw new Error(result.error?.message || 'An unknown error occurred.');
        }
      } else {
        // Success!
        await refreshSubscriptionData();
        onConfirm();
      }

    } catch (err) {
      console.error('Reactivation failed:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-form-container">
      {!showPortalButton ? (
        <>
          <p className="modal-confirm-text" style={{ textAlign: 'left', marginBottom: '24px' }}>
            You are about to re-subscribe to <strong>BlockFit Premium</strong> for <strong>$4.99/month</strong>, charged to your card on file.
            <br/><br/>
            This will immediately restore your access to all premium features.
          </p>
          
          {error && <p className="auth-error" style={{display: 'flex', gap: '8px'}}><AlertTriangle size={20}/>{error}</p>}

          <div className="modal-actions">
            <button type="button" className="action-btn" onClick={onCancel} disabled={isLoading}>
              Cancel
            </button>
            <button type="button" className="action-btn schedule-btn" onClick={handleConfirm} disabled={isLoading}>
              {isLoading ? 'Processing...' : <><Crown size={16} /> Confirm & Pay</>}
            </button>
          </div>
        </>
      ) : (
        <>
          {/* This is the new state shown when there's no payment method */}
          <p className="modal-confirm-text" style={{ textAlign: 'left', marginBottom: '24px' }}>
            {error}
          </p>
          <div className="modal-actions">
            <button type="button" className="action-btn" onClick={onCancel}>
              Close
            </button>
            <button type="button" className="action-btn schedule-btn" onClick={handleGoToPortal} disabled={isLoading}>
              {isLoading ? 'Loading...' : <><Settings size={16} /> Go to Portal</>}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ReactivationConfirmation;