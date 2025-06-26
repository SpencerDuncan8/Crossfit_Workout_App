// src/data/exercises/index.js

import { upperBodyExercises } from './upperBody.js';
import { lowerBodyExercises } from './lowerBody.js';
import { fullBodyExercises } from './fullBody.js';
import { coreAndCardioExercises } from './coreAndCardio.js';
import { warmupExercises } from './warmup.js';
import { stretches } from './stretches.js'; // Import the new stretches

// Combine all exercise arrays into one master array.
const allExercises = [
  ...upperBodyExercises,
  ...lowerBodyExercises,
  ...fullBodyExercises,
  ...coreAndCardioExercises,
  ...warmupExercises,
  ...stretches, // Add the new stretches to the master list
];

// To ensure all exercises have a unique ID, we can do a quick check here.
const ids = new Set();
for (const exercise of allExercises) {
  if (ids.has(exercise.id)) {
    console.warn(`Duplicate exercise ID found: ${exercise.id}. Please ensure all exercise IDs are unique.`);
  }
  ids.add(exercise.id);
}

export default allExercises;