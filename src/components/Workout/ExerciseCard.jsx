// src/components/Workout/ExerciseCard.jsx

import React, { useContext } from 'react';
import { Check, Square, Plus, Minus, Timer, HelpCircle } from 'lucide-react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { trackedLifts } from '../Progress/OneRepMaxEditor.jsx'; // --- THE FIX: Import the list ---

const SetRow = ({ setIndex, exerciseId, onSetUpdate, progressData, targetReps, onRestClick }) => {
  const { completed, weight, reps } = progressData;

  const handleCheckboxClick = () => { onSetUpdate(exerciseId, setIndex, 'completed', !completed); };
  const handleIncrement = (field, currentValue, amount) => { const newValue = (parseInt(currentValue, 10) || 0) + amount; onSetUpdate(exerciseId, setIndex, field, String(newValue)); };
  const handleDecrement = (field, currentValue, amount) => { const newValue = Math.max(0, (parseInt(currentValue, 10) || 0) - amount); onSetUpdate(exerciseId, setIndex, field, String(newValue)); };

  return (
    <div className={`set-row-wrapper ${completed ? 'completed' : ''}`}>
      <div className="set-row">
        <div className="set-status"><button className="set-checkbox" onClick={handleCheckboxClick}>{completed ? <Check size={20} /> : <Square size={20} />}</button><span className="set-number">Set {setIndex + 1}</span></div>
        <div className="set-inputs-container">
          <div className="set-input-group"><button className="input-button" onClick={() => handleDecrement('weight', weight, 5)}><Minus size={16}/></button><input type="number" className="set-input" placeholder="0" value={weight || ''} onChange={(e) => onSetUpdate(exerciseId, setIndex, 'weight', e.target.value)} /><span>lbs</span><button className="input-button" onClick={() => handleIncrement('weight', weight, 5)}><Plus size={16}/></button></div>
          <div className="set-input-group"><button className="input-button" onClick={() => handleDecrement('reps', reps, 1)}><Minus size={16}/></button><input type="number" className="set-input" placeholder={String(targetReps)} value={reps || ''} onChange={(e) => onSetUpdate(exerciseId, setIndex, 'reps', e.target.value)} /><span>reps</span><button className="input-button" onClick={() => handleIncrement('reps', reps, 1)}><Plus size={16}/></button></div>
        </div>
      </div>
      {completed && ( <div className="set-actions"><button className="rest-button" onClick={onRestClick}><Timer size={16} /> Start Rest</button></div> )}
    </div>
  );
};

const ExerciseCard = ({ exerciseId, exercise, progress, onSetUpdate, restDuration, startTimer, blockType, setActiveView }) => {
  const { openExerciseModal } = useContext(AppStateContext);
  const { name, sets, note, id, trackingType, value, weight, unit } = exercise;

  const handleRestClick = () => {
    const restSeconds = parseInt(restDuration, 10);
    if (startTimer && !isNaN(restSeconds)) {
      startTimer({ type: 'countdown', duration: restSeconds });
    }
  };

  const handleExerciseClick = () => { if (id) { openExerciseModal(id); } };
  
  if (blockType === 'Bodyweight') {
    const isCompleted = progress?.completed || false;
    const unit = trackingType === 'duration' ? 'SECS' : 'REPS';

    const handleCheckboxClick = () => {
      onSetUpdate(exerciseId, null, 'completed', !isCompleted);
    };

    return (
      <div className={`exercise-card-bw ${isCompleted ? 'completed' : ''}`}>
        <div className="bw-main-row">
          <button className="bw-checkbox" onClick={handleCheckboxClick}>
            {isCompleted ? <Check size={24} /> : <Square size={24} />}
          </button>
          <div className="bw-info">
            <h4 className="bw-name clickable" onClick={handleExerciseClick}>{name}</h4>
            <p className="bw-target">{value} {unit}</p>
          </div>
          {id && <HelpCircle size={20} className="help-icon clickable" onClick={handleExerciseClick} />}
        </div>
      </div>
    );
  }
  
  if (blockType === 'Accessory / Carry') {
    return (
      <div className="exercise-card-accessory">
        <div className="exercise-info clickable" onClick={handleExerciseClick}>
          <h4>{name}</h4>
          <HelpCircle size={18} className="help-icon" />
        </div>
        <div className="exercise-details">
          {weight && <span>{weight}LBS</span>}
          {value && <span>{value} {unit?.toUpperCase()}</span>}
        </div>
        <div className="sets-container">
          {progress?.sets.map((set, index) => (
            <div key={set.id} className={`accessory-set-row ${set.completed ? 'completed' : ''}`}>
              <button 
                className="accessory-set-checkbox"
                onClick={() => onSetUpdate(exerciseId, index, 'completed', !set.completed)}
              >
                {set.completed ? <Check size={20} /> : <Square size={20} />}
              </button>
              <span className="set-number">Set {index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (sets) {
    const percentageNoteInfo = progress?.sets?.[0]?.percentageInfo;
    // --- THE FIX: Check if the exercise is in our trackedLifts array ---
    const isTrackedLift = trackedLifts.some(lift => lift.id === id);

    return (
      <div className="exercise-card-interactive">
        <div className="exercise-info clickable" onClick={handleExerciseClick}><h4>{name}</h4><HelpCircle size={18} className="help-icon" /></div>
        <div className="exercise-details"><span>{sets.length} SETS</span>{restDuration && <span>{restDuration} REST</span>}</div>
        
        {note && <p className="exercise-note">Note: {note}</p>}
        
        {/* --- THE FIX: Only show the note if the lift is tracked --- */}
        {percentageNoteInfo && isTrackedLift && (
          <div className="percentage-note">
            {percentageNoteInfo.oneRepMax > 0 ? (
              <>
                Target weight is <strong>{percentageNoteInfo.percent}%</strong> of your saved 1RM of <strong>{percentageNoteInfo.oneRepMax} lbs</strong>.
              </>
            ) : (
              <>
                Target weight is based on a percentage, but your 1RM for this lift is not set.
                <button className="set-1rm-button" onClick={() => setActiveView('progress')}>
                  Set 1RM
                </button>
              </>
            )}
          </div>
        )}
        
        <div className="sets-container">
          {progress && progress.sets.map((set, index) => (
            <SetRow 
              key={set.id} 
              setIndex={index} 
              exerciseId={exerciseId} 
              onSetUpdate={onSetUpdate} 
              progressData={set} 
              targetReps={sets[index].reps} 
              onRestClick={handleRestClick}
            />
          ))}
        </div>
      </div>
    );
  }
  
  return ( <div className="exercise-card-simple clickable" onClick={handleExerciseClick}><h4>{name}</h4><div className="exercise-details">{exercise.reps && <span>{exercise.reps} REPS</span>}{exercise.duration && <span>{exercise.duration}</span>}</div></div> );
};

export default ExerciseCard;