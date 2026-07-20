// src/data/templates/ironConditioningApexTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

// ─────────────────────────────────────────────
// HELPER — Phase 3 pyramid: 8-6-4-2
// Near-maximal loads. Set 4 should be a true
// 2-rep max effort for the day.
// ─────────────────────────────────────────────
const p3sets = (reps) => reps.map(r => ({ id: generateUniqueId(), reps: r, load: '' }));
const phase3 = [8, 6, 4, 2];

// ─────────────────────────────────────────────
// REUSABLE STRENGTH BLOCKS — Phase 3
// Same exercises, peak loads, longest rest periods
// of the entire 12-week program
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
    id: generateUniqueId(), type: 'Strength', rest: '180s',
    note: 'Phase 3 — 8-6-4-2 pyramid. This is peak strength territory. Your 2-rep set should be a near-maximal effort. Rest 3 full minutes between sets — do not rush. These are the heaviest loads of the entire program.',
    exercises: [
      { id: 'deadlift', name: 'Barbell Deadlift', sets: p3sets(phase3) },
      { id: 'pullups', name: 'Pull-ups (bodyweight)', sets: p3sets(phase3) },
      { id: 'barbell-row', name: 'Barbell Bent Over Row', sets: p3sets(phase3) },
      { id: 'cable-low-row', name: 'Cable Low Row (seated floor)', sets: p3sets(phase3) },
      { id: 'db-hammer-curl', name: 'DB Hammer Curl', sets: p3sets(phase3) },
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

// --- DAY 2: CHEST & TRICEPS — Session A (odd weeks: W9, W11) ---
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
    id: generateUniqueId(), type: 'Strength', rest: '180s',
    note: 'Session A — Barbell flat + Barbell incline. Peak loads. Your 2-rep bench press set should be close to your current max. Spotter recommended on the heavy sets.',
    exercises: [
      { id: 'bench_press', name: 'Barbell Bench Press', sets: p3sets(phase3) },
      { id: 'incline-barbell-press', name: 'Incline Barbell Press', sets: p3sets(phase3) },
      { id: 'dumbbell-fly', name: 'DB Flat Fly', sets: p3sets(phase3) },
      { id: 'dips-chair', name: 'Dips (bodyweight)', sets: p3sets(phase3) },
      { id: 'tricep-rope-pushdowns', name: 'Cable Tricep Pushdown (Rope)', sets: p3sets(phase3) },
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

// --- DAY 2: CHEST & TRICEPS — Session B (even weeks: W10, W12) ---
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
    id: generateUniqueId(), type: 'Strength', rest: '180s',
    note: 'Session B — DB flat + Barbell incline. Peak loads. Heaviest DBs you have used across the full 12 weeks. Push the 2-rep sets.',
    exercises: [
      { id: 'dumbbell-bench-press', name: 'DB Flat Press', sets: p3sets(phase3) },
      { id: 'incline-barbell-press', name: 'Incline Barbell Press', sets: p3sets(phase3) },
      { id: 'dumbbell-incline-fly', name: 'DB Incline Fly', sets: p3sets(phase3) },
      { id: 'dips-chair', name: 'Dips (bodyweight)', sets: p3sets(phase3) },
      { id: 'tricep-rope-pushdowns', name: 'Cable Tricep Pushdown (Straight Bar)', sets: p3sets(phase3) },
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
    id: generateUniqueId(), type: 'Strength', rest: '180s',
    note: 'Phase 3 — 8-6-4-2 pyramid. Peak squat and deadlift loads of the entire program. 3 full minutes rest between sets. Your 2-rep squat set should be close to your current max.',
    exercises: [
      { id: 'squat', name: 'Barbell Back Squat', sets: p3sets(phase3) },
      { id: 'dumbbell-romanian-deadlifts', name: 'Romanian Deadlift (Barbell)', sets: p3sets(phase3) },
      { id: 'dumbbell-walking-lunges', name: 'DB Walking Lunges', sets: p3sets(phase3) },
      { id: 'dumbbell-goblet-squats', name: 'DB Goblet Squat', sets: p3sets(phase3) },
      { id: 'kb-good-morning', name: 'Good Mornings (Barbell)', sets: p3sets(phase3) },
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
    id: generateUniqueId(), type: 'Strength', rest: '150s',
    note: 'Phase 3 — peak OHP loads. Your 2-rep overhead press should be a true near-max effort. Isolation movements stay controlled — the heavy load is on the compound work.',
    exercises: [
      { id: 'overhead_press', name: 'Barbell Overhead Press', sets: p3sets(phase3) },
      { id: 'dumbbell-lateral-raises', name: 'DB Lateral Raises', sets: p3sets(phase3) },
      { id: 'barbell-upright-row', name: 'Barbell Upright Row', sets: p3sets(phase3) },
      { id: 'dumbbell-rear-delt-fly', name: 'DB Rear Delt Fly', sets: p3sets(phase3) },
      { id: 'dumbbell-shrugs', name: 'DB Shrugs', sets: p3sets(phase3) },
      { id: 'hanging-leg-raise', name: 'Hanging Leg Raises', sets: p3sets(phase3) },
      { id: 'barbell-rollout', name: 'Barbell Rollout (ab wheel)', sets: p3sets(phase3) },
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
    note: '20-30 mins at a fully conversational pace. At this stage of the program your body needs this more than ever. Protect the recovery.'
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
// METCONS — APEX PHASE
// Longest, heaviest, most complex of the program.
// Every metcon here is harder than anything in
// Foundation or Power.
// ─────────────────────────────────────────────

// W9 D3 — Chipper (longest chipper of the program)
const w9d3 = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (90s)' },
      { id: 'barbell-clean', name: 'Empty Bar Hang Power Cleans (5 reps — technique)' },
      { id: 'air-squats', name: 'Air Squats (20 reps)' },
      { id: 'pullups', name: 'Pull-ups x 5' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Conditioning: Chipper',
    note: 'For Time. The longest chipper of the program. Barbell should be heavy — something you can cycle for sets of 3-5 when fatigued. Pace the jump rope and save yourself for the cleans at the end.',
    exercises: [
      { id: 'jump-rope', name: 'Jump Rope', reps: '200' },
      { id: 'sit-up', name: 'Sit-ups', reps: '50' },
      { id: 'burpees', name: 'Burpees', reps: '40' },
      { id: 'dumbbell-snatches', name: 'DB Snatches (15 each arm)', reps: '30' },
      { id: 'pullups', name: 'Pull-ups', reps: '20' },
      { id: 'barbell-clean', name: 'Hang Power Cleans (heavy)', reps: '10' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'lat-stretch', name: 'Lat Stretch (60s each)' },
      { id: 'hamstring-stretch', name: 'Hamstring Stretch (60s)' },
      { id: 'childs-pose', name: "Child's Pose (90s)" },
    ]
  }
]);

// W9 D6 — AMRAP 20 mins (bike replaces run, tuck jumps for intensity)
const w9d6 = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (90s)' },
      { id: 'kb-swing', name: 'KB Swings x 10' },
      { id: 'burpees', name: 'Burpees x 5' },
      { id: 'pullups', name: 'Pull-ups x 5' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 20,
    note: 'Four movements — find a pace and hold it. The tuck jumps replace the bike so you can push the pace throughout. Record rounds + reps.',
    exercises: [
      { id: 'burpees', name: 'Burpees', reps: '10' },
      { id: 'kb-swing', name: 'KB Swings', reps: '15' },
      { id: 'pullups', name: 'Pull-ups', reps: '8' },
      { id: 'tuck-jumps', name: 'Tuck Jumps', reps: '10' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'quad-stretch', name: 'Quad Stretch (60s each)' },
      { id: 'cobra-stretch', name: 'Cobra Stretch (60s)' },
      { id: 'lat-stretch', name: 'Lat Stretch (60s each)' },
    ]
  }
]);

// W10 D3 — RFT 5 Rounds (heavy barbell cycling)
const w10d3 = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (90s)' },
      { id: 'barbell-clean', name: 'Empty Bar Hang Power Cleans (5 reps)' },
      { id: 'kb-swing', name: 'KB Swings x 10' },
      { id: 'jump-rope', name: 'Jump Rope (50 singles)' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5,
    note: 'Heavier cleans than W6. This should be uncomfortable by round 3. Record total time — compare to W6D3 to measure your progress.',
    exercises: [
      { id: 'barbell-clean', name: 'Hang Power Cleans (heavy)', reps: '10' },
      { id: 'burpees', name: 'Burpees', reps: '15' },
      { id: 'kb-swing', name: 'KB Swings', reps: '20' },
      { id: 'jump-rope', name: 'Jump Rope', reps: '50' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'hamstring-stretch', name: 'Hamstring Stretch (60s)' },
      { id: 'lat-stretch', name: 'Lat Stretch (60s each)' },
      { id: 'childs-pose', name: "Child's Pose (90s)" },
    ]
  }
]);

