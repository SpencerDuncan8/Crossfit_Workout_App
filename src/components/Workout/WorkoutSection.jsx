// src/components/Workout/WorkoutSection.jsx

import React, { useState, useEffect, useContext } from 'react';
import { ChevronDown, Timer, Play } from 'lucide-react'; // Add Play icon
import ExerciseCard from './ExerciseCard.jsx';
import ConditioningCard from './ConditioningCard.jsx';
import { AppStateContext } from '../../context/AppContext.jsx';

const WorkoutSection = ({ title, sectionKey, data, progress, onSetUpdate, isEditable }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { startTimer } = useContext(AppStateContext);

  useEffect(() => {
    // Keep warm-up collapsed by default, but allow cool-down to be open if it has no exercises
    if (title === 'Warm-up' || (title === 'Cool-down' && data.exercises)) {
      setIsCollapsed(true);
    }
  }, [title, data.exercises]);


  if (!data) return null;
  
  if (data.description && !data.exercises) { // For simple cool-downs
    return (
      <div className="workout-section">
        <div className="section-header simple-header"><h3>{title}</h3></div>
        <div className="section-content"><p className="cooldown-description">{data.description}</p></div>
      </div>
    );
  }

  const isConditioning = title === 'Conditioning';
  const isWarmup = title === 'Warm-up';

  return (
    <div className={`workout-section ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="section-header" onClick={() => setIsCollapsed(!isCollapsed)}>
        <h3>{title}</h3>
        <div className="section-meta">
          {data.duration && <span>{data.duration}</span>}
          {isConditioning && data.format && <span>{data.format}</span>}
          <ChevronDown size={24} className="collapse-icon" />
        </div>
      </div>
      {!isCollapsed && (
        <div className="section-content">
          {isConditioning && <ConditioningCard data={data} isEditable={isEditable} />}
          
          {/* Render regular exercises for Warm-up, Strength, etc. */}
          {!isConditioning && data.exercises?.map((exercise, index) => {
              const exerciseId = `${sectionKey}-${index}`;
              return (
                <ExerciseCard 
                  key={exerciseId} 
                  exerciseId={exerciseId}
                  exercise={exercise} 
                  progress={progress[exerciseId]}
                  onSetUpdate={onSetUpdate}
                  isEditable={isEditable}
                />
              );
            })}
          
          {/* THE FIX: Add the large start button specifically for the warm-up section */}
          {isWarmup && (
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