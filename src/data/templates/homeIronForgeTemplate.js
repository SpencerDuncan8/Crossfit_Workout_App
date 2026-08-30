// src/data/templates/homeIronForgeTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

// ─────────────────────────────────────────────
// WARM-UP BLOCKS
// McGill Big 3 + 5 min bike + session-specific
// ─────────────────────────────────────────────

const warmupUpperPushChest = () => ({
  id: generateUniqueId(), type: 'Warm-up',
  note: 'McGill Big 3 first — non-negotiable. 6 reps x 6 second hold each exercise.',
  exercises: [
    { id: 'mcgill-curl-up', name: 'McGill Curl-up — 6 x 6s hold' },
    { id: 'side-plank', name: 'Side Plank — 6 x 6s hold each side' },
    { id: 'bird-dog', name: 'Bird Dog — 6 x 6s hold each side' },
    { id: 'stationary-bike', name: '5 min easy bike' },
    { id: 'arm-circles', name: 'Arm Circles — 30s each way' },
    { id: 'band-pull-aparts', name: 'Band Pull-Aparts — 15 reps' },
  ]
});

const warmupLowerSquat = () => ({
  id: generateUniqueId(), type: 'Warm-up',
  note: 'McGill Big 3 first — non-negotiable. 6 reps x 6 second hold each exercise.',
  exercises: [
    { id: 'mcgill-curl-up', name: 'McGill Curl-up — 6 x 6s hold' },
    { id: 'side-plank', name: 'Side Plank — 6 x 6s hold each side' },
    { id: 'bird-dog', name: 'Bird Dog — 6 x 6s hold each side' },
    { id: 'stationary-bike', name: '5 min easy bike' },
    { id: 'air-squats', name: 'Air Squats — 15 reps' },
    { id: 'glute-bridges', name: 'Glute Bridges — 15 reps' },
  ]
});

const warmupUpperPushShoulder = () => ({
  id: generateUniqueId(), type: 'Warm-up',
  note: 'McGill Big 3 first — non-negotiable. 6 reps x 6 second hold each exercise.',
  exercises: [
    { id: 'mcgill-curl-up', name: 'McGill Curl-up — 6 x 6s hold' },
    { id: 'side-plank', name: 'Side Plank — 6 x 6s hold each side' },
    { id: 'bird-dog', name: 'Bird Dog — 6 x 6s hold each side' },
    { id: 'stationary-bike', name: '5 min easy bike' },
    { id: 'arm-circles', name: 'Arm Circles — 30s each way' },
    { id: 'wall-slides', name: 'Wall Slides — 10 reps' },
  ]
});

const warmupUpperPull = () => ({
  id: generateUniqueId(), type: 'Warm-up',
  note: 'McGill Big 3 first — non-negotiable. 6 reps x 6 second hold each exercise.',
  exercises: [
    { id: 'mcgill-curl-up', name: 'McGill Curl-up — 6 x 6s hold' },
    { id: 'side-plank', name: 'Side Plank — 6 x 6s hold each side' },
    { id: 'bird-dog', name: 'Bird Dog — 6 x 6s hold each side' },
    { id: 'stationary-bike', name: '5 min easy bike' },
    { id: 'arm-circles', name: 'Arm Circles — 30s each way' },
    { id: 'band-pull-aparts', name: 'Band Pull-Aparts — 15 reps' },
  ]
});

const warmupLowerHinge = () => ({
  id: generateUniqueId(), type: 'Warm-up',
  note: 'McGill Big 3 first — non-negotiable. 6 reps x 6 second hold each exercise.',
  exercises: [
    { id: 'mcgill-curl-up', name: 'McGill Curl-up — 6 x 6s hold' },
    { id: 'side-plank', name: 'Side Plank — 6 x 6s hold each side' },
    { id: 'bird-dog', name: 'Bird Dog — 6 x 6s hold each side' },
    { id: 'stationary-bike', name: '5 min easy bike' },
    { id: 'glute-bridges', name: 'Glute Bridges — 15 reps' },
    { id: 'leg-swings', name: 'Leg Swings — 30s each leg each way' },
  ]
});

const warmupConditioning = () => ({
  id: generateUniqueId(), type: 'Warm-up',
  note: 'McGill Big 3 first — non-negotiable. 6 reps x 6 second hold each exercise.',
  exercises: [
    { id: 'mcgill-curl-up', name: 'McGill Curl-up — 6 x 6s hold' },
    { id: 'side-plank', name: 'Side Plank — 6 x 6s hold each side' },
    { id: 'bird-dog', name: 'Bird Dog — 6 x 6s hold each side' },
    { id: 'stationary-bike', name: '5 min easy bike' },
    { id: 'jumping-jack', name: 'Jumping Jacks — 60s' },
    { id: 'air-squats', name: 'Air Squats — 15 reps' },
  ]
});

// ─────────────────────────────────────────────
// COOL-DOWN BLOCKS
// 5 min bike always first
// ─────────────────────────────────────────────

const cooldownUpperPushChest = () => ({
  id: generateUniqueId(), type: 'Cool-down',
  exercises: [
    { id: 'stationary-bike', name: '5 min easy bike cooldown' },
    { id: 'doorway-chest-stretch', name: 'Doorway Chest Stretch — 60s' },
    { id: 'lat-stretch', name: 'Lat Stretch — 60s each side' },
    { id: 'tricep-stretch', name: 'Tricep Stretch — 45s each side' },
  ]
});

const cooldownLowerSquat = () => ({
  id: generateUniqueId(), type: 'Cool-down',
  exercises: [
    { id: 'stationary-bike', name: '5 min easy bike cooldown' },
    { id: 'couch-stretch', name: 'Couch Stretch — 60s each side' },
    { id: 'pigeon-pose', name: 'Pigeon Pose — 60s each side' },
    { id: 'hamstring-stretch', name: 'Hamstring Stretch — 60s' },
  ]
});

const cooldownUpperPushShoulder = () => ({
  id: generateUniqueId(), type: 'Cool-down',
  exercises: [
    { id: 'stationary-bike', name: '5 min easy bike cooldown' },
    { id: 'cross-body-shoulder-stretch', name: 'Cross-Body Shoulder Stretch — 45s each' },
    { id: 'lat-stretch', name: 'Lat Stretch — 60s each side' },
    { id: 'doorway-chest-stretch', name: 'Chest Stretch — 60s' },
  ]
});

const cooldownUpperPull = () => ({
  id: generateUniqueId(), type: 'Cool-down',
  exercises: [
    { id: 'stationary-bike', name: '5 min easy bike cooldown' },
    { id: 'lat-stretch', name: 'Lat Stretch — 60s each side' },
    { id: 'bicep-stretch', name: 'Bicep Stretch — 45s each side' },
    { id: 'doorway-chest-stretch', name: 'Chest Stretch — 60s' },
  ]
});

const cooldownLowerHinge = () => ({
  id: generateUniqueId(), type: 'Cool-down',
  exercises: [
    { id: 'stationary-bike', name: '5 min easy bike cooldown' },
    { id: 'couch-stretch', name: 'Couch Stretch — 60s each side' },
    { id: 'hamstring-stretch', name: 'Hamstring Stretch — 60s' },
    { id: 'lat-stretch', name: 'Lat Stretch — 60s each side' },
  ]
});

const cooldownConditioning = () => ({
  id: generateUniqueId(), type: 'Cool-down',
  exercises: [
    { id: 'stationary-bike', name: '5 min easy bike cooldown' },
    { id: 'childs-pose', name: "Child's Pose — 90s" },
    { id: 'lat-stretch', name: 'Lat Stretch — 60s each side' },
  ]
});

