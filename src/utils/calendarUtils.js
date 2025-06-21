// src/utils/calendarUtils.js

import { getWorkoutType } from '../data/workoutProgram.js';

export const generateMonthDays = (year, month) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0=Sun, 1=Mon, ...
  
  const days = [];
  
  // Add blank days for the start of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push({ key: `blank-start-${i}`, isBlank: true });
  }
  
  // Add actual days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      key: `${year}-${month}-${day}`,
      dayNumber: day,
      isToday: isSameDay(new Date(), new Date(year, month, day)),
      date: new Date(year, month, day),
    });
  }
  
  // Add blank days for the end of the month
  const lastDayOfWeek = new Date(year, month, daysInMonth).getDay();
  for (let i = lastDayOfWeek; i < 6; i++) {
    days.push({ key: `blank-end-${i}`, isBlank: true });
  }
  
  return days;
};

export const isSameDay = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const getDayInfo = (day, programStartDate) => {
  if (day.isBlank) return { isBlank: true };

  const dayDiff = Math.floor((day.date - programStartDate) / (1000 * 60 * 60 * 24));
  const programDay = dayDiff + 1;

  if (programDay < 1 || programDay > 60) {
    return { isFuture: true, dayNumber: day.dayNumber };
  }

  const workoutType = getWorkoutType(programDay);

  return {
    dayNumber: day.dayNumber,
    programDay: programDay,
    workoutType: workoutType,
    isFuture: false,
  };
};

export const getWorkoutColor = (workoutType) => {
  if (!workoutType) return 'transparent';
  if (workoutType.includes('Upper Body')) return '#3b82f6'; // Blue
  if (workoutType.includes('Lower Body')) return '#fb923c'; // Orange
  if (workoutType.includes('MetCon')) return '#10b981'; // Green
  if (workoutType.includes('Active Recovery')) return 'var(--text-tertiary)'; // Light Gray
  return 'transparent';
};