// src/components/Workout/ExerciseCard.jsx

import React, { useContext } from 'react';
import { Check, Square, Plus, Minus, Timer, HelpCircle, History } from 'lucide-react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { trackedLifts } from '../Progress/OneRepMaxEditor.jsx';
import { getUnitLabel, lbsToKg } from '../../utils/unitUtils.js';

const SetRow = ({ setIndex, exerciseId, onSetUpdate, progressData, targetReps, onRestClick, unitSystem, prevSetData }) => {
  const { completed, weight, reps } = progressData;
  
  const unitLabel = getUnitLabel(unitSystem);
  const incrementAmount = unitSystem === 'metric' ? 2.5 : 5;

  const handleCheckboxClick = () => { onSetUpdate(exerciseId, setIndex, 'completed', !completed); };
  
  const handleWeightChange = (e) => {
    onSetUpdate(exerciseId, setIndex, 'weight', e.target.value);
  };

  const handleIncrement = (field, currentValue, amount) => {
    const newValue = (parseFloat(currentValue) || 0) + amount;
    onSetUpdate(exerciseId, setIndex, field, String(newValue));
  };
  
  const handleDecrement = (field, currentValue, amount) => {
    const newValue = Math.max(0, (parseFloat(currentValue) || 0) - amount);
    onSetUpdate(exerciseId, setIndex, field, String(newValue));
  };

  const renderPreviousPerformance = () => {
    if (!prevSetData || !prevSetData.completed) return null;

    const prevWeightLbs = parseFloat(prevSetData.weight) || 0;
    const prevDisplayWeight = unitSystem === 'metric' ? lbsToKg(prevWeightLbs).toFixed(1) : prevWeightLbs;

    return (
      <div className="previous-performance">
        <History size={14} />
        <span>Previous: {prevSetData.reps} x {prevDisplayWeight} {unitLabel}</span>
      </div>
    );
  };

  return (
    <div className={`set-row-wrapper ${completed ? 'completed' : ''}`}>
      <div className="set-row">
        <div className="set-status">
            <button className="set-checkbox" onClick={handleCheckboxClick}>{completed ? <Check size={20} /> : <Square size={20} />}</button>
            <span className="set-number">Set {setIndex + 1}</span>
        </div>
        <div className="set-inputs-container">
          <div className="set-input-group">
            <button className="input-button" onClick={() => handleDecrement('weight', weight, incrementAmount)}><Minus size={16}/></button>
            <input type="number" step="0.1" className="set-input" placeholder="0" value={weight || ''} onChange={handleWeightChange} />
            <span>{unitLabel}</span>
            <button className="input-button" onClick={() => handleIncrement('weight', weight, incrementAmount)}><Plus size={16}/></button>
          </div>
          <div className="set-input-group">
            <button className="input-button" onClick={() => handleDecrement('reps', reps, 1)}><Minus size={16}/></button>
            <input type="number" className="set-input" placeholder={String(targetReps)} value={reps || ''} onChange={(e) => onSetUpdate(exerciseId, setIndex, 'reps', e.target.value)} />
            <span>reps</span>
            <button className="input-button" onClick={() => handleIncrement('reps', reps, 1)}><Plus size={16}/></button>
          </div>
        </div>
      </div>
      {renderPreviousPerformance()}
      {completed && ( <div className="set-actions"><button className="rest-button" onClick={onRestClick}><Timer size={16} /> Start Rest</button></div> )}
    </div>
  );
};

