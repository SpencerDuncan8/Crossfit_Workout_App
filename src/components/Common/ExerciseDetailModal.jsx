// src/components/Common/ExerciseDetailModal.jsx

import React, { useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { X, Copy, Pencil } from 'lucide-react';
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
  const { appState, closeModal, duplicateExerciseAsCustom, updateAppState } = useContext(AppStateContext);
  const { modalContent: exercise } = appState;

  if (!exercise) return null;

  const hasAnyDetails =
    (exercise.setup && exercise.setup.length > 0) ||
    (exercise.execution && exercise.execution.length > 0) ||
    (exercise.commonMistakes && exercise.commonMistakes.length > 0) ||
    !!exercise.modifications;

  const handleDuplicate = () => {
    const newExercise = duplicateExerciseAsCustom(exercise);
    if (newExercise) {
      alert(`"${newExercise.name}" was added to your exercises. Edit it anytime from the Exercises tab.`);
      closeModal();
    }
  };

  const handleAddDetails = () => {
    updateAppState({ pendingExerciseEditId: exercise.id });
    closeModal();
  };

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
              {exercise.modifications.easier && <p className="modification-item"><strong>Easier:</strong> {exercise.modifications.easier}</p>}
              {exercise.modifications.harder && <p className="modification-item"><strong>Harder:</strong> {exercise.modifications.harder}</p>}
            </div>
          )}

          {!hasAnyDetails && exercise.isCustom && (
            <div className="detail-empty-state">
              <p>No details added yet for this exercise.</p>
              <button type="button" className="action-btn schedule-btn detail-duplicate-btn" onClick={handleAddDetails}>
                <Pencil size={16} />
                Add Details
              </button>
            </div>
          )}

          {!exercise.isCustom && (
            <button type="button" className="action-btn schedule-btn detail-duplicate-btn" onClick={handleDuplicate}>
              <Copy size={16} />
              Duplicate & Customize
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetailModal;