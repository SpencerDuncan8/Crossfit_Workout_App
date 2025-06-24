// src/data/templates/kettlebellKrusherTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

const kettlebellWorkoutA = {
  name: 'Squat & Press',
  blocks: [
    { id: generateUniqueId(), type: 'Warm-up', exercises: [{name: 'Kettlebell Halos (5 each way)'}, {name: 'Light Goblet Squats (10 reps)'}] },
    { id: generateUniqueId(), type: 'Strength', rest: '90s', exercises: [
        { id: 'goblet_squat', name: 'Goblet Squats', sets: [{id: generateUniqueId(), reps: '5'},{id: generateUniqueId(), reps: '5'},{id: generateUniqueId(), reps: '5'},{id: generateUniqueId(), reps: '5'},{id: generateUniqueId(), reps: '5'}] },
        { id: generateUniqueId(), name: 'Single Arm Kettlebell Press', sets: [{id: generateUniqueId(), reps: '8'},{id: generateUniqueId(), reps: '8'},{id: generateUniqueId(), reps: '8'}] },
    ]},
    { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 8, exercises: [
        { id: 'kettlebell_swing', name: 'Kettlebell Swings', reps: '15' }, { id: 'burpee', name: 'Burpees', reps: '5' }
    ]},
    { id: generateUniqueId(), type: 'Cool-down', exercises: [{name: 'Pigeon Pose (60s each side)'}] },
  ]
};

const kettlebellWorkoutB = {
  name: 'Hinge & Pull',
  blocks: [
    { id: generateUniqueId(), type: 'Warm-up', exercises: [{name: 'Kettlebell Halos (5 each way)'}, {name: 'Kettlebell Good Mornings (10 reps)'}] },
    { id: generateUniqueId(), type: 'Strength', rest: '60s', exercises: [
        { id: 'kettlebell_swing', name: 'Kettlebell Swings (Power)', sets: Array.from({ length: 10 }, () => ({ id: generateUniqueId(), reps: '10' }))},
        { id: generateUniqueId(), name: 'Bent Over Kettlebell Rows', sets: [{id: generateUniqueId(), reps: '12'},{id: generateUniqueId(), reps: '12'},{id: generateUniqueId(), reps: '12'},{id: generateUniqueId(), reps: '12'}] },
    ]},
    { 
      id: generateUniqueId(), 
      type: 'Accessory / Carry', 
      exercises: [
        { id: generateUniqueId(), name: 'Farmer\'s Carry', sets: '3', weight: '', value: '50', unit: 'm' },
      ] 
    },
    { id: generateUniqueId(), type: 'Cool-down', exercises: [{name: 'Hamstring Stretch (60s each side)'}] },
  ]
};

const kettlebellWorkoutC = {
  name: 'Total Body',
  blocks: [
    { id: generateUniqueId(), type: 'Warm-up', exercises: [{name: 'Kettlebell Halos (5 each way)'}, {name: 'Light Kettlebell Windmills (5 each side)'}] },
    { id: generateUniqueId(), type: 'Strength', rest: '90s', exercises: [
      { id: generateUniqueId(), name: 'Turkish Get-Up (or Half Get-Up)', sets: [{id: generateUniqueId(), reps: '3 (L)'},{id: generateUniqueId(), reps: '3 (R)'},{id: generateUniqueId(), reps: '2 (L)'},{id: generateUniqueId(), reps: '2 (R)'},{id: generateUniqueId(), reps: '1 (L)'},{id: generateUniqueId(), reps: '1 (R)'}] },
    ]},
    { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5, exercises: [
      { id: generateUniqueId(), name: 'Single Kettlebell Clean & Jerk (Right)', reps: '5'},
      { id: generateUniqueId(), name: 'Single Kettlebell Clean & Jerk (Left)', reps: '5'},
      { id: 'situp', name: 'Sit-ups', reps: '20'}
    ]},
    { id: generateUniqueId(), type: 'Cool-down', exercises: [{name: 'Childs Pose (90s)'}] },
  ]
};

export const kettlebellKrusherTemplate = {
  id: 'template_kettlebell_krusher',
  name: 'Kettlebell Krusher',
  description: 'A 3-week, 3-day/week program using one or two kettlebells. Build power, stability, and raw strength with these classic full-body workouts.',
  isTemplate: true,
  daysPerWeek: 3,
  workouts: [
      // Week 1
      { id: generateUniqueId(), name: 'W1D1: Squat & Press', blocks: JSON.parse(JSON.stringify(kettlebellWorkoutA.blocks)) },
      { id: generateUniqueId(), name: 'W1D2: Hinge & Pull', blocks: JSON.parse(JSON.stringify(kettlebellWorkoutB.blocks)) },
      { id: generateUniqueId(), name: 'W1D3: Total Body', blocks: JSON.parse(JSON.stringify(kettlebellWorkoutC.blocks)) },
      // Week 2
      { id: generateUniqueId(), name: 'W2D1: Squat & Press', blocks: JSON.parse(JSON.stringify(kettlebellWorkoutA.blocks)) },
      { id: generateUniqueId(), name: 'W2D2: Hinge & Pull', blocks: JSON.parse(JSON.stringify(kettlebellWorkoutB.blocks)) },
      { id: generateUniqueId(), name: 'W2D3: Total Body', blocks: JSON.parse(JSON.stringify(kettlebellWorkoutC.blocks)) },
      // Week 3
      { id: generateUniqueId(), name: 'W3D1: Squat & Press', blocks: JSON.parse(JSON.stringify(kettlebellWorkoutA.blocks)) },
      { id: generateUniqueId(), name: 'W3D2: Hinge & Pull', blocks: JSON.parse(JSON.stringify(kettlebellWorkoutB.blocks)) },
      { id: generateUniqueId(), name: 'W3D3: Total Body', blocks: JSON.parse(JSON.stringify(kettlebellWorkoutC.blocks)) },
  ]
};