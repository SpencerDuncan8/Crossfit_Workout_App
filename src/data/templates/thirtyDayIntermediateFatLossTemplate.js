// src/data/templates/thirtyDayIntermediateFatLossTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

export const thirtyDayIntermediateFatLossTemplate = {
  id: 'template_30_day_intermediate_fat_loss',
  name: '30-Day Intermediate Fat Loss',
  description: 'A comprehensive 30-day plan for intermediates aiming to lose weight. Combines heavy strength training with intense metabolic conditioning to build muscle, boost metabolism, and maximize calorie burn. Requires a barbell, dumbbells, kettlebell, and cardio equipment.',
  isTemplate: true,
  daysPerWeek: 5,
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
        { id: generateUniqueId(), type: 'Strength', note: 'Rest 90s between sets.', rest: '90s', exercises: [
            { id: 'bench_press', name: 'Barbell Bench Press', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '8-10', load: '' })) },
            { id: 'pullups', name: 'Pull-ups', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: 'Max', load: '' })), note: 'If you can do more than 12, add weight.' },
            { id: 'single-arm-dumbbell-rows', name: 'Single-Arm Dumbbell Rows', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '10-12', load: '' })), note: 'Perform per arm.' },
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
        { id: generateUniqueId(), type: 'Strength', note: 'Rest 90s between sets.', rest: '90s', exercises: [
            { id: 'squat', name: 'Barbell Back Squat', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '8-10', load: '' })) },
            { id: 'dumbbell-romanian-deadlifts', name: 'Dumbbell RDLs', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '12', load: '' })) },
            { id: 'dumbbell-walking-lunges', name: 'Dumbbell Walking Lunges', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '20', load: '' })) },
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
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Jog / Brisk Walk / Bike', duration: '30' } ], note: 'Maintain a conversational pace. 30-45 mins.' },
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
            { id: 'dumbbell-snatches', name: 'Devil Presses (20-30 lb DBs)', reps: '10' },
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
        { id: generateUniqueId(), type: 'Strength', note: 'Work up to a heavy set of 5, then perform 2 more sets at that weight. Rest 2-3 mins between sets.', rest: '180s', exercises: [
            { id: 'deadlift', name: 'Barbell Deadlift', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '5', load: '' })) },
        ]},
        { id: generateUniqueId(), type: 'Strength', note: '3 rounds, minimal rest (30s).', rest: '30s', exercises: [
            { id: 'barbell-row', name: 'Barbell Rows', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '10', load: '' })) },
            { id: 'sit-up', name: 'Sit-ups', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '15', load: '' })) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'hamstring-stretch', name: 'Seated Forward Fold (60s)' }, { id: 'lat-stretch', name: 'Lat Stretch (60s)' }, { id: null, name: 'Spinal Twists (60s each side)' } ]},
      ],
    },
    { // Day 6
      id: generateUniqueId(),
      name: 'W1D6: Active Recovery',
      blocks: [
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Jog / Brisk Walk / Bike', duration: '30' } ], note: 'Maintain a conversational pace. 30-45 mins.' },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: '10 mins of mobility, focusing on tight areas.'} ] },
      ],
    },
    { // Day 7 - Rest
      id: generateUniqueId(),
      name: 'W1D7: Full Rest',
      blocks: [
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: 'Complete rest day. Focus on sleep, nutrition, and hydration.' } ] },
      ],
    },
    // --- WEEK 2 ---
    { // Day 8
      id: generateUniqueId(),
      name: 'W2D1: Upper Body Volume',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '800m on Stationary Bike' }, { id: null, name: 'Then, 2 rounds:' }, { id: 'band-pull-aparts', name: '15 Band Pull-Aparts' }, { id: 'scapular-pulls', name: '10 Scapular Pulls' } ] },
        { id: generateUniqueId(), type: 'Strength', note: 'Rest 75s between sets.', rest: '75s', exercises: [
            { id: 'overhead_press', name: 'Barbell Overhead Press (OHP)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '8', load: '' })) },
            { id: 'weighted-pullups', name: 'Weighted Pull-ups', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '6-8', load: '' })) },
            { id: 'dumbbell-bench-press', name: 'Superset: DB Bench Press', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '10', load: '' })), note: 'Superset with Barbell Rows' },
            { id: 'barbell-row', name: 'Superset: Barbell Rows', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '12', load: '' })) },
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
        { id: generateUniqueId(), type: 'Strength', note: 'Rest 75s between sets.', rest: '75s', exercises: [
            { id: 'dumbbell-front-squats', name: 'Barbell Front Squats', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '10', load: '' })) },
            { id: 'dumbbell-bulgarian-split-squats', name: 'DB Bulgarian Split Squats', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '10', load: '' })), note: 'Perform per leg.' },
        ]},
        { id: generateUniqueId(), type: 'Conditioning: EMOM', note: 'Perform the prescribed task at the top of each minute for 15 minutes. Rotate through the 3 movements.', minutes: [
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
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Jog / Brisk Walk / Bike', duration: '30' } ], note: '30-45 mins at conversational pace.' },
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
        { id: generateUniqueId(), type: 'Strength', note: '3 rounds for quality, rest 45s between exercises.', rest: '45s', exercises: [
            { id: 'v-up', name: 'V-Ups', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '20', load: '' })) },
            { id: 'sit-up', name: 'Russian Twists (20 lb KB)', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '30', load: '' })) },
            { id: 'plank', name: 'Plank', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '45s', load: '' })) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'lat-stretch', name: 'Lat Stretch (60s)' }, { id: 'doorway-chest-stretch', name: 'Chest Stretch (60s)' }, { id: 'cobra-stretch', name: 'Cobra Stretch (60s)' } ]},
      ],
    },
    { // Day 13
      id: generateUniqueId(),
      name: 'W2D6: Active Recovery',
      blocks: [
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Jog / Brisk Walk / Bike', duration: '30' } ], note: '30-45 mins at conversational pace.' },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: '10-15 mins of full-body stretching.'} ] },
      ],
    },
    { // Day 14 - Rest
      id: generateUniqueId(),
      name: 'W2D7: Full Rest',
      blocks: [
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: 'Complete rest day. Focus on sleep, nutrition, and hydration.' } ] },
      ],
    },
    // --- WEEK 3 ---
    { // Day 15
      id: generateUniqueId(),
      name: 'W3D1: Heavy Upper Body & Sprint',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'stationary-bike', name: '5 mins Stationary Bike' }, { id: null, name: 'Then, 2 rounds:' }, { id: 'band-pull-aparts', name: '15 Band Pull-Aparts' }, { id: 'scapular-pulls', name: '10 Scapular Pulls' } ] },
        { id: generateUniqueId(), type: 'Strength', note: '5x5 - Increase weight each set, aiming for a heavy 5 on the last set. Rest 2-3 mins.', rest: '180s', exercises: [
            { id: 'bench_press', name: 'Barbell Bench Press', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), reps: '5', load: '' })) },
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
        { id: generateUniqueId(), type: 'Strength', note: '5x5 - Increase weight each set, aiming for a heavy 5 on the last set. Rest 2-3 mins.', rest: '180s', exercises: [
            { id: 'squat', name: 'Barbell Back Squat', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), reps: '5', load: '' })) },
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
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Jog / Brisk Walk / Bike', duration: '30' } ], note: '30-45 mins at conversational pace.' },
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
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: null, name: 'Dynamic warm-up: running drills, air squats, and push-ups.'} ] },
        { id: generateUniqueId(), type: 'Conditioning: Chipper', note: 'For Time. Complete all reps of one exercise before moving to the next.', exercises: [
            { id: 'running', name: '1 Mile Run', reps: '1' },
            { id: 'air-squats', name: 'Air Squats', reps: '100' },
            { id: 'sit-up', name: 'Sit-ups', reps: '75' },
            { id: 'push-ups', name: 'Push-ups', reps: '50' },
            { id: 'burpees', name: 'Burpees', reps: '25' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'quad-stretch', name: 'Quad Stretch (60s each)' }, { id: 'hamstring-stretch', name: 'Hamstring Stretch (60s)' }, { id: 'couch-stretch', name: 'Hip Flexor Stretch (60s each)' } ]},
      ],
    },
    { // Day 20
      id: generateUniqueId(),
      name: 'W3D6: Active Recovery',
      blocks: [
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Jog / Brisk Walk / Bike', duration: '30' } ], note: '30-45 mins at conversational pace.' },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: '10-15 mins of stretching.'} ] },
      ],
    },
    { // Day 21 - Rest
      id: generateUniqueId(),
      name: 'W3D7: Full Rest',
      blocks: [
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: 'Complete rest day. You are halfway through — focus on recovery, sleep, and nutrition.' } ] },
      ],
    },
    // --- WEEK 4 & FINAL PUSH ---
    { // Day 22
      id: generateUniqueId(),
      name: 'W4D1: Strength Test & Burner',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: null, name: 'Thorough warm-up for a heavy deadlift. Include glute activation and practice sets.'} ] },
        { id: generateUniqueId(), type: 'Strength', note: 'Work up to a heavy 3-Rep Max for the day. Rest 2-3 mins between sets.', rest: '180s', exercises: [
            { id: 'deadlift', name: 'Barbell Deadlift', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), reps: '3', load: '' })) },
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
        { id: generateUniqueId(), type: 'Conditioning: RFT', note: 'For Time: 21-15-9 reps of each. Use 75-95 lbs for thrusters.', rounds: 1, exercises: [
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
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Jog / Brisk Walk / Bike', duration: '30' } ], note: '30-45 mins at conversational pace.' },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: '10-15 mins of mobility work.'} ] },
      ],
    },
    { // Day 25
      id: generateUniqueId(),
      name: 'W4D4: The Long Chipper',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: null, name: '5 mins light cardio, then a few reps of each movement.'} ] },
        { id: generateUniqueId(), type: 'Conditioning: Chipper', note: 'For Time. Complete all reps of one exercise before moving to the next.', exercises: [
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
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'arm-circles', name: '15 Arm Circles (each way)' }, { id: 'band-pull-aparts', name: '20 Band Pull-Aparts' } ] },
        { id: generateUniqueId(), type: 'Strength', note: '3 rounds for quality. Rest 60-90s between exercises.', rest: '75s', exercises: [
            { id: 'dumbbell-incline-press', name: 'Incline Dumbbell Press', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '15', load: '' })) },
            { id: 'bent-over-dumbbell-rows', name: 'Bent Over DB Rows', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '12', load: '' })) },
            { id: 'dumbbell-lateral-raises', name: 'Lateral Raises', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '15', load: '' })) },
            { id: 'pulley-bicep-curls', name: 'Bicep Curls', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '12', load: '' })) },
            { id: 'tricep-rope-pushdowns', name: 'Tricep Pushdowns', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '15', load: '' })) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'bicep-stretch', name: 'Bicep Stretch (45s each)' }, { id: 'tricep-stretch', name: 'Tricep Stretch (45s each)' }, { id: 'doorway-chest-stretch', name: 'Chest Stretch (45s)' } ]},
      ],
    },
    { // Day 27
      id: generateUniqueId(),
      name: 'W4D6: Active Recovery',
      blocks: [
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Jog / Brisk Walk / Bike', duration: '30' } ], note: '30-45 mins at conversational pace.' },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: '10-15 mins of mobility work.'} ] },
      ],
    },
    { // Day 28 - Rest
      id: generateUniqueId(),
      name: 'W4D7: Full Rest',
      blocks: [
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: 'Complete rest day. Final push starts tomorrow — sleep and recover well.' } ] },
      ],
    },
    { // Day 29
      id: generateUniqueId(),
      name: 'W4D8: Final Full Body Test',
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
      name: 'W4D9: Deload & Mobility',
      blocks: [
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: '20-30 mins very light cardio (walk or bike)', duration: '25' } ] },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: null, name: '20 mins of dedicated stretching and foam rolling. Congratulations on completing 30 days!'} ]},
      ],
    },
  ]
};