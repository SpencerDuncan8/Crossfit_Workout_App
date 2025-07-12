// src/components/Premium/ReactivationModal.jsx

import React from 'react';
import Modal from '../Common/Modal.jsx';
import PaymentForm from '../Auth/PaymentForm.jsx';
import { X } from 'lucide-react';

const ReactivationModal = ({ isOpen, onClose, userEmail }) => {
  if (!isOpen) return null;

  return (
    // We use your generic Modal component for the backdrop and container
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* The content inside is a simplified version of your Auth card */}
      <div className="auth-card" style={{ animation: 'none', boxShadow: 'none', padding: '8px' }}>
        <button 
          className="modal-close-btn" 
          onClick={onClose} 
          style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}
        >
          <X size={24} />
        </button>
        <PaymentForm 
          onSuccess={onClose} 
          userEmail={userEmail} 
          // We pass null for password because this flow is for logged-in users.
          // Your server-side API does not need it.
          userPassword={null} 
        />
      </div>
    </Modal>
  );
};

export default ReactivationModal;