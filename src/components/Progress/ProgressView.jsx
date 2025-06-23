// src/components/Progress/ProgressView.jsx

import React, { useState, useContext } from 'react';
import WeightLogger from './WeightLogger.jsx';
import PhotoProgress from './PhotoProgress.jsx';
import WeightChart from '../Dashboard/WeightChart.jsx';
import { AppStateContext } from '../../context/AppContext.jsx';
import Modal from '../Common/Modal.jsx'; // <-- THE FIX: Import the modal component
import { RotateCcw } from 'lucide-react';
import './Progress.css';

const ProgressView = () => {
  const { resetAllData } = useContext(AppStateContext);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false); // <-- THE FIX: State for the confirmation modal

  // --- THE FIX: This handler calls the real reset function ---
  const handleConfirmReset = () => {
    resetAllData();
    setIsResetModalOpen(false);
  };

  return (
    <>
      <div className="progress-view-container">
        <div className="page-header">
          <h1>Your Progress</h1>
          <p>Track your transformation and celebrate your achievements.</p>
        </div>

        <div className="progress-chart-container">
          <WeightChart />
        </div>

        <WeightLogger />
        
        <PhotoProgress />

        <div className="progress-card danger-zone">
          <div className="progress-card-header">
            <h3 className="progress-card-title">Advanced Options</h3>
          </div>
          <p className="danger-zone-text">
            Permanently delete all saved progress and workouts. This action cannot be undone.
          </p>
          {/* --- THE FIX: The button now opens the modal --- */}
          <button className="reset-progress-btn" onClick={() => setIsResetModalOpen(true)}>
            <RotateCcw size={20} />
            Reset All Data
          </button>
        </div>
      </div>

      {/* --- THE FIX: The new confirmation modal --- */}
      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Reset All Data"
      >
        <div className="modal-form-container">
          <p className="modal-confirm-text">
            Are you sure you want to reset all progress and workouts? This action cannot be undone.
          </p>
          <div className="modal-actions">
            <button type="button" className="action-btn" onClick={() => setIsResetModalOpen(false)}>
              Cancel
            </button>
            <button type="button" className="action-btn danger-btn" onClick={handleConfirmReset}>
              Yes, Reset Everything
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProgressView;