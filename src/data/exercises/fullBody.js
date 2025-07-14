// src/data/exercises/fullBody.js

export const fullBodyExercises = [
  {
    id: "dumbbell-snatches",
    name: "Dumbbell Snatches",
    category: "Full Body",
    primaryMuscles: ["Full Body", "Shoulders", "Core"],
    equipment: ["Dumbbell"],
    setup: [
      "Stand with feet shoulder-width apart",
      "Dumbbell on floor between feet",
      "Hinge at hips to grip dumbbell",
      "Back straight, core tight"
    ],
    execution: [
      "Explosively extend hips and knees",
      "Pull dumbbell up close to body",
      "Punch under weight to lockout",
      "One smooth motion from floor to overhead"
    ],
    commonMistakes: [
      "Swinging weight away from body",
      "Not fully extending hips",
      "Pressing instead of snatching",
      "Poor overhead position"
    ],
    modifications: {
      easier: "Hang snatch or lighter weight",
      harder: "Increase weight or tempo"
    },
    breathingPattern: "Inhale setup, explosive exhale"
  },
  {
    id: "dumbbell-squat-to-press",
    name: "Dumbbell Squat to Press",
    category: "Full Body",
    primaryMuscles: ["Quads", "Glutes", "Shoulders"],
    equipment: ["Dumbbells"],
    setup: [
      "Hold dumbbells at shoulders",
      "Feet shoulder-width apart",
      "Core engaged",
      "Elbows forward"
    ],
    execution: [
      "Squat down to parallel",
      "Drive up explosively",
      "Use momentum to press dumbbells overhead",
      "Return weights to shoulders"
    ],
    commonMistakes: [
      "Pressing before standing",
      "Not using leg drive",
      "Poor squat form",
      "Arching back on press"
    ],
    modifications: {
      easier: "Thruster or separate movements",
      harder: "Pause in squat or heavier weight"
    },
    breathingPattern: "Inhale down, exhale on press"
  },
  {
    id: "dumbbell-clean-and-press",
    name: "Dumbbell Clean and Press",
    category: "Full Body",
    primaryMuscles: ["Full Body", "Shoulders", "Legs"],
    equipment: ["Dumbbells"],
    setup: [
      "Dumbbells on floor beside feet",
      "Feet hip-width apart",
      "Hinge to grip dumbbells",
      "Back straight"
    ],
    execution: [
      "Explosively stand and shrug",
      "Pull dumbbells to shoulders",
      "Receive in slight squat",
      "Press overhead to finish"
    ],
    commonMistakes: [
      "Not using hip drive",
      "Curling instead of cleaning",
      "Poor receiving position",
      "Pressing without reset"
    ],
    modifications: {
      easier: "Hang clean or power clean only",
      harder: "Squat clean or single arm"
    },
    breathingPattern: "Inhale setup, exhale on clean and press"
  },
  {
    id: "dumbbell-deadlift-to-high-pull",
    name: "Dumbbell Deadlift to High Pull",
    category: "Full Body",
    primaryMuscles: ["Hamstrings", "Glutes", "Traps", "Shoulders"],
    equipment: ["Dumbbells"],
    setup: [
      "Stand with dumbbells at sides",
      "Feet hip-width apart",
      "Slight bend in knees",
      "Core engaged"
    ],
    execution: [
      "Hinge and lower dumbbells",
      "Drive hips forward to stand",
      "Continue momentum into high pull",
      "Lead with elbows"
    ],
    commonMistakes: [
      "Separating movements",
      "Not using hip drive",
      "Pulling with arms only",
      "Rounding back"
    ],
    modifications: {
      easier: "Just deadlifts or high pulls",
      harder: "Increase speed or weight"
    },
    breathingPattern: "Inhale down, exhale on pull"
  },
  {
    id: "dumbbell-thrusters",
    name: "Dumbbell Thrusters",
    category: "Full Body",
    primaryMuscles: ["Quads", "Glutes", "Shoulders", "Core"],
    equipment: ["Dumbbells"],
    setup: [
      "Hold dumbbells at shoulders",
      "Feet shoulder-width apart",
      "Elbows slightly forward",
      "Core braced"
    ],
    execution: [
      "Squat down to parallel",
      "Drive up explosively",
      "Use momentum to press overhead",
      "One fluid motion"
    ],
    commonMistakes: [
      "Pausing between squat and press",
      "Not reaching full depth",
      "Poor front rack position",
      "Arching back"
    ],
    modifications: {
      easier: "Lighter weight or squat to press",
      harder: "Clusters or continuous reps"
    },
    breathingPattern: "Inhale down, exhale on press"
  },
  {
    id: "dumbbell-man-makers",
    name: "Dumbbell Man Makers",
    category: "Full Body",
    primaryMuscles: ["Full Body"],
    equipment: ["Dumbbells"],
    setup: [
      "Start standing with dumbbells",
      "Feet shoulder-width apart",
      "Core tight",
      "Ready for complex movement"
    ],
    execution: [
      "Place dumbbells on floor, jump back to plank",
      "Perform push-up",
      "Row each dumbbell once",
      "Jump feet to hands",
      "Clean dumbbells to shoulders",
      "Stand and press overhead"
    ],
    commonMistakes: [
      "Rushing through movements",
      "Poor plank position",
      "Skipping components",
      "Using too heavy weight"
    ],
    modifications: {
      easier: "Step back instead of jump",
      harder: "Add burpee or devil press"
    },
    breathingPattern: "Breathe throughout complex movement"
  },
  {
    id: "dumbbell-swings",
    name: "Dumbbell Swings (American)",
    category: "Full Body",
    primaryMuscles: ["Glutes", "Hamstrings", "Core", "Shoulders"],
    equipment: ["Dumbbell"],
    setup: [
      "Hold one dumbbell with both hands",
      "Feet wider than shoulders",
      "Slight bend in knees",
      "Core engaged"
    ],
    execution: [
      "Hinge and swing dumbbell between legs",
      "Drive hips forward explosively",
      "Let momentum carry weight overhead",
      "Control descent back through legs"
    ],
    commonMistakes: [
      "Squatting instead of hinging",
      "Using arms too much",
      "Hyperextending back",
      "Not reaching full overhead"
    ],
    modifications: {
      easier: "Russian swings (eye level)",
      harder: "Single arm or heavier weight"
    },
    breathingPattern: "Exhale on swing up, inhale down"
  },
  {
    id: "burpees",
    name: "Burpees",
    category: "Full Body",
    primaryMuscles: ["Full Body"],
    equipment: ["None"],
    setup: [
      "Stand with feet hip-width apart",
      "Arms at sides",
      "Core engaged",
      "Ready for explosive movement"
    ],
    execution: [
      "Squat down, place hands on floor",
      "Jump feet back to plank",
      "Perform push-up",
      "Jump feet to hands",
      "Jump up with arms overhead"
    ],
    commonMistakes: [
      "Skipping push-up",
      "Not jumping at top",
      "Poor plank position",
      "Incomplete range of motion"
    ],
    modifications: {
      easier: "Step back/forward, no push-up",
      harder: "Add box jump or pull-up"
    },
    breathingPattern: "Breathe continuously throughout"
  },
  {
    id: "rope-climb",
    name: "Rope Climb",
    category: "Full Body",
    primaryMuscles: ["Grip", "Biceps", "Lats", "Core"],
    equipment: ["Climbing Rope"],
    setup: [
      "Stand at the base of the rope.",
      "Jump up to grip the rope as high as possible with both hands."
    ],
    execution: [
      "Use a leg wrap (J-Hook or S-Wrap) to secure your feet on the rope.",
      "Stand up using your legs, then reach your hands higher.",
      "Repeat this 'stand and reach' motion to ascend.",
      "Descend hand-over-hand, controlling your speed. Do not slide down."
    ],
    commonMistakes: [
      "Trying to pull up only with arms.",
      "Losing the foot lock.",
      "Sliding down, causing rope burn."
    ],
    modifications: {
      easier: "Practice leg wraps from the ground or perform rope pulls from a seated position.",
      harder: "Perform legless rope climbs."
    },
    breathingPattern: "Exhale on each upward pull/stand."
  },
];