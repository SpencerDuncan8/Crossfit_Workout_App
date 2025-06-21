// src/components/Calendar/WorkoutCalendar.jsx

import { getWorkoutType } from '../../data/workoutProgram.js';

/**
 * Checks if two Date objects are the same day (ignores time).
 * @param {Date} d1 - First date.
 * @param {Date} d2 - Second date.
 * @returns {boolean} - True if they are the same day.
 */
const isSameDay = (d1, d2) => {
  if (!d1 || !d2) return false;
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
};

/**
 * Generates an array of day objects for a calendar month.
 * @param {number} year - The full year.
 * @param {number} month - The month (0-11).
 * @returns {Array<Object>} - Array of day objects.
 */
export const generateMonthDays = (year, month) => {
  const days = [];
  const today = new Date();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();

  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push({ key: `blank-start-${i}`, isBlank: true });
  }

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const date = new Date(year, month, i);
    days.push({
      key: date.toISOString(),
      date,
      dayNumber: i,
      isCurrentMonth: true,
      isToday: isSameDay(today, date),
    });
  }
  
  while (days.length % 7 !== 0) {
      days.push({ key: `blank-end-${days.length}`, isBlank: true });
  }

  return days;
};

/**
 * Calculates the difference in days between two dates.
 * @param {Date} date1
 * @param {Date} date2
 * @returns {number}
 */
const diffDays = (date1, date2) => {
    const diffTime = Math.abs(date2 - date1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Gets detailed information for a specific calendar day relative to the program.
 * @param {Object} day - The day object from generateMonthDays.
 * @param {Date} programStartDate - The start date of the 60-day program.
 * @returns {Object} - Detailed information about the day.
 */
export const getDayInfo = (day, programStartDate) => {
  if (day.isBlank) {
    return { isBlank: true };
  }
  
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today to the start of the day
  const programEndDate = new Date(programStartDate);
  programEndDate.setDate(programStartDate.getDate() + 59);

  let programDay = null;
  let workoutType = 'Rest';

  if (day.date >= programStartDate && day.date <= programEndDate) {
    programDay = diffDays(programStartDate, day.date) + 1;
    workoutType = getWorkoutType(programDay);
  }

  return {
    isBlank: false,
    dayNumber: day.dayNumber,
    isFuture: day.date > today,
    isToday: day.isToday,
    programDay,
    workoutType,
  };
};

/**
 * Maps a workout type to a specific color for the UI.
 * @param {string} workoutType - The type of workout.
 * @returns {string} - A CSS color value.
 */
export const getWorkoutColor = (workoutType) => {
  if (!workoutType) return 'transparent';
  switch (workoutType.toLowerCase()) {
    case 'push': return '#3b82f6';
    case 'pull': return '#10b981';
    case 'legs & core': return '#ef4444';
    case 'full body strength': return '#8b5cf6';
    case 'metcon': return '#fb923c';
    case 'rest':
    case 'active recovery': return 'transparent';
    default: return 'var(--text-tertiary)';
  }
};