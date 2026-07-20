// src/data/templates/ironConditioningPowerTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

// ─────────────────────────────────────────────
// HELPER — Phase 2 pyramid: 10-8-6-4
// Heavier loads, lower reps, more intensity
// ─────────────────────────────────────────────
const p2sets = (reps) => reps.map(r => ({ id: generateUniqueId(), reps: r, load: '' }));
const phase2 = [10, 8, 6, 4];

// ─────────────────────────────────────────────
// REUSABLE STRENGTH BLOCKS — Phase 2
// Same exercises as Foundation, heavier loads,
// longer rest to support increased intensity
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
    id: generateUniqueId(), type: 'Strength', rest: '150s',
    note: 'Phase 2 — 10-8-6-4 pyramid. Loads should be heavier than Foundation. By set 4 you should be near your limit for 4 reps. Rest 2.5 mins between sets.',
    exercises: [
      { id: 'deadlift', name: 'Barbell Deadlift', sets: p2sets(phase2) },
      { id: 'pullups', name: 'Pull-ups (bodyweight)', sets: p2sets(phase2) },
      { id: 'barbell-row', name: 'Barbell Bent Over Row', sets: p2sets(phase2) },
      { id: 'cable-low-row', name: 'Cable Low Row (seated floor)', sets: p2sets(phase2) },
      { id: 'db-hammer-curl', name: 'DB Hammer Curl', sets: p2sets(phase2) },
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

// --- DAY 2: CHEST & TRICEPS — Session A (odd weeks: W5, W7) ---
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
    id: generateUniqueId(), type: 'Strength', rest: '150s',
    note: 'Session A — Barbell flat + Barbell incline. Phase 2 loads are heavier than Foundation. Push hard on the 4-rep sets.',
    exercises: [
      { id: 'bench_press', name: 'Barbell Bench Press', sets: p2sets(phase2) },
      { id: 'incline-barbell-press', name: 'Incline Barbell Press', sets: p2sets(phase2) },
      { id: 'dumbbell-fly', name: 'DB Flat Fly', sets: p2sets(phase2) },
      { id: 'dips-chair', name: 'Dips (bodyweight)', sets: p2sets(phase2) },
      { id: 'tricep-rope-pushdowns', name: 'Cable Tricep Pushdown (Rope)', sets: p2sets(phase2) },
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

// --- DAY 2: CHEST & TRICEPS — Session B (even weeks: W6, W8) ---
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
    id: generateUniqueId(), type: 'Strength', rest: '150s',
    note: 'Session B — DB flat + Barbell incline. Heavier DBs than Foundation. Push hard on the 4-rep sets.',
    exercises: [
      { id: 'dumbbell-bench-press', name: 'DB Flat Press', sets: p2sets(phase2) },
      { id: 'incline-barbell-press', name: 'Incline Barbell Press', sets: p2sets(phase2) },
      { id: 'dumbbell-incline-fly', name: 'DB Incline Fly', sets: p2sets(phase2) },
      { id: 'dips-chair', name: 'Dips (bodyweight)', sets: p2sets(phase2) },
      { id: 'tricep-rope-pushdowns', name: 'Cable Tricep Pushdown (Straight Bar)', sets: p2sets(phase2) },
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
    id: generateUniqueId(), type: 'Strength', rest: '150s',
    note: 'Phase 2 — 10-8-6-4 pyramid. Squat and deadlift loads should be meaningfully heavier than Foundation. Rest 2.5 mins between sets.',
    exercises: [
      { id: 'squat', name: 'Barbell Back Squat', sets: p2sets(phase2) },
      { id: 'dumbbell-romanian-deadlifts', name: 'Romanian Deadlift (Barbell)', sets: p2sets(phase2) },
      { id: 'dumbbell-walking-lunges', name: 'DB Walking Lunges', sets: p2sets(phase2) },
      { id: 'dumbbell-goblet-squats', name: 'DB Goblet Squat', sets: p2sets(phase2) },
      { id: 'kb-good-morning', name: 'Good Mornings (Barbell)', sets: p2sets(phase2) },
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
    id: generateUniqueId(), type: 'Strength', rest: '120s',
    note: 'Phase 2 — heavier OHP and isolation work. Push the 4-rep sets on OHP. Controlled tempo on isolation movements.',
    exercises: [
      { id: 'overhead_press', name: 'Barbell Overhead Press', sets: p2sets(phase2) },
      { id: 'dumbbell-lateral-raises', name: 'DB Lateral Raises', sets: p2sets(phase2) },
      { id: 'barbell-upright-row', name: 'Barbell Upright Row', sets: p2sets(phase2) },
      { id: 'dumbbell-rear-delt-fly', name: 'DB Rear Delt Fly', sets: p2sets(phase2) },
      { id: 'dumbbell-shrugs', name: 'DB Shrugs', sets: p2sets(phase2) },
      { id: 'hanging-leg-raise', name: 'Hanging Leg Raises', sets: p2sets(phase2) },
      { id: 'barbell-rollout', name: 'Barbell Rollout (ab wheel when available)', sets: p2sets(phase2) },
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
    note: '20-30 mins at a fully conversational pace. This is recovery, not training. Your body is adapting — protect it.'
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
// METCONS — POWER PHASE
// Longer, heavier, more complex than Foundation
// ─────────────────────────────────────────────

// W5 D3 — AMRAP 18 mins (longer than W1, heavier movements)
const w5d3 = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (90s)' },
      { id: 'inchworms', name: 'Inchworms (8 reps)' },
      { id: 'air-squats', name: 'Air Squats (15 reps)' },
      { id: 'kb-swing', name: 'KB Swings x 10 (warm-up weight)' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 18,
    note: 'Heavier and longer than Foundation AMRAPs. Use a KB weight that challenges you on the swings. Record rounds + reps.',
    exercises: [
      { id: 'burpees', name: 'Burpees', reps: '10' },
      { id: 'kb-swing', name: 'KB Swings', reps: '20' },
      { id: 'pullups', name: 'Pull-ups', reps: '6' },
      { id: 'dumbbell-thrusters', name: 'DB Thrusters', reps: '12' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'childs-pose', name: "Child's Pose (90s)" },
      { id: 'lat-stretch', name: 'Lat Stretch (60s each)' },
      { id: 'quad-stretch', name: 'Quad Stretch (60s each)' },
    ]
  }
]);

// W5 D6 — Chipper (longer than W1 chipper)
const w5d6 = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (90s)' },
      { id: 'air-squats', name: 'Air Squats (20 reps)' },
      { id: 'push-ups', name: 'Push-ups (10 reps)' },
      { id: 'jump-rope', name: 'Jump Rope (50 singles)' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Conditioning: Chipper',
    note: 'For Time. Longer than the Foundation chipper — pace yourself on the jump rope and push hard on the pull-ups.',
    exercises: [
      { id: 'jump-rope', name: 'Jump Rope', reps: '150' },
      { id: 'push-ups', name: 'Push-ups', reps: '50' },
      { id: 'sit-up', name: 'Sit-ups', reps: '40' },
      { id: 'burpees', name: 'Burpees', reps: '30' },
      { id: 'dumbbell-snatches', name: 'DB Snatches (10 each arm)', reps: '20' },
      { id: 'pullups', name: 'Pull-ups', reps: '10' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'cobra-stretch', name: 'Cobra Stretch (60s)' },
      { id: 'lat-stretch', name: 'Lat Stretch (60s each)' },
      { id: 'quad-stretch', name: 'Quad Stretch (60s each)' },
    ]
  }
]);

// W6 D3 — RFT 5 Rounds (heavier barbell cycling added)
const w6d3 = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (90s)' },
      { id: 'barbell-clean', name: 'Empty Bar Hang Power Cleans (5 reps — technique)' },
      { id: 'burpees', name: 'Burpees x 5 (warm-up)' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5,
    note: 'Push the pace — your barbell weight should be challenging but cycleable for 10 reps under fatigue. Record total time.',
    exercises: [
      { id: 'barbell-clean', name: 'Hang Power Cleans (moderate-heavy)', reps: '10' },
      { id: 'burpees', name: 'Burpees', reps: '15' },
      { id: 'jump-rope', name: 'Jump Rope', reps: '50' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'hamstring-stretch', name: 'Hamstring Stretch (60s)' },
      { id: 'lat-stretch', name: 'Lat Stretch (60s each)' },
      { id: 'doorway-chest-stretch', name: 'Chest Stretch (60s)' },
    ]
  }
]);

