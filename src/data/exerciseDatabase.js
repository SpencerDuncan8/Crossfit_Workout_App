// src/data/exerciseDatabase.js - Complete exercise library with form cues and instructions

const exerciseDatabase = {
  // UPPER BODY EXERCISES
  "dumbbell-bench-press": {
    name: "Dumbbell Bench Press",
    category: "Upper Body",
    primaryMuscles: ["Chest", "Triceps", "Shoulders"],
    equipment: ["Dumbbells", "Bench"],
    setup: [
      "Lie flat on bench with feet firmly on floor",
      "Hold dumbbells at chest level with palms facing forward",
      "Shoulder blades pulled back and down",
      "Slight arch in lower back"
    ],
    execution: [
      "Press dumbbells up and slightly inward",
      "Stop just short of locking out elbows",
      "Lower with control to chest level",
      "Keep wrists straight throughout"
    ],
    commonMistakes: [
      "Bouncing weights off chest",
      "Arching back excessively",
      "Flaring elbows too wide",
      "Uneven pressing"
    ],
    modifications: {
      easier: "Use lighter weights or perform on floor",
      harder: "Add pause at bottom, slow tempo, or increase weight"
    },
    breathingPattern: "Inhale on descent, exhale on press"
  },

  "dumbbell-incline-press": {
    name: "Dumbbell Incline Press",
    category: "Upper Body",
    primaryMuscles: ["Upper Chest", "Shoulders", "Triceps"],
    equipment: ["Dumbbells", "Adjustable Bench"],
    setup: [
      "Set bench to 30-45 degree incline",
      "Lie back with feet flat on floor",
      "Hold dumbbells at upper chest level",
      "Maintain natural arch in lower back"
    ],
    execution: [
      "Press dumbbells up and together",
      "Keep slight bend in elbows at top",
      "Lower with control to sides of upper chest",
      "Maintain consistent path of motion"
    ],
    commonMistakes: [
      "Setting bench angle too high (becomes shoulder press)",
      "Allowing weights to drift too far back",
      "Losing stability in core",
      "Pressing straight up instead of slightly back"
    ],
    modifications: {
      easier: "Reduce incline angle or use lighter weights",
      harder: "Increase incline, add pause, or use heavier weights"
    },
    breathingPattern: "Inhale down, exhale up"
  },

  "pullups": {
    name: "Pullups",
    category: "Upper Body",
    primaryMuscles: ["Lats", "Biceps", "Middle Back"],
    equipment: ["Pullup Bar"],
    setup: [
      "Hang from bar with overhand grip, hands shoulder-width apart",
      "Arms fully extended",
      "Core engaged",
      "Legs straight or slightly bent"
    ],
    execution: [
      "Pull body up until chin clears bar",
      "Focus on pulling elbows down and back",
      "Control the descent",
      "Full extension at bottom"
    ],
    commonMistakes: [
      "Kipping or swinging",
      "Not achieving full range of motion",
      "Using too wide or narrow grip",
      "Craning neck to clear bar"
    ],
    modifications: {
      easier: "Use resistance bands, assisted pullup machine, or do negatives",
      harder: "Add weight with belt or dumbbell between feet"
    },
    breathingPattern: "Exhale on pull up, inhale on descent"
  },

  "weighted-pullups": {
    name: "Weighted Pullups",
    category: "Upper Body",
    primaryMuscles: ["Lats", "Biceps", "Middle Back"],
    equipment: ["Pullup Bar", "Weight Belt or Dumbbell"],
    setup: [
      "Attach weight belt or hold dumbbell between feet/knees",
      "Same grip and position as regular pullups",
      "Ensure weight is secure",
      "Start from dead hang"
    ],
    execution: [
      "Same technique as regular pullups",
      "Maintain control with added weight",
      "No swinging or momentum",
      "Full range of motion"
    ],
    commonMistakes: [
      "Adding too much weight too soon",
      "Losing form due to weight",
      "Partial range of motion",
      "Dropping weight unsafely"
    ],
    modifications: {
      easier: "Reduce weight or return to bodyweight pullups",
      harder: "Increase weight or slow tempo"
    },
    breathingPattern: "Exhale up, inhale down"
  },

  "push-ups": {
    name: "Push-ups",
    category: "Upper Body",
    primaryMuscles: ["Chest", "Triceps", "Shoulders"],
    equipment: ["None"],
    setup: [
      "Start in plank position",
      "Hands slightly wider than shoulders",
      "Body in straight line from head to heels",
      "Core engaged"
    ],
    execution: [
      "Lower body until chest nearly touches floor",
      "Keep elbows at 45-degree angle from body",
      "Push up to starting position",
      "Maintain rigid body position throughout"
    ],
    commonMistakes: [
      "Sagging hips",
      "Head dropping",
      "Elbows flaring too wide",
      "Partial range of motion"
    ],
    modifications: {
      easier: "Perform on knees or elevate hands",
      harder: "Elevate feet, add weight, or slow tempo"
    },
    breathingPattern: "Inhale down, exhale up"
  },

  "explosive-push-ups": {
    name: "Explosive Push-ups",
    category: "Upper Body",
    primaryMuscles: ["Chest", "Triceps", "Shoulders"],
    equipment: ["None"],
    setup: [
      "Same as regular push-up position",
      "Slightly wider hand placement for stability",
      "Core extra tight",
      "Mental preparation for explosive movement"
    ],
    execution: [
      "Lower with control",
      "Explode up with maximum force",
      "Hands leave ground at top",
      "Land softly and immediately lower"
    ],
    commonMistakes: [
      "Landing with locked elbows",
      "Losing core stability",
      "Not generating enough power",
      "Poor hand placement on landing"
    ],
    modifications: {
      easier: "Perform from knees or regular push-ups",
      harder: "Clap push-ups or higher elevation"
    },
    breathingPattern: "Inhale down, forceful exhale on explosion"
  },

  "plyometric-push-ups": {
    name: "Plyometric Push-ups",
    category: "Upper Body",
    primaryMuscles: ["Chest", "Triceps", "Shoulders", "Core"],
    equipment: ["None"],
    setup: [
      "Start in perfect push-up position",
      "Hands firmly planted",
      "Core braced for impact",
      "Weight on balls of feet"
    ],
    execution: [
      "Lower body with control",
      "Explode upward with maximum power",
      "Push hard enough for hands to leave ground",
      "Absorb landing with bent elbows"
    ],
    commonMistakes: [
      "Poor landing mechanics",
      "Insufficient explosive power",
      "Loss of body alignment",
      "Wrist pain from impact"
    ],
    modifications: {
      easier: "Explosive push-ups without leaving ground",
      harder: "Add lateral movement or multiple claps"
    },
    breathingPattern: "Inhale down, explosive exhale up"
  },

  "clapping-push-ups": {
    name: "Clapping Push-ups",
    category: "Upper Body",
    primaryMuscles: ["Chest", "Triceps", "Shoulders", "Core"],
    equipment: ["None"],
    setup: [
      "Standard push-up position",
      "Mental focus on explosive power",
      "Core extremely tight",
      "Prepare for rapid hand movement"
    ],
    execution: [
      "Lower chest to near floor",
      "Explode up with maximum force",
      "Quickly clap hands together",
      "Return hands to position and absorb landing"
    ],
    commonMistakes: [
      "Not generating enough height",
      "Missing hand position on landing",
      "Face planting",
      "Hyperextending elbows on landing"
    ],
    modifications: {
      easier: "Single clap or explosive push-ups",
      harder: "Multiple claps or behind-back clap"
    },
    breathingPattern: "Quick inhale down, explosive exhale up"
  },

  "dumbbell-shoulder-press": {
    name: "Dumbbell Shoulder Press",
    category: "Upper Body",
    primaryMuscles: ["Shoulders", "Triceps"],
    equipment: ["Dumbbells"],
    setup: [
      "Sit or stand with core engaged",
      "Hold dumbbells at shoulder height",
      "Palms facing forward",
      "Elbows slightly in front of body"
    ],
    execution: [
      "Press weights overhead",
      "Stop just short of lockout",
      "Lower with control to start position",
      "Keep weights in line with shoulders"
    ],
    commonMistakes: [
      "Arching back excessively",
      "Pressing too far forward or back",
      "Using momentum",
      "Uneven pressing"
    ],
    modifications: {
      easier: "Seated with back support or lighter weights",
      harder: "Standing, single arm, or Arnold press variation"
    },
    breathingPattern: "Exhale on press, inhale on descent"
  },

  "dumbbell-arnold-press": {
    name: "Dumbbell Arnold Press",
    category: "Upper Body",
    primaryMuscles: ["Shoulders", "Triceps"],
    equipment: ["Dumbbells"],
    setup: [
      "Start with dumbbells at shoulder height",
      "Palms facing toward you",
      "Elbows in front of body",
      "Core braced"
    ],
    execution: [
      "Rotate palms outward while pressing up",
      "Finish with palms facing forward",
      "Reverse motion on descent",
      "Continuous smooth rotation"
    ],
    commonMistakes: [
      "Rotating too early or late",
      "Using momentum",
      "Incomplete rotation",
      "Arching back"
    ],
    modifications: {
      easier: "Seated or lighter weights",
      harder: "Standing or slower tempo"
    },
    breathingPattern: "Exhale up, inhale down"
  },  "single-arm-dumbbell-rows": {
    name: "Single Arm Dumbbell Rows",
    category: "Upper Body",
    primaryMuscles: ["Lats", "Middle Back", "Biceps"],
    equipment: ["Dumbbell", "Bench"],
    setup: [
      "Place one knee and hand on bench",
      "Other foot on floor, leg straight",
      "Back parallel to floor",
      "Hold dumbbell with free hand"
    ],
    execution: [
      "Row dumbbell to hip/lower ribs",
      "Keep elbow close to body",
      "Squeeze shoulder blade at top",
      "Lower with control"
    ],
    commonMistakes: [
      "Rotating torso",
      "Using momentum",
      "Pulling to shoulder instead of hip",
      "Rounding back"
    ],
    modifications: {
      easier: "Use lighter weight or support more on bench",
      harder: "Pause at top or slow tempo"
    },
    breathingPattern: "Exhale on pull, inhale on descent"
  },

  "bent-over-dumbbell-rows": {
    name: "Bent Over Dumbbell Rows",
    category: "Upper Body",
    primaryMuscles: ["Lats", "Middle Back", "Biceps"],
    equipment: ["Dumbbells"],
    setup: [
      "Hinge at hips, knees slightly bent",
      "Back straight, nearly parallel to floor",
      "Hold dumbbells hanging straight down",
      "Core engaged"
    ],
    execution: [
      "Row dumbbells to lower ribs",
      "Keep elbows close to body",
      "Squeeze shoulder blades together",
      "Lower with control"
    ],
    commonMistakes: [
      "Standing too upright",
      "Rounding back",
      "Using momentum",
      "Pulling to chest instead of hips"
    ],
    modifications: {
      easier: "Support torso on incline bench",
      harder: "Pause at top or single arm"
    },
    breathingPattern: "Exhale on row, inhale on release"
  },

  "dumbbell-renegade-rows": {
    name: "Dumbbell Renegade Rows",
    category: "Upper Body",
    primaryMuscles: ["Back", "Core", "Shoulders"],
    equipment: ["Dumbbells"],
    setup: [
      "Start in plank position holding dumbbells",
      "Feet wider than shoulders for stability",
      "Body in straight line",
      "Core extremely tight"
    ],
    execution: [
      "Row one dumbbell to hip",
      "Minimize hip rotation",
      "Lower with control",
      "Alternate sides"
    ],
    commonMistakes: [
      "Excessive hip rotation",
      "Sagging hips",
      "Rushing the movement",
      "Poor plank position"
    ],
    modifications: {
      easier: "Perform from knees or use lighter weights",
      harder: "Narrow stance or add push-up between rows"
    },
    breathingPattern: "Exhale on row, inhale on descent"
  },

  "dumbbell-push-press": {
    name: "Dumbbell Push Press",
    category: "Upper Body",
    primaryMuscles: ["Shoulders", "Triceps", "Legs"],
    equipment: ["Dumbbells"],
    setup: [
      "Stand with feet hip-width apart",
      "Hold dumbbells at shoulders",
      "Core braced",
      "Slight bend in knees"
    ],
    execution: [
      "Dip by bending knees slightly",
      "Drive through legs explosively",
      "Press dumbbells overhead using leg drive",
      "Lock out arms overhead"
    ],
    commonMistakes: [
      "Dipping too deep",
      "Not using leg drive",
      "Pressing forward instead of up",
      "Arching back excessively"
    ],
    modifications: {
      easier: "Strict press or lighter weights",
      harder: "Push jerk or heavier weights"
    },
    breathingPattern: "Inhale on dip, exhale on drive"
  },

  "dumbbell-push-jerks": {
    name: "Dumbbell Push Jerks",
    category: "Upper Body",
    primaryMuscles: ["Shoulders", "Triceps", "Legs"],
    equipment: ["Dumbbells"],
    setup: [
      "Stand with feet hip-width apart",
      "Dumbbells at shoulders",
      "Core tight",
      "Ready for explosive movement"
    ],
    execution: [
      "Dip and drive like push press",
      "As weights go up, drop under them",
      "Catch in partial squat position",
      "Stand to complete rep"
    ],
    commonMistakes: [
      "Not dropping under weight",
      "Poor timing",
      "Unstable catch position",
      "Pressing instead of jerking"
    ],
    modifications: {
      easier: "Push press or lighter weights",
      harder: "Split jerk or heavier weights"
    },
    breathingPattern: "Inhale dip, exhale on jerk"
  },

  "dumbbell-high-pulls": {
    name: "Dumbbell High Pulls",
    category: "Upper Body",
    primaryMuscles: ["Traps", "Shoulders", "Upper Back"],
    equipment: ["Dumbbells"],
    setup: [
      "Stand with feet hip-width apart",
      "Hold dumbbells in front of thighs",
      "Slight bend in knees",
      "Core engaged"
    ],
    execution: [
      "Explosively pull dumbbells up",
      "Lead with elbows",
      "Pull to chest/chin height",
      "Lower with control"
    ],
    commonMistakes: [
      "Using only arms",
      "Pulling too wide",
      "Lack of explosiveness",
      "Hyperextending back"
    ],
    modifications: {
      easier: "Lighter weights or upright row",
      harder: "From hang position or heavier weights"
    },
    breathingPattern: "Exhale on pull, inhale on descent"
  },

  "dumbbell-upright-rows": {
    name: "Dumbbell Upright Rows",
    category: "Upper Body",
    primaryMuscles: ["Shoulders", "Traps"],
    equipment: ["Dumbbells"],
    setup: [
      "Stand with feet hip-width apart",
      "Hold dumbbells in front of thighs",
      "Palms facing body",
      "Slight bend in knees"
    ],
    execution: [
      "Pull dumbbells straight up body",
      "Lead with elbows",
      "Stop at chest height",
      "Lower with control"
    ],
    commonMistakes: [
      "Pulling too high (shoulder impingement)",
      "Using momentum",
      "Wrists above elbows",
      "Leaning back"
    ],
    modifications: {
      easier: "Wider grip or lighter weights",
      harder: "Pause at top or cable variation"
    },
    breathingPattern: "Exhale up, inhale down"
  },

  "dumbbell-snatches": {
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

  "dumbbell-chest-fly-to-press": {
    name: "Dumbbell Chest Fly to Press",
    category: "Upper Body",
    primaryMuscles: ["Chest", "Shoulders", "Triceps"],
    equipment: ["Dumbbells", "Bench"],
    setup: [
      "Lie on bench with dumbbells extended above chest",
      "Slight bend in elbows",
      "Palms facing each other",
      "Core engaged"
    ],
    execution: [
      "Lower weights out to sides (fly motion)",
      "Feel stretch in chest",
      "Bring weights together",
      "Then press straight up"
    ],
    commonMistakes: [
      "Going too deep on fly",
      "Straightening arms completely",
      "Rushing between movements",
      "Uneven motion"
    ],
    modifications: {
      easier: "Just flyes or just presses",
      harder: "Pause at bottom or incline"
    },
    breathingPattern: "Inhale on fly down, exhale on press up"
  },

  // LOWER BODY EXERCISES
  "dumbbell-goblet-squats": {
    name: "Dumbbell Goblet Squats",
    category: "Lower Body",
    primaryMuscles: ["Quads", "Glutes", "Core"],
    equipment: ["Dumbbell"],
    setup: [
      "Hold dumbbell vertical at chest",
      "Feet shoulder-width apart",
      "Toes slightly turned out",
      "Elbows inside knees path"
    ],
    execution: [
      "Squat down between knees",
      "Keep chest up and core tight",
      "Go as deep as mobility allows",
      "Drive through heels to stand"
    ],
    commonMistakes: [
      "Knees caving inward",
      "Heels coming up",
      "Rounding back",
      "Not reaching depth"
    ],
    modifications: {
      easier: "Box squat or bodyweight",
      harder: "Pause at bottom or heavier weight"
    },
    breathingPattern: "Inhale down, exhale up"
  },

  "dumbbell-front-squats": {
    name: "Dumbbell Front Squats",
    category: "Lower Body",
    primaryMuscles: ["Quads", "Core", "Glutes"],
    equipment: ["Dumbbells"],
    setup: [
      "Hold dumbbells at shoulders",
      "Elbows high and forward",
      "Feet shoulder-width apart",
      "Core braced"
    ],
    execution: [
      "Squat down keeping torso upright",
      "Maintain high elbow position",
      "Descend to parallel or below",
      "Drive up through heels"
    ],
    commonMistakes: [
      "Elbows dropping",
      "Leaning forward",
      "Knees caving",
      "Rising with hips first"
    ],
    modifications: {
      easier: "Goblet squat or lighter weights",
      harder: "Pause squats or tempo"
    },
    breathingPattern: "Inhale down, exhale up"
  },  "dumbbell-romanian-deadlifts": {
    name: "Dumbbell Romanian Deadlifts",
    category: "Lower Body",
    primaryMuscles: ["Hamstrings", "Glutes", "Lower Back"],
    equipment: ["Dumbbells"],
    setup: [
      "Stand with feet hip-width apart",
      "Hold dumbbells in front of thighs",
      "Slight bend in knees",
      "Shoulders back"
    ],
    execution: [
      "Push hips back while lowering weights",
      "Keep dumbbells close to legs",
      "Feel stretch in hamstrings",
      "Drive hips forward to return"
    ],
    commonMistakes: [
      "Rounding back",
      "Bending knees too much",
      "Weight drifting forward",
      "Not pushing hips back"
    ],
    modifications: {
      easier: "Reduce range of motion",
      harder: "Single leg or deficit"
    },
    breathingPattern: "Inhale down, exhale up"
  },

  "dumbbell-sumo-deadlifts": {
    name: "Dumbbell Sumo Deadlifts",
    category: "Lower Body",
    primaryMuscles: ["Glutes", "Hamstrings", "Inner Thighs"],
    equipment: ["Dumbbell"],
    setup: [
      "Wide stance with toes pointed out",
      "Hold dumbbell with both hands",
      "Dumbbell between legs",
      "Chest up, shoulders back"
    ],
    execution: [
      "Lower by pushing hips back",
      "Keep knees tracking over toes",
      "Lower until dumbbell near floor",
      "Drive through heels to stand"
    ],
    commonMistakes: [
      "Knees caving inward",
      "Rounding back",
      "Stance too narrow",
      "Not engaging glutes"
    ],
    modifications: {
      easier: "Elevate weight on blocks",
      harder: "Deficit or pause at bottom"
    },
    breathingPattern: "Inhale down, exhale up"
  },

  "dumbbell-bulgarian-split-squats": {
    name: "Dumbbell Bulgarian Split Squats",
    category: "Lower Body",
    primaryMuscles: ["Quads", "Glutes", "Balance"],
    equipment: ["Dumbbells", "Bench/Box"],
    setup: [
      "Rear foot elevated on bench",
      "Front foot 2-3 feet forward",
      "Hold dumbbells at sides",
      "Torso upright"
    ],
    execution: [
      "Lower straight down",
      "Front knee tracks over toes",
      "Back knee toward floor",
      "Drive through front heel"
    ],
    commonMistakes: [
      "Leaning forward",
      "Front foot too close",
      "Pushing off back foot",
      "Knee caving inward"
    ],
    modifications: {
      easier: "Bodyweight or hold one dumbbell",
      harder: "Front foot elevated or tempo"
    },
    breathingPattern: "Inhale down, exhale up"
  },

  "dumbbell-reverse-lunges": {
    name: "Dumbbell Reverse Lunges",
    category: "Lower Body",
    primaryMuscles: ["Quads", "Glutes", "Balance"],
    equipment: ["Dumbbells"],
    setup: [
      "Stand with feet hip-width apart",
      "Hold dumbbells at sides",
      "Core engaged",
      "Eyes forward"
    ],
    execution: [
      "Step back into lunge position",
      "Lower until both knees at 90 degrees",
      "Push through front heel to return",
      "Alternate legs or complete one side"
    ],
    commonMistakes: [
      "Stepping too short",
      "Leaning forward",
      "Knee passing toes",
      "Pushing off back foot"
    ],
    modifications: {
      easier: "Bodyweight or static lunges",
      harder: "Deficit or walking lunges"
    },
    breathingPattern: "Inhale down, exhale up"
  },

  "dumbbell-walking-lunges": {
    name: "Dumbbell Walking Lunges",
    category: "Lower Body",
    primaryMuscles: ["Quads", "Glutes", "Balance"],
    equipment: ["Dumbbells"],
    setup: [
      "Stand with dumbbells at sides",
      "Feet hip-width apart",
      "Core tight",
      "Space to walk forward"
    ],
    execution: [
      "Step forward into lunge",
      "Lower until knees at 90 degrees",
      "Push through front heel",
      "Bring back foot forward and repeat"
    ],
    commonMistakes: [
      "Steps too short or long",
      "Torso leaning",
      "Wobbly balance",
      "Rushing movement"
    ],
    modifications: {
      easier: "Static lunges or bodyweight",
      harder: "Overhead carry or tempo"
    },
    breathingPattern: "Inhale down, exhale up"
  },

  "dumbbell-goblet-curtsy-lunges": {
    name: "Dumbbell Goblet Curtsy Lunges",
    category: "Lower Body",
    primaryMuscles: ["Glutes", "Quads", "Inner/Outer Thighs"],
    equipment: ["Dumbbell"],
    setup: [
      "Hold dumbbell at chest (goblet position)",
      "Feet hip-width apart",
      "Core engaged",
      "Shoulders back"
    ],
    execution: [
      "Step one leg behind and across",
      "Lower into curtsy position",
      "Keep front knee over ankle",
      "Push through front heel to return"
    ],
    commonMistakes: [
      "Knee caving inward",
      "Losing balance",
      "Not crossing far enough",
      "Rotating hips"
    ],
    modifications: {
      easier: "Bodyweight or hold wall",
      harder: "Deficit or continuous reps"
    },
    breathingPattern: "Inhale down, exhale up"
  },

  "single-leg-dumbbell-deadlifts": {
    name: "Single-leg Dumbbell Deadlifts",
    category: "Lower Body",
    primaryMuscles: ["Hamstrings", "Glutes", "Balance"],
    equipment: ["Dumbbell"],
    setup: [
      "Stand on one leg",
      "Hold dumbbell in opposite hand",
      "Slight bend in standing knee",
      "Core engaged"
    ],
    execution: [
      "Hinge at hip, extending free leg back",
      "Lower dumbbell toward floor",
      "Keep hips square",
      "Return to standing"
    ],
    commonMistakes: [
      "Rotating hips",
      "Rounding back",
      "Locked standing knee",
      "Rushing movement"
    ],
    modifications: {
      easier: "Kickstand stance or hold wall",
      harder: "Eyes closed or unstable surface"
    },
    breathingPattern: "Inhale down, exhale up"
  },

  "dumbbell-single-leg-hip-thrusts": {
    name: "Dumbbell Single Leg Hip Thrusts",
    category: "Lower Body",
    primaryMuscles: ["Glutes", "Hamstrings"],
    equipment: ["Dumbbell", "Bench"],
    setup: [
      "Shoulders on bench",
      "One foot planted, other leg extended",
      "Dumbbell on hip of working leg",
      "Core braced"
    ],
    execution: [
      "Drive through heel to lift hips",
      "Squeeze glute at top",
      "Keep extended leg straight",
      "Lower with control"
    ],
    commonMistakes: [
      "Hyperextending back",
      "Using back leg",
      "Partial range of motion",
      "Losing dumbbell position"
    ],
    modifications: {
      easier: "Both feet down or bodyweight",
      harder: "Pause at top or band around knees"
    },
    breathingPattern: "Exhale up, inhale down"
  },

  "dumbbell-calf-raises": {
    name: "Dumbbell Calf Raises",
    category: "Lower Body",
    primaryMuscles: ["Calves"],
    equipment: ["Dumbbells"],
    setup: [
      "Stand with balls of feet on edge",
      "Hold dumbbells at sides",
      "Heels hanging off edge",
      "Stand tall"
    ],
    execution: [
      "Rise up onto toes as high as possible",
      "Pause at top",
      "Lower heels below platform level",
      "Feel stretch in calves"
    ],
    commonMistakes: [
      "Bouncing",
      "Partial range of motion",
      "Bending knees",
      "Leaning forward"
    ],
    modifications: {
      easier: "Bodyweight or flat ground",
      harder: "Single leg or slow tempo"
    },
    breathingPattern: "Exhale up, inhale down"
  },

  "dumbbell-jump-squats": {
    name: "Dumbbell Jump Squats",
    category: "Lower Body",
    primaryMuscles: ["Quads", "Glutes", "Calves"],
    equipment: ["Dumbbells"],
    setup: [
      "Hold light dumbbells at sides",
      "Feet shoulder-width apart",
      "Core tight",
      "Ready to explode"
    ],
    execution: [
      "Squat down to parallel",
      "Explode up jumping as high as possible",
      "Land softly in squat position",
      "Immediately repeat"
    ],
    commonMistakes: [
      "Landing with locked knees",
      "Using too heavy weights",
      "Poor landing mechanics",
      "Not reaching full depth"
    ],
    modifications: {
      easier: "Bodyweight or don't leave ground",
      harder: "Higher jumps or single leg"
    },
    breathingPattern: "Inhale down, exhale on jump"
  },

  "dumbbell-squat-to-press": {
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

  "dumbbell-clean-and-press": {
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

  "dumbbell-deadlift-to-high-pull": {
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

  "dumbbell-step-ups": {
    name: "Dumbbell Step-ups",
    category: "Lower Body",
    primaryMuscles: ["Quads", "Glutes", "Balance"],
    equipment: ["Dumbbells", "Box/Bench"],
    setup: [
      "Stand facing box/bench",
      "Hold dumbbells at sides",
      "Box at knee height",
      "Core engaged"
    ],
    execution: [
      "Place full foot on box",
      "Drive through heel to step up",
      "Stand tall on box",
      "Control descent"
    ],
    commonMistakes: [
      "Pushing off back leg",
      "Partial foot on box",
      "Using momentum",
      "Box too high"
    ],
    modifications: {
      easier: "Lower box or bodyweight",
      harder: "Higher box or knee drive at top"
    },
    breathingPattern: "Exhale up, inhale down"
  },

  // FULL BODY / COMPOUND EXERCISES
  "dumbbell-thrusters": {
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

  "dumbbell-man-makers": {
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

  "dumbbell-swings": {
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

  "burpees": {
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

  "mountain-climbers": {
    name: "Mountain Climbers",
    category: "Core/Cardio",
    primaryMuscles: ["Core", "Shoulders", "Hip Flexors"],
    equipment: ["None"],
    setup: [
      "Start in plank position",
      "Hands under shoulders",
      "Body in straight line",
      "Core tight"
    ],
    execution: [
      "Drive one knee toward chest",
      "Quickly switch legs",
      "Keep hips low",
      "Maintain plank position"
    ],
    commonMistakes: [
      "Hips too high",
      "Bouncing",
      "Hands too far forward",
      "Incomplete knee drive"
    ],
    modifications: {
      easier: "Slower pace or hands elevated",
      harder: "Cross-body or hands on ball"
    },
    breathingPattern: "Steady breathing throughout"
  },

  // CORE EXERCISES
  "plank": {
    name: "Plank",
    category: "Core",
    primaryMuscles: ["Core", "Shoulders"],
    equipment: ["None"],
    setup: [
      "Forearms on ground",
      "Elbows under shoulders",
      "Feet hip-width apart",
      "Body in straight line"
    ],
    execution: [
      "Hold position",
      "Keep hips level",
      "Engage entire core",
      "Breathe normally"
    ],
    commonMistakes: [
      "Hips too high or sagging",
      "Head dropping",
      "Holding breath",
      "Elbows too far forward"
    ],
    modifications: {
      easier: "Knees down or shorter time",
      harder: "Single leg or weighted"
    },
    breathingPattern: "Normal breathing throughout"
  },

  // CARDIO EXERCISES
  "stationary-bike": {
    name: "Stationary Bike",
    category: "Cardio",
    primaryMuscles: ["Legs", "Cardiovascular System"],
    equipment: ["Stationary Bike"],
    setup: [
      "Adjust seat height (slight knee bend at bottom)",
      "Hands comfortable on handlebars",
      "Core engaged",
      "Proper posture"
    ],
    execution: [
      "Pedal at prescribed pace",
      "Maintain consistent cadence",
      "Use resistance as needed",
      "Keep core engaged"
    ],
    commonMistakes: [
      "Seat too high or low",
      "Slouching",
      "Gripping handlebars too tight",
      "Pedaling with just toes"
    ],
    modifications: {
      easier: "Lower resistance or pace",
      harder: "Increase resistance or intervals"
    },
    breathingPattern: "Steady breathing throughout"
  },

  "jump-rope": {
    name: "Jump Rope",
    category: "Cardio",
    primaryMuscles: ["Calves", "Shoulders", "Cardiovascular System"],
    equipment: ["Jump Rope"],
    setup: [
      "Hold handles at hip height",
      "Elbows close to body",
      "Rope behind heels",
      "Slight bend in knees"
    ],
    execution: [
      "Turn rope with wrists",
      "Jump just high enough to clear rope",
      "Land on balls of feet",
      "Keep rhythm steady"
    ],
    commonMistakes: [
      "Jumping too high",
      "Arms too wide",
      "Landing on heels",
      "Uneven rhythm"
    ],
    modifications: {
      easier: "Single unders or no rope",
      harder: "Double unders or speed"
    },
    breathingPattern: "Rhythmic breathing"
  },

  // MOBILITY/WARM-UP EXERCISES
  "arm-circles": {
    name: "Arm Circles",
    category: "Warm-up",
    primaryMuscles: ["Shoulders"],
    equipment: ["None"],
    setup: [
      "Stand with arms extended to sides",
      "Feet hip-width apart",
      "Core engaged",
      "Arms parallel to floor"
    ],
    execution: [
      "Make small circles forward",
      "Gradually increase size",
      "Reverse direction",
      "Control the movement"
    ],
    commonMistakes: [
      "Moving too fast",
      "Shrugging shoulders",
      "Bending elbows",
      "Uncontrolled movement"
    ],
    modifications: {
      easier: "Smaller circles",
      harder: "Hold light weights"
    },
    breathingPattern: "Normal breathing"
  },

  "inchworms": {
    name: "Inchworms",
    category: "Warm-up",
    primaryMuscles: ["Core", "Hamstrings", "Shoulders"],
    equipment: ["None"],
    setup: [
      "Stand with feet hip-width apart",
      "Arms at sides",
      "Slight bend in knees",
      "Core engaged"
    ],
    execution: [
      "Hinge forward, place hands on floor",
      "Walk hands forward to plank",
      "Hold briefly",
      "Walk feet to hands and stand"
    ],
    commonMistakes: [
      "Rushing movement",
      "Not reaching full plank",
      "Bending knees too much",
      "Sagging hips in plank"
    ],
    modifications: {
      easier: "Bend knees more or partial range",
      harder: "Add push-up in plank"
    },
    breathingPattern: "Exhale walking out, inhale walking in"
  },

  // Lower body specific
  "jumping-lunges": {
    name: "Jumping Lunges",
    category: "Lower Body",
    primaryMuscles: ["Quads", "Glutes", "Calves"],
    equipment: ["None"],
    setup: [
      "Start in lunge position",
      "Both knees at 90 degrees",
      "Core tight",
      "Arms ready to help"
    ],
    execution: [
      "Jump up explosively",
      "Switch legs in air",
      "Land in opposite lunge",
      "Immediately repeat"
    ],
    commonMistakes: [
      "Landing too hard",
      "Shallow lunges",
      "Loss of balance",
      "Knee caving"
    ],
    modifications: {
      easier: "Alternating reverse lunges",
      harder: "Add weight or continuous"
    },
    breathingPattern: "Exhale on jump"
  },

  "air-squats": {
    name: "Air Squats",
    category: "Lower Body",
    primaryMuscles: ["Quads", "Glutes"],
    equipment: ["None"],
    setup: [
      "Feet shoulder-width apart",
      "Toes slightly out",
      "Arms extended forward",
      "Core braced"
    ],
    execution: [
      "Squat down to parallel or below",
      "Keep knees tracking over toes",
      "Weight in heels",
      "Drive up to standing"
    ],
    commonMistakes: [
      "Knees caving inward",
      "Heels rising",
      "Not reaching depth",
      "Leaning forward"
    ],
    modifications: {
      easier: "Box squat or partial range",
      harder: "Jump squats or single leg"
    },
    breathingPattern: "Inhale down, exhale up"
  },

  "jump-squats": {
    name: "Jump Squats",
    category: "Lower Body",
    primaryMuscles: ["Quads", "Glutes", "Calves"],
    equipment: ["None"],
    setup: [
      "Feet shoulder-width apart",
      "Arms at sides",
      "Core engaged",
      "Ready to explode"
    ],
    execution: [
      "Squat down to parallel",
      "Jump up explosively",
      "Reach arms overhead",
      "Land softly and repeat"
    ],
    commonMistakes: [
      "Landing with locked knees",
      "Not reaching full depth",
      "Poor landing position",
      "Lack of explosion"
    ],
    modifications: {
      easier: "Squat to calf raise",
      harder: "Weighted or box jumps"
    },
    breathingPattern: "Inhale down, exhale on jump"
  },

  "glute-bridges": {
    name: "Glute Bridges",
    category: "Lower Body",
    primaryMuscles: ["Glutes", "Hamstrings"],
    equipment: ["None"],
    setup: [
      "Lie on back, knees bent",
      "Feet flat on floor",
      "Arms at sides",
      "Core engaged"
    ],
    execution: [
      "Drive through heels",
      "Lift hips to create straight line",
      "Squeeze glutes at top",
      "Lower with control"
    ],
    commonMistakes: [
      "Hyperextending back",
      "Pushing through toes",
      "Not squeezing glutes",
      "Rushing movement"
    ],
    modifications: {
      easier: "Hold at top",
      harder: "Single leg or weighted"
    },
    breathingPattern: "Exhale up, inhale down"
  }
};

// Helper functions for exercise lookup
export function getExerciseByName(name) {
  // Convert name to key format (lowercase, hyphenated)
  const key = name.toLowerCase().replace(/\s+/g, '-');
  return exerciseDatabase[key] || null;
}

export function getExercisesByCategory(category) {
  return Object.values(exerciseDatabase).filter(
    exercise => exercise.category === category
  );
}

export function getExercisesByMuscle(muscle) {
  return Object.values(exerciseDatabase).filter(
    exercise => exercise.primaryMuscles.includes(muscle)
  );
}

export function getAllExercises() {
  return Object.values(exerciseDatabase);
}

export function getExerciseCategories() {
  const categories = new Set();
  Object.values(exerciseDatabase).forEach(exercise => {
    categories.add(exercise.category);
  });
  return Array.from(categories);
}

export function searchExercises(searchTerm) {
  const term = searchTerm.toLowerCase();
  return Object.values(exerciseDatabase).filter(exercise => 
    exercise.name.toLowerCase().includes(term) ||
    exercise.primaryMuscles.some(muscle => muscle.toLowerCase().includes(term)) ||
    exercise.category.toLowerCase().includes(term)
  );
}

// Export the database
export default exerciseDatabase;