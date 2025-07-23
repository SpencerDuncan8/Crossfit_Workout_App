// src/components/Program/CompactWorkoutPreview.jsx

import React from 'react';
import './ProgramOverview.css'; // We will add the necessary styles to this shared CSS file

const CompactWorkoutPreview = ({ blocks }) => {
  if (!blocks || blocks.length === 0) {
    return <p className="compact-preview-empty">No blocks in this workout.</p>;
  }

  // A helper to format the exercise line for different block types
  const renderExerciseLine = (block, exercise) => {
    switch (block.type) {
      case 'Strength':
        return `${exercise.sets.length}x ${exercise.name}`;
      case 'Conditioning: RFT':
      case 'Conditioning: Chipper':
        return `${exercise.reps} ${exercise.name}`;
      case 'Cardio':
        return `${exercise.duration} min ${exercise.name}`;
      default:
        return exercise.name;
    }
  };

  return (
    <div className="compact-preview-container">
      {blocks.map(block => (
        <div key={block.id} className="compact-preview-block">
          <h5 className="compact-preview-title">{block.type.replace('Conditioning: ', '')}</h5>
<ul className="compact-preview-list">
  {block.type === 'Conditioning: EMOM' ? (
    (block.minutes || []).map((min, i) => {
      // Create the descriptive text from the new structured exercises
      const taskDescription = (min.exercises || [])
        .map(ex => `${ex.reps || ''} ${ex.name}`.trim())
        .join(', ');
      
      return (
        <li key={i}>
          {`Min ${i + 1}: ${taskDescription.substring(0, 25)}${taskDescription.length > 25 ? '...' : ''}`}
        </li>
      );
    })
  ) : (
    (block.exercises || []).map((ex, i) => (
      <li key={i}>{renderExerciseLine(block, ex)}</li>
    ))
  )}
</ul>
        </div>
      ))}
    </div>
  );
};

export default CompactWorkoutPreview;