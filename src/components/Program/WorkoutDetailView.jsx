// src/components/Program/WorkoutDetailView.jsx

import React, { useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { lbsToKg, getUnitLabel } from '../../utils/unitUtils.js';
import './WorkoutDetailView.css';

const WorkoutDetailView = ({ workout, completedData }) => {
  const { appState } = useContext(AppStateContext); // Get global state
  
  if (!workout) return null;

  const formatTime = (seconds) => {
    if (typeof seconds !== 'number') return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Prepare display values based on unit system
  const isMetric = appState.unitSystem === 'metric';
  const unitLabel = getUnitLabel(appState.unitSystem);
  
  let displayVolume = 0;
  if (completedData) {
      const volumeLbs = completedData.weight || 0;
      displayVolume = isMetric ? lbsToKg(volumeLbs).toFixed(1) : volumeLbs.toLocaleString();
  }

  return (
    <div className="workout-detail-container">
      {completedData && (
        <div className="completed-summary">
          <h4>Workout Completed!</h4>
          {completedData.totalTime && (
            <h2 className="summary-total-time">
                Total Time: {completedData.totalTime}
            </h2>
          )}
          <div className="summary-stats">
            <span>Sets: {completedData.sets}</span>
            <span>Reps: {completedData.reps}</span>
            <span>Volume: {displayVolume} {unitLabel}</span>
          </div>
        </div>
      )}

      <div className="detail-blocks-container">
        {workout.blocks.map(block => {
          const completedBlockData = completedData?.blockTimes?.[block.id];
          const recordedBlockTime = completedBlockData?.recordedTime;
          const recordedScore = completedBlockData?.score;
          const shouldShowLapsForBlock = completedBlockData?.laps?.length > 0;

          return (
            <div key={block.id} className="detail-block-card">
              <h5 className="detail-block-title">{block.type}</h5>
              {recordedBlockTime && (
                 <div className="recorded-time-display review-mode">
                    <span className="recorded-time-label">
                      {block.type === 'Conditioning: Chipper' ? 'Chipper Time' : 'Block Time'}
                    </span>
                    <span className="recorded-time-value">{recordedBlockTime}</span>
                 </div>
              )}
              {recordedScore && (
                 <div className="recorded-score-display review-mode">
                    <span className="recorded-score-label">
                      Score
                    </span>
                    <span className="recorded-score-value">{recordedScore}</span>
                 </div>
              )}
              <ul className="detail-exercise-list">
                {block.type === 'Conditioning: EMOM' ? (
                  block.minutes.map((min, i) => <li key={i}><strong>Min {i + 1}:</strong> {min.task}</li>)
                ) : 
                block.type === 'Cardio' ? (
                  (block.exercises || []).map((ex, i) => (
                      <li key={i}>
                          <strong>{ex.duration} min:</strong> {ex.name || 'General Cardio'}
                      </li>
                  ))
                ) :
                (
                  (block.exercises || []).map((ex, i) => (
                    <li key={i}>
                      {block.type === 'Strength' && `${ex.sets.length} x `}
                      {ex.reps && `${ex.reps} `}
                      {ex.name}
                    </li>
                  ))
                )}
              </ul>
              {shouldShowLapsForBlock && (
                <div className="completed-laps-section">
                   <h5 className="detail-block-title sub-title">Round Times</h5>
                   <ul className="detail-exercise-list">
                      {completedBlockData.laps.map((lapTime, index) => (
                        <li key={index} style={{display: 'flex', justifyContent: 'space-between'}}>
                          <strong>Round {index + 1}:</strong> 
                          <span>{formatTime(lapTime)}</span>
                        </li>
                      ))}
                   </ul>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default WorkoutDetailView;