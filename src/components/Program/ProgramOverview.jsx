// src/components/Program/ProgramOverview.jsx

import React, { useState, useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { programTemplates } from '../../data/programTemplates.js';
import { PlusCircle, Trash2, Edit, CalendarPlus, ChevronsRight, ArrowLeft, Copy, Check } from 'lucide-react'; 
import CompactWorkoutPreview from './CompactWorkoutPreview.jsx';
import Modal from '../Common/Modal.jsx';
import './ProgramOverview.css';

const ProgramOverview = ({ setActiveView }) => {
  const { appState, deleteCustomWorkout, openWorkoutEditor, selectWorkoutToSchedule, createProgram, copyProgram, deleteProgram, updateProgram, loadProgramTemplate, autoScheduleProgram } = useContext(AppStateContext);
  
  const [viewingProgramId, setViewingProgramId] = useState(null);
  const [editingProgramId, setEditingProgramId] = useState(null);
  const [editingProgramName, setEditingProgramName] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProgramName, setNewProgramName] = useState('My New Program');
  const [scheduleConfirm, setScheduleConfirm] = useState(null);

  const handleScheduleWorkout = (workoutId) => {
    selectWorkoutToSchedule(workoutId);
    setActiveView('calendar');
  };

  const handleCreateProgram = () => {
    setNewProgramName('My New Program');
    setIsCreateModalOpen(true);
  };

  const handleConfirmCreateProgram = (e) => {
    e.preventDefault();
    if (newProgramName.trim()) {
        const newProgramId = createProgram(newProgramName.trim());
        setViewingProgramId(newProgramId);
        setIsCreateModalOpen(false);
    }
  };
  
  const handleStartEditName = (program) => {
    setEditingProgramId(program.id);
    setEditingProgramName(program.name);
  };

  const handleSaveName = (e) => {
    e.preventDefault();
    updateProgram(editingProgramId, { name: editingProgramName });
    setEditingProgramId(null);
  };
  
  const handleLoadAndSchedule = (template) => {
    const isAlreadyLoaded = appState.programs.some(p => p.id === template.id);
    if (!isAlreadyLoaded) {
      loadProgramTemplate(template);
    }
    setScheduleConfirm(template); 
  };
  
  const handleConfirmSchedule = () => {
    if (scheduleConfirm) {
      autoScheduleProgram(scheduleConfirm.workouts);
      alert('Your program has been scheduled! Check the Calendar tab to see your plan.');
      setScheduleConfirm(null);
    }
  };

  const viewingProgram = appState.programs.find(p => p.id === viewingProgramId);
  const userPrograms = appState.programs.filter(p => !p.isTemplate);

  if (viewingProgram) {
    const isEditingThisProgram = editingProgramId === viewingProgram.id;
    return (
      <div className="program-view-container">
        <div className="page-header">
          <button className="back-to-programs-btn" onClick={() => setViewingProgramId(null)}>
            <ArrowLeft size={20}/> All Programs
          </button>
          
          {isEditingThisProgram ? (
            <form onSubmit={handleSaveName} className="program-name-edit-form">
              <input type="text" value={editingProgramName} onChange={(e) => setEditingProgramName(e.target.value)} autoFocus onBlur={handleSaveName}/>
              <button type="submit">Save</button>
            </form>
          ) : (
            <div className="program-title-header">
                <h1>{viewingProgram.name}</h1>
                {!viewingProgram.isTemplate && <button className="icon-btn" onClick={() => handleStartEditName(viewingProgram)}><Edit size={20}/></button>}
            </div>
          )}

          <p>{viewingProgram.description}</p>
        </div>
        <div className="custom-workouts-list">
          {viewingProgram.workouts.map(workout => (
            <div key={workout.id} className="custom-workout-card">
              <div className="workout-card-header">
                <h3 className="workout-card-title">{workout.name}</h3>
                <CompactWorkoutPreview blocks={workout.blocks} />
              </div>
              <div className="workout-card-actions">
                <button className="action-btn schedule-btn" onClick={() => handleScheduleWorkout(workout.id)}>
                  <CalendarPlus size={18} /> Schedule
                </button>
                {!viewingProgram.isTemplate && (
                  <>
                    <button className="action-btn edit-btn" onClick={() => openWorkoutEditor(viewingProgram.id, workout.id)}>
                      <Edit size={18} /> Edit
                    </button>
                    <button className="action-btn delete-btn" onClick={() => deleteCustomWorkout(viewingProgram.id, workout.id)}>
                      <Trash2 size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
          {!viewingProgram.isTemplate && (
             <button className="create-workout-card" onClick={() => openWorkoutEditor(viewingProgram.id, null)}>
                <PlusCircle size={32} />
                <span>Create New Workout</span>
            </button>
          )}
        </div>
        {!viewingProgram.isTemplate && (
            <button className="delete-program-btn" onClick={() => {deleteProgram(viewingProgram.id); setViewingProgramId(null);}}>
                <Trash2 size={16}/> Delete Program
            </button>
        )}
      </div>
    );
  }

  return (
    <div className="program-view-container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>My Programs</h1>
          <p>Select a program to view its workouts.</p>
        </div>
        <button className="create-workout-btn" onClick={handleCreateProgram}>
          <PlusCircle size={20} />
          <span>Create Program</span>
        </button>
      </div>
      
      {userPrograms.length > 0 ? (
        <div className="programs-list">
            {userPrograms.map(program => (
              <div key={program.id} className="program-card" onClick={() => setViewingProgramId(program.id)}>
                <h3 className="program-card-title">{program.name}</h3>
                <p className="program-card-description">{program.workouts.length} workout{program.workouts.length !== 1 ? 's' : ''}</p>
                <span className="program-card-view-btn">View Program <ChevronsRight size={16}/></span>
              </div>
            ))}
        </div>
      ) : (
        <div className="program-empty-state">
            <p>You haven't created or loaded any programs yet. Create a new one or load a template below to get started.</p>
        </div>
      )}

      <div className="page-header" style={{marginTop: '24px'}}>
        <h2>Template Programs</h2>
        <p>Load a pre-built program to get started or for new ideas.</p>
      </div>
      <div className="programs-list">
        {programTemplates.map(template => {
            const isLoaded = appState.programs.some(p => p.id === template.id);
            return (
              <div key={template.id} className="program-card template">
                    <h3 className="program-card-title">{template.name}</h3>
                    <p className="program-card-description">{template.description}</p>
                    <div className="template-actions">
                        <button 
                            className="action-btn load-btn"
                            onClick={() => handleLoadAndSchedule(template)}
                        >
                            Load & Schedule
                        </button>
                        <button 
                            className={`action-btn copy-btn ${isLoaded ? 'disabled' : ''}`}
                            onClick={() => !isLoaded && loadProgramTemplate(template)}
                            disabled={isLoaded}
                        >
                            {isLoaded ? <><Check size={16}/> Added</> : 'Add to Library'}
                        </button>
                    </div>
              </div>
            )
        })}
      </div>

      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} title="Create New Program">
        <form onSubmit={handleConfirmCreateProgram} className="modal-form-container">
          <label htmlFor="newProgramName" className="modal-label">Program Name</label>
          <input
            id="newProgramName"
            type="text"
            className="modal-input"
            value={newProgramName}
            onChange={(e) => setNewProgramName(e.target.value)}
            autoFocus
          />
          <div className="modal-actions">
            <button type="button" className="action-btn" onClick={() => setIsCreateModalOpen(false)}>Cancel</button>
            <button type="submit" className="action-btn schedule-btn">Create Program</button>
          </div>
        </form>
      </Modal>

      <Modal 
        isOpen={!!scheduleConfirm} 
        onClose={() => setScheduleConfirm(null)} 
        title="Schedule Program"
      >
        <div className="modal-form-container">
          <p className="modal-confirm-text">
            "{scheduleConfirm?.name}" is in My Programs.
            <br/><br/>
            Would you like to automatically schedule it on your calendar now?
          </p>
          <div className="modal-actions">
            <button type="button" className="action-btn" onClick={() => setScheduleConfirm(null)}>Cancel</button>
            <button type="button" className="action-btn schedule-btn" onClick={handleConfirmSchedule}>OK</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProgramOverview;