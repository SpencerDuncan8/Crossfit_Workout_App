// src/data/exercises/coreAndCardio.js

export const coreAndCardioExercises = [
  {
    id: "mountain-climbers",
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
  {
    id: "plank",
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
  {
    id: "stationary-bike",
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
  {
    id: "jump-rope",
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
  {
    id: "jumping-jack",
    name: "Jumping Jack",
    category: "Cardio",
    primaryMuscles: ["Full Body", "Cardiovascular System"],
    equipment: ["None"],
    setup: ["Stand upright with your legs together, arms at your sides."],
    execution: [
      "Slightly bend your knees and jump into the air.",
      "As you jump, spread your legs to be about shoulder-width apart.",
      "Stretch your arms out and over your head in a wide arc.",
      "Jump back to the starting position, lowering your arms.",
    ],
    commonMistakes: ["Not completing the full range of motion with arms or legs.", "Landing with straight knees."],
    modifications: {
      easier: "Step one foot out to the side at a time (Step-Jacks).",
      harder: "Increase speed or perform star jumps.",
    },
    breathingPattern: "Breathe naturally and rhythmically"
  },
  {
    id: "sit-up",
    name: "Sit-up",
    category: "Core",
    primaryMuscles: ["Abdominals", "Hip Flexors"],
    equipment: ["None"],
    setup: ["Lie on your back with knees bent and feet flat on the floor.", "You can anchor your feet under a heavy object or have a partner hold them."],
    execution: [
      "Engage your core and lift your upper body all the way up towards your knees.",
      "Keep your back straight.",
      "Slowly lower your upper body back to the floor.",
    ],
    commonMistakes: ["Using your neck to pull yourself up.", "Using momentum instead of core strength.", "Lifting the lower back off the floor at the start."],
    modifications: {
      easier: "Perform crunches, only lifting your shoulders off the floor.",
      harder: "Hold a weight plate on your chest or perform V-Ups.",
    },
    breathingPattern: "Exhale on the way up, inhale on the way down"
  },
  {
    id: "v-up",
    name: "V-Up",
    category: "Core",
    primaryMuscles: ["Abdominals", "Hip Flexors"],
    equipment: ["None"],
    setup: [
      "Lie flat on your back with your arms extended overhead and legs straight."
    ],
    execution: [
      "Simultaneously lift your legs and upper body off the floor, keeping them straight.",
      "Reach your hands towards your toes, forming a 'V' shape with your body.",
      "Slowly lower back to the starting position with control."
    ],
    commonMistakes: [
        "Bending the knees or elbows.",
        "Rounding the back excessively.",
        "Dropping back to the floor without control."
    ],
    modifications: {
        easier: "Perform a 'tuck-up' by bringing your knees to your chest instead of keeping legs straight.",
        harder: "Hold a light weight in your hands."
    },
    breathingPattern: "Exhale on the way up, inhale on the way down"
  },
  {
    id: "high-knees",
    name: "High Knees",
    category: "Cardio",
    primaryMuscles: ["Hip Flexors", "Core", "Cardiovascular System"],
    equipment: ["None"],
    setup: ["Stand with your feet hip-width apart."],
    execution: [
      "Begin by running in place, but focus on driving your knees up towards your chest.",
      "Aim to bring your knees to at least hip height.",
      "Pump your arms in coordination with your legs.",
    ],
    commonMistakes: ["Leaning back.", "Not lifting knees high enough.", "Landing heavily on the heels."],
    modifications: {
      easier: "March in place, lifting knees high without the jumping motion.",
      harder: "Increase the speed and height of the knees.",
    },
    breathingPattern: "Breathe naturally and rhythmically"
  },
  {
    id: "knees-to-elbows",
    name: "Knees to Elbows",
    category: "Core",
    primaryMuscles: ["Abdominals", "Hip Flexors", "Lats"],
    equipment: ["Pullup Bar"],
    setup: ["Hang from a pull-up bar with an overhand grip."],
    execution: ["Engage your lats and core, and raise your knees up to touch your elbows.", "Control the descent back to a full hang."],
    commonMistakes: ["Swinging or using momentum (kipping).", "Not reaching the full range of motion."],
    modifications: { easier: "Perform hanging knee raises (bringing knees to hip height) or perform lying on the floor.", harder: "Keep legs straight for Toes-to-Bar." },
    breathingPattern: "Exhale on the way up, inhale on the way down"
  },
  {
    id: "back-extensions-supermans",
    name: "Back Extensions (Supermans)",
    category: "Core",
    primaryMuscles: ["Lower Back", "Glutes", "Hamstrings"],
    equipment: ["None"],
    setup: ["Lie face down on the floor with your arms and legs extended."],
    execution: ["Simultaneously lift your arms, chest, and legs off the floor by engaging your lower back and glutes.", "Hold at the top for a moment, then lower with control."],
    commonMistakes: ["Lifting with the neck.", "Moving too quickly."],
    modifications: { easier: "Lift only your upper body or only your legs.", harder: "Hold a light weight." },
    breathingPattern: "Exhale on the lift, inhale on the descent"
  },
  {
    id: "simulated-kettlebell-swing",
    name: "Kettlebell Swings (use backpack)",
    category: "Full Body",
    primaryMuscles: ["Glutes", "Hamstrings", "Core"],
    equipment: ["Backpack/Heavy Object"],
    setup: ["Hold a backpack or other heavy object with both hands.", "Stand with feet slightly wider than shoulders.", "Keep a slight bend in the knees."],
    execution: ["Hinge at your hips and swing the object between your legs.", "Explosively drive your hips forward to propel the object up to chest or eye level.", "Control the descent and immediately go into the next rep. The power comes from the hips, not the arms."],
    commonMistakes: ["Squatting instead of hinging at the hips.", "Lifting with the arms."],
    modifications: { easier: "Use a lighter object.", harder: "Use a heavier object or perform single-arm swings." },
    breathingPattern: "Exhale on the upward swing"
  },
  {
    id: "simulated-wall-ball",
    name: "Wall Ball Shots (squat and toss pillow)",
    category: "Full Body",
    primaryMuscles: ["Quads", "Glutes", "Shoulders"],
    equipment: ["Pillow/Ball"],
    setup: ["Stand facing a wall, holding a pillow or soft ball at your chest."],
    execution: ["Perform a full squat.", "As you drive up from the bottom of the squat, use the momentum to toss the pillow up against the wall.", "Catch the pillow and immediately descend into the next squat."],
    commonMistakes: ["Not reaching full squat depth.", "Tossing the pillow with only your arms."],
    modifications: { easier: "Squat to a box or just perform thrusters without the toss.", harder: "Use a heavier object (if safe) or aim for a higher target." },
    breathingPattern: "Inhale down, exhale on the toss"
  },
    {
    id: "running",
    name: "Run",
    category: "Cardio",
    primaryMuscles: ["Cardiovascular System", "Legs"],
    equipment: ["None"],
    setup: [
      "Ensure you have a safe route or a treadmill.",
      "Wear appropriate running shoes.",
      "Maintain an upright posture with a slight forward lean."
    ],
    execution: [
      "Maintain a consistent pace.",
      "Keep your arms bent at approximately 90 degrees, swinging from the shoulder.",
      "Land on your mid-foot, under your center of gravity.",
      "Breathe deeply and rhythmically."
    ],
    commonMistakes: [
      "Heel striking too heavily.",
      "Overstriding (landing with foot far in front of body).",
      "Slouching or poor posture.",
      "Holding tension in the upper body."
    ],
    modifications: {
      easier: "Jog, use a treadmill, or substitute with biking or rowing.",
      harder: "Increase pace, run on varied terrain, or add a weighted vest."
    },
    breathingPattern: "Inhale through the nose and mouth, exhale through the mouth."
    }
];