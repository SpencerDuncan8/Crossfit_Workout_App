// src/components/Program/ProgramOverview.jsx

import React, { useState, useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { programTemplates } from '../../data/programTemplates.js';
import { PlusCircle, Trash2, Edit, CalendarPlus, ChevronsRight, ArrowLeft, Copy, Check } from 'lucide-react'; 
import CompactWorkoutPreview from './CompactWorkoutPreview.jsx';
import Modal from '../Common/Modal.jsx';
import './ProgramOverview.css';

const ProgramOverview = ({ setActiveView }) => {
  const { appState, currentUser, deleteCustomWorkout, openWorkoutEditor, selectWorkoutToSchedule, createProgram, copyProgram, deleteProgram, updateProgram, loadProgramTemplate, autoScheduleProgram } = useContext(AppStateContext);

  const [viewingProgramId, setViewingProgramId] = useState(null);
  const [editingProgramId, setEditingProgramId] = useState(null);
  const [editingProgramName, setEditingProgramName] = useState('');
  const [editingProgramDescription, setEditingProgramDescription] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProgramName, setNewProgramName] = useState('My New Program');
  const [scheduleConfirm, setScheduleConfirm] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [programToDelete, setProgramToDelete] = useState(null);

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
        if (newProgramId) { // NEW: Only set viewing if program was actually created
            setViewingProgramId(newProgramId);
            setIsCreateModalOpen(false);
        } else {
            // NEW: Program creation was blocked due to limit, modal handled by createProgram
            setIsCreateModalOpen(false);
        }
    }
  };

  const handleStartEditProgram = (program) => {
    setEditingProgramId(program.id);
    setEditingProgramName(program.name);
    setEditingProgramDescription(program.description);
  };

  const handleSaveProgram = (e) => {
    e.preventDefault();
    updateProgram(editingProgramId, { name: editingProgramName, description: editingProgramDescription });
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
      autoScheduleProgram(scheduleConfirm.workouts, scheduleConfirm.daysPerWeek);
      setShowSuccessModal(true);
      setScheduleConfirm(null);
    }
  };

  const handleConfirmDelete = () => {
    if (programToDelete) {
      deleteProgram(programToDelete.id);
      setViewingProgramId(null); // Go back to the main list
      setProgramToDelete(null);
    }
  };

  const viewingProgram = appState.programs.find(p => p.id === viewingProgramId);
  const userPrograms = appState.programs.filter(p => !p.isTemplate);

  // NEW: Premium status check and program count
  const isPremium = appState.isPremium || currentUser?.isPremium;
  const programCount = userPrograms.length;
  const maxPrograms = 3;

  let currentView;

  if (viewingProgram) {
    const isEditingThisProgram = editingProgramId === viewingProgram.id;
    currentView = (
      <div className="program-view-container">
        <div className="page-header">
          <button className="back-to-programs-btn" onClick={() => setViewingProgramId(null)}>
            <ArrowLeft size={20}/> All Programs
          </button>

          {isEditingThisProgram ? (
            <form onSubmit={handleSaveProgram} className="program-edit-form">
              <input
                type="text"
                className="program-name-edit-input"
                value={editingProgramName}
                onChange={(e) => setEditingProgramName(e.target.value)}
                autoFocus
              />
              <textarea
                value={editingProgramDescription}
                onChange={(e) => setEditingProgramDescription(e.target.value)}
                className="program-description-edit-textarea"
                placeholder="Enter program description..."
                rows="4"
              />
              <button type="submit" className="save-program-btn">Save</button>
            </form>
          ) : (
            <>
              <div className="program-title-header">
                  <h1>{viewingProgram.name}</h1>
                  {!viewingProgram.isTemplate && <button className="icon-btn" onClick={() => handleStartEditProgram(viewingProgram)}><Edit size={20}/></button>}
              </div>
              <p>{viewingProgram.description}</p>
            </>
          )}
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
            <button className="delete-program-btn" onClick={() => setProgramToDelete(viewingProgram)}>
                <Trash2 size={16}/> Delete Program
            </button>
        )}
      </div>
    );
  } else {
    currentView = (
      <div className="program-view-container">
        <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>My Programs</h1>
            {/* NEW: Show program count for free users only */}
            {!isPremium && (
              <p>
                Select a program to view its workouts. ({programCount}/{maxPrograms} programs)
              </p>
            )}
            {isPremium && (
              <p>Select a program to view its workouts.</p>
            )}
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
      </div>
    );
  }

  return (
    <>
      {currentView}

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

      <Modal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
        title="Success"
      >
        <div className="modal-form-container">
          <p className="modal-confirm-text">
            Your program has been scheduled!
            <br/>
            Check the Calendar tab to see your plan.
          </p>
          <div className="modal-actions" style={{ justifyContent: 'center' }}>
            <button 
              type="button" 
              className="action-btn schedule-btn" 
              onClick={() => setShowSuccessModal(false)} 
              style={{ flexGrow: 0, padding: '10px 40px' }}
            >
              OK
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={!!programToDelete}
        onClose={() => setProgramToDelete(null)}
        title="Delete Program"
      >
        <div className="modal-form-container">
          <p className="modal-confirm-text">
            Are you sure you want to delete the "<strong>{programToDelete?.name}</strong>" program? This will permanently remove all of its workouts and cannot be undone.
          </p>
          <div className="modal-actions">
            <button type="button" className="action-btn" onClick={() => setProgramToDelete(null)}>Cancel</button>
            <button type="button" className="action-btn danger-btn" onClick={handleConfirmDelete}>Delete</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ProgramOverview;