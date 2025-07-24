// src/components/Program/WorkoutDetailView.jsx

import React, { useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { lbsToKg, getUnitLabel } from '../../utils/unitUtils.js';
import { Check } from 'lucide-react';
import './WorkoutDetailView.css';

const WorkoutDetailView = ({ workout, completedData }) => {
  const { appState } = useContext(AppStateContext);

  // --- START OF NEW LOGIC ---
  // If a snapshot exists in completedData, use it as the source of truth.
  // Otherwise, fall back to the `workout` prop (for viewing non-completed workouts).
  const workoutToDisplay = completedData?.workoutSnapshot || workout;
  // Handle both old and new data structures for backward compatibility.
  const performanceStats = completedData?.stats || completedData; 
  // --- END OF NEW LOGIC ---

  if (!workoutToDisplay) {
    // Gracefully handle old logged data where the program was deleted before the snapshot feature was added.
    if (completedData) {
      return <p className="compact-preview-empty">This workout's definition was deleted, but the logged stats are preserved.</p>;
    }
    return null;
  }
  
  const formatTime = (seconds) => {
    if (typeof seconds !== 'number') return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const isMetric = appState.unitSystem === 'metric';
  const unitLabel = getUnitLabel(appState.unitSystem);
  
  let displayVolume = 0;
  if (performanceStats) {
      const volumeLbs = performanceStats.weight || 0;
      displayVolume = isMetric ? lbsToKg(volumeLbs).toFixed(1) : volumeLbs.toLocaleString();
  }

  const getBlockResultTitle = (blockType) => {
    switch(blockType) {
        case 'Conditioning: RFT': return 'RFT Time';
        case 'Conditioning: Chipper': return 'Chipper Time';
        case 'Conditioning: Tabata': return 'Tabata Score (Lowest Reps)';
        case 'Conditioning: AMRAP': return 'AMRAP Score';
        default: return 'Result';
    }
  }

  const timedResults = (performanceStats?.blockTimes
    ? Object.keys(performanceStats.blockTimes).map(blockId => {
        const blockResult = performanceStats.blockTimes[blockId];
        const blockDef = workoutToDisplay.blocks.find(b => b.id === blockId);
        if (!blockDef || (!blockResult.recordedTime && !blockResult.score)) return null;

        return (
          <div key={blockId} className="summary-result-item">
            <span className="summary-result-label">{getBlockResultTitle(blockDef.type)}</span>
            <span className="summary-result-value">{blockResult.recordedTime || blockResult.score}</span>
          </div>
        );
      })
    : []).filter(Boolean);

  return (
    <div className="workout-detail-container">
      {performanceStats && (
        <div className="completed-summary">
          <h4>Workout Completed!</h4>
          
          {timedResults.length > 0 && (
            <div className="summary-results-grid">
              {timedResults}
            </div>
          )}

          {performanceStats.sets > 0 && (
            <div className="summary-stats-section">
              <h5 className="summary-stats-title">Strength & Volume</h5>
              <div className="summary-stats">
                <span>Sets: {performanceStats.sets}</span>
                <span>Reps: {performanceStats.reps}</span>
                <span>Volume: {displayVolume} {unitLabel}</span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="detail-blocks-container">
        {workoutToDisplay.blocks.map(block => {
          const completedBlockData = performanceStats?.blockTimes?.[block.id];
          const shouldShowLapsForBlock = completedBlockData?.laps?.length > 0;
          const tabataRounds = completedBlockData?.rounds;

          return (
            <div key={block.id} className="detail-block-card">
              <h5 className="detail-block-title">{block.type.replace('Conditioning: ', '')}</h5>
              
              <ul className="detail-exercise-list">
                {block.type === 'Conditioning: Intervals' && (
                  <li>
                    <strong>{block.rounds} Rounds:</strong> {block.work}s ON / {block.rest}s OFF
                  </li>
                )}
                
                {block.type === 'Conditioning: EMOM' ? (
                  block.minutes.map((min, i) => (
                    <li key={i}>
                      <strong>Min {i + 1}:</strong>{' '}
                      {min.exercises && min.exercises.length > 0
                        ? min.exercises.map((ex, exIndex) => (
                            <span key={exIndex}>
                              {`${ex.reps || ''} ${ex.name}${exIndex < min.exercises.length - 1 ? ', ' : ''}`}
                            </span>
                          ))
                        : min.task
                      }
                    </li>
                  ))
                ) : (
                  (block.exercises || []).map((ex, i) => {
                    const trackedBlockTypes = ['Strength', 'Accessory / Carry', 'Bodyweight'];

                    if (performanceStats?.detailedProgress && trackedBlockTypes.includes(block.type)) {
                      const exerciseId = `${block.id}-${ex.id}`;
                      const progress = performanceStats.detailedProgress[exerciseId];

                      if (!progress) return null;

                      switch (block.type) {
                        case 'Strength': {
                          const completedSets = progress.sets?.filter(s => s.completed);
                          if (!completedSets || completedSets.length === 0) return null;
                          return (
                            <li key={i} className="completed-strength-exercise">
                              <strong>{ex.name}</strong>
                              <ul className="completed-sets-list">
                                {completedSets.map((set, setIndex) => {
                                  const weightLbs = parseFloat(set.weight) || 0;
                                  const displayWeight = isMetric ? lbsToKg(weightLbs).toFixed(1) : weightLbs;
                                  return (
                                    <li key={set.id || setIndex} className="completed-set-row">
                                      <span>Set {setIndex + 1}:</span>
                                      <span>{set.reps} reps at {displayWeight} {unitLabel}</span>
                                    </li>
                                  );
                                })}
                              </ul>
                            </li>
                          );
                        }
                        case 'Accessory / Carry':
                        case 'Bodyweight': {
                          const completedSets = progress.sets?.filter(s => s.completed);
                          if (!completedSets || completedSets.length === 0) return null;
                          return (
                            <li key={i}>
                              <Check size={16} className="completed-item-marker" />
                              <strong>{ex.name}</strong> ({completedSets.length} / {progress.sets.length} sets done)
                            </li>
                          );
                        }
                        default:
                          return null;
                      }
                    } else {
                      return (
                        <li key={ex.id || i}>
                          {block.type === 'Strength' && `${ex.sets.length} x `}
                          {(ex.reps || ex.duration) && `${ex.reps || ex.duration} `}
                          {ex.name}
                          {block.type === 'Cardio' && ' min'}
                        </li>
                      );
                    }
                  })
                )}
              </ul>
              {tabataRounds && (
                <div className="completed-laps-section">
                   <h5 className="detail-block-title sub-title">Reps per Round</h5>
                   <ul className="detail-exercise-list">
                      {tabataRounds.map((reps, index) => (
                        <li key={index} style={{display: 'flex', justifyContent: 'space-between'}}>
                          <strong>Round {index + 1}:</strong> 
                          <span>{reps || 0} reps</span>
                        </li>
                      ))}
                   </ul>
                </div>
              )}
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