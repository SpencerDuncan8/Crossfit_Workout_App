// src/data/templates/homeIronFinisherTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
const makeSets = (count, reps) =>
  Array.from({ length: count }, () => ({ id: generateUniqueId(), reps, load: '' }));

const heavyNote = 'Main lift: 5x5 at the same weight. Hit all 5 sets x 5 reps with good form → add 5 lbs next week. Miss reps → repeat the weight.';
const volumeNote = 'Same weight across all sets. Hit the target reps on every set → add weight next session. Miss reps → repeat the weight.';

const MCGILL_NOTE = 'McGill Big 3 first — 6 reps x 6 second hold each exercise.';

// ─────────────────────────────────────────────
// WARM-UPS — McGill Big 3 + 5 min bike + day-specific activation
// ─────────────────────────────────────────────
const mcgillBig3 = () => ([
  { id: 'mcgill-curl-up', name: 'McGill Curl-up — 6 x 6s hold' },
  { id: 'side-plank', name: 'Side Plank — 6 x 6s hold each side' },
  { id: 'bird-dog', name: 'Bird Dog — 6 x 6s hold each side' },
  { id: 'stationary-bike', name: '5 min easy bike' },
]);

const warmupChest = () => ({
  id: generateUniqueId(), type: 'Warm-up', note: MCGILL_NOTE,
  exercises: [
    ...mcgillBig3(),
    { id: 'arm-circles', name: 'Arm Circles — 30s each way' },
    { id: 'band-pull-aparts', name: 'Band Pull-Aparts — 15 reps' },
  ]
});

const warmupBack = () => ({
  id: generateUniqueId(), type: 'Warm-up', note: MCGILL_NOTE,
  exercises: [
    ...mcgillBig3(),
    { id: 'scapular-pulls', name: 'Scapular Pulls — 10 reps' },
    { id: 'band-pull-aparts', name: 'Band Pull-Aparts — 15 reps' },
  ]
});

const warmupArms = () => ({
  id: generateUniqueId(), type: 'Warm-up', note: MCGILL_NOTE,
  exercises: [
    ...mcgillBig3(),
    { id: 'arm-circles', name: 'Arm Circles — 30s each way' },
    { id: 'band-pull-aparts', name: 'Band Pull-Aparts — 15 reps' },
  ]
});

const warmupShoulders = () => ({
  id: generateUniqueId(), type: 'Warm-up', note: MCGILL_NOTE,
  exercises: [
    ...mcgillBig3(),
    { id: 'arm-circles', name: 'Arm Circles — 30s each way' },
    { id: 'wall-slides', name: 'Wall Slides — 10 reps' },
    { id: 'band-pull-aparts', name: 'Band Pull-Aparts — 15 reps' },
  ]
});

const warmupLegs = () => ({
  id: generateUniqueId(), type: 'Warm-up', note: MCGILL_NOTE,
  exercises: [
    ...mcgillBig3(),
    { id: 'air-squats', name: 'Air Squats — 15 reps' },
    { id: 'glute-bridges', name: 'Glute Bridges — 15 reps' },
    { id: 'leg-swings', name: 'Leg Swings — 30s each leg each way' },
  ]
});

const warmupConditioning = () => ({
  id: generateUniqueId(), type: 'Warm-up', note: MCGILL_NOTE,
  exercises: [
    ...mcgillBig3(),
    { id: 'jumping-jack', name: 'Jumping Jacks — 60s' },
    { id: 'air-squats', name: 'Air Squats — 15 reps' },
  ]
});

// ─────────────────────────────────────────────
// STRENGTH DAYS
// ─────────────────────────────────────────────

// Day 1 — Chest
const chestDay = () => ([
  warmupChest(),
  {
    id: generateUniqueId(), type: 'Strength', rest: '150s',
    note: heavyNote,
    exercises: [
      { id: 'dumbbell-bench-press', name: 'Flat DB Press', note: 'Main lift. Heavy, controlled reps.', sets: makeSets(5, '5') },
    ]
  },
  {
    id: generateUniqueId(), type: 'Strength', rest: '90s',
    note: volumeNote,
    exercises: [
      { id: 'dumbbell-incline-press', name: 'Incline DB Press', sets: makeSets(4, '12') },
      { id: 'dips', name: 'Dips', note: 'Lean slightly forward to bias the chest.', sets: makeSets(4, '12') },
      { id: 'dumbbell-pullover', name: 'DB Pullover', sets: makeSets(4, '12') },
      { id: 'dumbbell-incline-fly', name: 'Incline DB Fly', sets: makeSets(3, '12') },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'stationary-bike', name: '5 min easy bike cooldown' },
      { id: 'doorway-chest-stretch', name: 'Doorway Chest Stretch (60s)' },
      { id: 'lat-stretch', name: 'Lat Stretch (60s each side)' },
      { id: 'tricep-stretch', name: 'Tricep Stretch (45s each side)' },
    ]
  }
]);

// Day 2 — Back
const backDay = () => ([
  warmupBack(),
  {
    id: generateUniqueId(), type: 'Strength', rest: '90s',
    note: volumeNote,
    exercises: [
      { id: 'pullups', name: 'Pull-ups', note: 'Aim for 5-12 reps per set. Strict form, full range.', sets: makeSets(4, '5-12') },
      { id: 'single-arm-dumbbell-rows', name: 'One Arm DB Row', note: 'Per side.', sets: makeSets(4, '12') },
      { id: 'lat-pulldowns', name: 'Cable Pulldown', sets: makeSets(4, '12') },
      { id: 'straight-arm-pulldowns', name: 'Straight-Arm Pulldown', sets: makeSets(4, '12') },
      { id: 'meadows-row', name: 'Meadows Row', note: 'Per side.', sets: makeSets(4, '12') },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'stationary-bike', name: '5 min easy bike cooldown' },
      { id: 'lat-stretch', name: 'Lat Stretch (60s each side)' },
      { id: 'cross-body-shoulder-stretch', name: 'Cross-Body Shoulder Stretch (45s each)' },
      { id: 'childs-pose', name: "Child's Pose (90s)" },
    ]
  }
]);

// Day 4 — Arms
const armsDay = () => ([
  warmupArms(),
  {
    id: generateUniqueId(), type: 'Strength', rest: '75s',
    note: volumeNote,
    exercises: [
      { id: 'ez-bar-curl', name: 'EZ Bar Curl', sets: makeSets(4, '12') },
      { id: 'skull-crusher', name: 'Skull Crusher', sets: makeSets(4, '12') },
      { id: 'dumbbell-curl', name: 'Bicep Curl', sets: makeSets(3, '12') },
      { id: 'cable-tricep-pushdowns', name: 'Tricep Pushdown', sets: makeSets(3, '12') },
      { id: 'hammer-curls', name: 'Hammer Curl', sets: makeSets(3, '12') },
      { id: 'overhead-tricep-extensions', name: 'Overhead DB Extension', sets: makeSets(3, '12') },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'stationary-bike', name: '5 min easy bike cooldown' },
      { id: 'bicep-stretch', name: 'Bicep Stretch (45s each side)' },
      { id: 'tricep-stretch', name: 'Tricep Stretch (45s each side)' },
      { id: 'doorway-chest-stretch', name: 'Doorway Chest Stretch (60s)' },
    ]
  }
]);

// Day 5 — Shoulders
const shouldersDay = () => ([
  warmupShoulders(),
  {
    id: generateUniqueId(), type: 'Strength', rest: '150s',
    note: heavyNote,
    exercises: [
      { id: 'overhead_press', name: 'OHP', note: 'Main lift. Brace your core and squeeze your glutes.', sets: makeSets(5, '5') },
    ]
  },
  {
    id: generateUniqueId(), type: 'Strength', rest: '75s',
    note: volumeNote,
    exercises: [
      { id: 'dumbbell-shoulder-press', name: 'Seated DB Shoulder Press', sets: makeSets(4, '12') },
      { id: 'dumbbell-lateral-raises', name: 'DB Side Raise', sets: makeSets(4, '12') },
      { id: 'chest-supported-rear-delt-fly', name: 'Chest Supported Rear Delt Fly', sets: makeSets(4, '12') },
      { id: 'dumbbell-front-raises', name: 'Front Raise', sets: makeSets(3, '12') },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'stationary-bike', name: '5 min easy bike cooldown' },
      { id: 'cross-body-shoulder-stretch', name: 'Cross-Body Shoulder Stretch (45s each)' },
      { id: 'doorway-chest-stretch', name: 'Doorway Chest Stretch (60s)' },
      { id: 'tricep-stretch', name: 'Tricep Stretch (45s each side)' },
    ]
  }
]);

