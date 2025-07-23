// src/data/templates/bodyweightBlastBeginnerTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

// THIS IS THE LINE TO CHANGE
export const bodyweightBlastBeginnerTemplate = {
  id: 'template_bodyweight_blast_beginner',
  name: 'Bodyweight Blast (Beginner)',
  // ... rest of the file content remains the same
  description: 'A 4-week, 5-day-a-week program using only your bodyweight. Perfect for building foundational strength and endurance anywhere, anytime.',
  isTemplate: true,
  daysPerWeek: 5,
    meta: {
    type: 'Structured Program',
    level: 'Beginner',
    goal: 'General Fitness',
    equipment: 'Bodyweight'
  },
  workouts: [
    // ... all the workout data is unchanged
    // Day 1
    { 
      id: generateUniqueId(),
      name: 'W1D1: Foundation Builder',
      blocks: [
        {
          id: generateUniqueId(), type: 'Warm-up',
          exercises: [
            { id: 'jumping-jack', name: 'Jumping Jacks (60s)' },
            { id: 'arm-circles', name: 'Arm Circles (30s each way)' },
            { id: 'leg-swings', name: 'Leg Swings (30s each leg)' },
            { id: 'cat-cow-stretch', name: 'Cat-Cow Stretch (10 reps)' },
          ],
        },
        {
          id: generateUniqueId(), type: 'Bodyweight',
          exercises: [
            { id: 'push-ups', name: 'Push-ups', sets: [
                { id: generateUniqueId(), value: '15', trackingType: 'reps' },
                { id: generateUniqueId(), value: '12', trackingType: 'reps' },
                { id: generateUniqueId(), value: '10', trackingType: 'reps' },
            ]},
            { id: 'air-squats', name: 'Squats', sets: [
                { id: generateUniqueId(), value: '20', trackingType: 'reps' },
                { id: generateUniqueId(), value: '20', trackingType: 'reps' },
                { id: generateUniqueId(), value: '20', trackingType: 'reps' },
            ]},
            { id: 'plank', name: 'Plank', sets: [
                { id: generateUniqueId(), value: '60', trackingType: 'duration' },
                { id: generateUniqueId(), value: '60', trackingType: 'duration' },
            ]},
          ],
        },
        {
          id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 10,
          exercises: [
            { id: 'burpees', name: 'Burpees', reps: '5' },
            { id: 'bodyweight-lunge', name: 'Lunges (alternating)', reps: '10' },
            { id: 'sit-up', name: 'Sit-ups', reps: '15' },
          ],
        },
        {
          id: generateUniqueId(), type: 'Cool-down',
          exercises: [ { id: 'quad-stretch', name: 'Quad Stretch (30s each)' }, { id: 'hamstring-stretch', name: 'Hamstring Stretch (30s each)' } ]
        },
      ],
    },
    { // Day 2
      id: generateUniqueId(),
      name: 'W1D2: Core & Cardio',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'high-knees', name: 'High Knees (60s)' }, { id: 'butt-kicks', name: 'Butt Kicks (60s)' } ] },
        { 
          id: generateUniqueId(), type: 'Conditioning: Tabata',
          exercises: [ { id: 'mountain-climbers', name: 'Mountain Climbers' } ]
        },
          { 
          id: generateUniqueId(), type: 'Conditioning: Tabata',
          exercises: [ { id: 'jumping-jack', name: 'Jumping Jacks' } ]
        },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'childs-pose', name: 'Childs Pose (60s)' } ] }
      ]
    },
    { // Day 3
      id: generateUniqueId(),
      name: 'W1D3: Upper Body Burn',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'inchworms', name: 'Inchworms (10 reps)' }, { id: 'shoulder-taps', name: 'Shoulder Taps (20 reps)' } ] },
        { 
          id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5,
          exercises: [ { id: 'push-ups', name: 'Push-ups', reps: '10' }, { id: 'dips-chair', name: 'Dips (using chair/bench)', reps: '15' } ]
        },
        {
          id: generateUniqueId(), type: 'Bodyweight',
          exercises: [ { id: 'shoulder-taps', name: 'Plank Shoulder Taps', sets: [
              { id: generateUniqueId(), value: '40', trackingType: 'reps' },
              { id: generateUniqueId(), value: '40', trackingType: 'reps' },
          ] } ]
        },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'tricep-stretch', name: 'Tricep Stretch (30s each)' } ] }
      ]
    },
    { // Day 4
      id: generateUniqueId(),
      name: 'W1D4: Leg Day Chipper',
      blocks: [
        { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'glute-bridges', name: 'Glute Bridges (20 reps)' }, { id: 'bodyweight-good-mornings', name: 'Bodyweight Good Mornings (15 reps)' } ] },
        {
          id: generateUniqueId(), type: 'Conditioning: Chipper',
          exercises: [
            { id: 'air-squats', name: 'Squats', reps: '100' },
            { id: 'bodyweight-lunge', name: 'Walking Lunges', reps: '80' },
            { id: 'bodyweight-calf-raises', name: 'Calf Raises', reps: '60' },
            { id: 'jumping-jack', name: 'Jumping Jacks', reps: '40' },
            { id: 'burpees', name: 'Burpees', reps: '20' },
          ]
        },
        { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'pigeon-pose', name: 'Pigeon Pose (60s each)' } ] }
      ]
    },
      { // Day 5
        id: generateUniqueId(),
        name: 'W1D5: Full Body Finisher',
        blocks: [
          // Block 1: Warm-up
          { 
            id: generateUniqueId(), type: 'Warm-up',
            exercises: [
              { id: 'jumping-jack', name: 'Jumping Jacks (60s)' },
              { id: 'cat-cow-stretch', name: 'Cat-Cow Stretch (10 reps)' },
              { id: 'air-squats', name: 'Air Squats (15 reps)' },
            ],
          },
          // Block 2: AMRAP
          {
            id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 10,
            exercises: [
              { id: 'burpees', name: 'Burpees (or Step-Back Burpees)', reps: '5' },
              { id: 'bodyweight-lunge', name: 'Alternating Lunges', reps: '10' },
            ],
            note: 'After completing the AMRAP, rest 2 minutes before starting the EMOM.'
          },
                    // Block 3: EMOM
                    {
                      id: generateUniqueId(), type: 'Conditioning: EMOM',
                      minutes: [
                        { id: generateUniqueId(), task: '15 Air Squats', exercises: [{ instanceId: generateUniqueId(), id: 'air-squats', name: 'Air Squats', reps: '15' }] },
                        { id: generateUniqueId(), task: '12 Push-ups (on knees if needed)', exercises: [{ instanceId: generateUniqueId(), id: 'push-ups', name: 'Push-ups', reps: '12' }] },
                        { id: generateUniqueId(), task: '15 Sit-ups', exercises: [{ instanceId: generateUniqueId(), id: 'sit-up', name: 'Sit-ups', reps: '15' }] },
                        { id: generateUniqueId(), task: '45s Plank', exercises: [{ instanceId: generateUniqueId(), id: 'plank', name: 'Plank', reps: '45s' }] },
                        { id: generateUniqueId(), task: '60s Jumping Jacks', exercises: [{ instanceId: generateUniqueId(), id: 'jumping-jack', name: 'Jumping Jacks', reps: '60s' }] },
                      ]
                    },
          // Block 4: Cool-down
          {
            id: generateUniqueId(), type: 'Cool-down',
            exercises: [ 
              { id: 'doorway-chest-stretch', name: 'Doorway Chest Stretch (30s)' },
              { id: 'quad-stretch', name: 'Quad Stretch (30s each leg)' },
              { id: 'childs-pose', name: "Child's Pose (60s)" },
            ]
          }
        ]
      },
    // --- WEEK 2 ---
    { // Day 6
      id: generateUniqueId(),
      name: 'W2D1: Strength & Stamina',
      blocks: [
          { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'jumping-jack', name: 'Jumping Jacks (60s)' }, { id: 'torso-twists', name: 'Torso Twists (30s)' } ] },
          { id: generateUniqueId(), type: 'Bodyweight',
              exercises: [
                  { id: 'bodyweight-bulgarian-split-squats', name: 'Bulgarian Split Squats (L)', sets: [
                      {id: generateUniqueId(), value: '12', trackingType: 'reps'},
                      {id: generateUniqueId(), value: '12', trackingType: 'reps'},
                      {id: generateUniqueId(), value: '12', trackingType: 'reps'},
                  ]},
                  { id: 'bodyweight-bulgarian-split-squats', name: 'Bulgarian Split Squats (R)', sets: [
                      {id: generateUniqueId(), value: '12', trackingType: 'reps'},
                      {id: generateUniqueId(), value: '12', trackingType: 'reps'},
                      {id: generateUniqueId(), value: '12', trackingType: 'reps'},
                  ]},
                  { id: 'push-ups', name: 'Decline Push-ups', sets: [
                      {id: generateUniqueId(), value: '15', trackingType: 'reps'},
                      {id: generateUniqueId(), value: '15', trackingType: 'reps'},
                      {id: generateUniqueId(), value: '15', trackingType: 'reps'},
                  ]},
              ]
          },
          { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: 'jump-rope', name: 'Jog in Place or Jump Rope', duration: 10 } ] }
      ]
    },
        { // Day 7
      id: generateUniqueId(),
      name: 'W2D2: AMRAP Madness',
      blocks: [
        // --- WARM-UP ---
        {
          id: generateUniqueId(), type: 'Warm-up',
          exercises: [
            { id: 'jumping-jack', name: 'Jumping Jacks (60s)' },
            { id: 'leg-swings', name: 'Leg Swings (30s each leg, forward & side)' },
            { id: 'inchworms', name: 'Inchworms (8 reps)' },
            { id: 'air-squats', name: 'Air Squats (15 reps)' }
          ]
        },
        // --- MAIN WORKOUT ---
        { 
          id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 20,
          exercises: [
            { id: 'hand-release-push-ups', name: 'Hand-Release Push-ups', reps: '8' },
            { id: 'air-squats', name: 'Air Squats', reps: '16' },
            { id: 'v-up', name: 'V-Ups', reps: '8' },
          ]
        },
        // --- COOL-DOWN ---
        {
          id: generateUniqueId(), type: 'Cool-down',
          exercises: [
            { id: 'pigeon-pose', name: 'Pigeon Pose (60s each side)' },
            { id: 'cobra-stretch', name: 'Cobra Stretch (60s)' },
            { id: 'hamstring-stretch', name: 'Hamstring Stretch (30s each)' }
          ]
        }
      ]
    },
    { // Day 8
      id: generateUniqueId(),
      name: 'W2D3: Tabata Time',
      blocks: [
          { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'high-knees', name: 'High Knees (60s)' }, { id: 'butt-kicks', name: 'Butt Kicks (60s)' } ] },
          { id: generateUniqueId(), type: 'Conditioning: Tabata',
              exercises: [ { id: 'burpees', name: 'Burpees' } ]
          },
          { id: generateUniqueId(), type: 'Conditioning: Tabata',
              exercises: [ { id: 'plank', name: 'Plank' } ]
          },
          { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: 'cobra-stretch', name: 'Cobra Stretch (60s)' } ] }
      ]
    },
    { // Day 9
      id: generateUniqueId(),
      name: 'W2D4: For Time Ladder',
      blocks: [
        // --- WARM-UP ---
        {
          id: generateUniqueId(), type: 'Warm-up',
          exercises: [
            { id: 'high-knees', name: 'High Knees (60s)' },
            { id: 'air-squats', name: 'Air Squats (20 reps)' },
            { id: 'inchworms', name: 'Inchworms (8 reps)' },
            { id: 'burpees', name: 'Step-Back Burpees (5 reps)' }
          ]
        },
        // --- MAIN WORKOUT ---
        { 
          id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 1,
          exercises: [
            { id: 'burpees', name: 'Burpees', reps: '10' }, { id: 'air-squats', name: 'Squats', reps: '10' },
            { id: 'burpees', name: 'Burpees', reps: '9' }, { id: 'air-squats', name: 'Squats', reps: '9' },
            { id: 'burpees', name: 'Burpees', reps: '8' }, { id: 'air-squats', name: 'Squats', reps: '8' },
            { id: 'burpees', name: 'Burpees', reps: '7' }, { id: 'air-squats', name: 'Squats', reps: '7' },
            { id: 'burpees', name: 'Burpees', reps: '6' }, { id: 'air-squats', name: 'Squats', reps: '6' },
            { id: 'burpees', name: 'Burpees', reps: '5' }, { id: 'air-squats', name: 'Squats', reps: '5' },
            { id: 'burpees', name: 'Burpees', reps: '4' }, { id: 'air-squats', name: 'Squats', reps: '4' },
            { id: 'burpees', name: 'Burpees', reps: '3' }, { id: 'air-squats', name: 'Squats', reps: '3' },
            { id: 'burpees', name: 'Burpees', reps: '2' }, { id: 'air-squats', name: 'Squats', reps: '2' },
            { id: 'burpees', name: 'Burpees', reps: '1' }, { id: 'air-squats', name: 'Squats', reps: '1' },
          ],
          note: 'This is a descending ladder. Complete all reps for time.'
        },
        // --- COOL-DOWN ---
        {
          id: generateUniqueId(), type: 'Cool-down',
          exercises: [
            { id: 'quad-stretch', name: 'Quad Stretch (45s each side)' },
            { id: 'doorway-chest-stretch', name: 'Doorway Chest Stretch (45s)' },
            { id: 'pigeon-pose', name: 'Pigeon Pose (60s each side)' }
          ]
        }
      ]
    },
    { // Day 10
      id: generateUniqueId(),
      name: 'W2D5: EMOM Endurance',
      blocks: [
        // --- WARM-UP ---
        {
          id: generateUniqueId(), type: 'Warm-up',
          exercises: [
            { id: 'jumping-jack', name: 'Jumping Jacks (60s)' },
            { id: 'arm-circles', name: 'Arm Circles (15 each way)' },
            { id: 'leg-swings', name: 'Leg Swings (30s each leg)' },
            { id: 'push-ups', name: '5 Incline or Knee Push-ups' },
            { id: 'bodyweight-lunge', name: '10 Alternating Lunges (5 each side)' },
            { id: 'sit-up', name: '10 Sit-ups' }
          ]
        },
        // --- MAIN WORKOUT ---
        {
          id: generateUniqueId(), type: 'Conditioning: EMOM',
          // --- AFTER (Day 10) ---
          minutes: [
            { id: generateUniqueId(), task: 'Minute 1: 15 Push-ups', exercises: [{ instanceId: generateUniqueId(), id: 'push-ups', name: 'Push-ups', reps: '15' }] },
            { id: generateUniqueId(), task: 'Minute 2: 20 Lunges', exercises: [{ instanceId: generateUniqueId(), id: 'bodyweight-lunge', name: 'Lunges', reps: '20' }] },
            { id: generateUniqueId(), task: 'Minute 3: 25 Sit-ups', exercises: [{ instanceId: generateUniqueId(), id: 'sit-up', name: 'Sit-ups', reps: '25' }] },
            { id: generateUniqueId(), task: 'Minute 4: Rest', exercises: [] },
            { id: generateUniqueId(), task: 'Minute 5: 15 Push-ups', exercises: [{ instanceId: generateUniqueId(), id: 'push-ups', name: 'Push-ups', reps: '15' }] },
            { id: generateUniqueId(), task: 'Minute 6: 20 Lunges', exercises: [{ instanceId: generateUniqueId(), id: 'bodyweight-lunge', name: 'Lunges', reps: '20' }] },
            { id: generateUniqueId(), task: 'Minute 7: 25 Sit-ups', exercises: [{ instanceId: generateUniqueId(), id: 'sit-up', name: 'Sit-ups', reps: '25' }] },
            { id: generateUniqueId(), task: 'Minute 8: Rest', exercises: [] },
            { id: generateUniqueId(), task: 'Minute 9: 15 Push-ups', exercises: [{ instanceId: generateUniqueId(), id: 'push-ups', name: 'Push-ups', reps: '15' }] },
            { id: generateUniqueId(), task: 'Minute 10: 20 Lunges', exercises: [{ instanceId: generateUniqueId(), id: 'bodyweight-lunge', name: 'Lunges', reps: '20' }] },
            { id: generateUniqueId(), task: 'Minute 11: 25 Sit-ups', exercises: [{ instanceId: generateUniqueId(), id: 'sit-up', name: 'Sit-ups', reps: '25' }] },
            { id: generateUniqueId(), task: 'Minute 12: Rest', exercises: [] },
          ],
          note: 'Perform the prescribed exercise at the top of each minute for 12 minutes total (3 rounds of the circuit).'
        },
        // --- COOL-DOWN ---
        {
          id: generateUniqueId(), type: 'Cool-down',
          exercises: [
            { id: 'doorway-chest-stretch', name: 'Doorway Chest Stretch (45s)' },
            { id: 'quad-stretch', name: 'Quad Stretch (45s each side)' },
            { id: 'pigeon-pose', name: 'Pigeon Pose (60s each side)' }
          ]
        }
      ]
    },
    // --- WEEK 3 ---
    { // Day 11
      id: generateUniqueId(),
      name: 'W3D1: Power & Plyo',
      blocks: [
          { 
            id: generateUniqueId(), type: 'Warm-up', 
            exercises: [
              {id: 'pogo-hops', name: 'Pogo Hops (60s)'}, 
              {id: 'air-squats', name: 'Bodyweight Squats (20 reps)'}
            ]
          },
          { 
            id: generateUniqueId(), type: 'Bodyweight',
            exercises: [
              { 
                id: 'jump-squats', name: 'Jumping Squats', 
                sets: [
                  {id: generateUniqueId(), value: '15', trackingType: 'reps'},
                  {id: generateUniqueId(), value: '15', trackingType: 'reps'},
                  {id: generateUniqueId(), value: '15', trackingType: 'reps'},
                  {id: generateUniqueId(), value: '15', trackingType: 'reps'},
                ]
              },
              { 
                id: 'plyometric-push-ups', name: 'Plyo Push-ups', 
                sets: [
                  {id: generateUniqueId(), value: '10', trackingType: 'reps'},
                  {id: generateUniqueId(), value: '10', trackingType: 'reps'},
                  {id: generateUniqueId(), value: '10', trackingType: 'reps'},
                ]
              },
            ]
          },
          { 
            id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 12,
            exercises: [
              {id: 'jumping-lunges', name: 'Jumping Lunges', reps: '10'}, 
              {id: 'box-jumps', name: 'Burpee Box Jumps (use stair)', reps: '5'}
            ]
          },
          // --- NEW COOL-DOWN ---
          {
            id: generateUniqueId(), type: 'Cool-down',
            exercises: [
              {id: 'quad-stretch', name: 'Quad Stretch (60s each side)'},
              {id: 'pigeon-pose', name: 'Pigeon Pose (60s each side)'},
              {id: 'doorway-chest-stretch', name: 'Doorway Chest Stretch (60s)'},
            ]
          }
      ]
    },
    { // Day 12
      id: generateUniqueId(),
      name: 'W3D2: The Grinder',
      blocks: [
          // --- NEW WARM-UP ---
          {
            id: generateUniqueId(), type: 'Warm-up',
            exercises: [
              {id: 'butt-kicks', name: 'Butt Kicks (60s)'},
              {id: 'leg-swings', name: 'Leg Swings (30s each way, each leg)'},
              {id: 'air-squats', name: 'Air Squats (25 reps)'},
            ]
          },
          // --- MAIN WORKOUT ---
          { 
            id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 3,
            exercises: [
              {id: 'high-knees', name: 'Run 400m (or 2 min high knees)', reps: '1'},
              {id: 'air-squats', name: 'Air Squats', reps: '50'}
            ]
          },
          // --- NEW COOL-DOWN ---
          {
            id: generateUniqueId(), type: 'Cool-down',
            exercises: [
              {id: 'quad-stretch', name: 'Quad Stretch (60s each side)'},
              {id: 'hamstring-stretch', name: 'Seated Hamstring Stretch (60s)'},
              {id: 'pigeon-pose', name: 'Pigeon Pose (60s each side)'}
            ]
          }
      ]
    },
    { // Day 13
      id: generateUniqueId(),
      name: 'W3D3: Core Crusher',
      blocks: [
          // --- WARM-UP ---
          { 
            id: generateUniqueId(), type: 'Warm-up', 
            exercises: [
              {id: 'cat-cow-stretch', name: 'Cat-Cow Stretch (10 reps)'},
              {id: 'bird-dog', name: 'Bird-dog (10 each side)'}, 
              {id: 'dead-bug', name: 'Dead-bug (10 each side)'}
            ]
          },
          // --- MAIN WORKOUT ---
          { 
            id: generateUniqueId(), type: 'Bodyweight',
            exercises: [
              {
                id: 'sit-up', name: 'Sit-ups', 
                sets: [
                  {id: generateUniqueId(), value: '30', trackingType: 'reps'},
                  {id: generateUniqueId(), value: '30', trackingType: 'reps'},
                  {id: generateUniqueId(), value: '30', trackingType: 'reps'},
                ]
              },
              {
                id: 'plank', name: 'Side Plank (L)', 
                sets: [
                  {id: generateUniqueId(), value: '45', trackingType: 'duration'},
                  {id: generateUniqueId(), value: '45', trackingType: 'duration'},
                ]
              },
              {
                id: 'plank', name: 'Side Plank (R)', 
                sets: [
                  {id: generateUniqueId(), value: '45', trackingType: 'duration'},
                  {id: generateUniqueId(), value: '45', trackingType: 'duration'},
                ]
              },
            ]
          },
          // --- COOL-DOWN ---
          {
            id: generateUniqueId(), type: 'Cool-down',
            exercises: [
              {id: 'cobra-stretch', name: 'Cobra Stretch (60s)'},
              {id: 'childs-pose', name: "Child's Pose (90s)"}
            ]
          }
      ]
    },
    { // Day 14
      id: generateUniqueId(),
      name: 'W3D4: Death By Burpee',
      blocks: [
          // --- WARM-UP ---
          {
            id: generateUniqueId(), type: 'Warm-up',
            exercises: [
              {id: 'jumping-jack', name: 'Jumping Jacks (60s)'},
              {id: 'air-squats', name: 'Air Squats (15 reps)'},
              {id: 'inchworms', name: 'Inchworms (10 reps)'},
            ]
          },
          // --- MAIN WORKOUT ---
          { 
            id: generateUniqueId(), type: 'Conditioning: EMOM',
              minutes: [
                { id: generateUniqueId(), task: 'Min 1: 1 Burpee', exercises: [{ instanceId: generateUniqueId(), id: 'burpees', name: 'Burpees', reps: '1' }] },
                { id: generateUniqueId(), task: 'Min 2: 2 Burpees', exercises: [{ instanceId: generateUniqueId(), id: 'burpees', name: 'Burpees', reps: '2' }] },
                { id: generateUniqueId(), task: 'Min 3: 3 Burpees', exercises: [{ instanceId: generateUniqueId(), id: 'burpees', name: 'Burpees', reps: '3' }] },
                { id: generateUniqueId(), task: 'Min 4: 4 Burpees', exercises: [{ instanceId: generateUniqueId(), id: 'burpees', name: 'Burpees', reps: '4' }] },
                { id: generateUniqueId(), task: 'Min 5: 5 Burpees', exercises: [{ instanceId: generateUniqueId(), id: 'burpees', name: 'Burpees', reps: '5' }] },
                { id: generateUniqueId(), task: 'Min 6: 6 Burpees', exercises: [{ instanceId: generateUniqueId(), id: 'burpees', name: 'Burpees', reps: '6' }] },
                { id: generateUniqueId(), task: 'Min 7: 7 Burpees', exercises: [{ instanceId: generateUniqueId(), id: 'burpees', name: 'Burpees', reps: '7' }] },
                { id: generateUniqueId(), task: 'Min 8: 8 Burpees', exercises: [{ instanceId: generateUniqueId(), id: 'burpees', name: 'Burpees', reps: '8' }] },
                { id: generateUniqueId(), task: 'Min 9: 9 Burpees', exercises: [{ instanceId: generateUniqueId(), id: 'burpees', name: 'Burpees', reps: '9' }] },
                { id: generateUniqueId(), task: 'Min 10: 10 Burpees', exercises: [{ instanceId: generateUniqueId(), id: 'burpees', name: 'Burpees', reps: '10' }] },
              ],
            note: 'Continue adding 1 burpee per minute until you cannot complete the reps within the minute.'
          },
          // --- COOL-DOWN ---
          {
            id: generateUniqueId(), type: 'Cool-down',
            exercises: [
              {id: 'quad-stretch', name: 'Quad Stretch (45s each side)'},
              {id: 'doorway-chest-stretch', name: 'Doorway Chest Stretch (60s)'},
              {id: 'childs-pose', name: "Child's Pose (60s)"}
            ]
          }
      ]
    },
    { // Day 15
      id: generateUniqueId(),
      name: 'W3D5: Full Body Chipper',
      blocks: [
          // --- WARM-UP ---
          {
            id: generateUniqueId(), type: 'Warm-up',
            exercises: [
              {id: 'jumping-jack', name: 'Jumping Jacks (60s)'},
              {id: 'arm-circles', name: 'Arm Circles (30s each way)'},
              {id: 'leg-swings', name: 'Leg Swings (30s each leg)'},
              {id: 'air-squats', name: 'Air Squats (10 reps)'},
              {id: 'push-ups', name: 'Push-ups on Knees (5 reps)'},
            ]
          },
          // --- MAIN WORKOUT ---
          { 
            id: generateUniqueId(), type: 'Conditioning: Chipper',
            exercises: [
              {id: 'push-ups', name: 'Push-ups', reps: '50'},
              {id: 'sit-up', name: 'Sit-ups', reps: '50'},
              {id: 'air-squats', name: 'Squats', reps: '50'},
              {id: 'jump-rope', name: 'Jumping Jacks', reps: '100'},
              {id: 'bodyweight-lunge', name: 'Lunges', reps: '50'},
              {id: 'burpees', name: 'Burpees', reps: '50'},
            ]
          },
          // --- COOL-DOWN ---
          {
            id: generateUniqueId(), type: 'Cool-down',
            exercises: [
              {id: 'pigeon-pose', name: 'Pigeon Pose (60s each side)'},
              {id: 'cobra-stretch', name: 'Cobra Stretch (60s)'},
              {id: 'tricep-stretch', name: 'Tricep Stretch (45s each side)'}
            ]
          }
      ]
    },
    // --- WEEK 4 ---
    { // Day 16
      id: generateUniqueId(),
      name: 'W4D1: Benchmark "Cindy"',
      blocks: [
          // --- WARM-UP ---
          { 
            id: generateUniqueId(), type: 'Warm-up', 
            exercises: [ 
              { id: 'inverted-rows', name: '3 Inverted Rows (or Scapular Pulls)'},
              { id: 'push-ups', name: '5 Push-ups'}, 
              { id: 'air-squats', name: '10 Air Squats'} 
            ]
          },
          // --- MAIN WORKOUT ---
          { 
            id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 20,
            exercises: [
              {id: 'pullups', name: 'Pull-ups (or Bodyweight Rows)', reps: '5'},
              {id: 'push-ups', name: 'Push-ups', reps: '10'},
              {id: 'air-squats', name: 'Squats', reps: '15'},
            ]
          },
          // --- COOL-DOWN ---
          {
            id: generateUniqueId(), type: 'Cool-down',
            exercises: [
              {id: 'lat-stretch', name: 'Lat Stretch (60s each side)'},
              {id: 'doorway-chest-stretch', name: 'Doorway Chest Stretch (60s)'},
              {id: 'pigeon-pose', name: 'Pigeon Pose (60s each side)'}
            ]
          }
      ]
    },
    { // Day 17
      id: generateUniqueId(),
      name: 'W4D2: Leg Inferno',
      blocks: [
          // --- WARM-UP ---
          {
            id: generateUniqueId(), type: 'Warm-up',
            exercises: [
              {id: 'air-squats', name: 'Air Squats (20 reps)'},
              {id: 'leg-swings', name: 'Leg Swings (30s each leg)'},
              {id: 'glute-bridges', name: 'Glute Bridges (15 reps)'}
            ]
          },
          // --- MAIN WORKOUT ---
          { 
            id: generateUniqueId(), type: 'Bodyweight',
            exercises: [
              {
                id: 'pistol-squats-box', name: 'Pistol Squats (to a box, alternating)', 
                sets: [
                  {id: generateUniqueId(), value: '8', trackingType: 'reps'}, {id: generateUniqueId(), value: '8', trackingType: 'reps'},
                  {id: generateUniqueId(), value: '8', trackingType: 'reps'}, {id: generateUniqueId(), value: '8', trackingType: 'reps'},
                  {id: generateUniqueId(), value: '8', trackingType: 'reps'},
                ]
              },
              {
                id: 'glute-bridges', name: 'Glute Bridges', 
                sets: [
                  {id: generateUniqueId(), value: '25', trackingType: 'reps'},
                  {id: generateUniqueId(), value: '25', trackingType: 'reps'},
                ]
              }
            ]
          },
          { 
            id: generateUniqueId(), type: 'Cardio', 
            exercises: [ {id: 'wall-sit', name: 'Wall Sit', duration: '5'} ],
            note: 'Partition the 5 minutes as needed (e.g., 5 sets of 1 minute).'
          },
          // --- COOL-DOWN ---
          {
            id: generateUniqueId(), type: 'Cool-down',
            exercises: [
              {id: 'quad-stretch', name: 'Quad Stretch (60s each side)'},
              {id: 'pigeon-pose', name: 'Pigeon Pose (60s each side)'}
            ]
          }
      ]
    },
    { // Day 18
      id: generateUniqueId(),
      name: 'W4D3: Interval Hell',
      blocks: [
          // --- WARM-UP ---
          {
            id: generateUniqueId(), type: 'Warm-up',
            exercises: [
              {id: 'jumping-jack', name: 'Jumping Jacks (60s)'},
              {id: 'high-knees', name: 'High Knees (60s)'},
              {id: 'butt-kicks', name: 'Butt Kicks (60s)'}
            ]
          },
          // --- MAIN WORKOUT ---
          { 
            id: generateUniqueId(), type: 'Conditioning: Intervals', work: 40, rest: 20, rounds: 5,
            exercises: [{id: 'high-knees', name: 'Run/Sprint in place'}]
          },
          { 
            id: generateUniqueId(), type: 'Conditioning: Intervals', work: 30, rest: 15, rounds: 5,
            exercises: [{id: 'jumping-jack', name: 'Jumping Jacks'}]
          },
          // --- COOL-DOWN ---
          {
            id: generateUniqueId(), type: 'Cool-down',
            exercises: [
              {id: 'hamstring-stretch', name: 'Seated Hamstring Stretch (60s)'},
              {id: 'quad-stretch', name: 'Quad Stretch (60s each side)'}
            ]
          }
      ]
    },
    { // Day 19
      id: generateUniqueId(),
      name: 'W4D4: The Final Chipper',
      blocks: [
          // --- WARM-UP ---
          {
            id: generateUniqueId(), type: 'Warm-up',
            exercises: [
              {id: 'inchworms', name: 'Inchworms (10 reps)'},
              {id: 'shoulder-taps', name: 'Shoulder Taps (20 reps)'},
              {id: 'air-squats', name: 'Air Squats (20 reps)'}
            ]
          },
          // --- MAIN WORKOUT ---
          { 
            id: generateUniqueId(), type: 'Conditioning: Chipper',
            exercises: [
              {id: 'burpees', name: 'Burpees', reps: '50'},
              {id: 'bodyweight-walking-lunge', name: 'Walking Lunges', reps: '40'},
              {id: 'push-ups', name: 'Push-ups', reps: '30'},
              {id: 'tuck-jumps', name: 'Tuck Jumps', reps: '20'},
              {id: 'handstand-hold', name: 'Handstand Hold (against wall)', reps: '60s'},
            ]
          },
          // --- COOL-DOWN ---
          {
            id: generateUniqueId(), type: 'Cool-down',
            exercises: [
              {id: 'childs-pose', name: "Child's Pose (60s)"},
              {id: 'pigeon-pose', name: 'Pigeon Pose (60s each side)'},
              {id: 'cross-body-shoulder-stretch', name: 'Cross-Body Shoulder Stretch (45s each side)'}
            ]
          }
      ]
    },
    { // Day 20
      id: generateUniqueId(),
      name: 'W4D5: "Filthy Fifty" Prep',
      blocks: [
          // --- WARM-UP ---
          {
            id: generateUniqueId(), type: 'Warm-up',
            exercises: [
              {id: 'jumping-jack', name: 'Jumping Jacks (90s)'},
              {id: 'torso-twists', name: 'Torso Twists (60s)'},
              {id: 'leg-swings', name: 'Leg Swings (30s each leg)'}
            ]
          },
          // --- MAIN WORKOUT ---
          { 
            id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 1,
            exercises: [
              {id: 'box-jumps', name: 'Box Jumps (on stair/curb)', reps: '25'},
              {id: 'jumping-jack', name: 'Jumping Jacks', reps: '25'},
              {id: 'glute-bridges', name: 'Glute Bridges', reps: '25'},
              {id: 'bodyweight-walking-lunge', name: 'Walking Lunges', reps: '25'},
              {id: 'knees-to-elbows', name: 'Knees to Elbows', reps: '25'},
              {id: 'push-ups', name: 'Push-ups', reps: '25'},
              {id: 'back-extensions-supermans', name: 'Back Extensions (supermans)', reps: '25'},
              {id: 'air-squats', name: 'Air Squats', reps: '25'},
              {id: 'burpees', name: 'Burpees', reps: '25'},
              {id: 'jump-rope', name: 'Jumping Jacks', reps: '50'},
            ]
          },
          // --- COOL-DOWN ---
          {
            id: generateUniqueId(), type: 'Cool-down',
            exercises: [
              {id: 'pigeon-pose', name: 'Pigeon Pose (60s each side)'},
              {id: 'quad-stretch', name: 'Quad Stretch (60s each side)'},
              {id: 'cobra-stretch', name: 'Cobra Stretch (60s)'},
              {id: 'childs-pose', name: "Child's Pose (60s)"}
            ]
          }
      ]
    },
      ]
};