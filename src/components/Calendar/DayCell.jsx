// src/components/Calendar/DayCell.jsx

import React, { useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { getDayInfo, getWorkoutColor } from './WorkoutCalendar.jsx';

const DayCell = ({ day, onDayClick }) => {
  const { appState } = useContext(AppStateContext);
  
  // Use the dynamic start date from the context
  const programStartDate = appState.challengeStartDate;
  
  // If the challenge hasn't started, only 'today' styling is relevant
  if (!programStartDate) {
      let cellClass = 'day-cell';
      if (day.isToday) cellClass += ' today';
      return (
        <div className={cellClass} style={{ cursor: 'default', opacity: 0.5 }}>
            <span className="day-number">{day.dayNumber}</span>
        </div>
      );
  }

  const dayInfo = getDayInfo(day, programStartDate);
  
  if (dayInfo.isBlank) {
    return <div className="day-cell blank"></div>;
  }

  // Check if the workout for this day has been completed
  const isCompleted = dayInfo.programDay !== null && appState.workoutsCompleted.includes(dayInfo.programDay);
  const isProgramCurrentDay = dayInfo.programDay !== null && dayInfo.programDay === appState.currentDay;
  const isUpcomingWorkout = dayInfo.programDay !== null && !isCompleted && !isProgramCurrentDay;
  const isToday = dayInfo.isToday;

  const workoutColor = getWorkoutColor(dayInfo.workoutType);
  const cellStyle = { '--workout-color': workoutColor };

  let cellClass = 'day-cell';
  if (isCompleted) {
    cellClass += ' completed';
  } else if (isProgramCurrentDay) {
    cellClass += ' upcoming'; // 'upcoming' class provides the border highlight
  } else if (!dayInfo.programDay && !isToday) {
    cellClass += ' future';
  }

  if (isToday) {
    cellClass += ' today';
  }

  const handleClick = () => {
    if (dayInfo.programDay) {
      onDayClick(dayInfo.programDay);
    }
  };

  return (
    <div className={cellClass} style={cellStyle} onClick={handleClick}>
      <span className="day-number">{dayInfo.dayNumber}</span>
      <div className="dot-container">
        {isUpcomingWorkout && workoutColor !== 'transparent' && <div className="workout-dot"></div>}
      </div>
    </div>
  );
};

export default DayCell;