// Day 6 — Legs
const legsDay = () => ([
  warmupLegs(),
  {
    id: generateUniqueId(), type: 'Strength', rest: '180s',
    note: 'Main lift: 5x5 at the same weight. Hit all 5 sets x 5 reps → add 10 lbs next week. Moderate load only, neutral spine, stop 2 reps shy of failure.',
    exercises: [
      { id: 'romanian-deadlift', name: 'RDL', note: 'Main lift. Hinge at the hips, keep the bar close, flat back.', sets: makeSets(5, '5') },
    ]
  },
  {
    id: generateUniqueId(), type: 'Strength', rest: '90s',
    note: volumeNote,
    exercises: [
      { id: 'dumbbell-goblet-squats', name: 'Goblet Squat', sets: makeSets(3, '12') },
      { id: 'leg-extensions', name: 'Leg Extension', sets: makeSets(3, '12') },
      { id: 'leg-curls', name: 'Leg Curl', sets: makeSets(3, '12') },
      { id: 'dumbbell-walking-lunges', name: 'Lunges', note: 'Per leg.', sets: makeSets(3, '12') },
      { id: 'dumbbell-calf-raises', name: 'Calf Raise', sets: makeSets(3, '20') },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'stationary-bike', name: '5 min easy bike cooldown' },
      { id: 'couch-stretch', name: 'Couch Stretch (60s each side)' },
      { id: 'hamstring-stretch', name: 'Seated Hamstring Stretch (60s)' },
      { id: 'pigeon-pose', name: 'Pigeon Pose (60s each side)' },
      { id: 'calf-stretch', name: 'Calf Stretch (45s each side)' },
    ]
  }
]);

// ─────────────────────────────────────────────
// DAY 7 — REST (walk, stretch, no training)
// ─────────────────────────────────────────────
const restDay = () => ([
  {
    id: generateUniqueId(), type: 'Cardio',
    note: 'Rest day. Easy walk at a conversational pace — no training today.',
    exercises: [{ id: 'walking', name: 'Easy Walk', duration: '30' }]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'childs-pose', name: "Child's Pose (90s)" },
      { id: 'cobra-stretch', name: 'Cobra Stretch (60s)' },
      { id: 'hamstring-stretch', name: 'Hamstring Stretch (60s)' },
      { id: 'couch-stretch', name: 'Couch Stretch (60s each side)' },
      { id: 'lat-stretch', name: 'Lat Stretch (60s each side)' },
    ]
  }
]);

// ─────────────────────────────────────────────
// DAY 3 — CARDIO / ABS (one workout per week)
// ─────────────────────────────────────────────
const conditioningCooldown = (extra = []) => ({
  id: generateUniqueId(), type: 'Cool-down',
  exercises: [
    { id: 'stationary-bike', name: '5 min easy bike cooldown' },
    { id: 'cobra-stretch', name: 'Cobra Stretch (60s)' },
    { id: 'childs-pose', name: "Child's Pose (90s)" },
    ...extra,
  ]
});

// Week 1 — AMRAP 18
const w1Conditioning = () => ([
  warmupConditioning(),
  {
    id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 18,
    note: 'As many rounds as possible in 18 minutes. Keep a steady pace. Record rounds + reps.',
    exercises: [
      { id: 'push-ups', name: 'Push-ups', reps: '10' },
      { id: 'air-squats', name: 'Air Squats', reps: '15' },
      { id: 'sit-up', name: 'Sit-ups', reps: '10' },
      { id: 'jump-rope', name: 'Jump Rope', reps: '30s' },
    ]
  },
  conditioningCooldown(),
]);

// Week 2 — EMOM 24 (6 rounds of 4 minutes)
const emomTasks = ['12 KB Swings', '10 Burpees', '20 Leg Raises', 'Rest'];
const w2Conditioning = () => ([
  warmupConditioning(),
  {
    id: generateUniqueId(), type: 'Conditioning: EMOM',
    note: '6 rounds of 4 minutes (24 min total). Complete the reps at the top of each minute — rest fills the remainder.',
    minutes: Array.from({ length: 24 }, (_, i) => ({
      id: generateUniqueId(),
      task: `Min ${i + 1}: ${emomTasks[i % 4]}`,
    }))
  },
  conditioningCooldown(),
]);

// Week 3 — RFT 5 Rounds
const w3Conditioning = () => ([
  warmupConditioning(),
  {
    id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5,
    note: '5 rounds for time. Record your total time. Keep form clean on the thrusters as you fatigue.',
    exercises: [
      { id: 'dumbbell-thrusters', name: 'DB Thrusters', reps: '15' },
      { id: 'sit-up', name: 'Sit-ups', reps: '20' },
      { id: 'running', name: 'Run 200m', reps: '1' },
    ]
  },
  conditioningCooldown(),
]);

