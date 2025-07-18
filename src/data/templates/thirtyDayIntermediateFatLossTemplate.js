// src/data/templates/thirtyDayIntermediateFatLossTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

export const thirtyDayIntermediateFatLossTemplate = {
  id: 'template_30_day_intermediate_fat_loss',
  name: '30-Day Intermediate Fat Loss',
  description: 'A comprehensive 30-day plan for intermediates aiming to lose weight. Combines heavy strength training with intense metabolic conditioning to build muscle, boost metabolism, and maximize calorie burn. Requires a barbell, dumbbells, kettlebell, and cardio equipment.',
  isTemplate: true,
  daysPerWeek: 5, // This is an average; the cycle is 2 on, 1 recovery, 2 on, 1 recovery, 1 rest.
  meta: {
    type: 'Structured Program',
    level: 'Intermediate',
    goal: 'Lose Weight',
    equipment: 'Barbell, Dumbbells, Kettlebells, Cardio'
  },
  workouts: [
    // --- WEEK 1 ---
    { // Day 1
      id: generateUniqueId(),
      name: 'W1D1: Upper Body Strength & Metcon',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '5 mins Stationary Bike (easy pace)' }, { id: null, name: 'Then, 2 rounds of:' }, { id: 'band-pull-aparts', name: '15 Band Pull-Aparts' }, { id: 'arm-circles', name: '10 Arm Circles (each way)' }, { id: 'inchworms', name: '5 Inchworms (no push-up)' } ] },
        { id: generateUniqueId(), type: 'Strength', note: 'Rest 90s between sets.', exercises: [
            { id: 'bench_press', name: 'Barbell Bench Press', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '8-10', trackingType: 'reps' })) },
            { id: 'pullups', name: 'Pull-ups', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'reps' })), note: 'If you can do more than 12, add weight.' },
            { id: 'single-arm-dumbbell-rows', name: 'Single-Arm Dumbbell Rows', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '10-12', trackingType: 'reps' })), note: 'Perform per arm.' },
        ]},
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 10, exercises: [
            { id: 'push-ups', name: 'Push-ups', reps: '8' },
            { id: 'kb-swing', name: 'Kettlebell Swings (20 lb)', reps: '12' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'doorway-chest-stretch', name: 'Doorway Chest Stretch (30s)' }, { id: 'lat-stretch', name: 'Lat Stretch (30s each side)' }, { id: 'tricep-stretch', name: 'Tricep Stretch (30s each side)' } ]},
      ],
    },
    { // Day 2
      id: generateUniqueId(),
      name: 'W1D2: Lower Body Strength & Metcon',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: null, name: '2 rounds of:' }, { id: 'air-squats', name: '20 Bodyweight Squats' }, { id: 'leg-swings', name: '10 Leg Swings (each leg, each way)' }, { id: 'glute-bridges', name: '15 Glute Bridges' } ] },
        { id: generateUniqueId(), type: 'Strength', note: 'Rest 90s between sets.', exercises: [
            { id: 'squat', name: 'Barbell Back Squat', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '8-10', trackingType: 'reps' })) },
            { id: 'dumbbell-romanian-deadlifts', name: 'Dumbbell RDLs', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '12', trackingType: 'reps' })) },
            { id: 'dumbbell-walking-lunges', name: 'Dumbbell Walking Lunges', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '20', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 3, exercises: [
            { id: 'running', name: '400m Run or 800m Bike', reps: '1' },
            { id: 'air-squats', name: 'Air Squats', reps: '20' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'couch-stretch', name: 'Couch Stretch (60s each side)' }, { id: 'pigeon-pose', name: 'Pigeon Pose (60s each side)' }, { id: 'hamstring-stretch', name: 'Seated Hamstring Stretch (60s)' } ]},
      ],
    },
    { // Day 3
      id: generateUniqueId(),
      name: 'W1D3: Active Recovery',
      blocks: [
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Jog / Brisk Walk / Bike', duration: '30-45' } ], note: 'Maintain a conversational pace.' },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: '10-15 mins of full-body stretching & foam rolling.'} ] },
      ],
    },
    { // Day 4
      id: generateUniqueId(),
      name: 'W1D4: Full Body Conditioning',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'jumping-jack', name: '50 Jumping Jacks' }, { id: 'burpees', name: '10 Burpees (slow and controlled)' }, { id: 'kb-good-morning', name: '15 Kettlebell Good Mornings (10 or 20 lb)' } ] },
        { id: generateUniqueId(), type: 'Conditioning: Chipper', note: 'Complete all reps of one exercise before moving to the next.', exercises: [
            { id: 'kb-swing', name: 'Kettlebell Swings (20 lb)', reps: '50' },
            { id: 'dumbbell-goblet-squats', name: 'Dumbbell Goblet Squats (30-50 lb)', reps: '40' },
            { id: 'burpees', name: 'Burpees', reps: '30' },
            { id: 'knees-to-elbows', name: 'Toes-to-Bar (or Knees-to-Elbows)', reps: '20' },
            { id: null, name: 'Devil Presses (20-30 lb DBs)', reps: '10' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'childs-pose', name: 'Childs Pose (90s)' }, { id: 'cobra-stretch', name: 'Cobra Stretch (60s)' }, { id: 'pigeon-pose', name: 'Pigeon Pose (60s each side)' } ]},
      ],
    },
    { // Day 5
      id: generateUniqueId(),
      name: 'W1D5: Full Body Power & Strength',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: null, name: '2 rounds of:' }, { id: 'inchworms', name: '5 Walkouts with a Push-up' }, { id: 'overhead-squat', name: '10 Overhead Squats (with band)' }, { id: 'kb-swing', name: '15 Kettlebell Swings' } ] },
        { 
          id: generateUniqueId(), 
          type: 'Conditioning: EMOM', 
          note: 'Perform 3-5 Dumbbell Snatches at the top of each minute for 10 minutes.',
          minutes: Array.from({ length: 10 }, () => ({ id: generateUniqueId(), task: '3-5 Dumbbell Snatches (alt. arms)' })) 
        },
        { id: generateUniqueId(), type: 'Strength', note: 'Work up to a heavy set of 5, then perform 2 more sets at that same weight. Rest 2-3 mins between heavy sets.', exercises: [
            { id: 'deadlift', name: 'Barbell Deadlift', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '5', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Strength', note: '3 rounds, minimal rest.', exercises: [
            { id: 'barbell-row', name: 'Barbell Rows', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '10', trackingType: 'reps' })) },
            { id: 'sit-up', name: 'Sit-ups', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '15', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'hamstring-stretch', name: 'Seated Forward Fold (60s)' }, { id: 'lat-stretch', name: 'Lat Stretch (60s)' }, { id: null, name: 'Spinal Twists (60s each side)' } ]},
      ],
    },
    { // Day 6
      id: generateUniqueId(),
      name: 'W1D6: Active Recovery',
      blocks: [
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Jog / Brisk Walk / Bike', duration: '30-45' } ], note: 'Maintain a conversational pace.' },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: '10 mins of mobility, focusing on tight areas.'} ] },
      ],
    },
    // --- WEEK 2 ---
    { // Day 8
      id: generateUniqueId(),
      name: 'W2D1: Upper Body Volume',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '800m on Stationary Bike' }, { id: null, name: 'Then, 2 rounds:' }, { id: 'band-pull-aparts', name: '15 Band Pull-Aparts' }, { id: 'scapular-pulls', name: '10 Scapular Pulls' } ] },
        { id: generateUniqueId(), type: 'Strength', note: 'Rest 75s between sets.', exercises: [
            { id: 'overhead_press', name: 'Barbell Overhead Press (OHP)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '8', trackingType: 'reps' })) },
            { id: 'weighted-pullups', name: 'Weighted Pull-ups', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '6-8', trackingType: 'reps' })) },
            { id: 'dumbbell-bench-press', name: 'Superset: DB Bench Press', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '10', trackingType: 'reps' })), note: 'Superset with Barbell Rows' },
            { id: 'barbell-row', name: 'Superset: Barbell Rows', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '12', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 12, exercises: [
            { id: 'burpees', name: 'Burpees', reps: '5' }, { id: 'push-ups', name: 'Push-ups', reps: '10' }, { id: 'sit-up', name: 'Sit-ups', reps: '15' }
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'cross-body-shoulder-stretch', name: 'Cross-Body Shoulder Stretch (45s each)' }, { id: 'lat-stretch', name: 'Lat Stretch (45s each)' } ]},
      ],
    },
    { // Day 9
      id: generateUniqueId(),
      name: 'W2D2: Lower Body & Conditioning',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'running', name: '500m Run' }, { id: null, name: 'Then, 2 rounds:' }, { id: 'air-squats', name: '10 Air Squats' }, { id: 'bodyweight-lunge', name: '10 Alternating Lunges' }, { id: 'glute-bridges', name: '10 Glute Bridges' } ] },
        { id: generateUniqueId(), type: 'Strength', note: 'Rest 75s between sets.', exercises: [
            { id: 'dumbbell-front-squats', name: 'Barbell Front Squats', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '10', trackingType: 'reps' })) },
            { id: 'dumbbell-bulgarian-split-squats', name: 'DB Bulgarian Split Squats', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '10', trackingType: 'reps' })), note: 'Perform per leg.' },
        ]},
        { id: generateUniqueId(), type: 'Conditioning: EMOM', note: 'Perform the prescribed task at the top of each minute for 15 minutes.', minutes: [
            { id: generateUniqueId(), task: '10-12 Dumbbell Thrusters (25-35 lb DBs)' },
            { id: generateUniqueId(), task: '10 Burpees' },
            { id: generateUniqueId(), task: '30-40 Double-Unders (or 80 singles)' },
            { id: generateUniqueId(), task: '10-12 Dumbbell Thrusters' },
            { id: generateUniqueId(), task: '10 Burpees' },
            { id: generateUniqueId(), task: '30-40 Double-Unders' },
            { id: generateUniqueId(), task: '10-12 Dumbbell Thrusters' },
            { id: generateUniqueId(), task: '10 Burpees' },
            { id: generateUniqueId(), task: '30-40 Double-Unders' },
            { id: generateUniqueId(), task: '10-12 Dumbbell Thrusters' },
            { id: generateUniqueId(), task: '10 Burpees' },
            { id: generateUniqueId(), task: '30-40 Double-Unders' },
            { id: generateUniqueId(), task: '10-12 Dumbbell Thrusters' },
            { id: generateUniqueId(), task: '10 Burpees' },
            { id: generateUniqueId(), task: '30-40 Double-Unders' },
          ]
        },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'couch-stretch', name: 'Couch Stretch (60s each side)' }, { id: 'pigeon-pose', name: 'Pigeon Pose (60s each side)' } ]},
      ],
    },
    { // Day 10
      id: generateUniqueId(),
      name: 'W2D3: Active Recovery',
      blocks: [
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Jog / Brisk Walk / Bike', duration: '30-45' } ] },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: '10-15 mins of mobility and stretching.'} ] },
      ],
    },
    { // Day 11
      id: generateUniqueId(),
      name: 'W2D4: Full Body Grinder',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'jump-rope', name: '100 Single-Unders' }, { id: null, name: 'Then, 2 rounds:' }, { id: 'kb-halo', name: '10 Kettlebell Halos (each way)' }, { id: 'dumbbell-goblet-squats', name: '10 Goblet Squats' } ] },
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5, exercises: [
            { id: 'running', name: 'Run 400m', reps: '1' },
            { id: 'deadlift', name: 'Barbell Deadlifts (135-155 lbs)', reps: '15' },
            { id: 'burpees', name: 'Burpees Over the Barbell', reps: '15' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: 'Seated Straddle Stretch (60s)' }, { id: 'childs-pose', name: 'Childs Pose (90s)' } ]},
      ],
    },
    { // Day 12
      id: generateUniqueId(),
      name: 'W2D5: Upper Body Metcon & Core',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '5 mins easy on Bike' }, { id: null, name: 'Then, 2 rounds:' }, { id: 'inchworms', name: '10 Inchworms' }, { id: 'shoulder-taps', name: '10 Shoulder Taps' } ] },
        { id: generateUniqueId(), type: 'Conditioning: Tabata', note: '8 rounds: 20s of work, 10s of rest.', exercises: [ { id: 'pullups', name: 'Pull-ups' } ] },
        { id: generateUniqueId(), type: 'Strength', note: '3 rounds, minimal rest.', exercises: [
            { id: 'v-up', name: 'V-Ups', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '20', trackingType: 'reps' })) },
            { id: null, name: 'Russian Twists (20 lb KB)', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '30', trackingType: 'reps' })) },
            { id: 'plank', name: 'Plank', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '45', trackingType: 'duration' })) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'lat-stretch', name: 'Lat Stretch (60s)' }, { id: 'doorway-chest-stretch', name: 'Chest Stretch (60s)' }, { id: 'cobra-stretch', name: 'Cobra Stretch (60s)' } ]},
      ],
    },
    { // Day 13
      id: generateUniqueId(),
      name: 'W2D6: Active Recovery',
      blocks: [
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Jog / Brisk Walk / Bike', duration: '30-45' } ] },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: '10-15 mins of full-body stretching.'} ] },
      ],
    },
    // --- WEEK 3 ---
    { // Day 15
      id: generateUniqueId(),
      name: 'W3D1: Heavy Upper Body & Sprint',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '5 mins Stationary Bike' }, { id: null, name: 'Then, 2 rounds:' }, { id: 'band-pull-aparts', name: '15 Band Pull-Aparts' }, { id: 'scapular-pulls', name: '10 Scapular Pulls' } ] },
        { id: generateUniqueId(), type: 'Strength', note: '5x5 - Increase weight each set, aiming for a heavy 5 on the last set. Rest 2-3 mins.', exercises: [
            { id: 'bench_press', name: 'Barbell Bench Press', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '5', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 1, note: '21-15-9 reps for time.', exercises: [
            { id: 'pullups', name: 'Pull-ups', reps: '21-15-9' },
            { id: 'dumbbell-push-press', name: 'Dumbbell Push Press (35-45 lb DBs)', reps: '21-15-9' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'doorway-chest-stretch', name: 'Chest Stretch (60s)' }, { id: 'lat-stretch', name: 'Lat Stretch (60s)' } ]},
      ],
    },
    { // Day 16
      id: generateUniqueId(),
      name: 'W3D2: Heavy Lower Body & Grind',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: null, name: '2 rounds of:' }, { id: 'air-squats', name: '20 Air Squats' }, { id: 'leg-swings', name: '10 each leg/way' }, { id: 'glute-bridges', name: '15 Glute Bridges' } ] },
        { id: generateUniqueId(), type: 'Strength', note: '5x5 - Increase weight each set, aiming for a heavy 5 on the last set. Rest 2-3 mins.', exercises: [
            { id: 'squat', name: 'Barbell Back Squat', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '5', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 15, exercises: [
            { id: 'dumbbell-step-ups', name: 'Dumbbell Box Step-Overs', reps: '10' },
            { id: 'kb-swing', name: 'Kettlebell Swings', reps: '15' },
            { id: 'running', name: 'Run 200m', reps: '1' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'couch-stretch', name: 'Couch Stretch (60s each)' }, { id: 'pigeon-pose', name: 'Pigeon Pose (60s each)' } ]},
      ],
    },
    { // Day 17
      id: generateUniqueId(),
      name: 'W3D3: Active Recovery',
      blocks: [
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Jog / Brisk Walk / Bike', duration: '30-45' } ] },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: '10-15 mins of mobility work.'} ] },
      ],
    },
    { // Day 18
      id: generateUniqueId(),
      name: 'W3D4: Full Body Barbell Complex',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '5 mins Bike' }, { id: null, name: 'Then practice complex with empty bar.'} ] },
        { 
          id: generateUniqueId(), 
          type: 'Conditioning: EMOM', 
          note: 'Perform the entire complex at the top of each minute for 15 minutes. Use 75-95 lbs. The bar does not touch the ground during the complex.',
          minutes: Array.from({ length: 15 }, () => ({ id: generateUniqueId(), task: '1 Power Clean, 1 Front Squat, 1 Push Press, 1 Back Squat, 1 Push Press' })) 
        },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: '10 mins full-body stretching.'} ] },
      ],
    },
    { // Day 19
      id: generateUniqueId(),
      name: 'W3D5: Long-form Conditioning',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: null, name: 'Dynamic warm-up focusing on running drills, air squats, and push-ups.'} ] },
        { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
            { id: 'running', name: '1 Mile Run', reps: '1' },
            { id: 'air-squats', name: 'Air Squats', reps: '100' },
            { id: 'sit-up', name: 'Sit-ups', reps: '75' },
            { id: 'push-ups', name: 'Push-ups', reps: '50' },
            { id: 'burpees', name: 'Burpees', reps: '25' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'quad-stretch', name: 'Quad Stretch' }, { id: 'hamstring-stretch', name: 'Hamstring Stretch' }, { id: null, name: 'Hip Flexor Stretch' } ]},
      ],
    },
    { // Day 20
      id: generateUniqueId(),
      name: 'W3D6: Active Recovery',
      blocks: [
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Jog / Brisk Walk / Bike', duration: '30-45' } ] },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: '10-15 mins of stretching.'} ] },
      ],
    },
    // --- WEEK 4 & FINAL PUSH ---
    { // Day 22
      id: generateUniqueId(),
      name: 'W4D1: Strength Test & Burner',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: null, name: 'Thorough warm-up for a heavy deadlift. Include glute activation and practice sets.'} ] },
        { id: generateUniqueId(), type: 'Strength', note: 'Work up to a heavy 3-Rep Max for the day.', exercises: [
            { id: 'deadlift', name: 'Barbell Deadlift', sets: [ { id: generateUniqueId(), value: '3RM', trackingType: 'reps' } ] },
        ]},
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 12, exercises: [
            { id: 'muscle-up', name: 'Bar Muscle-Ups (or 6 Pull-ups + 6 Dips)', reps: '3' },
            { id: 'dumbbell-snatches', name: 'Dumbbell Snatches (heavy)', reps: '6' },
            { id: 'box-jumps', name: 'Box Jumps', reps: '9' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: 'Full-body decompression stretches.'} ]},
      ],
    },
    { // Day 23
      id: generateUniqueId(),
      name: 'W4D2: "Fran" Prep',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: null, name: 'Warm up thrusters with an empty bar and do jumping pull-ups.'} ] },
        { id: generateUniqueId(), type: 'Conditioning: RFT', note: 'For Time: 21-15-9 reps of each. Use 75-95 lbs for thrusters.', exercises: [
            { id: 'thrusters', name: 'Barbell Thrusters', reps: '21-15-9' },
            { id: 'pullups', name: 'Pull-ups', reps: '21-15-9' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'lat-stretch', name: 'Lat Stretch' }, { id: 'cross-body-shoulder-stretch', name: 'Shoulder Stretch' }, { id: 'quad-stretch', name: 'Quad Stretch' } ]},
      ],
    },
    { // Day 24
      id: generateUniqueId(),
      name: 'W4D3: Active Recovery',
      blocks: [
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Jog / Brisk Walk / Bike', duration: '30-45' } ] },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: '10-15 mins of mobility work.'} ] },
      ],
    },
    { // Day 25
      id: generateUniqueId(),
      name: 'W4D4: The Long Chipper',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: null, name: '5 mins light cardio, then a few reps of each movement.'} ] },
        { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
            { id: 'double-unders', name: 'Double-Unders (or 150 singles)', reps: '50' },
            { id: 'sit-up', name: 'Sit-ups', reps: '40' },
            { id: 'wall-ball-shots', name: 'Wall Balls (or DB Thrusters)', reps: '30' },
            { id: 'stationary-bike', name: 'Calorie Bike', reps: '20' },
            { id: 'barbell-clean', name: 'Barbell Cleans (115-135 lbs)', reps: '10' },
            { id: 'stationary-bike', name: 'Calorie Bike', reps: '20' },
            { id: 'wall-ball-shots', name: 'Wall Balls (or DB Thrusters)', reps: '30' },
            { id: 'sit-up', name: 'Sit-ups', reps: '40' },
            { id: 'double-unders', name: 'Double-Unders (or 150 singles)', reps: '50' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: 'Full-body stretching.'} ]},
      ],
    },
    { // Day 26
      id: generateUniqueId(),
      name: 'W4D5: Upper Body Pump',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: null, name: 'Standard upper body warm-up.'} ] },
        { id: generateUniqueId(), type: 'Strength', note: '3 rounds, for quality not time. Rest 60-90s between exercises.', exercises: [
            { id: 'dumbbell-incline-press', name: 'Incline Dumbbell Press', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '15', trackingType: 'reps' })) },
            { id: 'bent-over-dumbbell-rows', name: 'Bent Over DB Rows', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '12', trackingType: 'reps' })) },
            { id: null, name: 'Lateral Raises', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '15', trackingType: 'reps' })) },
            { id: null, name: 'Bicep Curls', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '12', trackingType: 'reps' })) },
            { id: null, name: 'Tricep Pushdowns (with band)', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '15', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: 'Stretching for arms, chest, and back.'} ]},
      ],
    },
    { // Day 27
      id: generateUniqueId(),
      name: 'W4D6: Active Recovery',
      blocks: [
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Jog / Brisk Walk / Bike', duration: '30-45' } ] },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: '10-15 mins of mobility work.'} ] },
      ],
    },
    { // Day 29
      id: generateUniqueId(),
      name: 'W4D7: Final Full Body Test',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: null, name: 'Thorough dynamic warm-up.'} ] },
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5, exercises: [
            { id: 'deadlift', name: 'Deadlifts (185 lbs)', reps: '5' },
            { id: 'burpees', name: 'Burpees', reps: '10' },
            { id: 'kb-swing', name: 'Kettlebell Swings', reps: '15' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: 'Full-body stretching.'} ]},
      ],
    },
    { // Day 30
      id: generateUniqueId(),
      name: 'W4D8: Deload & Mobility',
      blocks: [
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: '20-30 mins very light cardio (walk or bike)' } ] },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: '20 mins of dedicated stretching and foam rolling.'} ]},
      ],
    },
  ]
};