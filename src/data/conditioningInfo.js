// src/data/conditioningInfo.js

export const conditioningInfo = {
  'Conditioning: AMRAP': {
    title: 'AMRAP (As Many Rounds/Reps As Possible)',
    description: 'In an AMRAP workout, your goal is to complete as many rounds or repetitions of a given set of exercises as possible within a specified time limit. You move continuously through the exercises for the entire duration. Your score is the total number of rounds and any additional reps completed when the time runs out.',
    points: [
      'Set a timer for a specific duration.',
      'Complete the list of exercises in order.',
      'Once a full round is complete, immediately start the next round.',
      'Continue until the timer expires.',
      'Record your total completed rounds plus any extra reps.'
    ]
  },
  'Conditioning: RFT': {
    title: 'RFT (Rounds For Time)',
    description: 'In an RFT workout, the goal is to complete a set number of rounds of specific exercises as fast as you can. The clock starts and does not stop until you have completed all the work. Your score is your total time.',
    points: [
      'A set number of rounds is specified (e.g., 3, 5, or 10).',
      'Complete all exercises and reps for each round.',
      'Move from one round to the next as quickly as possible.',
      'The timer stops only after the final rep of the final round.',
      'A lower time is a better score.'
    ]
  },
  'Conditioning: Chipper': {
    title: 'Chipper',
    description: 'A "Chipper" is a workout where you complete a series of different exercises, usually with high repetitions, in a sequence. You must complete all reps of one exercise before moving to the next. The workout is a single, long round, and the goal is to "chip away" at the reps until they are all done.',
    points: [
      'This is a "for time" workout, so work as fast as possible.',
      'You must finish all reps of one movement before starting the next.',
      'There is only one round.',
      'Your score is the total time it takes to complete all exercises.'
    ]
  },
  'Conditioning: EMOM': {
    title: 'EMOM (Every Minute On the Minute)',
    description: 'In an EMOM, you perform a specific exercise or set of exercises at the start of every minute for a set number of minutes. Any time remaining in the minute after you complete the work is your rest period. The goal is to complete the work consistently each minute.',
    points: [
      'A timer is set for a total number of minutes.',
      'At the start of each minute (e.g., at 0:00, 1:00, 2:00), you perform the prescribed work.',
      'The faster you work, the more rest you get.',
      'If you cannot complete the work within the minute, the workout becomes more challenging.'
    ]
  },
  'Conditioning: Tabata': {
    title: 'Tabata',
    description: 'Tabata is a form of high-intensity interval training (HIIT). The structure is very specific: 20 seconds of all-out effort, followed by 10 seconds of rest. This cycle is repeated for 8 rounds, totaling 4 minutes.',
    points: [
      'One Tabata "round" is 8 intervals.',
      'Each interval consists of 20 seconds of work and 10 seconds of rest.',
      'The goal is maximum intensity during the 20-second work periods.',
      'Your score is the lowest number of reps completed in any of the 8 work intervals.'
    ]
  },
  // --- THIS IS THE NEWLY ADDED SECTION ---
  'Conditioning: Intervals': {
    title: 'Custom Intervals (HIIT)',
    description: 'This is a flexible form of High-Intensity Interval Training (HIIT). You can customize the duration of the work periods, rest periods, and the total number of rounds to create a wide variety of workouts.',
    points: [
      'Define a "Work" period (in seconds).',
      'Define a "Rest" period (in seconds).',
      'Set the total number of rounds.',
      'This format is great for tailoring workout intensity and duration to your specific goals.'
    ]
  }
};