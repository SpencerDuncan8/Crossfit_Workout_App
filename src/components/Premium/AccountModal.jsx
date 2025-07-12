// src/components/Premium/AccountModal.jsx

import React, { useState, useEffect } from 'react';
import { Crown, User, CreditCard, Settings, LogOut, Calendar, AlertTriangle } from 'lucide-react';
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
  subscriptionStatus, // You need to make sure this is passed from AppContext
  refreshSubscriptionData
}) => {
  const [isLoading, setIsLoading] = useState(false);

  // Refresh subscription data when modal opens
  useEffect(() => {
    if (isOpen && refreshSubscriptionData) {
      refreshSubscriptionData();
    }
  }, [isOpen, refreshSubscriptionData]);

  const handleManageBilling = async () => {
    setIsLoading(true);
    try {
      if (!stripeCustomerId) {
        throw new Error('No Stripe Customer ID found. Please contact support.');
      }

      const response = await fetch('/api/create-customer-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: stripeCustomerId,
        }),
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
      console.error('Manage Billing Error:', error);
      alert(`Unable to open billing portal. ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Format date for display
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
      console.error('Error formatting date:', error);
      return 'N/A';
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title={
        <div className="account-modal-title">
          <User size={24} />
          <span>Account</span>
          {isPremium && <Crown size={20} className="premium-crown" />}
        </div>
      }
    >
      <div className="account-modal-content">
        {/* User Info Section (remains the same) */}
        <div className="account-section user-info-section">
          <div className="user-avatar">
            <User size={32} />
          </div>
          <div className="user-details">
            <h3>{currentUser?.email}</h3>
            <div className="user-status">
              {isPremium ? (
                <span className="premium-status">
                  <Crown size={16} />
                  Premium Member
                </span>
              ) : (
                <span className="free-status">Free Account</span>
              )}
            </div>
          </div>
        </div>

        {/* --- UPDATED LOGIC: Subscription Management Section --- */}
        {/* This section now shows for active premium users OR users who previously had a subscription */}
        {(isPremium || (subscriptionStatus === 'canceled' && stripeCustomerId)) && (
          <div className="account-section subscription-section">
            <h4>
              <CreditCard size={20} />
              Subscription
            </h4>

            {/* If the subscription is active but set to cancel */}
            {isPremium && subscriptionCancelAtPeriodEnd && (
              <div className="subscription-cancellation-notice">
                <AlertTriangle size={16} />
                <span>Your premium access will end on {formatDate(subscriptionCurrentPeriodEnd)}.</span>
              </div>
            )}

            {/* If the subscription has already been canceled and expired */}
            {!isPremium && subscriptionStatus === 'canceled' && (
              <div className="subscription-cancellation-notice">
                <AlertTriangle size={16} />
                <span>Your premium subscription has ended. Reactivate to regain access to all features.</span>
              </div>
            )}

            <div className="subscription-info">
              <div className="subscription-detail">
                <span>Plan:</span>
                <span>Premium ($4.99/month)</span>
              </div>

              {/* Show 'Next billing' or 'Ends on' date only if the user is currently premium */}
              {isPremium && subscriptionCurrentPeriodEnd && (
                <div className="subscription-detail">
                  <span>
                    {subscriptionCancelAtPeriodEnd ? 'Premium access ends:' : 'Next billing:'}
                  </span>
                  <span>
                    <Calendar size={14} />
                    {formatDate(subscriptionCurrentPeriodEnd)}
                  </span>
                </div>
              )}
            </div>

            <div className="subscription-actions">
              {/* The button text and action now depend on the user's status */}
              <button 
                className="manage-billing-btn" 
                onClick={handleManageBilling}
                disabled={isLoading}
              >
                <Settings size={16} />
                {isLoading 
                  ? 'Loading...' 
                  : (isPremium ? 'Manage Billing' : 'Reactivate Subscription')
                }
              </button>
            </div>
          </div>
        )}

        {/* Account Actions Section (remains the same) */}
        <div className="account-section actions-section">
          <button className="logout-btn" onClick={onLogout}>
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AccountModal;