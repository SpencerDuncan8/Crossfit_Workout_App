// src/data/programTemplates.js

// This utility helps us create unique IDs for our template workouts.
const generateTemplateId = (prefix) => `${prefix}_${Math.random().toString(36).substr(2, 9)}`;

export const programTemplates = [
  {
    id: generateTemplateId('template'),
    name: 'Bodyweight Blast',
    description: 'A 4-week program using only your bodyweight. Perfect for starting out or training on the go. Perform the 3 workouts sequentially each week.',
    workouts: [
      // --- WORKOUT 1: FULL BODY A ---
      {
        id: generateTemplateId('bw_workout'),
        name: 'Full Body A',
        blocks: [
          {
            id: generateTemplateId('block'),
            type: 'Warm-up',
            exercises: [
              { id: generateTemplateId('ex'), name: '30 Jumping Jacks' },
              { id: generateTemplateId('ex'), name: '15 Arm Circles (each way)' },
              { id: generateTemplateId('ex'), name: '10 Bodyweight Squats' },
              { id: generateTemplateId('ex'), name: '10 Lunges (5 each side)' },
            ]
          },
          {
            id: generateTemplateId('block'),
            type: 'Strength',
            rest: '60s',
            exercises: [
              {
                id: generateTemplateId('ex'),
                name: 'Push-ups',
                sets: [
                  { id: generateTemplateId('set'), reps: 'AMRAP' }, // As Many Reps As Possible
                  { id: generateTemplateId('set'), reps: 'AMRAP' },
                  { id: generateTemplateId('set'), reps: 'AMRAP' },
                ]
              },
              {
                id: generateTemplateId('ex'),
                name: 'Bodyweight Squats',
                sets: [
                  { id: generateTemplateId('set'), reps: '20' },
                  { id: generateTemplateId('set'), reps: '20' },
                  { id: generateTemplateId('set'), reps: '20' },
                ]
              }
            ]
          },
          {
            id: generateTemplateId('block'),
            type: 'Conditioning: AMRAP',
            duration: 10, // in minutes
            exercises: [
              { id: generateTemplateId('ex'), name: '5 Burpees' },
              { id: generateTemplateId('ex'), name: '10 Sit-ups' },
              { id: generateTemplateId('ex'), name: '15 Air Squats' },
            ]
          }
        ]
      },
      // --- WORKOUT 2: FULL BODY B ---
      {
        id: generateTemplateId('bw_workout'),
        name: 'Full Body B',
        blocks: [
          {
            id: generateTemplateId('block'),
            type: 'Warm-up',
            exercises: [
              { id: generateTemplateId('ex'), name: '30 High Knees' },
              { id: generateTemplateId('ex'), name: '15 Torso Twists' },
              { id: generateTemplateId('ex'), name: '10 Glute Bridges' },
              { id: generateTemplateId('ex'), name: '10 Good Mornings (no weight)' },
            ]
          },
          {
            id: generateTemplateId('block'),
            type: 'Conditioning: RFT',
            rounds: 5,
            exercises: [
              // --- FIXES ARE HERE ---
              { id: generateTemplateId('ex'), name: 'Inverted Rows (or Plank-ups)', reps: '10' },
              { id: generateTemplateId('ex'), name: 'Lunges (alternating)', reps: '20' },
              { id: generateTemplateId('ex'), name: '30 Second Plank', reps: '' }, // Reps are now blank so "1" isn't added
            ]
          },
          {
            id: generateTemplateId('block'),
            type: 'Cool-down',
            exercises: [
                { id: generateTemplateId('ex'), name: '30s Cobra Stretch' },
                { id: generateTemplateId('ex'), name: '30s Child\'s Pose' },
            ]
          }
        ]
      },
      // --- WORKOUT 3: CARDIO & CORE ---
      {
        id: generateTemplateId('bw_workout'),
        name: 'Cardio & Core',
        blocks: [
          {
            id: generateTemplateId('block'),
            type: 'Cardio',
            exercises: [
              { id: generateTemplateId('ex'), name: 'Jogging in place', duration: '5' },
              { id: generateTemplateId('ex'), name: 'Jumping Jacks', duration: '5' },
            ]
          },
          {
            id: generateTemplateId('block'),
            type: 'Conditioning: Tabata',
            work: 20, // seconds
            rest: 10, // seconds
            rounds: 8,
            exercises: [
              { id: generateTemplateId('ex'), name: 'Mountain Climbers' },
              { id: generateTemplateId('ex'), name: 'Plank' },
            ]
          }
        ]
      },
    ]
  }
];