// W6 D6 — EMOM 20 mins (longer than W2, DB thrusters added)
const w6d6 = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (60s)' },
      { id: 'dumbbell-thrusters', name: 'DB Thrusters x 8 (warm-up weight)' },
      { id: 'kb-swing', name: 'KB Swings x 10' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Conditioning: EMOM',
    note: '5 rounds of 4 minutes. Heavier and longer than Foundation EMOM. The rest minute should feel earned.',
    minutes: [
      { id: generateUniqueId(), task: 'Min 1: 12 DB Thrusters' },
      { id: generateUniqueId(), task: 'Min 2: 15 KB Swings' },
      { id: generateUniqueId(), task: 'Min 3: 10 Tuck Jumps' },
      { id: generateUniqueId(), task: 'Min 4: Rest' },
      { id: generateUniqueId(), task: 'Min 5: 12 DB Thrusters' },
      { id: generateUniqueId(), task: 'Min 6: 15 KB Swings' },
      { id: generateUniqueId(), task: 'Min 7: 10 Tuck Jumps' },
      { id: generateUniqueId(), task: 'Min 8: Rest' },
      { id: generateUniqueId(), task: 'Min 9: 12 DB Thrusters' },
      { id: generateUniqueId(), task: 'Min 10: 15 KB Swings' },
      { id: generateUniqueId(), task: 'Min 11: 10 Tuck Jumps' },
      { id: generateUniqueId(), task: 'Min 12: Rest' },
      { id: generateUniqueId(), task: 'Min 13: 12 DB Thrusters' },
      { id: generateUniqueId(), task: 'Min 14: 15 KB Swings' },
      { id: generateUniqueId(), task: 'Min 15: 10 Tuck Jumps' },
      { id: generateUniqueId(), task: 'Min 16: Rest' },
      { id: generateUniqueId(), task: 'Min 17: 12 DB Thrusters' },
      { id: generateUniqueId(), task: 'Min 18: 15 KB Swings' },
      { id: generateUniqueId(), task: 'Min 19: 10 Tuck Jumps' },
      { id: generateUniqueId(), task: 'Min 20: Rest' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'quad-stretch', name: 'Quad Stretch (60s each)' },
      { id: 'childs-pose', name: "Child's Pose (90s)" },
    ]
  }
]);

