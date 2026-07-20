// src/data/templates/ironConditioningFoundationTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

// ─────────────────────────────────────────────
// HELPER — builds a pyramid set array
// Phase 1 reps: 12-10-8-6
// ─────────────────────────────────────────────
const p1sets = (reps) => reps.map(r => ({ id: generateUniqueId(), reps: r, load: '' }));
const phase1 = [12, 10, 8, 6];

// ─────────────────────────────────────────────
// REUSABLE BLOCKS
// ─────────────────────────────────────────────

// --- DAY 1: BACK & BICEPS ---
const backBicepsBlock = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (90s)' },
      { id: 'arm-circles', name: 'Arm Circles (30s each way)' },
      { id: 'inchworms', name: 'Inchworms (8 reps)' },
      { id: 'band-pull-aparts', name: 'Band Pull-Aparts (15 reps)' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Strength', rest: '120s',
    note: 'Pyramid sets — start light and increase weight each set as reps decrease. Rest 2 mins between sets.',
    exercises: [
      { id: 'deadlift', name: 'Barbell Deadlift', sets: p1sets(phase1) },
      { id: 'pullups', name: 'Pull-ups (bodyweight)', sets: p1sets(phase1) },
      { id: 'barbell-row', name: 'Barbell Bent Over Row', sets: p1sets(phase1) },
      { id: 'cable-low-row', name: 'Cable Low Row (seated floor)', sets: p1sets(phase1) },
      { id: 'db-hammer-curl', name: 'DB Hammer Curl', sets: p1sets(phase1) },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'lat-stretch', name: 'Lat Stretch (60s each side)' },
      { id: 'hamstring-stretch', name: 'Hamstring Stretch (60s)' },
      { id: 'doorway-chest-stretch', name: 'Bicep/Chest Wall Stretch (45s each side)' },
    ]
  }
]);

// --- DAY 2: CHEST & TRICEPS — Session A (odd weeks) ---
const chestTricepsA = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'arm-circles', name: 'Arm Circles (30s each way)' },
      { id: 'push-ups', name: 'Push-ups x 10 (warm-up pace)' },
      { id: 'shoulder-taps', name: 'Shoulder Taps (20 reps)' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Strength', rest: '120s',
    note: 'Session A — Barbell flat + DB incline. Pyramid sets, increase weight each set.',
    exercises: [
      { id: 'bench_press', name: 'Barbell Bench Press', sets: p1sets(phase1) },
      { id: 'dumbbell-incline-press', name: 'Incline DB Press', sets: p1sets(phase1) },
      { id: 'dumbbell-fly', name: 'DB Flat Fly', sets: p1sets(phase1) },
      { id: 'dips-chair', name: 'Dips (bodyweight)', sets: p1sets(phase1) },
      { id: 'tricep-rope-pushdowns', name: 'Cable Tricep Pushdown (Rope)', sets: p1sets(phase1) },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'doorway-chest-stretch', name: 'Doorway Chest Stretch (60s)' },
      { id: 'tricep-stretch', name: 'Tricep Stretch (45s each side)' },
    ]
  }
]);

// --- DAY 2: CHEST & TRICEPS — Session B (even weeks) ---
const chestTricepsB = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'arm-circles', name: 'Arm Circles (30s each way)' },
      { id: 'push-ups', name: 'Push-ups x 10 (warm-up pace)' },
      { id: 'shoulder-taps', name: 'Shoulder Taps (20 reps)' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Strength', rest: '120s',
    note: 'Session B — DB flat + DB incline. Pyramid sets, increase weight each set.',
    exercises: [
      { id: 'dumbbell-bench-press', name: 'DB Flat Press', sets: p1sets(phase1) },
        { id: 'incline-barbell-press', name: 'Incline Barbell Press', sets: p1sets(phase1) },
      { id: 'dumbbell-incline-fly', name: 'DB Incline Fly', sets: p1sets(phase1) },
      { id: 'dips-chair', name: 'Dips (bodyweight)', sets: p1sets(phase1) },
      { id: 'tricep-rope-pushdowns', name: 'Cable Tricep Pushdown (Straight Bar)', sets: p1sets(phase1) },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'doorway-chest-stretch', name: 'Doorway Chest Stretch (60s)' },
      { id: 'tricep-stretch', name: 'Tricep Stretch (45s each side)' },
    ]
  }
]);

// --- DAY 4: LEGS ---
const legsBlock = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'air-squats', name: 'Air Squats (20 reps)' },
      { id: 'leg-swings', name: 'Leg Swings (30s each leg, each way)' },
      { id: 'glute-bridges', name: 'Glute Bridges (15 reps)' },
      { id: 'bodyweight-lunge', name: 'Alternating Lunges (10 reps)' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Strength', rest: '120s',
    note: 'Pyramid sets — start light and increase weight each set as reps decrease. Rest 2 mins between sets.',
    exercises: [
      { id: 'squat', name: 'Barbell Back Squat', sets: p1sets(phase1) },
      { id: 'dumbbell-romanian-deadlifts', name: 'Romanian Deadlift (Barbell)', sets: p1sets(phase1) },
      { id: 'dumbbell-walking-lunges', name: 'DB Walking Lunges', sets: p1sets(phase1) },
      { id: 'dumbbell-goblet-squats', name: 'DB Goblet Squat', sets: p1sets(phase1) },
      { id: 'kb-good-morning', name: 'Good Mornings (Barbell)', sets: p1sets(phase1) },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'couch-stretch', name: 'Couch Stretch (60s each side)' },
      { id: 'pigeon-pose', name: 'Pigeon Pose (60s each side)' },
      { id: 'hamstring-stretch', name: 'Seated Hamstring Stretch (60s)' },
    ]
  }
]);

// --- DAY 5: SHOULDERS & ABS ---
const shouldersAbsBlock = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'arm-circles', name: 'Arm Circles (30s each way)' },
      { id: 'band-pull-aparts', name: 'Band Pull-Aparts (15 reps)' },
      { id: 'wall-slides', name: 'Wall Slides (10 reps)' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Strength', rest: '90s',
    note: 'Pyramid sets on presses. Isolation work stays at controlled tempo. Rest 90s between sets.',
    exercises: [
      { id: 'overhead_press', name: 'Barbell Overhead Press', sets: p1sets(phase1) },
      { id: 'dumbbell-lateral-raises', name: 'DB Lateral Raises', sets: p1sets(phase1) },
      { id: 'barbell-upright-row', name: 'Barbell Upright Row', sets: p1sets(phase1) },
      { id: 'dumbbell-rear-delt-fly', name: 'DB Rear Delt Fly', sets: p1sets(phase1) },
      { id: 'dumbbell-shrugs', name: 'DB Shrugs', sets: p1sets(phase1) },
      { id: 'hanging-leg-raise', name: 'Hanging Leg Raises', sets: p1sets(phase1) },
      { id: 'barbell-rollout', name: 'Barbell Rollout (ab wheel when available)', sets: p1sets(phase1) },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'cross-body-shoulder-stretch', name: 'Cross-Body Shoulder Stretch (45s each)' },
      { id: 'lat-stretch', name: 'Lat Stretch (45s each side)' },
      { id: 'cobra-stretch', name: 'Cobra Stretch (60s)' },
    ]
  }
]);

// --- DAY 7: ACTIVE RECOVERY ---
const activeRecovery = () => ([
  {
    id: generateUniqueId(), type: 'Cardio',
    exercises: [{ id: 'walking', name: 'Easy Bike or Brisk Walk', duration: '25' }],
    note: '20-30 mins at a fully conversational pace. This is recovery, not training.'
  },
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
// METCONS — FOUNDATION PHASE
// ─────────────────────────────────────────────

// W1 D3 — AMRAP 15 mins
const w1d3 = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (90s)' },
      { id: 'inchworms', name: 'Inchworms (8 reps)' },
      { id: 'air-squats', name: 'Air Squats (15 reps)' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 15,
    note: 'Move at a sustainable pace — you should still be moving in minute 14.',
    exercises: [
      { id: 'burpees', name: 'Burpees', reps: '8' },
      { id: 'kb-swing', name: 'KB Swings', reps: '15' },
      { id: 'pullups', name: 'Pull-ups', reps: '5' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'childs-pose', name: "Child's Pose (90s)" },
      { id: 'lat-stretch', name: 'Lat Stretch (60s each)' },
    ]
  }
]);

