// src/data/templates/bodyweightBurnerIntermediateTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

export const bodyweightBurnerIntermediateTemplate = {
  id: 'template_bodyweight_burner_intermediate',
  name: 'Bodyweight Burner (Intermediate)',
  description: 'Ramp up the intensity with this 4-week intermediate plan. Longer work periods and more demanding circuits will accelerate your weight loss journey.',
  isTemplate: true,
  daysPerWeek: 5,
  meta: {
    type: 'Structured Program',
    level: 'Intermediate',
    goal: 'Lose Weight',
    equipment: 'Bodyweight'
  },
  workouts: [
    // --- WEEK 1 ---
    { // Day 1
      id: generateUniqueId(),
      name: 'W1D1: AMRAP Challenge',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'jumping-jack', name: 'Jumping Jacks (90s)' }, { id: 'high-knees', name: 'High Knees (90s)' } ] },
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 20, exercises: [
            { id: 'air-squats', name: 'Air Squats', reps: '15' },
            { id: 'push-ups', name: 'Push-ups', reps: '10' },
            { id: 'mountain-climbers', name: 'Mountain Climbers', reps: '30' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'quad-stretch', name: 'Quad Stretch (45s each)' }, { id: 'hamstring-stretch', name: 'Hamstring Stretch (45s each)' } ]},
      ],
    },
    { // Day 2
      id: generateUniqueId(),
      name: 'W1D2: RFT Speed Test',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'torso-twists', name: 'Torso Twists (60s)' }, { id: 'leg-swings', name: 'Leg Swings (45s each)' } ] },
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5, exercises: [
          { id: 'jumping-jack', name: 'Jumping Jacks', reps: '50' },
          { id: 'sit-up', name: 'Sit-ups', reps: '25' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'cobra-stretch', name: 'Cobra Stretch (60s)' } ] }
      ]
    },
    { // Day 3
      id: generateUniqueId(),
      name: 'W1D3: Intense Chipper',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'air-squats', name: 'Air Squats (25 reps)' }, { id: 'glute-bridges', name: 'Glute Bridges (20 reps)' } ] },
        { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
            { id: 'jumping-lunges', name: 'Jumping Lunges', reps: '60' },
            { id: 'air-squats', name: 'Air Squats', reps: '50' },
            { id: 'v-up', name: 'V-Ups', reps: '40' },
            { id: 'high-knees', name: 'High Knees', reps: '100' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'pigeon-pose', name: 'Pigeon Pose (60s each)' } ] }
      ]
    },
    { // Day 4
      id: generateUniqueId(),
      name: 'W1D4: Power Intervals',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 40, rest: 20, rounds: 10, exercises: [
          { id: 'broad-jumps', name: 'Broad Jumps' },
          { id: 'tuck-jumps', name: 'Tuck Jumps' },
        ], note: 'Alternate between Broad Jumps and Tuck Jumps each work interval.'}
      ]
    },
    { // Day 5
      id: generateUniqueId(),
      name: 'W1D5: The Century Mark',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 1, exercises: [
            { id: 'air-squats', name: 'Air Squats', reps: '100' },
            { id: 'push-ups', name: 'Push-ups', reps: '75' },
            { id: 'sit-up', name: 'Sit-ups', reps: '50' },
            { id: 'burpees', name: 'Burpees', reps: '25' },
        ]}
      ]
    },
    // --- WEEK 2 ---
    { // Day 6
      id: generateUniqueId(),
      name: 'W2D1: AMRAP Up-tempo',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 22, exercises: [
            { id: 'air-squats', name: 'Air Squats', reps: '20' },
            { id: 'push-ups', name: 'Push-ups', reps: '15' },
            { id: 'v-up', name: 'V-Ups', reps: '10' },
        ]},
      ]
    },
    { // Day 7
      id: generateUniqueId(),
      name: 'W2D2: For Time Frenzy',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 8, exercises: [
          { id: 'jumping-jack', name: 'Jumping Jacks', reps: '40' },
          { id: 'mountain-climbers', name: 'Mountain Climbers', reps: '20' },
        ]},
      ]
    },
    { // Day 8
      id: generateUniqueId(),
      name: 'W2D3: Burpee EMOM',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: EMOM', minutes: Array.from({ length: 10 }, () => ({ id: generateUniqueId(), task: '10-12 Burpees' })), note: 'Perform the burpees at the top of each minute for 10 minutes.'}
      ]
    },
    { // Day 9
      id: generateUniqueId(),
      name: 'W2D4: Advanced Intervals',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 45, rest: 15, rounds: 12, exercises: [
          { id: 'jumping-lunges', name: 'Jumping Lunges' },
        ]}
      ]
    },
    { // Day 10
      id: generateUniqueId(),
      name: 'W2D5: Ascending/Descending Ladder',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 1, exercises: [
            { id: null, name: '10 Rounds of:', reps: '' },
            { id: 'burpees', name: '1-2-3-4-5-6-7-8-9-10 Burpees' },
            { id: 'sit-up', name: '10-9-8-7-6-5-4-3-2-1 Sit-ups' },
        ], note: "In round 1, do 1 burpee and 10 sit-ups. In round 2, do 2 burpees and 9 sit-ups, etc."}
      ]
    },
    // --- WEEK 3 ---
    { // Day 11
      id: generateUniqueId(),
      name: 'W3D1: The 25 Minute Sweat',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 25, exercises: [
            { id: 'air-squats', name: 'Air Squats', reps: '20' },
            { id: 'push-ups', name: 'Push-ups', reps: '15' },
            { id: 'burpees', name: 'Burpees', reps: '10' },
        ]},
      ]
    },
    { // Day 12
      id: generateUniqueId(),
      name: 'W3D2: Cardio Chipper II',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
            { id: 'jumping-jack', name: 'Jumping Jacks', reps: '200' },
            { id: 'mountain-climbers', name: 'Mountain Climbers', reps: '150' },
            { id: 'sit-up', name: 'Sit-ups', reps: '100' },
        ]},
      ]
    },
    { // Day 13
      id: generateUniqueId(),
      name: 'W3D3: Leg Day For Time',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 8, exercises: [
          { id: 'jumping-lunges', name: 'Jumping Lunges', reps: '20' },
          { id: 'air-squats', name: 'Air Squats', reps: '30' },
        ]},
      ]
    },
    { // Day 14
      id: generateUniqueId(),
      name: 'W3D4: Max Effort Intervals',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 50, rest: 10, rounds: 10, exercises: [ { id: 'burpees', name: 'Burpees' } ] }
      ]
    },
    { // Day 15
      id: generateUniqueId(),
      name: 'W3D5: "Angie" Prep',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 1, exercises: [
            { id: 'pullups', name: 'Bodyweight Rows', reps: '50' },
            { id: 'push-ups', name: 'Push-ups', reps: '50' },
            { id: 'sit-up', name: 'Sit-ups', reps: '50' },
            { id: 'air-squats', name: 'Air Squats', reps: '50' },
        ], note: "This is a half version of the benchmark workout 'Angie'."}
      ]
    },
    // --- WEEK 4 ---
    { // Day 16
      id: generateUniqueId(),
      name: 'W4D1: The Final AMRAP',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 30, exercises: [
            { id: 'air-squats', name: 'Air Squats', reps: '25' },
            { id: 'push-ups', name: 'Push-ups', reps: '20' },
            { id: 'burpees', name: 'Burpees', reps: '15' },
        ]},
      ]
    },
    { // Day 17
      id: generateUniqueId(),
      name: 'W4D2: RFT Finisher',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 10, exercises: [
          { id: 'jumping-lunges', name: 'Jumping Lunges', reps: '20' },
          { id: 'v-up', name: 'V-Ups', reps: '10' },
        ]},
      ]
    },
    { // Day 18
      id: generateUniqueId(),
      name: 'W4D3: EMOM Finisher',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: EMOM', minutes: Array.from({ length: 15 }, () => ({ id: generateUniqueId(), task: '12 Burpees' })), note: 'Perform 12 burpees at the top of each minute for 15 minutes.'}
      ]
    },
    { // Day 19
      id: generateUniqueId(),
      name: 'W4D4: Tabata Mash-up',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Tabata', exercises: [ { id: 'push-ups', name: 'Push-ups' } ] },
        { id: 'rest', type: 'Cardio', exercises: [{ id: null, name: 'Rest', duration: '1' }]},
        { id: generateUniqueId(), type: 'Conditioning: Tabata', exercises: [ { id: 'air-squats', name: 'Air Squats' } ] },
        { id: 'rest', type: 'Cardio', exercises: [{ id: null, name: 'Rest', duration: '1' }]},
        { id: generateUniqueId(), type: 'Conditioning: Tabata', exercises: [ { id: 'jumping-jack', name: 'Jumping Jacks' } ] },
      ]
    },
    { // Day 20
      id: generateUniqueId(),
      name: 'W4D5: The Final Chipper',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
            { id: 'burpees', name: 'Burpees', reps: '100' },
            { id: 'air-squats', name: 'Air Squats', reps: '150' },
            { id: 'sit-up', name: 'Sit-ups', reps: '200' },
        ]},
      ]
    },
  ]
};