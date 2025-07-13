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
  }
];