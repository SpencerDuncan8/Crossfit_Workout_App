// src/data/templates/benchmarkWods.js

import { generateUniqueId } from '../../utils/idUtils.js';

// --- Define each benchmark workout as a constant for clarity and reusability. ---

const angie = {
  id: 'benchmark_angie',
  name: 'Angie',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: Chipper',
      exercises: [
        { id: 'pullups', name: 'Pull-ups', reps: '100' },
        { id: 'push-ups', name: 'Push-ups', reps: '100' },
        { id: 'sit-up', name: 'Sit-ups', reps: '100' },
        { id: 'air-squats', name: 'Squats', reps: '100' },
      ],
      note: 'Complete all reps of one exercise before moving to the next.'
    },
  ],
};

const annie = {
  id: 'benchmark_annie',
  name: 'Annie',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: RFT',
      rounds: 1, 
      exercises: [
        { id: 'double-unders', name: 'Double-Unders', reps: '50' },
        { id: 'sit-up', name: 'Sit-ups', reps: '50' },
        { id: 'double-unders', name: 'Double-Unders', reps: '40' },
        { id: 'sit-up', name: 'Sit-ups', reps: '40' },
        { id: 'double-unders', name: 'Double-Unders', reps: '30' },
        { id: 'sit-up', name: 'Sit-ups', reps: '30' },
        { id: 'double-unders', name: 'Double-Unders', reps: '20' },
        { id: 'sit-up', name: 'Sit-ups', reps: '20' },
        { id: 'double-unders', name: 'Double-Unders', reps: '10' },
        { id: 'sit-up', name: 'Sit-ups', reps: '10' },
      ],
    },
  ],
};

const barbara = {
  id: 'benchmark_barbara',
  name: 'Barbara',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: RFT',
      rounds: 5, 
      exercises: [
        { id: 'pullups', name: 'Pull-ups', reps: '20' },
        { id: 'push-ups', name: 'Push-ups', reps: '30' },
        { id: 'sit-up', name: 'Sit-ups', reps: '40' },
        { id: 'air-squats', name: 'Squats', reps: '50' },
      ],
      note: 'Rest exactly 3 minutes between each round. Total time includes rest.'
    },
  ],
};

const chelsea = {
  id: 'benchmark_chelsea',
  name: 'Chelsea',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: EMOM',
      minutes: Array.from({ length: 30 }, () => ({ id: generateUniqueId(), task: '5 Pull-ups, 10 Push-ups, 15 Squats' })),
      note: 'The workout ends if you cannot complete the full round within a given minute. Your score is the number of full rounds completed.'
    },
  ],
};

const cindy = {
  id: 'benchmark_cindy',
  name: 'Cindy',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: AMRAP',
      duration: 20, 
      exercises: [
        { id: 'pullups', name: 'Pull-ups', reps: '5' },
        { id: 'push-ups', name: 'Push-ups', reps: '10' },
        { id: 'air-squats', name: 'Air Squats', reps: '15' },
      ],
    },
  ],
};

const diane = {
  id: 'benchmark_diane',
  name: 'Diane',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: RFT',
      rounds: 1, 
      exercises: [
        { id: 'deadlift', name: 'Deadlifts (225/155 lbs)', reps: '21' },
        { id: 'handstand-push-ups', name: 'Handstand Push-ups', reps: '21' },
        { id: 'deadlift', name: 'Deadlifts (225/155 lbs)', reps: '15' },
        { id: 'handstand-push-ups', name: 'Handstand Push-ups', reps: '15' },
        { id: 'deadlift', name: 'Deadlifts (225/155 lbs)', reps: '9' },
        { id: 'handstand-push-ups', name: 'Handstand Push-ups', reps: '9' },
      ],
    },
  ],
};

const elizabeth = {
  id: 'benchmark_elizabeth',
  name: 'Elizabeth',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: RFT',
      rounds: 1,
      exercises: [
        { id: 'barbell-clean', name: 'Cleans (135/95 lbs)', reps: '21' },
        { id: 'ring-dips', name: 'Ring Dips', reps: '21' },
        { id: 'barbell-clean', name: 'Cleans (135/95 lbs)', reps: '15' },
        { id: 'ring-dips', name: 'Ring Dips', reps: '15' },
        { id: 'barbell-clean', name: 'Cleans (135/95 lbs)', reps: '9' },
        { id: 'ring-dips', name: 'Ring Dips', reps: '9' },
      ],
    },
  ],
};

const eva = {
  id: 'hero_eva',
  name: 'Eva',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: RFT',
      rounds: 5,
      exercises: [
        { id: 'running', name: 'Run 800 meters', reps: '1' },
        { id: 'kb-swing', name: 'Kettlebell Swings (32/24 kg)', reps: '30' },
        { id: 'pullups', name: 'Pull-ups', reps: '30' },
      ],
    },
  ],
};

const fran = {
  id: 'benchmark_fran',
  name: 'Fran',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: RFT',
      rounds: 1, 
      exercises: [
        { id: 'thrusters', name: 'Thrusters (95/65 lbs)', reps: '21' },
        { id: 'pullups', name: 'Pull-ups', reps: '21' },
        { id: 'thrusters', name: 'Thrusters (95/65 lbs)', reps: '15' },
        { id: 'pullups', name: 'Pull-ups', reps: '15' },
        { id: 'thrusters', name: 'Thrusters (95/65 lbs)', reps: '9' },
        { id: 'pullups', name: 'Pull-ups', reps: '9' },
      ],
    },
  ],
};

const grace = {
  id: 'benchmark_grace',
  name: 'Grace',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: Chipper',
      exercises: [
        { id: 'barbell-clean-and-jerk', name: 'Clean and Jerks (135/95 lbs)', reps: '30' },
      ],
    },
  ],
};

const gwen = {
  id: 'benchmark_gwen',
  name: 'Gwen',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Strength',
      note: 'For Load: 15-12-9 reps of Clean and Jerk. Choose one weight and use it for all 36 reps. Rest as needed, but do not drop the bar from overhead. Touch-and-go is not allowed. Your score is the weight used.',
      exercises: [
        { id: 'barbell-clean-and-jerk', name: 'Clean and Jerk', sets: [{ id: generateUniqueId(), reps: '15'}, { id: generateUniqueId(), reps: '12'}, { id: generateUniqueId(), reps: '9'}] },
      ],
    },
  ],
};

const helen = {
  id: 'benchmark_helen',
  name: 'Helen',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: RFT',
      rounds: 3,
      exercises: [
        { id: 'running', name: 'Run 400 meters', reps: '1' },
        { id: 'kb-swing', name: 'Kettlebell Swings (24/16 kg)', reps: '21' },
        { id: 'pullups', name: 'Pull-ups', reps: '12' },
      ],
    },
  ],
};

const hope = {
  id: 'benchmark_hope',
  name: 'Hope',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: AMRAP',
      duration: 18,
      note: 'This is three rounds of the work/rest cycle. The score is the total number of repetitions completed across all 15 minutes of work.',
      exercises: [
        { id: 'burpees', name: '1 minute of Burpees' },
        { id: 'power-snatch', name: '1 minute of Power Snatches (75/55 lb)' },
        { id: 'box-jumps', name: '1 minute of Box Jumps (24/20 in)' },
        { id: 'thrusters', name: '1 minute of Thrusters (75/55 lb)' },
        { id: 'chest-to-bar-pull-ups', name: '1 minute of Chest-to-Bar Pull-Ups' },
        { id: null, name: '1 minute of Rest' },
        { id: 'burpees', name: '1 minute of Burpees' },
        { id: 'power-snatch', name: '1 minute of Power Snatches (75/55 lb)' },
        { id: 'box-jumps', name: '1 minute of Box Jumps (24/20 in)' },
        { id: 'thrusters', name: '1 minute of Thrusters (75/55 lb)' },
        { id: 'chest-to-bar-pull-ups', name: '1 minute of Chest-to-Bar Pull-Ups' },
        { id: null, name: '1 minute of Rest' },
        { id: 'burpees', name: '1 minute of Burpees' },
        { id: 'power-snatch', name: '1 minute of Power Snatches (75/55 lb)' },
        { id: 'box-jumps', name: '1 minute of Box Jumps (24/20 in)' },
        { id: 'thrusters', name: '1 minute of Thrusters (75/55 lb)' },
        { id: 'chest-to-bar-pull-ups', name: '1 minute of Chest-to-Bar Pull-Ups' },
        { id: null, name: '1 minute of Rest' },
      ],
    },
  ],
};

const isabel = {
  id: 'benchmark_isabel',
  name: 'Isabel',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: Chipper',
      exercises: [
        { id: 'barbell-snatch', name: 'Snatches (135/95 lbs)', reps: '30' },
      ],
    },
  ],
};

const jackie = {
  id: 'benchmark_jackie',
  name: 'Jackie',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: Chipper',
      exercises: [
        { id: 'rowing', name: '1,000 meter Row', reps: '1' },
        { id: 'thrusters', name: 'Thrusters (45 lbs)', reps: '50' },
        { id: 'pullups', name: 'Pull-ups', reps: '30' },
      ],
    },
  ],
};

const karen = {
  id: 'benchmark_karen',
  name: 'Karen',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: Chipper',
      exercises: [
        { id: 'wall-ball-shots', name: 'Wall Ball Shots (20/14 lbs)', reps: '150' },
      ],
    },
  ],
};

const kelly = {
  id: 'benchmark_kelly',
  name: 'Kelly',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: RFT',
      rounds: 5,
      exercises: [
        { id: 'running', name: 'Run 400 meters', reps: '1' },
        { id: 'box-jumps', name: 'Box Jumps (24/20 in)', reps: '30' },
        { id: 'wall-ball-shots', name: 'Wall Ball Shots (20/14 lbs)', reps: '30' },
      ],
    },
  ],
};

const linda = {
  id: 'benchmark_linda',
  name: 'Linda ("3 Bars of Death")',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: RFT',
      rounds: 1,
      note: 'Deadlift: 1.5x BW, Bench: 1x BW, Clean: 0.75x BW. Complete all 10 reps of all 3 movements before starting the 9 reps, and so on.',
      exercises: [
        { id: null, name: '--- 10 Reps Each ---', reps: '' },
        { id: 'deadlift', name: 'Deadlift', reps: '10' },
        { id: 'bench_press', name: 'Bench Press', reps: '10' },
        { id: 'barbell-clean', name: 'Clean', reps: '10' },
        { id: null, name: '--- 9 Reps Each ---', reps: '' },
        { id: 'deadlift', name: 'Deadlift', reps: '9' },
        { id: 'bench_press', name: 'Bench Press', reps: '9' },
        { id: 'barbell-clean', name: 'Clean', reps: '9' },
        { id: null, name: '--- 8 Reps Each ---', reps: '' },
        { id: 'deadlift', name: 'Deadlift', reps: '8' },
        { id: 'bench_press', name: 'Bench Press', reps: '8' },
        { id: 'barbell-clean', name: 'Clean', reps: '8' },
        { id: null, name: '--- 7 Reps Each ---', reps: '' },
        { id: 'deadlift', name: 'Deadlift', reps: '7' },
        { id: 'bench_press', name: 'Bench Press', reps: '7' },
        { id: 'barbell-clean', name: 'Clean', reps: '7' },
        { id: null, name: '--- 6 Reps Each ---', reps: '' },
        { id: 'deadlift', name: 'Deadlift', reps: '6' },
        { id: 'bench_press', name: 'Bench Press', reps: '6' },
        { id: 'barbell-clean', name: 'Clean', reps: '6' },
        { id: null, name: '--- 5 Reps Each ---', reps: '' },
        { id: 'deadlift', name: 'Deadlift', reps: '5' },
        { id: 'bench_press', name: 'Bench Press', reps: '5' },
        { id: 'barbell-clean', name: 'Clean', reps: '5' },
        { id: null, name: '--- 4 Reps Each ---', reps: '' },
        { id: 'deadlift', name: 'Deadlift', reps: '4' },
        { id: 'bench_press', name: 'Bench Press', reps: '4' },
        { id: 'barbell-clean', name: 'Clean', reps: '4' },
        { id: null, name: '--- 3 Reps Each ---', reps: '' },
        { id: 'deadlift', name: 'Deadlift', reps: '3' },
        { id: 'bench_press', name: 'Bench Press', reps: '3' },
        { id: 'barbell-clean', name: 'Clean', reps: '3' },
        { id: null, name: '--- 2 Reps Each ---', reps: '' },
        { id: 'deadlift', name: 'Deadlift', reps: '2' },
        { id: 'bench_press', name: 'Bench Press', reps: '2' },
        { id: 'barbell-clean', name: 'Clean', reps: '2' },
        { id: null, name: '--- 1 Rep Each ---', reps: '' },
        { id: 'deadlift', name: 'Deadlift', reps: '1' },
        { id: 'bench_press', name: 'Bench Press', reps: '1' },
        { id: 'barbell-clean', name: 'Clean', reps: '1' },
      ],
    },
  ],
};

