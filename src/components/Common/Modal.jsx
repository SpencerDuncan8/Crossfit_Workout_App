// src/components/Common/Modal.jsx

import React from 'react';
import { X } from 'lucide-react';
import './Modal.css';

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {/* THE FIX: Allow title to be a string or a full JSX element */}
          {title && (typeof title === 'string' ? <h2 className="modal-title">{title}</h2> : title)}
          <button className="modal-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;