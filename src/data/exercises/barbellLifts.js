export const barbellLifts = [
  {
    id: "squat",
    name: "Barbell Back Squats",
    category: "Lower Body",
    primaryMuscles: ["Quads", "Glutes", "Hamstrings", "Core"],
    equipment: ["Barbell", "Rack"],
    setup: [
      "Set the barbell in a rack at about collarbone height.",
      "Position yourself under the bar, resting it on your upper back/traps (not your neck).",
      "Grip the bar firmly with hands slightly wider than your shoulders.",
      "Stand up to un-rack the bar, take 1-2 steps back.",
      "Place your feet shoulder-width apart, with toes pointing slightly out."
    ],
    execution: [
      "Take a deep breath and brace your core.",
      "Squat down sending your hips back and down, as if sitting in a chair.",
      "Keep your chest up and back straight.",
      "Descend until your hip crease is below the top of your knee (below parallel).",
      "Drive through your mid-foot to stand up, exhaling on the way up."
    ],
    commonMistakes: [
      "Knees caving inward (valgus collapse).",
      "Leaning too far forward (good morning squat).",
      "Not hitting sufficient depth.",
      "Lifting heels off the ground."
    ],
    modifications: {
      easier: "Perform box squats or goblet squats with a dumbbell/kettlebell.",
      harder: "Add weight, or incorporate pauses or tempo changes."
    },
    breathingPattern: "Inhale and brace at the top, hold breath during descent, exhale on ascent."
  },
  {
    id: "bench_press",
    name: "Barbell Bench Press",
    category: "Upper Body",
    primaryMuscles: ["Chest", "Triceps", "Shoulders"],
    equipment: ["Barbell", "Rack", "Bench"],
    setup: [
      "Lie on the bench with your feet flat on the floor and your eyes under the bar.",
      "Grip the bar with hands slightly wider than shoulder-width.",
      "Arch your upper back, retract your shoulder blades, and drive them into the bench.",
      "Un-rack the bar and hold it steady over your chest."
    ],
    execution: [
      "Lower the bar to your mid-chest with control, keeping your elbows tucked at a 45-75 degree angle.",
      "Lightly touch your chest with the bar.",
      "Press the bar back up to the starting position explosively.",
      "Keep your glutes on the bench and feet on the floor throughout."
    ],
    commonMistakes: [
      "Flaring elbows out to 90 degrees.",
      "Bouncing the bar off the chest.",
      "Lifting hips off the bench.",
      "Not controlling the descent."
    ],
    modifications: {
      easier: "Use dumbbells for more stability or perform push-ups.",
      harder: "Add weight, or incorporate pauses or chains/bands."
    },
    breathingPattern: "Inhale on descent, exhale on press."
  },
  {
    id: "barbell-row",
    name: "Barbell Row",
    category: "Upper Body",
    primaryMuscles: ["Lats", "Middle Back", "Biceps"],
    equipment: ["Barbell"],
    setup: [
      "Stand with feet hip-width apart, with the barbell over your mid-foot.",
      "Hinge at your hips and grip the bar with an overhand grip, slightly wider than your shoulders.",
      "Keep your back straight, chest up, and torso nearly parallel to the floor."
    ],
    execution: [
      "Pull the barbell up towards your lower chest/upper abdomen.",
      "Focus on driving your elbows back and squeezing your shoulder blades together.",
      "Hold the contraction at the top for a moment.",
      "Lower the bar with control back to the starting position."
    ],
    commonMistakes: [
      "Rounding the back.",
      "Using momentum and body English to lift the weight.",
      "Standing too upright.",
      "Pulling the bar to your chest with flared elbows."
    ],
    modifications: {
      easier: "Use lighter weight or perform dumbbell rows with chest support on an incline bench.",
      harder: "Use a Pendlay row (starting from a dead stop on the floor each rep)."
    },
    breathingPattern: "Exhale on the pull, inhale on the descent."
  },
  {
    id: "overhead_press",
    name: "Barbell Overhead Press (OHP)",
    category: "Upper Body",
    primaryMuscles: ["Shoulders", "Triceps", "Core"],
    equipment: ["Barbell", "Rack"],
    setup: [
      "Set the barbell in a rack at shoulder height.",
      "Grip the bar slightly wider than shoulder-width, with your forearms vertical.",
      "Un-rack the bar so it rests on your front deltoids. Squeeze your glutes and brace your core."
    ],
    execution: [
      "Press the bar straight overhead. You may need to tilt your head back slightly to clear the bar path.",
      "Once the bar passes your head, push your head 'through the window' so the bar is aligned over your spine.",
      "Lock out your elbows at the top.",
      "Lower the bar with control back to the starting rack position."
    ],
    commonMistakes: [
      "Leaning back excessively and turning it into an incline press.",
      "Not keeping the core and glutes tight.",
      "Pressing the bar out in front of the body instead of straight up."
    ],
    modifications: {
      easier: "Use dumbbells or perform a seated press.",
      harder: "Use a push press to handle heavier weight."
    },
    breathingPattern: "Take a breath at the bottom, exhale through the sticking point on the way up."
  },
  {
    id: "deadlift",
    name: "Barbell Deadlift",
    category: "Full Body",
    primaryMuscles: ["Hamstrings", "Glutes", "Lower Back", "Full Body"],
    equipment: ["Barbell"],
    setup: [
      "Stand with your feet hip-width apart, with the middle of your feet under the barbell.",
      "Hinge at your hips and bend your knees to grip the bar. Use a double-overhand or mixed grip.",
      "Your back should be flat, chest up, and shins touching the bar."
    ],
    execution: [
      "Take a deep breath and brace your core.",
      "Drive through your feet, pushing the floor away. The bar should travel in a straight vertical line.",
      "As the bar passes your knees, drive your hips forward to meet the bar.",
      "Finish by standing tall, squeezing your glutes. Do not hyperextend your back.",
      "Lower the bar with control by reversing the motion: hinge at the hips first, then bend your knees."
    ],
    commonMistakes: [
      "Rounding the lower back.",
      "Letting the bar drift away from the body.",
      "Jerking the bar off the floor instead of pulling.",
      "Hyperextending the back at the top."
    ],
    modifications: {
      easier: "Perform rack pulls or Romanian deadlifts with lighter weight.",
      harder: "Increase weight or use variations like deficit deadlifts."
    },
    breathingPattern: "Inhale and brace at the bottom, hold breath during lift, exhale at the top or during descent."
  },
  {
    id: "band-pull-aparts",
    name: "Band Pull-Aparts",
    category: "Warm-up",
    primaryMuscles: ["Rear Delts", "Upper Back"],
    equipment: ["Resistance Band"],
    setup: [
      "Stand tall with your feet shoulder-width apart.",
      "Hold a light resistance band with an overhand grip, hands shoulder-width apart.",
      "Hold your arms straight out in front of you at chest height."
    ],
    execution: [
      "Keeping your arms straight, pull the band apart by retracting your shoulder blades.",
      "Focus on squeezing your upper back muscles together.",
      "Hold the contraction for a moment when the band touches your chest.",
      "Return to the starting position with control."
    ],
    commonMistakes: [
      "Bending the elbows.",
      "Shrugging the shoulders up towards the ears.",
      "Using a band that is too heavy, causing poor form."
    ],
    modifications: {
      easier: "Use a lighter band or move hands further apart on the band.",
      harder: "Use a heavier band or perform with a pause."
    },
    breathingPattern: "Exhale as you pull apart, inhale on return."
  },
  {
    id: "couch-stretch",
    name: "Couch Stretch",
    category: "Cool-down",
    primaryMuscles: ["Hip Flexors", "Quadriceps"],
    equipment: ["Wall", "Bench/Couch"],
    setup: [
      "Kneel in front of a wall or couch on a padded surface.",
      "Place the top of one foot against the wall with your shin vertical.",
      "Step your other foot forward into a lunge position."
    ],
    execution: [
      "Keeping your core engaged, slowly raise your torso to an upright position.",
      "You should feel an intense stretch in the quad and hip flexor of the back leg.",
      "Squeeze the glute of the back leg to deepen the stretch.",
      "Hold for the prescribed time and then carefully switch sides."
    ],
    commonMistakes: [
      "Arching the lower back excessively.",
      "Not being able to get the torso upright.",
      "Forcing the stretch."
    ],
    modifications: {
      easier: "Move your front foot and back knee further away from the wall. Place hands on the floor or blocks for support.",
      harder: "Move your back knee closer to the wall and try to bring your torso fully upright."
    },
    breathingPattern: "Breathe deeply and slowly, trying to relax into the stretch."
  },
    {
    id: "thrusters",
    name: "Barbell Thruster",
    category: "Full Body",
    primaryMuscles: ["Quads", "Glutes", "Shoulders", "Core"],
    equipment: ["Barbell"],
    setup: [
      "Take the barbell from a rack into a front rack position, resting on your shoulders with elbows high.",
      "Stand with feet shoulder-width apart, toes slightly out.",
      "Keep your core braced and your torso upright."
    ],
    execution: [
      "Descend into a full front squat, keeping your chest up and elbows high.",
      "As you reach the bottom, explosively drive up through your heels.",
      "Use the momentum from the squat to press the barbell directly overhead to full lockout.",
      "Lower the bar with control back to the front rack position to begin the next rep."
    ],
    commonMistakes: [
      "Not hitting full squat depth.",
      "Pausing at the top of the squat before pressing.",
      "Pressing the bar forward instead of straight up.",
      "Letting elbows drop during the squat."
    ],
    modifications: {
      easier: "Use lighter weight, dumbbells, or perform a separate front squat and push press.",
      harder: "Increase the weight or perform for high-volume, unbroken sets."
    },
    breathingPattern: "Inhale on the descent, explosive exhale during the press."
},
    {
    id: "barbell-clean-and-jerk",
    name: "Barbell Clean and Jerk",
    category: "Full Body",
    primaryMuscles: ["Full Body", "Quads", "Glutes", "Shoulders"],
    equipment: ["Barbell"],
    setup: [
      "Stand with feet hip-width apart, barbell on the floor over the mid-foot.",
      "Grip the bar with a hook grip, slightly wider than your shoulders.",
      "Back flat, chest up, shoulders over the bar."
    ],
    execution: [
      "1. (Clean): Drive through the legs to lift the bar from the floor.",
      "2. Explosively extend your hips, shrug your shoulders, and pull your body under the bar.",
      "3. Receive the bar in a front squat position with elbows high.",
      "4. Stand up fully to complete the clean.",
      "5. (Jerk): Dip straight down by bending your knees.",
      "6. Drive explosively up, pressing the bar overhead while splitting or dropping your feet.",
      "7. Bring your feet back together to complete the lift with the bar locked out overhead."
    ],
    commonMistakes: [
      "Pulling early with the arms.",
      "Bar drifting away from the body.",
      "Poor receiving position in the squat.",
      "Pressing the bar out instead of dropping under it for the jerk."
    ],
    modifications: {
      easier: "Perform a Power Clean and a Push Press. Use a lighter weight.",
      harder: "Increase weight or perform touch-and-go reps."
    },
    breathingPattern: "Inhale before clean, exhale on stand. Inhale before jerk, exhale on lockout."
  },
  {
    id: "barbell-snatch",
    name: "Barbell Snatch",
    category: "Full Body",
    primaryMuscles: ["Full Body", "Hamstrings", "Glutes", "Shoulders"],
    equipment: ["Barbell"],
    setup: [
      "Stand with feet hip-width apart, barbell on the floor over the mid-foot.",
      "Take a wide grip on the bar (a 'snatch grip').",
      "Back flat, chest up, hips low, shoulders over the bar."
    ],
    execution: [
      "1. Explosively extend your hips and knees while keeping the bar close to your body.",
      "2. As the bar passes your hips, extend fully and shrug powerfully.",
      "3. Pull your body under the bar, receiving it in a full overhead squat position.",
      "4. The bar should travel in a smooth, continuous motion from the floor to overhead.",
      "5. Stand up from the squat to complete the lift."
    ],
    commonMistakes: [
      "Bar looping out in front of the body.",
      "Incomplete hip extension.",
      "Pressing the bar out at the top instead of punching under.",
      "Unstable overhead squat position."
    ],
    modifications: {
      easier: "Perform a Power Snatch (receiving in a partial squat) or Hang Snatch (starting from above the knee).",
      harder: "Increase weight or perform snatch complexes."
    },
    breathingPattern: "Inhale before pull, explosive exhale as you extend and receive."
  },
    {
    id: "barbell-hang-power-clean",
    name: "Barbell Hang Power Clean",
    category: "Full Body",
    primaryMuscles: ["Hamstrings", "Glutes", "Traps", "Shoulders"],
    equipment: ["Barbell"],
    setup: [
      "Start standing with the barbell held at the 'hang' position (typically mid-thigh).",
      "Feet are hip-width apart, back is straight, chest is up.",
      "Shoulders should be slightly in front of the bar."
    ],
    execution: [
      "Initiate by pushing your hips back slightly, then drive them forward explosively.",
      "Shrug your shoulders and pull the bar upward, keeping it close to your body.",
      "As the bar reaches chest height, quickly drop under it, rotating your elbows around.",
      "Receive the bar in a partial squat (power position) on your front shoulders.",
      "Stand up to complete the movement."
    ],
    commonMistakes: [
      "Pulling with the arms too early.",
      "The bar swinging away from the body.",
      "Not being fast with the elbows to get into the rack position.",
      "Catching the bar too low (a full squat clean)."
    ],
    modifications: {
      easier: "Use a lighter weight, or practice with dumbbells. Focus on the 'high pull' portion.",
      harder: "Increase the weight or perform reps for time."
    },
    breathingPattern: "Inhale at the hang, explosive exhale as you drive and pull."
  },
  {
    id: "barbell-push-jerk",
    name: "Barbell Push Jerk",
    category: "Upper Body",
    primaryMuscles: ["Shoulders", "Triceps", "Quads"],
    equipment: ["Barbell"],
    setup: [
      "Start with the barbell in the front rack position, resting on your shoulders.",
      "Grip should be slightly wider than your shoulders, with elbows high.",
      "Feet are hip-width apart, core is braced."
    ],
    execution: [
      "1. (Dip): Dip straight down by bending your knees about 4-6 inches.",
      "2. (Drive): Explosively drive up with your legs, creating upward momentum on the bar.",
      "3. (Jerk): As the bar leaves your shoulders, quickly drop *under* the bar by bending your knees again.",
      "4. Catch the bar with locked-out arms in a stable partial squat.",
      "5. Stand up to complete the lift with the bar overhead."
    ],
    commonMistakes: [
      "Pressing the bar with the arms instead of driving with the legs.",
      "Dipping forward instead of straight down.",
      "Not dropping under the bar to receive it.",
      "Unstable overhead position."
    ],
    modifications: {
      easier: "Perform a Push Press (no second dip). Use lighter weight.",
      harder: "Perform a Split Jerk, which requires more technique but allows for heavier weight."
    },
    breathingPattern: "Inhale on the dip, exhale on the drive and jerk."
  },
  {
    id: "squat-clean",
    name: "Squat Clean",
    category: "Full Body",
    primaryMuscles: ["Quads", "Glutes", "Hamstrings", "Back", "Shoulders"],
    equipment: ["Barbell"],
    setup: [
      "Stand with feet hip-width apart, barbell on the floor over the mid-foot.",
      "Grip the bar with a hook grip, slightly wider than your shoulders.",
      "Back flat, chest up, shoulders over the bar."
    ],
    execution: [
      "Drive through the legs to lift the bar from the floor.",
      "Explosively extend your hips, shrug your shoulders, and pull your body under the bar.",
      "Receive the bar in a full front squat position with elbows high.",
      "Drive up from the squat to a standing position to complete the lift."
    ],
    commonMistakes: [
      "Pulling early with the arms.",
      "The bar swinging out away from the body.",
      "Receiving the bar in a power position instead of a full squat.",
      "Elbows dropping in the bottom of the squat."
    ],
    modifications: {
      easier: "Perform a Power Clean or use a lighter weight.",
      harder: "Increase weight or perform touch-and-go reps."
    },
    breathingPattern: "Inhale before the pull, exhale as you stand."
  }
];