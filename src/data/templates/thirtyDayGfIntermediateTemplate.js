// src/data/templates/thirtyDayGfIntermediateTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

const standardWarmup = {
  id: generateUniqueId(),
  type: 'Warm-up',
  exercises: [
    { id: 'stationary-bike', name: 'Stationary Bike', duration: '5 Minutes' },
    { id: null, name: '10 Arm Circles (forward & backward)' },
    { id: 'bird-dog', name: '6x 6s Bird Dog (each side)' },
    { id: null, name: '6x 6s McGill Curl Up' },
    { id: 'plank', name: '6x 6s Side Plank (each side)' },
    { id: 'cobra-stretch', name: '6x 6s Cobra' },
    { id: 'leg-swings', name: '10 Leg Swings (forward & side) per leg' },
    { id: 'cat-cow-stretch', name: '10 Cat-Cow Stretches' },
    { id: 'air-squats', name: '10 Bodyweight Squats' }
  ]
};

const standardCooldown = {
  id: generateUniqueId(),
  type: 'Cool-down',
  exercises: [
    { id: 'stationary-bike', name: 'Stationary Bike (slow pace)', duration: '5 Minutes' },
    { id: 'quad-stretch', name: '30s Quad Stretch (each side)' },
    { id: 'hamstring-stretch', name: '30s Hamstring Stretch (each side)' },
    { id: 'pigeon-pose', name: '30s Glute Stretch (Pigeon Pose)' },
    { id: 'doorway-chest-stretch', name: '30s Chest Stretch (in doorway)' },
    { id: 'lat-stretch', name: '30s Lat Stretch (on rack)' },
    { id: 'tricep-stretch', name: '30s Tricep Stretch (each side)' }
  ]
};

const createActiveRecoveryDay = (dayNum) => ({
  id: generateUniqueId(),
  name: `Day ${dayNum}: Active Recovery`,
  blocks: [
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'stationary-bike', name: '20-30 mins light activity (walk, bike)' }] },
    { id: generateUniqueId(), type: 'Cool-down', exercises: [{ id: null, name: '15 mins full-body stretching or foam rolling.' }] }
  ]
});

