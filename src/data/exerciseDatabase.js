// src/data/exerciseDatabase.js
// This file now serves as a clean interface to the organized exercise data.

import allExercises from './exercises/index.js';

// Convert the array into an object with exercise IDs as keys for O(1) lookups.
// This is more efficient than filtering an array every time.
const exerciseDatabase = allExercises.reduce((acc, exercise) => {
  if (exercise.id) {
    acc[exercise.id] = exercise;
  }
  return acc;
}, {});

// Helper functions for exercise lookup, same as before.
export function getExerciseByName(id) {
  // The 'id' in the new template files already matches the key format.
  return exerciseDatabase[id] || null;
}

export function getExercisesByCategory(category) {
  return Object.values(exerciseDatabase).filter(
    exercise => exercise.category === category
  );
}

export function getExercisesByMuscle(muscle) {
  return Object.values(exerciseDatabase).filter(
    exercise => exercise.primaryMuscles.includes(muscle)
  );
}

export function getAllExercises() {
  return Object.values(exerciseDatabase);
}

export function getExerciseCategories() {
  const categories = new Set();
  Object.values(exerciseDatabase).forEach(exercise => {
    categories.add(exercise.category);
  });
  return Array.from(categories);
}

export function searchExercises(searchTerm) {
  const term = searchTerm.toLowerCase();
  return Object.values(exerciseDatabase).filter(exercise => 
    exercise.name.toLowerCase().includes(term) ||
    exercise.primaryMuscles.some(muscle => muscle.toLowerCase().includes(term)) ||
    exercise.category.toLowerCase().includes(term)
  );
}

// Export the database object itself, as the original file did.
export default exerciseDatabase;