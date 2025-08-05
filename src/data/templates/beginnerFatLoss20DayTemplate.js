// src/data/templates/beginnerFatLoss20DayTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

export const beginnerFatLoss20DayTemplate = {
  id: 'template_beginner_fat_loss_20_day',
  name: '20-Day Beginner Fat Loss',
  description: 'A 20-day program designed for beginners with home gym equipment. This plan focuses on full-body strength and conditioning to build a solid foundation, burn calories, and kickstart your weight loss journey.',
  isTemplate: true,
  daysPerWeek: 5,
  meta: {
    type: 'Structured Program',
    level: 'Beginner',
    goal: 'Lose Weight',
    equipment: 'Full Gym'
  },
  workouts: [
    // --- WEEK 1 ---
    { // Day 1
      id: generateUniqueId(),
      name: 'W1D1: Full Body Foundation A',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '5 mins Bike (easy pace)' }, { id: 'arm-circles', name: '15 Arm Circles (each way)' }, { id: 'leg-swings', name: '10 Leg Swings (each leg, each way)' } ] },
        { 
          id: generateUniqueId(), 
          type: 'Strength', 
          note: 'Focus on good form over heavy weight.',
          rest: '90s',
          exercises: [
            { id: 'dumbbell-goblet-squats', name: 'Dumbbell Goblet Squats', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '10', load: '' })) },
            { id: 'dumbbell-bench-press', name: 'Dumbbell Bench Press', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '10', load: '' })) },
            { id: 'lat-pulldowns', name: 'Lat Pulldowns', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '12', load: '' })) },
          ]
        },
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 8, exercises: [
            { id: 'kb-swing', name: 'Kettlebell Swings (20 lb)', reps: '10' },
            { id: 'push-ups', name: 'Push-ups (on knees or incline)', reps: '8' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'quad-stretch', name: 'Quad Stretch (45s each side)' }, { id: 'doorway-chest-stretch', name: 'Doorway Chest Stretch (45s)' }, { id: 'lat-stretch', name: 'Lat Stretch (45s each side)' } ]},
      ],
    },
    { // Day 2
      id: generateUniqueId(),
      name: 'W1D2: Full Body Foundation B',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'jumping-jack', name: '60s Jumping Jacks' }, { id: 'bodyweight-good-mornings', name: '15 Good Mornings' }, { id: 'band-pull-aparts', name: '15 Band Pull-Aparts' } ] },
        { 
          id: generateUniqueId(), 
          type: 'Strength', 
          note: 'Focus on form, not heavy weight.', 
          rest: '90s',
          exercises: [
            { id: 'deadlift', name: 'Barbell Deadlift', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '8', load: '' })), note: 'Start with an empty barbell to learn the movement.' },
            { id: 'dumbbell-shoulder-press', name: 'Seated Dumbbell Shoulder Press', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '10', load: '' })) },
            { id: 't-bar-rows', name: 'T-Bar Rows', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '10', load: '' })) },
          ]
        },
        { id: generateUniqueId(), type: 'Accessory / Carry', exercises: [
            { id: 'jump-rope', name: 'Jump Rope Practice', sets: '3', weight: '', value: '60', unit: 'seconds' },
            { id: 'sit-up', name: 'Sit-ups', sets: '3', weight: '', value: '15', unit: 'reps' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'hamstring-stretch', name: 'Hamstring Stretch (60s)' }, { id: 'childs-pose', name: "Child's Pose (60s)" }, { id: 'cross-body-shoulder-stretch', name: 'Shoulder Stretch (45s each)' } ]},
      ],
    },
    { // Day 3
      id: generateUniqueId(),
      name: 'W1D3: Active Recovery',
      blocks: [
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'stationary-bike', name: '30-40 mins Light Biking or Incline Walk', duration: '30' } ], note: 'Maintain a pace where you can still hold a conversation.' },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: '10 mins of full-body stretching.' } ] },
      ],
    },
    { // Day 4
      id: generateUniqueId(),
      name: 'W1D4: Full Body Foundation C',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'air-squats', name: '20 Air Squats' }, { id: 'inchworms', name: '8 Inchworms' }, { id: 'scapular-pulls', name: '10 Scapular Pulls' } ] },
        { 
          id: generateUniqueId(), 
          type: 'Strength', 
          rest: '60s',
          exercises: [
            { id: 'dumbbell-walking-lunges', name: 'Dumbbell Walking Lunges', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '20', load: '' })), note: '10 steps per leg' },
            { id: 'dip-bar-dips', name: 'Dip Bar Dips (use band for assist if needed)', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: 'Max', load: '' })) },
            { id: 'low-pulley-rows', name: 'Low Pulley Rows', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '12', load: '' })) },
          ]
        },
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 3, exercises: [
            { id: 'running', name: '200m Run', reps: '1' },
            { id: 'burpees', name: 'Burpees (no push-up)', reps: '10' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'pigeon-pose', name: 'Pigeon Pose (60s each)' }, { id: 'tricep-stretch', name: 'Tricep Stretch (45s each)' } ]},
      ],
    },
    { // Day 5
      id: generateUniqueId(),
      name: 'W1D5: Conditioning Day',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'jumping-jack', name: '100 Jumping Jacks' }, { id: 'kb-halo', name: '10 Kettlebell Halos (each way)' } ] },
        { id: generateUniqueId(), type: 'Conditioning: Chipper', note: 'For Time. Complete all reps of one exercise before moving to the next.', exercises: [
            { id: 'stationary-bike', name: 'Calorie Bike', reps: '50' },
            { id: 'dumbbell-goblet-squats', name: 'Goblet Squats', reps: '40' },
            { id: 'sit-up', name: 'Sit-ups', reps: '30' },
            { id: 'push-ups', name: 'Push-ups (on knees)', reps: '20' },
            { id: 'burpees', name: 'Burpees', reps: '10' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'childs-pose', name: "Child's Pose (90s)" }, { id: 'quad-stretch', name: 'Quad Stretch (60s each)' } ]},
      ],
    },
    // --- WEEK 2 ---
    { // Day 6
      id: generateUniqueId(),
      name: 'W2D1: Full Body Strength A+',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '5 mins Bike (easy pace)' }, { id: 'arm-circles', name: '15 Arm Circles (each way)' }, { id: 'leg-swings', name: '10 Leg Swings (each leg, each way)' } ] },
        { 
          id: generateUniqueId(), 
          type: 'Strength', 
          note: 'Aim to add a small amount of weight from last week.', 
          rest: '90s',
          exercises: [
            { id: 'squat', name: 'Barbell Back Squat', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '8', load: '' })) },
            { id: 'dumbbell-incline-press', name: 'Dumbbell Incline Press', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '10', load: '' })) },
            { id: 'pullups', name: 'Pull-ups (banded or negatives)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '5', load: '' })) },
        ]},
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 10, exercises: [
            { id: 'dumbbell-snatches', name: 'Dumbbell Snatches (alternating)', reps: '8' },
            { id: 'kb-swing', name: 'Kettlebell Swings', reps: '12' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'quad-stretch', name: 'Quad Stretch (45s each)' }, { id: 'doorway-chest-stretch', name: 'Chest Stretch (45s)' } ]},
      ],
    },
    { // Day 7
      id: generateUniqueId(),
      name: 'W2D2: Full Body Strength B+',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'jumping-jack', name: '60s Jumping Jacks' }, { id: 'bodyweight-good-mornings', name: '15 Good Mornings' }, { id: 'band-pull-aparts', name: '15 Band Pull-Aparts' } ] },
        { 
          id: generateUniqueId(), 
          type: 'Strength', 
          note: 'Rest 60-90s.', 
          rest: '90s',
          exercises: [
            { id: 'dumbbell-romanian-deadlifts', name: 'Barbell Romanian Deadlifts', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '10', load: '' })) },
            { id: 'overhead_press', name: 'Barbell Overhead Press', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '8', load: '' })) },
            { id: 't-bar-rows', name: 'Landmine Rows', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '10', load: '' })), note: 'per arm' },
        ]},
        { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 30, rest: 30, rounds: 5, exercises: [ { id: 'stationary-bike', name: 'Bike Sprints (high resistance)' } ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'hamstring-stretch', name: 'Hamstring Stretch (60s)' }, { id: 'childs-pose', name: "Child's Pose (60s)" } ]},
      ],
    },
    { // Day 8
      id: generateUniqueId(),
      name: 'W2D3: Active Recovery',
      blocks: [
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'running', name: '30 mins Light Jogging or Biking', duration: '30' } ] },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: '10 mins of mobility work for hips and shoulders.' } ] },
      ],
    },
    { // Day 9
      id: generateUniqueId(),
      name: 'W2D4: Full Body Strength C+',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'air-squats', name: '20 Air Squats' }, { id: 'inchworms', name: '8 Inchworms' }, { id: 'scapular-pulls', name: '10 Scapular Pulls' } ] },
        { 
          id: generateUniqueId(), 
          type: 'Strength', 
          rest: '60s',
          exercises: [
            { id: 'dumbbell-step-ups', name: 'Dumbbell Step-ups', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '10', load: '' })), note: 'per leg' },
            { id: 'dip-bar-dips', name: 'Dip Bar Dips', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: 'Max', load: '' })), note: 'Use less assistance than last week.' },
            { id: 'single-arm-lat-pulldowns', name: 'Single-Arm Lat Pulldowns', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '12', load: '' })), note: 'per arm' },
        ]},
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 4, exercises: [
            { id: 'running', name: '200m Run', reps: '1' },
            { id: 'burpees', name: 'Burpees (no push-up)', reps: '12' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'pigeon-pose', name: 'Pigeon Pose (60s each)' }, { id: 'tricep-stretch', name: 'Tricep Stretch (45s each)' } ]},
      ],
    },
    { // Day 10
      id: generateUniqueId(),
      name: 'W2D5: Conditioning EMOM',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'jump-rope', name: '2 mins Jump Rope' }, { id: 'kb-swing', name: '20 Kettlebell Swings' }, { id: 'burpees', name: '5 Burpees' } ] },
        { id: generateUniqueId(), type: 'Conditioning: EMOM', note: 'Every Minute on the Minute for 12 minutes. Alternate between the two tasks.', minutes: Array.from({ length: 6 }, () => [
            { id: generateUniqueId(), task: '15 Kettlebell Swings' },
            { id: generateUniqueId(), task: '8 Burpees' },
        ]).flat()},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'childs-pose', name: "Child's Pose (90s)" }, { id: 'hamstring-stretch', name: 'Hamstring Stretch (60s)' } ]},
      ],
    },
    // --- WEEK 3 ---
    { // Day 11
      id: generateUniqueId(),
      name: 'W3D1: Strength & Power',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '5 mins Bike' }, { id: 'air-squats', name: '20 Air Squats' } ] },
        { 
          id: generateUniqueId(), 
          type: 'Strength', 
          note: 'Perform a set of Squats, then immediately a set of Push Press. Rest 90s. Repeat for 4 rounds.', 
          rest: '90s',
          exercises: [
            { id: 'squat', name: 'Barbell Back Squat', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '8', load: '' })) },
            { id: 'dumbbell-push-press', name: 'Barbell Push Press', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '8', load: '' })) },
        ]},
        { id: generateUniqueId(), type: 'Accessory / Carry', exercises: [ { id: 'kb-farmers-carry', name: "Farmer's Carry", sets: '3', weight: '', value: '100', unit: 'meters' } ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'quad-stretch', name: 'Quad Stretch (60s each)' }, { id: 'cross-body-shoulder-stretch', name: 'Shoulder Stretch (60s each)' } ]},
      ],
    },
    { // Day 12
      id: generateUniqueId(),
      name: 'W3D2: Heavier Lifting',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'jumping-jack', name: '60s Jumping Jacks' }, { id: 'bodyweight-good-mornings', name: '15 Good Mornings' }, { id: 'band-pull-aparts', name: '15 Band Pull-Aparts' } ] },
        { 
          id: generateUniqueId(), 
          type: 'Strength', 
          note: 'Work up to a challenging set of 5 reps.', 
          rest: '180s',
          exercises: [
            { id: 'deadlift', name: 'Barbell Deadlift', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), reps: '5', load: '' })) },
        ]},
        { id: generateUniqueId(), type: 'Accessory / Carry', note: '3 rounds for quality.', exercises: [
          { id: 'pullups', name: 'Pull-ups (or negatives)', sets: '3', weight: '', value: 'Max', unit: 'reps' },
          { id: 'plank', name: 'Plank', sets: '3', weight: '', value: '60', unit: 'seconds' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'pigeon-pose', name: 'Pigeon Pose (60s each)' }, { id: 'lat-stretch', name: 'Lat Stretch (60s each)' } ]},
      ],
    },
    { // Day 13
      id: generateUniqueId(),
      name: 'W3D3: Active Recovery',
      blocks: [
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'stationary-bike', name: '30-40 mins Light Biking or Incline Walk', duration: '30' } ] },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: '10 mins of full-body stretching.' } ] },
      ],
    },
    { // Day 14
      id: generateUniqueId(),
      name: 'W3D4: Longer Metcon',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'jump-rope', name: '2 mins Jump Rope' }, { id: 'air-squats', name: '30 Air Squats' } ] },
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 15, exercises: [
            { id: 'running', name: '200m Run', reps: '1' },
            { id: 'kb-swing', name: 'Kettlebell Swings', reps: '15' },
            { id: 'push-ups', name: 'Push-ups', reps: '10' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'childs-pose', name: "Child's Pose (90s)" }, { id: 'hamstring-stretch', name: 'Hamstring Stretch (60s)' } ]},
      ],
    },
    { // Day 15
      id: generateUniqueId(),
      name: 'W3D5: Machine & Isolation',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'arm-circles', name: '15 Arm Circles (each way)' }, { id: 'band-pull-aparts', name: '20 Band Pull-Aparts' } ] },
        { 
          id: generateUniqueId(), 
          type: 'Strength', 
          note: 'Focus on slow, controlled movements.', 
          rest: '60s',
          exercises: [
            { id: 'tricep-rope-pushdowns', name: 'Tricep Rope Pushdowns', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '15', load: '' })) },
            { id: 'pulley-bicep-curls', name: 'Pulley Bicep Curls', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '15', load: '' })) },
            { id: 'dumbbell-lateral-raises', name: 'Dumbbell Lateral Raises', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '15', load: '' })) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'bicep-stretch', name: 'Bicep Stretch (45s each)' }, { id: 'tricep-stretch', name: 'Tricep Stretch (45s each)' } ]},
      ],
    },
    // --- WEEK 4 ---
    { // Day 16
      id: generateUniqueId(),
      name: 'W4D1: Active Recovery',
      blocks: [
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'running', name: '30 mins Light Jogging or Biking', duration: '30' } ] },
      ],
    },
    { // Day 17
      id: generateUniqueId(),
      name: 'W4D2: Benchmark Test',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'air-squats', name: '20 Air Squats' }, { id: 'scapular-pulls', name: '10 Scapular Pulls' } ] },
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 3, exercises: [
              { id: 'dumbbell-goblet-squats', name: 'Goblet Squats', reps: '21-15-9' },
              { id: 'lat-pulldowns', name: 'Lat Pulldowns', reps: '21-15-9' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'pigeon-pose', name: 'Pigeon Pose (60s each)' }, { id: 'lat-stretch', name: 'Lat Stretch (60s each)' } ]},
      ],
    },
    { // Day 18
      id: generateUniqueId(),
      name: 'W4D3: Final Chipper',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'jumping-jack', name: '100 Jumping Jacks' }, { id: 'deadlift', name: '10 Deadlifts (empty bar)' }, { id: 'burpees', name: '5 Burpees' } ] },
        { id: generateUniqueId(), type: 'Conditioning: Chipper', note: 'For Time. Complete all reps of one exercise before moving to the next.', exercises: [
            { id: 'deadlift', name: 'Barbell Deadlifts (95-135 lbs)', reps: '50' },
            { id: 'dumbbell-walking-lunges', name: 'Dumbbell Walking Lunges', reps: '50' },
            { id: 'dip-bar-dips', name: 'Dip Bar Dips', reps: '50' },
            { id: 'kb-swing', name: 'Kettlebell Swings', reps: '50' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'childs-pose', name: "Child's Pose (90s)" }, { id: 'hamstring-stretch', name: 'Hamstring Stretch (60s)' } ]},
      ],
    },
    { // Day 19
      id: generateUniqueId(),
      name: 'W4D4: Active Recovery',
      blocks: [
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'stationary-bike', name: '30-40 mins Light Biking or Incline Walk', duration: '30' } ] },
      ],
    },
    { // Day 20
      id: generateUniqueId(),
      name: 'W4D5: Final Burner',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '5 mins Bike' }, { id: 'inchworms', name: '10 Inchworms' } ] },
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 20, exercises: [
            { id: 'stationary-bike', name: 'Calorie Bike', reps: '15' },
            { id: 't-bar-rows', name: 'T-Bar Rows', reps: '12' },
            { id: 'dumbbell-bench-press', name: 'Dumbbell Bench Press', reps: '10' },
            { id: 'burpees', name: 'Burpees', reps: '8' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: '15 minutes of full body stretching.' } ] },
      ],
    },
  ]
};