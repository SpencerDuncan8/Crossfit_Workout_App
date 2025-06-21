// src/data/workoutProgram.js - Complete and Updated (Verified Full Length)

const workoutProgram = {
  metadata: {
    name: "60-Day CrossFit Transformation",
    duration: 60,
    cycleLength: 28, // 4 weeks
    workoutDays: 5, // per week
    goal: "12-15 lbs fat loss while preserving muscle"
  },
  weeklySchedule: {
    1: "Upper Body Strength + Conditioning",
    2: "Lower Body Strength + Conditioning",
    3: "Full Body MetCon",
    4: "Upper Body Power + Conditioning",
    5: "Lower Body Power + Conditioning",
    6: "Active Recovery - Walk",
    7: "Active Recovery - Bike"
  },
  workouts: {
    // WEEK 1 - FOUNDATION
    1: {
      day: 1, week: 1, type: "Upper Body Strength + Conditioning",
      warmup: { duration: "5 minutes", exercises: [
        { id: "stationary-bike", name: "Stationary bike easy pace", duration: "2 minutes" },
        { id: "arm-circles", name: "Arm circles each direction", reps: "10" },
        { id: "shoulder-shrugs", name: "Shoulder shrugs", reps: "10" },
        { id: "pullups", name: "Pullups (or assisted)", reps: "5" },
        { id: "push-ups", name: "Push-ups", reps: "10" }
      ]},
      strength: { duration: "20 minutes", exercises: [
        { id: "dumbbell-bench-press", name: "Dumbbell Bench Press", sets: 4, reps: 8, rest: "90 seconds" },
        { id: "weighted-pullups", name: "Weighted Pullups", sets: 4, reps: 6, rest: "90 seconds", note: "Add dumbbell between legs" },
        { id: "dumbbell-shoulder-press", name: "Dumbbell Shoulder Press", sets: 3, reps: 10, rest: "60 seconds" },
        { id: "single-arm-dumbbell-rows", name: "Single Arm Dumbbell Rows", sets: 3, reps: "10 each arm", rest: "60 seconds" }
      ]},
      conditioning: { duration: "15 minutes", name: "Upper Body Burn", type: "rounds", format: "5 Rounds For Time", exercises: [
        { id: "dumbbell-thrusters", name: "Dumbbell thrusters", reps: 10 },
        { id: "push-ups", name: "Push-ups", reps: 15 },
        { id: "mountain-climbers", name: "Mountain climbers", reps: 20 }
      ], rest: "90 seconds between rounds"},
      cooldown: { duration: "5 minutes", description: "Easy bike + upper body stretches" }
    },
    2: {
      day: 2, week: 1, type: "Lower Body Strength + Conditioning",
      warmup: { duration: "5 minutes", exercises: [
        { id: "stationary-bike", name: "Stationary bike", duration: "2 minutes" },
        { id: "air-squats", name: "Bodyweight squats", reps: "10" },
        { id: "dumbbell-reverse-lunges", name: "Lunges each leg", reps: "10" },
        { id: "glute-bridges", name: "Glute bridges", reps: "10" },
        { id: "plank", name: "Plank", duration: "30 seconds" }
      ]},
      strength: { duration: "20 minutes", exercises: [
        { id: "dumbbell-goblet-squats", name: "Dumbbell Goblet Squats", sets: 4, reps: 10, rest: "90 seconds" },
        { id: "dumbbell-romanian-deadlifts", name: "Dumbbell Romanian Deadlifts", sets: 4, reps: 10, rest: "90 seconds" },
        { id: "dumbbell-bulgarian-split-squats", name: "Dumbbell Bulgarian Split Squats", sets: 3, reps: "8 each leg", rest: "60 seconds" },
        { id: "dumbbell-calf-raises", name: "Dumbbell Calf Raises", sets: 3, reps: 15, rest: "45 seconds" }
      ]},
      conditioning: { duration: "15 minutes", name: "Leg Burner", type: "rounds", format: "4 Rounds For Time", exercises: [
        { id: "dumbbell-goblet-squats", name: "Dumbbell goblet squats", reps: 15 },
        { id: "jumping-lunges", name: "Jumping lunges", reps: 20 },
        { id: "air-squats", name: "Air squats", reps: 25 }
      ], rest: "2 minutes between rounds"},
      cooldown: { duration: "5 minutes", description: "Easy bike + lower body stretches" }
    },
    3: {
      day: 3, week: 1, type: "Full Body MetCon",
      warmup: { duration: "5 minutes", exercises: [
        { id: "stationary-bike", name: "Stationary bike", duration: "2 minutes" },
        { id: "inchworms", name: "Inchworms", reps: "5" },
        { id: "arm-circles", name: "Arm swings", reps: "10" },
        { id: "leg-swings", name: "Leg swings each direction", reps: "10" },
        { id: "jumping-jacks", name: "Jumping jacks", duration: "30 seconds" }
      ]},
      strength: null,
      conditioning: { duration: "35 minutes", name: "The Grind", type: "rounds", format: "3 Rounds For Time", exercises: [
        { id: "stationary-bike", name: "Stationary bike", distance: "300m" },
        { id: "dumbbell-thrusters", name: "Dumbbell thrusters", reps: 21 },
        { id: "pullups", name: "Pullups", reps: 15 },
        { id: "dumbbell-man-makers", name: "Dumbbell man makers", reps: 9 }
      ], rest: "3 minutes between rounds"},
      cooldown: { duration: "5 minutes", description: "Easy bike + full body stretches" }
    },
    4: {
      day: 4, week: 1, type: "Upper Body Power + Conditioning",
      warmup: { duration: "5 minutes", exercises: [
        { id: "stationary-bike", name: "Stationary bike", duration: "2 minutes" },
        { id: "arm-circles", name: "Arm circles each direction", reps: "10" },
        { id: "push-ups", name: "Push-ups", reps: "10" },
        { id: "pullups", name: "Pullups", reps: "5" },
        { id: "dumbbell-high-pulls", name: "Dumbbell high pulls", reps: "10" }
      ]},
      strength: { duration: "20 minutes", exercises: [
        { id: "dumbbell-push-press", name: "Dumbbell Push Press", sets: 5, reps: 5, rest: "2 minutes" },
        { id: "dumbbell-high-pulls", name: "Dumbbell High Pulls", sets: 5, reps: 5, rest: "90 seconds" },
        { id: "plyometric-push-ups", name: "Plyometric Push-ups", sets: 4, reps: 6, rest: "90 seconds" },
        { id: "dumbbell-renegade-rows", name: "Dumbbell Renegade Rows", sets: 3, reps: "6 each arm", rest: "60 seconds" }
      ]},
      conditioning: { duration: "15 minutes", name: "Power Circuit", type: "amrap", format: "6 Minutes AMRAP", exercises: [
        { id: "dumbbell-push-press", name: "Dumbbell push press", reps: 5 },
        { id: "dumbbell-high-pulls", name: "Dumbbell high pulls", reps: 10 },
        { id: "jump-rope", name: "Jump rope", reps: 15 }
      ]},
      cooldown: { duration: "5 minutes", description: "Easy bike + upper body stretches" }
    },
    5: {
      day: 5, week: 1, type: "Lower Body Power + Conditioning",
      warmup: { duration: "5 minutes", exercises: [
        { id: "stationary-bike", name: "Stationary bike", duration: "2 minutes" },
        { id: "air-squats", name: "Bodyweight squats", reps: "10" },
        { id: "dumbbell-reverse-lunges", name: "Lunges each leg", reps: "10" },
        { id: "jump-squats", name: "Jump squats", reps: "10" },
        { id: "plank", name: "Plank", duration: "30 seconds" }
      ]},
      strength: { duration: "20 minutes", exercises: [
        { id: "dumbbell-jump-squats", name: "Dumbbell Jump Squats", sets: 5, reps: 5, rest: "2 minutes" },
        { id: "dumbbell-deadlift-to-high-pull", name: "Dumbbell Deadlift to High Pull", sets: 5, reps: 5, rest: "90 seconds" },
        { id: "single-leg-dumbbell-deadlifts", name: "Single-leg Dumbbell Deadlifts", sets: 4, reps: "6 each leg", rest: "60 seconds" },
        { id: "dumbbell-reverse-lunges", name: "Dumbbell Reverse Lunges", sets: 3, reps: "8 each leg", rest: "60 seconds" }
      ]},
      conditioning: { duration: "15 minutes", name: "Lower Power Blast", type: "emom", format: "8 Minutes EMOM", exercises: [
        { id: "dumbbell-goblet-squats", name: "Even minutes: Dumbbell goblet squats", reps: 12 },
        { id: "dumbbell-romanian-deadlifts", name: "Odd minutes: Dumbbell deadlifts + burpees", reps: "10 + 5" }
      ]},
      cooldown: { duration: "5 minutes", description: "Easy bike + lower body stretches" }
    },
    6: { day: 6, week: 1, type: "Active Recovery", description: "30-minute walk at moderate pace + light stretching", warmup: null, strength: null, conditioning: null, cooldown: null },
    7: { day: 7, week: 1, type: "Active Recovery", description: "20-30 minutes easy pace stationary bike", warmup: null, strength: null, conditioning: null, cooldown: null },

    // WEEK 2 - BUILDING
    8: {
      day: 8, week: 2, type: "Upper Body Strength + Conditioning",
      warmup: { duration: "5 minutes", exercises: [
        { id: "stationary-bike", name: "Stationary bike", duration: "3 minutes" },
        { id: "arm-circles", name: "Arm circles each direction", reps: "10" },
        { id: "band-pull-aparts", name: "Band pull-aparts (or arm pulls)", reps: "10" },
        { id: "pullups", name: "Pullups", reps: "6" },
        { id: "push-ups", name: "Push-ups", reps: "12" }
      ]},
      strength: { duration: "20 minutes", exercises: [
        { id: "dumbbell-incline-press", name: "Dumbbell Incline Press", sets: 4, reps: 8, rest: "90 seconds", note: "Use adjustable bench angle" },
        { id: "pullups", name: "Pullups", sets: 4, reps: 8, rest: "90 seconds" },
        { id: "dumbbell-arnold-press", name: "Dumbbell Arnold Press", sets: 3, reps: 10, rest: "60 seconds" },
        { id: "bent-over-dumbbell-rows", name: "Bent Over Dumbbell Rows", sets: 3, reps: 10, rest: "60 seconds" }
      ]},
      conditioning: { duration: "15 minutes", name: "Tabata Total", type: "tabata", format: "4 Minutes (8 rounds of 20 sec work, 10 sec rest)", rounds: [
        { round: "1-2", id: "dumbbell-thrusters", exercise: "Dumbbell thrusters" },
        { round: "3-4", id: "push-ups", exercise: "Push-ups" },
        { round: "5-6", id: "mountain-climbers", exercise: "Mountain climbers" },
        { round: "7-8", id: "burpees", exercise: "Burpees" }
      ], note: "Rest 3 minutes, then repeat entire sequence once more"},
      cooldown: { duration: "5 minutes", description: "Easy bike + stretches" }
    },
    9: {
      day: 9, week: 2, type: "Lower Body Strength + Conditioning",
      warmup: { duration: "5 minutes", exercises: [
        { id: "stationary-bike", name: "Stationary bike", duration: "3 minutes" },
        { id: "air-squats", name: "Bodyweight squats", reps: "15" },
        { id: "dumbbell-reverse-lunges", name: "Lunges each leg", reps: "10" },
        { id: "glute-bridges", name: "Glute bridges", reps: "15" },
        { id: "plank", name: "Plank", duration: "45 seconds" }
      ]},
      strength: { duration: "20 minutes", exercises: [
        { id: "dumbbell-front-squats", name: "Dumbbell Front Squats", sets: 4, reps: 10, rest: "90 seconds" },
        { id: "dumbbell-sumo-deadlifts", name: "Dumbbell Sumo Deadlifts", sets: 4, reps: 10, rest: "90 seconds" },
        { id: "dumbbell-walking-lunges", name: "Dumbbell Walking Lunges", sets: 3, reps: "10 each leg", rest: "60 seconds" },
        { id: "dumbbell-single-leg-hip-thrusts", name: "Dumbbell Single Leg Hip Thrusts", sets: 3, reps: "12 each leg", rest: "60 seconds" }
      ]},
      conditioning: { duration: "15 minutes", name: "Death By Squats", type: "emom", format: "EMOM for 10 minutes", description: "Minute 1: 1 goblet squat, Minute 2: 2 goblet squats, etc. Continue adding 1 rep each minute until failure", exercises: [
        { id: "dumbbell-goblet-squats", name: "Dumbbell goblet squats", reps: "1 + 1 each minute" }
      ]},
      cooldown: { duration: "5 minutes", description: "Easy bike + stretches" }
    },
    10: {
      day: 10, week: 2, type: "Full Body MetCon",
      warmup: { duration: "5 minutes", exercises: [
        { id: "stationary-bike", name: "Stationary bike", duration: "3 minutes" },
        { id: "inchworms", name: "Inchworms", reps: "8" },
        { id: "arm-circles", name: "Arm swings", reps: "15" },
        { id: "leg-swings", name: "Leg swings each direction", reps: "15" },
        { id: "jumping-jacks", name: "Jumping jacks", duration: "45 seconds" }
      ]},
      strength: null,
      conditioning: { duration: "35 minutes", name: "Chipper", type: "fortime", format: "For Time", exercises: [
        { id: "dumbbell-swings", name: "Dumbbell swings (American style)", reps: 50 },
        { id: "pullups", name: "Pullups", reps: 40 },
        { id: "dumbbell-thrusters", name: "Dumbbell thrusters", reps: 30 },
        { id: "dumbbell-man-makers", name: "Dumbbell man makers", reps: 20 },
        { id: "burpees", name: "Burpees", reps: 10 }
      ], note: "Break up reps as needed, complete all reps of each exercise before moving to next"},
      cooldown: { duration: "5 minutes", description: "Easy bike + stretches" }
    },
    11: {
      day: 11, week: 2, type: "Upper Body Power + Conditioning",
      warmup: { duration: "5 minutes", exercises: [
        { id: "stationary-bike", name: "Stationary bike", duration: "3 minutes" },
        { id: "arm-circles", name: "Arm circles each direction", reps: "12" },
        { id: "push-ups", name: "Push-ups", reps: "12" },
        { id: "pullups", name: "Pullups", reps: "6" },
        { id: "dumbbell-high-pulls", name: "Dumbbell high pulls", reps: "12" }
      ]},
      strength: { duration: "20 minutes", exercises: [
        { id: "dumbbell-snatches", name: "Dumbbell Snatches", sets: 5, reps: "4 each arm", rest: "90 seconds" },
        { id: "dumbbell-push-jerks", name: "Dumbbell Push Jerks", sets: 5, reps: "4 each arm", rest: "90 seconds" },
        { id: "explosive-push-ups", name: "Explosive Push-ups", sets: 4, reps: 8, rest: "90 seconds" },
        { id: "dumbbell-upright-rows", name: "Dumbbell Upright Rows", sets: 3, reps: 8, rest: "60 seconds" }
      ]},
      conditioning: { duration: "15 minutes", name: "Upper Power AMRAP", type: "amrap", format: "8 Minutes AMRAP", exercises: [
        { id: "dumbbell-snatches", name: "Dumbbell snatches", reps: "6 (3 each arm)" },
        { id: "dumbbell-push-jerks", name: "Dumbbell push jerks", reps: "8 (4 each arm)" },
        { id: "explosive-push-ups", name: "Explosive push-ups", reps: 10 },
        { id: "mountain-climbers", name: "Mountain climbers", reps: 12 }
      ]},
      cooldown: { duration: "5 minutes", description: "Easy bike + stretches" }
    },
    12: {
      day: 12, week: 2, type: "Lower Body Power + Conditioning",
      warmup: { duration: "5 minutes", exercises: [
        { id: "stationary-bike", name: "Stationary bike", duration: "3 minutes" },
        { id: "air-squats", name: "Bodyweight squats", reps: "15" },
        { id: "dumbbell-reverse-lunges", name: "Lunges each leg", reps: "12" },
        { id: "jump-squats", name: "Jump squats", reps: "15" },
        { id: "plank", name: "Plank", duration: "45 seconds" }
      ]},
      strength: { duration: "20 minutes", exercises: [
        { id: "dumbbell-squat-to-press", name: "Dumbbell Squat to Press", sets: 5, reps: 6, rest: "90 seconds" },
        { id: "dumbbell-clean-and-press", name: "Dumbbell Clean and Press", sets: 5, reps: "4 each arm", rest: "90 seconds" },
        { id: "single-leg-dumbbell-deadlifts", name: "Single-leg Dumbbell Deadlifts", sets: 4, reps: "8 each leg", rest: "60 seconds" },
        { id: "dumbbell-step-ups", name: "Dumbbell Step-ups", sets: 3, reps: "10 each leg", rest: "60 seconds" }
      ]},
      conditioning: { duration: "15 minutes", name: "Lower Power Tabata", type: "tabata", format: "4 rounds of 4 minutes each", exercises: [
        { id: "dumbbell-jump-squats", name: "Dumbbell squat jumps", duration: "20 sec work, 10 sec rest" },
        { id: "burpees", name: "Burpees", duration: "20 sec work, 10 sec rest" },
        { id: "jumping-lunges", name: "Jumping lunges", duration: "20 sec work, 10 sec rest" },
        { id: "mountain-climbers", name: "Mountain climbers", duration: "20 sec work, 10 sec rest" }
      ], rest: "1 minute between rounds"},
      cooldown: { duration: "5 minutes", description: "Easy bike + stretches" }
    },
    13: { day: 13, week: 2, type: "Active Recovery", description: "30-minute walk at moderate pace + light stretching", warmup: null, strength: null, conditioning: null, cooldown: null },
    14: { day: 14, week: 2, type: "Active Recovery", description: "20-30 minutes easy pace stationary bike", warmup: null, strength: null, conditioning: null, cooldown: null },

    // WEEK 3 - INTENSIFYING
    15: {
      day: 15, week: 3, type: "Upper Body Strength + Conditioning",
      warmup: { duration: "5 minutes", exercises: [
        { id: "stationary-bike", name: "Stationary bike moderate pace", duration: "3 minutes" },
        { id: "dynamic-warmup", name: "Dynamic arm warm-up routine", reps: "10 each" },
        { id: "pullups", name: "Pullups", reps: "8" },
        { id: "push-ups", name: "Push-ups", reps: "15" }
      ]},
      strength: { duration: "20 minutes", exercises: [
        { id: "dumbbell-bench-press", name: "Dumbbell Bench Press", sets: 5, reps: 6, rest: "2 minutes", note: "Increase weight" },
        { id: "weighted-pullups", name: "Weighted Pullups", sets: 5, reps: 5, rest: "2 minutes", note: "Heavier weight" },
        { id: "dumbbell-shoulder-press", name: "Dumbbell Shoulder Press", sets: 4, reps: 8, rest: "90 seconds" },
        { id: "dumbbell-chest-fly-to-press", name: "Dumbbell Chest Fly to Press", sets: 3, reps: 10, rest: "60 seconds" }
      ]},
      conditioning: { duration: "15 minutes", name: "Upper Endurance", type: "emom", format: "20 Minutes EMOM", exercises: [
        { minute: 1, id: "dumbbell-thrusters", name: "Dumbbell thrusters", reps: 8 },
        { minute: 2, id: "pullups", name: "Pullups", reps: 10 },
        { minute: 3, id: "push-ups", name: "Push-ups", reps: 12 },
        { minute: 4, id: "plank", name: "Plank hold", duration: "30 seconds" }
      ], note: "Repeat for 5 complete rounds"},
      cooldown: { duration: "5 minutes", description: "Easy bike + stretches" }
    },
    16: {
      day: 16, week: 3, type: "Lower Body Strength + Conditioning",
      warmup: { duration: "5 minutes", exercises: [
        { id: "stationary-bike", name: "Stationary bike moderate pace", duration: "3 minutes" },
        { id: "dynamic-warmup", name: "Dynamic leg warm-up routine", reps: "varies" },
        { id: "air-squats", name: "Bodyweight squats", reps: "20" },
        { id: "dumbbell-reverse-lunges", name: "Lunges each leg", reps: "15" }
      ]},
      strength: { duration: "20 minutes", exercises: [
        { id: "dumbbell-goblet-squats", name: "Dumbbell Goblet Squats", sets: 5, reps: 8, rest: "2 minutes", note: "Increase weight" },
        { id: "dumbbell-romanian-deadlifts", name: "Dumbbell Romanian Deadlifts", sets: 5, reps: 8, rest: "2 minutes", note: "Increase weight" },
        { id: "dumbbell-bulgarian-split-squats", name: "Dumbbell Bulgarian Split Squats", sets: 4, reps: "10 each leg", rest: "90 seconds" },
        { id: "dumbbell-goblet-curtsy-lunges", name: "Dumbbell Goblet Curtsy Lunges", sets: 3, reps: "10 each leg", rest: "60 seconds" }
      ]},
      conditioning: { duration: "15 minutes", name: "Leg Pyramid", type: "fortime", format: "For Time", description: "1-2-3-4-5-4-3-2-1 reps of each exercise", exercises: [
        { id: "dumbbell-goblet-squats", name: "Dumbbell goblet squats", reps: "ascending/descending" },
        { id: "burpees", name: "Burpees", reps: "ascending/descending" },
        { id: "jumping-lunges", name: "Jumping lunges (each leg)", reps: "ascending/descending" }
      ]},
      cooldown: { duration: "5 minutes", description: "Easy bike + stretches" }
    },
    17: {
      day: 17, week: 3, type: "Full Body MetCon",
      warmup: { duration: "5 minutes", exercises: [
        { id: "stationary-bike", name: "Stationary bike moderate pace", duration: "3 minutes" },
        { id: "dynamic-warmup", name: "Full body dynamic warm-up", reps: "varies" },
        { id: "movement-prep", name: "Movement prep for workout", reps: "5 each" }
      ]},
      strength: null,
      conditioning: { duration: "35 minutes", name: "The Beast", type: "rounds", format: "5 Rounds For Time", exercises: [
        { id: "stationary-bike", name: "Stationary bike", distance: "400m" },
        { id: "dumbbell-thrusters", name: "Dumbbell thrusters", reps: 15 },
        { id: "pullups", name: "Pullups", reps: 12 },
        { id: "dumbbell-man-makers", name: "Dumbbell man makers", reps: 9 },
        { id: "burpees", name: "Burpees", reps: 6 }
      ], rest: "2 minutes between rounds"},
      cooldown: { duration: "5 minutes", description: "Easy bike + stretches" }
    },
    18: {
      day: 18, week: 3, type: "Upper Body Power + Conditioning",
      warmup: { duration: "5 minutes", exercises: [
        { id: "stationary-bike", name: "Stationary bike moderate pace", duration: "3 minutes" },
        { id: "dynamic-warmup", name: "Dynamic upper body prep", reps: "varies" },
        { id: "pullups", name: "Pullups", reps: "8" },
        { id: "push-ups", name: "Push-ups", reps: "15" }
      ]},
      strength: { duration: "20 minutes", exercises: [
        { id: "dumbbell-push-press", name: "Dumbbell Push Press", sets: 6, reps: 3, rest: "2 minutes", note: "Heavier" },
        { id: "dumbbell-snatches", name: "Dumbbell Snatches", sets: 6, reps: "3 each arm", rest: "90 seconds" },
        { id: "clapping-push-ups", name: "Clapping Push-ups", sets: 4, reps: 6, rest: "90 seconds" },
        { id: "dumbbell-high-pulls", name: "Dumbbell High Pulls", sets: 4, reps: 6, rest: "60 seconds" }
      ]},
      conditioning: { duration: "15 minutes", name: "Power Ladder", type: "amrap", format: "10 Minutes AMRAP", description: "Add 1 rep to each exercise each round", exercises: [
        { id: "dumbbell-snatches", name: "Dumbbell snatches (alternating)", reps: 3 },
        { id: "dumbbell-push-press", name: "Dumbbell push press", reps: 6 },
        { id: "explosive-push-ups", name: "Explosive push-ups", reps: 9 },
        { id: "mountain-climbers", name: "Mountain climbers", reps: 12 },
        { id: "burpees", name: "Burpees", reps: 15 }
      ]},
      cooldown: { duration: "5 minutes", description: "Easy bike + stretches" }
    },
    19: {
      day: 19, week: 3, type: "Lower Body Power + Conditioning",
      warmup: { duration: "5 minutes", exercises: [
        { id: "stationary-bike", name: "Stationary bike moderate pace", duration: "3 minutes" },
        { id: "dynamic-warmup", name: "Dynamic lower body prep", reps: "varies" },
        { id: "air-squats", name: "Bodyweight squats", reps: "20" },
        { id: "jump-squats", name: "Jump squats", reps: "15" }
      ]},
      strength: { duration: "20 minutes", exercises: [
        { id: "dumbbell-jump-squats", name: "Dumbbell Jump Squats", sets: 6, reps: 4, rest: "2 minutes", note: "Heavier" },
        { id: "dumbbell-clean-and-press", name: "Dumbbell Clean and Press", sets: 6, reps: "3 each arm", rest: "90 seconds" },
        { id: "single-leg-dumbbell-deadlifts", name: "Single-leg Dumbbell Deadlifts", sets: 5, reps: "6 each leg", rest: "90 seconds" },
        { id: "dumbbell-thrusters", name: "Dumbbell Thrusters", sets: 4, reps: 8, rest: "90 seconds" }
      ]},
      conditioning: { duration: "15 minutes", name: "Lower Power Challenge", type: "fortime", format: "For Time", exercises: [
        { id: "21-15-9-start", name: "21-15-9 reps of:", reps: "" },
        { id: "dumbbell-goblet-squats", name: "Dumbbell goblet squats", reps: "21-15-9" },
        { id: "dumbbell-romanian-deadlifts", name: "Dumbbell deadlifts", reps: "21-15-9" },
        { id: "burpees", name: "Burpees", reps: "21-15-9" },
        { id: "immediate-start", name: "Then immediately:", reps: "" },
        { id: "9-15-21-start", name: "9-15-21 reps of:", reps: "" },
        { id: "dumbbell-jump-squats", name: "Dumbbell squat jumps", reps: "9-15-21" },
        { id: "jumping-lunges", name: "Jumping lunges", reps: "9-15-21" },
        { id: "mountain-climbers", name: "Mountain climbers", reps: "9-15-21" }
      ]},
      cooldown: { duration: "5 minutes", description: "Easy bike + stretches" }
    },
    20: { day: 20, week: 3, type: "Active Recovery", description: "30-minute walk at moderate pace + light stretching", warmup: null, strength: null, conditioning: null, cooldown: null },
    21: { day: 21, week: 3, type: "Active Recovery", description: "20-30 minutes easy pace stationary bike", warmup: null, strength: null, conditioning: null, cooldown: null },
    
    // WEEK 4 - PEAKING
    22: {
      day: 22, week: 4, type: "Upper Body Strength + Conditioning",
      warmup: { duration: "5 minutes", exercises: [
        { id: "stationary-bike", name: "Stationary bike building intensity", duration: "4 minutes" },
        { id: "dynamic-warmup", name: "Comprehensive upper body prep", reps: "varies" },
        { id: "pullups", name: "Pullups", reps: "10" },
        { id: "push-ups", name: "Push-ups", reps: "20" }
      ]},
      strength: { duration: "20 minutes", exercises: [
        { id: "dumbbell-bench-press", name: "Dumbbell Bench Press", sets: 5, reps: 5, rest: "2 minutes", note: "Heavy" },
        { id: "weighted-pullups", name: "Weighted Pullups", sets: 5, reps: 4, rest: "2 minutes", note: "Heaviest weight yet" },
        { id: "dumbbell-push-press", name: "Dumbbell Push Press", sets: 4, reps: 6, rest: "90 seconds" },
        { id: "dumbbell-renegade-rows", name: "Dumbbell Renegade Rows", sets: 4, reps: "8 each arm", rest: "90 seconds" }
      ]},
      conditioning: { duration: "15 minutes", name: "Upper Domination", type: "rounds", format: "3 Rounds For Time", exercises: [
        { id: "dumbbell-thrusters", name: "Dumbbell thrusters", reps: 15 },
        { id: "pullups", name: "Pullups", reps: 12 },
        { id: "dumbbell-man-makers", name: "Dumbbell man makers", reps: 9 },
        { id: "burpees", name: "Burpees", reps: 6 },
        { id: "plank", name: "Plank hold", duration: "30 seconds" }
      ], rest: "90 seconds between rounds"},
      cooldown: { duration: "5 minutes", description: "Easy bike + stretches" }
    },
    23: {
      day: 23, week: 4, type: "Lower Body Strength + Conditioning",
      warmup: { duration: "5 minutes", exercises: [
        { id: "stationary-bike", name: "Stationary bike building intensity", duration: "4 minutes" },
        { id: "dynamic-warmup", name: "Comprehensive lower body prep", reps: "varies" },
        { id: "air-squats", name: "Bodyweight squats", reps: "25" },
        { id: "dumbbell-reverse-lunges", name: "Lunges each leg", reps: "20" }
      ]},
      strength: { duration: "20 minutes", exercises: [
        { id: "dumbbell-goblet-squats", name: "Dumbbell Goblet Squats", sets: 5, reps: 6, rest: "2 minutes", note: "Heaviest weight" },
        { id: "dumbbell-romanian-deadlifts", name: "Dumbbell Romanian Deadlifts", sets: 5, reps: 6, rest: "2 minutes", note: "Heaviest weight" },
        { id: "dumbbell-front-squats", name: "Dumbbell Front Squats", sets: 4, reps: 8, rest: "90 seconds" },
        { id: "dumbbell-single-leg-hip-thrusts", name: "Dumbbell Single Leg Hip Thrusts", sets: 4, reps: "10 each leg", rest: "60 seconds" }
      ]},
      conditioning: { duration: "15 minutes", name: "Leg Annihilation", type: "amrap", format: "12 Minutes AMRAP", exercises: [
        { id: "dumbbell-goblet-squats", name: "Dumbbell goblet squats", reps: 8 },
        { id: "dumbbell-romanian-deadlifts", name: "Dumbbell deadlifts", reps: 8 },
        { id: "burpees", name: "Burpees", reps: 8 },
        { id: "jumping-lunges", name: "Jumping lunges (each leg)", reps: 8 },
        { id: "stationary-bike", name: "Stationary bike", distance: "400m" }
      ]},
      cooldown: { duration: "5 minutes", description: "Easy bike + stretches" }
    },
    24: {
      day: 24, week: 4, type: "Full Body MetCon",
      warmup: { duration: "5 minutes", exercises: [
        { id: "stationary-bike", name: "Stationary bike building to moderate-high", duration: "4 minutes" },
        { id: "dynamic-warmup", name: "Full body movement prep", reps: "varies" },
        { id: "movement-prep", name: "Practice all workout movements", reps: "3-5 each" }
      ]},
      strength: null,
      conditioning: { duration: "35 minutes", name: "The Gauntlet", type: "fortime", format: "For Time (30 minute cap)", exercises: [
        { id: "dumbbell-swings", name: "Dumbbell swings", reps: 100 },
        { id: "pullups", name: "Pullups", reps: 75 },
        { id: "dumbbell-thrusters", name: "Dumbbell thrusters", reps: 50 },
        { id: "dumbbell-man-makers", name: "Dumbbell man makers", reps: 25 },
        { id: "stationary-bike", name: "Stationary bike sprint", distance: "500m" }
      ], note: "Partition reps as needed"},
      cooldown: { duration: "5 minutes", description: "Easy bike + stretches" }
    },
    25: {
      day: 25, week: 4, type: "Upper Body Power + Conditioning",
      warmup: { duration: "5 minutes", exercises: [
        { id: "stationary-bike", name: "Stationary bike building intensity", duration: "4 minutes" },
        { id: "dynamic-warmup", name: "Explosive movement prep", reps: "varies" },
        { id: "pullups", name: "Pullups", reps: "10" },
        { id: "explosive-push-ups", name: "Explosive push-ups", reps: "20" }
      ]},
      strength: { duration: "20 minutes", exercises: [
        { id: "dumbbell-snatches", name: "Dumbbell Snatches", sets: 6, reps: "2 each arm", rest: "2 minutes", note: "Maximum power" },
        { id: "dumbbell-push-jerks", name: "Dumbbell Push Jerks", sets: 6, reps: "2 each arm", rest: "2 minutes", note: "Maximum power" },
        { id: "plyometric-push-ups", name: "Plyometric Push-ups", sets: 5, reps: 5, rest: "90 seconds", note: "Maximum explosion" },
        { id: "dumbbell-high-pulls", name: "Dumbbell High Pulls", sets: 5, reps: 5, rest: "90 seconds", note: "Maximum speed" }
      ]},
      conditioning: { duration: "15 minutes", name: "Power Finale", type: "rounds", format: "4 Rounds For Time", exercises: [
        { id: "dumbbell-snatches", name: "Dumbbell snatches", reps: "4 (2 each arm)" },
        { id: "dumbbell-push-jerks", name: "Dumbbell push jerks", reps: "6 (3 each arm)" },
        { id: "explosive-push-ups", name: "Explosive push-ups", reps: 8 },
        { id: "burpees", name: "Burpees", reps: 10 }
      ], rest: "90 seconds between rounds"},
      cooldown: { duration: "5 minutes", description: "Easy bike + stretches" }
    },
    26: {
      day: 26, week: 4, type: "Lower Body Power + Conditioning",
      warmup: { duration: "5 minutes", exercises: [
        { id: "stationary-bike", name: "Stationary bike building to high intensity", duration: "4 minutes" },
        { id: "dynamic-warmup", name: "Explosive lower body prep", reps: "varies" },
        { id: "air-squats", name: "Bodyweight squats", reps: "25" },
        { id: "jump-squats", name: "Jump squats", reps: "20" }
      ]},
      strength: { duration: "20 minutes", exercises: [
        { id: "dumbbell-clean-and-press", name: "Dumbbell Clean and Press", sets: 6, reps: "2 each arm", rest: "2 minutes", note: "Maximum power" },
        { id: "dumbbell-jump-squats", name: "Dumbbell Jump Squats", sets: 6, reps: 3, rest: "2 minutes", note: "Maximum explosion" },
        { id: "dumbbell-squat-to-press", name: "Dumbbell Squat to Press", sets: 5, reps: 5, rest: "90 seconds", note: "Maximum speed" },
        { id: "single-leg-dumbbell-deadlifts", name: "Single-leg Dumbbell Deadlifts", sets: 5, reps: "5 each leg", rest: "90 seconds", note: "Controlled power" }
      ]},
      conditioning: { duration: "15 minutes", name: "Lower Power Finale", type: "tabata", format: "Tabata Protocol (16 minutes total)", exercises: [
        { id: "dumbbell-jump-squats", name: "Dumbbell squat jumps", duration: "4 min (20 sec work, 10 sec rest)" },
        { id: "rest", name: "Rest", duration: "1 minute" },
        { id: "burpees", name: "Burpees", duration: "4 min (20 sec work, 10 sec rest)" },
        { id: "rest", name: "Rest", duration: "1 minute" },
        { id: "jumping-lunges", name: "Jumping lunges", duration: "4 min (20 sec work, 10 sec rest)" },
        { id: "rest", name: "Rest", duration: "1 minute" },
        { id: "stationary-bike", name: "Maximum effort stationary bike", duration: "1 minute" }
      ]},
      cooldown: { duration: "5 minutes", description: "Easy bike + stretches" }
    },
    27: { day: 27, week: 4, type: "Active Recovery", description: "30-minute walk at moderate pace + light stretching", warmup: null, strength: null, conditioning: null, cooldown: null },
    28: { day: 28, week: 4, type: "Active Recovery", description: "20-30 minutes easy pace stationary bike", warmup: null, strength: null, conditioning: null, cooldown: null }
  }
};

