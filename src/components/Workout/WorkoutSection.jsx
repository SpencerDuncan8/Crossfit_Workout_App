// src/components/Workout/WorkoutSection.jsx

import React, { useState, useEffect } from 'react';
import { ChevronDown, Play, Flag, CheckCircle } from 'lucide-react';
import ExerciseCard from './ExerciseCard.jsx';
import ConditioningCard from './ConditioningCard.jsx';
import TabataScoreLogger from './TabataScoreLogger.jsx';

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const WorkoutSection = ({ block, progress, onSetUpdate, startTimer, setActiveView, timer, blockProgress, onBlockProgressUpdate }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (block.type === 'Warm-up' || block.type === 'Cool-down') {
      setIsCollapsed(true);
    }
  }, [block.type]);

  if (!block) return null;

  const isConditioning = block.type.startsWith('Conditioning:');
  const isStrength = block.type === 'Strength';
  const isBodyweight = block.type === 'Bodyweight';
  const isAccessory = block.type === 'Accessory / Carry';
  const isAmrap = block.type === 'Conditioning: AMRAP';
  const isTabata = block.type === 'Conditioning: Tabata';
  
  const shouldShowLaps = timer && timer.isActive && timer.laps.length > 0 && 
                         (block.type === 'Conditioning: RFT');

  const isChipperTimeRecorded = blockProgress?.recordedTime;

  return (
    <div className={`workout-section ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="section-header" onClick={() => setIsCollapsed(!isCollapsed)}>
        <h3>{block.type.replace('Conditioning: ', '')}</h3>
        <div className="section-meta"><ChevronDown size={24} className="collapse-icon" /></div>
      </div>
      {!isCollapsed && (
        <div className="section-content">
          
          {isConditioning && <ConditioningCard block={block} startTimer={startTimer} previousPerformance={block.previousPerformance} />}

          {isTabata && (
            <TabataScoreLogger
              blockId={block.id}
              blockProgress={blockProgress}
              onBlockProgressUpdate={onBlockProgressUpdate}
              previousPerformance={block.previousPerformance}
            />
          )}

          {isAmrap && (
            <div className="amrap-score-logger">
              <label htmlFor={`amrap-score-${block.id}`}>
                <CheckCircle size={18} />
                Log Your Score
              </label>
              <input
                id={`amrap-score-${block.id}`}
                type="text"
                placeholder="e.g., 5 Rounds + 12 Reps"
                value={blockProgress?.score || ''}
                onChange={(e) => onBlockProgressUpdate(block.id, 'score', e.target.value)}
              />
            </div>
          )}

          {isChipperTimeRecorded && (
            <div className="recorded-time-display">
              <CheckCircle size={24} className="recorded-time-icon" />
              <div>
                <span className="recorded-time-label">Chipper Time</span>
                <span className="recorded-time-value">{blockProgress.recordedTime}</span>
              </div>
            </div>
          )}
          
          {shouldShowLaps && (
            <div className="lap-times-container section-laps">
              <h3 className="lap-times-title"><Flag size={18}/> Round Times</h3>
              <div className="lap-times-list">
                  {timer.laps.map((lapTime, index) => (
                      <div key={index} className="lap-time-item">
                          <span>Round {index + 1}</span>
                          <span className="lap-time-value">{formatTime(lapTime)}</span>
                      </div>
                  ))}
              </div>
            </div>
          )}
          
          {(isStrength || isBodyweight || isAccessory) && (
            <>
              {block.exercises?.map((exercise) => {
                const exerciseId = `${block.id}-${exercise.id}`;
                return (
                  <ExerciseCard 
                    key={exerciseId} 
                    blockId={block.id}
                    exercise={exercise} 
                    progress={progress[exerciseId]}
                    onSetUpdate={onSetUpdate}
                    restDuration={block.rest}
                    startTimer={startTimer}
                    blockType={block.type}
                    setActiveView={setActiveView}
                    previousPerformance={exercise.previousPerformance}
                  />
                );
              })}
              {(isBodyweight || isAccessory) && (
                <button 
                    className="start-wod-button bodyweight-button" 
                    onClick={() => startTimer({ type: 'stopwatch' })}
                >
                    <Play size={20} /> Start Timer
                </button>
              )}
            </>
          )}
          
          {!isStrength && !isBodyweight && !isConditioning && !isAccessory && block.exercises?.map((exercise, index) => (
             <ExerciseCard
                key={exercise.id || index}
                exercise={exercise}
                blockType={block.type}
              />
          ))}

          {block.type === 'Warm-up' && (
             <button 
                className="start-wod-button warmup-button" 
                onClick={() => startTimer({ type: 'stopwatch' })}
              >
                <Play size={20} />
                Start Warm-up Timer
              </button>
          )}

          {block.type === 'Cool-down' && (
             <button 
                className="start-wod-button cooldown-button" 
                onClick={() => startTimer({ type: 'stopwatch' })}
              >
                <Play size={20} />
                Start Cool-down Timer
              </button>
          )}

          {block.type === 'Cardio' && (
             <button 
                className="start-wod-button warmup-button" 
                onClick={() => startTimer({ type: 'stopwatch' })}
              >
                <Play size={20} /> Start Timer
              </button>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkoutSection;