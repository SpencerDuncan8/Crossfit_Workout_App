// src/components/Common/ExerciseDetailModal.jsx

import React, { useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { X } from 'lucide-react';
import './ExerciseDetailModal.css';

const DetailSection = ({ title, items }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="detail-section">
      <h3 className="detail-section-title">{title}</h3>
      <ul className="detail-list">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const ExerciseDetailModal = () => {
  const { appState, closeModal } = useContext(AppStateContext);
  const { modalContent: exercise } = appState;

  if (!exercise) return null;

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={closeModal}>
          <X size={24} />
        </button>
        
        <h2 className="modal-title">{exercise.name}</h2>

        <div className="modal-content">
          <DetailSection title="Setup" items={exercise.setup} />
          <DetailSection title="Execution" items={exercise.execution} />
          <DetailSection title="Common Mistakes" items={exercise.commonMistakes} />
          
          {exercise.modifications && (
            <div className="detail-section">
              <h3 className="detail-section-title">Modifications</h3>
              <p className="modification-item"><strong>Easier:</strong> {exercise.modifications.easier}</p>
              <p className="modification-item"><strong>Harder:</strong> {exercise.modifications.harder}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetailModal;