// src/data/exercises/newBodyweightExercises.js

export const newBodyweightExercises = [
  {
    id: "pike-push-ups",
    name: "Pike Push-ups",
    category: "Upper Body",
    primaryMuscles: ["Shoulders", "Triceps", "Chest"],
    equipment: ["None"],
    setup: [
      "Start in a downward-dog yoga position: hands on the floor, hips high in the air, creating an inverted 'V' shape with your body.",
      "Your hands should be slightly wider than your shoulders."
    ],
    execution: [
      "Keeping your hips high, bend your elbows to lower the top of your head towards the floor.",
      "Your head should move forward slightly, aiming for a spot in front of your hands to form a tripod.",
      "Press through your shoulders and triceps to return to the starting position."
    ],
    commonMistakes: [
      "Letting the hips drop, turning it into a regular push-up.",
      "Flaring elbows out to the sides.",
      "Not achieving a full range of motion."
    ],
    modifications: {
      easier: "Place your feet on a lower surface or reduce the range of motion.",
      harder: "Elevate your feet on a box or chair to increase the angle and load on your shoulders."
    },
    breathingPattern: "Inhale down, exhale on the press up."
  },
  // The "v-up" object that was here has been REMOVED.
  {
    id: "broad-jumps",
    name: "Broad Jumps",
    category: "Lower Body",
    primaryMuscles: ["Glutes", "Hamstrings", "Quads"],
    equipment: ["None"],
    setup: [
      "Stand with feet hip-width apart.",
      "Get into a partial squat and swing your arms back."
    ],
    execution: [
      "Swing your arms forward and jump as far forward as you can.",
      "Land softly with your knees bent, absorbing the impact.",
      "Turn around and repeat, or string them together if you have space."
    ],
    commonMistakes: [
      "Landing with straight legs.",
      "Not using arms for momentum."
    ],
    modifications: {
      easier: "Reduce the distance of the jump.",
      harder: "Jump for maximum distance or perform consecutive jumps without pausing."
    },
    breathingPattern: "Exhale on the jump"
  },
  {
    id: "burpee-box-jump-overs",
    name: "Burpee Box Jump Overs",
    category: "Full Body",
    primaryMuscles: ["Full Body", "Cardiovascular System"],
    equipment: ["Box/Stair"],
    setup: ["Stand facing a box, stair, or sturdy curb."],
    execution: [
        "Place your hands on the floor and perform a burpee.",
        "From the bottom of the burpee, jump your feet in.",
        "Immediately jump onto the box with both feet.",
        "Jump or step down on the other side of the box.",
        "Turn around and repeat, or perform a lateral burpee to continue.",
    ],
    commonMistakes: ["Not hitting full chest-to-deck on the burpee.", "Landing on the box with straight legs."],
    modifications: {
        easier: "Perform a burpee and then step up and over the box.",
        harder: "Use a higher box.",
    },
    breathingPattern: "Maintain a consistent breathing pattern throughout the cycle."
  }
];