// src/data/exercises/newPullupChallengeExercises.js

export const newPullupChallengeExercises = [
  {
    id: "inverted-rows",
    name: "Inverted Rows",
    category: "Upper Body",
    primaryMuscles: ["Back", "Biceps", "Grip"],
    equipment: ["Barbell in Rack", "TRX", "Table"],
    setup: [
      "Set a barbell in a squat rack at about waist height, or use a sturdy table edge.",
      "Lie on the floor underneath the bar and grip it with an overhand grip, slightly wider than your shoulders.",
      "Your body should be in a straight line from your head to your heels, with your heels on the ground."
    ],
    execution: [
      "Engage your core and glutes to keep your body rigid.",
      "Pull your chest up to the bar by retracting your shoulder blades and pulling with your arms.",
      "Pause for a moment at the top.",
      "Lower your body back down with control until your arms are fully extended."
    ],
    commonMistakes: [
      "Sagging the hips.",
      "Not pulling high enough (incomplete range of motion).",
      "Using momentum to swing the body up."
    ],
    modifications: {
      easier: "Bend your knees and place your feet flat on the floor, or raise the bar height to make your body more vertical.",
      harder: "Elevate your feet on a box or bench."
    },
    breathingPattern: "Exhale on the pull, inhale on the descent."
  },
  {
    id: "hollow-body-hold",
    name: "Hollow Body Hold",
    category: "Core",
    primaryMuscles: ["Abdominals", "Core"],
    equipment: ["None"],
    setup: [
      "Lie on your back with your arms and legs extended.",
      "Press your lower back firmly into the floor. There should be no gap."
    ],
    execution: [
      "Simultaneously lift your legs and shoulders a few inches off the floor.",
      "Keep your arms extended overhead and legs straight.",
      "Your body should form a shallow 'banana' or boat shape.",
      "Hold this position, maintaining lower back contact with the floor."
    ],
    commonMistakes: [
      "Allowing the lower back to arch off the floor.",
      "Lifting legs or shoulders too high.",
      "Holding breath."
    ],
    modifications: {
      easier: "Tuck your knees towards your chest or bend your knees at 90 degrees.",
      harder: "Perform hollow body rocks by gently rocking back and forth."
    },
    breathingPattern: "Breathe shallowly but consistently."
  },
  {
    id: "hollow-body-rocks",
    name: "Hollow Body Rocks",
    category: "Core",
    primaryMuscles: ["Abdominals", "Core"],
    equipment: ["None"],
    setup: [
      "Establish a solid hollow body hold position with your lower back pressed into the floor."
    ],
    execution: [
      "Initiate a gentle rocking motion from your shoulders to your heels.",
      "Maintain the hollow body shape throughout; the movement should be controlled.",
      "The entire body moves as one solid unit."
    ],
    commonMistakes: [
      "Breaking the hollow position (piking at the hips or arching the back).",
      "Using momentum instead of core control to rock."
    ],
    modifications: {
      easier: "Perform with knees tucked to make the shape smaller and easier to control.",
      harder: "Increase the amplitude of the rock while maintaining perfect form."
    },
    breathingPattern: "Maintain a steady breathing rhythm."
  },
  {
    id: "chin-over-bar-holds",
    name: "Chin-over-Bar Holds",
    category: "Upper Body",
    primaryMuscles: ["Lats", "Biceps", "Grip"],
    equipment: ["Pullup Bar", "Box"],
    setup: [
      "Place a box under the pull-up bar.",
      "Use the box to jump up so that your chin is above the bar."
    ],
    execution: [
      "Hold this top position for as long as possible.",
      "Focus on squeezing your back and bicep muscles.",
      "Keep your core tight to prevent swinging."
    ],
    commonMistakes: [
      "Resting the chin on the bar.",
      "Shoulders shrugging up to the ears."
    ],
    modifications: {
      easier: "Use a resistance band to assist the hold.",
      harder: "Add a slight negative descent at the end of the hold."
    },
    breathingPattern: "Breathe as steadily as possible during the hold."
  },
  {
    id: "towel-hangs",
    name: "Towel Hangs",
    category: "Upper Body",
    primaryMuscles: ["Grip", "Forearms"],
    equipment: ["Pullup Bar", "Towel"],
    setup: [
      "Drape a sturdy towel over a pull-up bar."
    ],
    execution: [
      "Grip one end of the towel with each hand.",
      "Hang from the towel with your arms fully extended.",
      "Maintain an active shoulder position to protect the joints.",
      "Hold for the prescribed time."
    ],
    commonMistakes: [
      "Using a flimsy towel.",
      "Letting shoulders become completely passive."
    ],
    modifications: {
      easier: "Use a thicker towel (easier to grip) or keep feet lightly on the ground for support.",
      harder: "Perform single-arm hangs."
    },
    breathingPattern: "Breathe deeply and steadily."
  },
  {
    id: "wrist-rotations",
    name: "Wrist Rotations",
    category: "Warm-up",
    primaryMuscles: ["Forearms", "Wrists"],
    equipment: ["None"],
    setup: [ "Stand or sit, and extend your arms forward." ],
    execution: [ "Gently rotate your wrists in a circular motion, 10 times clockwise and 10 times counter-clockwise." ],
    commonMistakes: ["Moving too quickly."],
    modifications: { easier: "Perform with elbows bent.", harder: "Hold a very light object like a can of soup." },
    breathingPattern: "Breathe normally."
  },
  {
    id: "wall-slides",
    name: "Wall Slides",
    category: "Warm-up",
    primaryMuscles: ["Shoulders", "Upper Back"],
    equipment: ["Wall"],
    setup: [ "Stand with your back against a wall, feet about 6 inches away from it.", "Place your arms against the wall in a 'goalpost' position (90-degree bend at elbows)." ],
    execution: [ "Keeping your elbows, wrists, and the back of your hands in contact with the wall, slowly slide your arms overhead.", "Go as high as you can without losing contact.", "Slowly slide back down to the starting position." ],
    commonMistakes: ["Arching the lower back.", "Allowing wrists or elbows to come off the wall."],
    modifications: { easier: "Don't slide as high.", harder: "Perform lying on the floor to ensure a flat back." },
    breathingPattern: "Exhale on the way up, inhale on the way down."
  },
  {
    id: "lat-stretch",
    name: "Lat Stretch",
    category: "Cool-down",
    primaryMuscles: ["Lats", "Shoulders"],
    equipment: ["Wall", "Rack"],
    setup: [ "Stand facing a wall or pole." ],
    execution: [ "Grab the pole or place your palms on the wall.", "Hinge at your hips and sit back, keeping your arms straight, until you feel a deep stretch in your lats and shoulders.", "Hold for the prescribed time." ],
    commonMistakes: ["Rounding the back."],
    modifications: { easier: "Don't hinge as deeply.", harder: "Gently pull from side to side to deepen the stretch." },
    breathingPattern: "Breathe deeply into the stretch."
  },
  {
    id: "bicep-stretch",
    name: "Bicep Stretch",
    category: "Cool-down",
    primaryMuscles: ["Biceps", "Chest"],
    equipment: ["Wall"],
    setup: [ "Stand next to a wall." ],
    execution: [ "Place the palm of one hand on the wall with your arm extended straight.", "Gently turn your body away from the wall until you feel a stretch in your bicep and chest.", "Hold for the prescribed time and then switch sides." ],
    commonMistakes: ["Shrugging the shoulder."],
    modifications: { easier: "Don't turn as far away from the wall.", harder: "Slightly change the angle of your hand on the wall." },
    breathingPattern: "Breathe deeply."
  },
  {
    id: "doorway-chest-stretch",
    name: "Doorway Chest Stretch",
    category: "Cool-down",
    primaryMuscles: ["Chest", "Shoulders"],
    equipment: ["Doorway"],
    setup: [ "Stand in a doorway and place your forearms on the frame, with your elbows bent at 90 degrees." ],
    execution: [ "Step forward with one foot until you feel a gentle stretch across your chest.", "Hold for the prescribed time." ],
    commonMistakes: ["Stretching too aggressively.", "Arching the back."],
    modifications: { easier: "Don't step as far forward.", harder: "Raise or lower your arms on the door frame to target different parts of the chest." },
    breathingPattern: "Breathe deeply."
  },
  {
    id: "cross-body-shoulder-stretch",
    name: "Cross-Body Shoulder Stretch",
    category: "Cool-down",
    primaryMuscles: ["Shoulders"],
    equipment: ["None"],
    setup: [ "Stand or sit tall." ],
    execution: [ "Bring one arm straight across your chest.", "Use your other hand to gently pull the arm closer to your body, feeling a stretch in the shoulder.", "Hold for the prescribed time and switch sides." ],
    commonMistakes: ["Pulling on the elbow joint.", "Shrugging the shoulder."],
    modifications: { easier: "Reduce the pressure.", harder: "N/A" },
    breathingPattern: "Breathe deeply."
  },
  // --- NEW EXERCISE ---
  {
    id: "walking",
    name: "Walking",
    category: "Cardio",
    primaryMuscles: ["Cardiovascular System", "Legs"],
    equipment: ["None"],
    setup: ["Wear comfortable shoes.", "Maintain an upright posture."],
    execution: ["Walk at a steady, brisk pace.", "Swing your arms naturally.", "Focus on consistent breathing."],
    commonMistakes: ["Slouching.", "Walking too slowly to elevate heart rate."],
    modifications: { easier: "Walk at a slower pace.", harder: "Walk on an incline or carry light weights." },
    breathingPattern: "Breathe naturally and rhythmically."
  },
];