// src/data/templates/bodyweightBlastAdvancedTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

export const bodyweightBlastAdvancedTemplate = {
  id: 'template_bodyweight_blast_advanced',
  name: 'Bodyweight Blast (Advanced)',
  description: 'The pinnacle of bodyweight training. This 4-week program is for advanced athletes, focusing on high-skill gymnastics, maximum endurance, and mental toughness.',
  isTemplate: true,
  daysPerWeek: 5,
  meta: {
    type: 'Structured Program',
    level: 'Advanced',
    goal: 'General Fitness',
    equipment: 'Bodyweight'
  },
  workouts: [
    // --- WEEK 1 ---
    { // Day 1
      id: generateUniqueId(),
      name: 'W1D1: Skill & Stamina',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ {id: 'wall-slides', name: 'Wall Slides (10 reps)'}, {id: 'inchworms', name: 'Inchworms (10 reps)'}, {id: 'pistol-squats-box', name: 'Pistol Squats to Box (5 each leg)'} ]},
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Focus on quality over speed. Rest 90s between exercises.', exercises: [
            { id: 'handstand-push-ups', name: 'Strict Handstand Push-ups', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'reps' })) },
            { id: 'pistol-squats', name: 'Pistol Squats (alternating)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '10', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 15, exercises: [
            { id: 'burpees', name: 'Burpee Broad Jumps', reps: '10' },
            { id: 'v-up', name: 'V-Ups', reps: '20' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ {id: 'cross-body-shoulder-stretch', name: 'Shoulder Stretch (60s each)'}, {id: 'pigeon-pose', name: 'Pigeon Pose (90s each)'} ]},
      ],
    },
    { // Day 2
      id: generateUniqueId(),
      name: 'W1D2: Lung Burner',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ {id: 'jumping-jack', name: 'Jumping Jacks (90s)'}, {id: 'air-squats', name: 'Air Squats (30 reps)'}, {id: 'leg-swings', name: 'Leg Swings (30s each)'} ]},
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5, exercises: [ { id: 'run', name: 'Run 400m', reps: '1' }, { id: 'air-squats', name: 'Air Squats', reps: '50' } ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ {id: 'quad-stretch', name: 'Quad Stretch (60s each)'}, {id: 'hamstring-stretch', name: 'Hamstring Stretch (60s each)'} ]},
      ]
    },
    { // Day 3
      id: generateUniqueId(),
      name: 'W1D3: Push-Pull Power',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ {id: 'arm-circles', name: 'Arm Circles (30s each way)'}, {id: 'cat-cow-stretch', name: 'Cat-Cow Stretch (10 reps)'} ]},
        { id: generateUniqueId(), type: 'Conditioning: EMOM', note: 'Every minute on the minute for 14 minutes.', minutes: Array.from({ length: 7 }, () => [{ id: 'hand-release-push-ups', task: 'Max Reps Hand-Release Push-ups' }, { id: null, task: 'Rest 60s' }]).flat()},
        { id: generateUniqueId(), type: 'Bodyweight', exercises: [ { id: 'inverted-rows', name: 'Inverted Rows (feet elevated)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '15', trackingType: 'reps' })) } ], note: "For Inverted Rows, use a sturdy table and elevate your feet on a chair."},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ {id: 'doorway-chest-stretch', name: 'Doorway Chest Stretch (60s)'}, {id: 'lat-stretch', name: 'Lat Stretch (60s)'} ]},
      ]
    },
    { // Day 4
      id: generateUniqueId(),
      name: 'W1D4: Leg Chipper',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ {id: 'glute-bridges', name: 'Glute Bridges (20 reps)'}, {id: 'bodyweight-good-mornings', name: 'Bodyweight Good Mornings (20 reps)'} ]},
        { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
            { id: 'bodyweight-walking-lunge', name: 'Walking Lunges', reps: '100' }, { id: 'air-squats', name: 'Air Squats', reps: '80' }, { id: 'broad-jumps', name: 'Broad Jumps', reps: '60' }, { id: 'tuck-jumps', name: 'Tuck Jumps', reps: '40' }, { id: 'burpees', name: 'Burpees', reps: '20' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ {id: 'pigeon-pose', name: 'Pigeon Pose (90s each)'}, {id: 'quad-stretch', name: 'Quad Stretch (60s each)'} ]},
      ]
    },
    { // Day 5
      id: generateUniqueId(),
      name: 'W1D5: "Cindy" Benchmark',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ {id: 'inverted-rows', name: '5 Inverted Rows'}, {id: 'push-ups', name: '10 Push-ups'}, {id: 'air-squats', name: '15 Squats'} ]},
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 20, exercises: [ { id: 'inverted-rows', name: 'Inverted Rows (feet elevated)', reps: '5' }, { id: 'push-ups', name: 'Push-ups', reps: '10' }, { id: 'air-squats', name: 'Squats', reps: '15' } ], note: 'This is a classic benchmark workout. Use a sturdy table for rows. Record your score!'}
      ]
    },
    // --- WEEK 2 ---
    { // Day 6
      id: generateUniqueId(),
      name: 'W2D1: Gymnastics Volume',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ {id: 'handstand-hold', name: '30s Handstand Hold'}, {id: 'pistol-squats-box', name: '10 Pistol Squats to box'}, {id: 'scapular-pulls', name: '10 Scapular Pulls (from table)'} ]},
        { id: generateUniqueId(), type: 'Conditioning: EMOM', duration: 20, note: 'Perform for 20 minutes total (10 rounds of each).', exercises: [ {id: 'handstand-push-ups', name: 'Odd Mins: 5-10 Handstand Push-ups'}, {id: 'pistol-squats', name: 'Even Mins: 10-15 Pistol Squats (alt.)'} ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ {id: 'pigeon-pose', name: 'Pigeon Pose (90s each)'}, {id: 'cross-body-shoulder-stretch', name: 'Shoulder Stretch (60s each)'} ]},
      ]
    },
    { // Day 7
      id: generateUniqueId(),
      name: 'W2D2: Interval Sprint',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ {id: 'jumping-jack', name: 'Jumping Jacks (60s)'}, {id: 'inchworms', name: 'Inchworms (10 reps)'}, {id: 'burpees', name: '5 Burpees'} ]},
        { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 30, rest: 30, rounds: 10, exercises: [{id: 'burpees', name: 'Max Rep Burpees'}]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ {id: 'cobra-stretch', name: 'Cobra Stretch (60s)'}, {id: 'childs-pose', name: 'Child\'s Pose (90s)'} ]},
      ]
    },
    { // Day 8
      id: generateUniqueId(),
      name: 'W2D3: Upper Body Burnout',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ {id: 'wall-slides', name: 'Wall Slides (15 reps)'}, {id: 'inverted-rows', name: 'Inverted Rows (10 reps)'}, {id: 'push-ups', name: 'Push-ups (15 reps)'} ]},
        { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
          { id: 'handstand-push-ups', name: 'Handstand Push-ups', reps: '50' },
          { id: 'inverted-rows', name: 'Inverted Rows (feet elevated)', reps: '75' },
          { id: 'push-ups', name: 'Push-ups', reps: '100' },
        ], note: 'Partition reps as needed to complete this for time.'},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ {id: 'doorway-chest-stretch', name: 'Doorway Chest Stretch (90s)'}, {id: 'lat-stretch', name: 'Lat Stretch (60s)'} ]},
      ]
    },
    { // Day 9
      id: generateUniqueId(),
      name: 'W2D4: "Angie" Prep',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ {id: 'jumping-jack', name: 'Jumping Jacks (120s)'}, {id: 'arm-circles', name: 'Arm Circles (30s each way)'} ]},
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 1, exercises: [
            { id: 'inverted-rows', name: 'Inverted Rows (feet elevated)', reps: '50' }, { id: 'push-ups', name: 'Push-ups', reps: '50' }, { id: 'sit-up', name: 'Sit-ups', reps: '50' }, { id: 'air-squats', name: 'Squats', reps: '50' },
        ], note: "Half of 'Angie'. Complete all reps of one exercise before moving to the next."},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ {id: 'quad-stretch', name: 'Quad Stretch (60s each)'}, {id: 'hamstring-stretch', name: 'Hamstring Stretch (60s each)'} ]},
      ]
    },
    { // Day 10 - REPLACED ACTIVE RECOVERY
      id: generateUniqueId(),
      name: 'W2D5: Flight & Core',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ {id: 'pogo-hops', name: 'Pogo Hops (60s)'}, {id: 'hollow-body-hold', name: '30s Hollow Body Hold'}, {id: 'glute-bridges', name: '15 Glute Bridges'} ]},
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 20, exercises: [
            { id: 'tuck-jumps', name: 'Tuck Jumps', reps: '15' },
            { id: 'v-up', name: 'V-Ups', reps: '15' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ {id: 'quad-stretch', name: 'Quad Stretch (60s each)'}, {id: 'cobra-stretch', name: 'Cobra Stretch (60s)'} ]},
      ]
    },
    // --- WEEK 3 ---
    { // Day 11
      id: generateUniqueId(),
      name: 'W3D1: "Mary" Benchmark',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ {id: 'handstand-push-ups', name: '3 Strict HSPU'}, {id: 'pistol-squats', name: '6 Pistol Squats'}, {id: 'inverted-rows', name: '9 Inverted Rows'} ]},
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 20, exercises: [
            {id: 'handstand-push-ups', name: 'Handstand Push-ups', reps: '5'}, {id: 'pistol-squats', name: 'Pistol Squats (alternating)', reps: '10'}, {id: 'inverted-rows', name: 'Inverted Rows (feet elevated)', reps: '15'}
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ {id: 'pigeon-pose', name: 'Pigeon Pose (60s each)'}, {id: 'doorway-chest-stretch', name: 'Chest Stretch (60s)'}, {id: 'lat-stretch', name: 'Lat Stretch (60s)'} ]},
      ]
    },
    { // Day 12
      id: generateUniqueId(),
      name: 'W3D2: Leg Endurance',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ {id: 'air-squats', name: 'Air Squats (50 reps)'}, {id: 'leg-swings', name: 'Leg Swings (30s each)'} ]},
        { id: generateUniqueId(), type: 'Bodyweight', exercises: [
          {id: 'air-squats', name: 'Air Squats', sets: [{id: generateUniqueId(), value: '300', trackingType: 'reps'}]}
        ], note: 'For time. Partition reps as needed to complete all 300.'},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ {id: 'quad-stretch', name: 'Quad Stretch (90s each)'}, {id: 'pigeon-pose', name: 'Pigeon Pose (90s each)'} ]},
      ]
    },
    { // Day 13
      id: generateUniqueId(),
      name: 'W3D3: Tabata From Hell',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ {id: 'jumping-jack', name: 'Jumping Jacks (120s)'} ]},
        { id: generateUniqueId(), type: 'Conditioning: Tabata', exercises: [ { id: 'burpees', name: 'Burpees' } ]},
        { id: generateUniqueId(), type: 'Rest', duration: 60, note: 'Rest 1 minute'},
        { id: generateUniqueId(), type: 'Conditioning: Tabata', exercises: [ { id: 'v-up', name: 'V-Ups' } ]},
        { id: generateUniqueId(), type: 'Rest', duration: 60, note: 'Rest 1 minute'},
        { id: generateUniqueId(), type: 'Conditioning: Tabata', exercises: [ { id: 'jumping-lunges', name: 'Jumping Lunges' } ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ {id: 'cobra-stretch', name: 'Cobra Stretch (90s)'} ]},
      ]
    },
    { // Day 14
      id: generateUniqueId(),
      name: 'W3D4: Gymnastics Test',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ {id: 'wall-slides', name: 'Wall Slides (15 reps)'}, {id: 'hollow-body-hold', name: '30s Hollow Hold'} ]},
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 3-5 minutes between max effort attempts.', exercises: [
            {id: 'handstand-hold', name: 'Max Time Handstand Hold', sets: [{id: generateUniqueId(), value: 'Max', trackingType: 'duration'}]},
            {id: 'inverted-rows', name: 'Max Unbroken Inverted Rows (feet elevated)', sets: [{id: generateUniqueId(), value: 'Max', trackingType: 'reps'}]},
            {id: 'pistol-squats', name: 'Max Alternating Pistol Squats in 2 mins', sets: [{id: generateUniqueId(), value: 'Max', trackingType: 'reps'}]},
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ {id: 'childs-pose', name: 'Child\'s Pose (120s)'} ]},
      ]
    },
    { // Day 15 - REPLACED ACTIVE RECOVERY
      id: generateUniqueId(),
      name: 'W3D5: Death By...',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ {id: 'inchworms', name: 'Inchworms (10 reps)'}, {id: 'jumping-jack', name: 'Jumping Jacks (60s)'}, {id: 'air-squats', name: '20 Air Squats'} ]},
        { id: generateUniqueId(), type: 'Conditioning: EMOM', note: "DEATH BY...: On Min 1, do 1 rep. On Min 2, do 2 reps. Continue adding 1 rep per minute until you can't complete the reps in the minute. Your score is your last completed round.",
          exercises: [ {id: 'hand-release-push-ups', name: 'Hand-Release Push-ups'}]
        },
        { id: generateUniqueId(), type: 'Rest', duration: 300, note: 'Rest 5 minutes before the next part.'},
        { id: generateUniqueId(), type: 'Conditioning: EMOM', note: "DEATH BY...: On Min 1, do 2 reps (1 each leg). On Min 2, do 4 reps... Continue adding 2 reps per minute until failure.",
          exercises: [ {id: 'jumping-lunges', name: 'Jumping Lunges'}]
        },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ {id: 'doorway-chest-stretch', name: 'Chest Stretch (60s)'}, {id: 'pigeon-pose', name: 'Pigeon Pose (90s each)'} ]},
      ]
    },
    // --- WEEK 4 ---
    { // Day 16
      id: generateUniqueId(),
      name: 'W4D1: "Murph" Prep',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ {id: 'run', name: 'Run 400m'}, {id: 'jumping-jack', name: 'Jumping Jacks (60s)'} ]},
        { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
          {id: 'run', name: 'Run 800m', reps: '1'},
          {id: 'inverted-rows', name: 'Inverted Rows (feet elevated)', reps: '50'},
          {id: 'push-ups', name: 'Push-ups', reps: '100'},
          {id: 'air-squats', name: 'Air Squats', reps: '150'},
          {id: 'run', name: 'Run 800m', reps: '1'},
        ], note: 'Partition the rows, push-ups, and squats as needed. E.g., 10 rounds of 5 rows, 10 push-ups, 15 squats.'},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ {id: 'lat-stretch', name: 'Lat Stretch (60s)'}, {id: 'doorway-chest-stretch', name: 'Chest Stretch (60s)'}, {id: 'quad-stretch', name: 'Quad Stretch (60s each)'} ]},
      ]
    },
    { // Day 17
      id: generateUniqueId(),
      name: 'W4D2: Leg Blaster',
      blocks: [
          { id: generateUniqueId(), type: 'Warm-up', exercises: [ {id: 'air-squats', name: 'Air Squats (30 reps)'}, {id: 'jumping-lunges', name: 'Jumping Lunges (20 reps)'} ]},
          { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 10, exercises: [
              {id: 'air-squats', name: 'Air Squats', reps: '10'},
              {id: 'jumping-lunges', name: 'Jumping Lunges (alternating)', reps: '10'},
              {id: 'broad-jumps', name: 'Broad Jumps', reps: '10'},
          ]},
          { id: generateUniqueId(), type: 'Cool-down', exercises: [ {id: 'pigeon-pose', name: 'Pigeon Pose (90s each)'}, {id: 'quad-stretch', name: 'Quad Stretch (90s each)'} ]},
      ]
    },
    { // Day 18
      id: generateUniqueId(),
      name: 'W4D3: Interval Gauntlet',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ {id: 'high-knees', name: 'High Knees (60s)'}, {id: 'butt-kicks', name: 'Butt Kicks (60s)'}, {id: 'burpees', name: 'Burpees (10 reps)'} ]},
        { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 50, rest: 10, rounds: 10, exercises: [
            { id: 'burpees', name: 'Burpees' },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ {id: 'cobra-stretch', name: 'Cobra Stretch (90s)'} ]},
      ]
    },
    { // Day 19
      id: generateUniqueId(),
      name: 'W4D4: The Longest Mile',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ {id: 'run', name: 'Run 400m at easy pace'}, {id: 'burpees', name: '5 Burpees'} ]},
        { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
            {id: 'run', name: 'Run 1 Mile + Burpees', reps: '1'},
        ], note: 'For Time: Run 1 mile. At the start, and after every 100m, perform 10 burpees. (Total: 17 stops for 170 burpees).'},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ {id: 'quad-stretch', name: 'Quad Stretch (60s each)'}, {id: 'childs-pose', name: 'Child\'s Pose (120s)'} ]},
      ]
    },
    { // Day 20
      id: generateUniqueId(),
      name: 'W4D5: Deload & Mobility',
      blocks: [
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Jog or Walk', duration: '20' } ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [
            {id: 'pigeon-pose', name: 'Pigeon Pose (2 mins per side)'},
            {id: 'couch-stretch', name: 'Couch Stretch (2 mins per side)'},
            {id: 'childs-pose', name: "Child's Pose (2 mins)"},
        ]}
      ]
    },
  ]
};