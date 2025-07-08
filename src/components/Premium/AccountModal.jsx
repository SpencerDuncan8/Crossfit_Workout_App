// src/components/Premium/AccountModal.jsx

import React, { useState } from 'react';
import { Crown, User, CreditCard, Settings, LogOut, AlertTriangle, Calendar, CheckCircle } from 'lucide-react';
import Modal from '../Common/Modal.jsx';

const AccountModal = ({ isOpen, onClose, currentUser, isPremium, onLogout }) => {
  const [showDowngradeConfirm, setShowDowngradeConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleManageBilling = async () => {
  console.log('=== DEBUGGING MANAGE BILLING ===');
  console.log('currentUser:', currentUser);
  console.log('currentUser.stripeCustomerId:', currentUser?.stripeCustomerId);
  
  setIsLoading(true);
  try {
    // Check if customer ID exists
    if (!currentUser?.stripeCustomerId) {
      throw new Error('No Stripe Customer ID found. User may need to re-subscribe.');
    }

    console.log('Making API call to /api/create-customer-portal');
    
    const response = await fetch('/api/create-customer-portal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId: currentUser.stripeCustomerId,
      }),
    });

    console.log('Raw response:', response);
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);

    // Get response text first to see what we actually received
    const responseText = await response.text();
    console.log('Raw response text:', responseText);

    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse response as JSON:', parseError);
      throw new Error(`API returned invalid JSON. Status: ${response.status}, Response: ${responseText}`);
    }

    console.log('Parsed response data:', data);
    
    if (!response.ok) {
      throw new Error(`API Error (${response.status}): ${data.error || responseText}`);
    }
    
    if (data.url) {
      console.log('Opening portal URL:', data.url);
      window.open(data.url, '_blank');
    } else {
      throw new Error(`No URL returned. Response: ${JSON.stringify(data)}`);
    }
  } catch (error) {
    console.error('=== MANAGE BILLING ERROR ===');
    console.error('Error type:', typeof error);
    console.error('Error constructor:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Full error object:', error);
    console.error('Error stack:', error.stack);
    
    alert(`Billing portal error: ${error.message || 'Unknown error occurred'}`);
  } finally {
    setIsLoading(false);
  }
};

  const handleDowngrade = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement downgrade logic
      console.log('Downgrading user...');
      setShowDowngradeConfirm(false);
      // Show success message
    } catch (error) {
      console.error('Downgrade failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (showDowngradeConfirm) {
    return (
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        title="Confirm Downgrade"
      >
        <div className="account-modal-content">
          <div className="downgrade-warning">
            <AlertTriangle size={48} className="warning-icon" />
            <h3>Are you sure you want to downgrade?</h3>
            <p>You'll lose access to:</p>
            <ul className="downgrade-loss-list">
              <li>Cloud sync across devices</li>
              <li>Unlimited custom programs</li>
              <li>Social features & sharing</li>
              <li>Advanced analytics</li>
              <li>Priority support</li>
            </ul>
            <p className="downgrade-note">
              Your data will remain safe, but you'll be limited to 3 programs and local storage only.
            </p>
          </div>
          
          <div className="downgrade-actions">
            <button 
              className="cancel-btn" 
              onClick={() => setShowDowngradeConfirm(false)}
              disabled={isLoading}
            >
              Keep Premium
            </button>
            <button 
              className="confirm-downgrade-btn" 
              onClick={handleDowngrade}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Confirm Downgrade'}
            </button>
          </div>
        </div>
      </Modal>
    );
  }

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
            <div className="subscription-info">
              <div className="subscription-detail">
                <span>Plan:</span>
                <span>Premium ($4.99/month)</span>
              </div>
              <div className="subscription-detail">
                <span>Next billing:</span>
                <span>
                  <Calendar size={14} />
                  {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
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
              <button 
                className="downgrade-btn" 
                onClick={() => setShowDowngradeConfirm(true)}
                disabled={isLoading}
              >
                Downgrade to Free
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