const ExerciseCard = ({ blockId, exercise, progress, onSetUpdate, restDuration, startTimer, blockType, setActiveView }) => {
  const { appState, openExerciseModal, hasExerciseDetails } = useContext(AppStateContext);
  const { unitSystem } = appState;
  const { name, sets, note, id, trackingType, value, weight, unit, previousPerformance } = exercise;
  const fullExerciseId = `${blockId}-${id}`;

  const handleRestClick = () => {
    const restSeconds = parseInt(restDuration, 10);
    if (startTimer && !isNaN(restSeconds)) {
      startTimer({ type: 'countdown', duration: restSeconds });
    }
  };

  const handleExerciseClick = () => { 
  if (exercise.id && hasExerciseDetails(exercise.id)) { 
        openExerciseModal(exercise.id); 
      } 
  };
  
  if (blockType === 'Bodyweight') {
    return (
      <div className="exercise-card-bw">
        <div className="bw-info clickable" onClick={handleExerciseClick}>
            <h4 className="bw-name">{name}</h4>
            {hasExerciseDetails(id) && <HelpCircle size={20} className="help-icon" />}
        </div>
        <div className="exercise-card-bw-sets">
          {progress?.sets.map((set, index) => {
            const definitionSet = exercise.sets[index];
            const unitText = definitionSet.trackingType === 'duration' ? 'secs' : 'reps';
            return (
              <div key={set.id} className={`bw-set-row ${set.completed ? 'completed' : ''}`}>
                <button 
                  className="bw-set-checkbox"
                  onClick={() => onSetUpdate(fullExerciseId, index, 'completed', !set.completed)}
                >
                  {set.completed ? <Check size={20} /> : <Square size={20} />}
                </button>
                <span className="set-number">Set {index + 1}</span>
                <span className="bw-set-target">{definitionSet.value} {unitText}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  
  if (blockType === 'Accessory / Carry') {
    return (
      <div className="exercise-card-accessory">
        <div className="exercise-info clickable" onClick={handleExerciseClick}>
          <h4>{name}</h4>
          {hasExerciseDetails(id) && <HelpCircle size={18} className="help-icon" />}
        </div>
        <div className="exercise-details">
          {weight && <span>{weight}{getUnitLabel(unitSystem).toUpperCase()}</span>}
          {value && <span>{value} {unit?.toUpperCase()}</span>}
        </div>
        <div className="sets-container">
          {progress?.sets.map((set, index) => (
            <div key={set.id} className={`accessory-set-row ${set.completed ? 'completed' : ''}`}>
              <button 
                className="accessory-set-checkbox"
                onClick={() => onSetUpdate(fullExerciseId, index, 'completed', !set.completed)}
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
    const isTrackedLift = trackedLifts.some(lift => lift.id === id);

    const unitLabel = getUnitLabel(unitSystem);
    const display1RM = unitSystem === 'metric' 
      ? parseFloat(lbsToKg(percentageNoteInfo?.oneRepMax || 0).toFixed(1))
      : (percentageNoteInfo?.oneRepMax || 0);

    return (
      <div className="exercise-card-interactive">
        <div className="exercise-info clickable" onClick={handleExerciseClick}>
          <h4>{name}</h4>
          {hasExerciseDetails(id) && <HelpCircle size={18} className="help-icon" />}
        </div>
        <div className="exercise-details"><span>{sets.length} SETS</span>{restDuration && <span>{restDuration} REST</span>}</div>
        
        {note && <p className="exercise-note">Note: {note}</p>}
        
        {percentageNoteInfo && isTrackedLift && (
          <div className="percentage-note">
            {percentageNoteInfo.oneRepMax > 0 ? (
              <>
                Target weight is <strong>{percentageNoteInfo.percent}%</strong> of your saved 1RM of <strong>{display1RM} {unitLabel}</strong>.
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
          {progress && progress.sets.map((set, index) => {
            const prevSetData = previousPerformance?.sets?.[index];
            return (
              <SetRow 
                key={set.id} 
                setIndex={index} 
                exerciseId={fullExerciseId} 
                onSetUpdate={onSetUpdate} 
                progressData={set} 
                targetReps={sets[index].reps} 
                onRestClick={handleRestClick}
                unitSystem={unitSystem}
                prevSetData={prevSetData}
              />
            )
          })}
        </div>
      </div>
    );
  }
  
  return ( 
    <div className="exercise-card-simple clickable" onClick={handleExerciseClick}>
      <h4>{name}</h4>
      <div className="exercise-details">
        {exercise.reps && <span>{exercise.reps} REPS</span>}
        {exercise.duration && <span>{exercise.duration} {blockType === 'Cardio' ? 'min' : ''}</span>}
      </div>
    </div> 
  );
};

export default ExerciseCard;