// ─────────────────────────────────────────────
// STRENGTH BLOCKS
// Format note: rep range x sets (e.g. 3-5 x 5
// means 3-5 reps for 5 sets)
// ─────────────────────────────────────────────

// --- DAY 1: UPPER PUSH — CHEST FOCUS ---
const upperPushChest = () => ([
  warmupUpperPushChest(),
  {
    id: generateUniqueId(), type: 'Strength', rest: '150s',
    note: 'Rep range x sets listed per exercise. Main lift (DB Press): heavy, 3-5 rep range for 5 sets. Accessory work: higher rep ranges, shorter rest.',
    exercises: [
      {
        id: 'dumbbell-bench-press', name: 'DB Press',
        note: 'Main lift. 5 sets, heavy. 3-5 rep range.',
        sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), reps: '3-5', load: '' }))
      },
      {
        id: 'pullups', name: 'Pull-ups',
        note: 'Strict. Log total reps.',
        sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '4', load: '' }))
      },
      {
        id: 'dumbbell-pullover', name: 'DB Pullovers',
        sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '6-12', load: '' }))
      },
      {
        id: 'dumbbell-incline-fly', name: 'Incline Flyes',
        sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '8-15', load: '' }))
      },
      {
        id: 'dumbbell-front-raise', name: 'Front Raise',
        sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '12-20', load: '' }))
      },
      {
        id: 'ez-bar-curl', name: 'EZ Bar Curl',
        sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '8-15', load: '' }))
      },
      {
        id: 'skull-crushers', name: 'Skull Crushers',
        sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '8-15', load: '' }))
      },
    ]
  },
  cooldownUpperPushChest(),
]);

// --- DAY 2: LOWER — SQUAT FOCUS ---
const lowerSquat = () => ([
  warmupLowerSquat(),
  {
    id: generateUniqueId(), type: 'Strength', rest: '180s',
    note: 'Main lift (Barbell Squat): heavy, 3-5 rep range for 5 sets. Accessory work: higher rep ranges.',
    exercises: [
      {
        id: 'squat', name: 'Barbell Squat',
        note: 'Main lift. 5 sets, heavy. 3-5 rep range.',
        sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), reps: '3-5', load: '' }))
      },
      {
        id: 'dumbbell-goblet-squats', name: 'DB Goblet Squat',
        sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '6-12', load: '' }))
      },
      {
        id: 'dumbbell-walking-lunges', name: 'DB Walking Lunge',
        sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '6-12', load: '' }))
      },
      {
        id: 'barbell-calf-raise', name: 'Barbell Calf Raise',
        sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '20', load: '' }))
      },
      {
        id: 'barbell-rollout', name: 'Ab Rollout',
        sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '12', load: '' }))
      },
    ]
  },
  cooldownLowerSquat(),
]);

// --- DAY 3: UPPER PUSH — SHOULDER FOCUS ---
const upperPushShoulder = () => ([
  warmupUpperPushShoulder(),
  {
    id: generateUniqueId(), type: 'Strength', rest: '150s',
    note: 'Main lift (OHP): heavy, 3-5 rep range for 5 sets. Accessory work: higher rep ranges.',
    exercises: [
      {
        id: 'overhead_press', name: 'Overhead Press',
        note: 'Main lift. 5 sets, heavy. 3-5 rep range.',
        sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), reps: '3-5', load: '' }))
      },
      {
        id: 'barbell-upright-row', name: 'Upright Row',
        sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '6-12', load: '' }))
      },
      {
        id: 'landmine-single-arm-press', name: 'Landmine Press',
        sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '6-12', load: '' }))
      },
      {
        id: 'dips-chair', name: 'Dips',
        sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '6-12', load: '' }))
      },
      {
        id: 'dumbbell-curl', name: 'DB Curl',
        sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '6-12', load: '' }))
      },
      {
        id: 'tricep-rope-pushdowns', name: 'Tricep Pushdown',
        sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '6-12', load: '' }))
      },
      {
        id: 'reverse-grip-curl', name: 'Reverse Grip Curl',
        sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '8-15', load: '' }))
      },
    ]
  },
  cooldownUpperPushShoulder(),
]);