// W10 D6 — EMOM 24 mins (heavier cleans than W8)
const w10d6 = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (90s)' },
      { id: 'barbell-clean', name: 'Empty Bar Hang Power Cleans (5 reps)' },
      { id: 'kb-swing', name: 'KB Swings x 10' },
      { id: 'burpees', name: 'Burpees x 5' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Conditioning: EMOM',
    note: '6 rounds of 4 minutes. Heavier cleans than W8D3. By round 5 the rest minute should feel very short. This is the second hardest EMOM of the program.',
    minutes: [
      { id: generateUniqueId(), task: 'Min 1: 8 Hang Power Cleans (heavy)' },
      { id: generateUniqueId(), task: 'Min 2: 15 Burpees' },
      { id: generateUniqueId(), task: 'Min 3: 20 KB Swings' },
      { id: generateUniqueId(), task: 'Min 4: Rest' },
      { id: generateUniqueId(), task: 'Min 5: 8 Hang Power Cleans' },
      { id: generateUniqueId(), task: 'Min 6: 15 Burpees' },
      { id: generateUniqueId(), task: 'Min 7: 20 KB Swings' },
      { id: generateUniqueId(), task: 'Min 8: Rest' },
      { id: generateUniqueId(), task: 'Min 9: 8 Hang Power Cleans' },
      { id: generateUniqueId(), task: 'Min 10: 15 Burpees' },
      { id: generateUniqueId(), task: 'Min 11: 20 KB Swings' },
      { id: generateUniqueId(), task: 'Min 12: Rest' },
      { id: generateUniqueId(), task: 'Min 13: 8 Hang Power Cleans' },
      { id: generateUniqueId(), task: 'Min 14: 15 Burpees' },
      { id: generateUniqueId(), task: 'Min 15: 20 KB Swings' },
      { id: generateUniqueId(), task: 'Min 16: Rest' },
      { id: generateUniqueId(), task: 'Min 17: 8 Hang Power Cleans' },
      { id: generateUniqueId(), task: 'Min 18: 15 Burpees' },
      { id: generateUniqueId(), task: 'Min 19: 20 KB Swings' },
      { id: generateUniqueId(), task: 'Min 20: Rest' },
      { id: generateUniqueId(), task: 'Min 21: 8 Hang Power Cleans' },
      { id: generateUniqueId(), task: 'Min 22: 15 Burpees' },
      { id: generateUniqueId(), task: 'Min 23: 20 KB Swings' },
      { id: generateUniqueId(), task: 'Min 24: Rest' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'lat-stretch', name: 'Lat Stretch (60s each)' },
      { id: 'hamstring-stretch', name: 'Hamstring Stretch (60s)' },
      { id: 'childs-pose', name: "Child's Pose (90s)" },
    ]
  }
]);

