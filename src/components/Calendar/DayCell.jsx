// src/components/Calendar/DayCell.jsx

import React, { useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { getWorkoutColor } from '../../utils/calendarUtils.js';

const DayCell = ({ day, onDayClick }) => {
  const { appState } = useContext(AppStateContext);
  
  if (day.isBlank) {
    return <div className="day-cell blank"></div>;
  }

  const dateString = day.date.toISOString().split('T')[0];
  const scheduledInfo = appState.workoutSchedule[dateString];
  
  const isCompleted = scheduledInfo && scheduledInfo.completedData;
  const isPlanned = scheduledInfo && !isCompleted;
  
  const workoutColor = isPlanned || isCompleted ? getWorkoutColor() : 'transparent';
  
  let cellClass = 'day-cell';
  if (day.isToday) cellClass += ' today';
  if (isCompleted) cellClass += ' completed';

  return (
    // THE FIX: Pass both 'day' and 'scheduledInfo' up on click
    <div className={cellClass} style={{'--workout-color': workoutColor}} onClick={() => onDayClick(day, scheduledInfo)}>
      <span className="day-number">{day.dayNumber}</span>
      <div className="dot-container">
        {isPlanned && <div className="workout-dot"></div>}
      </div>
    </div>
  );
};

export default DayCell;