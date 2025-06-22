# CrossFit Workout Tracker

A premium web application for creating, tracking, and managing your custom CrossFit-style workouts. Built with React and designed with a focus on a clean UI, smooth animations, and a powerful, flexible workout editor.

## 🚀 Features

### 1. Custom Workout Builder
- **Modular Blocks:** Build workouts using different block types: Warm-up, Strength, Cardio, Cool-down, and multiple Conditioning formats.
- **Strength Blocks:** Define exercises with unique sets and reps for each (e.g., 5x5, pyramid sets).
- **Conditioning Blocks:**
  - **AMRAP:** Set a time and list exercises.
  - **RFT (Rounds for Time):** Define a number of rounds and the exercises within each.
  - **Chipper:** Create a list of exercises with high reps to be completed once.
  - **EMOM:** Define a unique task for every minute of the workout.
  - **Tabata:** Customize work/rest intervals and total rounds.

### 2. Interactive Workout View
- **Dynamic Display:** The workout view automatically renders any custom workout you've created.
- **Strength Tracking:** Log weight and reps for each set with easy +/- buttons.
- **Integrated Timers:** Automatically starts the correct timer (Stopwatch, Countdown, AMRAP, EMOM, Tabata) based on the workout block.
- **Rest Timer:** Quickly start a rest timer between sets in a strength block.

### 3. Progress Tracking
- **Weight Logging:** Log your weight over time and see your progress on a responsive chart.
- **Photo Comparison:** Upload progress photos and compare your first and latest pictures with an interactive slider.
- **Key Metrics:** The dashboard displays your total workouts completed, lifetime lbs lifted, total reps, and more.

## 💻 Technical Stack
- **Framework:** React
- **State Management:** React Context API
- **Bundler:** Vite
- **Styling:** CSS with variables for theming
- **Libraries:**
  - `recharts` for progress charts
  - `lucide-react` for icons
  - `react-compare-slider` for photo comparison