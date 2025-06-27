// src/components/Calendar/CalendarView.jsx

import React, { useState, useContext } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, ArrowLeft, Play, Eye, X, PlusCircle, Edit, Trash2 } from 'lucide-react';
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
  
  const closeModal = () => { setModalContent(null); setPreviewWorkoutId(null); };
  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  
  // THE FIX: Add functions to navigate days within the modal
  const handlePrevDayInModal = () => {
    setModalContent(prev => {
      if (!prev) return null;
      const newDate = new Date(prev.date);
      newDate.setUTCDate(newDate.getUTCDate() - 1);
      return { ...prev, date: newDate };
    });
    setPreviewWorkoutId(null); // Reset preview on day change
  };

  const handleNextDayInModal = () => {
    setModalContent(prev => {
      if (!prev) return null;
      const newDate = new Date(prev.date);
      newDate.setUTCDate(newDate.getUTCDate() + 1);
      return { ...prev, date: newDate };
    });
    setPreviewWorkoutId(null); // Reset preview on day change
  };

  const previewWorkout = previewWorkoutId ? allWorkouts.find(w => w.id === previewWorkoutId) : null;
  const workoutToSchedule = appState.workoutToScheduleId ? allWorkouts.find(w => w.id === appState.workoutToScheduleId) : null;

  const renderModalContent = () => {
    if (!modalContent) return null;

    const { date } = modalContent;
    const dateString = date.toISOString().split('T')[0];
    const scheduledItems = appState.workoutSchedule[dateString] || [];

    if (modalContent.type === 'day-schedule') {
        if (scheduledItems.length === 0 && !previewWorkout) {
            return renderAssignView(date);
        }

        if (previewWorkout) {
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
                if (item.completedData) {
                  setPreviewWorkoutId(item.workoutId);
                } else {
                  navigateToDate(date.toISOString().split('T')[0], item.scheduleId);
                  setActiveView('workout');
                  closeModal();
                }
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
    
    if (modalContent.type === 'assign') {
      return renderAssignView(modalContent.date);
    }
  };

  const renderAssignView = (date) => {
    if (previewWorkout) {
        return (
          <>
            <button className="modal-back-btn" onClick={() => setPreviewWorkoutId(null)}><ArrowLeft size={18}/> Back to List</button>
            <WorkoutDetailView workout={previewWorkout} />
            <button className="action-btn schedule-btn" style={{marginTop: '16px', width: '100%'}} onClick={() => { scheduleWorkoutForDate(date, previewWorkout.id); setModalContent({ type: 'day-schedule', date }); }}>
              <CheckCircle size={20}/> Schedule This Workout
            </button>
          </>
        );
      }
      
      if (allWorkouts.length === 0) {
        return (
          <div className="modal-empty-state">
            <h4>No Workouts Found</h4>
            <p>You haven't created any custom workouts yet. Go to the Program tab to build your first one.</p>
            <button className="action-btn schedule-btn" onClick={() => {closeModal(); setActiveView('program'); }}>
              <PlusCircle size={18} /> Go to Program
            </button>
          </div>
        )
      }

      return (
        <div className="assign-workout-list">
          {allWorkouts.map(workout => (
            <div key={workout.id} className="assign-workout-item">
              <span className="assign-workout-name" onClick={() => setPreviewWorkoutId(workout.id)}><Eye size={16} /> {workout.name}</span>
              <button className="assign-btn" onClick={() => { scheduleWorkoutForDate(date, workout.id); setModalContent({ type: 'day-schedule', date }); }}>
                <PlusCircle size={20} />
              </button>
            </div>
          ))}
        </div>
      );
  }
  
  // THE FIX: This function now builds the entire title with navigation
  const getModalTitleWithNav = () => {
    if (!modalContent) return '';
    const d = new Date(modalContent.date);
    const formattedDate = d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' });
    const isAssignView = modalContent.type === 'assign';

    return (
        <div className="modal-title-nav">
            <button className="day-nav-btn" onClick={handlePrevDayInModal}>
                <ChevronLeft size={24} />
            </button>
            <div className="modal-title-text-container">
                <h2>{formattedDate}</h2>
                {isAssignView && <span>Add a Workout</span>}
            </div>
            <button className="day-nav-btn" onClick={handleNextDayInModal}>
                <ChevronRight size={24} />
            </button>
        </div>
    );
  }

  return (
    <>
      {workoutToSchedule && (
        <div className="scheduling-banner">
          <span>Scheduling: <strong>{workoutToSchedule.name}</strong>. Select a date.</span>
          <button onClick={clearWorkoutToSchedule} className="cancel-schedule-btn">
            <X size={16} /> Cancel
          </button>
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