// src/components/Calendar/CalendarView.jsx

import React, { useState, useContext } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, ArrowLeft, Play, Eye, X, PlusCircle, Edit, Trash2, ChevronsRight } from 'lucide-react';
import { generateMonthDays } from '../../utils/calendarUtils.js';
import DayCell from './DayCell.jsx';
import Modal from '../Common/Modal.jsx';
import { AppStateContext } from '../../context/AppContext.jsx';
import WorkoutDetailView from '../Program/WorkoutDetailView.jsx';
import './Calendar.css';

const CalendarView = ({ setActiveView }) => {
  const { appState, allWorkouts, scheduleWorkoutForDate, navigateToDate, clearWorkoutToSchedule, removeWorkoutFromSchedule } = useContext(AppStateContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalContent, setModalContent] = useState(null);
  const [previewWorkoutId, setPreviewWorkoutId] = useState(null);
  const [selectedProgramId, setSelectedProgramId] = useState(null); // <-- NEW STATE

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthDays = generateMonthDays(currentDate.getFullYear(), currentDate.getMonth());

  const handleDayClick = (day, scheduledItems) => {
    if (day.isBlank) return;
    if (appState.workoutToScheduleId) {
      scheduleWorkoutForDate(day.date, appState.workoutToScheduleId);
      return;
    }
    setModalContent({ type: 'day-schedule', date: day.date });
  };
  
  // UPDATED: Reset all modal states on close
  const closeModal = () => {
    setModalContent(null);
    setPreviewWorkoutId(null);
    setSelectedProgramId(null);
  };

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  
  // UPDATED: Reset more states on day change
  const handlePrevDayInModal = () => {
    setModalContent(prev => { if (!prev) return null; const newDate = new Date(prev.date); newDate.setUTCDate(newDate.getUTCDate() - 1); return { ...prev, date: newDate }; });
    setPreviewWorkoutId(null);
    setSelectedProgramId(null);
  };

  const handleNextDayInModal = () => {
    setModalContent(prev => { if (!prev) return null; const newDate = new Date(prev.date); newDate.setUTCDate(newDate.getUTCDate() + 1); return { ...prev, date: newDate }; });
    setPreviewWorkoutId(null);
    setSelectedProgramId(null);
  };

  const previewWorkout = previewWorkoutId ? allWorkouts.find(w => w.id === previewWorkoutId) : null;
  const workoutToSchedule = appState.workoutToScheduleId ? allWorkouts.find(w => w.id === appState.workoutToScheduleId) : null;
  const userPrograms = appState.programs.filter(p => !p.isTemplate);

  const renderModalContent = () => {
    if (!modalContent) return null;

    const { date } = modalContent;
    const dateString = date.toISOString().split('T')[0];
    const scheduledItems = appState.workoutSchedule[dateString] || [];
    const selectedProgram = appState.programs.find(p => p.id === selectedProgramId);

    // --- START REFACTORED LOGIC ---

    // Step 1: Previewing a specific workout (deepest level)
    if (previewWorkoutId && selectedProgram) {
      return (
        <>
          <button className="modal-back-btn" onClick={() => setPreviewWorkoutId(null)}>
            <ArrowLeft size={18}/> Back to {selectedProgram.name}
          </button>
          <WorkoutDetailView workout={previewWorkout} />
          <button className="action-btn schedule-btn" style={{marginTop: '16px', width: '100%'}} onClick={() => { scheduleWorkoutForDate(date, previewWorkout.id); closeModal(); }}>
            <CheckCircle size={20}/> Schedule This Workout
          </button>
        </>
      );
    }
    
    // Step 2: A program is selected, show its workouts
    if (selectedProgramId && selectedProgram) {
        return (
            <>
                <button className="modal-back-btn" onClick={() => setSelectedProgramId(null)}>
                    <ArrowLeft size={18}/> Back to Programs
                </button>
                <div className="assign-workout-list">
                    {selectedProgram.workouts.length > 0 ? (
                        selectedProgram.workouts.map(workout => (
                            <div key={workout.id} className="assign-workout-item">
                                <span className="assign-workout-name" onClick={() => setPreviewWorkoutId(workout.id)}><Eye size={16} /> {workout.name}</span>
                                <button className="assign-btn" onClick={() => { scheduleWorkoutForDate(date, workout.id); closeModal(); }}>
                                    <PlusCircle size={20} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="modal-empty-state">This program has no workouts yet.</p>
                    )}
                </div>
            </>
        );
    }

    // Step 3: No program selected, show the list of programs
    if (modalContent.type === 'assign' || (modalContent.type === 'day-schedule' && scheduledItems.length === 0)) {
        if (userPrograms.length === 0) {
            return (
              <div className="modal-empty-state">
                <h4>No Programs Found</h4>
                <p>You haven't created any custom programs yet. Go to the Program tab to build your first one.</p>
                <button className="action-btn schedule-btn" onClick={() => {closeModal(); setActiveView('program'); }}>
                  <PlusCircle size={18} /> Go to Program
                </button>
              </div>
            )
        }
        return (
            <div className="assign-workout-list">
                {userPrograms.map(program => (
                    <div key={program.id} className="program-select-item" onClick={() => setSelectedProgramId(program.id)}>
                        <span>{program.name}</span>
                        <ChevronsRight size={20} />
                    </div>
                ))}
            </div>
        );
    }

    // Step 4: Default view for a day with items already scheduled
    if (modalContent.type === 'day-schedule' && scheduledItems.length > 0) {
      if (previewWorkout) { // Allow previewing completed workouts
        const scheduleItem = scheduledItems.find(i => i.workoutId === previewWorkoutId);
        return (
            <>
              <button className="modal-back-btn" onClick={() => setPreviewWorkoutId(null)}><ArrowLeft size={18}/> Back to Schedule</button>
              <WorkoutDetailView workout={previewWorkout} completedData={scheduleItem?.completedData}/>
            </>
        );
      }

      return (
        <div className="assign-workout-list">
          {scheduledItems.map(item => {
            const workout = allWorkouts.find(w => w.id === item.workoutId);
            if (!workout) return null;
            
            const handleAction = () => {
              if (item.completedData) setPreviewWorkoutId(item.workoutId);
              else { navigateToDate(date.toISOString().split('T')[0], item.scheduleId); setActiveView('workout'); closeModal(); }
            };

            return (
              <div key={item.scheduleId} className={`assign-workout-item ${item.completedData ? 'completed' : ''}`}>
                <span className="assign-workout-name" onClick={handleAction}>
                  {item.completedData ? <CheckCircle size={16} /> : <Eye size={16}/>}
                  {workout.name}
                </span>
                <button className="assign-btn trash-btn" onClick={() => removeWorkoutFromSchedule(date, item.scheduleId)}>
                    <Trash2 size={20} />
                </button>
              </div>
            );
          })}
          <button className="action-btn schedule-btn" onClick={() => setModalContent({ type: 'assign', date, scheduledItems })}>
              <PlusCircle size={18} /> Add another workout
          </button>
        </div>
      );
    }

    return null; // Fallback
    // --- END REFACTORED LOGIC ---
  };

  // UPDATED: This function now builds a more dynamic title
  const getModalTitleWithNav = () => {
    if (!modalContent) return '';
    const d = new Date(modalContent.date);
    const formattedDate = d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' });
    
    let subTitle = "Today's Schedule";
    if (modalContent.type === 'assign' || (modalContent.type === 'day-schedule' && (appState.workoutSchedule[modalContent.date.toISOString().split('T')[0]] || []).length === 0)) {
        subTitle = selectedProgramId ? `Select a Workout` : 'Select a Program';
    }

    return (
        <div className="modal-title-nav">
            <button className="day-nav-btn" onClick={handlePrevDayInModal}><ChevronLeft size={24} /></button>
            <div className="modal-title-text-container">
                <h2>{formattedDate}</h2>
                <span>{subTitle}</span>
            </div>
            <button className="day-nav-btn" onClick={handleNextDayInModal}><ChevronRight size={24} /></button>
        </div>
    );
  }

  return (
    <>
      {workoutToSchedule && (
        <div className="scheduling-banner">
          <span>Scheduling: <strong>{workoutToSchedule.name}</strong>. Select a date.</span>
          <button onClick={clearWorkoutToSchedule} className="cancel-schedule-btn"><X size={16} /> Cancel</button>
        </div>
      )}
      <div className={`calendar-container ${workoutToSchedule ? 'is-scheduling' : ''}`}>
        <div className="calendar-header">
          <button className="month-nav-btn" onClick={handlePrevMonth}><ChevronLeft size={24} /></button>
          <h2 className="current-month-label">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
          <button className="month-nav-btn" onClick={handleNextMonth}><ChevronRight size={24} /></button>
        </div>
        <div className="calendar-grid">
          {daysOfWeek.map(day => (<div key={day} className="day-of-week-header">{day}</div>))}
          {monthDays.map(day => (<DayCell key={day.key} day={day} onDayClick={handleDayClick} />))}
        </div>
      </div>
      <Modal 
        isOpen={!!modalContent} 
        onClose={closeModal} 
        title={getModalTitleWithNav()}
      >
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default CalendarView;