// src/components/Program/ProgramOverview.jsx

import React, { useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { programTemplates } from '../../data/programTemplates.js';
import { PlusCircle, Trash2, Edit, CalendarPlus, ChevronsRight } from 'lucide-react'; 
// Import our new preview component
import CompactWorkoutPreview from './CompactWorkoutPreview.jsx';
import './ProgramOverview.css';

const ProgramOverview = ({ setActiveView }) => {
  const { appState, saveCustomWorkout, deleteCustomWorkout, openWorkoutEditor, selectWorkoutToSchedule, loadProgramTemplate } = useContext(AppStateContext);

  const handleCreateNewWorkout = () => {
    const newWorkout = { id: Date.now(), name: 'My New Workout', blocks: [] };
    openWorkoutEditor(newWorkout.id);
    saveCustomWorkout(newWorkout);
  };

  const handleScheduleWorkout = (workoutId) => {
    selectWorkoutToSchedule(workoutId);
    setActiveView('calendar');
  };

  return (
    <div className="program-view-container">
      {appState.customWorkouts.length === 0 ? (
        <div className="templates-container">
            <div className="page-header" style={{textAlign: 'center', marginBottom: '16px'}}>
                <h1>Welcome to Your Fitness Journey!</h1>
                <p>Get started instantly by choosing a guided program.</p>
            </div>
            {programTemplates.map(template => (
                <div key={template.id} className="template-card">
                    <div className="template-card-header">
                        <h3 className="template-card-title">{template.name}</h3>
                        <p className="template-card-description">{template.description}</p>
                    </div>
                    <button className="load-program-btn" onClick={() => loadProgramTemplate(template)}>
                        <span>Load This Program</span>
                        <ChevronsRight size={20} />
                    </button>
                </div>
            ))}
            <div className="divider-or">OR</div>
            <button className="create-workout-btn-secondary" onClick={handleCreateNewWorkout}>
                <PlusCircle size={20} />
                Build a Workout From Scratch
            </button>
        </div>
      ) : (
        <>
          <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1>My Workouts</h1>
              <p>Create, edit, and manage your custom workout routines.</p>
            </div>
            <button className="create-workout-btn" onClick={handleCreateNewWorkout}>
              <PlusCircle size={20} />
              <span>Create Workout</span>
            </button>
          </div>
          <div className="custom-workouts-list">
            {appState.customWorkouts.map(workout => (
              <div key={workout.id} className="custom-workout-card">
                <div className="workout-card-header">
                  <h3 className="workout-card-title">{workout.name}</h3>
                  
                  {/* We now use the new component here instead of the block tags */}
                  <CompactWorkoutPreview blocks={workout.blocks} />

                </div>
                <div className="workout-card-actions">
                  <button className="action-btn schedule-btn" onClick={() => handleScheduleWorkout(workout.id)}>
                    <CalendarPlus size={18} />
                    Schedule
                  </button>
                  <button className="action-btn edit-btn" onClick={() => openWorkoutEditor(workout.id)}>
                    <Edit size={18} />
                    Edit
                  </button>
                  <button className="action-btn delete-btn" onClick={() => deleteCustomWorkout(workout.id)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProgramOverview;