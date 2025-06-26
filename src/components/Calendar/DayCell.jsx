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
  const scheduledItems = appState.workoutSchedule[dateString] || [];
  
  // THE FIX: New logic for multiple workouts per day
  const isFullyCompleted = scheduledItems.length > 0 && scheduledItems.every(item => item.completedData);
  const plannedWorkouts = scheduledItems.filter(item => !item.completedData);
  
  const workoutColor = scheduledItems.length > 0 ? getWorkoutColor() : 'transparent';
  
  let cellClass = 'day-cell';
  if (day.isToday) cellClass += ' today';
  if (isFullyCompleted) cellClass += ' completed';

  return (
    <div className={cellClass} style={{'--workout-color': workoutColor}} onClick={() => onDayClick(day, scheduledItems)}>
      <span className="day-number">{day.dayNumber}</span>
      <div className="dot-container">
        {/* THE FIX: Render a dot for each planned workout */}
        {plannedWorkouts.map(item => (
          <div key={item.scheduleId} className="workout-dot"></div>
        ))}
      </div>
    </div>
  );
};

export default DayCell;