// Helper function to get workout by day number (1-60)
export function getWorkoutByDay(dayNumber) {
  if (dayNumber < 1 || dayNumber > 60) return null;
  const cycleDay = ((dayNumber - 1) % 28) + 1;
  const workout = workoutProgram.workouts[cycleDay] || null;
  if (!workout) return null;
  const actualWeek = Math.ceil(dayNumber / 7);
  return {
    ...workout,
    actualDay: dayNumber,
    actualWeek: actualWeek,
    cycleWeek: workout.week,
    isNewCycle: cycleDay === 1 && dayNumber > 1,
    isRestDay: workout.type === "Active Recovery"
  };
}

// Helper function to get workouts for a specific week
export function getWorkoutsByWeek(weekNumber) {
  const startDay = (weekNumber - 1) * 7 + 1;
  const endDay = weekNumber * 7;
  const workouts = [];
  for (let day = startDay; day <= endDay && day <= 60; day++) {
    workouts.push(getWorkoutByDay(day));
  }
  return workouts;
}

// Helper function to get workout type for a specific day
export function getWorkoutType(dayNumber) {
  const workout = getWorkoutByDay(dayNumber);
  return workout ? workout.type : null;
}

// Helper function to check if a day is a rest day
export function isRestDay(dayNumber) {
  const workout = getWorkoutByDay(dayNumber);
  return workout && workout.type === "Active Recovery";
}

// Helper function to get progression phase
export function getProgressionPhase(weekNumber) {
  const cycleWeek = ((weekNumber - 1) % 4) + 1;
  switch (cycleWeek) {
    case 1: return "Foundation";
    case 2: return "Building";
    case 3: return "Intensifying";
    case 4: return "Peaking";
    default: return "Unknown";
  }
}

// Export the main program object
export default workoutProgram;