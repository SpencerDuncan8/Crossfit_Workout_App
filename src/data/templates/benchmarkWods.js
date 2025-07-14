// src/data/templates/benchmarkWods.js

import { generateUniqueId } from '../../utils/idUtils.js';

// Define each benchmark workout as a constant for clarity and reusability.
const fran = {
  id: 'benchmark_fran',
  name: 'Fran',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: RFT',
      rounds: 1, 
      exercises: [
        { id: 'thrusters', name: 'Thrusters (95/65 lbs)', reps: '21' },
        { id: 'pullups', name: 'Pull-ups', reps: '21' },
        { id: 'thrusters', name: 'Thrusters (95/65 lbs)', reps: '15' },
        { id: 'pullups', name: 'Pull-ups', reps: '15' },
        { id: 'thrusters', name: 'Thrusters (95/65 lbs)', reps: '9' },
        { id: 'pullups', name: 'Pull-ups', reps: '9' },
      ],
    },
  ],
};

const cindy = {
  id: 'benchmark_cindy',
  name: 'Cindy',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: AMRAP',
      duration: 20, 
      exercises: [
        { id: 'pullups', name: 'Pull-ups', reps: '5' },
        { id: 'push-ups', name: 'Push-ups', reps: '10' },
        { id: 'air-squats', name: 'Air Squats', reps: '15' },
      ],
    },
  ],
};

const diane = {
  id: 'benchmark_diane',
  name: 'Diane',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: RFT',
      rounds: 1, 
      exercises: [
        { id: 'deadlift', name: 'Deadlifts (225/155 lbs)', reps: '21' },
        { id: 'handstand-push-ups', name: 'Handstand Push-ups', reps: '21' },
        { id: 'deadlift', name: 'Deadlifts (225/155 lbs)', reps: '15' },
        { id: 'handstand-push-ups', name: 'Handstand Push-ups', reps: '15' },
        { id: 'deadlift', name: 'Deadlifts (225/155 lbs)', reps: '9' },
        { id: 'handstand-push-ups', name: 'Handstand Push-ups', reps: '9' },
      ],
    },
  ],
};

// --- NEW WORKOUT DEFINITIONS ---
const grace = {
  id: 'benchmark_grace',
  name: 'Grace',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: Chipper', // Chipper is best for single-movement "for time" workouts.
      exercises: [
        { id: 'barbell-clean-and-jerk', name: 'Clean and Jerks (135/95 lbs)', reps: '30' },
      ],
    },
  ],
};

const isabel = {
  id: 'benchmark_isabel',
  name: 'Isabel',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: Chipper',
      exercises: [
        { id: 'barbell-snatch', name: 'Snatches (135/95 lbs)', reps: '30' },
      ],
    },
  ],
};

const elizabeth = {
  id: 'benchmark_elizabeth',
  name: 'Elizabeth',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: RFT',
      rounds: 1,
      exercises: [
        { id: 'barbell-clean-and-jerk', name: 'Cleans (135/95 lbs)', reps: '21' },
        { id: 'ring-dips', name: 'Ring Dips', reps: '21' },
        { id: 'barbell-clean-and-jerk', name: 'Cleans (135/95 lbs)', reps: '15' },
        { id: 'ring-dips', name: 'Ring Dips', reps: '15' },
        { id: 'barbell-clean-and-jerk', name: 'Cleans (135/95 lbs)', reps: '9' },
        { id: 'ring-dips', name: 'Ring Dips', reps: '9' },
      ],
    },
  ],
};
// --- END OF NEW WORKOUTS ---


// --- Main Template Object ---
export const benchmarkWodsTemplate = {
  id: 'template_benchmarks',
  name: 'Classic Benchmark "Girl" WODs',
  description: 'Test your fitness against these classic "Girl" benchmark workouts. Log your time or score to track your progress over time.',
  isTemplate: true,
  meta: {
    type: 'Benchmarks',
    level: 'Intermediate',
    goal: 'General Fitness',
    equipment: 'Full Gym'
  },
  // --- ADD NEW WORKOUTS TO THE ARRAY ---
  workouts: [
    fran,
    cindy,
    diane,
    grace,
    isabel,
    elizabeth,
  ],
};