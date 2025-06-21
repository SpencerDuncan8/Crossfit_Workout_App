// src/components/Progress/ProgressView.jsx

import React from 'react';
import WeightLogger from './WeightLogger.jsx';
import PhotoProgress from './PhotoProgress.jsx'; // Import the new component
import WeightChart from '../Dashboard/WeightChart.jsx';
import './Progress.css';

const ProgressView = () => {
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
      
      {/* Replace the placeholder with the real component */}
      <PhotoProgress />

    </div>
  );
};

export default ProgressView;