// W7 D3 — Tabata (tuck jumps added, more brutal than W3)
const w7d3 = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (90s)' },
      { id: 'burpees', name: 'Burpees x 5 (slow warm-up)' },
      { id: 'tuck-jumps', name: 'Tuck Jumps x 8 (warm-up)' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Conditioning: Tabata',
    note: '8 rounds of 20s on / 10s off. Alternate between Burpees and Tuck Jumps. Max effort every 20 seconds — this one hurts.',
    exercises: [
      { id: 'burpees', name: 'Burpees' },
      { id: 'tuck-jumps', name: 'Tuck Jumps' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'cobra-stretch', name: 'Cobra Stretch (60s)' },
      { id: 'quad-stretch', name: 'Quad Stretch (60s each)' },
      { id: 'hamstring-stretch', name: 'Hamstring Stretch (60s)' },
    ]
  }
]);

// W7 D6 — AMRAP 20 mins (barbell cycling introduced)
const w7d6 = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (90s)' },
      { id: 'barbell-clean', name: 'Empty Bar Hang Power Cleans (5 reps — technique)' },
      { id: 'kb-swing', name: 'KB Swings x 10' },
      { id: 'pullups', name: 'Pull-ups x 5' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 20,
    note: 'The longest AMRAP so far. Barbell should be moderate — something you can cycle for 12 reps when fresh and 8-10 when gassed. Record rounds + reps.',
    exercises: [
      { id: 'pullups', name: 'Pull-ups', reps: '8' },
      { id: 'barbell-clean', name: 'Hang Power Cleans', reps: '12' },
      { id: 'kb-swing', name: 'KB Swings', reps: '16' },
      { id: 'sit-up', name: 'Sit-ups', reps: '20' },
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

// W8 D3 — EMOM 24 mins (densest EMOM yet, 6 rounds)
const w8d3 = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (90s)' },
      { id: 'barbell-clean', name: 'Empty Bar Hang Power Cleans (5 reps)' },
      { id: 'kb-swing', name: 'KB Swings x 10' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Conditioning: EMOM',
    note: '6 rounds of 4 minutes — the densest EMOM in the program so far. Barbell should be the same weight as W6D3 or heavier. The rest minute will feel short.',
    minutes: [
      { id: generateUniqueId(), task: 'Min 1: 6 Hang Power Cleans (heavy)' },
      { id: generateUniqueId(), task: 'Min 2: 12 Push-ups' },
      { id: generateUniqueId(), task: 'Min 3: 20 KB Swings' },
      { id: generateUniqueId(), task: 'Min 4: Rest' },
      { id: generateUniqueId(), task: 'Min 5: 6 Hang Power Cleans' },
      { id: generateUniqueId(), task: 'Min 6: 12 Push-ups' },
      { id: generateUniqueId(), task: 'Min 7: 20 KB Swings' },
      { id: generateUniqueId(), task: 'Min 8: Rest' },
      { id: generateUniqueId(), task: 'Min 9: 6 Hang Power Cleans' },
      { id: generateUniqueId(), task: 'Min 10: 12 Push-ups' },
      { id: generateUniqueId(), task: 'Min 11: 20 KB Swings' },
      { id: generateUniqueId(), task: 'Min 12: Rest' },
      { id: generateUniqueId(), task: 'Min 13: 6 Hang Power Cleans' },
      { id: generateUniqueId(), task: 'Min 14: 12 Push-ups' },
      { id: generateUniqueId(), task: 'Min 15: 20 KB Swings' },
      { id: generateUniqueId(), task: 'Min 16: Rest' },
      { id: generateUniqueId(), task: 'Min 17: 6 Hang Power Cleans' },
      { id: generateUniqueId(), task: 'Min 18: 12 Push-ups' },
      { id: generateUniqueId(), task: 'Min 19: 20 KB Swings' },
      { id: generateUniqueId(), task: 'Min 20: Rest' },
      { id: generateUniqueId(), task: 'Min 21: 6 Hang Power Cleans' },
      { id: generateUniqueId(), task: 'Min 22: 12 Push-ups' },
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

// W8 D6 — RFT 5 Rounds (heavier, more complex than W2)
const w8d6 = () => ([
  {
    id: generateUniqueId(), type: 'Warm-up',
    exercises: [
      { id: 'jumping-jack', name: 'Jumping Jacks (90s)' },
      { id: 'jump-rope', name: 'Jump Rope (50 singles)' },
      { id: 'burpees', name: 'Burpees x 5 (warm-up)' },
      { id: 'dumbbell-thrusters', name: 'DB Thrusters x 8 (warm-up weight)' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5,
    note: 'The hardest RFT of the Power phase. Push the pace — this is a benchmark. Record your total time.',
    exercises: [
      { id: 'burpees', name: 'Burpees', reps: '12' },
      { id: 'pullups', name: 'Pull-ups', reps: '10' },
      { id: 'dumbbell-thrusters', name: 'DB Thrusters', reps: '15' },
      { id: 'jump-rope', name: 'Jump Rope', reps: '50' },
    ]
  },
  {
    id: generateUniqueId(), type: 'Cool-down',
    exercises: [
      { id: 'quad-stretch', name: 'Quad Stretch (60s each)' },
      { id: 'doorway-chest-stretch', name: 'Chest Stretch (60s)' },
      { id: 'lat-stretch', name: 'Lat Stretch (60s each)' },
    ]
  }
]);

// ─────────────────────────────────────────────
// TEMPLATE EXPORT
// ─────────────────────────────────────────────

export const ironConditioningPowerTemplate = {
  id: 'template_iron_conditioning_power',
  name: 'Iron Conditioning: Power',
  description: 'Phase 2 of 3 in the Iron Conditioning series. 4 weeks of heavier strength work and more demanding metcons. Strength days follow a 10-8-6-4 pyramid — loads should be noticeably heavier than Foundation. Metcons introduce barbell cycling and longer work windows. Complete Iron Conditioning: Foundation before starting this program. Follow with Iron Conditioning: Apex.',
  isTemplate: true,
  daysPerWeek: 7,
  meta: {
    type: 'Structured Program',
    level: 'Intermediate',
    equipment: 'Full Gym',
  },
  workouts: [

    // ── WEEK 5 ──────────────────────────────
    {
      id: generateUniqueId(),
      name: 'W5D1: Back & Biceps',
      blocks: backBicepsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W5D2: Chest & Triceps (Session A)',
      blocks: chestTricepsA(),
    },
    {
      id: generateUniqueId(),
      name: 'W5D3: Metcon — AMRAP 18',
      blocks: w5d3(),
    },
    {
      id: generateUniqueId(),
      name: 'W5D4: Legs',
      blocks: legsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W5D5: Shoulders & Abs',
      blocks: shouldersAbsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W5D6: Metcon — Chipper',
      blocks: w5d6(),
    },
    {
      id: generateUniqueId(),
      name: 'W5D7: Active Recovery',
      blocks: activeRecovery(),
    },

    // ── WEEK 6 ──────────────────────────────
    {
      id: generateUniqueId(),
      name: 'W6D1: Back & Biceps',
      blocks: backBicepsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W6D2: Chest & Triceps (Session B)',
      blocks: chestTricepsB(),
    },
    {
      id: generateUniqueId(),
      name: 'W6D3: Metcon — RFT 5 Rounds',
      blocks: w6d3(),
    },
    {
      id: generateUniqueId(),
      name: 'W6D4: Legs',
      blocks: legsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W6D5: Shoulders & Abs',
      blocks: shouldersAbsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W6D6: Metcon — EMOM 20',
      blocks: w6d6(),
    },
    {
      id: generateUniqueId(),
      name: 'W6D7: Active Recovery',
      blocks: activeRecovery(),
    },

    // ── WEEK 7 ──────────────────────────────
    {
      id: generateUniqueId(),
      name: 'W7D1: Back & Biceps',
      blocks: backBicepsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W7D2: Chest & Triceps (Session A)',
      blocks: chestTricepsA(),
    },
    {
      id: generateUniqueId(),
      name: 'W7D3: Metcon — Tabata',
      blocks: w7d3(),
    },
    {
      id: generateUniqueId(),
      name: 'W7D4: Legs',
      blocks: legsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W7D5: Shoulders & Abs',
      blocks: shouldersAbsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W7D6: Metcon — AMRAP 20',
      blocks: w7d6(),
    },
    {
      id: generateUniqueId(),
      name: 'W7D7: Active Recovery',
      blocks: activeRecovery(),
    },

    // ── WEEK 8 ──────────────────────────────
    {
      id: generateUniqueId(),
      name: 'W8D1: Back & Biceps',
      blocks: backBicepsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W8D2: Chest & Triceps (Session B)',
      blocks: chestTricepsB(),
    },
    {
      id: generateUniqueId(),
      name: 'W8D3: Metcon — EMOM 24',
      blocks: w8d3(),
    },
    {
      id: generateUniqueId(),
      name: 'W8D4: Legs',
      blocks: legsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W8D5: Shoulders & Abs',
      blocks: shouldersAbsBlock(),
    },
    {
      id: generateUniqueId(),
      name: 'W8D6: Metcon — RFT 5 Rounds',
      blocks: w8d6(),
    },
    {
      id: generateUniqueId(),
      name: 'W8D7: Active Recovery',
      blocks: activeRecovery(),
    },

  ]
};
