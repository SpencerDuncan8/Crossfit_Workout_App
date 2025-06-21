// src/components/Workout/ExerciseCard.jsx

import React, { useContext, useState, useEffect } from 'react';
import { Check, Square, Plus, Minus, Timer, HelpCircle } from 'lucide-react';
import { useWindowSize } from '../../hooks/useWindowSize.jsx';
import { AppStateContext } from '../../context/AppContext.jsx';

const SetRow = ({ setIndex, exerciseId, onSetUpdate, progressData, targetReps, onRestClick }) => {
  const { completed, weight, reps } = progressData;
  const { width } = useWindowSize();
  const isMobile = width < 450;

  // Local state for instant text input feedback
  const [localWeight, setLocalWeight] = useState(weight);
  const [localReps, setLocalReps] = useState(reps);

  // Syncs local state if props change from parent
  useEffect(() => {
    setLocalWeight(weight);
    setLocalReps(reps);
  }, [weight, reps]);
  
  // This is the key: Update the parent state on blur
  const handleBlur = (field, value) => {
    onSetUpdate(exerciseId, setIndex, field, value);
  };
  
  const handleCheckboxClick = () => {
    onSetUpdate(exerciseId, setIndex, 'completed', !completed);
  };
  
  const handleIncrement = (field, value, amount) => {
    const newValue = (parseInt(value, 10) || 0) + amount;
    if(field === 'weight') setLocalWeight(newValue);
    if(field === 'reps') setLocalReps(newValue);
    onSetUpdate(exerciseId, setIndex, field, newValue);
  };
  
  const handleDecrement = (field, value, amount) => {
    const newValue = Math.max(0, (parseInt(value, 10) || 0) - amount);
    if(field === 'weight') setLocalWeight(newValue);
    if(field === 'reps') setLocalReps(newValue);
    onSetUpdate(exerciseId, setIndex, field, newValue);
  };

  const setStatus = (
    <div className="set-status">
      <button className="set-checkbox" onClick={handleCheckboxClick}>
        {completed ? <Check size={20} /> : <Square size={20} />}
      </button>
      <span className="set-number">Set {setIndex + 1}</span>
    </div>
  );

  const setInputs = (
    <div className="set-inputs-container">
      <div className="set-input-group">
        <button className="input-button" onClick={() => handleDecrement('weight', localWeight, 5)}><Minus size={16}/></button>
        <input type="number" className="set-input" placeholder="0" value={localWeight}
               onChange={(e) => setLocalWeight(e.target.value)}
               onBlur={(e) => handleBlur('weight', e.target.value)} />
        <span>lbs</span>
        <button className="input-button" onClick={() => handleIncrement('weight', localWeight, 5)}><Plus size={16}/></button>
      </div>
      <div className="set-input-group">
        <button className="input-button" onClick={() => handleDecrement('reps', localReps, 1)}><Minus size={16}/></button>
        <input type="number" className="set-input" placeholder={String(targetReps)} value={localReps}
               onChange={(e) => setLocalReps(e.target.value)}
               onBlur={(e) => handleBlur('reps', e.target.value)} />
        <span>reps</span>
        <button className="input-button" onClick={() => handleIncrement('reps', localReps, 1)}><Plus size={16}/></button>
      </div>
    </div>
  );

  return (
    <div className={`set-row-wrapper ${completed ? 'completed' : ''}`}>
      <div className={`set-row ${isMobile ? 'mobile' : ''}`}>
        {setStatus}
        {setInputs}
      </div>
      {completed && (
        <div className="set-actions">
          <button className="rest-button" onClick={onRestClick}>
            <Timer size={16} /> Start Rest
          </button>
        </div>
      )}
    </div>
  );
};


const ExerciseCard = ({ exerciseId, exercise, progress, onSetUpdate }) => {
  const { startTimer, openExerciseModal } = useContext(AppStateContext);
  const { name, sets, reps, rest, note, id } = exercise;

  const handleRestClick = () => {
    const restSeconds = parseInt(rest, 10);
    if (!isNaN(restSeconds)) {
      startTimer({ type: 'countdown', duration: restSeconds });
    }
  };

  const handleExerciseClick = () => {
    if (id) {
      openExerciseModal(id);
    }
  };

  if (sets) {
    return (
      <div className="exercise-card-interactive">
        <div className="exercise-info clickable" onClick={handleExerciseClick}>
          <h4>{name}</h4>
          <HelpCircle size={18} className="help-icon" />
        </div>
        <div className="exercise-details">
          <span>{sets} SETS</span>
          <span>{reps} REPS</span>
          {rest && <span>{rest} REST</span>}
        </div>
        {note && <p className="exercise-note">Note: {note}</p>}
        <div className="sets-container">
          {progress && progress.sets.map((set, index) => (
            <SetRow
              key={index}
              setIndex={index}
              exerciseId={exerciseId} // Pass exerciseId down
              onSetUpdate={onSetUpdate} // Pass onSetUpdate down
              progressData={set}
              targetReps={reps}
              onRestClick={handleRestClick}
            />
          ))}
        </div>
      </div>
    );
  }
  // This is for simple warm-up exercises etc.
  return ( <div className="exercise-card-simple clickable" onClick={handleExerciseClick}><h4>{name}</h4><div className="exercise-details">{exercise.reps && <span>{exercise.reps} REPS</span>}{exercise.duration && <span>{exercise.duration}</span>}</div></div> );
};

export default ExerciseCard;