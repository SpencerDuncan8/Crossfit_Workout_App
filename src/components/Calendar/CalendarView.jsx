// src/components/Calendar/CalendarView.jsx

import React, { useState, useContext } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, ArrowLeft, Play, Eye, X, PlusCircle, Edit } from 'lucide-react';
import { generateMonthDays } from '../../utils/calendarUtils.js';
import DayCell from './DayCell.jsx';
import Modal from '../Common/Modal.jsx';
import { AppStateContext } from '../../context/AppContext.jsx';
import WorkoutDetailView from '../Program/WorkoutDetailView.jsx';
import './Calendar.css';

const CalendarView = ({ setActiveView }) => {
  const { appState, scheduleWorkoutForDate, navigateToDate, clearWorkoutToSchedule } = useContext(AppStateContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalContent, setModalContent] = useState(null);
  const [previewWorkoutId, setPreviewWorkoutId] = useState(null);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthDays = generateMonthDays(currentDate.getFullYear(), currentDate.getMonth());

  const handleDayClick = (day, scheduledInfo) => {
    if (day.isBlank) return;

    if (appState.workoutToScheduleId) {
      scheduleWorkoutForDate(day.date, appState.workoutToScheduleId);
      return;
    }

    if (scheduledInfo?.completedData) {
      setModalContent({ type: 'review', date: day.date });
    } else if (scheduledInfo) {
      setModalContent({ type: 'action-select', date: day.date });
    } else {
      setModalContent({ type: 'assign', date: day.date });
    }
  };

  const handleWorkoutSelect = (workoutId) => {
      scheduleWorkoutForDate(modalContent.date, workoutId);
      closeModal();
  }
  
  const closeModal = () => { setModalContent(null); setPreviewWorkoutId(null); };
  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  
  const scheduledWorkoutId = modalContent?.date ? appState.workoutSchedule[modalContent.date.toISOString().split('T')[0]]?.workoutId : null;
  const previewWorkout = previewWorkoutId ? appState.customWorkouts.find(w => w.id === previewWorkoutId) : null;
  const workoutToSchedule = appState.workoutToScheduleId ? appState.customWorkouts.find(w => w.id === appState.workoutToScheduleId) : null;

  const renderModalContent = () => {
    if (!modalContent) return null;

    if (modalContent.type === 'action-select') {
      const schedule = appState.workoutSchedule[modalContent.date.toISOString().split('T')[0]];
      const workout = appState.customWorkouts.find(w => w.id === schedule.workoutId);
      
      const handleActionStart = () => {
        navigateToDate(modalContent.date.toISOString().split('T')[0]);
        setActiveView('workout');
        closeModal();
      };
      
      const handleActionChange = () => {
        setModalContent({ type: 'assign', date: modalContent.date });
      };

      return (
        <div className="action-select-container">
          <h4>Scheduled: {workout?.name || 'Workout'}</h4>
          <p>What would you like to do?</p>
          <button className="action-select-btn primary" onClick={handleActionStart}>
            <Play size={20} /> Start Workout
          </button>
          <button className="action-select-btn" onClick={handleActionChange}>
            <Edit size={20} /> Change Workout
          </button>
        </div>
      );
    }
    
    if (modalContent.type === 'review') {
      const schedule = appState.workoutSchedule[modalContent.date.toISOString().split('T')[0]];
      const workout = appState.customWorkouts.find(w => w.id === schedule.workoutId);
      return <WorkoutDetailView workout={workout} completedData={schedule.completedData} />;
    }
    
    if (modalContent.type === 'assign') {
      if (previewWorkout) {
        return (
          <>
            <button className="modal-back-btn" onClick={() => setPreviewWorkoutId(null)}><ArrowLeft size={18}/> Back to List</button>
            <WorkoutDetailView workout={previewWorkout} />
            <button className="action-btn schedule-btn" style={{marginTop: '16px', width: '100%'}} onClick={() => {handleWorkoutSelect(previewWorkout.id)}}>
              <CheckCircle size={20}/> Schedule This Workout
            </button>
          </>
        );
      }
      
      if (appState.customWorkouts.length === 0) {
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
          {appState.customWorkouts.map(workout => (
            <div key={workout.id} className={`assign-workout-item ${workout.id === scheduledWorkoutId ? 'active' : ''}`}>
              <span className="assign-workout-name" onClick={() => setPreviewWorkoutId(workout.id)}><Eye size={16} /> {workout.name}</span>
              <button className="assign-btn" onClick={() => handleWorkoutSelect(workout.id)}>
                {workout.id === scheduledWorkoutId ? <CheckCircle size={20} /> : <Play size={20} />}
              </button>
            </div>
          ))}
        </div>
      );
    }
  };
  
  const getModalTitle = () => {
    if (!modalContent) return '';
    switch(modalContent.type) {
        case 'review': return 'Workout Review';
        case 'action-select': 
          const d = new Date(modalContent.date);
          return d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' });
        case 'assign': 
          return scheduledWorkoutId ? 'Change Workout' : 'Schedule Workout';
        default: return 'Calendar Action';
    }
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
      <Modal isOpen={!!modalContent} onClose={closeModal} title={getModalTitle()}>
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default CalendarView;