const lynne = {
  id: 'benchmark_lynne',
  name: 'Lynne',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Strength',
      note: '5 rounds for max reps of bodyweight bench press and pull-ups. Rest as needed. Score is total reps.',
      exercises: [
        { id: 'bench_press', name: 'Bench Press (Bodyweight)', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), reps: 'Max'})) },
        { id: 'pullups', name: 'Pull-ups', sets: Array.from({ length: 5 }, () => ({ id: generateUniqueId(), reps: 'Max'})) },
      ],
    },
  ],
};

const mary = {
  id: 'benchmark_mary',
  name: 'Mary',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: AMRAP',
      duration: 20,
      exercises: [
        { id: 'handstand-push-ups', name: 'Handstand Push-ups', reps: '5' },
        { id: 'pistol-squats', name: 'Pistol Squats (alternating)', reps: '10' },
        { id: 'pullups', name: 'Pull-ups', reps: '15' },
      ],
    },
  ],
};

const nancy = {
  id: 'benchmark_nancy',
  name: 'Nancy',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: RFT',
      rounds: 5,
      exercises: [
        { id: 'running', name: 'Run 400 meters', reps: '1' },
        { id: 'overhead-squat', name: 'Overhead Squats (95/65 lbs)', reps: '15' },
      ],
    },
  ],
};

const nicole = {
  id: 'benchmark_nicole',
  name: 'Nicole',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: AMRAP',
      duration: 20,
      exercises: [
        { id: 'running', name: 'Run 400 meters', reps: '1' },
        { id: 'pullups', name: 'Max-rep Pull-ups', reps: '' },
      ],
      note: 'Score is the total number of pull-ups completed across all rounds.'
    },
  ],
};

// --- Main Template Export ---
export const benchmarkWodsTemplate = {
  id: 'template_benchmarks',
  name: 'Classic Benchmark "Girl" WODs',
  description: 'Test your fitness against these classic "Girl" benchmark workouts. Log your time or score to track your progress over time.',
  isTemplate: true,
  meta: {
    type: 'Benchmarks',
    level: 'Intermediate',
    goal: 'General Fitness',
    equipment: 'Full Gym'
  },
  workouts: [
    angie, annie, barbara, chelsea, cindy, diane, elizabeth, eva, fran, 
    grace, gwen, helen, hope, isabel, jackie, karen, kelly, linda, 
    lynne, mary, nancy, nicole
  ].sort((a, b) => a.name.localeCompare(b.name)), // Sort alphabetically for a clean display
};