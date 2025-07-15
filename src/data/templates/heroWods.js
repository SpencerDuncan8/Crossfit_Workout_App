// src/data/templates/heroWods.js

import { generateUniqueId } from '../../utils/idUtils.js';

// --- Define Individual Hero WODs ---

const adamBrown = {
  id: 'hero_adambrown',
  name: 'Adam Brown',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: RFT',
      rounds: 2,
      exercises: [
        { id: 'deadlift', name: 'Deadlifts (295/205 lbs)', reps: '24' },
        { id: 'box-jumps', name: 'Box Jumps (24/20 in)', reps: '24' },
        { id: 'wall-ball-shots', name: 'Wall Ball Shots (20/14 lbs)', reps: '24' },
        { id: 'bench_press', name: 'Bench Press (195/135 lbs)', reps: '24' },
        { id: 'box-jumps', name: 'Box Jumps (24/20 in)', reps: '24' },
        { id: 'wall-ball-shots', name: 'Wall Ball Shots (20/14 lbs)', reps: '24' },
        { id: 'barbell-clean', name: 'Cleans (145/100 lbs)', reps: '24' },
      ],
      note: 'In honor of Navy Chief Special Warfare Operator (SEAL) Adam Lee Brown, 36, of Hot Springs, AR, who was killed in action in Afghanistan on March 17, 2010.'
    },
  ],
};

const arnie = {
  id: 'hero_arnie',
  name: 'Arnie',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: Chipper',
      exercises: [
        { id: 'kb-turkish-get-up', name: 'Turkish Get-ups, right arm (32/24 kg)', reps: '21' },
        { id: 'kb-swing', name: 'Kettlebell Swings (32/24 kg)', reps: '50' },
        { id: 'overhead-squat', name: 'Overhead Squats, left arm (32/24 kg KB)', reps: '21' },
        { id: 'kb-swing', name: 'Kettlebell Swings (32/24 kg)', reps: '50' },
        { id: 'overhead-squat', name: 'Overhead Squats, right arm (32/24 kg KB)', reps: '21' },
        { id: 'kb-swing', name: 'Kettlebell Swings (32/24 kg)', reps: '50' },
        { id: 'kb-turkish-get-up', name: 'Turkish Get-ups, left arm (32/24 kg)', reps: '21' },
      ],
      note: 'In honor of Los Angeles County Firefighter Specialist Arnaldo "Arnie" Quinones, 34, who was killed in the line of duty on August 30, 2009.'
    },
  ],
};

const badger = {
  id: 'hero_badger',
  name: 'Badger',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: RFT',
      rounds: 3,
      exercises: [
        { id: 'squat-clean', name: 'Squat Cleans (95/65 lbs)', reps: '30' },
        { id: 'pullups', name: 'Pull-ups', reps: '30' },
        { id: 'running', name: 'Run 800 meters', reps: '1' },
      ],
      note: 'In honor of Navy Chief Petty Officer Mark Carter, 27, of Virginia Beach, VA who was killed in Iraq on December 11, 2007.'
    },
  ],
};

const bull = {
  id: 'hero_bull',
  name: 'Bull',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: RFT',
      rounds: 2,
      exercises: [
        { id: 'double-unders', name: '200 Double Unders', reps: '1' },
        { id: 'overhead-squat', name: 'Overhead Squats (135/95 lbs)', reps: '50' },
        { id: 'pullups', name: 'Pull-ups', reps: '50' },
        { id: 'running', name: '1 Mile Run', reps: '1' },
      ],
      note: 'In honor of U.S. Marine Corps Captain Brandon "Bull" Barrett, 27, of Marion, IN, who was killed in action on May 5, 2010.'
    },
  ],
};

