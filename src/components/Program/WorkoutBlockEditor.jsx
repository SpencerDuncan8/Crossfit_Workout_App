// src/components/Program/WorkoutBlockEditor.jsx

import React, { useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { Trash2, PlusCircle, X } from 'lucide-react';
import { generateUniqueId } from '../../utils/idUtils.js';
import { getUnitLabel } from '../../utils/unitUtils.js';
import ExerciseAutocompleteInput from '../Common/ExerciseAutocompleteInput.jsx';

const WorkoutBlockEditor = ({ block, onUpdate, onDelete }) => {
  const { appState } = useContext(AppStateContext);
  const unitLabel = getUnitLabel(appState.unitSystem);

  const updateBlockField = (field, value) => onUpdate({ ...block, [field]: value });

  const addExerciseToMinute = (minuteIndex) => {
    const newBlocks = { ...block };
    const newMinutes = [...newBlocks.minutes];
    const newExercise = { instanceId: generateUniqueId(), id: null, name: '', reps: '10' };
    
    // Ensure the exercises array exists
    if (!newMinutes[minuteIndex].exercises) {
      newMinutes[minuteIndex].exercises = [];
    }

    newMinutes[minuteIndex].exercises.push(newExercise);
    onUpdate({ ...block, minutes: newMinutes });
  };

  const updateExerciseInMinute = (minuteIndex, exIndex, field, value) => {
    const newMinutes = [...block.minutes];
    newMinutes[minuteIndex].exercises[exIndex][field] = value;
    onUpdate({ ...block, minutes: newMinutes });
  };

  const handleExerciseSelectionInMinute = (minuteIndex, exIndex, selectedExercise) => {
    const newMinutes = [...block.minutes];
    const existingExercise = newMinutes[minuteIndex].exercises[exIndex];
    newMinutes[minuteIndex].exercises[exIndex] = {
        ...existingExercise,
        id: selectedExercise.id,
        name: selectedExercise.name,
        oneRepMaxId: selectedExercise.oneRepMaxId || null,
    };
    onUpdate({ ...block, minutes: newMinutes });
  };

  const removeExerciseFromMinute = (minuteIndex, exIndex) => {
    const newMinutes = [...block.minutes];
    newMinutes[minuteIndex].exercises.splice(exIndex, 1);
    onUpdate({ ...block, minutes: newMinutes });
  };
  
  // This function now handles BOTH text changes and property updates for an exercise.
  const updateExerciseField = (exIndex, field, value) => {
    const newExercises = [...block.exercises];
    newExercises[exIndex] = { ...newExercises[exIndex], [field]: value };
    onUpdate({ ...block, exercises: newExercises });
  };
  
  // This function handles selecting a structured exercise from the autocomplete component.
  // It preserves the stable 'instanceId' while updating the other properties.
  const handleExerciseSelection = (exIndex, selectedExercise) => {
    const newExercises = [...block.exercises];
    const existingExercise = newExercises[exIndex];

    newExercises[exIndex] = { 
      ...existingExercise, // Preserves the 'instanceId'
      id: selectedExercise.id,
      name: selectedExercise.name,
      oneRepMaxId: selectedExercise.oneRepMaxId || null
    };
    onUpdate({ ...block, exercises: newExercises });
  };
  
  // This function was updated to support the Bodyweight block correctly.
  const addSet = (exIndex) => {
    const n = { ...block };
    const newSet = { id: generateUniqueId() };
    if (block.type === 'Strength') {
        newSet.reps = '5';
        newSet.load = '';
    } else if (block.type === 'Bodyweight') {
        newSet.value = '10';
        newSet.trackingType = 'reps';
    }
    // Ensure sets array exists before pushing
    if (!n.exercises[exIndex].sets) {
        n.exercises[exIndex].sets = [];
    }
    n.exercises[exIndex].sets.push(newSet);
    onUpdate(n);
  };

  const updateSetField = (exIndex, setIndex, field, value) => {
    const n = { ...block };
    n.exercises[exIndex].sets[setIndex][field] = value;
    onUpdate(n);
  };
  
  const removeSet = (exIndex, setId) => {
    const n = { ...block };
    n.exercises[exIndex].sets = n.exercises[exIndex].sets.filter(s => s.id !== setId);
    onUpdate(n);
  };

  const addMinute = () => { const n = [...(block.minutes || []), { id: generateUniqueId(), task: '', exercises: [] }]; onUpdate({ ...block, minutes: n }); };
  const updateMinuteTask = (index, task) => { const n = [...block.minutes]; n[index] = { ...n[index], task: task }; onUpdate({ ...block, minutes: n }); };
  
  const removeMinute = (minuteId) => { const n = block.minutes.filter(m => m.id !== minuteId); onUpdate({ ...block, minutes: n }); };

  // This function creates a new exercise object with a stable 'instanceId'.
  const addExercise = () => {
    const newExercise = { 
      instanceId: generateUniqueId(), // This is the stable key for React's rendering.
      id: null,                      // This will hold the exercise DB id (e.g., 'squat') after selection.
      name: ''                       // This will hold the exercise name.
    };
    
    if (block.type === 'Strength' || block.type === 'Bodyweight') {
      newExercise.sets = [{ id: generateUniqueId(), value: '10', trackingType: 'reps' }];
       if(block.type === 'Strength') {
          newExercise.sets[0].reps = '10';
          delete newExercise.sets[0].value;
          delete newExercise.sets[0].trackingType;
       }
    }
    if (block.type === 'Accessory / Carry') {
      newExercise.sets = '3'; newExercise.weight = ''; newExercise.value = ''; newExercise.unit = '';
    }
    if (block.type === 'Conditioning: Chipper' || block.type === 'Conditioning: RFT' || block.type === 'Warm-up' || block.type === 'Cool-down' || block.type === 'Conditioning: AMRAP') {
        newExercise.reps = '10';
    }
    if (block.type === 'Cardio') {
        newExercise.duration = '10';
    }

    const newExercises = [...(block.exercises || []), newExercise];
    onUpdate({ ...block, exercises: newExercises });
  };
  
  const removeExercise = (exIndex) => { const n = { ...block, exercises: block.exercises.filter((_, i) => i !== exIndex) }; onUpdate(n); };

  const renderBlockContent = () => {
    switch (block.type) {
      case 'Strength':
        return (
          <>
            <div className="block-form-grid" style={{gridTemplateColumns: '1fr'}}>
              <div className="block-input-group"><label>Rest Between Sets</label><input type="text" value={block.rest || ''} onChange={(e) => updateBlockField('rest', e.target.value)} placeholder="e.g., 60s" /></div>
            </div>
            <div className="exercise-editor-list">
              {(block.exercises || []).map((ex, exIndex) => (
                <div key={ex.instanceId} className="strength-exercise-editor">
                  <div className="exercise-editor-item">
                    <ExerciseAutocompleteInput value={ex.name} onChange={(newValue) => updateExerciseField(exIndex, 'name', newValue)} onSelect={(selected) => handleExerciseSelection(exIndex, selected)} placeholder="e.g., Bench Press"/>
                    <button className="remove-exercise-btn" onClick={() => removeExercise(exIndex)}><X size={16} /></button>
                  </div>
                  <div className="sets-list">
                    {(ex.sets || []).map((set, setIndex) => (<div key={set.id} className="set-editor-row"><span className="set-label">Set {setIndex + 1}</span><input type="text" className="reps-input" placeholder="Reps" value={set.reps || ''} onChange={(e) => updateSetField(exIndex, setIndex, 'reps', e.target.value)} /><span className="reps-label">reps</span><span className="reps-label" style={{margin: '0 4px'}}>x</span><input type="text" className="load-input" placeholder="e.g., 225 or 85%" value={set.load || ''} onChange={(e) => updateSetField(exIndex, setIndex, 'load', e.target.value)} /><span className="reps-label">({unitLabel} or %)</span><button className="remove-set-btn" onClick={() => removeSet(exIndex, set.id)}><Trash2 size={14}/></button></div>))}<button className="add-set-btn" onClick={() => addSet(exIndex)}><PlusCircle size={14} /> Add Set</button>
                  </div>
                </div>
              ))}
              <button className="add-exercise-btn" onClick={addExercise}><PlusCircle size={16} /> Add Exercise</button>
            </div>
          </>
        );

      case 'Bodyweight':
        return (
          <div className="exercise-editor-list">
            {(block.exercises || []).map((ex, exIndex) => (
              <div key={ex.instanceId} className="strength-exercise-editor">
                <div className="exercise-editor-item">
                  <ExerciseAutocompleteInput value={ex.name} onChange={(newValue) => updateExerciseField(exIndex, 'name', newValue)} onSelect={(selected) => handleExerciseSelection(exIndex, selected)} placeholder="e.g., Push-ups"/>
                  <button className="remove-exercise-btn" onClick={() => removeExercise(exIndex)}><X size={16} /></button>
                </div>
                <div className="sets-list">
                  {(ex.sets || []).map((set, setIndex) => (<div key={set.id} className="set-editor-row bodyweight-set-row"><span className="set-label">Set {setIndex + 1}</span><div className="tracking-type-toggle"><button className={set.trackingType === 'reps' ? 'active' : ''} onClick={() => updateSetField(exIndex, setIndex, 'trackingType', 'reps')}>Reps</button><button className={set.trackingType === 'duration' ? 'active' : ''} onClick={() => updateSetField(exIndex, setIndex, 'trackingType', 'duration')}>Secs</button></div><input type="number" className="reps-input" placeholder="Value" value={set.value || ''} onChange={(e) => updateSetField(exIndex, setIndex, 'value', e.target.value)} /><button className="remove-set-btn" onClick={() => removeSet(exIndex, set.id)}><Trash2 size={14}/></button></div>))}
                  <button className="add-set-btn" onClick={() => addSet(exIndex)}><PlusCircle size={14} /> Add Set</button>
                </div>
              </div>
            ))}
            <button className="add-exercise-btn" onClick={addExercise}><PlusCircle size={16} /> Add Exercise</button>
          </div>
        );

      case 'Accessory / Carry':
        return (
          <div className="exercise-editor-list">
              {(block.exercises || []).map((ex, exIndex) => (
                  <div key={ex.instanceId} className="accessory-exercise-editor">
                    <ExerciseAutocompleteInput value={ex.name} onChange={(newValue) => updateExerciseField(exIndex, 'name', newValue)} onSelect={(selected) => handleExerciseSelection(exIndex, selected)} placeholder="Exercise Name"/>
                    <div className="accessory-controls-row"><div className="accessory-input-group"><input type="number" placeholder="Sets" value={ex.sets || ''} onChange={(e) => updateExerciseField(exIndex, 'sets', e.target.value)} /><span className="accessory-label">sets</span></div><div className="accessory-input-group"><input type="number" placeholder="Weight" value={ex.weight || ''} onChange={(e) => updateExerciseField(exIndex, 'weight', e.target.value)} /><span className="accessory-label">{unitLabel}</span></div><div className="accessory-input-group"><input type="number" placeholder="Value" value={ex.value || ''} onChange={(e) => updateExerciseField(exIndex, 'value', e.target.value)} /></div><div className="accessory-input-group"><input type="text" className="unit-input" placeholder="Unit" value={ex.unit || ''} onChange={(e) => updateExerciseField(exIndex, 'unit', e.target.value)} /></div></div>
                    <button className="remove-exercise-btn" onClick={() => removeExercise(exIndex)}><X size={16} /></button>
                  </div>
              ))}
              <button className="add-exercise-btn" onClick={addExercise}><PlusCircle size={16} /> Add Exercise</button>
          </div>
        );

              case 'Conditioning: EMOM':
                return (
                  <div className="minute-editor-list">
                    <label className="editor-label">Tasks per minute</label>
                    {(block.minutes || []).map((min, minuteIndex) => (
                      <div key={min.id} className="strength-exercise-editor"> {/* Reusing this class for style */}
                        
<div className="minute-editor-row" style={{ marginBottom: '8px' }}>
  <span className="minute-label">Min {minuteIndex + 1}</span>
  <button className="remove-minute-btn" onClick={() => removeMinute(min.id)}>
    <X size={16} />
  </button>
</div>
                        {/* Nested Exercise Editor */}
                        <div className="exercise-editor-list" style={{ paddingLeft: '16px' }}>
                          {(min.exercises || []).map((ex, exIndex) => (
                            <div key={ex.instanceId} className="exercise-editor-item">
                              <input
                                type="text"
                                className="reps-input for-time-reps"
                                placeholder="Reps"
                                value={ex.reps || ''}
                                onChange={(e) => updateExerciseInMinute(minuteIndex, exIndex, 'reps', e.target.value)}
                              />
                              <span className="for-time-x">x</span>
                              <ExerciseAutocompleteInput
                                value={ex.name}
                                onChange={(newValue) => updateExerciseInMinute(minuteIndex, exIndex, 'name', newValue)}
                                onSelect={(selected) => handleExerciseSelectionInMinute(minuteIndex, exIndex, selected)}
                                placeholder="Exercise Name"
                              />
                              <button className="remove-exercise-btn" onClick={() => removeExerciseFromMinute(minuteIndex, exIndex)}>
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                          <button className="add-exercise-btn" onClick={() => addExerciseToMinute(minuteIndex)}>
                            <PlusCircle size={16} /> Add Exercise to Minute
                          </button>
                        </div>
                      </div>
                    ))}
                    <button className="add-minute-btn" onClick={addMinute}>
                      <PlusCircle size={16} /> Add Minute
                    </button>
                  </div>
                );

      case 'Conditioning: RFT':
      case 'Conditioning: Chipper':
        return (
          <>{block.type === 'Conditioning: RFT' && (<div className="block-form-grid"><div className="block-input-group"><label>Rounds</label><input type="number" value={block.rounds || ''} onChange={(e) => updateBlockField('rounds', e.target.value)} /></div></div>)}<div className="exercise-editor-list"><label className="editor-label">Exercises</label>{(block.exercises || []).map((ex, exIndex) => (<div key={ex.instanceId} className="exercise-editor-item"><input type="text" className="reps-input for-time-reps" placeholder="Reps" value={ex.reps || ''} onChange={(e) => updateExerciseField(exIndex, 'reps', e.target.value)} /><span className="for-time-x">x</span><ExerciseAutocompleteInput value={ex.name} onChange={(newValue) => updateExerciseField(exIndex, 'name', newValue)} onSelect={(selected) => handleExerciseSelection(exIndex, selected)} placeholder="Exercise Name"/><button className="remove-exercise-btn" onClick={() => removeExercise(exIndex)}><X size={16} /></button></div>))}<button className="add-exercise-btn" onClick={addExercise}><PlusCircle size={16} /> Add Exercise</button></div></>
        );

      case 'Conditioning: Intervals':
      case 'Conditioning: Tabata':
        return ( 
          <>
            {block.type === 'Conditioning: Intervals' && <div className="block-form-grid"><div className="block-input-group"><label>Work (sec)</label><input type="number" value={block.work || ''} onChange={(e) => updateBlockField('work', e.target.value)} /></div><div className="block-input-group"><label>Rest (sec)</label><input type="number" value={block.rest || ''} onChange={(e) => updateBlockField('rest', e.target.value)} /></div><div className="block-input-group"><label>Rounds</label><input type="number" value={block.rounds || ''} onChange={(e) => updateBlockField('rounds', e.target.value)} /></div></div>}
            <div className="exercise-editor-list">
                <label className="editor-label">Exercise(s)</label>
                {(block.exercises || []).map((ex, exIndex) => (
                    <div key={ex.instanceId} className="exercise-editor-item">
                        <ExerciseAutocompleteInput value={ex.name} onChange={(newValue) => updateExerciseField(exIndex, 'name', newValue)} onSelect={(selected) => handleExerciseSelection(exIndex, selected)} placeholder="e.g., Thrusters"/>
                        <button className="remove-exercise-btn" onClick={() => removeExercise(exIndex)}><X size={16} /></button>
                    </div>
                ))}
                <button className="add-exercise-btn" onClick={addExercise}><PlusCircle size={16} /> Add Exercise</button>
            </div>
          </> 
        );

      case 'Cardio':
        return (
          <div className="exercise-editor-list"><label className="editor-label">Exercises</label>
            {(block.exercises || []).map((ex, exIndex) => (
                <div key={ex.instanceId} className="exercise-editor-item">
                    <ExerciseAutocompleteInput value={ex.name} onChange={(newValue) => updateExerciseField(exIndex, 'name', newValue)} onSelect={(selected) => handleExerciseSelection(exIndex, selected)} placeholder="e.g., Rowing"/>
                    <input type="number" className="reps-input" placeholder="Mins" value={ex.duration || ''} onChange={(e) => updateExerciseField(exIndex, 'duration', e.target.value)} />
                    <span className="reps-label">min</span>
                    <button className="remove-exercise-btn" onClick={() => removeExercise(exIndex)}><X size={16} /></button>
                </div>
            ))}
            <button className="add-exercise-btn" onClick={addExercise}><PlusCircle size={16} /> Add Exercise</button>
          </div>
        );

      default:
        return (
          <>{block.type === 'Conditioning: AMRAP' && <div className="block-form-grid"><div className="block-input-group"><label>Time (minutes)</label><input type="number" value={block.duration || ''} onChange={(e) => updateBlockField('duration', e.target.value)} /></div></div>}<div className="exercise-editor-list"><label className="editor-label">Exercises</label>{(block.exercises || []).map((ex, exIndex) => (<div key={ex.instanceId} className="exercise-editor-item"><input type="text" className="reps-input for-time-reps" placeholder="Reps" value={ex.reps || ''} onChange={(e) => updateExerciseField(exIndex, 'reps', e.target.value)} /><span className="for-time-x">x</span><ExerciseAutocompleteInput value={ex.name} onChange={(newValue) => updateExerciseField(exIndex, 'name', newValue)} onSelect={(selected) => handleExerciseSelection(exIndex, selected)} placeholder="e.g., Dumbbell Thrusters"/><button className="remove-exercise-btn" onClick={() => removeExercise(exIndex)}><X size={16} /></button></div>))}<button className="add-exercise-btn" onClick={addExercise}><PlusCircle size={16} /> Add Exercise</button></div></>
        );
    }
  };

  return ( <div className="workout-block"><div className="block-header"><h4>{block.type.replace('Conditioning: ', '')}</h4><button className="delete-block-btn" onClick={() => onDelete(block.id)}><Trash2 size={18} /></button></div><div className="block-content">{renderBlockContent()}</div></div> );
};

export default WorkoutBlockEditor;