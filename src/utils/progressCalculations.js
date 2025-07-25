// src/utils/progressCalculations.js

/**
 * Calculates the user's current workout streak based on completed workouts.
 * @param {Object} workoutSchedule - The schedule object from appState.
 * @returns {number} The number of consecutive days the user has worked out.
 */
export const calculateWorkoutStreak = (workoutSchedule) => {
  if (!workoutSchedule || Object.keys(workoutSchedule).length === 0) {
    return 0; // No workouts, no streak.
  }

  // Helper function to convert a Date to days since the Unix epoch, ignoring time and timezone.
  const dateToDays = (date) => {
    // We use UTC methods to avoid timezone issues.
    // getTime() returns milliseconds since epoch. We convert that to days.
    return Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
  };

  const completedDates = Object.keys(workoutSchedule)
    .filter(dateStr => workoutSchedule[dateStr].some(item => item.completedData))
    .map(dateStr => new Date(dateStr)) // Convert strings to Date objects (they will be UTC midnight)
    .sort((a, b) => b - a); // Sort descending, most recent first

  if (completedDates.length === 0) {
    return 0;
  }

  // Get today's date normalized to UTC midnight
  const now = new Date();
  const todayInDays = dateToDays(new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())));
  const mostRecentWorkoutInDays = dateToDays(completedDates[0]);

  // If the last workout was more than 1 day ago, the streak is broken.
  if (todayInDays - mostRecentWorkoutInDays > 1) {
    return 0;
  }
  
  let streak = 1;
  // Loop backwards from the most recent workout to check for consecutive days.
  for (let i = 0; i < completedDates.length - 1; i++) {
    const currentDay = dateToDays(completedDates[i]);
    const previousDay = dateToDays(completedDates[i + 1]);

    // If the difference is exactly 1 day, the streak continues.
    if (currentDay - previousDay === 1) {
      streak++;
    } else {
      // If there's a gap of more than one day, the streak is broken.
      break;
    }
  }

  return streak;
};