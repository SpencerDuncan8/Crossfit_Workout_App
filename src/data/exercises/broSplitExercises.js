// src/data/exercises/broSplitExercises.js
// New exercises added for the "Home Iron: Finisher" (Bro Split) template.
// Also fixes missing IDs already referenced by other Home Iron templates
// (mcgill-curl-up, side-plank, dumbbell-curl, dumbbell-lateral-raises).

export const broSplitExercises = [
  // ───────────── CORE / McGILL BIG 3 ─────────────
  {
    id: "mcgill-curl-up",
    name: "McGill Curl-up",
    category: "Core",
    primaryMuscles: ["Abdominals", "Core"],
    equipment: ["None"],
    setup: [
      "Lie on your back with one knee bent and the other leg straight.",
      "Place your hands palms-down under the natural arch of your lower back.",
      "Keep your neck neutral and your gaze on the ceiling."
    ],
    execution: [
      "Brace your abs lightly, as if preparing for a poke in the stomach.",
      "Lift your head and shoulders a few inches off the floor as one unit. Do not flex your spine or tuck your chin.",
      "Hold for 6 seconds, breathing steadily.",
      "Lower with control. Complete 6 holds, then switch which knee is bent."
    ],
    commonMistakes: [
      "Crunching the spine instead of lifting as one unit.",
      "Holding your breath.",
      "Flattening the lower back into the hands."
    ],
    modifications: {
      easier: "Lift only your head and keep shoulders down.",
      harder: "Lift your elbows off the floor during the hold."
    },
    breathingPattern: "Breathe steadily and shallowly during the hold"
  },
  {
    id: "side-plank",
    name: "Side Plank",
    category: "Core",
    primaryMuscles: ["Obliques", "Core", "Glutes"],
    equipment: ["None"],
    setup: [
      "Lie on your side with your elbow directly under your shoulder.",
      "Stack your feet (or stagger them for balance) and keep your legs straight."
    ],
    execution: [
      "Lift your hips so your body forms a straight line from head to heels.",
      "Keep your hips stacked and your neck neutral.",
      "Hold for the prescribed time (6 seconds x 6 reps for the McGill Big 3), then repeat on the other side."
    ],
    commonMistakes: [
      "Letting the hips sag toward the floor.",
      "Rolling the torso forward or backward.",
      "Shrugging the shoulder up to the ear."
    ],
    modifications: {
      easier: "Bend your knees and support from the knees instead of the feet.",
      harder: "Lift the top leg or add a hip dip."
    },
    breathingPattern: "Breathe steadily throughout the hold"
  },
  {
    id: "leg-raises",
    name: "Leg Raises",
    category: "Core",
    primaryMuscles: ["Lower Abs", "Hip Flexors"],
    equipment: ["None"],
    setup: [
      "Lie flat on your back with your legs straight.",
      "Place your hands under your hips or by your sides for support."
    ],
    execution: [
      "Press your lower back into the floor and brace your core.",
      "Raise your straight legs until they point at the ceiling.",
      "Lower slowly until your heels hover just above the floor without touching.",
      "Repeat without letting your lower back arch."
    ],
    commonMistakes: [
      "Arching the lower back off the floor.",
      "Swinging the legs with momentum.",
      "Dropping the legs too fast."
    ],
    modifications: {
      easier: "Bend your knees slightly or raise one leg at a time.",
      harder: "Add a pause at the bottom or perform hanging leg raises."
    },
    breathingPattern: "Exhale as you raise, inhale as you lower"
  },
  {
    id: "ab-wheel-rollout",
    name: "Ab Wheel Rollout",
    category: "Core",
    primaryMuscles: ["Abdominals", "Core", "Lats", "Shoulders"],
    equipment: ["Ab Wheel"],
    setup: [
      "Kneel on a mat and grip the ab wheel with both hands under your shoulders.",
      "Tuck your pelvis and round your upper back slightly."
    ],
    execution: [
      "Brace your abs and roll the wheel forward slowly, extending your body.",
      "Go only as far as you can while keeping your hips and ribs locked in place.",
      "Pull the wheel back toward your knees using your abs and lats."
    ],
    commonMistakes: [
      "Letting the lower back sag or arch.",
      "Reaching too far before you have the strength.",
      "Using the hips to pull the wheel back."
    ],
    modifications: {
      easier: "Roll out against a wall or shorten the range of motion.",
      harder: "Roll out from the feet or add a pause at full extension."
    },
    breathingPattern: "Inhale as you roll out, exhale as you pull back"
  },

  // ───────────── CHEST ─────────────
  {
    id: "dips",
    name: "Parallel Bar Dips",
    category: "Upper Body",
    primaryMuscles: ["Chest", "Triceps", "Shoulders"],
    equipment: ["Dip Bars"],
    setup: [
      "Grip the parallel bars and press up to a locked-out support position.",
      "Lean your torso slightly forward to bias the chest and keep your legs behind you."
    ],
    execution: [
      "Lower your body by bending your elbows until your upper arms are about parallel to the floor.",
      "Keep your elbows at roughly 45 degrees from your body.",
      "Press back up to full lockout."
    ],
    commonMistakes: [
      "Going too deep and straining the shoulders.",
      "Flaring the elbows wide.",
      "Swinging or kipping the legs."
    ],
    modifications: {
      easier: "Use a band for assistance or perform bench dips.",
      harder: "Add weight with a dip belt or slow the lowering phase."
    },
    breathingPattern: "Inhale on the way down, exhale on the press"
  },
  {
    id: "dumbbell-pullover",
    name: "Dumbbell Pullover",
    category: "Upper Body",
    primaryMuscles: ["Chest", "Lats", "Triceps"],
    equipment: ["Dumbbell", "Bench"],
    setup: [
      "Lie across or along a bench with your upper back supported.",
      "Hold one dumbbell with both hands above your chest, arms nearly straight."
    ],
    execution: [
      "Keeping a slight bend in your elbows, lower the dumbbell back behind your head in an arc until you feel a deep stretch in your chest and lats.",
      "Pull the dumbbell back over your chest using your chest and lats.",
      "Keep your ribs down and core braced throughout."
    ],
    commonMistakes: [
      "Bending the elbows so much it becomes a triceps extension.",
      "Flaring the ribs and arching the lower back.",
      "Using a weight that is too heavy for control."
    ],
    modifications: {
      easier: "Use a lighter dumbbell and a smaller range of motion.",
      harder: "Slow the lowering phase and pause at the stretch."
    },
    breathingPattern: "Inhale as you lower, exhale as you pull up"
  },
  {
    id: "dumbbell-incline-fly",
    name: "Incline Dumbbell Fly",
    category: "Upper Body",
    primaryMuscles: ["Upper Chest", "Shoulders"],
    equipment: ["Dumbbells", "Incline Bench"],
    setup: [
      "Set a bench to a 30-45 degree incline and lie back with a dumbbell in each hand.",
      "Press the dumbbells above your chest with palms facing each other and a slight bend in your elbows."
    ],
    execution: [
      "Lower the dumbbells out to the sides in a wide arc until you feel a stretch across your chest.",
      "Keep the slight elbow bend fixed throughout the movement.",
      "Squeeze your chest to bring the dumbbells back together above you."
    ],
    commonMistakes: [
      "Straightening and bending the elbows, turning it into a press.",
      "Lowering too far and straining the shoulders.",
      "Using too much weight."
    ],
    modifications: {
      easier: "Use lighter dumbbells or reduce the range of motion.",
      harder: "Add a pause at the bottom or slow the tempo."
    },
    breathingPattern: "Inhale as you open, exhale as you squeeze together"
  },

  // ───────────── BACK ─────────────
  {
    id: "meadows-row",
    name: "Meadows Row",
    category: "Upper Body",
    primaryMuscles: ["Lats", "Upper Back", "Biceps"],
    equipment: ["Barbell", "Landmine Attachment"],
    setup: [
      "Place one end of a barbell in a landmine or corner and load the free end.",
      "Stand perpendicular to the bar with a staggered stance and hinge forward at the hips.",
      "Grip the thick end of the bar (by the plates) with an overhand grip."
    ],
    execution: [
      "Keep your back flat and pull your elbow up and back toward your hip.",
      "Squeeze your lat at the top.",
      "Lower the bar with control until your arm is fully extended. Complete all reps, then switch sides."
    ],
    commonMistakes: [
      "Rounding the back.",
      "Using momentum from the legs or torso.",
      "Pulling with the arm instead of driving the elbow."
    ],
    modifications: {
      easier: "Support your free hand on a bench or your knee.",
      harder: "Pause at the top of each rep or use heavier weight."
    },
    breathingPattern: "Exhale as you pull, inhale as you lower"
  },

  // ───────────── ARMS ─────────────
  {
    id: "ez-bar-curl",
    name: "EZ Bar Curl",
    category: "Upper Body",
    primaryMuscles: ["Biceps", "Forearms"],
    equipment: ["EZ Bar"],
    setup: [
      "Stand tall holding an EZ bar with an underhand grip on the angled sections.",
      "Keep your elbows at your sides and your feet shoulder-width apart."
    ],
    execution: [
      "Curl the bar up toward your shoulders while keeping your elbows pinned.",
      "Squeeze your biceps at the top.",
      "Lower the bar slowly to full arm extension."
    ],
    commonMistakes: [
      "Swinging the torso to lift the bar.",
      "Letting the elbows drift forward.",
      "Cutting the range of motion short."
    ],
    modifications: {
      easier: "Use a lighter bar or perform seated.",
      harder: "Slow the lowering phase to 3 seconds."
    },
    breathingPattern: "Exhale as you curl, inhale as you lower"
  },
  {
    id: "skull-crusher",
    name: "Skull Crusher",
    category: "Upper Body",
    primaryMuscles: ["Triceps"],
    equipment: ["EZ Bar", "Bench"],
    setup: [
      "Lie on a flat bench holding an EZ bar with a shoulder-width overhand grip.",
      "Press the bar over your chest with arms extended."
    ],
    execution: [
      "Keeping your upper arms still, bend your elbows to lower the bar toward your forehead.",
      "Stop just above your head, then extend your elbows to return to the start.",
      "Keep your elbows pointed at the ceiling, not flaring out."
    ],
    commonMistakes: [
      "Flaring the elbows wide.",
      "Letting the upper arms drift back and turn it into a pullover.",
      "Using too much weight and losing control."
    ],
    modifications: {
      easier: "Use dumbbells or a lighter bar.",
      harder: "Use a slow 3-second lowering phase."
    },
    breathingPattern: "Inhale as you lower, exhale as you extend"
  },
  {
    id: "dumbbell-curl",
    name: "Dumbbell Bicep Curl",
    category: "Upper Body",
    primaryMuscles: ["Biceps"],
    equipment: ["Dumbbells"],
    setup: [
      "Stand tall with a dumbbell in each hand, arms at your sides and palms facing forward.",
      "Keep your elbows tucked against your ribs."
    ],
    execution: [
      "Curl both dumbbells up toward your shoulders without moving your elbows.",
      "Squeeze your biceps at the top.",
      "Lower slowly to full extension."
    ],
    commonMistakes: [
      "Swinging the body for momentum.",
      "Moving the elbows forward.",
      "Dropping the weights quickly."
    ],
    modifications: {
      easier: "Use lighter weights or alternate arms.",
      harder: "Slow the lowering phase or add a pause at the top."
    },
    breathingPattern: "Exhale as you curl, inhale as you lower"
  },
  {
    id: "hammer-curls",
    name: "Dumbbell Hammer Curl",
    category: "Upper Body",
    primaryMuscles: ["Biceps", "Brachialis", "Forearms"],
    equipment: ["Dumbbells"],
    setup: [
      "Stand tall holding a dumbbell in each hand with palms facing your thighs (neutral grip).",
      "Keep your elbows pinned to your sides."
    ],
    execution: [
      "Curl the dumbbells up toward your shoulders, keeping your palms facing each other.",
      "Squeeze at the top without letting your elbows drift forward.",
      "Lower under control."
    ],
    commonMistakes: [
      "Swinging the weights up with the body.",
      "Rotating the wrists during the curl.",
      "Rushing the lowering phase."
    ],
    modifications: {
      easier: "Alternate arms with lighter weights.",
      harder: "Use heavier dumbbells or a slower tempo."
    },
    breathingPattern: "Exhale as you curl, inhale as you lower"
  },

  // ───────────── SHOULDERS ─────────────
  {
    id: "dumbbell-lateral-raises",
    name: "Dumbbell Lateral Raise",
    category: "Upper Body",
    primaryMuscles: ["Side Delts", "Shoulders"],
    equipment: ["Dumbbells"],
    setup: [
      "Stand with a dumbbell in each hand at your sides, knees slightly bent.",
      "Keep a slight bend in your elbows."
    ],
    execution: [
      "Raise your arms out to the sides until they reach about shoulder height.",
      "Lead with your elbows, not your hands.",
      "Lower slowly to the start."
    ],
    commonMistakes: [
      "Using momentum and swinging the torso.",
      "Raising the dumbbells above shoulder height.",
      "Shrugging the traps."
    ],
    modifications: {
      easier: "Use lighter weights or perform one arm at a time.",
      harder: "Pause at the top or slow the lowering phase."
    },
    breathingPattern: "Exhale as you raise, inhale as you lower"
  },
  {
    id: "chest-supported-rear-delt-fly",
    name: "Chest Supported Rear Delt Fly",
    category: "Upper Body",
    primaryMuscles: ["Rear Delts", "Upper Back"],
    equipment: ["Dumbbells", "Incline Bench"],
    setup: [
      "Set a bench to a 30-45 degree incline and lie face-down with your chest against the pad.",
      "Hold a dumbbell in each hand, arms hanging straight down."
    ],
    execution: [
      "With a slight bend in your elbows, raise your arms out to the sides until they are in line with your shoulders.",
      "Squeeze your shoulder blades together at the top.",
      "Lower under control."
    ],
    commonMistakes: [
      "Using too much weight and swinging.",
      "Shrugging the shoulders up toward the ears.",
      "Lifting the chest off the pad."
    ],
    modifications: {
      easier: "Use lighter dumbbells.",
      harder: "Pause for one second at the top of each rep."
    },
    breathingPattern: "Exhale as you raise, inhale as you lower"
  },
  {
    id: "dumbbell-front-raises",
    name: "Dumbbell Front Raise",
    category: "Upper Body",
    primaryMuscles: ["Front Delts", "Shoulders"],
    equipment: ["Dumbbells"],
    setup: [
      "Stand tall holding a dumbbell in each hand in front of your thighs, palms facing your body."
    ],
    execution: [
      "Raise one or both dumbbells straight in front of you to shoulder height with a slight elbow bend.",
      "Pause briefly at the top.",
      "Lower slowly without swinging."
    ],
    commonMistakes: [
      "Leaning back and using momentum.",
      "Raising the weights above shoulder height.",
      "Using weights that are too heavy."
    ],
    modifications: {
      easier: "Alternate arms or use lighter dumbbells.",
      harder: "Use a slow tempo or hold at the top."
    },
    breathingPattern: "Exhale as you raise, inhale as you lower"
  },

  // ───────────── LEGS ─────────────
  {
    id: "romanian-deadlift",
    name: "Barbell Romanian Deadlift",
    category: "Lower Body",
    primaryMuscles: ["Hamstrings", "Glutes", "Lower Back"],
    equipment: ["Barbell"],
    setup: [
      "Stand holding a barbell at hip height with an overhand grip, feet hip-width apart.",
      "Keep your knees softly bent and your chest up."
    ],
    execution: [
      "Push your hips straight back while keeping the bar close to your legs.",
      "Lower until you feel a strong stretch in your hamstrings, with a flat back.",
      "Drive your hips forward to stand tall, squeezing your glutes."
    ],
    commonMistakes: [
      "Rounding the lower back.",
      "Bending the knees too much and turning it into a squat.",
      "Letting the bar drift away from the legs."
    ],
    modifications: {
      easier: "Use dumbbells or a lighter barbell.",
      harder: "Add a pause at the bottom or slow the lowering phase."
    },
    breathingPattern: "Inhale as you lower, exhale as you stand"
  },
  {
    id: "leg-extensions",
    name: "Leg Extension",
    category: "Lower Body",
    primaryMuscles: ["Quads"],
    equipment: ["Leg Extension Machine"],
    setup: [
      "Sit in the machine with your back against the pad and the roller resting on your lower shins.",
      "Adjust the seat so your knees line up with the machine's pivot point."
    ],
    execution: [
      "Extend your legs until they are straight, squeezing your quads at the top.",
      "Lower the weight slowly back to the start without letting the stack slam."
    ],
    commonMistakes: [
      "Swinging the weight up with momentum.",
      "Lifting the hips off the seat.",
      "Dropping the weight quickly."
    ],
    modifications: {
      easier: "Use lighter weight or perform one leg at a time.",
      harder: "Pause for 2 seconds at the top or use a slow lowering phase."
    },
    breathingPattern: "Exhale as you extend, inhale as you lower"
  },
  {
    id: "leg-curls",
    name: "Leg Curl",
    category: "Lower Body",
    primaryMuscles: ["Hamstrings"],
    equipment: ["Leg Curl Machine"],
    setup: [
      "Adjust the machine so the pad rests just above your heels and your knees line up with the pivot.",
      "Lie face-down (or sit, depending on the machine) and grip the handles."
    ],
    execution: [
      "Curl your heels toward your glutes, squeezing your hamstrings.",
      "Pause briefly at the top.",
      "Lower the weight slowly to full extension."
    ],
    commonMistakes: [
      "Lifting the hips off the pad.",
      "Using momentum.",
      "Cutting the range of motion short."
    ],
    modifications: {
      easier: "Use lighter weight or perform one leg at a time.",
      harder: "Slow the lowering phase to 3 seconds."
    },
    breathingPattern: "Exhale as you curl, inhale as you lower"
  },

  // ───────────── COOL-DOWN ─────────────
  {
    id: "calf-stretch",
    name: "Calf Stretch",
    category: "Cool-down",
    primaryMuscles: ["Calves"],
    equipment: ["None"],
    setup: [
      "Stand facing a wall with your hands on it at chest height.",
      "Step one foot back with your heel flat on the floor and your toes pointing forward."
    ],
    execution: [
      "Keep your back leg straight and lean your hips toward the wall until you feel a stretch in your calf.",
      "Hold for 30-60 seconds, then switch legs."
    ],
    commonMistakes: [
      "Lifting the back heel off the floor.",
      "Turning the back foot outward.",
      "Bouncing in the stretch."
    ],
    modifications: {
      easier: "Step the back foot closer to the wall.",
      harder: "Bend the back knee slightly to target the lower calf."
    },
    breathingPattern: "Breathe deeply and steadily"
  },
];