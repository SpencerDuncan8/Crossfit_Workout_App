// src/components/Progress/ProgressView.jsx

import React, { useContext } from 'react';
import WeightLogger from './WeightLogger.jsx';
import PhotoProgress from './PhotoProgress.jsx';
import WeightChart from '../Dashboard/WeightChart.jsx';
import { AppStateContext } from '../../context/AppContext.jsx';
import { RotateCcw } from 'lucide-react';
import './Progress.css';

const ProgressView = () => {
  // Get the renamed reset function from the context
  const { resetAllData } = useContext(AppStateContext);

  return (
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
        <button className="reset-progress-btn" onClick={resetAllData}>
          <RotateCcw size={20} />
          Reset All Data
        </button>
      </div>
    </div>
  );
};

export default ProgressView;