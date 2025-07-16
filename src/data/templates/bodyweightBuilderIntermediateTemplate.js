// src/data/templates/bodyweightBuilderIntermediateTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

export const bodyweightBuilderIntermediateTemplate = {
  id: 'template_bodyweight_builder_intermediate',
  name: 'Bodyweight Builder (Intermediate)',
  description: 'Take your physique to the next level. This 4-week intermediate program uses advanced tempos, unilateral work, and higher volume to maximize muscle growth without weights.',
  isTemplate: true,
  daysPerWeek: 4,
  meta: {
    type: 'Structured Program',
    level: 'Intermediate',
    goal: 'Build Muscle',
    equipment: 'Bodyweight'
  },
  workouts: [
    // --- WEEK 1 ---
    { // Day 1
      id: generateUniqueId(),
      name: 'W1D1: Upper Body Push',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'arm-circles', name: 'Arm Circles (45s each way)' }, { id: 'push-ups', name: 'Push-ups (15 reps)' } ] },
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 60-75s between sets.', exercises: [
            { id: 'push-ups', name: 'Tempo Push-ups (4s down, 2s pause)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '10-12', trackingType: 'reps' })) },
            { id: 'dips-chair', name: 'Dips (feet elevated if possible)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '15-20', trackingType: 'reps' })) },
            { id: 'pike-push-ups', name: 'Pike Push-ups (feet elevated)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '10', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'tricep-stretch', name: 'Tricep Stretch (45s each)' }, { id: 'doorway-chest-stretch', name: 'Doorway Chest Stretch (45s)' } ]},
      ],
    },
    { // Day 2
      id: generateUniqueId(),
      name: 'W1D2: Lower Body',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'leg-swings', name: 'Leg Swings (45s each leg)' }, { id: 'air-squats', name: 'Air Squats (20 reps)' } ] },
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 60-75s between sets.', exercises: [
          { id: 'bodyweight-bulgarian-split-squats', name: 'Bulgarian Split Squats (3s down)', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '12', trackingType: 'reps' })) },
          { id: 'single-leg-glute-bridge', name: 'Single-Leg Glute Bridges (2s pause at top)', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '15-20', trackingType: 'reps' })) },
          { id: 'dumbbell-calf-raises', name: 'Bodyweight Calf Raises (on a step)', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '25', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'pigeon-pose', name: 'Pigeon Pose (75s each)' } ] }
      ]
    },
    { // Day 3
      id: generateUniqueId(),
      name: 'W1D3: Upper Body Pull',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'band-pull-aparts', name: 'Band Pull-Aparts (20 reps)' }, { id: 'scapular-pulls', name: 'Scapular Pulls (12 reps)' } ] },
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 60-75s between sets.', exercises: [
          { id: 'inverted-rows', name: 'Inverted Rows (feet elevated, 3s down)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '12-15', trackingType: 'reps' })) },
          { id: 'eccentric-negative-pullups', name: 'Negative Pull-ups (8s descent)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '4', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'lat-stretch', name: 'Lat Stretch (60s each)' } ] }
      ]
    },
    { // Day 4
      id: generateUniqueId(),
      name: 'W1D4: Full Body Power',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 18, exercises: [
          { id: 'archer-push-ups', name: 'Archer Push-ups', reps: '10' },
          { id: 'jumping-squats', name: 'Jumping Squats', reps: '15' },
          { id: 'v-up', name: 'V-Ups', reps: '12' },
        ]}
      ]
    },
    // --- WEEK 2 ---
    { // Day 5
      id: generateUniqueId(),
      name: 'W2D1: Upper Body Push',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'arm-circles', name: 'Arm Circles (45s each way)' }, { id: 'push-ups', name: 'Push-ups (20 reps)' } ] },
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 60s between sets.', exercises: [
            { id: 'push-ups', name: 'Tempo Push-ups (4s down, 2s pause)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '12-15', trackingType: 'reps' })) },
            { id: 'dips-chair', name: 'Dips (feet elevated if possible)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '20-25', trackingType: 'reps' })) },
            { id: 'pike-push-ups', name: 'Pike Push-ups (feet elevated)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '12-15', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'tricep-stretch', name: 'Tricep Stretch (60s each)' }, { id: 'doorway-chest-stretch', name: 'Doorway Chest Stretch (60s)' } ]},
      ],
    },
    { // Day 6
      id: generateUniqueId(),
      name: 'W2D2: Lower Body',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'leg-swings', name: 'Leg Swings (45s each leg)' }, { id: 'air-squats', name: 'Air Squats (25 reps)' } ] },
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 60s between sets.', exercises: [
          { id: 'bodyweight-bulgarian-split-squats', name: 'Bulgarian Split Squats (3s down)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '15', trackingType: 'reps' })) },
          { id: 'single-leg-glute-bridge', name: 'Single-Leg Glute Bridges (3s pause at top)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '20', trackingType: 'reps' })) },
          { id: 'dumbbell-calf-raises', name: 'Bodyweight Calf Raises (on a step)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '30', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'pigeon-pose', name: 'Pigeon Pose (75s each)' } ] }
      ]
    },
    { // Day 7
      id: generateUniqueId(),
      name: 'W2D3: Upper Body Pull',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'band-pull-aparts', name: 'Band Pull-Aparts (25 reps)' }, { id: 'scapular-pulls', name: 'Scapular Pulls (15 reps)' } ] },
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 60s between sets.', exercises: [
          { id: 'inverted-rows', name: 'Inverted Rows (feet elevated, 4s down)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '15', trackingType: 'reps' })) },
          { id: 'eccentric-negative-pullups', name: 'Negative Pull-ups (10s descent)', sets: Array.from({ length: 6 }, () => ({ id: generateUniqueId(), value: '3-4', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'lat-stretch', name: 'Lat Stretch (60s each)' } ] }
      ]
    },
    { // Day 8
      id: generateUniqueId(),
      name: 'W2D4: Full Body Power',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 20, exercises: [
          { id: 'archer-push-ups', name: 'Archer Push-ups', reps: '12' },
          { id: 'jumping-squats', name: 'Jumping Squats', reps: '20' },
          { id: 'v-up', name: 'V-Ups', reps: '15' },
        ]}
      ]
    },
    // --- WEEK 3 & 4 continue to increase volume and time under tension ---
    { // Day 9
      id: generateUniqueId(),
      name: 'W3D1: Upper Body Push Volume',
      blocks: [
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 45s between sets.', exercises: [
            { id: 'push-ups', name: 'Tempo Push-ups (4s down, 2s pause)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '15', trackingType: 'reps' })) },
            { id: 'dips-chair', name: 'Dips (feet elevated)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '20', trackingType: 'reps' })) },
            { id: 'pike-push-ups', name: 'Pike Push-ups (feet elevated)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '15', trackingType: 'reps' })) },
        ]},
      ],
    },
    { // Day 10
      id: generateUniqueId(),
      name: 'W3D2: Lower Body Volume',
      blocks: [
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 45s between sets.', exercises: [
          { id: 'bodyweight-bulgarian-split-squats', name: 'Bulgarian Split Squats (4s down)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '15', trackingType: 'reps' })) },
          { id: 'single-leg-glute-bridge', name: 'Single-Leg Glute Bridges (4s pause)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '20', trackingType: 'reps' })) },
        ]},
      ]
    },
    { // Day 11
      id: generateUniqueId(),
      name: 'W3D3: Upper Body Pull Volume',
      blocks: [
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 45s between sets.', exercises: [
          { id: 'inverted-rows', name: 'Inverted Rows (feet elevated, 4s down)', sets: Array.from({ length: 6 }, () => ({ id: generateUniqueId(), value: '15-20', trackingType: 'reps' })) },
          { id: 'eccentric-negative-pullups', name: 'Negative Pull-ups (10s descent)', sets: Array.from({ length: 8 }, () => ({ id: generateUniqueId(), value: '3', trackingType: 'reps' })) },
        ]},
      ]
    },
    { // Day 12
      id: generateUniqueId(),
      name: 'W3D4: Chipper Challenge',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
          { id: 'jumping-lunges', name: 'Jumping Lunges', reps: '100' },
          { id: 'plyometric-push-ups', name: 'Plyometric Push-ups', reps: '50' },
          { id: 'v-up', name: 'V-Ups', reps: '100' },
        ]}
      ]
    },
    // --- WEEK 4 ---
    { // Day 13
      id: generateUniqueId(),
      name: 'W4D1: Max Reps Push',
      blocks: [
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Go to failure on each set. Rest 60s.', exercises: [
            { id: 'push-ups', name: 'Push-ups to Failure', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'reps' })) },
            { id: 'dips-chair', name: 'Dips to Failure', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'reps' })) },
        ]},
      ],
    },
    { // Day 14
      id: generateUniqueId(),
      name: 'W4D2: Max Reps Legs',
      blocks: [
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Go to failure on each set. Rest 60s.', exercises: [
          { id: 'air-squats', name: 'Air Squats to Failure', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'reps' })) },
          { id: 'bodyweight-lunge', name: 'Alternating Lunges to Failure', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'reps' })) },
        ]},
      ]
    },
    { // Day 15
      id: generateUniqueId(),
      name: 'W4D3: Max Reps Pull',
      blocks: [
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Go to failure on each set. Rest 90s.', exercises: [
          { id: 'pullups', name: 'Pull-ups to Failure', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'reps' })) },
          { id: 'inverted-rows', name: 'Inverted Rows to Failure', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'reps' })) },
        ]},
      ]
    },
    { // Day 16
      id: generateUniqueId(),
      name: 'W4D4: Final Test',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5, exercises: [
          { id: 'plyometric-push-ups', name: 'Plyometric Push-ups', reps: '15' },
          { id: 'jumping-squats', name: 'Jumping Squats', reps: '20' },
          { id: 'v-up', name: 'V-Ups', reps: '25' },
        ]}
      ]
    },
    // Days 17-20 are Active Recovery
    { id: generateUniqueId(), name: 'W4D5: Active Recovery', blocks: [ { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Walk or Jog', duration: '30' } ] } ]},
    { id: generateUniqueId(), name: 'W4D6: Active Recovery', blocks: [ { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Walk or Jog', duration: '30' } ] } ]},
    { id: generateUniqueId(), name: 'W4D7: Active Recovery', blocks: [ { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Walk or Jog', duration: '30' } ] } ]},
    { id: generateUniqueId(), name: 'W4D8: Active Recovery', blocks: [ { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Walk or Jog', duration: '30' } ] } ]},
  ]
};