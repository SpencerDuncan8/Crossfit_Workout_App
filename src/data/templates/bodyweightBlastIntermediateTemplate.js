// src/data/templates/bodyweightBlastIntermediateTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

export const bodyweightBlastIntermediateTemplate = {
  id: 'template_bodyweight_blast_intermediate',
  name: 'Bodyweight Blast (Intermediate)',
  description: 'A 4-week program that builds on foundational strength. It increases volume and introduces more challenging bodyweight movements to boost your endurance and power.',
  isTemplate: true,
  daysPerWeek: 5,
  meta: {
    type: 'Structured Program',
    level: 'Intermediate',
    goal: 'General Fitness',
    equipment: 'Bodyweight'
  },
  workouts: [
    // --- WEEK 1 ---
    { // Day 1
      id: generateUniqueId(),
      name: 'W1D1: Increased Intensity',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'jumping-jack', name: 'Jumping Jacks (90s)' }, { id: 'arm-circles', name: '15 Arm Circles (each way)' }, { id: 'cat-cow-stretch', name: '10 Cat-Cow Stretches' } ]},
        { id: generateUniqueId(), type: 'Bodyweight', exercises: [
            { id: 'pike-push-ups', name: 'Pike Push-ups', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '12', trackingType: 'reps' })) },
            { id: 'air-squats', name: 'Squats', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '25', trackingType: 'reps' })) },
            { id: 'plank', name: 'Plank with Shoulder Taps', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '45', trackingType: 'duration' })) },
        ]},
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 12, exercises: [
            { id: 'burpees', name: 'Burpees', reps: '8' }, { id: 'jumping-lunges', name: 'Jumping Lunges', reps: '16' }, { id: 'v-up', name: 'V-Ups', reps: '8' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'quad-stretch', name: 'Quad Stretch (45s each)' }, { id: 'hamstring-stretch', name: 'Hamstring Stretch (45s each)' } ]},
      ],
    },
    { // Day 2
      id: generateUniqueId(),
      name: 'W1D2: Tabata Twist',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'high-knees', name: 'High Knees (90s)' }, { id: 'butt-kicks', name: 'Butt Kicks (90s)' } ] },
        { id: generateUniqueId(), type: 'Conditioning: Tabata', exercises: [ { id: 'high-knees', name: 'High Knees' }, { id: 'tuck-jumps', name: 'Tuck Jumps' } ], note: 'Alternate between High Knees and Tuck Jumps for the 8 rounds.' },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'childs-pose', name: 'Childs Pose (90s)' } ] }
      ]
    },
    { // Day 3
      id: generateUniqueId(),
      name: 'W1D3: Upper Endurance',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'inchworms', name: 'Inchworms (12 reps)' }, { id: 'shoulder-taps', name: 'Shoulder Taps (30 reps)' } ] },
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5, exercises: [ { id: 'pike-push-ups', name: 'Pike Push-ups', reps: '15' }, { id: 'dips-chair', name: 'Dips (using chair/bench)', reps: '20' } ] },
        { id: generateUniqueId(), type: 'Bodyweight', exercises: [ { id: 'push-ups', name: 'Push-ups (Max Reps)', sets: [{ id: generateUniqueId(), value: 'Max', trackingType: 'reps' },{ id: generateUniqueId(), value: 'Max', trackingType: 'reps' }] } ] },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'tricep-stretch', name: 'Tricep Stretch (45s each)' } ] }
      ]
    },
    { // Day 4
      id: generateUniqueId(),
      name: 'W1D4: Longer Chipper',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'glute-bridges', name: 'Glute Bridges (25 reps)' }, { id: 'bodyweight-good-mornings', name: 'Bodyweight Good Mornings (20 reps)' } ] },
        { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
            { id: 'air-squats', name: 'Squats', reps: '120' }, { id: 'bodyweight-walking-lunge', name: 'Walking Lunges', reps: '100' }, { id: 'dumbbell-calf-raises', name: 'Calf Raises', reps: '80' }, { id: 'jumping-jack', name: 'Jumping Jacks', reps: '60' }, { id: 'burpees', name: 'Burpees', reps: '40' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'pigeon-pose', name: 'Pigeon Pose (75s each)' } ] }
      ]
    },
    { // Day 5
      id: generateUniqueId(),
      name: 'W1D5: EMOM Challenge',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: EMOM', minutes: [
            { id: generateUniqueId(), task: '18 Air Squats' }, { id: generateUniqueId(), task: '15 Push-ups' }, { id: generateUniqueId(), task: '18 Sit-ups' }, { id: generateUniqueId(), task: '50s Plank' }, { id: generateUniqueId(), task: 'Rest' },
            { id: generateUniqueId(), task: '18 Air Squats' }, { id: generateUniqueId(), task: '15 Push-ups' }, { id: generateUniqueId(), task: '18 Sit-ups' }, { id: generateUniqueId(), task: '50s Plank' }, { id: generateUniqueId(), task: 'Rest' },
        ]}
      ]
    },
    // --- WEEK 2 ---
    { // Day 6
      id: generateUniqueId(),
      name: 'W2D1: Leg Stamina',
      blocks: [
          { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'jumping-jack', name: 'Jumping Jacks (90s)' }, { id: 'torso-twists', name: 'Torso Twists (45s)' } ] },
          { id: generateUniqueId(), type: 'Bodyweight', exercises: [
              { id: 'bodyweight-bulgarian-split-squats', name: 'Bulgarian Split Squats (L)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '15', trackingType: 'reps' })) },
              { id: 'bodyweight-bulgarian-split-squats', name: 'Bulgarian Split Squats (R)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '15', trackingType: 'reps' })) },
              { id: 'push-ups', name: 'Decline Push-ups', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '20', trackingType: 'reps' })) },
          ]},
          { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'jump-rope', name: 'Jog in Place or Jump Rope', duration: 12 } ] }
      ]
    },
    { // Day 7
      id: generateUniqueId(),
      name: 'W2D2: AMRAP Mania',
      blocks: [
          { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 25, exercises: [
              { id: 'hand-release-push-ups', name: 'Hand-Release Push-ups', reps: '10' }, { id: 'air-squats', name: 'Air Squats', reps: '20' }, { id: 'v-up', name: 'V-Ups', reps: '10' },
          ]}
      ]
    },
    { // Day 8
      id: generateUniqueId(),
      name: 'W2D3: Double Tabata',
      blocks: [
          { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'high-knees', name: 'High Knees (90s)' }, { id: 'butt-kicks', name: 'Butt Kicks (90s)' } ] },
          { id: generateUniqueId(), type: 'Conditioning: Tabata', exercises: [ { id: 'burpees', name: 'Burpees' } ]},
          { id: 'rest', type: 'Cardio', exercises: [{ id: null, name: 'Rest', duration: '3' }]},
          { id: generateUniqueId(), type: 'Conditioning: Tabata', exercises: [ { id: 'air-squats', name: 'Air Squats' } ]},
          { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'cobra-stretch', name: 'Cobra Stretch (90s)' } ] }
      ]
    },
    { // Day 9
      id: generateUniqueId(),
      name: 'W2D4: The Descender',
      blocks: [
          { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 1, exercises: [
              { id: 'burpees', name: 'Burpees', reps: '10' }, { id: 'air-squats', name: 'Squats', reps: '20' }, { id: 'sit-up', name: 'Sit-ups', reps: '30' },
              { id: 'burpees', name: 'Burpees', reps: '8' }, { id: 'air-squats', name: 'Squats', reps: '16' }, { id: 'sit-up', name: 'Sit-ups', reps: '24' },
              { id: 'burpees', name: 'Burpees', reps: '6' }, { id: 'air-squats', name: 'Squats', reps: '12' }, { id: 'sit-up', name: 'Sit-ups', reps: '18' },
              { id: 'burpees', name: 'Burpees', reps: '4' }, { id: 'air-squats', name: 'Squats', reps: '8' }, { id: 'sit-up', name: 'Sit-ups', reps: '12' },
              { id: 'burpees', name: 'Burpees', reps: '2' }, { id: 'air-squats', name: 'Squats', reps: '4' }, { id: 'sit-up', name: 'Sit-ups', reps: '6' },
          ]}
      ]
    },
    { // Day 10
      id: generateUniqueId(),
      name: 'W2D5: EMOM Overload',
      blocks: [
          { id: generateUniqueId(), type: 'Conditioning: EMOM', minutes: Array.from({ length: 4 }, () => [
            { id: generateUniqueId(), task: '18 Push-ups' }, { id: generateUniqueId(), task: '24 Lunges' }, { id: generateUniqueId(), task: '30 Sit-ups' }, { id: generateUniqueId(), task: 'Rest' }
          ]).flat()}
      ]
    },
    // --- WEEK 3 ---
    { // Day 11
      id: generateUniqueId(),
      name: 'W3D1: Explosive Power',
      blocks: [
          { id: generateUniqueId(), type: 'Warm-up', exercises: [{id: 'pogo-hops', name: 'Pogo Hops (90s)'}, {id: 'air-squats', name: 'Air Squats (25 reps)'}]},
          { id: generateUniqueId(), type: 'Bodyweight', exercises: [
              { id: 'jump-squats', name: 'Jumping Squats', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '20', trackingType: 'reps' })) },
              { id: 'plyometric-push-ups', name: 'Plyo Push-ups', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '12', trackingType: 'reps' })) },
          ]},
          { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 15, exercises: [{id: 'broad-jumps', name: 'Broad Jumps', reps: '5'}, {id: 'box-jumps', name: 'Burpee Box Jumps (use stair)', reps: '8'}]}
      ]
    },
    { // Day 12
      id: generateUniqueId(),
      name: 'W3D2: The Grinder II',
      blocks: [
          { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 4, exercises: [
              {id: 'high-knees', name: 'Run 400m (or 2 min high knees)', reps: '1'}, {id: 'air-squats', name: 'Air Squats', reps: '50'}
          ]}
      ]
    },
    { // Day 13
      id: generateUniqueId(),
      name: 'W3D3: Core Inferno',
      blocks: [
          { id: generateUniqueId(), type: 'Warm-up', exercises: [{id: 'bird-dog', name: 'Bird-dog (15 each side)'}, {id: 'dead-bug', name: 'Dead-bug (15 each side)'}]},
          { id: generateUniqueId(), type: 'Bodyweight', exercises: [
              {id: 'v-up', name: 'V-Ups', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '20', trackingType: 'reps' })) },
              {id: 'plank', name: 'Side Plank (L)', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '60', trackingType: 'duration' })) },
              {id: 'plank', name: 'Side Plank (R)', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '60', trackingType: 'duration' })) },
          ]}
      ]
    },
    { // Day 14
      id: generateUniqueId(),
      name: 'W3D4: Continuous Burpees',
      blocks: [
          { id: generateUniqueId(), type: 'Conditioning: EMOM', minutes: [
              {id: generateUniqueId(), task: 'Min 1: 3 Burpees'}, {id: generateUniqueId(), task: 'Min 2: 4 Burpees'},
              {id: generateUniqueId(), task: 'Min 3: 5 Burpees'}, {id: generateUniqueId(), task: 'Min 4: 6 Burpees'},
              {id: generateUniqueId(), task: 'Min 5: 7 Burpees'}, {id: generateUniqueId(), task: 'Min 6: 8 Burpees'},
              {id: generateUniqueId(), task: 'Continue adding 1 burpee per minute until you cannot complete the reps within the minute.'},
          ]}
      ]
    },
    { // Day 15
      id: generateUniqueId(),
      name: 'W3D5: Max Rep Chipper',
      blocks: [
          { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
              {id: 'push-ups', name: 'Push-ups', reps: '75'}, {id: 'sit-up', name: 'Sit-ups', reps: '75'},
              {id: 'air-squats', name: 'Squats', reps: '75'}, {id: 'jump-rope', name: 'Double Unders (or 150 singles)', reps: '75'},
              {id: 'bodyweight-lunge', name: 'Lunges', reps: '75'}, {id: 'burpees', name: 'Burpees', reps: '75'},
          ]}
      ]
    },
    // --- WEEK 4 ---
    { // Day 16
      id: generateUniqueId(),
      name: 'W4D1: Benchmark "Angie" Prep',
      blocks: [
          { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'push-ups', name: '3 Rounds: 10 Pushups, 15 Squats, 20 Situps'} ]},
          { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
              {id: 'bodyweight-rows', name: 'Bodyweight Rows (or Banded Pull-downs)', reps: '75'},
              {id: 'push-ups', name: 'Push-ups', reps: '75'}, {id: 'sit-up', name: 'Sit-ups', reps: '75'}, {id: 'air-squats', name: 'Squats', reps: '75'},
          ]}
      ]
    },
    { // Day 17
      id: generateUniqueId(),
      name: 'W4D2: Pistol Practice',
      blocks: [
          { id: generateUniqueId(), type: 'Bodyweight', exercises: [
              {id: 'pistol-squats-box', name: 'Pistol Squats (to a box, alternating)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '10', trackingType: 'reps' })) },
              {id: 'glute-bridges', name: 'Single-Leg Glute Bridges', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '20', trackingType: 'reps' })) },
          ]},
          { id: generateUniqueId(), type: 'Cardio', exercises: [ {id: 'wall-sit', name: 'Wall Sit (with weight if possible)', duration: '5'} ] }
      ]
    },
    { // Day 18
      id: generateUniqueId(),
      name: 'W4D3: Interval Overload',
      blocks: [
          { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 45, rest: 15, rounds: 6, exercises: [{id: 'broad-jumps', name: 'Broad Jumps'}] },
          { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 35, rest: 10, rounds: 6, exercises: [{id: 'jumping-jack', name: 'Jumping Jacks'}] },
      ]
    },
    { // Day 19
      id: generateUniqueId(),
      name: 'W4D4: The Final Chipper II',
      blocks: [
          { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
              {id: 'burpees', name: 'Burpees', reps: '75'}, {id: 'bodyweight-walking-lunge', name: 'Walking Lunges', reps: '60'},
              {id: 'pike-push-ups', name: 'Pike Push-ups', reps: '45'}, {id: 'tuck-jumps', name: 'Tuck Jumps', reps: '30'},
              {id: 'handstand-hold', name: 'Handstand Hold (against wall)', reps: '90s'},
          ]}
      ]
    },
    { // Day 20
      id: generateUniqueId(),
      name: 'W4D5: The "Filthy Fifty"',
      blocks: [
          { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 1, exercises: [
              {id: 'box-jumps', name: 'Box Jumps (on stair/curb)', reps: '50'}, {id: 'jumping-jack', name: 'Jumping Jacks', reps: '50'},
              {id: 'simulated-kettlebell-swing', name: 'Kettlebell Swings (use backpack/heavy object)', reps: '50'}, {id: 'bodyweight-lunge', name: 'Walking Lunges', reps: '50'},
              {id: 'knees-to-elbows', name: 'Knees to Elbows', reps: '50'}, {id: 'push-press-simulation', name: 'Push Press (use backpack)', reps: '50'},
              {id: 'back-extensions-supermans', name: 'Back Extensions (supermans)', reps: '50'}, {id: 'simulated-wall-ball', name: 'Wall Ball Shots (squat and toss pillow)', reps: '50'},
              {id: 'burpees', name: 'Burpees', reps: '50'}, {id: 'jump-rope', name: 'Double Unders (or 100 singles)', reps: '50'},
          ]}
      ]
    },
  ]
};