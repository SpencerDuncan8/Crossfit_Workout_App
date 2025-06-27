// src/data/templates/strengthFocusTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

const strengthWorkoutA = {
  name: 'Workout A',
  blocks: [
    { id: generateUniqueId(), type: 'Warm-up', exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (60s)' }, // FIXED
      { id: 'cat-cow-stretch', name: 'Cat-Cow Stretch (10 reps)' }, // FIXED
      { id: 'squat', name: 'Empty Barbell Squats (2x10)' } // FIXED
    ] },
    { id: generateUniqueId(), type: 'Strength', rest: '150s', exercises: [
      { id: 'squat', name: 'Squat', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), reps: '5', load: '85%' })) },
      { id: 'bench_press', name: 'Bench Press', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), reps: '5', load: '85%' })) },
      { id: 'barbell-row', name: 'Barbell Row', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), reps: '5', load: '' })) }, // FIXED
    ]},
    { id: generateUniqueId(), type: 'Cool-down', exercises: [
      { id: 'couch-stretch', name: 'Couch Stretch (60s each side)' } // FIXED
    ] },
  ]
};

const strengthWorkoutB = {
  name: 'Workout B',
  blocks: [
    { id: generateUniqueId(), type: 'Warm-up', exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (60s)' }, // FIXED
      { id: 'band-pull-aparts', name: 'Band Pull-Aparts (2x15)' }, // FIXED
      { id: 'overhead_press', name: 'Empty Barbell OHP (2x10)' } // FIXED
    ] },
    { id: generateUniqueId(), type: 'Strength', rest: '150s', exercises: [
      { id: 'squat', name: 'Squat', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), reps: '5', load: '85%' })) },
      { id: 'overhead_press', name: 'Overhead Press', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), reps: '5', load: '85%' })) },
      { id: 'deadlift', name: 'Deadlift', sets: [{ id: generateUniqueId(), reps: '5', load: '85%' }] },
    ]},
    { id: generateUniqueId(), type: 'Cool-down', exercises: [
      { id: 'pigeon-pose', name: 'Pigeon Pose (60s each side)' } // FIXED
    ] },
  ]
};

export const strengthFocusTemplate = {
  id: 'template_strength_focus',
  name: 'Strength Focus',
  description: 'A 4-week, 3-day/week barbell program based on an A/B split. The goal is to add weight to the bar over time on the main compound lifts.',
  isTemplate: true,
  daysPerWeek: 3,
  workouts: [
    // Week 1: A, B, A
    { id: generateUniqueId(), name: 'W1D1', blocks: JSON.parse(JSON.stringify(strengthWorkoutA.blocks)) },
    { id: generateUniqueId(), name: 'W1D2', blocks: JSON.parse(JSON.stringify(strengthWorkoutB.blocks)) },
    { id: generateUniqueId(), name: 'W1D3', blocks: JSON.parse(JSON.stringify(strengthWorkoutA.blocks)) },
    // Week 2: B, A, B
    { id: generateUniqueId(), name: 'W2D1', blocks: JSON.parse(JSON.stringify(strengthWorkoutB.blocks)) },
    { id: generateUniqueId(), name: 'W2D2', blocks: JSON.parse(JSON.stringify(strengthWorkoutA.blocks)) },
    { id: generateUniqueId(), name: 'W2D3', blocks: JSON.parse(JSON.stringify(strengthWorkoutB.blocks)) },
    // Week 3: A, B, A
    { id: generateUniqueId(), name: 'W3D1', blocks: JSON.parse(JSON.stringify(strengthWorkoutA.blocks)) },
    { id: generateUniqueId(), name: 'W3D2', blocks: JSON.parse(JSON.stringify(strengthWorkoutB.blocks)) },
    { id: generateUniqueId(), name: 'W3D3', blocks: JSON.parse(JSON.stringify(strengthWorkoutA.blocks)) },
    // Week 4: B, A, B
    { id: generateUniqueId(), name: 'W4D1', blocks: JSON.parse(JSON.stringify(strengthWorkoutB.blocks)) },
    { id: generateUniqueId(), name: 'W4D2', blocks: JSON.parse(JSON.stringify(strengthWorkoutA.blocks)) },
    { id: generateUniqueId(), name: 'W4D3', blocks: JSON.parse(JSON.stringify(strengthWorkoutB.blocks)) },
  ]
};