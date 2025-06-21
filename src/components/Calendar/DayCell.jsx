// src/components/Calendar/DayCell.jsx

import React, { useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { getDayInfo, getWorkoutColor } from '../../utils/calendarUtils.js';

const DayCell = ({ day, onDayClick }) => { // Receive onDayClick prop
  const { appState } = useContext(AppStateContext);
  
  const programStartDate = new Date(2025, 0, 1);
  const dayInfo = getDayInfo(day, programStartDate);
  
  const isCompleted = !dayInfo.isFuture && dayInfo.programDay && dayInfo.programDay < appState.currentDay;
  const isToday = day.isToday;

  if (dayInfo.isBlank) {
    return <div className="day-cell blank"></div>;
  }

  const workoutColor = getWorkoutColor(dayInfo.workoutType);
  const cellStyle = { '--workout-color': workoutColor, };

  let cellClass = 'day-cell';
  if (dayInfo.isFuture || !dayInfo.workoutType) {
    cellClass += ' future';
  } else if (isCompleted) {
    cellClass += ' completed';
  } else {
    cellClass += ' upcoming';
  }
  if (isToday) { cellClass += ' today'; }

  return (
    <div className={cellClass} style={cellStyle} onClick={() => onDayClick(dayInfo.programDay)}>
      <span className="day-number">{dayInfo.dayNumber}</span>
      <div className="dot-container">
        {workoutColor !== 'transparent' && <div className="workout-dot"></div>}
      </div>
    </div>
  );
};

export default DayCell;