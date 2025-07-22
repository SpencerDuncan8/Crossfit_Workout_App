// src/components/Community/FriendDetailView.jsx

import React, { useState } from 'react';
import { generateMonthDays, getWorkoutColor } from '../../utils/calendarUtils.js';
import Modal from '../Common/Modal.jsx';
import WorkoutDetailView from '../Program/WorkoutDetailView.jsx';
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

// UPDATED: DayCell now uses getWorkoutColor to show dots correctly
const FriendDayCell = ({ day, scheduledItems, onDayClick }) => {
  let cellClass = 'day-cell';
  if (day.isBlank) return <div className={cellClass + ' blank'}></div>;
  if (day.isToday) cellClass += ' today';
  
  const isCompleted = scheduledItems.length > 0 && scheduledItems.every(item => item.completedData);
  const plannedWorkouts = scheduledItems.filter(item => !item.completedData);

  if (isCompleted) cellClass += ' completed';
  
  const workoutColor = getWorkoutColor();

  return (
    <button 
      className={cellClass} 
      onClick={() => onDayClick(day, scheduledItems)}
      style={{'--workout-color': workoutColor}} // This passes the color for the dot/background
    >
      <span className="day-number">{day.dayNumber}</span>
      <div className="dot-container">
        {plannedWorkouts.map(item => <div key={item.scheduleId} className="workout-dot"></div>)}
      </div>
    </button>
  );
};

const FriendDetailView = ({ friendData }) => {
  const friendAllWorkouts = friendData.programs.flatMap(p => p.workouts);
  const [viewingDate, setViewingDate] = useState(null);
  const currentDate = new Date();
  const monthDays = generateMonthDays(currentDate.getFullYear(), currentDate.getMonth());
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleDayClick = (day, scheduledItems) => {
    if (day.isBlank || scheduledItems.length === 0) return;
    setViewingDate(day.date);
  };

  const closeModal = () => setViewingDate(null);

  // --- NEW: Functions to handle day navigation in the modal ---
  const handlePrevDayInModal = () => {
    setViewingDate(prev => {
      if (!prev) return null;
      const newDate = new Date(prev);
      newDate.setUTCDate(newDate.getUTCDate() - 1);
      return newDate;
    });
  };

  const handleNextDayInModal = () => {
    setViewingDate(prev => {
      if (!prev) return null;
      const newDate = new Date(prev);
      newDate.setUTCDate(newDate.getUTCDate() + 1);
      return newDate;
    });
  };

  const renderModalContent = () => {
    if (!viewingDate) return null;
    const dateString = viewingDate.toISOString().split('T')[0];
    const scheduledItems = friendData.workoutSchedule[dateString] || [];

    if (scheduledItems.length === 0) return <p className="search-status-text">No workout scheduled for this day.</p>;

    return (
      <div className="assign-workout-list">
        {scheduledItems.map(item => {
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

  // --- NEW: A function to create the navigable modal title ---
  const getModalTitleWithNav = () => {
    if (!viewingDate) return '';
    const d = new Date(viewingDate);
    const formattedDate = d.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' });
    
    return (
        <div className="modal-title-nav">
            <button className="day-nav-btn" onClick={handlePrevDayInModal}><ChevronLeft size={24} /></button>
            <div className="modal-title-text-container">
                <h2>{formattedDate}</h2>
            </div>
            <button className="day-nav-btn" onClick={handleNextDayInModal}><ChevronRight size={24} /></button>
        </div>
    );
  }
  
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
              return ( <FriendDayCell key={day.key} day={day} scheduledItems={scheduledItems} onDayClick={handleDayClick} /> );
            })}
          </div>
        </div>

        <div className="friend-upcoming-container">
          <h4 className="friend-section-title">Upcoming Workouts</h4>
          {upcomingWorkouts.length > 0 ? (
            <ul className="friend-workout-list">
              {upcomingWorkouts.map(item => {
                const workout = friendAllWorkouts.find(w => w.id === item.workoutId);
                if (!workout) return null;
                const workoutDate = new Date(item.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' });
                return ( <li key={item.scheduleId} className="friend-workout-item"> <span className="friend-workout-date">{workoutDate}</span> <span className="friend-workout-name">{workout.name}</span> </li> );
              })}
            </ul>
          ) : ( <p className="search-status-text">No upcoming workouts scheduled.</p> )}
        </div>
      </div>

      <Modal 
        isOpen={!!viewingDate} 
        onClose={closeModal}
        title={getModalTitleWithNav()} // Use the new title function
      >
        {renderModalContent()}
      </Modal>
    </>
  );
};

export default FriendDetailView;