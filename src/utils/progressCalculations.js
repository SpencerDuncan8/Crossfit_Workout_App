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

  // First, get all unique dates where at least one workout was completed.
  const completedDates = Object.keys(workoutSchedule).filter(dateStr => 
    workoutSchedule[dateStr].some(item => item.completedData)
  );

  if (completedDates.length === 0) {
    return 0; // No completed workouts, no streak.
  }

  // Sort the dates to make sure they are in order, most recent first.
  const sortedDates = completedDates.map(d => new Date(d)).sort((a, b) => b - a);

  // Get today's date (at the very start of the day).
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Create a NEW Date object for the most recent workout to avoid mutating the original array.
  const mostRecentWorkout = new Date(sortedDates[0]);
  mostRecentWorkout.setHours(0, 0, 0, 0);

  // Check if the most recent workout was today or yesterday. If not, the streak is broken.
  const diffTime = today.getTime() - mostRecentWorkout.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 1) {
    return 0; // The streak ended before today.
  }

  // Now, let's count the streak!
  let streak = 1;
  for (let i = 0; i < sortedDates.length - 1; i++) {
    // Create NEW Date objects for comparison inside the loop to avoid mutation.
    const current = new Date(sortedDates[i]);
    current.setHours(0, 0, 0, 0);
    const previous = new Date(sortedDates[i + 1]);
    previous.setHours(0, 0, 0, 0);

    // Calculate the difference in days between the current and previous workout.
    const dayDifference = (current.getTime() - previous.getTime()) / (1000 * 3600 * 24);

    // If they are exactly one day apart, the streak continues.
    if (dayDifference === 1) {
      streak++;
    } else {
      // If there's a gap, the streak is broken, so we stop counting.
      break;
    }
  }

  return streak;
};