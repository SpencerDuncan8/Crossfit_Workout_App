// src/data/templates/pullupChallengeTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

// --- Main Template Object ---
export const pullupChallengeTemplate = {
  id: 'template_challenge_pullup',
  name: 'Challenge: Your First Pull-up',
  description: 'A 30-day progressive program designed to build the specific strength needed to achieve your first unassisted pull-up. Stay consistent and you will succeed!',
  isTemplate: true,
  meta: {
    type: 'Challenges',
    level: 'Beginner',
    goal: 'Get Strong',
    equipment: 'Pullup Bar'
  },
  workouts: [
    // --- WEEK 1: Foundation & Grip ---
    { id: 'pc_w1d1', name: 'W1D1: Grip & Scapula', blocks: [
      { id: generateUniqueId(), type: 'Bodyweight', exercises: [
        { id: 'dead-hang', name: 'Dead Hang', sets: [{ id: generateUniqueId(), value: '20', trackingType: 'duration' }, { id: generateUniqueId(), value: '20', trackingType: 'duration' }, { id: generateUniqueId(), value: '20', trackingType: 'duration' }] },
        { id: 'scapular-pulls', name: 'Scapular Pulls', sets: [{ id: generateUniqueId(), value: '8', trackingType: 'reps' }, { id: generateUniqueId(), value: '8', trackingType: 'reps' }, { id: generateUniqueId(), value: '8', trackingType: 'reps' }] }
      ]}
    ]},
    { id: 'pc_w1d2', name: 'W1D2: Eccentrics', blocks: [
      { id: generateUniqueId(), type: 'Bodyweight', exercises: [
        { id: 'eccentric-negative-pullups', name: 'Negative Pull-ups (3-5 sec descent)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '1', trackingType: 'reps' })) }
      ]}
    ]},
    { id: 'pc_w1d3', name: 'W1D3: Volume Day', blocks: [
       { id: generateUniqueId(), type: 'Bodyweight', exercises: [
        { id: 'dead-hang', name: 'Dead Hang', sets: [{ id: generateUniqueId(), value: '25', trackingType: 'duration' }, { id: generateUniqueId(), value: '25', trackingType: 'duration' }] },
        { id: 'scapular-pulls', name: 'Scapular Pulls', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '10', trackingType: 'reps' })) }
      ]}
    ]},

    // --- WEEK 2: Building Strength ---
    { id: 'pc_w2d1', name: 'W2D1: Increased Holds', blocks: [
       { id: generateUniqueId(), type: 'Bodyweight', exercises: [
        { id: 'dead-hang', name: 'Dead Hang', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '30', trackingType: 'duration' })) },
        { id: 'scapular-pulls', name: 'Scapular Pulls', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '12', trackingType: 'reps' })) }
      ]}
    ]},
    { id: 'pc_w2d2', name: 'W2D2: Longer Negatives', blocks: [
      { id: generateUniqueId(), type: 'Bodyweight', exercises: [
        { id: 'eccentric-negative-pullups', name: 'Negative Pull-ups (5-8 sec descent)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '1', trackingType: 'reps' })) }
      ]}
    ]},
    { id: 'pc_w2d3', name: 'W2D3: Banded Assistance', blocks: [
      { id: generateUniqueId(), type: 'Bodyweight', exercises: [
        { id: 'banded-pull-ups', name: 'Banded Pull-ups (heavy band)', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '5', trackingType: 'reps' })) }
      ]}
    ]},

    // --- WEEK 3: Consolidation ---
    { id: 'pc_w3d1', name: 'W3D1: Strength & Endurance', blocks: [
      { id: generateUniqueId(), type: 'Bodyweight', exercises: [
        { id: 'dead-hang', name: 'Dead Hang', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '45', trackingType: 'duration' })) },
        { id: 'banded-pull-ups', name: 'Banded Pull-ups (heavy band)', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '6', trackingType: 'reps' })) }
      ]}
    ]},
    { id: 'pc_w3d2', name: 'W3D2: Controlled Eccentrics', blocks: [
      { id: generateUniqueId(), type: 'Bodyweight', exercises: [
        { id: 'eccentric-negative-pullups', name: 'Negative Pull-ups (8-10 sec descent)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '1', trackingType: 'reps' })) }
      ]}
    ]},
    { id: 'pc_w3d3', name: 'W3D3: Lighter Assistance', blocks: [
      { id: generateUniqueId(), type: 'Bodyweight', exercises: [
        { id: 'banded-pull-ups', name: 'Banded Pull-ups (medium band)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '3', trackingType: 'reps' })) }
      ]}
    ]},

    // --- WEEK 4: Peaking ---
    { id: 'pc_w4d1', name: 'W4D1: Final Prep', blocks: [
      { id: generateUniqueId(), type: 'Bodyweight', exercises: [
        { id: 'dead-hang', name: 'Dead Hang', sets: [{ id: generateUniqueId(), value: '60', trackingType: 'duration' }] },
        { id: 'scapular-pulls', name: 'Scapular Pulls', sets: Array.from({ length: 2 }, () => ({ id: generateUniqueId(), value: '15', trackingType: 'reps' })) },
        { id: 'banded-pull-ups', name: 'Banded Pull-ups (light band)', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '2', trackingType: 'reps' })) }
      ]}
    ]},
    { id: 'pc_w4d2', name: 'W4D2: Test Day', blocks: [
       { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'scapular-pulls', name: 'Scapular Pulls', reps: '10' }, { id: 'dead-hang', name: 'Dead Hang', reps: '30s' } ]},
       { id: generateUniqueId(), type: 'Bodyweight', exercises: [
          { id: 'pullups', name: 'Max Effort Pull-up Attempts', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '1', trackingType: 'reps' })), note: "Rest 2-3 minutes between attempts. Give it your all!" }
       ]}
    ]},
    { 
      id: 'pc_w4d3', 
      name: 'W4D3: Active Recovery', 
      blocks: [
        { 
          id: generateUniqueId(),
          type: 'Cool-down',
          exercises: [
            { id: null, name: '10-15 minutes of light stretching. Focus on lats, chest, and shoulders.' }
          ]
        }
      ]
    },
  ]
};