// W11 D3 — AMRAP 20 mins (benchmark — record your score)
const w11d3 = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (90s)' },
      { id: 'barbell-clean', name: 'Empty Bar Hang Power Cleans (5 reps)' },
      { id: 'pullups', name: 'Pull-ups x 5' },
      { id: 'push-ups', name: 'Push-ups x 10' },
      { id: 'air-squats', name: 'Air Squats (15 reps)' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 20,
    note: 'BENCHMARK — record your score. This is a modified hero-style workout hitting every major pattern. Find a strong sustainable pace from minute 1. Compare this score when you repeat Iron Conditioning.',
    exercises: [
      { id: 'pullups', name: 'Pull-ups', reps: '5' },
      { id: 'push-ups', name: 'Push-ups', reps: '10' },
      { id: 'air-squats', name: 'Air Squats', reps: '15' },
      { id: 'kb-swing', name: 'KB Swings', reps: '10' },
      { id: 'barbell-clean', name: 'Hang Power Cleans', reps: '5' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'lat-stretch', name: 'Lat Stretch (60s each)' },
      { id: 'quad-stretch', name: 'Quad Stretch (60s each)' },
      { id: 'pigeon-pose', name: 'Pigeon Pose (60s each)' },
      { id: 'childs-pose', name: "Child's Pose (90s)" },
    ]
  }
]);

