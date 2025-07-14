// src/data/templates/heroWods.js

import { generateUniqueId } from '../../utils/idUtils.js';

// --- Define Individual Hero WODs ---

const murph = {
  id: 'hero_murph',
  name: 'Murph',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: Chipper',
      exercises: [
        { id: 'running', name: '1 Mile Run', reps: '1' },
        { id: 'pullups', name: '100 Pull-ups', reps: '100' },
        { id: 'push-ups', name: '200 Push-ups', reps: '200' },
        { id: 'air-squats', name: '300 Air Squats', reps: '300' },
        { id: 'running', name: '1 Mile Run', reps: '1' },
      ],
      note: 'Partition the pull-ups, push-ups, and squats as needed. Start and finish with a 1-mile run. If you have a 20lb vest, wear it.'
    },
  ],
};

const jt = {
  id: 'hero_jt',
  name: 'J.T.',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: RFT',
      rounds: 1,
      exercises: [
        { id: 'handstand-push-ups', name: 'Handstand Push-ups', reps: '21' },
        { id: 'ring-dips', name: 'Ring Dips', reps: '21' },
        { id: 'push-ups', name: 'Push-ups', reps: '21' },
        { id: 'handstand-push-ups', name: 'Handstand Push-ups', reps: '15' },
        { id: 'ring-dips', name: 'Ring Dips', reps: '15' },
        { id: 'push-ups', name: 'Push-ups', reps: '15' },
        { id: 'handstand-push-ups', name: 'Handstand Push-ups', reps: '9' },
        { id: 'ring-dips', name: 'Ring Dips', reps: '9' },
        { id: 'push-ups', name: 'Push-ups', reps: '9' },
      ],
      note: 'In honor of Navy Petty Officer 1st Class Jeff Taylor, 30, of Little Creek, VA, who was killed in Afghanistan.'
    },
  ],
};

const dt = {
  id: 'hero_dt',
  name: 'DT',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: RFT',
      rounds: 5,
      exercises: [
        { id: 'deadlift', name: 'Deadlifts (155/105 lbs)', reps: '12' },
        { id: 'barbell-hang-power-clean', name: 'Hang Power Cleans (155/105 lbs)', reps: '9' },
        { id: 'barbell-push-jerk', name: 'Push Jerks (155/105 lbs)', reps: '6' },
      ],
      note: 'In honor of USAF SSgt Timothy P. Davis, 28, who was killed on Feb. 20, 2009.'
    },
  ],
};

const michael = {
  id: 'hero_michael',
  name: 'Michael',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: RFT',
      rounds: 3,
      exercises: [
        { id: 'running', name: 'Run 800 meters', reps: '1' },
        { id: 'back-extensions-supermans', name: 'Back Extensions', reps: '50' },
        { id: 'sit-up', name: 'Sit-ups', reps: '50' },
      ],
      note: 'In honor of Navy Lieutenant Michael McGreevy, 30, of Portville, NY, who was killed in Afghanistan on June 28, 2005.'
    },
  ],
};

const theSeven = {
  id: 'hero_the_seven',
  name: 'The Seven',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: RFT',
      rounds: 7,
      exercises: [
        { id: 'handstand-push-ups', name: 'Handstand Push-ups', reps: '7' },
        { id: 'thrusters', name: 'Thrusters (135/95 lbs)', reps: '7' },
        { id: 'knees-to-elbows', name: 'Knees-to-Elbows', reps: '7' },
        { id: 'deadlift', name: 'Deadlifts (245/165 lbs)', reps: '7' },
        { id: 'burpees', name: 'Burpees', reps: '7' },
        { id: 'kb-swing', name: 'Kettlebell Swings (32/24 kg)', reps: '7' },
        { id: 'pullups', name: 'Pull-ups', reps: '7' },
      ],
      note: 'A memorial WOD for seven CIA officers and one Jordanian officer killed in Afghanistan on December 30, 2009.'
    },
  ],
};


// --- Main Template Object ---
export const heroWodsTemplate = {
  id: 'template_hero_wods',
  name: 'Hero WODs',
  description: 'Honor the fallen by taking on these notoriously challenging Hero workouts. A true test of physical and mental fortitude.',
  isTemplate: true,
  meta: {
    type: 'Hero WODs',
    level: 'Advanced',
    goal: 'General Fitness',
    equipment: 'Full Gym'
  },
  workouts: [
    murph,
    jt,
    dt,
    michael,
    theSeven,
  ],
};