// Week 4 — Chipper
const w4Conditioning = () => ([
  warmupConditioning(),
  {
    id: generateUniqueId(), type: 'Conditioning: Chipper',
    note: 'For time. Complete all reps of each movement before moving on. Break sets early to stay smooth.',
    exercises: [
      { id: 'jump-rope', name: 'Jump Rope', reps: '100' },
      { id: 'ab-wheel-rollout', name: 'Ab Wheel Rollouts', reps: '40' },
      { id: 'burpees', name: 'Burpees', reps: '30' },
      { id: 'leg-raises', name: 'Leg Raises', reps: '40' },
      { id: 'jump-rope', name: 'Jump Rope', reps: '100' },
    ]
  },
  conditioningCooldown(),
]);

// ─────────────────────────────────────────────
// TEMPLATE EXPORT
// ─────────────────────────────────────────────
export const homeIronFinisherTemplate = {
  id: 'template_home_iron_finisher',
  name: 'Home Iron: Finisher',
  description: 'A 4-week Bro Split: Chest, Back, Cardio/Abs, Arms, Shoulders, Legs, Rest. The strength days repeat each week (5x5 on the main lift, then 12-rep volume work), while Day 3 rotates through four different conditioning sessions — AMRAP, EMOM, RFT, and a Chipper. Every session starts with the McGill Big 3 and a 5 minute bike, and ends with a bike cooldown and stretching.',
  isTemplate: true,
  daysPerWeek: 7,
  meta: {
    type: 'Structured Program',
    level: 'Intermediate',
    equipment: 'Full Gym',
  },
  workouts: [

    // ── WEEK 1 ──────────────────────────────
    { id: generateUniqueId(), name: 'W1D1: Chest', blocks: chestDay() },
    { id: generateUniqueId(), name: 'W1D2: Back', blocks: backDay() },
    { id: generateUniqueId(), name: 'W1D3: Cardio/Abs — AMRAP 18', blocks: w1Conditioning() },
    { id: generateUniqueId(), name: 'W1D4: Arms', blocks: armsDay() },
    { id: generateUniqueId(), name: 'W1D5: Shoulders', blocks: shouldersDay() },
    { id: generateUniqueId(), name: 'W1D6: Legs', blocks: legsDay() },
    { id: generateUniqueId(), name: 'W1D7: Rest Day', blocks: restDay() },

    // ── WEEK 2 ──────────────────────────────
    { id: generateUniqueId(), name: 'W2D1: Chest', blocks: chestDay() },
    { id: generateUniqueId(), name: 'W2D2: Back', blocks: backDay() },
    { id: generateUniqueId(), name: 'W2D3: Cardio/Abs — EMOM 24', blocks: w2Conditioning() },
    { id: generateUniqueId(), name: 'W2D4: Arms', blocks: armsDay() },
    { id: generateUniqueId(), name: 'W2D5: Shoulders', blocks: shouldersDay() },
    { id: generateUniqueId(), name: 'W2D6: Legs', blocks: legsDay() },
    { id: generateUniqueId(), name: 'W2D7: Rest Day', blocks: restDay() },

    // ── WEEK 3 ──────────────────────────────
    { id: generateUniqueId(), name: 'W3D1: Chest', blocks: chestDay() },
    { id: generateUniqueId(), name: 'W3D2: Back', blocks: backDay() },
    { id: generateUniqueId(), name: 'W3D3: Cardio/Abs — RFT 5 Rounds', blocks: w3Conditioning() },
    { id: generateUniqueId(), name: 'W3D4: Arms', blocks: armsDay() },
    { id: generateUniqueId(), name: 'W3D5: Shoulders', blocks: shouldersDay() },
    { id: generateUniqueId(), name: 'W3D6: Legs', blocks: legsDay() },
    { id: generateUniqueId(), name: 'W3D7: Rest Day', blocks: restDay() },

    // ── WEEK 4 ──────────────────────────────
    { id: generateUniqueId(), name: 'W4D1: Chest', blocks: chestDay() },
    { id: generateUniqueId(), name: 'W4D2: Back', blocks: backDay() },
    { id: generateUniqueId(), name: 'W4D3: Cardio/Abs — Chipper', blocks: w4Conditioning() },
    { id: generateUniqueId(), name: 'W4D4: Arms', blocks: armsDay() },
    { id: generateUniqueId(), name: 'W4D5: Shoulders', blocks: shouldersDay() },
    { id: generateUniqueId(), name: 'W4D6: Legs', blocks: legsDay() },
    { id: generateUniqueId(), name: 'W4D7: Rest Day', blocks: restDay() },

  ]
};