// src/data/programTemplates.js

import { generateUniqueId } from '../utils/idUtils.js';

export const programTemplates = [
  {
    id: 'template_bodyweight_blast',
    name: 'Bodyweight Blast',
    description: 'A 4-week, 5-day-a-week program using only your bodyweight. Perfect for building foundational strength and endurance anywhere, anytime.',
    isTemplate: true,
    workouts: [
      // --- WEEK 1 ---
      { // Day 1
        id: generateUniqueId(),
        name: 'W1D1: Foundation Builder',
        blocks: [
          {
            id: generateUniqueId(), type: 'Warm-up',
            exercises: [
              { id: generateUniqueId(), name: 'Jumping Jacks (60s)' },
              { id: generateUniqueId(), name: 'Arm Circles (30s each way)' },
              { id: generateUniqueId(), name: 'Leg Swings (30s each leg)' },
              { id: generateUniqueId(), name: 'Cat-Cow Stretch (10 reps)' },
            ],
          },
          // --- THE FIX: Converted from 'Strength' to 'Bodyweight' blocks ---
          {
            id: generateUniqueId(), type: 'Bodyweight',
            exercises: [
              { id: 'pushup', name: '3 Sets of Push-ups', trackingType: 'reps', value: 'AMRAP' },
              { id: 'squat', name: '3 Sets of Squats', trackingType: 'reps', value: '20' },
              { id: 'plank', name: '2 Sets of Planks', trackingType: 'duration', value: '60' },
            ],
          },
          {
            id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 10,
            exercises: [
              { id: 'burpee', name: 'Burpees', reps: '5' },
              { id: 'lunge', name: 'Lunges (alternating)', reps: '10' },
              { id: 'situp', name: 'Sit-ups', reps: '15' },
            ],
          },
          {
            id: generateUniqueId(), type: 'Cool-down',
            exercises: [ { id: generateUniqueId(), name: 'Quad Stretch (30s each)' }, { id: generateUniqueId(), name: 'Hamstring Stretch (30s each)' } ]
          },
        ],
      },
      { // Day 2
        id: generateUniqueId(),
        name: 'W1D2: Core & Cardio',
        blocks: [
          { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: generateUniqueId(), name: 'High Knees (60s)' }, { id: generateUniqueId(), name: 'Butt Kicks (60s)' } ] },
          { 
            id: generateUniqueId(), type: 'Conditioning: Tabata', work: 20, rest: 10, rounds: 8,
            exercises: [ { id: 'mountain_climber', name: 'Mountain Climbers' }, { id: 'jumping_squat', name: 'Jumping Squats' } ]
          },
          { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: generateUniqueId(), name: 'Childs Pose (60s)' } ] }
        ]
      },
      { // Day 3
        id: generateUniqueId(),
        name: 'W1D3: Upper Body Burn',
        blocks: [
          { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: generateUniqueId(), name: 'Inchworms (10 reps)' }, { id: 'plank', name: 'Shoulder Taps (20 reps)' } ] },
          { 
            id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 5,
            exercises: [ { id: 'pushup', name: 'Push-ups', reps: '10' }, { id: 'dip', name: 'Dips (using chair/bench)', reps: '15' } ]
          },
          // --- THE FIX: Converted from 'Strength' to 'Bodyweight' block ---
          {
            id: generateUniqueId(), type: 'Bodyweight',
            exercises: [ { id: 'plank', name: '2 Sets of Plank Shoulder Taps', trackingType: 'reps', value: '40' } ]
          },
          { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: generateUniqueId(), name: 'Tricep Stretch (30s each)' } ] }
        ]
      },
      { // Day 4
        id: generateUniqueId(),
        name: 'W1D4: Leg Day Chipper',
        blocks: [
          { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: generateUniqueId(), name: 'Glute Bridges (20 reps)' }, { id: generateUniqueId(), name: 'Bodyweight Good Mornings (15 reps)' } ] },
          {
            id: generateUniqueId(), type: 'Conditioning: Chipper',
            exercises: [
              { id: 'squat', name: 'Squats', reps: '100' },
              { id: 'lunge', name: 'Walking Lunges', reps: '80' },
              { id: generateUniqueId(), name: 'Calf Raises', reps: '60' },
              { id: 'jumping_jack', name: 'Jumping Jacks', reps: '40' },
              { id: 'burpee', name: 'Burpees', reps: '20' },
            ]
          },
          { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: generateUniqueId(), name: 'Pigeon Pose (60s each)' } ] }
        ]
      },
      { // Day 5
        id: generateUniqueId(),
        name: 'W1D5: Full Body Finisher',
        blocks: [
          {
            id: generateUniqueId(), type: 'Conditioning: EMOM',
            minutes: [
              { id: generateUniqueId(), task: '15 Air Squats' },
              { id: generateUniqueId(), task: '12 Push-ups' },
              { id: generateUniqueId(), task: '15 Sit-ups' },
              { id: generateUniqueId(), task: '45s Plank' },
              { id: generateUniqueId(), task: '60s Jumping Jacks' },
            ]
          }
        ]
      },
      // --- WEEK 2 ---
      { // Day 6
        id: generateUniqueId(),
        name: 'W2D1: Strength & Stamina',
        blocks: [
            { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: generateUniqueId(), name: 'Jumping Jacks (60s)' }, { id: generateUniqueId(), name: 'Torso Twists (30s)' } ] },
            // --- THE FIX: Converted from 'Strength' to 'Bodyweight' block ---
            { id: generateUniqueId(), type: 'Bodyweight',
                exercises: [
                    { id: 'lunge', name: '3 Sets of Bulgarian Split Squats (L)', trackingType: 'reps', value: '12' },
                    { id: 'lunge', name: '3 Sets of Bulgarian Split Squats (R)', trackingType: 'reps', value: '12' },
                    { id: 'pushup', name: '3 Sets of Decline Push-ups', trackingType: 'reps', value: 'AMRAP' },
                ]
            },
            { id: generateUniqueId(), type: 'Cardio', exercises: [ { id: generateUniqueId(), name: 'Jog in Place or Jump Rope', duration: 10 } ] }
        ]
      },
      { // Day 7
        id: generateUniqueId(),
        name: 'W2D2: AMRAP Madness',
        blocks: [
            { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 20,
                exercises: [
                    { id: 'pushup', name: 'Hand-Release Push-ups', reps: '8' },
                    { id: 'squat', name: 'Air Squats', reps: '16' },
                    { id: generateUniqueId(), name: 'V-Ups', reps: '8' },
                ]
            }
        ]
      },
      { // Day 8
        id: generateUniqueId(),
        name: 'W2D3: Tabata Time',
        blocks: [
            { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: generateUniqueId(), name: 'High Knees (60s)' }, { id: generateUniqueId(), name: 'Butt Kicks (60s)' } ] },
            { id: generateUniqueId(), type: 'Conditioning: Tabata', work: 20, rest: 10, rounds: 8,
                exercises: [ { id: 'burpee', name: 'Burpees' } ]
            },
            { id: generateUniqueId(), type: 'Conditioning: Tabata', work: 20, rest: 10, rounds: 8,
                exercises: [ { id: 'plank', name: 'Plank' } ]
            },
            { id: generateUniqueId(), type: 'Cool-down', exercises: [ { id: generateUniqueId(), name: 'Cobra Stretch (60s)' } ] }
        ]
      },
      { // Day 9
        id: generateUniqueId(),
        name: 'W2D4: For Time Ladder',
        blocks: [
            { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 1, // Technically a chipper but RFT format works
                exercises: [
                    { id: 'burpee', name: 'Burpees', reps: '10' }, { id: 'squat', name: 'Squats', reps: '10' },
                    { id: 'burpee', name: 'Burpees', reps: '9' }, { id: 'squat', name: 'Squats', reps: '9' },
                    { id: 'burpee', name: 'Burpees', reps: '8' }, { id: 'squat', name: 'Squats', reps: '8' },
                    { id: 'burpee', name: 'Burpees', reps: '7' }, { id: 'squat', name: 'Squats', reps: '7' },
                    { id: 'burpee', name: 'Burpees', reps: '6' }, { id: 'squat', name: 'Squats', reps: '6' },
                    { id: 'burpee', name: 'Burpees', reps: '5' }, { id: 'squat', name: 'Squats', reps: '5' },
                    { id: 'burpee', name: 'Burpees', reps: '4' }, { id: 'squat', name: 'Squats', reps: '4' },
                    { id: 'burpee', name: 'Burpees', reps: '3' }, { id: 'squat', name: 'Squats', reps: '3' },
                    { id: 'burpee', name: 'Burpees', reps: '2' }, { id: 'squat', name: 'Squats', reps: '2' },
                    { id: 'burpee', name: 'Burpees', reps: '1' }, { id: 'squat', name: 'Squats', reps: '1' },
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
                    { id: generateUniqueId(), task: 'Minute 1: 15 Push-ups' },
                    { id: generateUniqueId(), task: 'Minute 2: 20 Lunges' },
                    { id: generateUniqueId(), task: 'Minute 3: 25 Sit-ups' },
                    { id: generateUniqueId(), task: 'Minute 4: Rest' },
                    { id: generateUniqueId(), task: 'Minute 5: 15 Push-ups' },
                    { id: generateUniqueId(), task: 'Minute 6: 20 Lunges' },
                    { id: generateUniqueId(), task: 'Minute 7: 25 Sit-ups' },
                    { id: generateUniqueId(), task: 'Minute 8: Rest' },
                    { id: generateUniqueId(), task: 'Minute 9: 15 Push-ups' },
                    { id: generateUniqueId(), task: 'Minute 10: 20 Lunges' },
                    { id: generateUniqueId(), task: 'Minute 11: 25 Sit-ups' },
                    { id: generateUniqueId(), task: 'Minute 12: Rest' },
                ]
            }
        ]
      },
      // --- WEEK 3 ---
      { // Day 11
        id: generateUniqueId(),
        name: 'W3D1: Power & Plyo',
        blocks: [
            { id: generateUniqueId(), type: 'Warm-up', exercises: [{id: generateUniqueId(), name: 'Pogo Hops (60s)'}, {id: 'squat', name: 'Bodyweight Squats (20 reps)'}]},
            // --- THE FIX: Converted from 'Strength' to 'Bodyweight' block ---
            { id: generateUniqueId(), type: 'Bodyweight',
                exercises: [
                    { id: 'jumping_squat', name: '4 Sets of Jumping Squats', trackingType: 'reps', value: '15'},
                    { id: 'pushup', name: '3 Sets of Plyo Push-ups', trackingType: 'reps', value: 'AMRAP'},
                ]
            },
            { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 12,
                exercises: [{id: 'lunge', name: 'Jumping Lunges', reps: '10'}, {id: 'burpee', name: 'Burpee Box Jumps (use stair)', reps: '5'}]}
        ]
      },
      { // Day 12
        id: generateUniqueId(),
        name: 'W3D2: The Grinder',
        blocks: [
            { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 3,
                exercises: [
                    {id: generateUniqueId(), name: 'Run 400m (or 2 min high knees)', reps: '1'},
                    {id: 'squat', name: 'Air Squats', reps: '50'}
                ]
            }
        ]
      },
      { // Day 13
        id: generateUniqueId(),
        name: 'W3D3: Core Crusher',
        blocks: [
            { id: generateUniqueId(), type: 'Warm-up', exercises: [{id: generateUniqueId(), name: 'Bird-dog (10 each side)'}, {id: generateUniqueId(), name: 'Dead-bug (10 each side)'}]},
            // --- THE FIX: Converted from 'Strength' to 'Bodyweight' block ---
            { id: generateUniqueId(), type: 'Bodyweight',
                exercises: [
                    {id: 'situp', name: '3 Sets of Sit-ups', trackingType: 'reps', value: '30'},
                    {id: 'plank', name: '2 Sets of Side Plank (L)', trackingType: 'duration', value: '45'},
                    {id: 'plank', name: '2 Sets of Side Plank (R)', trackingType: 'duration', value: '45'},
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
                    {id: generateUniqueId(), task: 'Min 1: 1 Burpee'}, {id: generateUniqueId(), task: 'Min 2: 2 Burpees'},
                    {id: generateUniqueId(), task: 'Min 3: 3 Burpees'}, {id: generateUniqueId(), task: 'Min 4: 4 Burpees'},
                    {id: generateUniqueId(), task: 'Min 5: 5 Burpees'}, {id: generateUniqueId(), task: 'Min 6: 6 Burpees'},
                    {id: generateUniqueId(), task: 'Min 7: 7 Burpees'}, {id: generateUniqueId(), task: 'Min 8: 8 Burpees'},
                    {id: generateUniqueId(), task: 'Min 9: 9 Burpees'}, {id: generateUniqueId(), task: 'Min 10: 10 Burpees'},
                    {id: generateUniqueId(), task: 'Continue adding 1 burpee per minute until you cannot complete the reps within the minute.'},
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
                    {id: 'pushup', name: 'Push-ups', reps: '50'},
                    {id: 'situp', name: 'Sit-ups', reps: '50'},
                    {id: 'squat', name: 'Squats', reps: '50'},
                    {id: generateUniqueId(), name: 'Double Unders (or 100 single jumps)', reps: '50'},
                    {id: 'lunge', name: 'Lunges', reps: '50'},
                    {id: 'burpee', name: 'Burpees', reps: '50'},
                ]
            }
        ]
      },
      // --- WEEK 4 ---
      { // Day 16
        id: generateUniqueId(),
        name: 'W4D1: Benchmark "Cindy"',
        blocks: [
            { id: generateUniqueId(), type: 'Warm-up', exercises: [ { id: generateUniqueId(), name: '3 Rounds: 5 Pushups, 10 Squats, 15 Situps'} ]},
            { id: generateUniqueId(), type: 'Conditioning: AMRAP', duration: 20,
                exercises: [
                    {id: generateUniqueId(), name: 'Pull-ups (or Bodyweight Rows)', reps: '5'},
                    {id: 'pushup', name: 'Push-ups', reps: '10'},
                    {id: 'squat', name: 'Squats', reps: '15'},
                ]
            }
        ]
      },
      { // Day 17
        id: generateUniqueId(),
        name: 'W4D2: Leg Inferno',
        blocks: [
            // --- THE FIX: Converted from 'Strength' to 'Bodyweight' block ---
            { id: generateUniqueId(), type: 'Bodyweight',
                exercises: [
                    {id: 'squat', name: '5 Sets of Pistol Squats (to a box, alternating)', trackingType: 'reps', value: '8'},
                    {id: generateUniqueId(), name: '2 Sets of Glute Bridges', trackingType: 'reps', value: '25'}
                ]
            },
            { id: 'Cardio', type: 'Cardio', exercises: [ {id: generateUniqueId(), name: 'Wall Sit', duration: '5'} ] }
        ]
      },
      { // Day 18
        id: generateUniqueId(),
        name: 'W4D3: Interval Hell',
        blocks: [
            { id: generateUniqueId(), type: 'Conditioning: Tabata', work: 40, rest: 20, rounds: 5,
                exercises: [{id: generateUniqueId(), name: 'Run/Sprint in place'}]
            },
            { id: generateUniqueId(), type: 'Conditioning: Tabata', work: 30, rest: 15, rounds: 5,
                exercises: [{id: 'jumping_jack', name: 'Jumping Jacks'}]
            }
        ]
      },
      { // Day 19
        id: generateUniqueId(),
        name: 'W4D4: The Final Chipper',
        blocks: [
            { id: generateUniqueId(), type: 'Conditioning: Chipper',
                exercises: [
                    {id: 'burpee', name: 'Burpees', reps: '50'},
                    {id: 'lunge', name: 'Walking Lunges', reps: '40'},
                    {id: 'pushup', name: 'Push-ups', reps: '30'},
                    {id: generateUniqueId(), name: 'Tuck Jumps', reps: '20'},
                    {id: generateUniqueId(), name: 'Handstand Hold (against wall)', reps: '60s'},
                ]
            }
        ]
      },
      { // Day 20
        id: generateUniqueId(),
        name: 'W4D5: "Filthy Fifty" Prep',
        blocks: [
            { id: generateUniqueId(), type: 'Conditioning: RFT', rounds: 1, // Another chipper style
                exercises: [
                    {id: generateUniqueId(), name: 'Box Jumps (on stair/curb)', reps: '25'},
                    {id: 'jumping_jack', name: 'Jumping Jacks', reps: '25'},
                    {id: generateUniqueId(), name: 'Kettlebell Swings (use backpack/heavy object)', reps: '25'},
                    {id: 'lunge', name: 'Walking Lunges', reps: '25'},
                    {id: generateUniqueId(), name: 'Knees to Elbows', reps: '25'},
                    {id: 'pushup', name: 'Push Press (use backpack)', reps: '25'},
                    {id: generateUniqueId(), name: 'Back Extensions (supermans)', reps: '25'},
                    {id: 'plank', name: 'Wall Ball Shots (squat and toss pillow)', reps: '25'},
                    {id: 'burpee', name: 'Burpees', reps: '25'},
                    {id: generateUniqueId(), name: 'Double Unders (or 50 singles)', reps: '25'},
                ]
            }
        ]
      },
    ]
  },
  {
    id: 'template_kettlebell_krusher',
    name: 'Kettlebell Krusher',
    description: 'A strength-focused program using one or two kettlebells. Build power, stability, and raw strength.',
    isTemplate: true,
    workouts: [] // To be built out later
  },
  {
    id: 'template_strength_focus',
    name: 'Strength Focus',
    description: 'A classic barbell program for developing maximum strength in the main lifts. Requires a barbell and rack.',
    isTemplate: true,
    workouts: [] // To be built out later
  },
];