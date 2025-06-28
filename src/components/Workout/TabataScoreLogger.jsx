// src/components/Workout/TabataScoreLogger.jsx

import React from 'react';
import { Award } from 'lucide-react';

const TabataScoreLogger = ({ blockId, onBlockProgressUpdate, blockProgress, previousPerformance }) => {
  const roundsData = blockProgress?.rounds || Array(8).fill('');
  const score = blockProgress?.score || '—';

  const handleRepChange = (index, value) => {
    // Create a new array with the updated value
    const newRounds = [...roundsData];
    newRounds[index] = value;

    // Filter for only numeric values to calculate the score
    const numericRounds = newRounds
      .map(r => parseInt(r, 10))
      .filter(r => !isNaN(r) && r > 0);
    
    // Find the minimum rep count
    const newScore = numericRounds.length > 0 ? Math.min(...numericRounds) : '—';

    // Update the parent state
    onBlockProgressUpdate(blockId, {
      score: newScore,
      rounds: newRounds,
    });
  };

  return (
    <div className="tabata-score-logger">
      <div className="tabata-score-header">
        <label>Log Reps Per Round</label>
        <div className="tabata-score-display">
          <Award size={20} />
          <span>Your Score: <strong>{score}</strong></span>
        </div>
      </div>
      <div className="tabata-rounds-grid">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="tabata-round-input-group">
            <span className="tabata-round-label">Round {index + 1}</span>
            <div className="tabata-input-wrapper">
              <input
                type="number"
                placeholder="Reps"
                value={roundsData[index] || ''}
                onChange={(e) => handleRepChange(index, e.target.value)}
              />
              {previousPerformance?.rounds?.[index] && (
                <span className="tabata-previous-reps">
                  (Prev: {previousPerformance.rounds[index]})
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabataScoreLogger;