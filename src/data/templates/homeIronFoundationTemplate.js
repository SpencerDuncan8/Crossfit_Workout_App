// src/data/templates/homeIronFoundationTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

// ─────────────────────────────────────────────
// PROGRESSION NOTES
// ─────────────────────────────────────────────
const upperProgressionNote = 'Double progression: 4 sets, same weight across all sets, 8-12 reps. Hit 12 reps on all 4 sets → add 5 lbs next session. Miss the range → repeat the weight.';
const lowerProgressionNote = 'Double progression: 4 sets, same weight across all sets, 6-10 reps (heavy compounds). Hit 10 reps on all 4 sets → add 10 lbs next session. Miss the range → repeat the weight. RDL: moderate load only, stop 2 reps shy of failure, neutral spine.';

// ─────────────────────────────────────────────
// BIKE COOLDOWN — every session
// ─────────────────────────────────────────────
const bikeCooldown = () => ({
  id: generateUniqueId(), type: 'Cardio',
  exercises: [{ id: 'stationary-bike', name: '5 min easy bike cooldown', duration: '5' }],
  note: 'Easy spin only — flush the legs and bring heart rate down.'
});

// ─────────────────────────────────────────────
// WARM-UP BLOCKS — single block per workout
// McGill Big 3 + 5 min bike + session-specific
// ─────────────────────────────────────────────

const warmupUpperA = () => ({
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

const warmupUpperB = () => ({
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

const warmupLowerA = () => ({
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

const warmupLowerB = () => ({
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

const warmupTabata = () => ({
  id: generateUniqueId(), type: 'Warm-up',
  note: 'McGill Big 3 first — non-negotiable. 6 reps x 6 second hold each exercise.',
  exercises: [
    { id: 'mcgill-curl-up', name: 'McGill Curl-up — 6 x 6s hold' },
    { id: 'side-plank', name: 'Side Plank — 6 x 6s hold each side' },
    { id: 'bird-dog', name: 'Bird Dog — 6 x 6s hold each side' },
    { id: 'stationary-bike', name: '5 min easy bike' },
    { id: 'burpees', name: 'Burpees — 5 reps slow warm-up' },
    { id: 'jump-rope', name: 'Jump Rope — 50 singles' },
  ]
});

const warmupBenchmark = () => ({
  id: generateUniqueId(), type: 'Warm-up',
  note: 'McGill Big 3 first — non-negotiable. 6 reps x 6 second hold each exercise.',
  exercises: [
    { id: 'mcgill-curl-up', name: 'McGill Curl-up — 6 x 6s hold' },
    { id: 'side-plank', name: 'Side Plank — 6 x 6s hold each side' },
    { id: 'bird-dog', name: 'Bird Dog — 6 x 6s hold each side' },
    { id: 'stationary-bike', name: '5 min easy bike' },
    { id: 'pullups', name: 'Pull-ups — 5 reps warm-up' },
    { id: 'push-ups', name: 'Push-ups — 10 reps warm-up' },
  ]
});

const warmupRecovery = () => ({
  id: generateUniqueId(), type: 'Warm-up',
  note: 'McGill Big 3 — still happens on recovery days. 6 reps x 6 second hold each exercise.',
  exercises: [
    { id: 'mcgill-curl-up', name: 'McGill Curl-up — 6 x 6s hold' },
    { id: 'side-plank', name: 'Side Plank — 6 x 6s hold each side' },
    { id: 'bird-dog', name: 'Bird Dog — 6 x 6s hold each side' },
    { id: 'stationary-bike', name: '5 min easy bike' },
    { id: null, name: 'Light mobility — focus on whatever is tight from the week.' },
  ]
});

// ─────────────────────────────────────────────
// STRENGTH BLOCKS
// ─────────────────────────────────────────────

const upperA = () => ([
  warmupUpperA(),
  {
    id: generateUniqueId(), type: 'Strength', rest: '120s',
    note: upperProgressionNote,
    exercises: [
      { id: 'bench_press', name: 'Barbell Bench Press', note: 'Main lift. Swap for floor press if no bench.', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '8-12', load: '' })) },
      { id: 'pullups', name: 'Strict Pull-ups', note: 'Strict — no kipping. Record total reps each session.', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '4-5', load: '' })) },
      { id: 'single-arm-dumbbell-rows', name: 'DB Row (Single Arm)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '8-12', load: '' })) },
      { id: 'landmine-single-arm-press', name: 'Landmine Single-Arm Press', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '8-12', load: '' })) },
      { id: 'dumbbell-curl', name: 'DB Curl', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '10-12', load: '' })) },
      { id: 'tricep-rope-pushdowns', name: 'Cable Tricep Pressdown', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '12-15', load: '' })) },
    ]
  },
  bikeCooldown(),
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'doorway-chest-stretch', name: 'Doorway Chest Stretch (60s)' },
      { id: 'lat-stretch', name: 'Lat Stretch (60s each side)' },
      { id: 'tricep-stretch', name: 'Tricep Stretch (45s each side)' },
    ]
  }
]);

const lowerA = () => ([
  warmupLowerA(),
  {
    id: generateUniqueId(), type: 'Strength', rest: '150s',
    note: lowerProgressionNote,
    exercises: [
      { id: 'squat', name: 'Barbell Back Squat', note: 'Main lift. 6-10 rep range. Target: 225 lbs by Jan 1 2027.', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '6-10', load: '' })) },
      { id: 'dumbbell-romanian-deadlifts', name: 'RDL (Barbell)', note: 'Moderate load only. Stop 2 reps shy of failure. Neutral spine.', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '8-12', load: '' })) },
      { id: 'dumbbell-walking-lunges', name: 'DB Walking Lunge', note: 'Per leg.', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '10-12', load: '' })) },
      { id: 'dumbbell-calf-raises', name: 'Standing Calf Raise (DB)', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '12-15', load: '' })) },
      { id: 'barbell-rollout', name: 'Ab Wheel Rollout', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '8-10', load: '' })) },
    ]
  },
  bikeCooldown(),
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'couch-stretch', name: 'Couch Stretch (60s each side)' },
      { id: 'pigeon-pose', name: 'Pigeon Pose (60s each side)' },
      { id: 'hamstring-stretch', name: 'Seated Hamstring Stretch (60s)' },
    ]
  }
]);

const upperB = () => ([
  warmupUpperB(),
  {
    id: generateUniqueId(), type: 'Strength', rest: '120s',
    note: upperProgressionNote,
    exercises: [
      { id: 'overhead_press', name: 'Standing Barbell OHP', note: 'Main lift. Target: 135 lbs by Jan 1 2027.', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '8-12', load: '' })) },
      { id: 'pullups', name: 'Pull-ups', note: 'Strict. Log total reps each session — Murph runway.', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '4-5', load: '' })) },
      { id: 'dumbbell-incline-press', name: 'Incline DB Bench Press', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '8-12', load: '' })) },
      { id: 'landmine-row', name: 'Landmine Row (Single Arm)', note: 'Per side.', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '8-12', load: '' })) },
      { id: 'dumbbell-lateral-raises', name: 'DB Lateral Raise', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '15-20', load: '' })) },
      { id: 'hanging-leg-raise', name: 'Hanging Knee Raise', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '10-12', load: '' })) },
    ]
  },
  bikeCooldown(),
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'cross-body-shoulder-stretch', name: 'Cross-Body Shoulder Stretch (45s each)' },
      { id: 'lat-stretch', name: 'Lat Stretch (60s each side)' },
      { id: 'doorway-chest-stretch', name: 'Chest Stretch (60s)' },
    ]
  }
]);

const lowerB = () => ([
  warmupLowerB(),
  {
    id: generateUniqueId(), type: 'Strength', rest: '180s',
    note: lowerProgressionNote,
    exercises: [
      { id: 'deadlift', name: 'Conventional Deadlift', note: 'Main lift. 6-10 rep range. Target: 305 lbs by Jan 1 2027.', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), reps: '6-10', load: '' })) },
      { id: 'dumbbell-bulgarian-split-squats', name: 'Bulgarian Split Squat (DB)', note: 'Per leg.', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '8-10', load: '' })) },
      { id: 'kb-swing', name: 'Kettlebell Swing', note: 'Hip drive focus. Light on the spine.', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '15-20', load: '' })) },
      { id: 'landmine-rotation', name: 'Landmine Rotation', note: 'Anti-rotation core. Per side.', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), reps: '10', load: '' })) },
      { id: 'side-plank', name: 'Side Plank', note: 'Per side.', sets: Array.from({ length: 2 }, () => ({ id: generateUniqueId(), reps: '30-45s', load: '' })) },
    ]
  },
  bikeCooldown(),
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'couch-stretch', name: 'Couch Stretch (60s each side)' },
      { id: 'hamstring-stretch', name: 'Hamstring Stretch (60s)' },
      { id: 'lat-stretch', name: 'Lat Stretch (60s each side)' },
    ]
  }
]);

const activeRecovery = () => ([
  warmupRecovery(),
  {
    id: generateUniqueId(), type: 'Cardio',
    exercises: [{ id: 'stationary-bike', name: 'Easy Spin Bike', duration: '20' }],
    note: '20-30 mins easy spin. Conversational pace only. This is recovery, not training.'
  },
  bikeCooldown(),
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'pigeon-pose', name: 'Pigeon Pose (90s each side)' },
      { id: 'couch-stretch', name: 'Couch Stretch (60s each side)' },
      { id: 'lat-stretch', name: 'Lat Stretch (60s each side)' },
      { id: 'childs-pose', name: "Child's Pose (90s)" },
      { id: 'cobra-stretch', name: 'Cobra Stretch (60s)' },
      { id: null, name: 'Foam roll any tight areas from the week.' },
    ]
  }
]);

// ─────────────────────────────────────────────
// CONDITIONING SESSIONS
// ─────────────────────────────────────────────

// W1 Wednesday — AMRAP 20
const w1wed = () => ([
  warmupConditioning(),
  {
    id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 20,
    note: 'Find a pace you can sustain for the full 20 minutes. Never sacrifice pull-up or swing form. Record rounds + reps.',
    exercises: [
      { id: 'pullups', name: 'Pull-ups', reps: '5' },
      { id: 'kb-swing', name: 'KB Swings', reps: '10' },
      { id: 'air-squats', name: 'Air Squats', reps: '15' },
    ]
  },
  bikeCooldown(),
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'lat-stretch', name: 'Lat Stretch (60s each)' },
      { id: 'childs-pose', name: "Child's Pose (90s)" },
    ]
  }
]);

// W1 Saturday — Intervals 45s on / 15s off, 4 rounds
const w1sat = () => ([
  warmupTabata(),
  {
    id: generateUniqueId(), type: 'Conditioning: Intervals',
    work: 45,
    rest: 15,
    rounds: 16,
    note: '4 rounds of 4 exercises — 45s work / 15s rest. Order: Jump Rope → Plank Hold → Burpees → Sit-ups → repeat for 4 rounds. Max effort every 45s window.',
    exercises: [
      { id: 'jump-rope', name: 'Jump Rope' },
      { id: 'plank', name: 'Plank Hold' },
      { id: 'burpees', name: 'Burpees' },
      { id: 'sit-up', name: 'Sit-ups' },
    ]
  },
  bikeCooldown(),
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'cobra-stretch', name: 'Cobra Stretch (60s)' },
      { id: 'quad-stretch', name: 'Quad Stretch (60s each)' },
    ]
  }
]);

// W2 Wednesday — Chipper
const w2wed = () => ([
  warmupConditioning(),
  {
    id: generateUniqueId(), type: 'Conditioning: Chipper',
    note: 'For Time. Complete all reps of each movement before moving on. Pace the KB swings early — the run at the end is where this gets hard.',
    exercises: [
      { id: 'kb-swing', name: 'KB Swings', reps: '50' },
      { id: 'dumbbell-step-ups', name: 'Step-ups', reps: '40' },
      { id: 'push-ups', name: 'Push-ups', reps: '30' },
      { id: 'pullups', name: 'Pull-ups', reps: '20' },
      { id: 'running', name: 'Run 800m', reps: '1' },
    ]
  },
  bikeCooldown(),
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'quad-stretch', name: 'Quad Stretch (60s each)' },
      { id: 'lat-stretch', name: 'Lat Stretch (60s each)' },
      { id: 'childs-pose', name: "Child's Pose (90s)" },
    ]
  }
]);

// W2 Saturday — EMOM 20
const w2sat = () => ([
  warmupConditioning(),
  {
    id: generateUniqueId(), type: 'Conditioning: EMOM',
    note: '5 rounds of 4 minutes. Complete reps at the top of each minute — rest fills the remainder.',
    minutes: [
      { id: generateUniqueId(), task: 'Min 1: 8 Burpees' },
      { id: generateUniqueId(), task: 'Min 2: 12 KB Swings' },
      { id: generateUniqueId(), task: 'Min 3: 15 Air Squats' },
      { id: generateUniqueId(), task: 'Min 4: Rest' },
      { id: generateUniqueId(), task: 'Min 5: 8 Burpees' },
      { id: generateUniqueId(), task: 'Min 6: 12 KB Swings' },
      { id: generateUniqueId(), task: 'Min 7: 15 Air Squats' },
      { id: generateUniqueId(), task: 'Min 8: Rest' },
      { id: generateUniqueId(), task: 'Min 9: 8 Burpees' },
      { id: generateUniqueId(), task: 'Min 10: 12 KB Swings' },
      { id: generateUniqueId(), task: 'Min 11: 15 Air Squats' },
      { id: generateUniqueId(), task: 'Min 12: Rest' },
      { id: generateUniqueId(), task: 'Min 13: 8 Burpees' },
      { id: generateUniqueId(), task: 'Min 14: 12 KB Swings' },
      { id: generateUniqueId(), task: 'Min 15: 15 Air Squats' },
      { id: generateUniqueId(), task: 'Min 16: Rest' },
      { id: generateUniqueId(), task: 'Min 17: 8 Burpees' },
      { id: generateUniqueId(), task: 'Min 18: 12 KB Swings' },
      { id: generateUniqueId(), task: 'Min 19: 15 Air Squats' },
      { id: generateUniqueId(), task: 'Min 20: Rest' },
    ]
  },
  bikeCooldown(),
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'childs-pose', name: "Child's Pose (90s)" },
      { id: 'cobra-stretch', name: 'Cobra Stretch (60s)' },
    ]
  }
]);

// W3 Wednesday — RFT 5 Rounds
const w3wed = () => ([
  warmupConditioning(),
  {
    id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5,
    note: 'Push the pace — record your total time. Never compromise pull-up or swing form under fatigue.',
    exercises: [
      { id: 'running', name: 'Run 200m', reps: '1' },
      { id: 'kb-swing', name: 'KB Swings', reps: '15' },
      { id: 'pullups', name: 'Pull-ups', reps: '10' },
    ]
  },
  bikeCooldown(),
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'quad-stretch', name: 'Quad Stretch (60s each)' },
      { id: 'lat-stretch', name: 'Lat Stretch (60s each)' },
    ]
  }
]);

// W3 Saturday — Tabata Burpees only (8 rounds, score = lowest round)
const w3sat = () => ([
  warmupTabata(),
  {
    id: generateUniqueId(), type: 'Conditioning: Tabata',
    note: '8 rounds of 20s on / 10s off. Burpees only. Count your reps each round — your score is your LOWEST round. Push to keep every round consistent.',
    exercises: [
      { id: 'burpees', name: 'Burpees' },
    ]
  },
  bikeCooldown(),
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'cobra-stretch', name: 'Cobra Stretch (60s)' },
      { id: 'hamstring-stretch', name: 'Hamstring Stretch (60s)' },
    ]
  }
]);

// W4 Wednesday — AMRAP 25
const w4wed = () => ([
  warmupConditioning(),
  {
    id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 25,
    note: 'Longest AMRAP of the block. Find a sustainable pace from minute 1. Record rounds + reps.',
    exercises: [
      { id: 'push-ups', name: 'Push-ups', reps: '10' },
      { id: 'kb-swing', name: 'KB Swings', reps: '10' },
      { id: 'running', name: 'Run 200m', reps: '1' },
      { id: 'pullups', name: 'Pull-ups', reps: '5' },
    ]
  },
  bikeCooldown(),
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'quad-stretch', name: 'Quad Stretch (60s each)' },
      { id: 'lat-stretch', name: 'Lat Stretch (60s each)' },
      { id: 'childs-pose', name: "Child's Pose (90s)" },
    ]
  }
]);

// W4 Saturday — Half Murph Benchmark
const w4sat = () => ([
  warmupBenchmark(),
  {
    id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 1,
    note: 'MONTHLY BENCHMARK — Half Murph. For Time. Partition pull-ups, push-ups, and air squats however needed (e.g. 5 rounds of 10/20/30). Record total time AND how you partitioned sets. Time should drop and sets should get bigger each block as you build toward full Murph by Memorial Day 2027.',
    exercises: [
      { id: 'running', name: 'Run 400m', reps: '1' },
      { id: 'pullups', name: 'Pull-ups', reps: '50' },
      { id: 'push-ups', name: 'Push-ups', reps: '100' },
      { id: 'air-squats', name: 'Air Squats', reps: '150' },
      { id: 'running', name: 'Run 400m', reps: '1' },
    ]
  },
  bikeCooldown(),
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'pigeon-pose', name: 'Pigeon Pose (90s each side)' },
      { id: 'couch-stretch', name: 'Couch Stretch (90s each side)' },
      { id: 'lat-stretch', name: 'Lat Stretch (60s each)' },
      { id: 'hamstring-stretch', name: 'Hamstring Stretch (60s)' },
      { id: 'childs-pose', name: "Child's Pose (120s)" },
      { id: null, name: 'Log your time and how you partitioned. This is your baseline.' },
    ]
  }
]);

