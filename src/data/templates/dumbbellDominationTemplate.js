// src/data/templates/dumbbellDominationTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

// Define the core 20 workouts first
const coreWorkouts = [
  // Day 1: W1D1: Upper Body Strength + Conditioning
  {
    id: 'dd-w1d1',
    name: 'W1D1: Upper Body Foundation',
    blocks: [
      { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '2 min Stationary Bike' }, { id: 'arm-circles', name: '10 Arm Circles (each direction)' }, { id: 'push-ups', name: '10 Push-ups' } ] },
      { id: generateUniqueId(), type: 'Strength', rest: '90s', exercises: [
        { id: 'dumbbell-bench-press', name: 'Dumbbell Bench Press', sets: [{id: generateUniqueId(), reps:'8'}, {id: generateUniqueId(), reps:'8'}, {id: generateUniqueId(), reps:'8'}, {id: generateUniqueId(), reps:'8'}] },
        { id: 'weighted-pullups', name: 'Weighted Pull-ups', sets: [{id: generateUniqueId(), reps:'6'}, {id: generateUniqueId(), reps:'6'}, {id: generateUniqueId(), reps:'6'}, {id: generateUniqueId(), reps:'6'}] },
        { id: 'dumbbell-shoulder-press', name: 'Dumbbell Shoulder Press', sets: [{id: generateUniqueId(), reps:'10'}, {id: generateUniqueId(), reps:'10'}, {id: generateUniqueId(), reps:'10'}] },
        { id: 'single-arm-dumbbell-rows', name: 'Single Arm Dumbbell Rows', sets: [{id: generateUniqueId(), reps:'10'}, {id: generateUniqueId(), reps:'10'}, {id: generateUniqueId(), reps:'10'}] },
      ]},
      { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5, exercises: [
        { id: 'dumbbell-thrusters', name: 'Dumbbell Thrusters', reps: '10' },
        { id: 'push-ups', name: 'Push-ups', reps: '15' },
        { id: 'mountain-climbers', name: 'Mountain Climbers', reps: '20' },
      ]},
      { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'static-stretching', name: '5 min Easy Bike + Upper Body Stretches' } ] },
    ]
  },
  // Day 2: W1D2: Lower Body Strength + Conditioning
  {
    id: 'dd-w1d2',
    name: 'W1D2: Lower Body Foundation',
    blocks: [
      { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '2 min Stationary Bike' }, { id: 'air-squats', name: '10 Air Squats' }, { id: 'glute-bridges', name: '10 Glute Bridges' } ] },
      { id: generateUniqueId(), type: 'Strength', rest: '90s', exercises: [
        { id: 'dumbbell-goblet-squats', name: 'Dumbbell Goblet Squats', sets: [{id: generateUniqueId(), reps:'10'}, {id: generateUniqueId(), reps:'10'}, {id: generateUniqueId(), reps:'10'}, {id: generateUniqueId(), reps:'10'}] },
        { id: 'dumbbell-romanian-deadlifts', name: 'Dumbbell Romanian Deadlifts', sets: [{id: generateUniqueId(), reps:'10'}, {id: generateUniqueId(), reps:'10'}, {id: generateUniqueId(), reps:'10'}, {id: generateUniqueId(), reps:'10'}] },
        { id: 'dumbbell-bulgarian-split-squats', name: 'Dumbbell Bulgarian Split Squats', sets: [{id: generateUniqueId(), reps:'8'}, {id: generateUniqueId(), reps:'8'}, {id: generateUniqueId(), reps:'8'}] },
      ]},
      { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 4, exercises: [
        { id: 'dumbbell-goblet-squats', name: 'Dumbbell Goblet Squats', reps: '15' },
        { id: 'jumping-lunges', name: 'Jumping Lunges', reps: '20' },
        { id: 'air-squats', name: 'Air Squats', reps: '25' },
      ]},
      { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'static-stretching', name: '5 min Easy Bike + Lower Body Stretches' } ] },
    ]
  },
  // Day 3: W1D3: Full Body MetCon
  {
    id: 'dd-w1d3',
    name: 'W1D3: The Grind',
    blocks: [
      { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '2 min Stationary Bike' }, { id: 'inchworms', name: '5 Inchworms' }, { id: 'jumping-jacks', name: '30s Jumping Jacks' } ] },
      { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 3, exercises: [
        { id: 'stationary-bike', name: '300m Bike Sprint', reps: '1' },
        { id: 'dumbbell-thrusters', name: 'Dumbbell Thrusters', reps: '21' },
        { id: 'pullups', name: 'Pull-ups', reps: '15' },
        { id: 'dumbbell-man-makers', name: 'Dumbbell Man-Makers', reps: '9' },
      ]},
      { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'static-stretching', name: '5 min Easy Bike + Full Body Stretches' } ] },
    ]
  },
  // Day 4: W1D4: Upper Body Power
  {
    id: 'dd-w1d4',
    name: 'W1D4: Upper Body Power',
    blocks: [
      { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '2 min Stationary Bike' }, { id: 'push-ups', name: '10 Push-ups' }, { id: 'dumbbell-high-pulls', name: '10 Dumbbell High Pulls' } ] },
      { id: generateUniqueId(), type: 'Strength', rest: '90s', exercises: [
        { id: 'dumbbell-push-press', name: 'Dumbbell Push Press', sets: [{id: generateUniqueId(), reps:'5'}, {id: generateUniqueId(), reps:'5'}, {id: generateUniqueId(), reps:'5'}, {id: generateUniqueId(), reps:'5'}, {id: generateUniqueId(), reps:'5'}] },
        { id: 'dumbbell-high-pulls', name: 'Dumbbell High Pulls', sets: [{id: generateUniqueId(), reps:'5'}, {id: generateUniqueId(), reps:'5'}, {id: generateUniqueId(), reps:'5'}, {id: generateUniqueId(), reps:'5'}, {id: generateUniqueId(), reps:'5'}] },
        { id: 'plyometric-push-ups', name: 'Plyometric Push-ups', sets: [{id: generateUniqueId(), reps:'6'}, {id: generateUniqueId(), reps:'6'}, {id: generateUniqueId(), reps:'6'}, {id: generateUniqueId(), reps:'6'}] },
      ]},
      { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 6, exercises: [
        { id: 'dumbbell-push-press', name: 'Dumbbell Push Press', reps: '5' },
        { id: 'dumbbell-high-pulls', name: 'Dumbbell High Pulls', reps: '10' },
        { id: 'jump-rope', name: 'Jump Rope (Single Unders)', reps: '15' },
      ]},
      { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'static-stretching', name: '5 min Easy Bike + Upper Body Stretches' } ] },
    ]
  },
  // Day 5: W1D5: Lower Body Power
  {
    id: 'dd-w1d5',
    name: 'W1D5: Lower Body Power',
    blocks: [
      { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '2 min Stationary Bike' }, { id: 'air-squats', name: '10 Air Squats' }, { id: 'jump-squats', name: '10 Jump Squats' } ] },
      { id: generateUniqueId(), type: 'Strength', rest: '90s', exercises: [
        { id: 'dumbbell-jump-squats', name: 'Dumbbell Jump Squats', sets: [{id: generateUniqueId(), reps:'5'}, {id: generateUniqueId(), reps:'5'}, {id: generateUniqueId(), reps:'5'}, {id: generateUniqueId(), reps:'5'}, {id: generateUniqueId(), reps:'5'}] },
        { id: 'dumbbell-deadlift-to-high-pull', name: 'Dumbbell Deadlift to High Pull', sets: [{id: generateUniqueId(), reps:'5'}, {id: generateUniqueId(), reps:'5'}, {id: generateUniqueId(), reps:'5'}, {id: generateUniqueId(), reps:'5'}, {id: generateUniqueId(), reps:'5'}] },
      ]},
      { id: generateUniqueId(), type: 'Conditioning: EMOM', minutes: [
          { id: generateUniqueId(), task: '12 Dumbbell Goblet Squats' }, { id: generateUniqueId(), task: '10 Dumbbell Deadlifts + 5 Burpees' },
          { id: generateUniqueId(), task: '12 Dumbbell Goblet Squats' }, { id: generateUniqueId(), task: '10 Dumbbell Deadlifts + 5 Burpees' },
          { id: generateUniqueId(), task: '12 Dumbbell Goblet Squats' }, { id: generateUniqueId(), task: '10 Dumbbell Deadlifts + 5 Burpees' },
          { id: generateUniqueId(), task: '12 Dumbbell Goblet Squats' }, { id: generateUniqueId(), task: '10 Dumbbell Deadlifts + 5 Burpees' },
      ]},
      { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'static-stretching', name: '5 min Easy Bike + Lower Body Stretches' } ] },
    ]
  },
  // Day 8: W2D1: Upper Body Strength + Conditioning
  {
    id: 'dd-w2d1',
    name: 'W2D1: Upper Body Build',
    blocks: [
      { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '3 min Stationary Bike' }, { id: 'band-pull-aparts', name: '10 Band Pull-Aparts' }, { id: 'push-ups', name: '12 Push-ups' } ] },
      { id: generateUniqueId(), type: 'Strength', rest: '90s', exercises: [
        { id: 'dumbbell-incline-press', name: 'Dumbbell Incline Press', sets: [{id: generateUniqueId(), reps:'8'},{id: generateUniqueId(), reps:'8'},{id: generateUniqueId(), reps:'8'},{id: generateUniqueId(), reps:'8'}] },
        { id: 'pullups', name: 'Pull-ups', sets: [{id: generateUniqueId(), reps:'8'},{id: generateUniqueId(), reps:'8'},{id: generateUniqueId(), reps:'8'},{id: generateUniqueId(), reps:'8'}] },
        { id: 'dumbbell-arnold-press', name: 'Dumbbell Arnold Press', sets: [{id: generateUniqueId(), reps:'10'},{id: generateUniqueId(), reps:'10'},{id: generateUniqueId(), reps:'10'}] },
      ]},
      { id: generateUniqueId(), type: 'Conditioning: Tabata', work: 20, rest: 10, rounds: 8, exercises: [
        { id: 'dumbbell-thrusters', name: 'Dumbbell Thrusters' },
        { id: 'push-ups', name: 'Push-ups' },
        { id: 'mountain-climbers', name: 'Mountain Climbers' },
        { id: 'burpees', name: 'Burpees' },
      ]},
      { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'static-stretching', name: '5 min Easy Bike + Stretches' } ] },
    ]
  },
  // Day 9: W2D2: Lower Body Strength + Conditioning
  {
    id: 'dd-w2d2',
    name: 'W2D2: Lower Body Build',
    blocks: [
      { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '3 min Stationary Bike' }, { id: 'air-squats', name: '15 Air Squats' }, { id: 'glute-bridges', name: '15 Glute Bridges' } ] },
      { id: generateUniqueId(), type: 'Strength', rest: '90s', exercises: [
        { id: 'dumbbell-front-squats', name: 'Dumbbell Front Squats', sets: [{id: generateUniqueId(), reps:'10'},{id: generateUniqueId(), reps:'10'},{id: generateUniqueId(), reps:'10'},{id: generateUniqueId(), reps:'10'}] },
        { id: 'dumbbell-sumo-deadlifts', name: 'Dumbbell Sumo Deadlifts', sets: [{id: generateUniqueId(), reps:'10'},{id: generateUniqueId(), reps:'10'},{id: generateUniqueId(), reps:'10'},{id: generateUniqueId(), reps:'10'}] },
      ]},
      { id: generateUniqueId(), type: 'Conditioning: EMOM', minutes: [
        { id: generateUniqueId(), task: '1 Goblet Squat' }, { id: generateUniqueId(), task: '2 Goblet Squats' },
        { id: generateUniqueId(), task: '3 Goblet Squats' }, { id: generateUniqueId(), task: '4 Goblet Squats' },
        { id: generateUniqueId(), task: '5 Goblet Squats' }, { id: generateUniqueId(), task: '6 Goblet Squats' },
        { id: generateUniqueId(), task: '7 Goblet Squats' }, { id: generateUniqueId(), task: '8 Goblet Squats' },
        { id: generateUniqueId(), task: '9 Goblet Squats' }, { id: generateUniqueId(), task: '10 Goblet Squats' },
      ]},
      { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'static-stretching', name: '5 min Easy Bike + Stretches' } ] },
    ]
  },
  // Day 10: W2D3: Full Body MetCon (Chipper)
  {
    id: 'dd-w2d3',
    name: 'W2D3: The Chipper',
    blocks: [
      { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '3 min Stationary Bike' }, { id: 'inchworms', name: '8 Inchworms' }, { id: 'jumping-jacks', name: '45s Jumping Jacks' } ] },
      { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
        { id: 'dumbbell-swings', name: 'American Dumbbell Swings', reps: '50' },
        { id: 'pullups', name: 'Pull-ups', reps: '40' },
        { id: 'dumbbell-thrusters', name: 'Dumbbell Thrusters', reps: '30' },
        { id: 'dumbbell-man-makers', name: 'Dumbbell Man-Makers', reps: '20' },
        { id: 'burpees', name: 'Burpees', reps: '10' },
      ]},
      { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'static-stretching', name: '5 min Easy Bike + Stretches' } ] },
    ]
  },
  // Day 11: W2D4: Upper Body Power + Conditioning
  {
    id: 'dd-w2d4',
    name: 'W2D4: Upper Body Power Build',
    blocks: [
      { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '3 min Stationary Bike' }, { id: 'push-ups', name: '12 Push-ups' }, { id: 'dumbbell-high-pulls', name: '12 Dumbbell High Pulls' } ] },
      { id: generateUniqueId(), type: 'Strength', rest: '90s', exercises: [
        { id: 'dumbbell-snatches', name: 'Dumbbell Snatches', sets: [{id: generateUniqueId(), reps:'4'},{id: generateUniqueId(), reps:'4'},{id: generateUniqueId(), reps:'4'},{id: generateUniqueId(), reps:'4'},{id: generateUniqueId(), reps:'4'}] },
        { id: 'dumbbell-push-jerks', name: 'Dumbbell Push Jerks', sets: [{id: generateUniqueId(), reps:'4'},{id: generateUniqueId(), reps:'4'},{id: generateUniqueId(), reps:'4'},{id: generateUniqueId(), reps:'4'},{id: generateUniqueId(), reps:'4'}] },
      ]},
      { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 8, exercises: [
        { id: 'dumbbell-snatches', name: 'Dumbbell Snatches (3 each arm)', reps: '6' },
        { id: 'dumbbell-push-jerks', name: 'Dumbbell Push Jerks (4 each arm)', reps: '8' },
        { id: 'explosive-push-ups', name: 'Explosive Push-ups', reps: '10' },
      ]},
      { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'static-stretching', name: '5 min Easy Bike + Stretches' } ] },
    ]
  },
  // Day 12: W2D5: Lower Body Power + Conditioning
  {
    id: 'dd-w2d5',
    name: 'W2D5: Lower Body Power Build',
    blocks: [
      { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '3 min Stationary Bike' }, { id: 'air-squats', name: '15 Air Squats' }, { id: 'jump-squats', name: '15 Jump Squats' } ] },
      { id: generateUniqueId(), type: 'Strength', rest: '90s', exercises: [
        { id: 'dumbbell-squat-to-press', name: 'Dumbbell Squat to Press', sets: [{id: generateUniqueId(), reps:'6'},{id: generateUniqueId(), reps:'6'},{id: generateUniqueId(), reps:'6'},{id: generateUniqueId(), reps:'6'},{id: generateUniqueId(), reps:'6'}] },
        { id: 'dumbbell-clean-and-press', name: 'Dumbbell Clean and Press', sets: [{id: generateUniqueId(), reps:'4'},{id: generateUniqueId(), reps:'4'},{id: generateUniqueId(), reps:'4'},{id: generateUniqueId(), reps:'4'},{id: generateUniqueId(), reps:'4'}] },
      ]},
      { id: generateUniqueId(), type: 'Conditioning: Tabata', work: 20, rest: 10, rounds: 16, exercises: [
        { id: 'dumbbell-jump-squats', name: 'Dumbbell Jump Squats' },
        { id: 'burpees', name: 'Burpees' },
        { id: 'jumping-lunges', name: 'Jumping Lunges' },
        { id: 'mountain-climbers', name: 'Mountain Climbers' },
      ]},
      { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'static-stretching', name: '5 min Easy Bike + Stretches' } ] },
    ]
  },
  // Day 15: W3D1: Upper Body Strength
  {
    id: 'dd-w3d1',
    name: 'W3D1: Upper Body Intensifier',
    blocks: [
      { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '3 min Stationary Bike' }, { id: 'push-ups', name: '15 Push-ups' }, { id: 'pullups', name: '8 Pull-ups' } ] },
      { id: generateUniqueId(), type: 'Strength', rest: '120s', exercises: [
        { id: 'dumbbell-bench-press', name: 'Dumbbell Bench Press', sets: [{id:generateUniqueId(), reps:'6'},{id:generateUniqueId(), reps:'6'},{id:generateUniqueId(), reps:'6'},{id:generateUniqueId(), reps:'6'},{id:generateUniqueId(), reps:'6'}] },
        { id: 'weighted-pullups', name: 'Weighted Pull-ups', sets: [{id:generateUniqueId(), reps:'5'},{id:generateUniqueId(), reps:'5'},{id:generateUniqueId(), reps:'5'},{id:generateUniqueId(), reps:'5'},{id:generateUniqueId(), reps:'5'}] },
      ]},
      { id: generateUniqueId(), type: 'Conditioning: EMOM', minutes: [
        { id: generateUniqueId(), task: '8 Dumbbell Thrusters' }, { id: generateUniqueId(), task: '10 Pull-ups' },
        { id: generateUniqueId(), task: '12 Push-ups' }, { id: generateUniqueId(), task: '30s Plank Hold' },
        { id: generateUniqueId(), task: '8 Dumbbell Thrusters' }, { id: generateUniqueId(), task: '10 Pull-ups' },
        { id: generateUniqueId(), task: '12 Push-ups' }, { id: generateUniqueId(), task: '30s Plank Hold' },
        { id: generateUniqueId(), task: '8 Dumbbell Thrusters' }, { id: generateUniqueId(), task: '10 Pull-ups' },
        { id: generateUniqueId(), task: '12 Push-ups' }, { id: generateUniqueId(), task: '30s Plank Hold' },
        { id: generateUniqueId(), task: '8 Dumbbell Thrusters' }, { id: generateUniqueId(), task: '10 Pull-ups' },
        { id: generateUniqueId(), task: '12 Push-ups' }, { id: generateUniqueId(), task: '30s Plank Hold' },
        { id: generateUniqueId(), task: '8 Dumbbell Thrusters' }, { id: generateUniqueId(), task: '10 Pull-ups' },
        { id: generateUniqueId(), task: '12 Push-ups' }, { id: generateUniqueId(), task: '30s Plank Hold' },
      ]},
      { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'static-stretching', name: '5 min Easy Bike + Stretches' } ] },
    ]
  },
  // Day 16: W3D2: Lower Body Strength
  {
    id: 'dd-w3d2',
    name: 'W3D2: Leg Pyramid',
    blocks: [
      { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '3 min Stationary Bike' }, { id: 'air-squats', name: '20 Air Squats' } ] },
      { id: generateUniqueId(), type: 'Strength', rest: '120s', exercises: [
        { id: 'dumbbell-goblet-squats', name: 'Dumbbell Goblet Squats', sets: [{id:generateUniqueId(), reps:'8'},{id:generateUniqueId(), reps:'8'},{id:generateUniqueId(), reps:'8'},{id:generateUniqueId(), reps:'8'},{id:generateUniqueId(), reps:'8'}] },
        { id: 'dumbbell-romanian-deadlifts', name: 'Dumbbell Romanian Deadlifts', sets: [{id:generateUniqueId(), reps:'8'},{id:generateUniqueId(), reps:'8'},{id:generateUniqueId(), reps:'8'},{id:generateUniqueId(), reps:'8'},{id:generateUniqueId(), reps:'8'}] },
      ]},
      { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
        { id: 'dumbbell-goblet-squats', name: '1-2-3-4-5-4-3-2-1 reps of:', reps: '' },
        { id: 'dumbbell-goblet-squats', name: 'Dumbbell Goblet Squats', reps: '' },
        { id: 'burpees', name: 'Burpees', reps: '' },
        { id: 'jumping-lunges', name: 'Jumping Lunges (each leg)', reps: '' },
      ]},
      { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'static-stretching', name: '5 min Easy Bike + Stretches' } ] },
    ]
  },
  // Day 17: W3D3: Full Body MetCon
  {
    id: 'dd-w3d3',
    name: 'W3D3: The Beast',
    blocks: [
      { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '3 min Stationary Bike' }, { id: 'movement-prep', name: 'Practice workout movements' } ] },
      { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5, exercises: [
        { id: 'stationary-bike', name: '400m Bike Sprint', reps: '1' },
        { id: 'dumbbell-thrusters', name: 'Dumbbell Thrusters', reps: '15' },
        { id: 'pullups', name: 'Pull-ups', reps: '12' },
        { id: 'dumbbell-man-makers', name: 'Dumbbell Man-Makers', reps: '9' },
        { id: 'burpees', name: 'Burpees', reps: '6' },
      ]},
      { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'static-stretching', name: '5 min Easy Bike + Stretches' } ] },
    ]
  },
  // Day 18: W3D4: Upper Body Power
  {
    id: 'dd-w3d4',
    name: 'W3D4: Power Ladder',
    blocks: [
      { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '3 min Stationary Bike' }, { id: 'push-ups', name: '15 Push-ups' }, { id: 'pullups', name: '8 Pull-ups' } ] },
      { id: generateUniqueId(), type: 'Strength', rest: '120s', exercises: [
        { id: 'dumbbell-push-press', name: 'Dumbbell Push Press', sets: [{id:generateUniqueId(), reps:'3'},{id:generateUniqueId(), reps:'3'},{id:generateUniqueId(), reps:'3'},{id:generateUniqueId(), reps:'3'},{id:generateUniqueId(), reps:'3'},{id:generateUniqueId(), reps:'3'}] },
        { id: 'dumbbell-snatches', name: 'Dumbbell Snatches (each arm)', sets: [{id:generateUniqueId(), reps:'3'},{id:generateUniqueId(), reps:'3'},{id:generateUniqueId(), reps:'3'},{id:generateUniqueId(), reps:'3'},{id:generateUniqueId(), reps:'3'},{id:generateUniqueId(), reps:'3'}] },
      ]},
      { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 10, exercises: [
        { id: 'dumbbell-snatches', name: '3, 6, 9... Dumbbell Snatches (alt)' },
        { id: 'dumbbell-push-press', name: '6, 9, 12... Dumbbell Push Press' },
        { id: 'explosive-push-ups', name: '9, 12, 15... Explosive Push-ups' },
      ]},
      { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'static-stretching', name: '5 min Easy Bike + Stretches' } ] },
    ]
  },
  // Day 19: W3D5: Lower Body Power
  {
    id: 'dd-w3d5',
    name: 'W3D5: Lower Power Challenge',
    blocks: [
      { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '3 min Stationary Bike' }, { id: 'jump-squats', name: '15 Jump Squats' } ] },
      { id: generateUniqueId(), type: 'Strength', rest: '90s', exercises: [
        { id: 'dumbbell-jump-squats', name: 'Dumbbell Jump Squats', sets: [{id:generateUniqueId(), reps:'4'},{id:generateUniqueId(), reps:'4'},{id:generateUniqueId(), reps:'4'},{id:generateUniqueId(), reps:'4'},{id:generateUniqueId(), reps:'4'},{id:generateUniqueId(), reps:'4'}] },
        { id: 'dumbbell-clean-and-press', name: 'Dumbbell Clean and Press (each arm)', sets: [{id:generateUniqueId(), reps:'3'},{id:generateUniqueId(), reps:'3'},{id:generateUniqueId(), reps:'3'},{id:generateUniqueId(), reps:'3'},{id:generateUniqueId(), reps:'3'},{id:generateUniqueId(), reps:'3'}] },
      ]},
      { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
        { id: 'complex1', name: '21-15-9 reps of:', reps: '' },
        { id: 'dumbbell-goblet-squats', name: 'Dumbbell Goblet Squats', reps: '' },
        { id: 'dumbbell-romanian-deadlifts', name: 'Dumbbell Deadlifts', reps: '' },
        { id: 'burpees', name: 'Burpees', reps: '' },
        { id: 'complex2', name: 'Then, 9-15-21 reps of:', reps: '' },
        { id: 'dumbbell-jump-squats', name: 'Dumbbell Jump Squats', reps: '' },
        { id: 'jumping-lunges', name: 'Jumping Lunges', reps: '' },
      ]},
      { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'static-stretching', name: '5 min Easy Bike + Stretches' } ] },
    ]
  },
  // Day 22: W4D1: Upper Body Strength
  {
    id: 'dd-w4d1',
    name: 'W4D1: Upper Domination',
    blocks: [
      { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '4 min Stationary Bike' }, { id: 'push-ups', name: '20 Push-ups' } ] },
      { id: generateUniqueId(), type: 'Strength', rest: '120s', exercises: [
        { id: 'dumbbell-bench-press', name: 'Dumbbell Bench Press', sets: [{id:generateUniqueId(), reps:'5'},{id:generateUniqueId(), reps:'5'},{id:generateUniqueId(), reps:'5'},{id:generateUniqueId(), reps:'5'},{id:generateUniqueId(), reps:'5'}] },
        { id: 'weighted-pullups', name: 'Weighted Pull-ups', sets: [{id:generateUniqueId(), reps:'4'},{id:generateUniqueId(), reps:'4'},{id:generateUniqueId(), reps:'4'},{id:generateUniqueId(), reps:'4'},{id:generateUniqueId(), reps:'4'}] },
      ]},
      { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 3, exercises: [
        { id: 'dumbbell-thrusters', name: 'Dumbbell Thrusters', reps: '15' },
        { id: 'pullups', name: 'Pull-ups', reps: '12' },
        { id: 'dumbbell-man-makers', name: 'Dumbbell Man-Makers', reps: '9' },
      ]},
      { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'static-stretching', name: '5 min Easy Bike + Stretches' } ] },
    ]
  },
  // Day 23: W4D2: Lower Body Strength
  {
    id: 'dd-w4d2',
    name: 'W4D2: Leg Annihilation',
    blocks: [
      { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '4 min Stationary Bike' }, { id: 'air-squats', name: '25 Air Squats' } ] },
      { id: generateUniqueId(), type: 'Strength', rest: '120s', exercises: [
        { id: 'dumbbell-goblet-squats', name: 'Dumbbell Goblet Squats', sets: [{id:generateUniqueId(), reps:'6'},{id:generateUniqueId(), reps:'6'},{id:generateUniqueId(), reps:'6'},{id:generateUniqueId(), reps:'6'},{id:generateUniqueId(), reps:'6'}] },
        { id: 'dumbbell-romanian-deadlifts', name: 'Dumbbell Romanian Deadlifts', sets: [{id:generateUniqueId(), reps:'6'},{id:generateUniqueId(), reps:'6'},{id:generateUniqueId(), reps:'6'},{id:generateUniqueId(), reps:'6'},{id:generateUniqueId(), reps:'6'}] },
      ]},
      { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 12, exercises: [
        { id: 'dumbbell-goblet-squats', name: 'Dumbbell Goblet Squats', reps: '8' },
        { id: 'dumbbell-romanian-deadlifts', name: 'Dumbbell Deadlifts', reps: '8' },
        { id: 'burpees', name: 'Burpees', reps: '8' },
        { id: 'jumping-lunges', name: 'Jumping Lunges', reps: '8' },
      ]},
      { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'static-stretching', name: '5 min Easy Bike + Stretches' } ] },
    ]
  },
  // Day 24: W4D3: Full Body MetCon
  {
    id: 'dd-w4d3',
    name: 'W4D3: The Gauntlet',
    blocks: [
      { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '4 min Stationary Bike' }, { id: 'movement-prep', name: 'Practice workout movements' } ] },
      { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
        { id: 'dumbbell-swings', name: 'Dumbbell Swings', reps: '100' },
        { id: 'pullups', name: 'Pull-ups', reps: '75' },
        { id: 'dumbbell-thrusters', name: 'Dumbbell Thrusters', reps: '50' },
        { id: 'dumbbell-man-makers', name: 'Dumbbell Man-Makers', reps: '25' },
        { id: 'stationary-bike', name: '500m Bike Sprint', reps: '1' },
      ]},
      { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'static-stretching', name: '5 min Easy Bike + Stretches' } ] },
    ]
  },
  // Day 25: W4D4: Upper Body Power
  {
    id: 'dd-w4d4',
    name: 'W4D4: Power Finale',
    blocks: [
      { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '4 min Stationary Bike' }, { id: 'explosive-push-ups', name: '10 Explosive Push-ups' } ] },
      { id: generateUniqueId(), type: 'Strength', rest: '120s', exercises: [
        { id: 'dumbbell-snatches', name: 'Dumbbell Snatches (each arm)', sets: [{id:generateUniqueId(), reps:'2'},{id:generateUniqueId(), reps:'2'},{id:generateUniqueId(), reps:'2'},{id:generateUniqueId(), reps:'2'},{id:generateUniqueId(), reps:'2'},{id:generateUniqueId(), reps:'2'}] },
        { id: 'dumbbell-push-jerks', name: 'Dumbbell Push Jerks (each arm)', sets: [{id:generateUniqueId(), reps:'2'},{id:generateUniqueId(), reps:'2'},{id:generateUniqueId(), reps:'2'},{id:generateUniqueId(), reps:'2'},{id:generateUniqueId(), reps:'2'},{id:generateUniqueId(), reps:'2'}] },
      ]},
      { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 4, exercises: [
        { id: 'dumbbell-snatches', name: 'Dumbbell Snatches (2 each arm)', reps: '4' },
        { id: 'dumbbell-push-jerks', name: 'Dumbbell Push Jerks (3 each arm)', reps: '6' },
        { id: 'explosive-push-ups', name: 'Explosive Push-ups', reps: '8' },
        { id: 'burpees', name: 'Burpees', reps: '10' },
      ]},
      { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'static-stretching', name: '5 min Easy Bike + Stretches' } ] },
    ]
  },
  // Day 26: W4D5: Lower Body Power
  {
    id: 'dd-w4d5',
    name: 'W4D5: Lower Power Finale',
    blocks: [
      { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '4 min Stationary Bike' }, { id: 'jump-squats', name: '20 Jump Squats' } ] },
      { id: generateUniqueId(), type: 'Strength', rest: '120s', exercises: [
        { id: 'dumbbell-clean-and-press', name: 'Dumbbell Clean and Press (each arm)', sets: [{id:generateUniqueId(), reps:'2'},{id:generateUniqueId(), reps:'2'},{id:generateUniqueId(), reps:'2'},{id:generateUniqueId(), reps:'2'},{id:generateUniqueId(), reps:'2'},{id:generateUniqueId(), reps:'2'}] },
        { id: 'dumbbell-jump-squats', name: 'Dumbbell Jump Squats', sets: [{id:generateUniqueId(), reps:'3'},{id:generateUniqueId(), reps:'3'},{id:generateUniqueId(), reps:'3'},{id:generateUniqueId(), reps:'3'},{id:generateUniqueId(), reps:'3'},{id:generateUniqueId(), reps:'3'}] },
      ]},
      { id: generateUniqueId(), type: 'Conditioning: Tabata', work: 20, rest: 10, rounds: 32, exercises: [
        { id: 'dumbbell-jump-squats', name: 'Tabata Dumbbell Jump Squats (8 rds)' },
        { id: 'burpees', name: 'Tabata Burpees (8 rds)' },
        { id: 'jumping-lunges', name: 'Tabata Jumping Lunges (8 rds)' },
        { id: 'stationary-bike', name: 'Tabata Bike Sprints (8 rds)' },
      ]},
      { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'static-stretching', name: '5 min Easy Bike + Stretches' } ] },
    ]
  },
];

