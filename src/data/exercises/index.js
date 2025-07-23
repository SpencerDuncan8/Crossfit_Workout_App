
// src/data/exercises/index.js

import { upperBodyExercises } from './upperBody.js';
import { lowerBodyExercises } from './lowerBody.js';
import { fullBodyExercises } from './fullBody.js';
import { coreAndCardioExercises } from './coreAndCardio.js';
import { warmupExercises } from './warmup.js';
import { stretches } from './stretches.js';
import { kettlebellExercises } from './kettlebellExercises.js';
import { barbellLifts } from './barbellLifts.js';
import { newCrossfitExercises } from './newCrossfitExercises.js';
import { newPullupChallengeExercises } from './newPullupChallengeExercises.js';
import { newBodyweightExercises } from './newBodyweightExercises.js'; 
import { newBodyweightBuilderExercises } from './newBodyweightBuilder.js';
import { newAdvancedBuilderExercises } from './newAdvancedBuilder.js';// <-- ADD THIS IMPORT

// Combine all exercise arrays into one master array.
const allExercises = [
  ...upperBodyExercises,
  ...lowerBodyExercises,
  ...fullBodyExercises,
  ...coreAndCardioExercises,
  ...warmupExercises,
  ...stretches,
  ...kettlebellExercises,
  ...barbellLifts, 
  ...newCrossfitExercises,
  ...newPullupChallengeExercises,
  ...newBodyweightExercises,
  ...newBodyweightBuilderExercises, 
  ...newAdvancedBuilderExercises,// <-- ADD THE NEW EXERCISES HERE
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