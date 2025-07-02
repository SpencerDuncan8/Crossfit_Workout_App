// src/components/Program/WorkoutDetailView.jsx

import React, { useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { lbsToKg, getUnitLabel } from '../../utils/unitUtils.js';
import { Check } from 'lucide-react';
import './WorkoutDetailView.css';

const WorkoutDetailView = ({ workout, completedData }) => {
  const { appState } = useContext(AppStateContext);
  
  if (!workout) return null;

  const formatTime = (seconds) => {
    if (typeof seconds !== 'number') return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const isMetric = appState.unitSystem === 'metric';
  const unitLabel = getUnitLabel(appState.unitSystem);
  
  let displayVolume = 0;
  if (completedData) {
      const volumeLbs = completedData.weight || 0;
      displayVolume = isMetric ? lbsToKg(volumeLbs).toFixed(1) : volumeLbs.toLocaleString();
  }

  // --- FIX: Helper to generate specific titles for timed/scored blocks ---
  const getBlockResultTitle = (blockType) => {
    switch(blockType) {
        case 'Conditioning: RFT': return 'RFT Time';
        case 'Conditioning: Chipper': return 'Chipper Time';
        case 'Conditioning: Tabata': return 'Tabata Score (Lowest Reps)';
        case 'Conditioning: AMRAP': return 'AMRAP Score';
        default: return 'Result';
    }
  }

  const timedResults = (completedData?.blockTimes
    ? Object.keys(completedData.blockTimes).map(blockId => {
        const blockResult = completedData.blockTimes[blockId];
        const blockDef = workout.blocks.find(b => b.id === blockId);
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
      {completedData && (
        <div className="completed-summary">
          <h4>Workout Completed!</h4>
          
          {timedResults.length > 0 && (
            <div className="summary-results-grid">
              {timedResults}
            </div>
          )}

          {completedData.sets > 0 && (
            <div className="summary-stats-section">
              <h5 className="summary-stats-title">Strength & Volume</h5>
              <div className="summary-stats">
                <span>Sets: {completedData.sets}</span>
                <span>Reps: {completedData.reps}</span>
                <span>Volume: {displayVolume} {unitLabel}</span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="detail-blocks-container">
        {workout.blocks.map(block => {
          const completedBlockData = completedData?.blockTimes?.[block.id];
          const shouldShowLapsForBlock = completedBlockData?.laps?.length > 0;
          const tabataRounds = completedBlockData?.rounds;

          return (
            <div key={block.id} className="detail-block-card">
              <h5 className="detail-block-title">{block.type.replace('Conditioning: ', '')}</h5>
              
              <ul className="detail-exercise-list">
                {block.type === 'Conditioning: EMOM' ? (
                  block.minutes.map((min, i) => <li key={i}><strong>Min {i + 1}:</strong> {min.task}</li>)
                ) : 
                (
                  (block.exercises || []).map((ex, i) => {
                    const trackedBlockTypes = ['Strength', 'Accessory / Carry', 'Bodyweight'];

                    if (completedData?.detailedProgress && trackedBlockTypes.includes(block.type)) {
                      const exerciseId = `${block.id}-${ex.id}`;
                      const progress = completedData.detailedProgress[exerciseId];

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

                        case 'Accessory / Carry': {
                          const completedSets = progress.sets?.filter(s => s.completed);
                          if (!completedSets || completedSets.length === 0) return null;
                          return (
                            <li key={i}>
                              <Check size={16} className="completed-item-marker" />
                              <strong>{ex.name}</strong> ({completedSets.length} / {progress.sets.length} sets done)
                            </li>
                          );
                        }
                        
                        case 'Bodyweight': {
                          if (!progress.completed) return null;
                          return (
                            <li key={i}>
                              <Check size={16} className="completed-item-marker" />
                              <strong>{ex.name}</strong>
                            </li>
                          );
                        }
                        default:
                          return null;
                      }
                    } else {
                      return (
                        <li key={i}>
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