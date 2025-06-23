// src/components/Program/ProgramOverview.jsx

import React, { useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { PlusCircle, Trash2, Edit, CalendarPlus } from 'lucide-react'; 
import './ProgramOverview.css';

const ProgramOverview = ({ setActiveView }) => {
  // -> Get the renamed function from context
  const { appState, saveCustomWorkout, deleteCustomWorkout, openWorkoutEditor, selectWorkoutToSchedule } = useContext(AppStateContext);

  const handleCreateNewWorkout = () => {
    const newWorkout = { id: Date.now(), name: 'My New Workout', blocks: [] };
    openWorkoutEditor(newWorkout.id);
    saveCustomWorkout(newWorkout);
  };

  // -> Rename the handler function
  const handleScheduleWorkout = (workoutId) => {
    selectWorkoutToSchedule(workoutId); // "Pick up" the workout
    setActiveView('calendar');      // Switch to the calendar tab
  };

  return (
    <div className="program-view-container">
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
        {appState.customWorkouts.length === 0 ? (
          <div className="empty-state-card">
            <h3 className="empty-state-title">Your workout library is empty</h3>
            <p className="empty-state-text">Click "Create Workout" to build your first custom routine.</p>
          </div>
        ) : (
          appState.customWorkouts.map(workout => (
            <div key={workout.id} className="custom-workout-card">
              <div className="workout-card-header">
                <h3 className="workout-card-title">{workout.name}</h3>
                <p className="workout-card-subtitle">{workout.blocks.length} block{workout.blocks.length !== 1 ? 's' : ''}</p>
              </div>
              <div className="workout-card-actions">
                {/* -> UPDATE THE BUTTON */}
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
          ))
        )}
      </div>
    </div>
  );
};

export default ProgramOverview;