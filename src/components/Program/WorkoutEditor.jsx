// src/components/Program/WorkoutEditor.jsx

import React, { useContext, useState, useEffect } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { X, Save, Plus } from 'lucide-react';
import WorkoutBlockEditor from './WorkoutBlockEditor.jsx';
import { generateUniqueId } from '../../utils/idUtils.js';
import './WorkoutEditor.css';

const blockTypes = [ 'Warm-up', 'Strength', 'Conditioning: AMRAP', 'Conditioning: RFT', 'Conditioning: Chipper', 'Conditioning: EMOM', 'Conditioning: Tabata', 'Cardio', 'Cool-down' ];

const WorkoutEditor = () => {
  const { appState, allWorkouts, closeWorkoutEditor, saveCustomWorkout } = useContext(AppStateContext);
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    const { editingInfo } = appState;
    if (editingInfo) {
      if (editingInfo.workoutId) {
        const workoutToEdit = allWorkouts.find(w => w.id === editingInfo.workoutId);
        if (workoutToEdit) {
          setWorkout(JSON.parse(JSON.stringify(workoutToEdit)));
        }
      } else {
        // This handles creating a new workout.
        setWorkout({ id: generateUniqueId(), name: 'My New Workout', blocks: [] });
      }
    }
  }, [appState.editingInfo, allWorkouts]);

  if (!workout) return null;

  const handleNameChange = (e) => setWorkout(prev => ({ ...prev, name: e.target.value }));
  
  // --- THE FIX IS HERE ---
  const handleSave = () => {
    // We now correctly pass the programId from the editingInfo state object.
    saveCustomWorkout(appState.editingInfo.programId, workout);
    closeWorkoutEditor();
  };

  const handleAddBlock = (type) => {
    let newBlock = { id: generateUniqueId(), type: type, exercises: [] };

    switch (type) {
      case 'Strength':
        newBlock = { 
          ...newBlock, 
          rest: '60s',
          exercises: [{ id: generateUniqueId(), name: '', sets: [{ id: generateUniqueId(), reps: '10' }] }]
        };
        break;
      case 'Conditioning: AMRAP':
        newBlock = { ...newBlock, duration: 15 };
        break;
      case 'Conditioning: Chipper':
        newBlock.exercises = [{ id: generateUniqueId(), name: '', reps: '50' }];
        break;
      case 'Conditioning: RFT':
        newBlock = { ...newBlock, rounds: 3, exercises: [{id: generateUniqueId(), name: '', reps: '10'}] };
        break;
      case 'Conditioning: EMOM':
        newBlock = { ...newBlock, minutes: [{ id: generateUniqueId(), task: '' }] };
        break;
      case 'Conditioning: Tabata':
        newBlock = { ...newBlock, work: 20, rest: 10, rounds: 8 };
        break;
      case 'Cardio':
        newBlock.exercises = [{ id: generateUniqueId(), name: '', duration: '20' }];
        break;
      default: break;
    }
    setWorkout(prev => ({ ...prev, blocks: [...prev.blocks, newBlock] }));
  };

  const handleUpdateBlock = (updatedBlock) => { setWorkout(prev => ({ ...prev, blocks: prev.blocks.map(b => b.id === updatedBlock.id ? updatedBlock : b) })); };
  const handleDeleteBlock = (blockId) => { setWorkout(prev => ({ ...prev, blocks: prev.blocks.filter(b => b.id !== blockId) })); };

  return (
    <div className="editor-backdrop" onClick={closeWorkoutEditor}>
      <div className="editor-container" onClick={(e) => e.stopPropagation()}>
        <header className="editor-header">
          <h2>Edit Workout</h2>
          <div className="editor-header-actions">
            <button className="action-btn delete-btn" onClick={closeWorkoutEditor}><X size={18} /> Close</button>
            <button className="action-btn start-btn" onClick={handleSave}><Save size={18} /> Save</button>
          </div>
        </header>
        <div className="editor-body">
          <div className="editor-input-group"><label className="editor-label" htmlFor="workoutName">Workout Name</label><input id="workoutName" className="editor-input" type="text" value={workout.name} onChange={handleNameChange} /></div>
          <div><h3 className="editor-section-title">Workout Blocks</h3>{workout.blocks.length > 0 ? ( workout.blocks.map(block => ( <WorkoutBlockEditor key={block.id} block={block} onUpdate={handleUpdateBlock} onDelete={handleDeleteBlock} />)) ) : ( <p style={{color: 'var(--text-tertiary)', textAlign: 'center', padding: '16px'}}>This workout has no blocks yet.</p> )}</div>
          <div><h3 className="editor-section-title">Add a Block</h3><div className="add-block-grid">{blockTypes.map(type => ( <button key={type} className="add-block-btn" onClick={() => handleAddBlock(type)}><Plus size={16} /> {type}</button>))}</div></div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutEditor;