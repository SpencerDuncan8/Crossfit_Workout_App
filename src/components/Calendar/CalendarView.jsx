// src/components/Calendar/CalendarView.jsx

import React, { useState, useContext } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, ArrowLeft, Play, Eye } from 'lucide-react';
import { generateMonthDays } from '../../utils/calendarUtils.js';
import DayCell from './DayCell.jsx';
import Modal from '../Common/Modal.jsx';
import { AppStateContext } from '../../context/AppContext.jsx';
import WorkoutDetailView from '../Program/WorkoutDetailView.jsx';
import './Calendar.css';

const CalendarView = ({ setActiveView }) => {
  const { appState, assignWorkoutToDate, navigateToDate } = useContext(AppStateContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalContent, setModalContent] = useState(null);
  const [previewWorkoutId, setPreviewWorkoutId] = useState(null);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthDays = generateMonthDays(currentDate.getFullYear(), currentDate.getMonth());

  const handleDayClick = (day, scheduledInfo) => {
    if (day.isBlank) return;
    if (scheduledInfo?.completedData) {
      setModalContent({ type: 'review', date: day.date });
    } else if (scheduledInfo) {
      navigateToDate(day.date.toISOString().split('T')[0]);
      setActiveView('workout');
    } else {
      setModalContent({ type: 'assign', date: day.date });
    }
  };

  const handleWorkoutSelect = (workoutId) => assignWorkoutToDate(modalContent.date, workoutId);
  const closeModal = () => { setModalContent(null); setPreviewWorkoutId(null); };

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  
  const scheduledWorkoutId = modalContent?.date ? appState.workoutSchedule[modalContent.date.toISOString().split('T')[0]]?.workoutId : null;
  const previewWorkout = previewWorkoutId ? appState.customWorkouts.find(w => w.id === previewWorkoutId) : null;
  
  const renderModalContent = () => {
    if (!modalContent) return null;

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
            <button className="assign-workout-item active" style={{marginTop: '16px'}} onClick={() => {handleWorkoutSelect(previewWorkout.id); closeModal();}}>
              Assign This Workout <CheckCircle size={20}/>
            </button>
          </>
        );
      }
      return (
        <div className="assign-workout-list">
          {appState.customWorkouts.map(workout => (
            <div key={workout.id} className={`assign-workout-item ${workout.id === scheduledWorkoutId ? 'active' : ''}`}>
              <span className="assign-workout-name" onClick={() => setPreviewWorkoutId(workout.id)}>
                <Eye size={16} /> {workout.name}
              </span>
              <button className="assign-btn" onClick={() => handleWorkoutSelect(workout.id)}>
                {workout.id === scheduledWorkoutId ? <CheckCircle size={20} /> : <Play size={20} />}
              </button>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <>
      <div className="calendar-container"><div className="calendar-header"><button className="month-nav-btn" onClick={handlePrevMonth}><ChevronLeft size={24} /></button><h2 className="current-month-label">{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2><button className="month-nav-btn" onClick={handleNextMonth}><ChevronRight size={24} /></button></div><div className="calendar-grid">{daysOfWeek.map(day => (<div key={day} className="day-of-week-header">{day}</div>))}{monthDays.map(day => (<DayCell key={day.key} day={day} onDayClick={handleDayClick} />))}</div></div>
      <Modal isOpen={!!modalContent} onClose={closeModal} title={modalContent?.type === 'review' ? 'Workout Review' : 'Assign Workout'}>{renderModalContent()}</Modal>
    </>
  );
};

export default CalendarView;