// --- DAY 5: UPPER PULL — BACK FOCUS ---
const upperPull = () => ([
  warmupUpperPull(),
  {
    id: generateUniqueId(), type: 'Strength', rest: '120s',
    note: 'All exercises in the 6-12 rep range for 4 sets unless noted. Controlled tempo on all pulls.',
    exercises: [
      {
        id: 'landmine-row', name: 'Landmine Row',
        sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '6-12', load: '' }))
      },
      {
        id: 'dumbbell-incline-press', name: 'Incline DB Press',
        sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '6-12', load: '' }))
      },
      {
        id: 'single-arm-dumbbell-rows', name: 'One Arm Row',
        sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '6-12', load: '' }))
      },
      {
        id: 'cable-pulldown', name: 'Cable Pulldown',
        sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '6-12', load: '' }))
      },
      {
        id: 'dumbbell-lateral-raises', name: 'Side Lateral Raise',
        sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '12-20', load: '' }))
      },
      {
        id: 'db-hammer-curl', name: 'Hammer Curl',
        sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '8-15', load: '' }))
      },
    ]
  },
  cooldownUpperPull(),
]);

// --- DAY 6: LOWER — HINGE FOCUS ---
const lowerHinge = () => ([
  warmupLowerHinge(),
  {
    id: generateUniqueId(), type: 'Strength', rest: '180s',
    note: 'Main lift (RDL): heavy, 3-5 rep range for 5 sets. Moderate load only — stop 2 reps shy of failure, neutral spine throughout. Accessory work: higher rep ranges.',
    exercises: [
      {
        id: 'dumbbell-romanian-deadlifts', name: 'RDL',
        note: 'Main lift. 5 sets, heavy. 3-5 rep range. Neutral spine — stop 2 reps shy of failure.',
        sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), reps: '3-5', load: '' }))
      },
      {
        id: 'dumbbell-bulgarian-split-squats', name: 'Bulgarian Split Squat',
        note: 'Per leg.',
        sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '6-12', load: '' }))
      },
      {
        id: 'kb-swing', name: 'KB Swings',
        note: 'Hip drive focus.',
        sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '20', load: '' }))
      },
      {
        id: 'hanging-leg-raise', name: 'Hanging Leg Raises',
        sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '12', load: '' }))
      },
      {
        id: 'landmine-rotation', name: 'Landmine Rotation',
        note: 'Anti-rotation core. Per side.',
        sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '20', load: '' }))
      },
    ]
  },
  cooldownLowerHinge(),
]);

// ─────────────────────────────────────────────
// CONDITIONING SESSIONS
// Weeks 1 & 3 share the same two workouts
// Weeks 2 & 4 share the same two workouts
// ─────────────────────────────────────────────

// Weeks 1 & 3 — Conditioning Day 1: Cindy AMRAP 20
const condCindy = () => ([
  warmupConditioning(),
  {
    id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 20,
    note: 'Cindy — classic benchmark. Find a sustainable pace from minute 1. Record rounds + reps. Compare score Week 1 vs Week 3.',
    exercises: [
      { id: 'pullups', name: 'Pull-ups', reps: '5' },
      { id: 'push-ups', name: 'Push-ups', reps: '10' },
      { id: 'air-squats', name: 'Air Squats', reps: '15' },
    ]
  },
  cooldownConditioning(),
]);