// W1 D6 — Chipper
const w1d6 = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (90s)' },
      { id: 'air-squats', name: 'Air Squats (20 reps)' },
      { id: 'push-ups', name: 'Push-ups (10 reps)' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Conditioning: Chipper',
    note: 'For Time. Complete all reps of each movement before moving on.',
    exercises: [
      { id: 'jump-rope', name: 'Jump Rope', reps: '100' },
      { id: 'sit-up', name: 'Sit-ups', reps: '50' },
      { id: 'push-ups', name: 'Push-ups', reps: '40' },
      { id: 'air-squats', name: 'Air Squats', reps: '30' },
      { id: 'burpees', name: 'Burpees', reps: '20' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'cobra-stretch', name: 'Cobra Stretch (60s)' },
      { id: 'quad-stretch', name: 'Quad Stretch (60s each)' },
    ]
  }
]);

// W2 D3 — RFT 5 Rounds
const w2d3 = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (90s)' },
      { id: 'inchworms', name: 'Inchworms (8 reps)' },
      { id: 'jump-rope', name: 'Jump Rope (50 singles)' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5,
    note: 'Push the pace — try to beat your round 1 time each round.',
    exercises: [
      { id: 'burpees', name: 'Burpees', reps: '15' },
      { id: 'dumbbell-thrusters', name: 'DB Thrusters', reps: '12' },
      { id: 'jump-rope', name: 'Jump Rope', reps: '50' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'quad-stretch', name: 'Quad Stretch (60s each)' },
      { id: 'doorway-chest-stretch', name: 'Chest Stretch (60s)' },
    ]
  }
]);

// W2 D6 — EMOM 16 mins
const w2d6 = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (60s)' },
      { id: 'kb-swing', name: 'KB Swings (10 reps — practice)' },
      { id: 'air-squats', name: 'Air Squats (15 reps)' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Conditioning: EMOM',
    note: '4 rounds of 4 minutes. Complete the reps at the top of each minute — rest fills the remainder.',
    minutes: [
      { id: generateUniqueId(), task: 'Min 1: 10 Burpees' },
      { id: generateUniqueId(), task: 'Min 2: 20 KB Swings' },
      { id: generateUniqueId(), task: 'Min 3: 8 Pull-ups' },
      { id: generateUniqueId(), task: 'Min 4: Rest' },
      { id: generateUniqueId(), task: 'Min 5: 10 Burpees' },
      { id: generateUniqueId(), task: 'Min 6: 20 KB Swings' },
      { id: generateUniqueId(), task: 'Min 7: 8 Pull-ups' },
      { id: generateUniqueId(), task: 'Min 8: Rest' },
      { id: generateUniqueId(), task: 'Min 9: 10 Burpees' },
      { id: generateUniqueId(), task: 'Min 10: 20 KB Swings' },
      { id: generateUniqueId(), task: 'Min 11: 8 Pull-ups' },
      { id: generateUniqueId(), task: 'Min 12: Rest' },
      { id: generateUniqueId(), task: 'Min 13: 10 Burpees' },
      { id: generateUniqueId(), task: 'Min 14: 20 KB Swings' },
      { id: generateUniqueId(), task: 'Min 15: 8 Pull-ups' },
      { id: generateUniqueId(), task: 'Min 16: Rest' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'lat-stretch', name: 'Lat Stretch (60s each)' },
      { id: 'childs-pose', name: "Child's Pose (90s)" },
    ]
  }
]);

// W3 D3 — Tabata
const w3d3 = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (90s)' },
      { id: 'burpees', name: 'Burpees x 5 (slow warm-up)' },
      { id: 'kb-swing', name: 'KB Swings x 10 (warm-up)' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Conditioning: Tabata',
    note: '8 rounds of 20s on / 10s off. Alternate between Burpees and KB Swings each round. Push max effort every 20 seconds.',
    exercises: [
      { id: 'burpees', name: 'Burpees' },
      { id: 'kb-swing', name: 'KB Swings' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'cobra-stretch', name: 'Cobra Stretch (60s)' },
      { id: 'hamstring-stretch', name: 'Hamstring Stretch (60s)' },
    ]
  }
]);

