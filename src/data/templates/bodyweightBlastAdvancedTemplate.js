// src/data/templates/bodyweightBlastAdvancedTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

export const bodyweightBlastAdvancedTemplate = {
  id: 'template_bodyweight_blast_advanced',
  name: 'Bodyweight Blast (Advanced)',
  description: 'The pinnacle of bodyweight training. This 4-week program is for advanced athletes, focusing on high-skill gymnastics, maximum endurance, and mental toughness.',
  isTemplate: true,
  daysPerWeek: 5,
  meta: {
    type: 'Structured Program',
    level: 'Advanced',
    goal: 'General Fitness',
    equipment: 'Bodyweight'
  },
  workouts: [
    // --- WEEK 1 ---
    { // Day 1
      id: generateUniqueId(),
      name: 'W1D1: Skill & Stamina',
      blocks: [
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Focus on quality over speed. Rest 90s between exercises.', exercises: [
            { id: 'handstand-push-ups', name: 'Strict Handstand Push-ups', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'reps' })) },
            { id: 'pistol-squats', name: 'Pistol Squats (alternating)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '10', trackingType: 'reps' })) },
        ]},
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 15, exercises: [
            { id: 'burpee-box-jump-overs', name: 'Burpee Box Jump Overs', reps: '10' },
            { id: 'v-up', name: 'V-Ups', reps: '20' },
        ]},
      ],
    },
    { // Day 2
      id: generateUniqueId(),
      name: 'W1D2: Lung Burner',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5, exercises: [ { id: 'running', name: 'Run 400m', reps: '1' }, { id: 'air-squats', name: 'Air Squats', reps: '50' } ]},
      ]
    },
    { // Day 3
      id: generateUniqueId(),
      name: 'W1D3: Push-Pull Power',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: EMOM', minutes: Array.from({ length: 7 }, () => [{ id: generateUniqueId(), task: 'Max Reps Hand-Release Push-ups' }, { id: generateUniqueId(), task: 'Rest 60s' }]).flat()},
        { id: generateUniqueId(), type: 'Bodyweight', exercises: [ { id: 'inverted-rows', name: 'Inverted Rows (feet elevated)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '15', trackingType: 'reps' })) } ]},
      ]
    },
    { // Day 4
      id: generateUniqueId(),
      name: 'W1D4: Leg Chipper',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
            { id: 'bodyweight-walking-lunge', name: 'Walking Lunges', reps: '100' }, { id: 'air-squats', name: 'Air Squats', reps: '80' }, { id: 'broad-jumps', name: 'Broad Jumps', reps: '60' }, { id: 'tuck-jumps', name: 'Tuck Jumps', reps: '40' }, { id: 'burpees', name: 'Burpees', reps: '20' },
        ]}
      ]
    },
    { // Day 5
      id: generateUniqueId(),
      name: 'W1D5: "Cindy" Benchmark',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 20, exercises: [ { id: 'pullups', name: 'Pull-ups', reps: '5' }, { id: 'push-ups', name: 'Push-ups', reps: '10' }, { id: 'air-squats', name: 'Squats', reps: '15' } ], note: 'This is a classic benchmark workout. Record your score!'}
      ]
    },
    // --- WEEK 2 ---
    { // Day 6
      id: generateUniqueId(),
      name: 'W2D1: Gymnastics Volume',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: EMOM', minutes: Array.from({ length: 10 }, () => [{ id: generateUniqueId(), task: 'Odd Mins: 5-10 Handstand Push-ups' }, { id: generateUniqueId(), task: 'Even Mins: 10-15 Pistol Squats (alt.)' }]).flat(), note: 'Perform for 20 minutes total (10 rounds of each).' }
      ]
    },
    { // Day 7
      id: generateUniqueId(),
      name: 'W2D2: Interval Sprint',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 30, rest: 30, rounds: 10, exercises: [{id: 'burpees', name: 'Max Rep Burpees'}]}
      ]
    },
    { // Day 8
      id: generateUniqueId(),
      name: 'W2D3: Upper Body Burnout',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
          { id: 'handstand-push-ups', name: 'Handstand Push-ups', reps: '50' },
          { id: 'pullups', name: 'Pull-ups', reps: '75' },
          { id: 'push-ups', name: 'Push-ups', reps: '100' },
        ]}
      ]
    },
    { // Day 9
      id: generateUniqueId(),
      name: 'W2D4: "Angie" Prep',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 1, exercises: [
            { id: 'pullups', name: 'Pull-ups', reps: '50' }, { id: 'push-ups', name: 'Push-ups', reps: '50' }, { id: 'sit-up', name: 'Sit-ups', reps: '50' }, { id: 'air-squats', name: 'Squats', reps: '50' },
        ], note: "Half of 'Angie'. Complete all reps of one exercise before moving to the next."}
      ]
    },
    { // Day 10
      id: generateUniqueId(),
      name: 'W2D5: Active Recovery',
      blocks: [
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'running', name: 'Run or Jog', duration: '30' } ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'static-stretching', name: '10-15 minutes of full-body stretching.' } ]}
      ]
    },
    // --- WEEK 3 ---
    { // Day 11
      id: generateUniqueId(),
      name: 'W3D1: "Mary" Benchmark',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 20, exercises: [
            {id: 'handstand-push-ups', name: 'Handstand Push-ups', reps: '5'}, {id: 'pistol-squats', name: 'Pistol Squats (alternating)', reps: '10'}, {id: 'pullups', name: 'Pull-ups', reps: '15'}
        ]}
      ]
    },
    { // Day 12
      id: generateUniqueId(),
      name: 'W3D2: Leg Endurance',
      blocks: [
        { id: generateUniqueId(), type: 'Bodyweight', exercises: [
          {id: 'air-squats', name: 'Air Squats', sets: [{id: generateUniqueId(), value: '300', trackingType: 'reps'}]}
        ], note: 'For time. Partition reps as needed to complete all 300.'}
      ]
    },
    { // Day 13
      id: generateUniqueId(),
      name: 'W3D3: Tabata From Hell',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Tabata', exercises: [ { id: 'burpees', name: 'Burpees' } ]},
        { id: 'rest', type: 'Cardio', exercises: [{ id: null, name: 'Rest', duration: '1' }]},
        { id: generateUniqueId(), type: 'Conditioning: Tabata', exercises: [ { id: 'v-up', name: 'V-Ups' } ]},
        { id: 'rest', type: 'Cardio', exercises: [{ id: null, name: 'Rest', duration: '1' }]},
        { id: generateUniqueId(), type: 'Conditioning: Tabata', exercises: [ { id: 'jumping-lunges', name: 'Jumping Lunges' } ]},
      ]
    },
    { // Day 14
      id: generateUniqueId(),
      name: 'W3D4: Gymnastics Test',
      blocks: [
        { id: generateUniqueId(), type: 'Bodyweight', exercises: [
            {id: 'handstand-hold', name: 'Max Time Handstand Hold', sets: [{id: generateUniqueId(), value: 'Max', trackingType: 'duration'}]},
            {id: 'pullups', name: 'Max Unbroken Pull-ups', sets: [{id: generateUniqueId(), value: 'Max', trackingType: 'reps'}]},
            {id: 'pistol-squats', name: 'Max Alternating Pistol Squats in 2 mins', sets: [{id: generateUniqueId(), value: 'Max', trackingType: 'reps'}]},
        ]}
      ]
    },
    { // Day 15
      id: generateUniqueId(),
      name: 'W3D5: Active Recovery',
      blocks: [
        { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Walk', duration: '45' } ]},
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'static-stretching', name: '10 minutes of light stretching.' } ]}
      ]
    },
    // --- WEEK 4 ---
    { // Day 16
      id: generateUniqueId(),
      name: 'W4D1: "Murph" Prep',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
          {id: 'running', name: 'Run 800m', reps: '1'},
          {id: 'pullups', name: 'Pull-ups', reps: '50'},
          {id: 'push-ups', name: 'Push-ups', reps: '100'},
          {id: 'air-squats', name: 'Air Squats', reps: '150'},
          {id: 'running', name: 'Run 800m', reps: '1'},
        ], note: 'Partition the pull-ups, push-ups, and squats as needed.'}
      ]
    },
    { // Day 17
      id: generateUniqueId(),
      name: 'W4D2: Leg Blaster',
      blocks: [
          { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 10, exercises: [
              {id: 'air-squats', name: 'Air Squats', reps: '10'},
              {id: 'jumping-lunges', name: 'Jumping Lunges (alternating)', reps: '10'},
              {id: 'broad-jumps', name: 'Broad Jumps', reps: '10'},
          ]}
      ]
    },
    { // Day 18
      id: generateUniqueId(),
      name: 'W4D3: Interval Gauntlet',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 50, rest: 10, rounds: 10, exercises: [
            { id: 'burpees', name: 'Burpees' },
        ]}
      ]
    },
    { // Day 19
      id: generateUniqueId(),
      name: 'W4D4: The Longest Mile',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
            {id: 'burpees', name: '10 Burpees every 100m of a 1 mile run', reps: '1'},
        ], note: 'Run 1 mile. At the start and every 100 meters, stop and perform 10 burpees. This is a total of 170 burpees.'}
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