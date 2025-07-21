// src/components/Premium/AccountModal.jsx

import React, { useState, useEffect, useContext } from 'react';
import { AppStateContext } from '../../context/AppContext'; // NEW: Import AppStateContext
import { Crown, User, CreditCard, Settings, LogOut, Calendar, CheckCircle, AlertTriangle } from 'lucide-react';
import Modal from '../Common/Modal.jsx';

const AccountModal = ({ 
  isOpen, 
  onClose, 
  currentUser, 
  isPremium, 
  onLogout, 
  stripeCustomerId,
  subscriptionCancelAtPeriodEnd,
  subscriptionCurrentPeriodEnd,
  subscriptionStatus,
  refreshSubscriptionData,
  setIsReactivationConfirmOpen
}) => {
  // --- START OF NEW CODE ---
  const { appState, updateAppState } = useContext(AppStateContext);
  const [usernameInput, setUsernameInput] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [isUsernameLoading, setIsUsernameLoading] = useState(false);

  // When the modal opens, pre-fill the input with the user's current username if it exists.
  useEffect(() => {
    if (isOpen) {
      if (refreshSubscriptionData) {
        refreshSubscriptionData();
      }
      setUsernameInput(appState.username || '');
      setUsernameError('');
    }
  }, [isOpen, appState.username, refreshSubscriptionData]);

  const handleSetUsername = async (e) => {
    e.preventDefault();
    setIsUsernameLoading(true);
    setUsernameError('');

    try {
      const response = await fetch('/api/setUsername', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: currentUser.uid, username: usernameInput }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to set username.');
      }

      // Success! Update the local state to reflect the change immediately.
      updateAppState({ username: usernameInput.toLowerCase().trim() });
      alert('Username successfully updated!');

    } catch (error) {
      console.error('Error setting username:', error);
      setUsernameError(error.message);
    } finally {
      setIsUsernameLoading(false);
    }
  };
  // --- END OF NEW CODE ---

  const [isLoading, setIsLoading] = useState(false);

  const handleManageBilling = async () => {
    setIsLoading(true);
    try {
      if (!stripeCustomerId) {
        throw new Error('No Stripe Customer ID found.');
      }
      const response = await fetch('/api/create-customer-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId: stripeCustomerId }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create customer portal session.');
      }
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No portal URL returned from Stripe');
      }
    } catch (error) {
      alert(`Unable to open billing portal. ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReactivateClick = () => {
    onClose();
    setIsReactivationConfirmOpen(true);
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return 'N/A';
    try {
      const date = dateValue.toDate ? dateValue.toDate() : new Date(dateValue);
      return date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (error) {
      return 'N/A';
    }
  };

  const handleLogoutClick = () => {
    onClose(); 
    onLogout(); 
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={
      <div className="account-modal-title">
        <User size={24} /><span>Account</span>
        {isPremium && <Crown size={20} className="premium-crown" />}
      </div>
    }>
      <div className="account-modal-content">
        {/* User Info Section */}
        <div className="account-section user-info-section">
          <div className="user-avatar"><User size={32} /></div>
          <div className="user-details">
            <h3>{currentUser?.email}</h3>
            <div className="user-status">
              {isPremium ? (
                <span className="premium-status"><Crown size={16} />Premium Member</span>
              ) : (
                <span className="free-status">Free Account</span>
              )}
            </div>
          </div>
        </div>

        {/* --- START OF NEW USERNAME SECTION --- */}
        <div className="account-section">
          <h4>
            <User size={20} />
            Public Username
          </h4>
          {appState.username ? (
            <div className="subscription-detail">
              <span>Your public username is:</span>
              <span><strong>{appState.username}</strong></span>
            </div>
          ) : (
            <form onSubmit={handleSetUsername} className="modal-form-container">
              <p className="danger-zone-text" style={{margin: '0 0 16px 0'}}>
                Create a unique username to add friends and engage with the community. This cannot be changed later.
              </p>
              <input
                type="text"
                className="modal-input"
                placeholder="Choose a username"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                required
              />
              {usernameError && <p className="auth-error">{usernameError}</p>}
              <button type="submit" className="manage-billing-btn" disabled={isUsernameLoading}>
                {isUsernameLoading ? 'Saving...' : 'Save Username'}
              </button>
            </form>
          )}
        </div>
        {/* --- END OF NEW USERNAME SECTION --- */}

        {/* Active Premium Features List (for active subscribers) */}
        {isPremium && (
          <div className="account-section premium-features-section">
            <h4>
              <CheckCircle size={20} />
              Active Premium Features
            </h4>
            <div className="active-features">
              <div className="feature-item"><span>☁️ Cloud Sync</span><span className="feature-status active">Active</span></div>
              <div className="feature-item"><span>⚡ Unlimited Programs</span><span className="feature-status active">Active</span></div>
              <div className="feature-item"><span>👥 Social Features</span><span className="feature-status coming-soon">Coming Soon</span></div>
              <div className="feature-item"><span>📊 Advanced Analytics</span><span className="feature-status coming-soon">Coming Soon</span></div>
            </div>
          </div>
        )}

        {/* Subscription Management Section */}
        {stripeCustomerId && (
          <div className="account-section subscription-section">
            <h4><CreditCard size={20} />Subscription</h4>
            
            {isPremium && subscriptionCancelAtPeriodEnd && (
              <div className="subscription-cancellation-notice">
                <AlertTriangle size={16} />
                <span>Your premium access will end on {formatDate(subscriptionCurrentPeriodEnd)}.</span>
              </div>
            )}
            
            {!isPremium && subscriptionStatus === 'canceled' && (
              <div className="subscription-cancellation-notice">
                <AlertTriangle size={16} />
                <span>Your premium subscription has ended.</span>
              </div>
            )}

            <div className="subscription-info">
              <div className="subscription-detail">
                <span>Plan:</span>
                <span>Premium ($4.99/month)</span>
              </div>
              {isPremium && subscriptionCurrentPeriodEnd && (
                <div className="subscription-detail">
                  <span>{subscriptionCancelAtPeriodEnd ? 'Premium access ends:' : 'Next billing:'}</span>
                  <span><Calendar size={14} />{formatDate(subscriptionCurrentPeriodEnd)}</span>
                </div>
              )}
            </div>

            <div className="subscription-actions">
              {isPremium ? (
                <button className="manage-billing-btn" onClick={handleManageBilling} disabled={isLoading}>
                  <Settings size={16} />
                  {isLoading ? 'Loading...' : 'Manage Billing'}
                </button>
              ) : (
                <button className="manage-billing-btn" onClick={handleReactivateClick} disabled={isLoading}>
                  <Crown size={16} />
                  {isLoading ? 'Loading...' : 'Re-subscribe'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Logout Section */}
        <div className="account-section actions-section">
          <button className="logout-btn" onClick={handleLogoutClick}>
            <LogOut size={16} />Sign Out
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AccountModal;