// src/components/Workout/WorkoutSection.jsx

import React, { useState, useEffect } from 'react';
import { ChevronDown, Play } from 'lucide-react';
import ExerciseCard from './ExerciseCard.jsx';
import ConditioningCard from './ConditioningCard.jsx';

const WorkoutSection = ({ block, progress, onSetUpdate, startTimer }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (block.type === 'Warm-up' || block.type === 'Cool-down') {
      setIsCollapsed(true);
    }
  }, [block.type]);

  if (!block) return null;

  const isConditioning = block.type.startsWith('Conditioning:');
  const isStrength = block.type === 'Strength';

  return (
    <div className={`workout-section ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="section-header" onClick={() => setIsCollapsed(!isCollapsed)}>
        <h3>{block.type}</h3>
        <div className="section-meta"><ChevronDown size={24} className="collapse-icon" /></div>
      </div>
      {!isCollapsed && (
        <div className="section-content">
          {isConditioning && <ConditioningCard block={block} startTimer={startTimer} />}
          
          {block.type === 'Cardio' && (
             <>
                {block.exercises?.map((exercise, index) => (
                    <div key={index} className="exercise-card-simple">
                        <h4>{exercise.name || 'Cardio'}</h4>
                        <div className="exercise-details">
                            <span>{exercise.duration} MINS</span>
                        </div>
                    </div>
                ))}
                <button 
                    className="start-wod-button warmup-button" 
                    onClick={() => startTimer({ type: 'stopwatch' })}
                >
                    <Play size={20} /> Start Timer
                </button>
             </>
          )}
          
          {isStrength && block.exercises?.map((exercise) => {
              const exerciseId = `${block.id}-${exercise.id}`;
              return (
                <ExerciseCard 
                  key={exerciseId} 
                  exerciseId={exerciseId}
                  exercise={exercise} 
                  progress={progress[exerciseId]}
                  onSetUpdate={onSetUpdate}
                  restDuration={block.rest}
                  startTimer={startTimer}
                />
              );
          })}

          {!isStrength && !isConditioning && block.type !== 'Cardio' && block.exercises?.map((exercise, index) => (
             <div key={index} className="exercise-card-simple"><h4>{exercise.name}</h4></div>
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
        </div>
      )}
    </div>
  );
};

export default WorkoutSection;