// src/data/templates/bodyweightBuilderAdvancedTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

export const bodyweightBuilderAdvancedTemplate = {
  id: 'template_bodyweight_builder_advanced',
  name: 'Bodyweight Builder (Advanced)',
  description: 'Forge an elite physique with this master-level bodyweight program. This plan uses high-tension techniques and complex movements to build maximum muscle and strength.',
  isTemplate: true,
  daysPerWeek: 4,
  meta: {
    type: 'Structured Program',
    level: 'Advanced',
    goal: 'Build Muscle',
    equipment: 'Bodyweight'
  },
  workouts: [
    // --- WEEK 1 ---
    { // Day 1
      id: generateUniqueId(),
      name: 'W1D1: Advanced Push',
      blocks: [
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 90s between sets. Focus on perfect form.', exercises: [
            { id: 'handstand-push-ups', name: 'Strict Handstand Push-ups (or Pike Push-up progression)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: 'Max', trackingType: 'reps' })) },
            { id: 'archer-push-ups', name: 'Archer Push-ups', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '8-10', trackingType: 'reps' })) },
            { id: 'dips-chair', name: 'Dips (feet elevated, weighted if possible)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '15-20', trackingType: 'reps' })) },
        ]},
      ],
    },
    { // Day 2
      id: generateUniqueId(),
      name: 'W1D2: Advanced Legs',
      blocks: [
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 90s between sets.', exercises: [
          { id: 'pistol-squats', name: 'Pistol Squats (alternating)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '6-8', trackingType: 'reps' })) },
          { id: 'shrimp-squat', name: 'Shrimp Squats', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '8-10', trackingType: 'reps' })) },
          { id: 'single-leg-glute-bridge', name: 'Weighted Single-Leg Glute Bridges', sets: Array.from({ length: 3 }, () => ({ id: generateUniqueId(), value: '15', trackingType: 'reps' })) },
        ]},
      ]
    },
    { // Day 3
      id: generateUniqueId(),
      name: 'W1D3: Advanced Pull',
      blocks: [
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 90s between sets.', exercises: [
          { id: 'pullups', name: 'Weighted Pull-ups (if possible)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '5-8', trackingType: 'reps' })) },
          { id: 'inverted-rows', name: 'Inverted Rows (feet elevated, weighted)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '10-12', trackingType: 'reps' })) },
        ]},
      ]
    },
    { // Day 4
      id: generateUniqueId(),
      name: 'W1D4: Metcon Finisher',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5, exercises: [
          { id: 'handstand-wall-walks', name: 'Handstand Wall Walks', reps: '3' },
          { id: 'burpees', name: 'Burpees', reps: '15' },
        ]}
      ]
    },
    // --- WEEKS 2, 3, 4 ---
    // The pattern continues, focusing on increasing reps, adding pauses, or making the movements harder (e.g., deeper HSPU)
    { // Day 5
      id: generateUniqueId(),
      name: 'W2D1: Push Endurance',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: EMOM', minutes: Array.from({ length: 10 }, () => ({ id: generateUniqueId(), task: '3-5 Strict Handstand Push-ups' }))},
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 60s.', exercises: [
            { id: 'one-arm-push-up', name: 'One-Arm Push-up Practice (or Archer Push-ups)', sets: Array.from({ length: 4 }, () => ({ id: generateUniqueId(), value: '5', trackingType: 'reps' })) },
        ]},
      ],
    },
    { // Day 6
      id: generateUniqueId(),
      name: 'W2D2: Leg Power',
      blocks: [
        { id: generateUniqueId(), type: 'Bodyweight', note: 'Rest 60s.', exercises: [
            { id: 'pistol-squats', name: 'Jumping Pistol Squats', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '5', trackingType: 'reps' })) },
            { id: 'broad-jumps', name: 'Max Distance Broad Jumps', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), value: '3', trackingType: 'reps' })) },
        ]},
      ]
    },
    { // Day 7
      id: generateUniqueId(),
      name: 'W2D3: Pull Density',
      blocks: [
        { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 15, exercises: [
          { id: 'pullups', name: 'Strict Pull-ups', reps: '5' },
          { id: 'inverted-rows', name: 'Inverted Rows (feet elevated)', reps: '10' },
        ]}
      ]
    },
    { // Day 8
      id: generateUniqueId(),
      name: 'W2D4: Active Recovery',
      blocks: [ { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Walk or light jog', duration: '30-45' } ] } ]
    },
    // Day 9-12 (Week 3)
    {
      id: generateUniqueId(),
      name: 'W3D1: Push Complex',
      blocks: [{ id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5, exercises: [
          {id: 'handstand-wall-walks', name: '2 Wall Walks'}, {id: 'dips-chair', name: '20 Dips'}
      ]}]
    },
    {
      id: generateUniqueId(),
      name: 'W3D2: Leg Complex',
      blocks: [{ id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 10, exercises: [
          {id: 'pistol-squats', name: '3 Pistol Squats (each leg)'}, {id: 'jump-squats', name: '15 Jump Squats'}
      ]}]
    },
    {
      id: generateUniqueId(),
      name: 'W3D3: Pull Complex',
      blocks: [{ id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 7, exercises: [
          {id: 'muscle-up', name: '1 Bar Muscle-up (or 5 pull-ups + 5 dips)'}, {id: 'inverted-rows', name: '15 Inverted Rows'}
      ]}]
    },
    {
      id: generateUniqueId(),
      name: 'W3D4: "Murph" Prep',
      blocks: [{ id: generateUniqueId(), type: 'Conditioning: Chipper', exercises: [
          {id: 'running', name: 'Run 1 Mile'}, {id: 'pullups', name: '50 Pull-ups'}, {id: 'push-ups', name: '100 Push-ups'}, {id: 'air-squats', name: '150 Air Squats'}, {id: 'running', name: 'Run 1 Mile'},
      ]}]
    },
    // Day 13-16 (Week 4)
    {
      id: generateUniqueId(),
      name: 'W4D1: Max Effort Test',
      blocks: [
        { id: generateUniqueId(), type: 'Bodyweight', exercises: [
            { id: 'handstand-push-ups', name: 'Max Unbroken Handstand Push-ups', sets: [{ id: generateUniqueId(), value: 'Max', trackingType: 'reps' }] },
            { id: 'pistol-squats', name: 'Max Unbroken Alternating Pistol Squats', sets: [{ id: generateUniqueId(), value: 'Max', trackingType: 'reps' }] },
            { id: 'pullups', name: 'Max Unbroken Pull-ups', sets: [{ id: generateUniqueId(), value: 'Max', trackingType: 'reps' }] },
        ], note: 'Rest as needed between max effort attempts.'}
      ]
    },
    {
      id: generateUniqueId(),
      name: 'W4D2: Full Body Burn',
      blocks: [{ id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 20, exercises: [
        { id: 'handstand-wall-walks', name: 'Wall Walks', reps: '5' },
        { id: 'jumping-lunges', name: 'Jumping Lunges', reps: '20' },
        { id: 'v-up', name: 'V-Ups', reps: '15' },
      ]}]
    },
    {
      id: generateUniqueId(),
      name: 'W4D3: The Final EMOM',
      blocks: [{ id: generateUniqueId(), type: 'Conditioning: EMOM', minutes: Array.from({ length: 15 }, () => ({ id: generateUniqueId(), task: '3 Muscle-ups (or 7 pull-ups + 7 dips)' }))}]
    },
    {
      id: generateUniqueId(),
      name: 'W4D4: Deload & Mobility',
      blocks: [ { id: generateUniqueId(), type: 'Cool-down', exercises: [ {id: 'static-stretching', name: '20-30 minutes of deep stretching and foam rolling.'} ] } ]
    },
    // Final four days are active recovery/rest
    { id: generateUniqueId(), name: 'W4D5: Active Recovery', blocks: [ { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Walk', duration: '45' } ] } ]},
    { id: generateUniqueId(), name: 'W4D6: Active Recovery', blocks: [ { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Walk', duration: '45' } ] } ]},
    { id: generateUniqueId(), name: 'W4D7: Active Recovery', blocks: [ { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Walk', duration: '45' } ] } ]},
    { id: generateUniqueId(), name: 'W4D8: Active Recovery', blocks: [ { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'walking', name: 'Light Walk', duration: '45' } ] } ]},
  ]
};