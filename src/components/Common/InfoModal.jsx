// src/components/Common/InfoModal.jsx

import React, { useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { X } from 'lucide-react';

const InfoModal = () => {
  const { appState, closeInfoModal } = useContext(AppStateContext);
  const { infoModalContent: content } = appState;

  if (!content) return null;

  return (
    <div className="modal-backdrop" onClick={closeInfoModal}>
      <div className="info-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="info-modal-close-btn" onClick={closeInfoModal}>
          <X size={24} />
        </button>
        
        <h2 className="info-modal-title">{content.title}</h2>

        <div className="info-modal-content">
          <p className="info-modal-description">{content.description}</p>
          
          {content.points && content.points.length > 0 && (
            <div className="info-detail-section">
              <h3 className="info-detail-section-title">Key Points</h3>
              <ul className="info-detail-list">
                {content.points.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoModal;