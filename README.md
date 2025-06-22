# CrossFit Workout Tracker & Builder

A premium web application for creating, planning, tracking, and managing your custom CrossFit-style workouts. Built with React and designed with a focus on a clean UI, smooth animations, and a powerful, flexible workout editor.

## 🎯 Current Status: Complete & Launched! 🚀

*   **Phase 1: Foundation & Original Program** - ✅ **Complete**
*   **Phase 2: Custom Workout Builder** - ✅ **Complete**
*   **Phase 3: Interactive Workout View** - ✅ **Complete**
*   **Phase 4: Calendar Planning & Logging** - ✅ **Complete**
*   **Phase 5: Progress Tracking Suite** - ✅ **Complete**
*   **Phase 6: Full System Integration** - ✅ **Complete**
*   **Phase 7: User Testing and Refinement** - **In Progress**

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
- **Dynamic Display:** The workout view automatically renders any workout you've scheduled for the day.
- **Strength Tracking:** Log weight and reps for each set with easy +/- buttons and a checkbox to mark completion.
- **Integrated Timers:** Automatically starts the correct timer (Stopwatch, Countdown, AMRAP, EMOM, Tabata) based on the workout block.
- **Rest Timer:** Quickly start a rest timer between sets in a strength block.

### 3. Full-Featured Calendar
- **Workout Planner:** Click on any future date to assign one of your custom-built workouts.
- **Workout Logbook:** After completing a workout, the calendar entry is updated. Click on any completed day to see a summary of your performance.
- **Navigation:** Easily jump between your scheduled workouts directly from the Workout View.

### 4. Progress Tracking Dashboard
- **Key Metrics:** The dashboard displays your total workouts completed, lifetime lbs lifted, total reps, current weight, and weight lost.
- **Weight Logging:** Log your weight over time and see your progress on a responsive chart.
- **Photo Comparison:** Upload progress photos and compare your first and latest pictures with an interactive slider.

## 💻 Technical Stack
- **Framework:** React
- **State Management:** React Context API (with a custom hook for persistent state)
- **Bundler:** Vite
- **Styling:** CSS with variables for theming
- **Libraries:**
  - `recharts` for progress charts
  - `lucide-react` for icons
  - `react-compare-slider` for photo comparison