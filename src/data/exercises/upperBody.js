// src/data/exercises/upperBody.js

export const upperBodyExercises = [
  {
    id: "dumbbell-bench-press",
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
  {
    id: "dumbbell-incline-press",
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
  {
    id: "pullups",
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
  {
    id: "weighted-pullups",
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
  {
    id: "push-ups",
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
  {
    id: "explosive-push-ups",
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
  {
    id: "plyometric-push-ups",
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
  {
    id: "clapping-push-ups",
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
  {
    id: "dumbbell-shoulder-press",
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
  {
    id: "dumbbell-arnold-press",
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
  },
  {
    id: "single-arm-dumbbell-rows",
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
  {
    id: "bent-over-dumbbell-rows",
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
  {
    id: "dumbbell-renegade-rows",
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
  {
    id: "dumbbell-push-press",
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
  {
    id: "dumbbell-push-jerks",
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
  {
    id: "dumbbell-high-pulls",
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
  {
    id: "dumbbell-upright-rows",
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
  {
    id: "dumbbell-chest-fly-to-press",
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
  {
    id: "shoulder-taps",
    name: "Shoulder Taps",
    category: "Upper Body",
    primaryMuscles: ["Core", "Shoulders"],
    equipment: ["None"],
    setup: ["Start in a high plank position with your feet shoulder-width apart.", "The wider your feet, the more stable you'll be."],
    execution: ["Keeping your hips as still as possible, lift one hand to tap the opposite shoulder.", "Return the hand to the floor and repeat on the other side.", "Alternate in a slow, controlled manner."],
    commonMistakes: ["Rocking the hips from side to side.", "Moving too quickly.", "Sagging the back."],
    modifications: { easier: "Widen your feet or perform from your knees.", harder: "Bring your feet closer together." },
    breathingPattern: "Exhale as you tap"
  },
  {
    id: "dips-chair",
    name: "Dips (using chair/bench)",
    category: "Upper Body",
    primaryMuscles: ["Triceps", "Chest", "Shoulders"],
    equipment: ["Bench/Chair"],
    setup: ["Sit on the edge of a sturdy chair or bench.", "Place your hands on the edge, fingers pointing forward, next to your hips.", "Slide your hips forward off the bench, with your legs either bent (easier) or straight (harder)."],
    execution: ["Lower your body by bending your elbows until they are at a 90-degree angle.", "Keep your back close to the bench.", "Press through your palms to return to the starting position."],
    commonMistakes: ["Going too low and straining shoulders.", "Letting hips drift away from the bench.", "Flaring elbows out."],
    modifications: { easier: "Bend your knees to reduce the load.", harder: "Straighten your legs or elevate your feet." },
    breathingPattern: "Inhale down, exhale up"
  },
  {
    id: "hand-release-push-ups",
    name: "Hand-Release Push-ups",
    category: "Upper Body",
    primaryMuscles: ["Chest", "Triceps", "Back"],
    equipment: ["None"],
    setup: ["Start in a standard push-up position."],
    execution: ["Lower your entire body to the floor with control.", "At the bottom, lift both hands completely off the floor for a moment.", "Place your hands back down and push up explosively back to the plank position."],
    commonMistakes: ["'Worming' up by lifting the chest before the hips.", "Not fully lifting the hands."],
    modifications: { easier: "Perform from your knees.", harder: "Add a clap after the hand release." },
    breathingPattern: "Inhale down, exhale on the explosive push"
  },
  {
    id: "handstand-hold",
    name: "Handstand Hold (against wall)",
    category: "Upper Body",
    primaryMuscles: ["Shoulders", "Core", "Triceps"],
    equipment: ["Wall"],
    setup: ["Place your hands on the floor about 6-12 inches away from a wall."],
    execution: ["Kick up one leg at a time to get your feet onto the wall.", "Find your balance and press firmly through your hands.", "Keep your body tight and in a straight line. Hold for the prescribed time."],
    commonMistakes: ["Arching the back.", "Bending the elbows.", "Looking at the floor instead of between the hands."],
    modifications: { easier: "Perform a 'wall walk' by walking feet up the wall into an inverted position.", harder: "Move hands further from the wall or practice free-standing." },
    breathingPattern: "Breathe steadily and consistently"
  }
];