// Weeks 1 & 3 — Conditioning Day 2: Bodyweight Chipper
const condChipper = () => ([
  warmupConditioning(),
  {
    id: generateUniqueId(), type: 'Conditioning: Chipper',
    note: 'For Time. Complete all reps of each movement before moving on. Low impact — pace yourself and move consistently. Compare time Week 1 vs Week 3.',
    exercises: [
      { id: 'jump-rope', name: 'Jump Rope', reps: '100' },
      { id: 'sit-up', name: 'Sit-ups', reps: '50' },
      { id: 'push-ups', name: 'Push-ups', reps: '40' },
      { id: 'air-squats', name: 'Air Squats', reps: '30' },
      { id: 'burpees', name: 'Burpees', reps: '20' },
    ]
  },
  cooldownConditioning(),
]);

// Weeks 2 & 4 — Conditioning Day 1: EMOM 20
const condEMOM = () => ([
  warmupConditioning(),
  {
    id: generateUniqueId(), type: 'Conditioning: EMOM',
    note: '5 rounds of 4 minutes. Complete reps at the top of each minute — rest fills the remainder. Low impact active recovery feel. Compare Week 2 vs Week 4.',
    minutes: [
      { id: generateUniqueId(), task: 'Min 1: 8 Burpees' },
      { id: generateUniqueId(), task: 'Min 2: 15 KB Swings (45 lbs)' },
      { id: generateUniqueId(), task: 'Min 3: 15 Air Squats' },
      { id: generateUniqueId(), task: 'Min 4: Rest' },
      { id: generateUniqueId(), task: 'Min 5: 8 Burpees' },
      { id: generateUniqueId(), task: 'Min 6: 15 KB Swings (45 lbs)' },
      { id: generateUniqueId(), task: 'Min 7: 15 Air Squats' },
      { id: generateUniqueId(), task: 'Min 8: Rest' },
      { id: generateUniqueId(), task: 'Min 9: 8 Burpees' },
      { id: generateUniqueId(), task: 'Min 10: 15 KB Swings (45 lbs)' },
      { id: generateUniqueId(), task: 'Min 11: 15 Air Squats' },
      { id: generateUniqueId(), task: 'Min 12: Rest' },
      { id: generateUniqueId(), task: 'Min 13: 8 Burpees' },
      { id: generateUniqueId(), task: 'Min 14: 15 KB Swings (45 lbs)' },
      { id: generateUniqueId(), task: 'Min 15: 15 Air Squats' },
      { id: generateUniqueId(), task: 'Min 16: Rest' },
      { id: generateUniqueId(), task: 'Min 17: 8 Burpees' },
      { id: generateUniqueId(), task: 'Min 18: 15 KB Swings (45 lbs)' },
      { id: generateUniqueId(), task: 'Min 19: 15 Air Squats' },
      { id: generateUniqueId(), task: 'Min 20: Rest' },
    ]
  },
  cooldownConditioning(),
]);

// Weeks 2 & 4 — Conditioning Day 2: RFT 5 Rounds
const condRFT = () => ([
  warmupConditioning(),
  {
    id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5,
    note: 'Record your time in Week 2 — target is to beat it in Week 4. Push the pace on every round.',
    exercises: [
      { id: 'dumbbell-thrusters', name: 'DB Thrusters (35 lbs each)', reps: '8' },
      { id: 'push-ups', name: 'Push-ups', reps: '15' },
      { id: 'running', name: 'Run 200m', reps: '1' },
    ]
  },
  cooldownConditioning(),
]);

// ─────────────────────────────────────────────
// TEMPLATE EXPORT
// ─────────────────────────────────────────────

