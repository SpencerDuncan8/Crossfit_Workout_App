// src/components/Premium/PremiumModal.jsx

import React, { useState } from 'react';
import { Crown, Check, X, Users, TrendingUp, Cloud, Zap } from 'lucide-react';
import Modal from '../Common/Modal.jsx';
import Auth from '../Auth/Auth.jsx';

const PremiumModal = ({ isOpen, onClose }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleUpgradeClick = () => {
    setShowAuthModal(true);
  };

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
    onClose(); // Also close the premium modal
  };

  const features = [
    {
      icon: <Cloud size={20} />,
      title: "Cloud Sync",
      description: "Access your workouts from any device with automatic cloud backup"
    },
    {
      icon: <Zap size={20} />,
      title: "Unlimited Programs",
      description: "Create as many custom workout programs as you want"
    },
    {
      icon: <Users size={20} />,
      title: "Social Features",
      description: "Share workouts, add friends, and compete on leaderboards"
    },
    {
      icon: <TrendingUp size={20} />,
      title: "Advanced Analytics",
      description: "Detailed progress tracking and performance insights"
    }
  ];

  const freeFeatures = [
    "Full workout editor",
    "Calendar scheduling", 
    "Progress tracking",
    "3 custom programs",
    "Local storage only"
  ];

  const premiumFeatures = [
    "Everything in Free",
    "Unlimited custom programs",
    "Cloud sync across devices",
    "Social features & sharing",
    "Advanced analytics",
    "Priority support",
    "Early access to new features"
  ];

  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        title={
          <div className="premium-modal-title">
            <Crown size={24} style={{ color: '#fbbf24' }} />
            <span>Upgrade to Premium</span>
          </div>
        }
      >
        <div className="premium-modal-content">
          <div className="premium-hero">
            <h3>Unlock the Full BlockFit Experience</h3>
            <p>Take your fitness journey to the next level with unlimited programs, cloud sync, and social features.</p>
          </div>

          <div className="premium-features-showcase">
            {features.map((feature, index) => (
              <div key={index} className="premium-feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <div className="feature-content">
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="premium-comparison">
            <div className="comparison-column free-column">
              <h4>Free</h4>
              <div className="price">$0<span>/month</span></div>
              <ul className="feature-list">
                {freeFeatures.map((feature, index) => (
                  <li key={index}>
                    <Check size={16} className="check-icon" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="comparison-column premium-column">
              <div className="premium-badge">Most Popular</div>
              <h4>Premium</h4>
              <div className="price">$4.99<span>/month</span></div>
              <ul className="feature-list">
                {premiumFeatures.map((feature, index) => (
                  <li key={index}>
                    <Check size={16} className="check-icon" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="upgrade-btn" onClick={handleUpgradeClick}>
                <Crown size={18} />
                Upgrade Now
              </button>
            </div>
          </div>

          <div className="premium-footer">
            <p>✨ Try it today. Cancel anytime.</p>
          </div>
        </div>
      </Modal>

      {showAuthModal && (
  <Modal isOpen={showAuthModal} onClose={handleAuthModalClose}>
    <Auth closeModal={handleAuthModalClose} defaultMode="upgrade" />
  </Modal>
)}
    </>
  );
};

export default PremiumModal;