// src/data/exercises/exerciseDatabase.js
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

// --- START OF UPDATED SECTION ---
// The previous search function has been replaced with this more robust version.

export function searchExercises(searchTerm) {
  // 1. Sanitize and split the user's search term into individual words.
  //    This allows for multi-word searches like "barbell squat".
  const searchWords = searchTerm
    .toLowerCase()
    .split(' ')
    .filter(word => word.length > 0);

  // If the search term is empty, return an empty array immediately.
  if (searchWords.length === 0) {
    return [];
  }

  return Object.values(exerciseDatabase).filter(exercise => {
    // 2. Create a comprehensive set of "tokens" (words) from the exercise's data.
    //    Using a Set is efficient as it avoids duplicate words.
    const exerciseWords = new Set();

    // Add words from the exercise name. We also remove punctuation to improve matching.
    // e.g., "(1RM)" becomes "1rm"
    exercise.name.toLowerCase().split(' ').forEach(word => {
        exerciseWords.add(word.replace(/[^a-z0-9]/g, ''))
    });

    // Add words from the category.
    exercise.category.toLowerCase().split(' ').forEach(word => {
        exerciseWords.add(word.replace(/[^a-z0-9]/g, ''))
    });

    // Add words from all primary muscles.
    exercise.primaryMuscles.forEach(muscleGroup => {
      muscleGroup.toLowerCase().split(' ').forEach(word => {
          exerciseWords.add(word.replace(/[^a-z0-9]/g, ''))
      });
    });

    // 3. The core logic: Check if EVERY search word from the user can be found
    //    in the set of words we created for the exercise.
    return searchWords.every(word => {
      // We use .some() here to check if any word in the exercise's word set
      // STARTS WITH the user's search word. This allows for partial matches
      // (e.g., typing "squ" will match the word "squat").
      return Array.from(exerciseWords).some(exWord => exWord.startsWith(word));
    });
  });
}

// --- END OF UPDATED SECTION ---


// Export the database object itself, as the original file did.
export default exerciseDatabase;