// Now, create the final export object
export const dumbbellDominationTemplate = {
  id: 'template-dumbbell-domination',
  name: '30-Day Dumbbell Domination',
  description: 'A 30-day functional fitness program designed to build strength and conditioning using only dumbbells. Perfect for all levels.',
  daysPerWeek: 5,
  workouts: [
    ...coreWorkouts,
    // Week 5 is a repeat of Week 1
    { ...JSON.parse(JSON.stringify(coreWorkouts[0])), id: 'dd-w5d1', name: 'W5D1: Upper Body Foundation' },
    { ...JSON.parse(JSON.stringify(coreWorkouts[1])), id: 'dd-w5d2', name: 'W5D2: Lower Body Foundation' },
    { ...JSON.parse(JSON.stringify(coreWorkouts[2])), id: 'dd-w5d3', name: 'W5D3: The Grind' },
    { ...JSON.parse(JSON.stringify(coreWorkouts[3])), id: 'dd-w5d4', name: 'W5D4: Upper Body Power' },
    { ...JSON.parse(JSON.stringify(coreWorkouts[4])), id: 'dd-w5d5', name: 'W5D5: Lower Body Power' },

    // Week 6 is a repeat of Week 2
    { ...JSON.parse(JSON.stringify(coreWorkouts[5])), id: 'dd-w6d1', name: 'W6D1: Upper Body Build' },
    { ...JSON.parse(JSON.stringify(coreWorkouts[6])), id: 'dd-w6d2', name: 'W6D2: Lower Body Build' },
    { ...JSON.parse(JSON.stringify(coreWorkouts[7])), id: 'dd-w6d3', name: 'W6D3: The Chipper' },
    { ...JSON.parse(JSON.stringify(coreWorkouts[8])), id: 'dd-w6d4', name: 'W6D4: Upper Body Power Build' },
    { ...JSON.parse(JSON.stringify(coreWorkouts[9])), id: 'dd-w6d5', name: 'W6D5: Lower Body Power Build' },
  ]
};