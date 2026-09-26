// src/components/Common/QuickAddExerciseModal.jsx

import React, { useState, useEffect, useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { getExerciseCategories } from '../../data/exerciseDatabase.js';
import { X } from 'lucide-react';
import './QuickAddExerciseModal.css';

const FALLBACK_CATEGORIES = ['Upper Body', 'Lower Body', 'Full Body', 'Core & Cardio', 'Other'];

const QuickAddExerciseModal = ({ isOpen, initialName, onClose, onCreated }) => {
  const { addCustomExercise } = useContext(AppStateContext);
  const [name, setName] = useState(initialName || '');
  const [category, setCategory] = useState('');

  const categories = Array.from(new Set([...getExerciseCategories(), ...FALLBACK_CATEGORIES])).sort();

  useEffect(() => {
    if (isOpen) {
      setName(initialName || '');
      setCategory(categories[0] || 'Other');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialName]);

  if (!isOpen) return null;

  const handleSave = () => {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    const newExercise = addCustomExercise({ name: trimmedName, category });
    if (newExercise) {
      onCreated(newExercise);
    }
  };

  return (
    <div className="quick-add-backdrop" onClick={onClose}>
      <div className="quick-add-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="quick-add-header">
          <h3 className="quick-add-title">New Exercise</h3>
          <button className="quick-add-close-btn" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <div className="modal-form-container">
          <div>
            <label className="modal-label">Exercise Name</label>
            <input
              type="text"
              className="modal-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Sandbag Carry"
              autoFocus
            />
          </div>

          <div>
            <label className="modal-label">Category</label>
            <select
              className="modal-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" className="action-btn" onClick={onClose}>Cancel</button>
            <button
              type="button"
              className="action-btn schedule-btn"
              onClick={handleSave}
              disabled={!name.trim()}
            >
              Save & Use
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAddExerciseModal;