// src/data/templates/bodyweightBurnerBeginnerTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

export const bodyweightBurnerBeginnerTemplate = {
  id: 'template_bodyweight_burner_beginner',
  name: 'Bodyweight Burner (Beginner)',
  description: 'A 4-week program designed for weight loss using only your bodyweight. These high-energy workouts will keep your heart rate up to maximize calorie burn.',
  isTemplate: true,
  daysPerWeek: 5,
  meta: {
    type: 'Structured Program',
    level: 'Beginner',
    goal: 'Lose Weight',
    equipment: 'Bodyweight'
  },
  workouts: [
    // --- WEEK 1 ---
    { // Day 1
      id: generateUniqueId(),
      name: 'W1D1: Full Body Ignition',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'jumping-jack', name: 'Jumping Jacks (60s)' }, { id: 'high-knees', name: 'High Knees (60s)' } ] },
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 15, exercises: [
            { id: 'air-squats', name: 'Air Squats', reps: '10' },
            { id: 'push-ups', name: 'Incline Push-ups (or on knees)', reps: '8' },
            { id: 'mountain-climbers', name: 'Mountain Climbers', reps: '20' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'quad-stretch', name: 'Quad Stretch (30s each)' }, { id: 'hamstring-stretch', name: 'Hamstring Stretch (30s each)' } ]},
      ],
    },
    { // Day 2
      id: generateUniqueId(),
      name: 'W1D2: Cardio Core',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'torso-twists', name: 'Torso Twists (60s)' }, { id: 'leg-swings', name: 'Leg Swings (30s each)' } ] },
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 4, exercises: [
          { id: 'jumping-jack', name: 'Jumping Jacks', reps: '30' },
          { id: 'sit-up', name: 'Sit-ups', reps: '15' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'cobra-stretch', name: 'Cobra Stretch (60s)' } ] }
      ]
    },
    { // Day 3
      id: generateUniqueId(),
      name: 'W1D3: Leg Burnout',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'air-squats', name: 'Air Squats (20 reps)' }, { id: 'glute-bridges', name: 'Glute Bridges (15 reps)' } ] },
        { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
            { id: 'bodyweight-walking-lunge', name: 'Walking Lunges', reps: '50' },
            { id: 'air-squats', name: 'Air Squats', reps: '40' },
            { id: 'glute-bridges', name: 'Glute Bridges', reps: '30' },
            { id: 'jumping-jack', name: 'Jumping Jacks', reps: '20' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'pigeon-pose', name: 'Pigeon Pose (60s each)' } ] }
      ]
    },
    { // Day 4
      id: generateUniqueId(),
      name: 'W1D4: Interval Sweat',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 30, rest: 15, rounds: 10, exercises: [
          { id: 'high-knees', name: 'High Knees' },
          { id: 'butt-kicks', name: 'Butt Kicks' },
        ], note: 'Alternate between High Knees and Butt Kicks each work interval.'}
      ]
    },
    { // Day 5
      id: generateUniqueId(),
      name: 'W1D5: The Friday 50',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 1, exercises: [
            { id: 'air-squats', name: 'Air Squats', reps: '50' },
            { id: 'jumping-jack', name: 'Jumping Jacks', reps: '50' },
            { id: 'bodyweight-lunge', name: 'Alternating Lunges', reps: '50' },
            { id: 'sit-up', name: 'Sit-ups', reps: '50' },
        ]}
      ]
    },
    // --- WEEK 2 ---
    { // Day 6
      id: generateUniqueId(),
      name: 'W2D1: AMRAP Up-tempo',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'jumping-jack', name: 'Jumping Jacks (90s)' }, { id: 'high-knees', name: 'High Knees (60s)' } ] },
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 18, exercises: [
            { id: 'air-squats', name: 'Air Squats', reps: '12' },
            { id: 'push-ups', name: 'Incline Push-ups', reps: '10' },
            { id: 'mountain-climbers', name: 'Mountain Climbers', reps: '24' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'hamstring-stretch', name: 'Hamstring Stretch (45s each)' } ]},
      ]
    },
    { // Day 7
      id: generateUniqueId(),
      name: 'W2D2: Core & Cardio II',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'torso-twists', name: 'Torso Twists (60s)' }, { id: 'leg-swings', name: 'Leg Swings (30s each)' } ] },
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5, exercises: [
          { id: 'jumping-jack', name: 'Jumping Jacks', reps: '40' },
          { id: 'sit-up', name: 'Sit-ups', reps: '20' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'cobra-stretch', name: 'Cobra Stretch (60s)' } ] }
      ]
    },
    { // Day 8
      id: generateUniqueId(),
      name: 'W2D3: Burpee Burn',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'air-squats', name: 'Air Squats (20 reps)' }, { id: 'inchworms', name: 'Inchworms (10 reps)' } ] },
        { id: generateUniqueId(), type: 'Conditioning: EMOM', minutes: Array.from({ length: 8 }, () => ({ id: generateUniqueId(), task: '5-8 Burpees' })), note: 'Perform the burpees at the top of each minute for 8 minutes. Rest the remaining time.'}
      ]
    },
    { // Day 9
      id: generateUniqueId(),
      name: 'W2D4: Interval Blast',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 35, rest: 15, rounds: 12, exercises: [
          { id: 'high-knees', name: 'High Knees' },
          { id: 'jumping-jack', name: 'Jumping Jacks' },
        ], note: 'Alternate between High Knees and Jumping Jacks each work interval.'}
      ]
    },
    { // Day 10
      id: generateUniqueId(),
      name: 'W2D5: Descending Ladder',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 1, exercises: [
            { id: null, name: '10-9-8-7-6-5-4-3-2-1 reps of:', reps: '' },
            { id: 'burpees', name: 'Burpees', reps: '' },
            { id: 'sit-up', name: 'Sit-ups', reps: '' },
        ]}
      ]
    },
    // --- WEEK 3 ---
    { // Day 11
      id: generateUniqueId(),
      name: 'W3D1: The 20 Minute Sweat',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 20, exercises: [
            { id: 'air-squats', name: 'Air Squats', reps: '15' },
            { id: 'push-ups', name: 'Push-ups', reps: '10' },
            { id: 'mountain-climbers', name: 'Mountain Climbers', reps: '30' },
        ]},
      ]
    },
    { // Day 12
      id: generateUniqueId(),
      name: 'W3D2: Cardio Chipper',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
            { id: 'jumping-jack', name: 'Jumping Jacks', reps: '150' },
            { id: 'high-knees', name: 'High Knees (each leg)', reps: '100' },
            { id: 'sit-up', name: 'Sit-ups', reps: '50' },
        ]},
      ]
    },
    { // Day 13
      id: generateUniqueId(),
      name: 'W3D3: Leg Day, Cardio Style',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5, exercises: [
          { id: 'bodyweight-walking-lunge', name: 'Walking Lunges', reps: '20' },
          { id: 'air-squats', name: 'Air Squats', reps: '20' },
        ]},
      ]
    },
    { // Day 14
      id: generateUniqueId(),
      name: 'W3D4: Intense Intervals',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 40, rest: 20, rounds: 10, exercises: [ { id: 'burpees', name: 'Burpees' } ] }
      ]
    },
    { // Day 15
      id: generateUniqueId(),
      name: 'W3D5: Full Body Test',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 3, exercises: [
            { id: 'burpees', name: 'Burpees', reps: '21' },
            { id: 'sit-up', name: 'Sit-ups', reps: '21' },
            { id: 'air-squats', name: 'Air Squats', reps: '21' },
        ]}
      ]
    },
    // --- WEEK 4 ---
    { // Day 16
      id: generateUniqueId(),
      name: 'W4D1: The Final AMRAP',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 25, exercises: [
            { id: 'air-squats', name: 'Air Squats', reps: '15' },
            { id: 'push-ups', name: 'Push-ups', reps: '10' },
            { id: 'jumping-jack', name: 'Jumping Jacks', reps: '30' },
        ]},
      ]
    },
    { // Day 17
      id: generateUniqueId(),
      name: 'W4D2: RFT Finisher',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 10, exercises: [
          { id: 'jumping-lunges', name: 'Jumping Lunges', reps: '10' },
          { id: 'sit-up', name: 'Sit-ups', reps: '10' },
        ]},
      ]
    },
    { // Day 18
      id: generateUniqueId(),
      name: 'W4D3: EMOM Endurance',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: EMOM', minutes: Array.from({ length: 12 }, () => ({ id: generateUniqueId(), task: '10 Burpees' })), note: 'At the top of each minute, perform 10 burpees. If you cannot finish within the minute, rest the next minute and continue.'}
      ]
    },
    { // Day 19
      id: generateUniqueId(),
      name: 'W4D4: Tabata Burnout',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Tabata', exercises: [ { id: 'mountain-climbers', name: 'Mountain Climbers' } ] },
        { id: 'rest', type: 'Cardio', exercises: [{ id: null, name: 'Rest', duration: '2' }]},
        { id: generateUniqueId(), type: 'Conditioning: Tabata', exercises: [ { id: 'air-squats', name: 'Air Squats' } ] },
      ]
    },
    { // Day 20
      id: generateUniqueId(),
      name: 'W4D5: Chipper Challenge',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
            { id: 'jumping-jack', name: 'Jumping Jacks', reps: '200' },
            { id: 'bodyweight-walking-lunge', name: 'Walking Lunges', reps: '150' },
            { id: 'sit-up', name: 'Sit-ups', reps: '100' },
            { id: 'push-ups', name: 'Push-ups', reps: '50' },
        ]},
      ]
    },
  ]
};