export const thirtyDayGfIntermediateTemplate = {
  id: 'template_30_day_gf_intermediate',
  name: '30-Day Intermediate Strength & Cond.',
  description: 'A balanced 30-day plan for intermediate athletes. This program follows a structured weekly split to build strength on major lifts while improving conditioning with varied metcons.',
  isTemplate: true,
  daysPerWeek: 5,
  meta: {
    type: 'Structured Program',
    level: 'Intermediate',
    goal: 'General Fitness',
    equipment: 'Full Gym'
  },
  workouts: [
    // --- WEEK 1 ---
    { // Day 1
      id: generateUniqueId(),
      name: 'W1D1: Upper Body Push',
      blocks: [
        { ...standardWarmup, id: generateUniqueId(), exercises: [...standardWarmup.exercises, { id: 'band-pull-aparts', name: '15 Band Pull-Aparts' }] },
        { id: generateUniqueId(), type: 'Strength', rest: '60-90s', exercises: [
            { id: 'bench_press', name: 'Barbell Bench Press', sets: [{id: generateUniqueId(), reps:'12'},{id: generateUniqueId(), reps:'10'},{id: generateUniqueId(), reps:'8'},{id: generateUniqueId(), reps:'8'}] },
            { id: 'dumbbell-incline-press', name: 'Incline Dumbbell Press', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '10' })) },
            { id: 'landmine-press', name: 'Landmine Press', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '12' })), note: 'per arm' },
            { id: 'dip-bar-dips', name: 'Dips', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: 'Max' })) },
            { id: 'cable-tricep-pushdowns', name: 'Cable Tricep Rope Pushdowns', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '15' })) },
        ]},
        { ...standardCooldown, id: generateUniqueId() }
      ]
    },
    { // Day 2
      id: generateUniqueId(),
      name: 'W1D2: Upper Body Pull',
      blocks: [
        { ...standardWarmup, id: generateUniqueId(), exercises: [...standardWarmup.exercises, { id: 'scapular-pulls', name: '10 Scapular Pull-ups' }] },
        { id: generateUniqueId(), type: 'Strength', rest: '60-90s', exercises: [
            { id: 'pullups', name: 'Pull-ups', sets: [{id: generateUniqueId(), reps:'8'},{id: generateUniqueId(), reps:'8'},{id: generateUniqueId(), reps:'6'},{id: generateUniqueId(), reps:'6'}] },
            { id: 'barbell-row', name: 'Barbell Rows', sets: [{id: generateUniqueId(), reps:'12'},{id: generateUniqueId(), reps:'10'},{id: generateUniqueId(), reps:'8'},{id: generateUniqueId(), reps:'8'}] },
            { id: 'cable-low-row', name: 'Cable Low Row', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '12' })) },
            { id: 'dumbbell-bicep-curls', name: 'Dumbbell Bicep Curls', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '10' })), note: 'per arm' },
            { id: 'cable-hammer-curls', name: 'Cable Hammer Curls (with rope)', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '15' })) },
        ]},
        { ...standardCooldown, id: generateUniqueId() }
      ]
    },
    { // Day 3
      id: generateUniqueId(),
      name: 'W1D3: Legs',
      blocks: [
        { ...standardWarmup, id: generateUniqueId(), exercises: [...standardWarmup.exercises, { id: 'bodyweight-lunge', name: '20 Bodyweight Lunges' }] },
        { id: generateUniqueId(), type: 'Strength', rest: '60-90s', exercises: [
            { id: 'squat', name: 'Barbell Back Squats', sets: [{id: generateUniqueId(), reps:'12'},{id: generateUniqueId(), reps:'10'},{id: generateUniqueId(), reps:'8'},{id: generateUniqueId(), reps:'8'}] },
            { id: 'dumbbell-romanian-deadlifts', name: 'Dumbbell RDLs', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '12' })) },
            { id: 'dumbbell-goblet-squats', name: 'Dumbbell Goblet Squats', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '15' })) },
            { id: 'bodyweight-walking-lunge', name: 'Walking Lunges', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '10' })), note: 'per leg' },
            { id: 'dumbbell-calf-raises', name: 'Dumbbell Calf Raises', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '20' })) },
        ]},
        { ...standardCooldown, id: generateUniqueId() }
      ]
    },
    createActiveRecoveryDay(4),
    { // Day 5
      id: generateUniqueId(),
      name: 'W1D5: Full Body Conditioning',
      blocks: [
        { ...standardWarmup, id: generateUniqueId() },
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 20, exercises: [
            { id: 'dumbbell-thrusters', name: 'Dumbbell Thrusters (30 lbs)', reps: '8' },
            { id: 'landmine-rows', name: 'Landmine Rows (45 lbs)', reps: '10' },
            { id: 'dumbbell-renegade-rows', name: 'Dumbbell Renegade Rows (30 lbs)', reps: '12' },
            { id: 'jump-rope', name: 'Jump Rope Skips', reps: '50' },
        ]},
        { ...standardCooldown, id: generateUniqueId() }
      ]
    },
    { // Day 6
      id: generateUniqueId(),
      name: 'W1D6: Full Body Strength & Metcon',
      blocks: [
        { ...standardWarmup, id: generateUniqueId() },
        { id: generateUniqueId(), type: 'Conditioning: EMOM', note: '6 rounds (24 mins)', minutes: Array.from({ length: 6 }, () => [
            { id: generateUniqueId(), task: '5 Barbell Deadlifts (135 lbs)', exercises: [{ instanceId: generateUniqueId(), id: 'deadlift', name: 'Barbell Deadlifts (135 lbs)', reps: '5' }] },
            { id: generateUniqueId(), task: '10 Push-ups', exercises: [{ instanceId: generateUniqueId(), id: 'push-ups', name: 'Push-ups', reps: '10' }] },
            { id: generateUniqueId(), task: '15 Air Squats', exercises: [{ instanceId: generateUniqueId(), id: 'air-squats', name: 'Air Squats', reps: '15' }] },
            { id: generateUniqueId(), task: 'Rest', exercises: [] },
        ]).flat()},
        { ...standardCooldown, id: generateUniqueId() }
      ]
    },
    createActiveRecoveryDay(7),
    // --- WEEK 2 ---
    { // Day 8
      id: generateUniqueId(),
      name: 'W2D1: Upper Body Push',
      blocks: [
        { ...standardWarmup, id: generateUniqueId() },
        { id: generateUniqueId(), type: 'Strength', rest: '60-90s', exercises: [
            { id: 'incline-barbell-press', name: 'Incline Barbell Press', sets: [{id: generateUniqueId(), reps:'12'},{id: generateUniqueId(), reps:'10'},{id: generateUniqueId(), reps:'8'},{id: generateUniqueId(), reps:'8'}] },
            { id: 'dumbbell-bench-press', name: 'Flat Dumbbell Press', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '12' })) },
            { id: 'dumbbell-shoulder-press', name: 'Dumbbell Shoulder Press (seated)', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '10' })) },
            { id: 'dip-bar-dips', name: 'Dips', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: 'Max' })) },
            { id: 'overhead-tricep-extensions', name: 'Overhead Tricep Extensions (cable)', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '15' })) },
        ]},
        { ...standardCooldown, id: generateUniqueId() }
      ]
    },
    { // Day 9
      id: generateUniqueId(),
      name: 'W2D2: Upper Body Pull',
      blocks: [
        { ...standardWarmup, id: generateUniqueId() },
        { id: generateUniqueId(), type: 'Strength', rest: '60-90s', exercises: [
            { id: 'pullups', name: 'Pull-ups', sets: [{id: generateUniqueId(), reps:'6'},{id: generateUniqueId(), reps:'6'},{id: generateUniqueId(), reps:'5'},{id: generateUniqueId(), reps:'5'}] },
            { id: 'landmine-rows', name: 'Landmine Rows', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '10' })), note: 'per side' },
            { id: 'cable-low-row', name: 'Cable Low Row Machine', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '15' })) },
            { id: 'barbell-curls', name: 'Barbell Curls', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '10' })) },
            { id: 'face-pulls', name: 'Face Pulls (with rope)', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '20' })) },
        ]},
        { ...standardCooldown, id: generateUniqueId() }
      ]
    },
    { // Day 10
      id: generateUniqueId(),
      name: 'W2D3: Legs',
      blocks: [
        { ...standardWarmup, id: generateUniqueId() },
        { id: generateUniqueId(), type: 'Strength', rest: '60-90s', exercises: [
            { id: 'barbell-front-squats', name: 'Barbell Front Squats', sets: [{id: generateUniqueId(), reps:'10'},{id: generateUniqueId(), reps:'8'},{id: generateUniqueId(), reps:'8'},{id: generateUniqueId(), reps:'6'}] },
            { id: 'barbell-good-mornings', name: 'Barbell Good Mornings (light)', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '12' })) },
            { id: 'dumbbell-bulgarian-split-squats', name: 'Dumbbell Bulgarian Split Squats', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '10' })), note: 'per leg' },
            { id: 'dumbbell-goblet-squats', name: 'Dumbbell Goblet Squats', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '20' })) },
            { id: 'dumbbell-calf-raises', name: 'Calf Raises', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '25' })) },
        ]},
        { ...standardCooldown, id: generateUniqueId() }
      ]
    },
    createActiveRecoveryDay(11),
    { // Day 12
      id: generateUniqueId(),
      name: 'W2D5: Full Body Conditioning',
      blocks: [
        { ...standardWarmup, id: generateUniqueId() },
        { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
            { id: 'dumbbell-snatches', name: 'Dumbbell Snatches (40 lbs)', reps: '50' },
            { id: 'sit-up', name: 'Sit-ups', reps: '40' },
            { id: 'burpees', name: 'Burpees', reps: '30' },
            { id: 'pullups', name: 'Pull-ups', reps: '20' },
            { id: 'jump-rope', name: 'Jump Rope Skips', reps: '100' },
        ]},
        { ...standardCooldown, id: generateUniqueId() }
      ]
    },
    { // Day 13
      id: generateUniqueId(),
      name: 'W2D6: Full Body Strength & Metcon',
      blocks: [
        { ...standardWarmup, id: generateUniqueId() },
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5, exercises: [
            { id: 'deadlift', name: 'Barbell Deadlifts (155 lbs)', reps: '8' },
            { id: 'bench_press', name: 'Barbell Bench Press (135 lbs)', reps: '10' },
            { id: 'tuck-jumps', name: 'Tuck Jumps', reps: '12' },
        ]},
        { ...standardCooldown, id: generateUniqueId() }
      ]
    },
    createActiveRecoveryDay(14),
    // --- WEEK 3 ---
    { // Day 15
      id: generateUniqueId(),
      name: 'W3D1: Upper Body Push',
      blocks: [
        { ...standardWarmup, id: generateUniqueId() },
        { id: generateUniqueId(), type: 'Strength', rest: '60-90s', exercises: [
            { id: 'bench_press', name: 'Barbell Bench Press', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), reps: '5' })) },
            { id: 'dumbbell-incline-press', name: 'Incline Dumbbell Press', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '12' })) },
            { id: 'landmine-press', name: 'Landmine Press', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '10' })), note: 'per arm' },
            { id: 'dip-bar-dips', name: 'Dips', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '8' })) },
        ]},
        { id: generateUniqueId(), type: 'Conditioning: Tabata', exercises: [{ id: 'cable-tricep-pushdowns', name: 'Cable Tricep Pushdowns' }] },
        { ...standardCooldown, id: generateUniqueId() }
      ]
    },
    { // Day 16
      id: generateUniqueId(),
      name: 'W3D2: Upper Body Pull',
      blocks: [
        { ...standardWarmup, id: generateUniqueId() },
        { id: generateUniqueId(), type: 'Strength', rest: '60-90s', exercises: [
            { id: 'barbell-row', name: 'Barbell Rows', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), reps: '5' })) },
            { id: 'lat-pulldowns', name: 'Lat Pulldowns', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '12' })) },
            { id: 'cable-low-row', name: 'Low Row Machine (close grip)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '12' })) },
            { id: 'dumbbell-hammer-curls', name: 'Dumbbell Hammer Curls', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '10' })) },
            { id: 'straight-arm-pulldowns', name: 'Straight Arm Pulldowns', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '15' })) },
        ]},
        { ...standardCooldown, id: generateUniqueId() }
      ]
    },
    { // Day 17
      id: generateUniqueId(),
      name: 'W3D3: Legs',
      blocks: [
        { ...standardWarmup, id: generateUniqueId() },
        { id: generateUniqueId(), type: 'Strength', rest: '60-90s', exercises: [
            { id: 'squat', name: 'Barbell Back Squats', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), reps: '5' })) },
            { id: 'dumbbell-romanian-deadlifts', name: 'Dumbbell RDLs', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '10' })) },
            { id: 'bodyweight-walking-lunge', name: 'Walking Lunges', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '12' })), note: 'per leg' },
            { id: 'dumbbell-goblet-squats', name: 'Dumbbell Goblet Squats', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '15' })) },
            { id: 'dumbbell-calf-raises', name: 'Calf Raises', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), reps: '20' })) },
        ]},
        { ...standardCooldown, id: generateUniqueId() }
      ]
    },
    createActiveRecoveryDay(18),
    { // Day 19
      id: generateUniqueId(),
      name: 'W3D5: Full Body Conditioning',
      blocks: [
        { ...standardWarmup, id: generateUniqueId() },
        { id: generateUniqueId(), type: 'Conditioning: EMOM', note: '7 rounds (21 mins)', minutes: Array.from({ length: 7 }, () => [
            { id: generateUniqueId(), task: '15 Kettlebell Swings (20 lbs)', exercises: [{ instanceId: generateUniqueId(), id: 'kb-swing', name: 'Kettlebell Swings (20 lbs)', reps: '15' }] },
            { id: generateUniqueId(), task: '12 Push-ups', exercises: [{ instanceId: generateUniqueId(), id: 'push-ups', name: 'Push-ups', reps: '12' }] },
            { id: generateUniqueId(), task: '9 Burpees', exercises: [{ instanceId: generateUniqueId(), id: 'burpees', name: 'Burpees', reps: '9' }] },
        ]).flat()},
        { ...standardCooldown, id: generateUniqueId() }
      ]
    },
    { // Day 20
      id: generateUniqueId(),
      name: 'W3D6: Full Body Strength & Metcon',
      blocks: [
        { ...standardWarmup, id: generateUniqueId() },
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5, exercises: [
            { id: 'deadlift', name: '5 Deadlifts' },
            { id: 'barbell-hang-power-clean', name: '5 Hang Power Cleans' },
            { id: 'barbell-front-squats', name: '5 Front Squats' },
            { id: 'barbell-push-press', name: '5 Push Press' },
            { id: 'squat', name: '5 Back Squats' },
        ]},
        { ...standardCooldown, id: generateUniqueId() }
      ]
    },
    createActiveRecoveryDay(21),
    // --- WEEK 4 ---
    { // Day 22
      id: generateUniqueId(),
      name: 'W4D1: Upper Body Push',
      blocks: [
        { ...standardWarmup, id: generateUniqueId() },
        { id: generateUniqueId(), type: 'Strength', rest: '60-90s', exercises: [
            { id: 'bench_press', name: 'Barbell Bench Press', sets: [{id: generateUniqueId(), reps:'10'},{id: generateUniqueId(), reps:'8'},{id: generateUniqueId(), reps:'6'}] },
            { id: 'dumbbell-incline-press', name: 'Incline DB Press', sets: [{id: generateUniqueId(), reps:'15'},{id: generateUniqueId(), reps:'12'},{id: generateUniqueId(), reps:'10'}] },
            { id: 'dumbbell-shoulder-press', name: 'Dumbbell Shoulder Press', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '10' })) },
            { id: 'dip-bar-dips', name: 'Dips', sets: [{ id: generateUniqueId(), reps: '100 total' }] },
            { id: 'cable-tricep-pushdowns', name: 'Cable Tricep Pushdowns', sets: [{id: generateUniqueId(), reps:'20'},{id: generateUniqueId(), reps:'15'},{id: generateUniqueId(), reps:'10'}] },
        ]},
        { ...standardCooldown, id: generateUniqueId() }
      ]
    },
    { // Day 23
      id: generateUniqueId(),
      name: 'W4D2: Upper Body Pull',
      blocks: [
        { ...standardWarmup, id: generateUniqueId() },
        { id: generateUniqueId(), type: 'Strength', rest: '60-90s', exercises: [
            { id: 'pullups', name: 'Pull-ups (Max Reps)', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: 'Max' })) },
            { id: 'barbell-row', name: 'Barbell Rows', sets: [{id: generateUniqueId(), reps:'10'},{id: generateUniqueId(), reps:'8'},{id: generateUniqueId(), reps:'6'}] },
            { id: 'lat-pulldowns', name: 'Lat Pulldowns', sets: [{id: generateUniqueId(), reps:'15'},{id: generateUniqueId(), reps:'12'},{id: generateUniqueId(), reps:'10'}] },
        ]},
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 3, exercises: [
            { id: 'barbell-curls', name: 'Barbell Curls', reps: '8' },
            { id: 'dumbbell-hammer-curls', name: 'Dumbbell Hammer Curls', reps: '8' },
        ]},
        { ...standardCooldown, id: generateUniqueId() }
      ]
    },
    { // Day 24
      id: generateUniqueId(),
      name: 'W4D3: Legs',
      blocks: [
        { ...standardWarmup, id: generateUniqueId() },
        { id: generateUniqueId(), type: 'Strength', rest: '60-90s', exercises: [
            { id: 'squat', name: 'Barbell Back Squats', sets: [{id: generateUniqueId(), reps:'10'},{id: generateUniqueId(), reps:'8'},{id: generateUniqueId(), reps:'6'}] },
            { id: 'dumbbell-romanian-deadlifts', name: 'Barbell RDLs', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '10' })) },
            { id: 'dumbbell-goblet-squats', name: 'Dumbbell Goblet Squats (Max reps)', sets: [{ id: generateUniqueId(), reps: 'Max' }] },
            { id: 'dumbbell-bulgarian-split-squats', name: 'Bulgarian Split Squats', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '10' })), note: 'per leg' },
            { id: 'dumbbell-calf-raises', name: 'Calf Raises', sets: [{ id: generateUniqueId(), reps: '100 total' }] },
        ]},
        { ...standardCooldown, id: generateUniqueId() }
      ]
    },
    createActiveRecoveryDay(25),
    { // Day 26
      id: generateUniqueId(),
      name: 'W4D6: Full Body Conditioning',
      blocks: [
        { ...standardWarmup, id: generateUniqueId() },
        { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
            { id: 'jump-rope', name: 'Jump Rope Skips', reps: '100' },
            { id: 'thrusters', name: 'Thrusters (95 lbs)', reps: '50' },
            { id: 'sit-up', name: 'Sit-ups', reps: '40' },
            { id: 'dumbbell-renegade-rows', name: 'Dumbbell Renegade Rows (25 lbs)', reps: '30' },
            { id: 'burpees', name: 'Burpees over Dumbbell', reps: '20' },
            { id: 'pullups', name: 'Pull-ups', reps: '10' },
            { id: 'jump-rope', name: 'Jump Rope Skips', reps: '100' },
        ]},
        { ...standardCooldown, id: generateUniqueId() }
      ]
    },
    { // Day 27
      id: generateUniqueId(),
      name: 'W4D7: Full Body Strength & Metcon',
      blocks: [
        { ...standardWarmup, id: generateUniqueId() },
        { id: generateUniqueId(), type: 'Strength', note: 'Work up to a heavy set of 3 in 10 mins.', exercises: [ { id: 'deadlift', name: 'Deadlift', sets: [{id: generateUniqueId(), reps: '5'},{id: generateUniqueId(), reps: '5'},{id: generateUniqueId(), reps: '3'}] } ] },
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 15, exercises: [
            { id: 'pullups', name: 'Pull-ups', reps: '7' },
            { id: 'dumbbell-push-press', name: 'Dumbbell Push Press', reps: '10' },
            { id: 'tuck-jumps', name: 'Tuck Jumps', reps: '15' },
        ]},
        { ...standardCooldown, id: generateUniqueId() }
      ]
    },
    createActiveRecoveryDay(28),
    { // Day 29
      id: generateUniqueId(),
      name: 'W4D8: Final Conditioning Test',
      blocks: [
        { ...standardWarmup, id: generateUniqueId() },
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 20, exercises: [
            { id: 'dumbbell-thrusters', name: 'Dumbbell Thrusters (30 lbs)', reps: '8' },
            { id: 'landmine-rows', name: 'Landmine Rows (45 lbs)', reps: '10' },
            { id: 'dumbbell-renegade-rows', name: 'Dumbbell Renegade Rows (30 lbs)', reps: '12' },
            { id: 'jump-rope', name: 'Jump Rope Skips', reps: '50' },
        ]},
        { ...standardCooldown, id: generateUniqueId() }
      ]
    },
    createActiveRecoveryDay(30),
  ]
};