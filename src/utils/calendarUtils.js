// src/utils/calendarUtils.js

const isSameDay = (d1, d2) => {
  if (!d1 || !d2) return false;
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
};

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

// Simplified color getter for the calendar dot
export const getWorkoutColor = () => {
    // We'll use a consistent color for any planned/completed workout
    return '#3b82f6'; // A nice blue color
};