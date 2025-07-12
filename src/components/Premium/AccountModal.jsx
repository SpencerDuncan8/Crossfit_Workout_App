// src/components/Premium/AccountModal.jsx

import React, { useState, useEffect } from 'react';
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
  setIsReactivationModalOpen // This prop is used to open the new modal
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && refreshSubscriptionData) {
      refreshSubscriptionData();
    }
  }, [isOpen, refreshSubscriptionData]);

  // This function sends the user to the Stripe portal to manage an ACTIVE subscription.
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

  // This function is for the "Re-subscribe" button for CANCELED users.
  const handleReactivateClick = () => {
    onClose(); // Close the account modal
    setIsReactivationModalOpen(true); // Open the dedicated reactivation modal
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
                // If user is premium, they can manage billing (which includes resuming a pending cancellation).
                <button className="manage-billing-btn" onClick={handleManageBilling} disabled={isLoading}>
                  <Settings size={16} />
                  {isLoading ? 'Loading...' : 'Manage Billing'}
                </button>
              ) : (
                // If user is NOT premium but has a Stripe ID, they must have canceled.
                // Show the Re-subscribe button which triggers our new modal flow.
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
          <button className="logout-btn" onClick={onLogout}><LogOut size={16} />Sign Out</button>
        </div>
      </div>
    </Modal>
  );
};

export default AccountModal;