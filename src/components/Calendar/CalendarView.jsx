// src/components/Calendar/CalendarView.jsx

import React, { useState, useContext } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { generateMonthDays } from './WorkoutCalendar.jsx';
import DayCell from './DayCell.jsx';
import Modal from '../Common/Modal.jsx';
import WorkoutView from '../Workout/WorkoutView.jsx';
import { AppStateContext } from '../../context/AppContext.jsx';
import './Calendar.css';

const CalendarView = () => {
  // THE FIX - STEP 1: Get the ENTIRE context value, not just the appState.
  const fullContext = useContext(AppStateContext);
  const { appState } = fullContext;

  const [currentDate, setCurrentDate] = useState(appState.challengeStartDate || new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const monthDays = generateMonthDays(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  const handleDayClick = (dayProgramDay) => {
    if (dayProgramDay) {
      setSelectedDay(dayProgramDay);
      setIsPreviewModalOpen(true);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // THE FIX - STEP 2: Create a new context value for the preview.
  // It includes all the original functions (like openExerciseModal)
  // but provides a modified appState where `currentDay` is the one we've selected.
  const previewContextValue = {
    ...fullContext,
    appState: { ...appState, currentDay: selectedDay },
  };


  return (
    <>
      <div className="calendar-container">
        <div className="calendar-header">
          <button className="month-nav-btn" onClick={handlePrevMonth}> <ChevronLeft size={24} /> </button>
          <h2 className="current-month-label">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <button className="month-nav-btn" onClick={handleNextMonth}> <ChevronRight size={24} /> </button>
        </div>
        <div className="calendar-grid">
          {daysOfWeek.map(day => (
            <div key={day} className="day-of-week-header">{day}</div>
          ))}
          {monthDays.map(day => (
            <DayCell key={day.key} day={day} onDayClick={handleDayClick} />
          ))}
        </div>
      </div>

      <Modal 
        isOpen={isPreviewModalOpen} 
        onClose={() => setIsPreviewModalOpen(false)}
        title={`Workout Preview: Day ${selectedDay}`}
      >
        {/* THE FIX - STEP 3: Pass the new, complete context value here. */}
        <AppStateContext.Provider value={previewContextValue}>
          <WorkoutView />
        </AppStateContext.Provider>
      </Modal>
    </>
  );
};

export default CalendarView;