export const homeIronForgeTemplate = {
  id: 'template_home_iron_forge',
  name: 'Home Iron: Forge',
  description: 'Block 2 of the Home Iron series. A 6-day program with no dedicated active recovery day — recovery is built into the conditioning sessions. Strength days use a main lift (3-5 reps x 5 sets) followed by accessory work in higher rep ranges. Conditioning rotates across 4 weeks: Cindy + Chipper in weeks 1 & 3, EMOM + RFT in weeks 2 & 4. McGill Big 3 before every session.',
  isTemplate: true,
  daysPerWeek: 6,
  meta: {
    type: 'Structured Program',
    level: 'Intermediate',
    equipment: 'Full Gym',
  },
  workouts: [

    // ── WEEK 1 ──────────────────────────────
    { id: generateUniqueId(), name: 'W1D1: Upper Push — Chest Focus', blocks: upperPushChest() },
    { id: generateUniqueId(), name: 'W1D2: Lower — Squat Focus', blocks: lowerSquat() },
    { id: generateUniqueId(), name: 'W1D3: Upper Push — Shoulder Focus', blocks: upperPushShoulder() },
    { id: generateUniqueId(), name: 'W1D4: Conditioning — Cindy (AMRAP 20)', blocks: condCindy() },
    { id: generateUniqueId(), name: 'W1D5: Upper Pull — Back Focus', blocks: upperPull() },
    { id: generateUniqueId(), name: 'W1D6: Lower — Hinge Focus', blocks: lowerHinge() },
    { id: generateUniqueId(), name: 'W1D7: Conditioning — Bodyweight Chipper', blocks: condChipper() },

    // ── WEEK 2 ──────────────────────────────
    { id: generateUniqueId(), name: 'W2D1: Upper Push — Chest Focus', blocks: upperPushChest() },
    { id: generateUniqueId(), name: 'W2D2: Lower — Squat Focus', blocks: lowerSquat() },
    { id: generateUniqueId(), name: 'W2D3: Upper Push — Shoulder Focus', blocks: upperPushShoulder() },
    { id: generateUniqueId(), name: 'W2D4: Conditioning — EMOM 20', blocks: condEMOM() },
    { id: generateUniqueId(), name: 'W2D5: Upper Pull — Back Focus', blocks: upperPull() },
    { id: generateUniqueId(), name: 'W2D6: Lower — Hinge Focus', blocks: lowerHinge() },
    { id: generateUniqueId(), name: 'W2D7: Conditioning — RFT 5 Rounds (Baseline)', blocks: condRFT() },

    // ── WEEK 3 ──────────────────────────────
    { id: generateUniqueId(), name: 'W3D1: Upper Push — Chest Focus', blocks: upperPushChest() },
    { id: generateUniqueId(), name: 'W3D2: Lower — Squat Focus', blocks: lowerSquat() },
    { id: generateUniqueId(), name: 'W3D3: Upper Push — Shoulder Focus', blocks: upperPushShoulder() },
    { id: generateUniqueId(), name: 'W3D4: Conditioning — Cindy (AMRAP 20)', blocks: condCindy() },
    { id: generateUniqueId(), name: 'W3D5: Upper Pull — Back Focus', blocks: upperPull() },
    { id: generateUniqueId(), name: 'W3D6: Lower — Hinge Focus', blocks: lowerHinge() },
    { id: generateUniqueId(), name: 'W3D7: Conditioning — Bodyweight Chipper', blocks: condChipper() },

    // ── WEEK 4 ──────────────────────────────
    { id: generateUniqueId(), name: 'W4D1: Upper Push — Chest Focus', blocks: upperPushChest() },
    { id: generateUniqueId(), name: 'W4D2: Lower — Squat Focus', blocks: lowerSquat() },
    { id: generateUniqueId(), name: 'W4D3: Upper Push — Shoulder Focus', blocks: upperPushShoulder() },
    { id: generateUniqueId(), name: 'W4D4: Conditioning — EMOM 20', blocks: condEMOM() },
    { id: generateUniqueId(), name: 'W4D5: Upper Pull — Back Focus', blocks: upperPull() },
    { id: generateUniqueId(), name: 'W4D6: Lower — Hinge Focus', blocks: lowerHinge() },
    { id: generateUniqueId(), name: 'W4D7: Conditioning — RFT 5 Rounds (Beat Week 2)', blocks: condRFT() },

  ]
};