// W3 D6 — AMRAP 18 mins
const w3d6 = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (90s)' },
      { id: 'inchworms', name: 'Inchworms (8 reps)' },
      { id: 'air-squats', name: 'Air Squats (15 reps)' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 18,
    note: 'Find a pace you can sustain for 18 minutes. Record your rounds + reps.',
    exercises: [
      { id: 'dumbbell-snatches', name: 'DB Snatches (5 each arm)', reps: '10' },
      { id: 'tuck-jumps', name: 'Tuck Jumps', reps: '15' },
      { id: 'sit-up', name: 'Sit-ups', reps: '20' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'quad-stretch', name: 'Quad Stretch (60s each)' },
      { id: 'cobra-stretch', name: 'Cobra Stretch (60s)' },
    ]
  }
]);

// W4 D3 — EMOM 20 mins
const w4d3 = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (90s)' },
      { id: 'barbell-clean', name: 'Empty Bar Hang Power Cleans (5 reps — technique)' },
      { id: 'air-squats', name: 'Air Squats (20 reps)' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Conditioning: EMOM',
    note: '5 rounds of 4 minutes. The barbell should be at a moderate weight — something you can cycle for 5 reps under fatigue.',
    minutes: [
      { id: generateUniqueId(), task: 'Min 1: 5 Hang Power Cleans (moderate weight)' },
      { id: generateUniqueId(), task: 'Min 2: 15 Push-ups' },
      { id: generateUniqueId(), task: 'Min 3: 20 Air Squats' },
      { id: generateUniqueId(), task: 'Min 4: Rest' },
      { id: generateUniqueId(), task: 'Min 5: 5 Hang Power Cleans' },
      { id: generateUniqueId(), task: 'Min 6: 15 Push-ups' },
      { id: generateUniqueId(), task: 'Min 7: 20 Air Squats' },
      { id: generateUniqueId(), task: 'Min 8: Rest' },
      { id: generateUniqueId(), task: 'Min 9: 5 Hang Power Cleans' },
      { id: generateUniqueId(), task: 'Min 10: 15 Push-ups' },
      { id: generateUniqueId(), task: 'Min 11: 20 Air Squats' },
      { id: generateUniqueId(), task: 'Min 12: Rest' },
      { id: generateUniqueId(), task: 'Min 13: 5 Hang Power Cleans' },
      { id: generateUniqueId(), task: 'Min 14: 15 Push-ups' },
      { id: generateUniqueId(), task: 'Min 15: 20 Air Squats' },
      { id: generateUniqueId(), task: 'Min 16: Rest' },
      { id: generateUniqueId(), task: 'Min 17: 5 Hang Power Cleans' },
      { id: generateUniqueId(), task: 'Min 18: 15 Push-ups' },
      { id: generateUniqueId(), task: 'Min 19: 20 Air Squats' },
      { id: generateUniqueId(), task: 'Min 20: Rest' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'hamstring-stretch', name: 'Hamstring Stretch (60s)' },
      { id: 'lat-stretch', name: 'Lat Stretch (60s each)' },
    ]
  }
]);

// W4 D6 — RFT 4 Rounds (only metcon with running)
const w4d6 = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (90s)' },
      { id: 'running', name: '200m easy jog' },
      { id: 'burpees', name: 'Burpees x 5 (warm-up)' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 4,
    note: 'Push each round — record your total time. Running is the only running metcon in Foundation.',
    exercises: [
      { id: 'running', name: 'Run 400m', reps: '1' },
      { id: 'burpees', name: 'Burpees', reps: '15' },
      { id: 'pullups', name: 'Pull-ups', reps: '8' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'quad-stretch', name: 'Quad Stretch (60s each)' },
      { id: 'pigeon-pose', name: 'Pigeon Pose (60s each)' },
      { id: 'lat-stretch', name: 'Lat Stretch (60s each)' },
    ]
  }
]);

