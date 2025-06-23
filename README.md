# CrossFit Workout Tracker & Builder

A premium web application to guide your fitness journey. Get started immediately with professionally designed programs or use the powerful editor to create, plan, and track your own custom CrossFit-style workouts.

## 🎯 Current Status: Major Features Complete! 🚀

The application is now built on a flexible, program-based architecture that serves both beginners and experienced athletes.

*   **Phase 1: Core Engine** - ✅ **Complete**
*   **Phase 2: Guided Programs & Onboarding** - ✅ **Complete**
    *   A program-based architecture has been implemented.
    *   Users can now load pre-built template programs into their library.
    *   A "quick start" option automatically schedules loaded programs onto the calendar.
    *   Users can create, edit, copy, and delete their own custom programs.
*   **Phase 3: Premium Tier & Expansion** - **Next Up**
    *   **Planned:** Add more diverse program templates (e.g., Kettlebell, Strength-Focus).
    *   **Planned:** Implement a "premium" tier to unlock the full template library.
    *   **Planned:** Add advanced analytics and personalized progress insights.

## 🚀 Features

### 1. Guided & Custom Program Library
- **Template Programs:** Browse pre-built programs like "Bodyweight Blast". Load them into your library with a single tap.
- **Load & Schedule:** A "quick start" option instantly adds a template to your library and schedules the workouts onto your calendar, providing an immediate plan.
- **Copy & Edit:** Duplicate any template to create your own editable version, allowing for full customization.
- **Create From Scratch:** Build your own custom programs from the ground up, adding as many unique workouts as you need.

### 2. Powerful Workout Editor
- **Modular Blocks:** Build workouts using different block types: Warm-up, Strength, Cardio, Cool-down, and multiple Conditioning formats.
- **Strength Blocks:** Define exercises with unique sets and reps for each (e.g., 5x5, pyramid sets).
- **Conditioning Blocks:**
  - **AMRAP:** Set a time and list exercises.
  - **RFT (Rounds for Time):** Define a number of rounds and the exercises within each.
  - **Chipper:** Create a list of exercises with high reps to be completed once.
  - **EMOM:** Define a unique task for every minute of the workout.
  - **Tabata:** Customize work/rest intervals and total rounds.

### 3. Interactive Workout View
- **Dynamic Display:** The workout view automatically renders any workout you've scheduled for the day.
- **Strength Tracking:** Log weight and reps for each set with easy +/- buttons and a checkbox to mark completion.
- **Integrated Timers:** Automatically starts the correct timer (Stopwatch, Countdown, AMRAP, EMOM, Tabata) based on the workout block.
- **Rest Timer:** Quickly start a rest timer between sets in a strength block.

### 4. Full-Featured Calendar
- **Workout Planner:** Click on any future date to assign one of your workouts from any program in your library.
- **Workout Logbook:** After completing a workout, the calendar entry is updated. Click on any completed day to see a summary of your performance.
- **Navigation:** Easily jump between your scheduled workouts directly from the Workout View.

### 5. Progress Tracking Dashboard
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