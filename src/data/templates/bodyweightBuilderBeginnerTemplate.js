// src/data/templates/bodyweightBuilderBeginnerTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

export const bodyweightBuilderBeginnerTemplate = {
  id: 'template_bodyweight_builder_beginner',
  name: 'Bodyweight Builder (Beginner)',
  description: 'Start your muscle-building journey without any weights. This 4-week program uses time under tension and targeted exercises to build a solid foundation of strength and size.',
  isTemplate: true,
  daysPerWeek: 4,
  meta: {
    type: 'Structured Program',
    level: 'Beginner',
    goal: 'Build Muscle',
    equipment: 'Bodyweight'
  },
  workouts: [
    // --- WEEK 1 ---
    { // Day 1
      id: generateUniqueId(),
      name: 'W1D1: Upper Body Push',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'arm-circles', name: 'Arm Circles (30s each way)' }, { id: 'push-ups', name: 'Incline Push-ups (10 reps)' } ] },
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 60-90s between sets.', exercises: [
            { id: 'push-ups', name: 'Tempo Push-ups (3s down)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '8-10', trackingType: 'reps' })) },
            { id: 'dips-chair', name: 'Dips (using chair/bench)', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '10-12', trackingType: 'reps' })) },
            { id: 'pike-push-ups', name: 'Pike Push-ups', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '6-8', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'tricep-stretch', name: 'Tricep Stretch (30s each)' }, { id: 'doorway-chest-stretch', name: 'Doorway Chest Stretch (30s)' } ]},
      ],
    },
    { // Day 2
      id: generateUniqueId(),
      name: 'W1D2: Lower Body',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'leg-swings', name: 'Leg Swings (30s each leg)' }, { id: 'air-squats', name: 'Air Squats (15 reps)' } ] },
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 60-90s between sets.', exercises: [
          { id: 'air-squats', name: 'Paused Squats (2s pause at bottom)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '15', trackingType: 'reps' })) },
          { id: 'bodyweight-lunge', name: 'Alternating Reverse Lunges', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '20', trackingType: 'reps' })) },
          { id: 'single-leg-glute-bridge', name: 'Single-Leg Glute Bridges', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '12-15', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'pigeon-pose', name: 'Pigeon Pose (60s each)' } ] }
      ]
    },
    { // Day 3
      id: generateUniqueId(),
      name: 'W1D3: Upper Body Pull',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'band-pull-aparts', name: 'Band Pull-Aparts (15 reps)' }, { id: 'scapular-pulls', name: 'Scapular Pulls (10 reps)' } ] },
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 60-90s between sets.', exercises: [
          { id: 'inverted-rows', name: 'Inverted Rows (Slow Eccentric)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '8-10', trackingType: 'reps' })) },
          { id: 'eccentric-negative-pullups', name: 'Negative Pull-ups (3-5s descent)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '3', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'lat-stretch', name: 'Lat Stretch (45s each)' } ] }
      ]
    },
    { // Day 4
      id: generateUniqueId(),
      name: 'W1D4: Full Body Finisher',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 15, exercises: [
          { id: 'archer-push-ups', name: 'Archer Push-ups (or easier variation)', reps: '6' },
          { id: 'jumping-lunges', name: 'Jumping Lunges', reps: '12' },
          { id: 'v-up', name: 'V-Ups', reps: '9' },
        ]}
      ]
    },
    // --- WEEK 2 ---
    { // Day 5
      id: generateUniqueId(),
      name: 'W2D1: Upper Body Push',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'arm-circles', name: 'Arm Circles (30s each way)' }, { id: 'push-ups', name: 'Incline Push-ups (12 reps)' } ] },
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 60s between sets.', exercises: [
            { id: 'push-ups', name: 'Tempo Push-ups (3s down)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '10-12', trackingType: 'reps' })) },
            { id: 'dips-chair', name: 'Dips (using chair/bench)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '12-15', trackingType: 'reps' })) },
            { id: 'pike-push-ups', name: 'Pike Push-ups', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '8-10', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'tricep-stretch', name: 'Tricep Stretch (45s each)' }, { id: 'doorway-chest-stretch', name: 'Doorway Chest Stretch (45s)' } ]},
      ],
    },
    { // Day 6
      id: generateUniqueId(),
      name: 'W2D2: Lower Body',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'leg-swings', name: 'Leg Swings (30s each leg)' }, { id: 'air-squats', name: 'Air Squats (20 reps)' } ] },
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 60s between sets.', exercises: [
          { id: 'air-squats', name: 'Paused Squats (3s pause at bottom)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '15', trackingType: 'reps' })) },
          { id: 'bodyweight-lunge', name: 'Alternating Reverse Lunges', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '24', trackingType: 'reps' })) },
          { id: 'single-leg-glute-bridge', name: 'Single-Leg Glute Bridges', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '15-20', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'pigeon-pose', name: 'Pigeon Pose (60s each)' } ] }
      ]
    },
    { // Day 7
      id: generateUniqueId(),
      name: 'W2D3: Upper Body Pull',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'band-pull-aparts', name: 'Band Pull-Aparts (20 reps)' }, { id: 'scapular-pulls', name: 'Scapular Pulls (12 reps)' } ] },
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 60s between sets.', exercises: [
          { id: 'inverted-rows', name: 'Inverted Rows (Slow Eccentric)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '10-12', trackingType: 'reps' })) },
          { id: 'eccentric-negative-pullups', name: 'Negative Pull-ups (5s descent)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '4', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'lat-stretch', name: 'Lat Stretch (60s each)' } ] }
      ]
    },
    { // Day 8
      id: generateUniqueId(),
      name: 'W2D4: Full Body Finisher',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 18, exercises: [
          { id: 'archer-push-ups', name: 'Archer Push-ups', reps: '8' },
          { id: 'jumping-lunges', name: 'Jumping Lunges', reps: '16' },
          { id: 'v-up', name: 'V-Ups', reps: '12' },
        ]}
      ]
    },
    // --- WEEK 3 ---
    { // Day 9
      id: generateUniqueId(),
      name: 'W3D1: Upper Body Push',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'arm-circles', name: 'Arm Circles (30s each way)' }, { id: 'push-ups', name: 'Incline Push-ups (15 reps)' } ] },
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 45-60s between sets.', exercises: [
            { id: 'push-ups', name: 'Tempo Push-ups (4s down)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '12-15', trackingType: 'reps' })) },
            { id: 'dips-chair', name: 'Dips (using chair/bench)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '15-20', trackingType: 'reps' })) },
            { id: 'pike-push-ups', name: 'Pike Push-ups', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '10-12', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'tricep-stretch', name: 'Tricep Stretch (60s each)' }, { id: 'doorway-chest-stretch', name: 'Doorway Chest Stretch (60s)' } ]},
      ],
    },
    { // Day 10
      id: generateUniqueId(),
      name: 'W3D2: Lower Body',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'leg-swings', name: 'Leg Swings (30s each leg)' }, { id: 'air-squats', name: 'Air Squats (25 reps)' } ] },
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 45-60s between sets.', exercises: [
          { id: 'air-squats', name: 'Paused Squats (3s pause at bottom)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '20', trackingType: 'reps' })) },
          { id: 'bodyweight-lunge', name: 'Alternating Reverse Lunges', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '30', trackingType: 'reps' })) },
          { id: 'single-leg-glute-bridge', name: 'Single-Leg Glute Bridges', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '20', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'pigeon-pose', name: 'Pigeon Pose (60s each)' } ] }
      ]
    },
    { // Day 11
      id: generateUniqueId(),
      name: 'W3D3: Upper Body Pull',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'band-pull-aparts', name: 'Band Pull-Aparts (20 reps)' }, { id: 'scapular-pulls', name: 'Scapular Pulls (15 reps)' } ] },
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 45-60s between sets.', exercises: [
          { id: 'inverted-rows', name: 'Inverted Rows (Slow Eccentric)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '12-15', trackingType: 'reps' })) },
          { id: 'eccentric-negative-pullups', name: 'Negative Pull-ups (5-8s descent)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '5', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'lat-stretch', name: 'Lat Stretch (60s each)' } ] }
      ]
    },
    { // Day 12
      id: generateUniqueId(),
      name: 'W3D4: Full Body Finisher',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 20, exercises: [
          { id: 'archer-push-ups', name: 'Archer Push-ups', reps: '10' },
          { id: 'jumping-lunges', name: 'Jumping Lunges', reps: '20' },
          { id: 'v-up', name: 'V-Ups', reps: '15' },
        ]}
      ]
    },
    // --- WEEK 4 ---
    { // Day 13
      id: generateUniqueId(),
      name: 'W4D1: Upper Body Push',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'arm-circles', name: 'Arm Circles (30s each way)' }, { id: 'push-ups', name: 'Incline Push-ups (20 reps)' } ] },
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 30-45s between sets. Push to near failure.', exercises: [
            { id: 'push-ups', name: 'Tempo Push-ups (4s down)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'reps' })) },
            { id: 'dips-chair', name: 'Dips (using chair/bench)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'reps' })) },
            { id: 'pike-push-ups', name: 'Pike Push-ups', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'tricep-stretch', name: 'Tricep Stretch (60s each)' }, { id: 'doorway-chest-stretch', name: 'Doorway Chest Stretch (60s)' } ]},
      ],
    },
    { // Day 14
      id: generateUniqueId(),
      name: 'W4D2: Lower Body',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'leg-swings', name: 'Leg Swings (30s each leg)' }, { id: 'air-squats', name: 'Air Squats (30 reps)' } ] },
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 30-45s between sets. Push to near failure.', exercises: [
          { id: 'air-squats', name: 'Paused Squats (3s pause at bottom)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'reps' })) },
          { id: 'bodyweight-lunge', name: 'Alternating Reverse Lunges', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'reps' })) },
          { id: 'single-leg-glute-bridge', name: 'Single-Leg Glute Bridges', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'pigeon-pose', name: 'Pigeon Pose (90s each)' } ] }
      ]
    },
    { // Day 15
      id: generateUniqueId(),
      name: 'W4D3: Upper Body Pull',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'band-pull-aparts', name: 'Band Pull-Aparts (25 reps)' }, { id: 'scapular-pulls', name: 'Scapular Pulls (15 reps)' } ] },
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 30-45s between sets. Push to near failure.', exercises: [
          { id: 'inverted-rows', name: 'Inverted Rows (Slow Eccentric)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'reps' })) },
          { id: 'eccentric-negative-pullups', name: 'Negative Pull-ups (5-8s descent)', sets: Array.from({ length: 6 }, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'lat-stretch', name: 'Lat Stretch (60s each)' } ] }
      ]
    },
    { // Day 16
      id: generateUniqueId(),
      name: 'W4D4: Full Body Finisher',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 22, exercises: [
          { id: 'archer-push-ups', name: 'Archer Push-ups', reps: '12' },
          { id: 'jumping-lunges', name: 'Jumping Lunges', reps: '24' },
          { id: 'v-up', name: 'V-Ups', reps: '18' },
        ]}
      ]
    },
    { // Day 17 Active Recovery
        id: generateUniqueId(), name: 'W4D5: Active Recovery',
        blocks: [ { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Walk or Jog', duration: '30' } ] } ]
    },
    { // Day 18 Active Recovery
        id: generateUniqueId(), name: 'W4D6: Active Recovery',
        blocks: [ { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Walk or Jog', duration: '30' } ] } ]
    },
    { // Day 19 Active Recovery
        id: generateUniqueId(), name: 'W4D7: Active Recovery',
        blocks: [ { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Walk or Jog', duration: '30' } ] } ]
    },
    { // Day 20 Active Recovery
        id: generateUniqueId(), name: 'W4D8: Active Recovery',
        blocks: [ { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Walk or Jog', duration: '30' } ] } ]
    },
  ]
};