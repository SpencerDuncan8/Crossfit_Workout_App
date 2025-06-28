// src/components/Program/WorkoutBlockEditor.jsx

import React, { useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { Trash2, PlusCircle, X } from 'lucide-react';
import { generateUniqueId } from '../../utils/idUtils.js';
import { getUnitLabel } from '../../utils/unitUtils.js';

const WorkoutBlockEditor = ({ block, onUpdate, onDelete }) => {
  const { appState } = useContext(AppStateContext);
  const unitLabel = getUnitLabel(appState.unitSystem);

  const updateBlockField = (field, value) => onUpdate({ ...block, [field]: value });
  const updateExerciseField = (exIndex, field, value) => { const n = { ...block }; n.exercises[exIndex][field] = value; onUpdate(n); };
  
  const addSet = (exIndex) => { const n = { ...block }; n.exercises[exIndex].sets.push({ id: generateUniqueId(), reps: '5', load: '' }); onUpdate(n); };
  const updateSetReps = (exIndex, setIndex, reps) => { const n = { ...block }; n.exercises[exIndex].sets[setIndex].reps = reps; onUpdate(n); };
  const updateSetLoad = (exIndex, setIndex, load) => { const n = { ...block }; n.exercises[exIndex].sets[setIndex].load = load; onUpdate(n); };
  const removeSet = (exIndex, setId) => { const n = { ...block }; n.exercises[exIndex].sets = n.exercises[exIndex].sets.filter(s => s.id !== setId); onUpdate(n); };

  const addMinute = () => { const n = [...(block.minutes || []), { id: generateUniqueId(), task: '' }]; onUpdate({ ...block, minutes: n }); };
  const updateMinuteTask = (index, task) => { const n = [...block.minutes]; n[index] = { ...n[index], task: task }; onUpdate({ ...block, minutes: n }); };
  const removeMinute = (minuteId) => { const n = block.minutes.filter(m => m.id !== minuteId); onUpdate({ ...block, minutes: n }); };

  const addExercise = () => {
    let newExercise = { id: generateUniqueId(), name: '' };
    if (block.type === 'Strength') newExercise.sets = [{ id: generateUniqueId(), reps: '10', load: '' }];
    if (block.type === 'Bodyweight') newExercise = { ...newExercise, trackingType: 'reps', value: '15' };
    if (block.type === 'Accessory / Carry') newExercise = { ...newExercise, sets: '3', weight: '', value: '', unit: '' };
    if (block.type === 'Conditioning: Chipper' || block.type === 'Conditioning: RFT') newExercise.reps = '15';
    const newExercises = [...(block.exercises || []), newExercise];
    onUpdate({ ...block, exercises: newExercises });
  };

  const removeExercise = (exIndex) => { const n = { ...block, exercises: block.exercises.filter((_, i) => i !== exIndex) }; onUpdate(n); };

  const renderBlockContent = () => {
    let placeholder = block.type === 'Conditioning: AMRAP' || block.type === 'Warm-up' ? "e.g., 10 Dumbbell Thrusters" : "Exercise Name";
    switch (block.type) {
      case 'Strength': return (
        <><div className="block-form-grid" style={{gridTemplateColumns: '1fr'}}><div className="block-input-group"><label>Rest Between Sets</label><input type="text" value={block.rest || ''} onChange={(e) => updateBlockField('rest', e.target.value)} placeholder="e.g., 60s" /></div></div><div className="exercise-editor-list">{(block.exercises || []).map((ex, exIndex) => (<div key={ex.id} className="strength-exercise-editor"><div className="exercise-editor-item"><input type="text" placeholder="e.g., Bench Press" value={ex.name || ''} onChange={(e) => updateExerciseField(exIndex, 'name', e.target.value)} /><button className="remove-exercise-btn" onClick={() => removeExercise(exIndex)}><X size={16} /></button></div><div className="sets-list">{(ex.sets || []).map((set, setIndex) => (<div key={set.id} className="set-editor-row"><span className="set-label">Set {setIndex + 1}</span><input type="text" className="reps-input" placeholder="Reps" value={set.reps} onChange={(e) => updateSetReps(exIndex, setIndex, e.target.value)} /><span className="reps-label">reps</span><span className="reps-label" style={{margin: '0 4px'}}>x</span><input type="text" className="load-input" placeholder="Load" value={set.load || ''} onChange={(e) => updateSetLoad(exIndex, setIndex, e.target.value)} /><span className="reps-label">({unitLabel} or %)</span><button className="remove-set-btn" onClick={() => removeSet(exIndex, set.id)}><Trash2 size={14}/></button></div>))}<button className="add-set-btn" onClick={() => addSet(exIndex)}><PlusCircle size={14} /> Add Set</button></div></div>))}<button className="add-exercise-btn" onClick={addExercise}><PlusCircle size={16} /> Add Exercise</button></div></>
      );
      case 'Bodyweight': return (
        <div className="exercise-editor-list">
            {(block.exercises || []).map((ex, exIndex) => (
                <div key={ex.id} className="bodyweight-exercise-editor">
                    <input type="text" className="bodyweight-name-input" placeholder="e.g., Plank" value={ex.name || ''} onChange={(e) => updateExerciseField(exIndex, 'name', e.target.value)} />
                    <div className="bodyweight-controls">
                        <div className="bodyweight-controls-left">
                            <div className="tracking-type-toggle">
                                <button className={ex.trackingType === 'reps' ? 'active' : ''} onClick={() => updateExerciseField(exIndex, 'trackingType', 'reps')}>Reps</button>
                                <button className={ex.trackingType === 'duration' ? 'active' : ''} onClick={() => updateExerciseField(exIndex, 'trackingType', 'duration')}>Secs</button>
                            </div>
                            <input type="number" className="reps-input" value={ex.value || ''} onChange={(e) => updateExerciseField(exIndex, 'value', e.target.value)} />
                        </div>
                        <button className="remove-exercise-btn" onClick={() => removeExercise(exIndex)}><X size={16} /></button>
                    </div>
                </div>
            ))}
            <button className="add-exercise-btn" onClick={addExercise}><PlusCircle size={16} /> Add Exercise</button>
        </div>
      );
      case 'Accessory / Carry': return (
        <div className="exercise-editor-list">
            {(block.exercises || []).map((ex, exIndex) => (
                <div key={ex.id} className="accessory-exercise-editor">
                  <input type="text" className="accessory-name" placeholder="Exercise Name" value={ex.name || ''} onChange={(e) => updateExerciseField(exIndex, 'name', e.target.value)} />
                  <div className="accessory-controls-row">
                    <div className="accessory-input-group">
                      <input type="number" placeholder="Sets" value={ex.sets || ''} onChange={(e) => updateExerciseField(exIndex, 'sets', e.target.value)} />
                      <span className="accessory-label">sets</span>
                    </div>
                    <div className="accessory-input-group">
                      <input type="number" placeholder="Weight" value={ex.weight || ''} onChange={(e) => updateExerciseField(exIndex, 'weight', e.target.value)} />
                      <span className="accessory-label">{unitLabel}</span>
                    </div>
                    <div className="accessory-input-group">
                      <input type="number" placeholder="Value" value={ex.value || ''} onChange={(e) => updateExerciseField(exIndex, 'value', e.target.value)} />
                    </div>
                    <div className="accessory-input-group">
                      <input type="text" className="unit-input" placeholder="Unit" value={ex.unit || ''} onChange={(e) => updateExerciseField(exIndex, 'unit', e.target.value)} />
                    </div>
                  </div>
                  <button className="remove-exercise-btn" onClick={() => removeExercise(exIndex)}><X size={16} /></button>
                </div>
            ))}
            <button className="add-exercise-btn" onClick={addExercise}><PlusCircle size={16} /> Add Exercise</button>
        </div>
      );
      case 'Conditioning: EMOM': return ( <div className="minute-editor-list"><label className="editor-label">Tasks per minute</label>{(block.minutes || []).map((min, index) => (<div key={min.id} className="minute-editor-row"><span className="minute-label">Min {index + 1}</span><input type="text" placeholder="e.g., 10 Cal Row, 12 Burpees" value={min.task} onChange={(e) => updateMinuteTask(index, e.target.value)} /><button className="remove-minute-btn" onClick={() => removeMinute(min.id)}><X size={16} /></button></div>))}<button className="add-minute-btn" onClick={addMinute}><PlusCircle size={16} /> Add Minute</button></div> );
      case 'Conditioning: RFT':
      case 'Conditioning: Chipper': return (
        <>{block.type === 'Conditioning: RFT' && (<div className="block-form-grid"><div className="block-input-group"><label>Rounds</label><input type="number" value={block.rounds || ''} onChange={(e) => updateBlockField('rounds', e.target.value)} /></div></div>)}<div className="exercise-editor-list"><label className="editor-label">Exercises</label>{(block.exercises || []).map((ex, exIndex) => (<div key={ex.id} className="exercise-editor-item"><input type="text" className="reps-input for-time-reps" placeholder="Reps" value={ex.reps || ''} onChange={(e) => updateExerciseField(exIndex, 'reps', e.target.value)} /><span className="for-time-x">x</span><input type="text" placeholder="Exercise Name" value={ex.name || ''} onChange={(e) => updateExerciseField(exIndex, 'name', e.target.value)} /><button className="remove-exercise-btn" onClick={() => removeExercise(exIndex)}><X size={16} /></button></div>))}<button className="add-exercise-btn" onClick={addExercise}><PlusCircle size={16} /> Add Exercise</button></div></>
      );
      // --- FIX: This now renders the customizable intervals block ---
      case 'Conditioning: Intervals': return ( 
        <>
            <div className="block-form-grid">
                <div className="block-input-group"><label>Work (sec)</label><input type="number" value={block.work || ''} onChange={(e) => updateBlockField('work', e.target.value)} /></div>
                <div className="block-input-group"><label>Rest (sec)</label><input type="number" value={block.rest || ''} onChange={(e) => updateBlockField('rest', e.target.value)} /></div>
                <div className="block-input-group"><label>Rounds</label><input type="number" value={block.rounds || ''} onChange={(e) => updateBlockField('rounds', e.target.value)} /></div>
            </div>
            <div className="exercise-editor-list">
                <label className="editor-label">Exercises</label>
                {(block.exercises || []).map((ex, exIndex) => (
                    <div key={ex.id} className="exercise-editor-item">
                        <input type="text" placeholder={placeholder} value={ex.name || ''} onChange={(e) => updateExerciseField(exIndex, 'name', e.target.value)} />
                        <button className="remove-exercise-btn" onClick={() => removeExercise(exIndex)}><X size={16} /></button>
                    </div>
                ))}
                <button className="add-exercise-btn" onClick={addExercise}><PlusCircle size={16} /> Add Exercise</button>
            </div>
        </> 
      );
      case 'Cardio': return (
        <div className="exercise-editor-list">
            <label className="editor-label">Exercises</label>
            {(block.exercises || []).map((ex, exIndex) => (
                <div key={ex.id} className="exercise-editor-item">
                    <input type="text" placeholder="e.g., Rowing" value={ex.name || ''} onChange={(e) => updateExerciseField(exIndex, 'name', e.target.value)} />
                    <input type="number" className="reps-input" placeholder="Mins" value={ex.duration || ''} onChange={(e) => updateExerciseField(exIndex, 'duration', e.target.value)} />
                    <span className="reps-label">min</span>
                    <button className="remove-exercise-btn" onClick={() => removeExercise(exIndex)}><X size={16} /></button>
                </div>
            ))}
            <button className="add-exercise-btn" onClick={() => { const newExercises = [...(block.exercises || []), { id: generateUniqueId(), name: '', duration: '10' }]; onUpdate({ ...block, exercises: newExercises });}}> <PlusCircle size={16} /> Add Exercise</button>
        </div>
      );
      default: return (
        <>{block.type === 'Conditioning: AMRAP' && <div className="block-form-grid"><div className="block-input-group"><label>Time (minutes)</label><input type="number" value={block.duration || ''} onChange={(e) => updateBlockField('duration', e.target.value)} /></div></div>}<div className="exercise-editor-list"><label className="editor-label">Exercises</label>{(block.exercises || []).map((ex, exIndex) => (<div key={ex.id} className="exercise-editor-item"><input type="text" placeholder={placeholder} value={ex.name || ''} onChange={(e) => updateExerciseField(exIndex, 'name', e.target.value)} /><button className="remove-exercise-btn" onClick={() => removeExercise(exIndex)}><X size={16} /></button></div>))}<button className="add-exercise-btn" onClick={addExercise}><PlusCircle size={16} /> Add Exercise</button></div></>
      );
    }
  };
  return ( <div className="workout-block"><div className="block-header"><h4>{block.type.replace('Conditioning: ', '')}</h4><button className="delete-block-btn" onClick={() => onDelete(block.id)}><Trash2 size={18} /></button></div><div className="block-content">{renderBlockContent()}</div></div> );
};

export default WorkoutBlockEditor;