const daniel = {
  id: 'hero_daniel',
  name: 'Daniel',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: Chipper',
      exercises: [
        { id: 'pullups', name: 'Pull-ups', reps: '50' },
        { id: 'running', name: 'Run 400 meters', reps: '1' },
        { id: 'thrusters', name: 'Thrusters (95/65 lbs)', reps: '21' },
        { id: 'running', name: 'Run 800 meters', reps: '1' },
        { id: 'thrusters', name: 'Thrusters (95/65 lbs)', reps: '21' },
        { id: 'running', name: 'Run 400 meters', reps: '1' },
        { id: 'pullups', name: 'Pull-ups', reps: '50' },
      ],
      note: 'In honor of Army Sgt. 1st Class Daniel Crabtree who was killed in Iraq on June 8, 2006.'
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

const glen = {
  id: 'hero_glen',
  name: 'Glen',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: Chipper',
      exercises: [
        { id: 'barbell-clean-and-jerk', name: 'Clean and Jerks (135/95 lbs)', reps: '30' },
        { id: 'running', name: '1 mile Run', reps: '1' },
        { id: 'rope-climb', name: '15 ft Rope Climbs', reps: '10' },
        { id: 'running', name: '1 mile Run', reps: '1' },
        { id: 'burpees', name: '100 Burpees', reps: '100' },
      ],
      note: 'In honor of former U.S. Navy SEAL Glen Doherty, who died in an attack on a U.S. consulate in Benghazi, Libya on September 12, 2012.'
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

const loredo = {
  id: 'hero_loredo',
  name: 'Loredo',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: RFT',
      rounds: 6,
      exercises: [
        { id: 'air-squats', name: 'Squats', reps: '24' },
        { id: 'push-ups', name: 'Push-ups', reps: '24' },
        { id: 'bodyweight-walking-lunge', name: 'Walking Lunge steps', reps: '24' },
        { id: 'running', name: 'Run 400 meters', reps: '1' },
      ],
      note: 'In honor of U.S. Army Staff Sergeant Edwardo Loredo, 34, of Houston, TX, who was killed in Afghanistan on June 24, 2010.'
    },
  ],
};

const mcghee = {
  id: 'hero_mcghee',
  name: 'McGhee',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: AMRAP',
      duration: 30,
      exercises: [
        { id: 'deadlift', name: 'Deadlifts (275/185 lbs)', reps: '5' },
        { id: 'push-ups', name: 'Push-ups', reps: '13' },
        { id: 'box-jumps', name: 'Box Jumps (24/20 in)', reps: '9' },
      ],
      note: 'In honor of U.S. Army Corporal Ryan C. McGhee, 21, who was killed in Iraq on May 13, 2009.'
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

const nate = {
  id: 'hero_nate',
  name: 'Nate',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: AMRAP',
      duration: 20,
      exercises: [
        { id: 'muscle-up', name: 'Muscle-ups', reps: '2' },
        { id: 'handstand-push-ups', name: 'Handstand Push-ups', reps: '4' },
        { id: 'kb-swing', name: 'Kettlebell Swings (2/1.5 pood)', reps: '8' },
      ],
      note: 'In honor of Chief Petty Officer Nate Hardy, who was killed on February 4, 2008, during combat operations in Iraq.'
    },
  ],
};

const randy = {
  id: 'hero_randy',
  name: 'Randy',
  blocks: [
    {
      id: generateUniqueId(),
      type: 'Conditioning: Chipper',
      exercises: [
        { id: 'power-snatch', name: 'Power Snatches (75/55 lbs)', reps: '75' },
      ],
      note: 'In honor of Randy Simmons, a 27-year LAPD veteran and SWAT team member who was killed in the line of duty on February 7, 2008.'
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
    type: 'WODs',
    level: 'Advanced',
    goal: 'General Fitness',
    equipment: 'Full Gym'
  },
  workouts: [
    adamBrown,
    arnie,
    badger,
    bull,
    daniel,
    dt,
    glen,
    jt,
    loredo,
    mcghee,
    michael,
    murph,
    nate,
    randy,
    theSeven,
  ].sort((a, b) => a.name.localeCompare(b.name)),
};