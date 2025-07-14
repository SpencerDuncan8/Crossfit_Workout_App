// src/data/templates/pullupChallengeTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

// Helper for Active Recovery Days to reduce repetition
const createActiveRecoveryDay = (day) => ({
  id: `pc_d${day}`,
  name: `Day ${day}: Active Recovery`,
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Cardio',
      exercises: [{ id: 'walking', name: 'Walk', duration: '30' }]
    }
  ]
});

export const pullupChallengeTemplate = {
  id: 'template_challenge_pullup_v2', // Updated ID to avoid conflicts
  name: '30-Day First Pull-up Challenge',
  description: 'A 30-day progressive program designed to build the specific strength needed to achieve your first unassisted pull-up. Stay consistent and you will succeed!',
  isTemplate: true,
  daysPerWeek: 7, // It's now a 7-day/week plan with active recovery
  meta: {
    type: 'Challenges',
    level: 'Beginner',
    goal: 'Get Strong',
    equipment: 'Pullup Bar'
  },
  workouts: [
    // --- WEEK 1: Building the Foundation ---
    { id: 'pc_d1', name: 'Day 1: Grip & Core', blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [{id: 'jumping-jack', name: '60s Jumping Jacks'}, {id: 'arm-circles', name: '10 Arm Circles (each way)'}, {id: 'wrist-rotations', name: '10 Wrist Rotations (each way)'}, {id: 'cat-cow-stretch', name: '10 Cat-Cow Stretches'}] },
        { id: generateUniqueId(), type: 'Bodyweight', exercises: [
            { id: 'dead-hang', name: 'Dead Hangs (Rest 60s)', sets: Array.from({length: 4}, () => ({ id: generateUniqueId(), value: '15', trackingType: 'duration'})) },
            { id: 'inverted-rows', name: 'Inverted Rows (Rest 60s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: '8', trackingType: 'reps'})) },
            { id: 'plank', name: 'Plank (Rest 45s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: '30', trackingType: 'duration'})) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [{id: 'lat-stretch', name: '30s Lat Stretch (each side)'}, {id: 'bicep-stretch', name: '30s Bicep Stretch (each side)'}, {id: 'childs-pose', name: '30s Child\'s Pose'}] },
    ]},
    { id: 'pc_d2', name: 'Day 2: Activating the Back', blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [{id: 'high-knees', name: '60s High Knees'}, {id: 'band-pull-aparts', name: '10 Band Pull-Aparts'}, {id: 'wall-slides', name: '10 Wall Slides'}] },
        { id: generateUniqueId(), type: 'Bodyweight', exercises: [
            { id: 'scapular-pulls', name: 'Scapular Pulls (Rest 45s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: '5', trackingType: 'reps'})) },
            { id: 'dead-hang', name: 'Dead Hangs to Failure (Rest 60s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'duration'})) },
            { id: 'inverted-rows', name: 'Inverted Rows (Rest 60s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: '10', trackingType: 'reps'})) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [{id: 'doorway-chest-stretch', name: '30s Doorway Chest Stretch'}, {id: 'cross-body-shoulder-stretch', name: '30s Cross-Body Shoulder Stretch (each side)'}] },
    ]},
    createActiveRecoveryDay(3),
    { id: 'pc_d4', name: 'Day 4: Introducing Negatives', blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [{id: 'jumping-jack', name: '60s Jumping Jacks'}, {id: 'band-pull-aparts', name: '10 Band Pull-Aparts'}, {id: 'scapular-pulls', name: '10 Scapular Pulls'}] },
        { id: generateUniqueId(), type: 'Bodyweight', exercises: [
            { id: 'eccentric-negative-pullups', name: 'Negative Pull-ups (3s descent, Rest 90s)', sets: Array.from({length: 4}, () => ({ id: generateUniqueId(), value: '1', trackingType: 'reps'})) },
            { id: 'inverted-rows', name: 'Inverted Rows (Max Reps, Rest 60s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'reps'})) },
            { id: 'hollow-body-hold', name: 'Hollow Body Hold (Rest 45s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: '20', trackingType: 'duration'})) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [{id: 'lat-stretch', name: '45s Lat Stretch (each side)'}, {id: 'bicep-stretch', name: '30s Bicep Stretch (each side)'}] },
    ]},
    { id: 'pc_d5', name: 'Day 5: Volume Day', blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [{id: 'high-knees', name: '60s High Knees'}, {id: 'wrist-rotations', name: '10 Wrist Rotations (each way)'}, {id: 'wall-slides', name: '10 Wall Slides'}] },
        { id: generateUniqueId(), type: 'Bodyweight', exercises: [
            { id: 'dead-hang', name: 'Dead Hangs (Rest 60s)', sets: Array.from({length: 5}, () => ({ id: generateUniqueId(), value: '20', trackingType: 'duration'})) },
            { id: 'inverted-rows', name: 'Inverted Rows (Rest 60s)', sets: Array.from({length: 5}, () => ({ id: generateUniqueId(), value: '8', trackingType: 'reps'})) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [{id: 'doorway-chest-stretch', name: '30s Doorway Chest Stretch'}, {id: 'childs-pose', name: '30s Child\'s Pose'}] },
    ]},
    createActiveRecoveryDay(6),
    createActiveRecoveryDay(7),
    
    // --- WEEK 2: Increasing Eccentric Strength ---
    { id: 'pc_d8', name: 'Day 8: Slowing It Down', blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [{id: 'jumping-jack', name: '60s Jumping Jacks'}, {id: 'band-pull-aparts', name: '10 Band Pull-Aparts'}, {id: 'scapular-pulls', name: '5 Scapular Pulls'}] },
        { id: generateUniqueId(), type: 'Bodyweight', exercises: [
            { id: 'eccentric-negative-pullups', name: 'Negative Pull-ups (5s descent, Rest 90s)', sets: Array.from({length: 5}, () => ({ id: generateUniqueId(), value: '1', trackingType: 'reps'})) },
            { id: 'inverted-rows', name: 'Inverted Rows (Max Reps, Rest 60s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'reps'})) },
            { id: 'plank', name: 'Plank (Rest 45s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: '45', trackingType: 'duration'})) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [{id: 'lat-stretch', name: '30s Lat Stretch (each side)'}, {id: 'bicep-stretch', name: '30s Bicep Stretch (each side)'}] },
    ]},
    { id: 'pc_d9', name: 'Day 9: Grip & Scapula', blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [{id: 'high-knees', name: '60s High Knees'}, {id: 'wrist-rotations', name: '10 Wrist Rotations (each way)'}] },
        { id: generateUniqueId(), type: 'Bodyweight', exercises: [
            { id: 'scapular-pulls', name: 'Scapular Pulls (Rest 45s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: '8', trackingType: 'reps'})) },
            { id: 'dead-hang', name: 'Dead Hangs w/ Shrugs (Rest 60s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: '5', trackingType: 'reps'})) },
            { id: 'hollow-body-hold', name: 'Hollow Body Hold (Rest 45s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: '30', trackingType: 'duration'})) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [{id: 'doorway-chest-stretch', name: '30s Doorway Chest Stretch'}, {id: 'childs-pose', name: '30s Child\'s Pose'}] },
    ]},
    createActiveRecoveryDay(10),
    { id: 'pc_d11', name: 'Day 11: Negative Endurance', blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [{id: 'jumping-jack', name: '60s Jumping Jacks'}, {id: 'band-pull-aparts', name: '10 Band Pull-Aparts'}, {id: 'scapular-pulls', name: '5 Scapular Pulls'}] },
        { id: generateUniqueId(), type: 'Bodyweight', exercises: [
            { id: 'eccentric-negative-pullups', name: 'Negative Pull-ups (3-5s descent, Rest 90s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: '2', trackingType: 'reps'})) },
            { id: 'inverted-rows', name: 'Inverted Rows (Rest 60s)', sets: Array.from({length: 4}, () => ({ id: generateUniqueId(), value: '12', trackingType: 'reps'})) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [{id: 'lat-stretch', name: '45s Lat Stretch (each side)'}, {id: 'bicep-stretch', name: '30s Bicep Stretch (each side)'}] },
    ]},
    { id: 'pc_d12', name: 'Day 12: Banded Assistance', blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [{id: 'high-knees', name: '60s High Knees'}, {id: 'wall-slides', name: '10 Wall Slides'}] },
        { id: generateUniqueId(), type: 'Bodyweight', exercises: [
            { id: 'banded-pull-ups', name: 'Banded Pull-ups (3-5 reps, Rest 90s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: '5', trackingType: 'reps'})) },
            { id: 'dead-hang', name: 'Dead Hangs to Failure (Rest 60s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'duration'})) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [{id: 'doorway-chest-stretch', name: '30s Doorway Chest Stretch'}, {id: 'childs-pose', name: '30s Child\'s Pose'}] },
    ]},
    createActiveRecoveryDay(13),
    createActiveRecoveryDay(14),

    // --- WEEK 3: Consolidation ---
    { id: 'pc_d15', name: 'Day 15: The Long Negative', blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [{id: 'jumping-jack', name: '60s Jumping Jacks'}, {id: 'band-pull-aparts', name: '10 Band Pull-Aparts'}, {id: 'scapular-pulls', name: '5 Scapular Pulls'}] },
        { id: generateUniqueId(), type: 'Bodyweight', exercises: [
            { id: 'eccentric-negative-pullups', name: 'Negative Pull-ups (8s descent, Rest 90s)', sets: Array.from({length: 6}, () => ({ id: generateUniqueId(), value: '1', trackingType: 'reps'})) },
            { id: 'inverted-rows', name: 'Inverted Rows (Max Reps, Rest 60s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'reps'})) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [{id: 'lat-stretch', name: '45s Lat Stretch (each side)'}, {id: 'bicep-stretch', name: '30s Bicep Stretch (each side)'}] },
    ]},
    { id: 'pc_d16', name: 'Day 16: Banded Volume', blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [{id: 'high-knees', name: '60s High Knees'}, {id: 'wall-slides', name: '10 Wall Slides'}] },
        { id: generateUniqueId(), type: 'Bodyweight', exercises: [
            { id: 'banded-pull-ups', name: 'Banded Pull-ups (3-5 reps, Rest 90s)', sets: Array.from({length: 5}, () => ({ id: generateUniqueId(), value: '5', trackingType: 'reps'})) },
            { id: 'shoulder-taps', name: 'Plank with Shoulder Taps (Rest 45s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: '40', trackingType: 'duration'})) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [{id: 'doorway-chest-stretch', name: '30s Doorway Chest Stretch'}, {id: 'childs-pose', name: '30s Child\'s Pose'}] },
    ]},
    createActiveRecoveryDay(17),
    { id: 'pc_d18', name: 'Day 18: Combo Day', blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [{id: 'jumping-jack', name: '60s Jumping Jacks'}, {id: 'band-pull-aparts', name: '10 Band Pull-Aparts'}, {id: 'scapular-pulls', name: '5 Scapular Pulls'}] },
        { id: generateUniqueId(), type: 'Bodyweight', exercises: [
            { id: 'eccentric-negative-pullups', name: 'Negative Pull-ups (5-8s descent, Rest 60s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: '1', trackingType: 'reps'})) },
            { id: 'banded-pull-ups', name: 'Banded Pull-ups (lighter band, Rest 90s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: '3', trackingType: 'reps'})) },
            { id: 'inverted-rows', name: 'Inverted Rows to Failure (Rest 60s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'reps'})) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [{id: 'lat-stretch', name: '45s Lat Stretch (each side)'}, {id: 'bicep-stretch', name: '30s Bicep Stretch (each side)'}] },
    ]},
    { id: 'pc_d19', name: 'Day 19: Grip Gauntlet', blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [{id: 'high-knees', name: '60s High Knees'}, {id: 'wrist-rotations', name: '10 Wrist Rotations (each way)'}] },
        { id: generateUniqueId(), type: 'Bodyweight', exercises: [
            { id: 'towel-hangs', name: 'Towel Hangs (Rest 60s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: '15', trackingType: 'duration'})) },
            { id: 'scapular-pulls', name: 'Scapular Pulls (Rest 45s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: '10', trackingType: 'reps'})) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [{id: 'doorway-chest-stretch', name: '30s Doorway Chest Stretch'}, {id: 'childs-pose', name: '30s Child\'s Pose'}] },
    ]},
    createActiveRecoveryDay(20),
    createActiveRecoveryDay(21),

    // --- WEEK 4: Peaking & Testing ---
    { id: 'pc_d22', name: 'Day 22: Paused Negatives', blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [{id: 'jumping-jack', name: '60s Jumping Jacks'}, {id: 'band-pull-aparts', name: '10 Band Pull-Aparts'}, {id: 'scapular-pulls', name: '5 Scapular Pulls'}] },
        { id: generateUniqueId(), type: 'Bodyweight', exercises: [
            { id: 'eccentric-negative-pullups', name: 'Paused Negative Pull-ups (2s pause at 90°, Rest 90s)', sets: Array.from({length: 4}, () => ({ id: generateUniqueId(), value: '1', trackingType: 'reps'})) },
            { id: 'inverted-rows', name: 'Inverted Rows (Rest 60s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: '12', trackingType: 'reps'})) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [{id: 'lat-stretch', name: '45s Lat Stretch (each side)'}, {id: 'bicep-stretch', name: '30s Bicep Stretch (each side)'}] },
    ]},
    { id: 'pc_d23', name: 'Day 23: Lighter Band Day', blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [{id: 'high-knees', name: '60s High Knees'}, {id: 'wall-slides', name: '10 Wall Slides'}] },
        { id: generateUniqueId(), type: 'Bodyweight', exercises: [
            { id: 'banded-pull-ups', name: 'Banded Pull-ups (light band, Rest 90s)', sets: Array.from({length: 4}, () => ({ id: generateUniqueId(), value: '3', trackingType: 'reps'})) },
            { id: 'hollow-body-rocks', name: 'Hollow Body Rocks (Rest 45s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: '15', trackingType: 'reps'})) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [{id: 'doorway-chest-stretch', name: '30s Doorway Chest Stretch'}, {id: 'childs-pose', name: '30s Child\'s Pose'}] },
    ]},
    createActiveRecoveryDay(24),
    { id: 'pc_d25', name: 'Day 25: The "Almost" Pull-up', blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [{id: 'jumping-jack', name: '60s Jumping Jacks'}, {id: 'band-pull-aparts', name: '10 Band Pull-Aparts'}, {id: 'scapular-pulls', name: '5 Scapular Pulls'}] },
        { id: generateUniqueId(), type: 'Bodyweight', exercises: [
            { id: 'chin-over-bar-holds', name: 'Chin-over-Bar Holds (Max time, Rest 90s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'duration'})) },
            { id: 'eccentric-negative-pullups', name: 'Negative Pull-ups (slowest possible, Rest 90s)', sets: Array.from({length: 3}, () => ({ id: generateUniqueId(), value: '1', trackingType: 'reps'})) },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [{id: 'lat-stretch', name: '45s Lat Stretch (each side)'}, {id: 'bicep-stretch', name: '30s Bicep Stretch (each side)'}] },
    ]},
    createActiveRecoveryDay(26),
    createActiveRecoveryDay(27),
    createActiveRecoveryDay(28),
    { id: 'pc_d29', name: 'Day 29: Primer', blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [{id: 'jumping-jack', name: '60s Jumping Jacks'}, {id: 'band-pull-aparts', name: '10 Band Pull-Aparts'}] },
        { id: generateUniqueId(), type: 'Bodyweight', exercises: [
            { id: 'scapular-pulls', name: 'Scapular Pulls', sets: Array.from({length: 2}, () => ({ id: generateUniqueId(), value: '3', trackingType: 'reps'})) },
            { id: 'dead-hang', name: 'Dead Hang', sets: [{ id: generateUniqueId(), value: '15', trackingType: 'duration' }] },
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [{id: null, name: 'Light stretching.'}] },
    ]},
    { id: 'pc_d30', name: 'Day 30: TEST DAY!', blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [
          {id: 'jumping-jack', name: '2 min light cardio (Jumping Jacks/High Knees)'},
          {id: 'arm-circles', name: '15 Arm Circles (each way)'},
          {id: 'band-pull-aparts', name: '10 Band Pull-Aparts'},
          {id: 'wall-slides', name: '10 Wall Slides'},
          {id: 'scapular-pulls', name: '3 sets of 3 Scapular Pulls'},
        ]},
        { id: generateUniqueId(), type: 'Bodyweight', exercises: [
          { id: 'pullups', name: 'Max Effort Pull-up Attempts', sets: Array.from({length: 5}, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'reps'})), note: "Rest 2-3 minutes between attempts. Give it your all! Your score is your best set." }
        ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [{id: 'lat-stretch', name: '45s Lat Stretch (each side)'}, {id: 'bicep-stretch', name: '30s Bicep Stretch (each side)'}] },
    ]},
  ]
};