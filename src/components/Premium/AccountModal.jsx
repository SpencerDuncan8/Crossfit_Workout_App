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
    console.log('=== DEBUGGING MANAGE BILLING ===');
    console.log('currentUser:', currentUser);
    console.log('stripeCustomerId prop:', stripeCustomerId);

    setIsLoading(true);
    try {
      // Check if customer ID exists
      if (!stripeCustomerId) {
        throw new Error('No Stripe Customer ID found. Please contact support or re-subscribe.');
      }

      console.log('Making API call to create customer portal');

      const response = await fetch('/api/create-customer-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: stripeCustomerId,
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response OK:', response.ok);

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.details || errorMessage;
        } catch (parseError) {
          try {
            const errorText = await response.text();
            errorMessage = errorText || errorMessage;
          } catch (textError) {
            console.error('Could not parse error response:', textError);
          }
        }
        throw new Error(`API Error: ${errorMessage}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (data.url) {
        console.log('Opening portal URL:', data.url);
        // Open in same tab instead of new tab for better mobile experience
        window.location.href = data.url;
      } else {
        throw new Error('No portal URL returned from Stripe');
      }

    } catch (error) {
      console.error('=== MANAGE BILLING ERROR ===');
      console.error('Error message:', error.message);
      console.error('Full error:', error);

      // Show user-friendly error message
      let userMessage = 'Unable to open billing portal. ';

      if (error.message.includes('Customer not found')) {
        userMessage += 'Your subscription may have been cancelled. Please contact support.';
      } else if (error.message.includes('Customer ID')) {
        userMessage += 'Account not properly linked to billing. Please contact support.';
      } else if (error.message.includes('HTTP 404')) {
        userMessage += 'Billing service temporarily unavailable. Please try again later.';
      } else if (error.message.includes('HTTP 500')) {
        userMessage += 'Server error. Please try again in a few moments.';
      } else {
        userMessage += 'Please try again or contact support if the problem persists.';
      }

      alert(userMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateValue) => {
    if (!dateValue) return 'N/A';

    try {
      const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
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
        {/* User Info Section */}
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

        {/* Premium Features Section */}
        {isPremium && (
          <div className="account-section premium-features-section">
            <h4>
              <CheckCircle size={20} />
              Active Premium Features
            </h4>
            <div className="active-features">
              <div className="feature-item">
                <span>☁️ Cloud Sync</span>
                <span className="feature-status active">Active</span>
              </div>
              <div className="feature-item">
                <span>⚡ Unlimited Programs</span>
                <span className="feature-status active">Active</span>
              </div>
              <div className="feature-item">
                <span>👥 Social Features</span>
                <span className="feature-status coming-soon">Coming Soon</span>
              </div>
              <div className="feature-item">
                <span>📊 Advanced Analytics</span>
                <span className="feature-status coming-soon">Coming Soon</span>
              </div>
            </div>
          </div>
        )}

        {/* Subscription Management */}
        {isPremium && (
          <div className="account-section subscription-section">
            <h4>
              <CreditCard size={20} />
              Subscription
            </h4>

            {/* Show cancellation warning if subscription is set to cancel */}
            {subscriptionCancelAtPeriodEnd && (
              <div className="subscription-cancellation-notice">
                <AlertTriangle size={16} />
                <span>Your subscription is set to cancel at the end of the billing period</span>
              </div>
            )}

            <div className="subscription-info">
              <div className="subscription-detail">
                <span>Plan:</span>
                <span>Premium ($4.99/month)</span>
              </div>
              <div className="subscription-detail">
                <span>
                  {subscriptionCancelAtPeriodEnd ? 'Subscription ends:' : 'Next billing:'}
                </span>
                <span>
                  <Calendar size={14} />
                  {formatDate(subscriptionCurrentPeriodEnd)}
                </span>
              </div>
            </div>

            <div className="subscription-actions">
              <button 
                className="manage-billing-btn" 
                onClick={handleManageBilling}
                disabled={isLoading}
              >
                <Settings size={16} />
                {isLoading ? 'Loading...' : 'Manage Billing'}
              </button>
            </div>
          </div>
        )}

        {/* Account Actions */}
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