// ─────────────────────────────────────────────
// TEMPLATE EXPORT
// ─────────────────────────────────────────────

export const homeIronFoundationTemplate = {
  id: 'template_home_iron_foundation',
  name: 'Home Iron: Foundation',
  description: 'Block 1 of the Home Iron series. A 4-week hybrid strength and conditioning program built around double progression on the big lifts (Bench, OHP, Squat, Deadlift) and a Murph-runway conditioning track. The McGill Big 3 (curl-up, side plank, bird dog) is performed before every single session — no exceptions. Ends with a Half Murph benchmark every block to track progress toward full Murph by Memorial Day 2027.',
  isTemplate: true,
  daysPerWeek: 7,
  meta: {
    type: 'Structured Program',
    level: 'Intermediate',
    equipment: 'Full Gym',
  },
  workouts: [

    // ── WEEK 1 ──────────────────────────────
    { id: generateUniqueId(), name: 'W1D1: Upper A — Bench & Pull', blocks: upperA() },
    { id: generateUniqueId(), name: 'W1D2: Lower A — Squat & Hinge', blocks: lowerA() },
    { id: generateUniqueId(), name: 'W1D3: Conditioning — AMRAP 20', blocks: w1wed() },
    { id: generateUniqueId(), name: 'W1D4: Upper B — OHP & Row', blocks: upperB() },
    { id: generateUniqueId(), name: 'W1D5: Lower B — Deadlift & Accessory', blocks: lowerB() },
    { id: generateUniqueId(), name: 'W1D6: Conditioning — Intervals', blocks: w1sat() },
    { id: generateUniqueId(), name: 'W1D7: Active Recovery', blocks: activeRecovery() },

    // ── WEEK 2 ──────────────────────────────
    { id: generateUniqueId(), name: 'W2D1: Upper A — Bench & Pull', blocks: upperA() },
    { id: generateUniqueId(), name: 'W2D2: Lower A — Squat & Hinge', blocks: lowerA() },
    { id: generateUniqueId(), name: 'W2D3: Conditioning — Chipper', blocks: w2wed() },
    { id: generateUniqueId(), name: 'W2D4: Upper B — OHP & Row', blocks: upperB() },
    { id: generateUniqueId(), name: 'W2D5: Lower B — Deadlift & Accessory', blocks: lowerB() },
    { id: generateUniqueId(), name: 'W2D6: Conditioning — EMOM 20', blocks: w2sat() },
    { id: generateUniqueId(), name: 'W2D7: Active Recovery', blocks: activeRecovery() },

    // ── WEEK 3 ──────────────────────────────
    { id: generateUniqueId(), name: 'W3D1: Upper A — Bench & Pull', blocks: upperA() },
    { id: generateUniqueId(), name: 'W3D2: Lower A — Squat & Hinge', blocks: lowerA() },
    { id: generateUniqueId(), name: 'W3D3: Conditioning — RFT 5 Rounds', blocks: w3wed() },
    { id: generateUniqueId(), name: 'W3D4: Upper B — OHP & Row', blocks: upperB() },
    { id: generateUniqueId(), name: 'W3D5: Lower B — Deadlift & Accessory', blocks: lowerB() },
    { id: generateUniqueId(), name: 'W3D6: Conditioning — Tabata Burpees', blocks: w3sat() },
    { id: generateUniqueId(), name: 'W3D7: Active Recovery', blocks: activeRecovery() },

    // ── WEEK 4 ──────────────────────────────
    { id: generateUniqueId(), name: 'W4D1: Upper A — Bench & Pull', blocks: upperA() },
    { id: generateUniqueId(), name: 'W4D2: Lower A — Squat & Hinge', blocks: lowerA() },
    { id: generateUniqueId(), name: 'W4D3: Conditioning — AMRAP 25', blocks: w4wed() },
    { id: generateUniqueId(), name: 'W4D4: Upper B — OHP & Row', blocks: upperB() },
    { id: generateUniqueId(), name: 'W4D5: Lower B — Deadlift & Accessory', blocks: lowerB() },
    { id: generateUniqueId(), name: 'W4D6: Benchmark — Half Murph', blocks: w4sat() },
    { id: generateUniqueId(), name: 'W4D7: Active Recovery', blocks: activeRecovery() },

  ]
};
