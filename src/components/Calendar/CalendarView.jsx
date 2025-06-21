// src/components/Calendar/CalendarView.jsx

import React, { useState, useContext } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { generateMonthDays } from '../../utils/calendarUtils.js';
import DayCell from './DayCell.jsx';
import Modal from '../Common/Modal.jsx'; // Import the generic modal
import WorkoutView from '../Workout/WorkoutView.jsx'; // Import our existing WorkoutView
import { AppStateContext } from '../../context/AppContext.jsx';
import './Calendar.css';

const CalendarView = () => {
  const { appState } = useContext(AppStateContext);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)); // Start in Jan 2025
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

  // We temporarily override the app's currentDay for the preview
  const previewAppState = { ...appState, currentDay: selectedDay };

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
        {/* We reuse WorkoutView inside the modal! */}
        <AppStateContext.Provider value={{ appState: previewAppState }}>
          <WorkoutView />
        </AppStateContext.Provider>
      </Modal>
    </>
  );
};

export default CalendarView;