// W11 D6 — Chipper (longest chipper of the entire program)
const w11d6 = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (90s)' },
      { id: 'jump-rope', name: 'Jump Rope (50 singles)' },
      { id: 'barbell-clean', name: 'Empty Bar Hang Power Cleans (5 reps)' },
      { id: 'pullups', name: 'Pull-ups x 5' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Conditioning: Chipper',
    note: 'For Time. The longest chipper of the entire 12-week program. Starts and ends with 200 jump rope — pace the first set so you have something left at the end. Barbell should be heavy but cycleable.',
    exercises: [
      { id: 'jump-rope', name: 'Jump Rope', reps: '200' },
      { id: 'push-ups', name: 'Push-ups', reps: '50' },
      { id: 'sit-up', name: 'Sit-ups', reps: '40' },
      { id: 'burpees', name: 'Burpees', reps: '30' },
      { id: 'pullups', name: 'Pull-ups', reps: '20' },
      { id: 'barbell-clean', name: 'Hang Power Cleans (heavy)', reps: '10' },
      { id: 'jump-rope', name: 'Jump Rope', reps: '200' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'lat-stretch', name: 'Lat Stretch (60s each)' },
      { id: 'quad-stretch', name: 'Quad Stretch (60s each)' },
      { id: 'cobra-stretch', name: 'Cobra Stretch (60s)' },
      { id: 'childs-pose', name: "Child's Pose (90s)" },
    ]
  }
]);

// W12 D3 — RFT 6 Rounds (peak test — hardest RFT of the program)
const w12d3 = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (90s)' },
      { id: 'barbell-clean', name: 'Empty Bar Hang Power Cleans (5 reps)' },
      { id: 'kb-swing', name: 'KB Swings x 10' },
      { id: 'air-squats', name: 'Air Squats (15 reps)' },
      { id: 'burpees', name: 'Burpees x 5' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 6,
    note: 'PEAK TEST — 6 rounds, heaviest barbell of any metcon in the program. This is everything you have built over 12 weeks. Push harder than you think you can. Record your total time.',
    exercises: [
      { id: 'barbell-clean', name: 'Hang Power Cleans (heavy)', reps: '5' },
      { id: 'burpees', name: 'Burpees', reps: '10' },
      { id: 'kb-swing', name: 'KB Swings', reps: '15' },
      { id: 'air-squats', name: 'Air Squats', reps: '20' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'quad-stretch', name: 'Quad Stretch (60s each)' },
      { id: 'hamstring-stretch', name: 'Hamstring Stretch (60s)' },
      { id: 'lat-stretch', name: 'Lat Stretch (60s each)' },
      { id: 'childs-pose', name: "Child's Pose (90s)" },
    ]
  }
]);

