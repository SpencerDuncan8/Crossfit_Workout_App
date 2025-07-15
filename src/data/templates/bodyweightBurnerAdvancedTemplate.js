// src/data/templates/bodyweightBurnerAdvancedTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

export const bodyweightBurnerAdvancedTemplate = {
  id: 'template_bodyweight_burner_advanced',
  name: 'Bodyweight Burner (Advanced)',
  description: 'The ultimate test of endurance and grit. This 4-week advanced program uses high-volume, high-intensity workouts to maximize calorie burn and forge elite conditioning.',
  isTemplate: true,
  daysPerWeek: 5,
  meta: {
    type: 'Structured Program',
    level: 'Advanced',
    goal: 'Lose Weight',
    equipment: 'Bodyweight'
  },
  workouts: [
    // --- WEEK 1 ---
    { // Day 1
      id: generateUniqueId(),
      name: 'W1D1: The Long AMRAP',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 30, exercises: [
            { id: 'burpees', name: 'Burpees', reps: '10' },
            { id: 'air-squats', name: 'Air Squats', reps: '20' },
            { id: 'v-up', name: 'V-Ups', reps: '15' },
            { id: 'jumping-lunges', name: 'Jumping Lunges', reps: '20' },
        ]},
      ],
    },
    { // Day 2
      id: generateUniqueId(),
      name: 'W1D2: Sprint Interval Hell',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 20, rest: 10, rounds: 16, exercises: [ { id: 'burpees', name: 'Burpees' }, { id: 'high-knees', name: 'High Knees' } ], note: '8 rounds of Burpees, followed immediately by 8 rounds of High Knees.'}
      ]
    },
    { // Day 3
      id: generateUniqueId(),
      name: 'W1D3: Leg Demolition',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
            { id: 'bodyweight-walking-lunge', name: 'Walking Lunges', reps: '150' },
            { id: 'air-squats', name: 'Air Squats', reps: '150' },
            { id: 'tuck-jumps', name: 'Tuck Jumps', reps: '50' },
        ]},
      ]
    },
    { // Day 4
      id: generateUniqueId(),
      name: 'W1D4: EMOM Sweat Fest',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: EMOM', minutes: Array.from({ length: 20 }, (_, i) => ({ id: generateUniqueId(), task: i % 2 === 0 ? '15 Push-ups' : '20 Air Squats' })), note: 'Alternate between movements each minute for 20 minutes.'}
      ]
    },
    { // Day 5
      id: generateUniqueId(),
      name: 'W1D5: "Barbara" Benchmark',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5, exercises: [
            { id: 'pullups', name: 'Pull-ups', reps: '20' },
            { id: 'push-ups', name: 'Push-ups', reps: '30' },
            { id: 'sit-up', name: 'Sit-ups', reps: '40' },
            { id: 'air-squats', name: 'Squats', reps: '50' },
        ], note: 'Rest exactly 3 minutes between each round. Score is total time, including rest.'}
      ]
    },
    // --- WEEK 2 ---
    { // Day 6
      id: generateUniqueId(),
      name: 'W2D1: The Grinder',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 25, exercises: [
            { id: 'burpee-box-jump-overs', name: 'Burpee Box Jump Overs', reps: '5' },
            { id: 'v-up', name: 'V-Ups', reps: '10' },
            { id: 'jumping-lunges', name: 'Jumping Lunges', reps: '15' },
        ]},
      ]
    },
    { // Day 7
      id: generateUniqueId(),
      name: 'W2D2: For Time Volume',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 10, exercises: [
          { id: 'push-ups', name: 'Push-ups', reps: '15' },
          { id: 'air-squats', name: 'Air Squats', reps: '20' },
        ]},
      ]
    },
    { // Day 8
      id: generateUniqueId(),
      name: 'W2D3: Burpee Overload',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
          { id: 'burpees', name: 'Burpees For Time', reps: '150' },
        ]}
      ]
    },
    { // Day 9
      id: generateUniqueId(),
      name: 'W2D4: Long Intervals',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 60, rest: 30, rounds: 8, exercises: [ { id: 'high-knees', name: 'Max Effort Run/High Knees' } ]}
      ]
    },
    { // Day 10
      id: generateUniqueId(),
      name: 'W2D5: "Angie" Benchmark',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
            { id: 'pullups', name: 'Pull-ups', reps: '100' },
            { id: 'push-ups', name: 'Push-ups', reps: '100' },
            { id: 'sit-up', name: 'Sit-ups', reps: '100' },
            { id: 'air-squats', name: 'Squats', reps: '100' },
        ], note: 'Complete all reps of one exercise before moving to the next.'}
      ]
    },
    // --- WEEK 3 ---
    { // Day 11
      id: generateUniqueId(),
      name: 'W3D1: "Chelsea" Benchmark',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: EMOM', minutes: Array.from({ length: 30 }, () => ({ id: generateUniqueId(), task: '5 Pull-ups, 10 Push-ups, 15 Squats' })), note: 'The workout ends if you cannot complete the full round within a given minute. Your score is the number of full rounds completed.'}
      ]
    },
    { // Day 12
      id: generateUniqueId(),
      name: 'W3D2: Sprint & Recover',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 8, exercises: [
            { id: 'running', name: 'Run 200m', reps: '1' },
            { id: 'walking', name: 'Walk 200m', reps: '1' },
        ], note: "Score is the total time to complete all 8 rounds of running and walking."}
      ]
    },
    { // Day 13
      id: generateUniqueId(),
      name: 'W3D3: Tabata Trifecta',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Tabata', exercises: [ { id: 'air-squats', name: 'Air Squats' } ] },
        { id: 'rest', type: 'Cardio', exercises: [{ id: null, name: 'Rest', duration: '1' }]},
        { id: generateUniqueId(), type: 'Conditioning: Tabata', exercises: [ { id: 'push-ups', name: 'Push-ups' } ] },
        { id: 'rest', type: 'Cardio', exercises: [{ id: null, name: 'Rest', duration: '1' }]},
        { id: generateUniqueId(), type: 'Conditioning: Tabata', exercises: [ { id: 'sit-up', name: 'Sit-ups' } ] },
      ]
    },
    { // Day 14
      id: generateUniqueId(),
      name: 'W3D4: "Loredo" Hero WOD',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 6, exercises: [
            { id: 'air-squats', name: 'Squats', reps: '24' },
            { id: 'push-ups', name: 'Push-ups', reps: '24' },
            { id: 'bodyweight-walking-lunge', name: 'Walking Lunge steps', reps: '24' },
            { id: 'running', name: 'Run 400 meters', reps: '1' },
        ]}
      ]
    },
    { // Day 15
      id: generateUniqueId(),
      name: 'W3D5: Active Recovery',
      blocks: [
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Jog or Walk', duration: '45-60' } ]}
      ]
    },
    // --- WEEK 4 ---
    { // Day 16
      id: generateUniqueId(),
      name: 'W4D1: The 300 Chipper',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
            { id: 'pullups', name: 'Pull-ups', reps: '25' },
            { id: 'deadlift', name: 'Bodyweight Deadlifts (or use heavy object)', reps: '50' },
            { id: 'push-ups', name: 'Push-ups', reps: '50' },
            { id: 'box-jumps', name: 'Box Jumps (24/20 inch)', reps: '50' },
            { id: 'bodyweight-good-mornings', name: 'Floor Wipers (15 each side)', reps: '50' },
            { id: 'simulated-kettlebell-swing', name: 'Kettlebell Swings (use heavy object)', reps: '50' },
            { id: 'pullups', name: 'Pull-ups', reps: '25' },
        ]}
      ]
    },
    { // Day 17
      id: generateUniqueId(),
      name: 'W4D2: Death By...',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: EMOM', minutes: [
            {id: generateUniqueId(), task: 'Min 1: 1 Push-up, 1 Air Squat'},
            {id: generateUniqueId(), task: 'Min 2: 2 Push-ups, 2 Air Squats'},
            {id: generateUniqueId(), task: 'Min 3: 3 Push-ups, 3 Air Squats'},
        ], note: "Continue adding one rep to each movement every minute until you can no longer complete the work within the minute."}
      ]
    },
    { // Day 18
      id: generateUniqueId(),
      name: 'W4D3: Interval Madness',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 60, rest: 0, rounds: 20, exercises: [
          { id: 'burpees', name: 'Burpees' },
        ], note: 'Perform max burpees in 1 minute, then immediately run 400m. That is one round. Repeat for 5 total rounds. Your score is total time.'}
      ]
    },
    { // Day 19
      id: generateUniqueId(),
      name: 'W4D4: "Murph" Benchmark',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
            { id: 'running', name: '1 Mile Run', reps: '1' },
            { id: 'pullups', name: '100 Pull-ups', reps: '100' },
            { id: 'push-ups', name: '200 Push-ups', reps: '200' },
            { id: 'air-squats', name: '300 Air Squats', reps: '300' },
            { id: 'running', name: '1 Mile Run', reps: '1' },
        ], note: 'Partition the pull-ups, push-ups, and squats as needed. Start and finish with a 1-mile run. If you have a 20lb vest, wear it.'}
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