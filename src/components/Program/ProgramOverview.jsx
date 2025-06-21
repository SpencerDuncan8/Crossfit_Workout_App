// src/components/Program/ProgramOverview.jsx

import React from 'react';
import { getWorkoutType } from '../../data/workoutProgram.js';
import { getWorkoutColor } from '../../utils/calendarUtils.js';
import './ProgramOverview.css';

const ProgramOverview = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // We'll just show the template for one week as it repeats
  const weeklySchedule = Array.from({ length: 7 }, (_, i) => {
    const dayNum = i + 1;
    const workoutType = getWorkoutType(dayNum);
    const color = getWorkoutColor(workoutType);
    return { dayName: days[i], type: workoutType, color };
  });

  return (
    <div className="program-view-container">
      <div className="page-header">
        <h1>Program Overview</h1>
        <p>The 4-week cycle designed for fat loss and muscle preservation.</p>
      </div>

      <div className="overview-card">
        <h3 className="overview-card-title">Weekly Schedule</h3>
        <p className="overview-card-subtitle">This 5-day workout split with 2 active recovery days repeats every week for each 4-week phase.</p>
        <div className="schedule-matrix">
          {weeklySchedule.map(item => (
            <div key={item.dayName} className="schedule-day-card">
              <div className="schedule-day-header">
                <span className="schedule-day-color-dot" style={{ backgroundColor: item.color }}></span>
                <span className="schedule-day-name">{item.dayName}</span>
              </div>
              <p className="schedule-workout-type">{item.type}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="overview-card">
        <h3 className="overview-card-title">Program Principles</h3>
        <ul className="principles-list">
          <li><strong>Progressive Overload:</strong> Each 4-week cycle is designed to be slightly more challenging than the last. Focus on increasing weights or reps.</li>
          <li><strong>Metabolic Conditioning (MetCon):</strong> High-intensity workouts are key to maximizing calorie burn and boosting metabolism for fat loss.</li>
          <li><strong>Strength Preservation:</strong> Compound lifts are included to ensure you maintain (and even build) muscle mass while in a caloric deficit.</li>
          <li><strong>Active Recovery:</strong> Light activity on rest days helps reduce muscle soreness and improves blood flow, speeding up recovery.</li>
        </ul>
      </div>
    </div>
  );
};

export default ProgramOverview;