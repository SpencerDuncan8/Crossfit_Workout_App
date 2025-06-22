// src/components/Program/WorkoutDetailView.jsx

import React from 'react';
import './WorkoutDetailView.css';

const WorkoutDetailView = ({ workout, completedData }) => {
  if (!workout) return null;

  return (
    <div className="workout-detail-container">
      {completedData && (
        <div className="completed-summary">
          <h4>Workout Completed!</h4>
          <div className="summary-stats">
            <span>Sets: {completedData.sets}</span>
            <span>Reps: {completedData.reps}</span>
            <span>Volume: {completedData.weight.toLocaleString()} lbs</span>
          </div>
        </div>
      )}

      <div className="detail-blocks-container">
        {workout.blocks.map(block => (
          <div key={block.id} className="detail-block-card">
            <h5 className="detail-block-title">{block.type}</h5>
            <ul className="detail-exercise-list">
              {block.type === 'Conditioning: EMOM' ? (
                block.minutes.map((min, i) => <li key={i}><strong>Min {i + 1}:</strong> {min.task}</li>)
              ) : (
                (block.exercises || []).map((ex, i) => (
                  <li key={i}>
                    {block.type === 'Strength' && `${ex.sets.length} x `}
                    {ex.reps && `${ex.reps} `}
                    {ex.name}
                  </li>
                ))
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutDetailView;