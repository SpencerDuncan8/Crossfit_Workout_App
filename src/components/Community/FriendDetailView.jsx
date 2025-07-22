// src/components/Community/FriendDetailView.jsx

import React, { useContext } from 'react';
import { AppStateContext } from '../../context/AppContext';
import { generateMonthDays } from '../../utils/calendarUtils.js';

// A simple day cell for the friend's calendar
const FriendDayCell = ({ day, scheduledItems }) => {
  let cellClass = 'day-cell';
  if (day.isBlank) return <div className={cellClass + ' blank'}></div>;
  if (day.isToday) cellClass += ' today';
  
  const isCompleted = scheduledItems.length > 0 && scheduledItems.every(item => item.completedData);
  const isPlanned = scheduledItems.length > 0 && !isCompleted;

  if (isCompleted) cellClass += ' completed';

  return (
    <div className={cellClass}>
      <span className="day-number">{day.dayNumber}</span>
      <div className="dot-container">
        {isPlanned && scheduledItems.map(item => <div key={item.scheduleId} className="workout-dot"></div>)}
      </div>
    </div>
  );
};

const FriendDetailView = ({ friendData }) => {
  const { allWorkouts } = useContext(AppStateContext);
  const currentDate = new Date(); // Always show the current month
  const monthDays = generateMonthDays(currentDate.getFullYear(), currentDate.getMonth());
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get today's date string in YYYY-MM-DD format
  const todayString = new Date().toISOString().split('T')[0];

  // Filter for upcoming workouts (today or later)
  const upcomingWorkouts = Object.entries(friendData.workoutSchedule)
    .filter(([date]) => date >= todayString)
    .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
    .flatMap(([date, schedule]) => schedule.map(item => ({...item, date})))
    .slice(0, 5); // Show up to 5 upcoming workouts

  return (
    <div className="friend-detail-view">
      <div className="friend-calendar-container">
        <h4 className="friend-section-title">This Month's Activity</h4>
        <div className="calendar-grid">
          {daysOfWeek.map(day => <div key={day} className="day-of-week-header">{day}</div>)}
          {monthDays.map(day => {
            const dateString = day.date ? day.date.toISOString().split('T')[0] : '';
            const scheduledItems = friendData.workoutSchedule[dateString] || [];
            return <FriendDayCell key={day.key} day={day} scheduledItems={scheduledItems} />;
          })}
        </div>
      </div>

      <div className="friend-upcoming-container">
        <h4 className="friend-section-title">Upcoming Workouts</h4>
        {upcomingWorkouts.length > 0 ? (
          <ul className="friend-workout-list">
            {upcomingWorkouts.map(item => {
              const workout = allWorkouts.find(w => w.id === item.workoutId);
              if (!workout) return null;
              const workoutDate = new Date(item.date).toLocaleDateString(undefined, {
                weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC'
              });
              return (
                <li key={item.scheduleId} className="friend-workout-item">
                  <span className="friend-workout-date">{workoutDate}</span>
                  <span className="friend-workout-name">{workout.name}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="search-status-text">No upcoming workouts scheduled.</p>
        )}
      </div>
    </div>
  );
};

export default FriendDetailView;