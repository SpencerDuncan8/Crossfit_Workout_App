import { generateUniqueId } from '../../utils/idUtils.js';

// --- SHARED COMPONENTS ---
// These are the common warm-up and cool-down blocks for every workout.

const c25kWarmup = {
  id: generateUniqueId(),
  type: 'Warm-up',
  exercises: [{ id: 'walking', name: '5-minute brisk walk' }]
};

const c25kCooldown = {
  id: generateUniqueId(),
  type: 'Cool-down',
  exercises: [
    { id: 'walking', name: '5-minute walk' },
    { id: null, name: '3-5 minutes of light stretching for legs (hamstrings, quads, calves, glutes).' }
  ]
};


// --- WORKOUT DEFINITIONS ---
// Each workout object is defined here.

const workouts = [
  // --- WEEK 1 ---
  { id: 'c25k_w1d1', name: 'W1D1: Building the Foundation', blocks: [ c25kWarmup,
    { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 60, rest: 90, rounds: 8, exercises: [{id:'running', name: 'Run/Walk Intervals'}] },
    c25kCooldown
  ]},
  { id: 'c25k_w1d2', name: 'W1D2: Increasing Reps', blocks: [ c25kWarmup,
    { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 60, rest: 90, rounds: 9, exercises: [{id:'running', name: 'Run/Walk Intervals'}] },
    c25kCooldown
  ]},
  { id: 'c25k_w1d3', name: 'W1D3: Final Push', blocks: [ c25kWarmup,
    { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 60, rest: 90, rounds: 8, exercises: [{id:'running', name: 'Run/Walk Intervals'}] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{id: 'running', name: 'Final Run', duration: '1'}] },
    c25kCooldown
  ]},
  // --- WEEK 2 ---
  { id: 'c25k_w2d1', name: 'W2D1: Increasing Run Time', blocks: [ c25kWarmup,
    { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 90, rest: 120, rounds: 6, exercises: [{id:'running', name: 'Run/Walk Intervals'}] },
    c25kCooldown
  ]},
  { id: 'c25k_w2d2', name: 'W2D2: Building Stamina', blocks: [ c25kWarmup,
    { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 90, rest: 120, rounds: 7, exercises: [{id:'running', name: 'Run/Walk Intervals'}] },
    c25kCooldown
  ]},
  { id: 'c25k_w2d3', name: 'W2D3: Longer Finish', blocks: [ c25kWarmup,
    { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 90, rest: 120, rounds: 6, exercises: [{id:'running', name: 'Run/Walk Intervals'}] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{id: 'running', name: 'Final Run', duration: '2'}] },
    c25kCooldown
  ]},
  // --- WEEK 3 ---
  { id: 'c25k_w3d1', name: 'W3D1: Longer Intervals', blocks: [ c25kWarmup,
    { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 90, rest: 90, rounds: 2, exercises: [{id:'running', name: 'Short Intervals'}] },
    { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 180, rest: 180, rounds: 2, exercises: [{id:'running', name: 'Long Intervals'}] },
    c25kCooldown
  ]},
  { id: 'c25k_w3d2', name: 'W3D2: Consistent Effort', blocks: [ c25kWarmup,
    { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 180, rest: 180, rounds: 3, exercises: [{id:'running', name: 'Run/Walk Intervals'}] },
    c25kCooldown
  ]},
  { id: 'c25k_w3d3', name: 'W3D3: Endurance Push', blocks: [ c25kWarmup,
    { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 180, rest: 150, rounds: 2, exercises: [{id:'running', name: 'Run/Walk Intervals'}] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{id: 'running', name: 'Final Run', duration: '5'}] },
    c25kCooldown
  ]},
  // --- WEEK 4 ---
  { id: 'c25k_w4d1', name: 'W4D1: Building Endurance', blocks: [ c25kWarmup,
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'running', name: 'Run', duration: '3' }] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'walking', name: 'Walk', duration: '2' }] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'running', name: 'Run', duration: '5' }] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'walking', name: 'Walk', duration: '3' }] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'running', name: 'Run', duration: '3' }] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'walking', name: 'Walk', duration: '2' }] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'running', name: 'Run', duration: '5' }] },
    c25kCooldown
  ]},
  { id: 'c25k_w4d2', name: 'W4D2: Stepping Up', blocks: [ c25kWarmup,
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'running', name: 'Run', duration: '5' }] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'walking', name: 'Walk', duration: '3' }] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'running', name: 'Run', duration: '6' }] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'walking', name: 'Walk', duration: '3' }] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'running', name: 'Run', duration: '5' }] },
    c25kCooldown
  ]},
  { id: 'c25k_w4d3', name: 'W4D3: The 8-Minute Test', blocks: [ c25kWarmup,
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'running', name: 'Run', duration: '8' }] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'walking', name: 'Walk', duration: '4' }] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'running', name: 'Run', duration: '8' }] },
    c25kCooldown
  ]},
  // --- WEEK 5 ---
  { id: 'c25k_w5d1', name: 'W5D1: The First Big Leap', blocks: [ c25kWarmup,
    { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 300, rest: 180, rounds: 3, exercises: [{id:'running', name: 'Run/Walk Intervals'}] },
    c25kCooldown
  ]},
  { id: 'c25k_w5d2', name: 'W5D2: Longer Distances', blocks: [ c25kWarmup,
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'running', name: 'Run', duration: '8' }] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'walking', name: 'Walk', duration: '4' }] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'running', name: 'Run', duration: '9' }] },
    c25kCooldown
  ]},
  { id: 'c25k_w5d3', name: 'W5D3: The 20-Minute Run', blocks: [ c25kWarmup,
    { id: generateUniqueId(), type: 'Cardio', exercises: [{id: 'running', name: 'Run (slow and steady)', duration: '20'}] },
    c25kCooldown
  ]},
  // --- WEEK 6 ---
  { id: 'c25k_w6d1', name: 'W6D1: Active Recovery Run', blocks: [ c25kWarmup,
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'running', name: 'Run', duration: '6' }] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'walking', name: 'Walk', duration: '3' }] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'running', name: 'Run', duration: '10' }] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'walking', name: 'Walk', duration: '3' }] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'running', name: 'Run', duration: '6' }] },
    c25kCooldown
  ]},
  { id: 'c25k_w6d2', name: 'W6D2: Pushing Further', blocks: [ c25kWarmup,
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'running', name: 'Run', duration: '10' }] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'walking', name: 'Walk', duration: '3' }] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'running', name: 'Run', duration: '12' }] },
    c25kCooldown
  ]},
  { id: 'c25k_w6d3', name: 'W6D3: The 22-Minute Run', blocks: [ c25kWarmup,
    { id: generateUniqueId(), type: 'Cardio', exercises: [{id: 'running', name: 'Run', duration: '22'}] },
    c25kCooldown
  ]},
  // --- WEEK 7 ---
  { id: 'c25k_w7d1', name: 'W7D1: The 25-Minute Run', blocks: [ c25kWarmup,
    { id: generateUniqueId(), type: 'Cardio', exercises: [{id: 'running', name: 'Run', duration: '25'}] },
    c25kCooldown
  ]},
  { id: 'c25k_w7d2', name: 'W7D2: Consistent Pacing', blocks: [ c25kWarmup,
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'running', name: 'Run', duration: '12' }] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'walking', name: 'Walk', duration: '2' }] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'running', name: 'Run', duration: '12' }] },
    c25kCooldown
  ]},
  { id: 'c25k_w7d3', name: 'W7D3: The 26-Minute Run', blocks: [ c25kWarmup,
    { id: generateUniqueId(), type: 'Cardio', exercises: [{id: 'running', name: 'Run', duration: '26'}] },
    c25kCooldown
  ]},
  // --- WEEK 8 ---
  { id: 'c25k_w8d1', name: 'W8D1: The 28-Minute Run', blocks: [ c25kWarmup,
    { id: generateUniqueId(), type: 'Cardio', exercises: [{id: 'running', name: 'Run', duration: '28'}] },
    c25kCooldown
  ]},
  { id: 'c25k_w8d2', name: 'W8D2: The Final Interval', blocks: [ c25kWarmup,
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'running', name: 'Run', duration: '13' }] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'walking', name: 'Walk', duration: '1' }] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'running', name: 'Run', duration: '15' }] },
    c25kCooldown
  ]},
  { id: 'c25k_w8d3', name: 'W8D3: Fast Finish', blocks: [ c25kWarmup,
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'running', name: 'Run (steady pace)', duration: '26' }] },
    { id: generateUniqueId(), type: 'Cardio', exercises: [{ id: 'running', name: 'Run (fast finish)', duration: '2' }] },
    c25kCooldown
  ]},
  // --- WEEK 9 ---
  { id: 'c25k_w9d1', name: 'W9D1: Graduation Run!', blocks: [ c25kWarmup,
    { id: generateUniqueId(), type: 'Cardio', exercises: [{id: 'running', name: 'Run (30 minutes)', duration: '30'}] },
    c25kCooldown
  ]},
];

// --- MAIN TEMPLATE OBJECT ---
export const couchTo5kTemplate = {
  id: 'template_challenge_c25k',
  name: 'Couch to 5K Challenge',
  description: 'A 9-week, 3-day/week program designed to take you from the couch to running a 5K (30 minutes) without stopping. Perfect for absolute beginners.',
  isTemplate: true,
  daysPerWeek: 3,
  meta: {
    type: 'Challenges',
    level: 'Beginner',
    goal: 'Lose Weight',
    equipment: 'Bodyweight'
  },
  workouts: workouts
};