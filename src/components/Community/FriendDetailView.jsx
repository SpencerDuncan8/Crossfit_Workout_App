// src/components/Community/FriendDetailView.jsx

import React, { useState } from 'react'; // Removed useContext as it's no longer needed here
import { generateMonthDays } from '../../utils/calendarUtils.js';
import Modal from '../Common/Modal.jsx';
import WorkoutDetailView from '../Program/WorkoutDetailView.jsx';
import { CheckCircle } from 'lucide-react';

const FriendDayCell = ({ day, scheduledItems, onDayClick }) => {
  let cellClass = 'day-cell';
  if (day.isBlank) return <div className={cellClass + ' blank'}></div>;
  if (day.isToday) cellClass += ' today';
  
  const isCompleted = scheduledItems.length > 0 && scheduledItems.every(item => item.completedData);
  const isPlanned = scheduledItems.length > 0 && !isCompleted;

  if (isCompleted) cellClass += ' completed';
  
  return (
    <button className={cellClass} onClick={() => onDayClick(day, scheduledItems)}>
      <span className="day-number">{day.dayNumber}</span>
      <div className="dot-container">
        {isPlanned && scheduledItems.map(item => <div key={item.scheduleId} className="workout-dot"></div>)}
      </div>
    </button>
  );
};

const FriendDetailView = ({ friendData }) => {
  // --- THIS IS THE FIX ---
  // We create a list of workouts sourced DIRECTLY from the friend's data,
  // instead of using the logged-in user's data from context.
  const friendAllWorkouts = friendData.programs.flatMap(p => p.workouts);
  // --- END OF FIX ---

  const [viewingDate, setViewingDate] = useState(null);
  const currentDate = new Date();
  const monthDays = generateMonthDays(currentDate.getFullYear(), currentDate.getMonth());
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDayClick = (day, scheduledItems) => {
    if (day.isBlank || scheduledItems.length === 0) return;
    setViewingDate(day.date);
  };

  const closeModal = () => setViewingDate(null);

  const renderModalContent = () => {
    if (!viewingDate) return null;
    const dateString = viewingDate.toISOString().split('T')[0];
    const scheduledItems = friendData.workoutSchedule[dateString] || [];

    if (scheduledItems.length === 0) return <p>No workout found for this day.</p>;

    return (
      <div className="assign-workout-list">
        {scheduledItems.map(item => {
          // Use the friend's workout list for the lookup
          const workout = friendAllWorkouts.find(w => w.id === item.workoutId);
          if (!workout) return <p key={item.scheduleId}>Workout details are not available.</p>;
          return (
            <div key={item.scheduleId}>
              <div className="assign-workout-item" style={{ marginBottom: '12px' }}>
                <span className="assign-workout-name">
                  {item.completedData && <CheckCircle size={16} style={{ color: '#10b981' }} />}
                  {workout.name}
                </span>
              </div>
              <WorkoutDetailView workout={workout} completedData={item.completedData} />
            </div>
          );
        })}
      </div>
    );
  };
  
  const todayString = new Date().toISOString().split('T')[0];
  const upcomingWorkouts = Object.entries(friendData.workoutSchedule)
    .filter(([date]) => date >= todayString)
    .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
    .flatMap(([date, schedule]) => schedule.map(item => ({...item, date})))
    .slice(0, 5);

  return (
    <>
      <div className="friend-detail-view">
        <div className="friend-calendar-container">
          <h4 className="friend-section-title">This Month's Activity</h4>
          <div className="calendar-grid">
            {daysOfWeek.map(day => <div key={day} className="day-of-week-header">{day}</div>)}
            {monthDays.map(day => {
              const dateString = day.date ? day.date.toISOString().split('T')[0] : '';
              const scheduledItems = friendData.workoutSchedule[dateString] || [];
              return (
                <FriendDayCell 
                  key={day.key} 
                  day={day} 
                  scheduledItems={scheduledItems} 
                  onDayClick={handleDayClick} 
                />
              );
            })}
          </div>
        </div>

        <div className="friend-upcoming-container">
          <h4 className="friend-section-title">Upcoming Workouts</h4>
          {upcomingWorkouts.length > 0 ? (
            <ul className="friend-workout-list">
              {upcomingWorkouts.map(item => {
                // Use the friend's workout list for the lookup here too
                const workout = friendAllWorkouts.find(w => w.id === item.workoutId);
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

      <Modal 
        isOpen={!!viewingDate} 
        onClose={closeModal}
        title={viewingDate ? new Date(viewingDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' }) : ''}
      >
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default FriendDetailView;