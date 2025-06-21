// src/components/Workout/WorkoutSection.jsx

import React, { useState, useEffect } from 'react'; // Added useEffect
import { ChevronDown } from 'lucide-react';
import ExerciseCard from './ExerciseCard.jsx';
import ConditioningCard from './ConditioningCard.jsx';

const WorkoutSection = ({ title, sectionKey, data, progress, onSetUpdate, isEditable }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // This effect will run once when the component mounts
  useEffect(() => {
    if (title === 'Warm-up' || title === 'Cool-down') {
      setIsCollapsed(true);
    }
  }, [title]); // The dependency array ensures this runs only when the title changes (i.e., once)

  if (!data) return null;
  
  if (data.description) {
    return (
      <div className="workout-section">
        <div className="section-header simple-header"><h3>{title}</h3></div>
        <div className="section-content"><p className="cooldown-description">{data.description}</p></div>
      </div>
    );
  }

  const isConditioning = title === 'Conditioning';

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
          {isConditioning ? (
            <ConditioningCard data={data} isEditable={isEditable} />
          ) : (
            data.exercises?.map((exercise, index) => {
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
            })
          )}
        </div>
      )}
    </div>
  );
};

// THE MISSING LINE THAT CAUSED THE ERROR
export default WorkoutSection;