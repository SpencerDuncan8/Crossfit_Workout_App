// src/data/templates/bodyweightBlastTemplate.js

import { generateUniqueId } from '../../utils/idUtils.js';

export const bodyweightBlastTemplate = {
  id: 'template_bodyweight_blast',
  name: 'Bodyweight Blast',
  description: 'A 4-week, 5-day-a-week program using only your bodyweight. Perfect for building foundational strength and endurance anywhere, anytime.',
  isTemplate: true,
  daysPerWeek: 5,
  workouts: [
    // --- WEEK 1 ---
    { // Day 1
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
            { id: 'dumbbell-calf-raises', name: 'Calf Raises', reps: '60' },
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
        {
          id: generateUniqueId(), type: 'Conditioning: EMOM',
          minutes: [
            { id: 'air-squats', task: '15 Air Squats' },
            { id: 'push-ups', task: '12 Push-ups' },
            { id: 'sit-up', task: '15 Sit-ups' },
            { id: 'plank', task: '45s Plank' },
            { id: 'jumping-jack', task: '60s Jumping Jacks' },
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
          { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 20,
              exercises: [
                  { id: 'hand-release-push-ups', name: 'Hand-Release Push-ups', reps: '8' },
                  { id: 'air-squats', name: 'Air Squats', reps: '16' },
                  { id: 'v-up', name: 'V-Ups', reps: '8' },
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
          { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 1,
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
              ]
          }
      ]
    },
    { // Day 10
      id: generateUniqueId(),
      name: 'W2D5: EMOM Endurance',
      blocks: [
          { id: generateUniqueId(), type: 'Conditioning: EMOM',
              minutes: [
                  { id: 'push-ups', task: 'Minute 1: 15 Push-ups' },
                  { id: 'bodyweight-lunge', task: 'Minute 2: 20 Lunges' },
                  { id: 'sit-up', task: 'Minute 3: 25 Sit-ups' },
                  { id: 'rest', task: 'Minute 4: Rest' },
                  { id: 'push-ups', task: 'Minute 5: 15 Push-ups' },
                  { id: 'bodyweight-lunge', task: 'Minute 6: 20 Lunges' },
                  { id: 'sit-up', task: 'Minute 7: 25 Sit-ups' },
                  { id: 'rest', task: 'Minute 8: Rest' },
                  { id: 'push-ups', task: 'Minute 9: 15 Push-ups' },
                  { id: 'bodyweight-lunge', task: 'Minute 10: 20 Lunges' },
                  { id: 'sit-up', task: 'Minute 11: 25 Sit-ups' },
                  { id: 'rest', task: 'Minute 12: Rest' },
              ]
          }
      ]
    },
    // --- WEEK 3 ---
    { // Day 11
      id: generateUniqueId(),
      name: 'W3D1: Power & Plyo',
      blocks: [
          { id: generateUniqueId(), type: 'Warm-up', exercises: [{id: 'pogo-hops', name: 'Pogo Hops (60s)'}, {id: 'air-squats', name: 'Bodyweight Squats (20 reps)'}]},
          { id: generateUniqueId(), type: 'Bodyweight',
              exercises: [
                  { id: 'jump-squats', name: 'Jumping Squats', sets: [
                      {id: generateUniqueId(), value: '15', trackingType: 'reps'},
                      {id: generateUniqueId(), value: '15', trackingType: 'reps'},
                      {id: generateUniqueId(), value: '15', trackingType: 'reps'},
                      {id: generateUniqueId(), value: '15', trackingType: 'reps'},
                  ]},
                  { id: 'plyometric-push-ups', name: 'Plyo Push-ups', sets: [
                      {id: generateUniqueId(), value: '10', trackingType: 'reps'},
                      {id: generateUniqueId(), value: '10', trackingType: 'reps'},
                      {id: generateUniqueId(), value: '10', trackingType: 'reps'},
                  ]},
              ]
          },
          { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 12,
              exercises: [{id: 'jumping-lunges', name: 'Jumping Lunges', reps: '10'}, {id: 'box-jumps', name: 'Burpee Box Jumps (use stair)', reps: '5'}]}
      ]
    },
    { // Day 12
      id: generateUniqueId(),
      name: 'W3D2: The Grinder',
      blocks: [
          { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 3,
              exercises: [
                  {id: 'high-knees', name: 'Run 400m (or 2 min high knees)', reps: '1'},
                  {id: 'air-squats', name: 'Air Squats', reps: '50'}
              ]
          }
      ]
    },
    { // Day 13
      id: generateUniqueId(),
      name: 'W3D3: Core Crusher',
      blocks: [
          { id: generateUniqueId(), type: 'Warm-up', exercises: [{id: 'bird-dog', name: 'Bird-dog (10 each side)'}, {id: 'dead-bug', name: 'Dead-bug (10 each side)'}]},
          { id: generateUniqueId(), type: 'Bodyweight',
              exercises: [
                  {id: 'sit-up', name: 'Sit-ups', sets: [
                      {id: generateUniqueId(), value: '30', trackingType: 'reps'},
                      {id: generateUniqueId(), value: '30', trackingType: 'reps'},
                      {id: generateUniqueId(), value: '30', trackingType: 'reps'},
                  ]},
                  {id: 'plank', name: 'Side Plank (L)', sets: [
                      {id: generateUniqueId(), value: '45', trackingType: 'duration'},
                      {id: generateUniqueId(), value: '45', trackingType: 'duration'},
                  ]},
                  {id: 'plank', name: 'Side Plank (R)', sets: [
                      {id: generateUniqueId(), value: '45', trackingType: 'duration'},
                      {id: generateUniqueId(), value: '45', trackingType: 'duration'},
                  ]},
              ]
          }
      ]
    },
    { // Day 14
      id: generateUniqueId(),
      name: 'W3D4: Death By Burpee',
      blocks: [
          { id: generateUniqueId(), type: 'Conditioning: EMOM',
              minutes: [
                  {id: 'burpees', task: 'Min 1: 1 Burpee'}, {id: 'burpees', task: 'Min 2: 2 Burpees'},
                  {id: 'burpees', task: 'Min 3: 3 Burpees'}, {id: 'burpees', task: 'Min 4: 4 Burpees'},
                  {id: 'burpees', task: 'Min 5: 5 Burpees'}, {id: 'burpees', task: 'Min 6: 6 Burpees'},
                  {id: 'burpees', task: 'Min 7: 7 Burpees'}, {id: 'burpees', task: 'Min 8: 8 Burpees'},
                  {id: 'burpees', task: 'Min 9: 9 Burpees'}, {id: 'burpees', task: 'Min 10: 10 Burpees'},
                  {id: 'burpees', task: 'Continue adding 1 burpee per minute until you cannot complete the reps within the minute.'},
              ]
          }
      ]
    },
    { // Day 15
      id: generateUniqueId(),
      name: 'W3D5: Full Body Chipper',
      blocks: [
          { id: generateUniqueId(), type: 'Conditioning: Chipper',
              exercises: [
                  {id: 'push-ups', name: 'Push-ups', reps: '50'},
                  {id: 'sit-up', name: 'Sit-ups', reps: '50'},
                  {id: 'air-squats', name: 'Squats', reps: '50'},
                  {id: 'jump-rope', name: 'Double Unders (or 100 single jumps)', reps: '50'},
                  {id: 'bodyweight-lunge', name: 'Lunges', reps: '50'},
                  {id: 'burpees', name: 'Burpees', reps: '50'},
              ]
          }
      ]
    },
    // --- WEEK 4 ---
    { // Day 16
      id: generateUniqueId(),
      name: 'W4D1: Benchmark "Cindy"',
      blocks: [
          { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: 'push-ups', name: '3 Rounds: 5 Pushups, 10 Squats, 15 Situps'} ]},
          { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 20,
              exercises: [
                  {id: 'pullups', name: 'Pull-ups (or Bodyweight Rows)', reps: '5'},
                  {id: 'push-ups', name: 'Push-ups', reps: '10'},
                  {id: 'air-squats', name: 'Squats', reps: '15'},
              ]
          }
      ]
    },
    { // Day 17
      id: generateUniqueId(),
      name: 'W4D2: Leg Inferno',
      blocks: [
          { id: generateUniqueId(), type: 'Bodyweight',
              exercises: [
                  {id: 'pistol-squats-box', name: 'Pistol Squats (to a box, alternating)', sets: [
                      {id: generateUniqueId(), value: '8', trackingType: 'reps'},
                      {id: generateUniqueId(), value: '8', trackingType: 'reps'},
                      {id: generateUniqueId(), value: '8', trackingType: 'reps'},
                      {id: generateUniqueId(), value: '8', trackingType: 'reps'},
                      {id: generateUniqueId(), value: '8', trackingType: 'reps'},
                  ]},
                  {id: 'glute-bridges', name: 'Glute Bridges', sets: [
                      {id: generateUniqueId(), value: '25', trackingType: 'reps'},
                      {id: generateUniqueId(), value: '25', trackingType: 'reps'},
                  ]}
              ]
          },
          { id: generateUniqueId(), type: 'Cardio', exercises: [ {id: 'wall-sit', name: 'Wall Sit', duration: '5'} ] }
      ]
    },
    { // Day 18
      id: generateUniqueId(),
      name: 'W4D3: Interval Hell',
      blocks: [
          { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 40, rest: 20, rounds: 5,
              exercises: [{id: 'high-knees', name: 'Run/Sprint in place'}]
          },
          { id: generateUniqueId(), type: 'Conditioning: Intervals', work: 30, rest: 15, rounds: 5,
              exercises: [{id: 'jumping-jack', name: 'Jumping Jacks'}]
          }
      ]
    },
    { // Day 19
      id: generateUniqueId(),
      name: 'W4D4: The Final Chipper',
      blocks: [
          { id: generateUniqueId(), type: 'Conditioning: Chipper',
              exercises: [
                  {id: 'burpees', name: 'Burpees', reps: '50'},
                  {id: 'bodyweight-lunge', name: 'Walking Lunges', reps: '40'},
                  {id: 'push-ups', name: 'Push-ups', reps: '30'},
                  {id: 'tuck-jumps', name: 'Tuck Jumps', reps: '20'},
                  {id: 'handstand-hold', name: 'Handstand Hold (against wall)', reps: '60s'},
              ]
          }
      ]
    },
    { // Day 20
      id: generateUniqueId(),
      name: 'W4D5: "Filthy Fifty" Prep',
      blocks: [
          { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 1,
              exercises: [
                  {id: 'box-jumps', name: 'Box Jumps (on stair/curb)', reps: '25'},
                  {id: 'jumping-jack', name: 'Jumping Jacks', reps: '25'},
                  {id: 'simulated-kettlebell-swing', name: 'Kettlebell Swings (use backpack/heavy object)', reps: '25'},
                  {id: 'bodyweight-lunge', name: 'Walking Lunges', reps: '25'},
                  {id: 'knees-to-elbows', name: 'Knees to Elbows', reps: '25'},
                  {id: 'dumbbell-push-press', name: 'Push Press (use backpack)', reps: '25'},
                  {id: 'back-extensions-supermans', name: 'Back Extensions (supermans)', reps: '25'},
                  {id: 'simulated-wall-ball', name: 'Wall Ball Shots (squat and toss pillow)', reps: '25'},
                  {id: 'burpees', name: 'Burpees', reps: '25'},
                  {id: 'jump-rope', name: 'Double Unders (or 50 singles)', reps: '25'},
              ]
          }
      ]
    },
  ]
};