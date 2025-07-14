// src/data/exercises/newCrossfitExercises.js

export const newCrossfitExercises = [
  {
    id: "double-unders",
    name: "Double-Unders",
    category: "Cardio",
    primaryMuscles: ["Calves", "Cardiovascular System"],
    equipment: ["Jump Rope"],
    setup: [
      "Hold a speed rope with handles at hip height.",
      "Stand with feet together, core engaged."
    ],
    execution: [
      "Jump slightly higher than a normal single jump.",
      "Use your wrists to quickly rotate the rope so it passes under your feet twice for every one jump.",
      "Maintain a consistent rhythm and stay on the balls of your feet."
    ],
    commonMistakes: [
      "Jumping too high (piking or donkey kicking).",
      "Using arms instead of wrists to turn the rope.",
      "Losing posture."
    ],
    modifications: {
      easier: "Perform single-unders or plate hops.",
      harder: "Perform for longer unbroken sets or try triple-unders."
    },
    breathingPattern: "Maintain a steady, rhythmic breath."
  },
  {
    id: "power-snatch",
    name: "Power Snatch",
    category: "Full Body",
    primaryMuscles: ["Full Body", "Hamstrings", "Glutes", "Shoulders"],
    equipment: ["Barbell"],
    setup: [
      "Stand with feet hip-width apart, barbell on the floor over the mid-foot.",
      "Take a wide 'snatch grip' on the bar.",
      "Back flat, chest up, hips low."
    ],
    execution: [
      "Explosively extend your hips and knees, keeping the bar close.",
      "After full extension, pull your body under the bar.",
      "Receive the bar in a partial squat (above parallel) with arms locked out overhead.",
      "Stand up to complete the lift."
    ],
    commonMistakes: [
      "Bar looping out away from the body.",
      "Incomplete hip extension.",
      "Catching too low (a full snatch)."
    ],
    modifications: {
      easier: "Hang Power Snatch (starting from above the knee).",
      harder: "Increase weight or perform touch-and-go reps."
    },
    breathingPattern: "Inhale before pull, explosive exhale on extension."
  },
  {
    id: "chest-to-bar-pull-ups",
    name: "Chest-to-Bar Pull-ups",
    category: "Upper Body",
    primaryMuscles: ["Lats", "Biceps", "Upper Back"],
    equipment: ["Pullup Bar"],
    setup: [
      "Grip a pull-up bar with an overhand grip, slightly wider than your shoulders.",
      "Start from a full dead hang."
    ],
    execution: [
      "Initiate a powerful pull by engaging your lats.",
      "Pull your body upward until your chest makes physical contact with the bar.",
      "Lower yourself back to a full hang with control."
    ],
    commonMistakes: [
      "Not making contact with the chest.",
      "Craning the neck forward to try and reach.",
      "Not reaching full extension at the bottom."
    ],
    modifications: {
      easier: "Perform standard pull-ups or jumping chest-to-bar pull-ups.",
      harder: "Perform strict or add weight."
    },
    breathingPattern: "Exhale on the pull, inhale on the descent."
  },
  {
    id: "rowing",
    name: "Rowing",
    category: "Cardio",
    primaryMuscles: ["Full Body", "Cardiovascular System"],
    equipment: ["Rower"],
    setup: [
      "Sit on the rower and secure your feet in the straps.",
      "Grip the handle with an overhand grip.",
      "Start at the 'catch' position: shins vertical, back straight, arms extended."
    ],
    execution: [
      "1. (Drive): Push powerfully with your legs.",
      "2. (Swing): As your legs straighten, swing your torso back to about a 110-degree angle.",
      "3. (Pull): Finish by pulling the handle to your lower chest/sternum.",
      "4. (Recovery): Reverse the motion in order: arms extend, torso swings forward, then knees bend."
    ],
    commonMistakes: [
      "Pulling with arms first.",
      "Opening the back too early.",
      "Bending knees before arms are extended on the recovery."
    ],
    modifications: {
      easier: "Row at a slower pace or for shorter distances.",
      harder: "Perform high-intensity intervals (sprints)."
    },
    breathingPattern: "Exhale during the drive, inhale during the recovery."
  },
  {
    id: "wall-ball-shots",
    name: "Wall Ball Shots",
    category: "Full Body",
    primaryMuscles: ["Quads", "Glutes", "Shoulders"],
    equipment: ["Wall Ball"],
    setup: [
      "Stand facing a wall, about an arm's length away.",
      "Hold a wall ball at your chest in a front squat position.",
      "Feet are shoulder-width apart."
    ],
    execution: [
      "Perform a full squat, keeping the ball at your chest.",
      "Explosively drive up from the squat.",
      "Use the momentum to throw the ball up to a specified target on the wall.",
      "Catch the ball on its way down and smoothly descend into the next squat."
    ],
    commonMistakes: [
      "Not hitting full squat depth.",
      "Throwing the ball with only your arms.",
      "Dropping the ball instead of catching it smoothly."
    ],
    modifications: {
      easier: "Use a lighter ball, a lower target, or just perform goblet squats.",
      harder: "Use a heavier ball or a higher target."
    },
    breathingPattern: "Inhale on the squat, exhale on the throw."
  },
  {
    id: "barbell-clean",
    name: "Barbell Clean",
    category: "Full Body",
    primaryMuscles: ["Full Body", "Quads", "Glutes", "Hamstrings"],
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
      "Stand up fully to complete the clean."
    ],
    commonMistakes: [
      "Pulling early with the arms.",
      "The bar swinging out away from the body.",
      "Poor receiving position (elbows down).",
      "Not standing up completely."
    ],
    modifications: {
      easier: "Perform a Power Clean (receiving in a partial squat) or Hang Clean.",
      harder: "Increase the weight."
    },
    breathingPattern: "Inhale before the pull, exhale as you stand."
  },
  {
    id: "pistol-squats",
    name: "Pistol Squats (Single Leg)",
    category: "Lower Body",
    primaryMuscles: ["Quads", "Glutes", "Balance", "Core"],
    equipment: ["None"],
    setup: [
      "Stand on one leg, with the other leg extended straight out in front of you.",
      "Keep your core tight and find a focal point to aid balance."
    ],
    execution: [
      "Slowly lower your body down in a controlled squat on one leg.",
      "Keep the extended leg off the floor.",
      "Go as deep as possible, ideally until your hamstring rests on your calf.",
      "Drive through the heel of your standing leg to return to the start position."
    ],
    commonMistakes: [
      "Losing balance.",
      "Heel of the standing foot lifting off the ground.",
      "Not controlling the descent."
    ],
    modifications: {
      easier: "Perform pistol squats to a box, or hold onto a rig for support.",
      harder: "Hold a weight in the goblet position."
    },
    breathingPattern: "Inhale down, exhale up"
  },
  {
    id: "overhead-squat",
    name: "Overhead Squat",
    category: "Full Body",
    primaryMuscles: ["Quads", "Shoulders", "Core", "Back"],
    equipment: ["Barbell"],
    setup: [
      "Take a wide 'snatch grip' on the barbell.",
      "Press or snatch the bar overhead, with arms fully locked out.",
      "Stand with feet shoulder-width apart, core tight, and armpits facing forward."
    ],
    execution: [
      "Keeping the bar locked out directly over your mid-foot, descend into a full squat.",
      "Keep your chest up and torso as upright as possible.",
      "Drive up from the squat to a standing position."
    ],
    commonMistakes: [
      "Bending the elbows.",
      "Letting the bar drift forward or backward.",
      "Not hitting full squat depth.",
      "A forward-leaning torso."
    ],
    modifications: {
      easier: "Use a PVC pipe or empty barbell. Practice overhead squats facing a wall to enforce an upright torso.",
      harder: "Increase the weight or add a pause at the bottom."
    },
    breathingPattern: "Inhale on the descent, exhale on the ascent."
  }
];