// ─────────────────────────────────────────────
// TEMPLATE EXPORT
// ─────────────────────────────────────────────

export const ironConditioningFoundationTemplate = {
  id: 'template_iron_conditioning_foundation',
  name: 'Iron Conditioning: Foundation',
  description: 'Phase 1 of 3 in the Iron Conditioning series. 4 weeks of hybrid strength and metabolic conditioning designed to build your base. Strength days follow a 12-10-8-6 pyramid — start moderate and increase weight each set. Metcons rotate weekly between AMRAPs, RFTs, Tabatas, Chippers and EMOMs. Follow with Iron Conditioning: Power.',
  isTemplate: true,
  daysPerWeek: 7,
  meta: {
    type: 'Structured Program',
    level: 'Intermediate',
    equipment: 'Full Gym',
  },
  workouts: [

    // ── WEEK 1 ──────────────────────────────
    {
      id: generateUniqueId(),
      name: 'W1D1: Back & Biceps',
      blocks: backBicepsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W1D2: Chest & Triceps (Session A)',
      blocks: chestTricepsA(),
    },
    {
      id: generateUniqueId(),
      name: 'W1D3: Metcon — AMRAP 15',
      blocks: w1d3(),
    },
    {
      id: generateUniqueId(),
      name: 'W1D4: Legs',
      blocks: legsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W1D5: Shoulders & Abs',
      blocks: shouldersAbsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W1D6: Metcon — Chipper',
      blocks: w1d6(),
    },
    {
      id: generateUniqueId(),
      name: 'W1D7: Active Recovery',
      blocks: activeRecovery(),
    },

    // ── WEEK 2 ──────────────────────────────
    {
      id: generateUniqueId(),
      name: 'W2D1: Back & Biceps',
      blocks: backBicepsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W2D2: Chest & Triceps (Session B)',
      blocks: chestTricepsB(),
    },
    {
      id: generateUniqueId(),
      name: 'W2D3: Metcon — RFT 5 Rounds',
      blocks: w2d3(),
    },
    {
      id: generateUniqueId(),
      name: 'W2D4: Legs',
      blocks: legsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W2D5: Shoulders & Abs',
      blocks: shouldersAbsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W2D6: Metcon — EMOM 16',
      blocks: w2d6(),
    },
    {
      id: generateUniqueId(),
      name: 'W2D7: Active Recovery',
      blocks: activeRecovery(),
    },

    // ── WEEK 3 ──────────────────────────────
    {
      id: generateUniqueId(),
      name: 'W3D1: Back & Biceps',
      blocks: backBicepsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W3D2: Chest & Triceps (Session A)',
      blocks: chestTricepsA(),
    },
    {
      id: generateUniqueId(),
      name: 'W3D3: Metcon — Tabata',
      blocks: w3d3(),
    },
    {
      id: generateUniqueId(),
      name: 'W3D4: Legs',
      blocks: legsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W3D5: Shoulders & Abs',
      blocks: shouldersAbsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W3D6: Metcon — AMRAP 18',
      blocks: w3d6(),
    },
    {
      id: generateUniqueId(),
      name: 'W3D7: Active Recovery',
      blocks: activeRecovery(),
    },

    // ── WEEK 4 ──────────────────────────────
    {
      id: generateUniqueId(),
      name: 'W4D1: Back & Biceps',
      blocks: backBicepsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W4D2: Chest & Triceps (Session B)',
      blocks: chestTricepsB(),
    },
    {
      id: generateUniqueId(),
      name: 'W4D3: Metcon — EMOM 20',
      blocks: w4d3(),
    },
    {
      id: generateUniqueId(),
      name: 'W4D4: Legs',
      blocks: legsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W4D5: Shoulders & Abs',
      blocks: shouldersAbsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W4D6: Metcon — RFT 4 Rounds',
      blocks: w4d6(),
    },
    {
      id: generateUniqueId(),
      name: 'W4D7: Active Recovery',
      blocks: activeRecovery(),
    },

  ]
};