// W12 D6 — EMOM 30 mins (the grand finale — 6 rounds of 5)
const w12d6 = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (90s)' },
      { id: 'barbell-clean', name: 'Empty Bar Hang Power Cleans (5 reps)' },
      { id: 'kb-swing', name: 'KB Swings x 10' },
      { id: 'pullups', name: 'Pull-ups x 5' },
      { id: 'burpees', name: 'Burpees x 5' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Conditioning: EMOM',
    note: 'THE GRAND FINALE. 30 minutes, 6 rounds of 5. Every movement you have built across 12 weeks in one session. Barbell at a weight that challenges you but allows you to complete every set. The rest minute in round 6 is earned. Congratulations on completing Iron Conditioning.',
    minutes: [
      { id: generateUniqueId(), task: 'Min 1: 8 Hang Power Cleans (heavy)' },
      { id: generateUniqueId(), task: 'Min 2: 10 Burpees' },
      { id: generateUniqueId(), task: 'Min 3: 15 KB Swings' },
      { id: generateUniqueId(), task: 'Min 4: 10 Pull-ups' },
      { id: generateUniqueId(), task: 'Min 5: Rest' },
      { id: generateUniqueId(), task: 'Min 6: 8 Hang Power Cleans' },
      { id: generateUniqueId(), task: 'Min 7: 10 Burpees' },
      { id: generateUniqueId(), task: 'Min 8: 15 KB Swings' },
      { id: generateUniqueId(), task: 'Min 9: 10 Pull-ups' },
      { id: generateUniqueId(), task: 'Min 10: Rest' },
      { id: generateUniqueId(), task: 'Min 11: 8 Hang Power Cleans' },
      { id: generateUniqueId(), task: 'Min 12: 10 Burpees' },
      { id: generateUniqueId(), task: 'Min 13: 15 KB Swings' },
      { id: generateUniqueId(), task: 'Min 14: 10 Pull-ups' },
      { id: generateUniqueId(), task: 'Min 15: Rest' },
      { id: generateUniqueId(), task: 'Min 16: 8 Hang Power Cleans' },
      { id: generateUniqueId(), task: 'Min 17: 10 Burpees' },
      { id: generateUniqueId(), task: 'Min 18: 15 KB Swings' },
      { id: generateUniqueId(), task: 'Min 19: 10 Pull-ups' },
      { id: generateUniqueId(), task: 'Min 20: Rest' },
      { id: generateUniqueId(), task: 'Min 21: 8 Hang Power Cleans' },
      { id: generateUniqueId(), task: 'Min 22: 10 Burpees' },
      { id: generateUniqueId(), task: 'Min 23: 15 KB Swings' },
      { id: generateUniqueId(), task: 'Min 24: 10 Pull-ups' },
      { id: generateUniqueId(), task: 'Min 25: Rest' },
      { id: generateUniqueId(), task: 'Min 26: 8 Hang Power Cleans' },
      { id: generateUniqueId(), task: 'Min 27: 10 Burpees' },
      { id: generateUniqueId(), task: 'Min 28: 15 KB Swings' },
      { id: generateUniqueId(), task: 'Min 29: 10 Pull-ups' },
      { id: generateUniqueId(), task: 'Min 30: Rest — you earned it.' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'pigeon-pose', name: 'Pigeon Pose (90s each side)' },
      { id: 'couch-stretch', name: 'Couch Stretch (90s each side)' },
      { id: 'lat-stretch', name: 'Lat Stretch (60s each)' },
      { id: 'hamstring-stretch', name: 'Hamstring Stretch (60s)' },
      { id: 'cobra-stretch', name: 'Cobra Stretch (60s)' },
      { id: 'childs-pose', name: "Child's Pose (120s)" },
      { id: null, name: 'Take a moment. 12 weeks of work is done.' },
    ]
  }
]);

// ─────────────────────────────────────────────
// TEMPLATE EXPORT
// ─────────────────────────────────────────────

export const ironConditioningApexTemplate = {
  id: 'template_iron_conditioning_apex',
  name: 'Iron Conditioning: Apex',
  description: 'Phase 3 of 3 in the Iron Conditioning series. The peak of 12 weeks of hybrid strength and conditioning. Strength days follow an 8-6-4-2 pyramid — near-maximal loads, 3 minute rest periods. Metcons are the longest and most demanding of the program, culminating in a 30 minute EMOM grand finale on Week 12. Complete Iron Conditioning: Foundation and Iron Conditioning: Power before starting this program.',
  isTemplate: true,
  daysPerWeek: 7,
  meta: {
    type: 'Structured Program',
    level: 'Advanced',
    equipment: 'Full Gym',
  },
  workouts: [

    // ── WEEK 9 ──────────────────────────────
    {
      id: generateUniqueId(),
      name: 'W9D1: Back & Biceps',
      blocks: backBicepsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W9D2: Chest & Triceps (Session A)',
      blocks: chestTricepsA(),
    },
    {
      id: generateUniqueId(),
      name: 'W9D3: Metcon — Chipper',
      blocks: w9d3(),
    },
    {
      id: generateUniqueId(),
      name: 'W9D4: Legs',
      blocks: legsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W9D5: Shoulders & Abs',
      blocks: shouldersAbsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W9D6: Metcon — AMRAP 20',
      blocks: w9d6(),
    },
    {
      id: generateUniqueId(),
      name: 'W9D7: Active Recovery',
      blocks: activeRecovery(),
    },

    // ── WEEK 10 ─────────────────────────────
    {
      id: generateUniqueId(),
      name: 'W10D1: Back & Biceps',
      blocks: backBicepsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W10D2: Chest & Triceps (Session B)',
      blocks: chestTricepsB(),
    },
    {
      id: generateUniqueId(),
      name: 'W10D3: Metcon — RFT 5 Rounds',
      blocks: w10d3(),
    },
    {
      id: generateUniqueId(),
      name: 'W10D4: Legs',
      blocks: legsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W10D5: Shoulders & Abs',
      blocks: shouldersAbsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W10D6: Metcon — EMOM 24',
      blocks: w10d6(),
    },
    {
      id: generateUniqueId(),
      name: 'W10D7: Active Recovery',
      blocks: activeRecovery(),
    },

    // ── WEEK 11 ─────────────────────────────
    {
      id: generateUniqueId(),
      name: 'W11D1: Back & Biceps',
      blocks: backBicepsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W11D2: Chest & Triceps (Session A)',
      blocks: chestTricepsA(),
    },
    {
      id: generateUniqueId(),
      name: 'W11D3: Metcon — AMRAP 20 (Benchmark)',
      blocks: w11d3(),
    },
    {
      id: generateUniqueId(),
      name: 'W11D4: Legs',
      blocks: legsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W11D5: Shoulders & Abs',
      blocks: shouldersAbsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W11D6: Metcon — Chipper (The Long One)',
      blocks: w11d6(),
    },
    {
      id: generateUniqueId(),
      name: 'W11D7: Active Recovery',
      blocks: activeRecovery(),
    },

    // ── WEEK 12 ─────────────────────────────
    {
      id: generateUniqueId(),
      name: 'W12D1: Back & Biceps',
      blocks: backBicepsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W12D2: Chest & Triceps (Session B)',
      blocks: chestTricepsB(),
    },
    {
      id: generateUniqueId(),
      name: 'W12D3: Metcon — RFT 6 Rounds (Peak Test)',
      blocks: w12d3(),
    },
    {
      id: generateUniqueId(),
      name: 'W12D4: Legs',
      blocks: legsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W12D5: Shoulders & Abs',
      blocks: shouldersAbsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W12D6: Metcon — EMOM 30 (Grand Finale)',
      blocks: w12d6(),
    },
    {
      id: generateUniqueId(),
      name: 'W12D7: Active Recovery & Celebration',
      blocks: activeRecovery(),
    },

  ]
};
