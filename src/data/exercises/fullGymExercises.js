// src/data/exercises/fullGymExercises.js

export const fullGymExercises = [
  {
    id: "landmine-press",
    name: "Landmine Press",
    category: "Upper Body",
    primaryMuscles: ["Shoulders", "Chest", "Triceps"],
    equipment: ["Barbell", "Landmine Attachment"],
    setup: [
      "Place one end of a barbell into a landmine attachment or securely in a corner.",
      "Load the other end with the desired weight.",
      "Kneel on one knee (the one opposite your pressing arm) or stand with feet staggered.",
      "Grip the end of the barbell with one hand and bring it to your shoulder."
    ],
    execution: [
      "Brace your core and keep your torso tight.",
      "Press the barbell up and away from you until your arm is fully extended.",
      "Focus on driving with your shoulder and chest.",
      "Lower the barbell back to your shoulder with control."
    ],
    commonMistakes: ["Twisting the torso excessively.", "Using momentum instead of a controlled press.", "Not achieving full lockout."],
    modifications: { easier: "Use a lighter weight.", harder: "Perform from a standing position to challenge the core more." },
    breathingPattern: "Exhale on press, inhale on descent."
  },
  {
    id: "cable-tricep-pushdowns",
    name: "Cable Tricep Rope Pushdowns",
    category: "Upper Body",
    primaryMuscles: ["Triceps"],
    equipment: ["Cable Machine", "Rope Attachment"],
    setup: [
      "Attach a rope to a high pulley on a cable machine.",
      "Grip the rope with both hands, palms facing each other.",
      "Keep your elbows tucked in at your sides."
    ],
    execution: [
      "Press the rope down until your arms are fully extended.",
      "At the bottom, separate the rope handles to maximize tricep contraction.",
      "Allow the rope to return to the starting position with control, keeping your elbows stationary."
    ],
    commonMistakes: ["Letting elbows flare out or move forward.", "Using body weight to push the weight down.", "Incomplete range of motion."],
    modifications: { easier: "Use less weight.", harder: "Use a straight bar for a different feel or add a pause at the bottom." },
    breathingPattern: "Exhale on pushdown, inhale on return."
  },
  {
    id: "cable-low-row",
    name: "Cable Low Row",
    category: "Upper Body",
    primaryMuscles: ["Back", "Lats", "Biceps"],
    equipment: ["Cable Machine"],
    setup: [
      "Sit at a low row machine with feet on the platform and knees slightly bent.",
      "Grip the handle (V-grip or straight bar) with a straight back and extended arms."
    ],
    execution: [
      "Pull the handle towards your torso, driving your elbows back.",
      "Squeeze your shoulder blades together at the peak of the contraction.",
      "Slowly extend your arms to return to the starting position."
    ],
    commonMistakes: ["Rounding the back.", "Using momentum by rocking the torso back and forth.", "Shrugging the shoulders."],
    modifications: { easier: "Use less weight.", harder: "Use a wider grip or pause at the peak contraction." },
    breathingPattern: "Exhale on the pull, inhale on the return."
  },
  {
    id: "cable-hammer-curls",
    name: "Cable Hammer Curls",
    category: "Upper Body",
    primaryMuscles: ["Biceps", "Forearms"],
    equipment: ["Cable Machine", "Rope Attachment"],
    setup: [
      "Attach a rope to a low pulley.",
      "Grip the rope with a neutral (palms facing each other) grip.",
      "Stand with your elbows tucked at your sides."
    ],
    execution: [
      "Curl the rope up towards your shoulders, keeping your elbows stationary.",
      "Squeeze your biceps at the top of the movement.",
      "Lower the rope with control."
    ],
    commonMistakes: ["Swinging the body to create momentum.", "Elbows moving forward.", "Incomplete range of motion."],
    modifications: { easier: "Use less weight.", harder: "Perform one arm at a time." },
    breathingPattern: "Exhale on the curl, inhale on the descent."
  },
  {
    id: "incline-barbell-press",
    name: "Incline Barbell Press",
    category: "Upper Body",
    primaryMuscles: ["Upper Chest", "Shoulders", "Triceps"],
    equipment: ["Barbell", "Adjustable Bench", "Rack"],
    setup: [
      "Set an incline bench to a 30-45 degree angle inside a power rack.",
      "Lie on the bench and grip the barbell slightly wider than shoulder-width.",
      "Unrack the weight and hold it over your upper chest."
    ],
    execution: [
      "Lower the bar with control to your upper chest, keeping elbows tucked.",
      "Press the bar back up to the starting position without locking out your elbows completely.",
    ],
    commonMistakes: ["Bouncing the bar off the chest.", "Setting the incline too high.", "Flaring elbows."],
    modifications: { easier: "Use dumbbells or a Smith machine.", harder: "Add a pause at the bottom." },
    breathingPattern: "Inhale down, exhale up."
  },
  {
    id: "overhead-tricep-extensions",
    name: "Overhead Tricep Extensions",
    category: "Upper Body",
    primaryMuscles: ["Triceps"],
    equipment: ["Cable Machine", "Rope Attachment"],
    setup: [
      "Attach a rope to a low pulley.",
      "Face away from the machine, grab the rope, and bring it overhead so your elbows are bent and pointing to the ceiling."
    ],
    execution: [
      "Extend your arms fully, flexing your triceps at the top.",
      "Keep your upper arms stationary throughout the movement.",
      "Lower the weight with control back behind your head."
    ],
    commonMistakes: ["Flaring elbows out.", "Arching the lower back.", "Moving the upper arms."],
    modifications: { easier: "Use a lighter weight or use a single dumbbell.", harder: "Increase weight or use a slow tempo." },
    breathingPattern: "Exhale on extension, inhale on return."
  },
  {
    id: "barbell-curls",
    name: "Barbell Curls",
    category: "Upper Body",
    primaryMuscles: ["Biceps"],
    equipment: ["Barbell"],
    setup: [
      "Stand holding a barbell with an underhand grip, hands shoulder-width apart.",
      "Keep your elbows tucked into your sides."
    ],
    execution: [
      "Curl the barbell up towards your shoulders, keeping your elbows stationary.",
      "Squeeze your biceps at the top.",
      "Lower with control to the starting position."
    ],
    commonMistakes: ["Using momentum by swinging the back.", "Elbows moving forward.", "Partial reps."],
    modifications: { easier: "Use an EZ-bar or dumbbells.", harder: "Use a slow tempo or pause at the halfway point." },
    breathingPattern: "Exhale on the curl, inhale on descent."
  },
  {
    id: "face-pulls",
    name: "Face Pulls",
    category: "Upper Body",
    primaryMuscles: ["Rear Delts", "Upper Back"],
    equipment: ["Cable Machine", "Rope Attachment"],
    setup: [
      "Set a pulley to chest height and attach a rope.",
      "Grip the rope with an overhand grip and step back to create tension."
    ],
    execution: [
      "Pull the rope towards your face, leading with your hands.",
      "As you pull, externally rotate your shoulders so your knuckles face the ceiling at the end of the movement.",
      "Squeeze your rear delts and upper back.",
      "Return to the start with control."
    ],
    commonMistakes: ["Using too much weight.", "Pulling with the biceps.", "Not externally rotating at the end."],
    modifications: { easier: "Use a light resistance band.", harder: "Add a pause and hold the contraction." },
    breathingPattern: "Exhale on the pull, inhale on return."
  },
  {
    id: "barbell-front-squats",
    name: "Barbell Front Squats",
    category: "Lower Body",
    primaryMuscles: ["Quads", "Core", "Upper Back"],
    equipment: ["Barbell", "Rack"],
    setup: [
      "Set the barbell in a rack at shoulder height.",
      "Approach the bar and place it on your front deltoids, using either a clean grip or a cross-arm grip.",
      "Keep your elbows high and your torso upright."
    ],
    execution: [
      "Descend into a squat, keeping your chest up and elbows high.",
      "Go to at least parallel depth.",
      "Drive through your heels to return to a standing position."
    ],
    commonMistakes: ["Dropping elbows.", "Leaning forward.", "Rounding the upper back."],
    modifications: { easier: "Use dumbbells (goblet or front rack) or an empty barbell.", harder: "Add a pause at the bottom." },
    breathingPattern: "Inhale down, exhale up."
  },
  {
    id: "barbell-good-mornings",
    name: "Barbell Good Mornings",
    category: "Lower Body",
    primaryMuscles: ["Hamstrings", "Glutes", "Lower Back"],
    equipment: ["Barbell"],
    setup: [
      "Place a barbell on your back as you would for a squat.",
      "Stand with feet hip-width apart and a soft bend in your knees."
    ],
    execution: [
      "Keeping your back straight, hinge at your hips, pushing them backward.",
      "Lower your torso until it is nearly parallel to the floor, feeling a stretch in your hamstrings.",
      "Engage your glutes and hamstrings to return to the starting position."
    ],
    commonMistakes: ["Rounding the back.", "Using too much weight.", "Bending the knees excessively."],
    modifications: { easier: "Use just the barbell or a resistance band.", harder: "Perform with a slow tempo." },
    breathingPattern: "Inhale on the hinge, exhale on the return to standing."
  },
  {
    id: "straight-arm-pulldowns",
    name: "Straight-Arm Pulldowns",
    category: "Upper Body",
    primaryMuscles: ["Lats"],
    equipment: ["Cable Machine"],
    setup: [
      "Attach a straight bar to a high pulley.",
      "Grip the bar with an overhand grip and step back, keeping your arms straight."
    ],
    execution: [
      "Keeping your arms straight, pull the bar down to your thighs by engaging your lats.",
      "Squeeze your lats at the bottom.",
      "Return to the starting position with control."
    ],
    commonMistakes: ["Bending the elbows.", "Using the triceps instead of the lats.", "Rounding the back."],
    modifications: { easier: "Use a resistance band.", harder: "Add a pause at the bottom." },
    breathingPattern: "Exhale on the pulldown, inhale on the return."
  },
  {
    id: "barbell-push-press",
    name: "Barbell Push Press",
    category: "Upper Body",
    primaryMuscles: ["Shoulders", "Triceps", "Quads"],
    equipment: ["Barbell", "Rack"],
    setup: [
      "Start with the barbell in the front rack position.",
      "Feet are hip-width apart, core is braced."
    ],
    execution: [
      "Dip by bending your knees slightly (not a full squat).",
      "Explosively drive up with your legs and press the bar overhead.",
      "Lock out your elbows at the top with the bar over your mid-foot.",
      "Lower with control back to the front rack."
    ],
    commonMistakes: ["Dipping too deep or too shallow.", "Not using leg drive effectively.", "Pressing the bar forward."],
    modifications: { easier: "Use dumbbells or a lighter weight.", harder: "Perform a Push Jerk." },
    breathingPattern: "Inhale on the dip, exhale on the drive/press."
  },
  {
    id: 'lat-pulldowns',
    name: 'Lat Pulldowns',
    category: 'Upper Body',
    primaryMuscles: ['Lats', 'Biceps'],
    equipment: ['Cable Machine'],
    setup: [
      "Sit at the lat pulldown machine and adjust the knee pad to secure your legs.",
      "Grip the bar with an overhand grip, wider than your shoulders."
    ],
    execution: [
      "Pull the bar down to your upper chest, leading with your elbows.",
      "Squeeze your lats and shoulder blades together at the bottom.",
      "Return the bar to the starting position with control."
    ],
    commonMistakes: ["Using momentum by swinging back.", "Pulling the bar too low.", "Not using a full range of motion."],
    modifications: { easier: "Use less weight or a resistance band for pull-ups.", harder: "Use a wider grip or a slow tempo." },
    breathingPattern: "Exhale on the pull, inhale on the return."
  }
];