# CrossFit Workout Tracker & Builder

A premium web application to guide your fitness journey. Get started immediately with professionally designed programs or use the powerful editor to create, plan, and track your own custom CrossFit-style workouts.

## 🎯 Project Vision & Roadmap

Our vision is a hybrid model that caters to both beginners who need guidance and experienced athletes who demand flexibility.

*   **Part 1: Core Engine** - ✅ **Complete**
    *   This is the powerful, flexible foundation of the app. All core features for creating, logging, and tracking workouts are fully implemented.
    *   ✅ Custom Workout Builder
    *   ✅ Interactive Workout View & Timers
    *   ✅ Full-Featured Calendar & Logbook
    *   ✅ Progress Tracking Dashboard

*   **Part 2: Guided Programs & Onboarding** - **In Progress**
    *   This phase focuses on providing immediate value to new users with pre-built content, turning the app from an empty tool into an instant workout plan.
    *   **In Progress:** Create data structure for program templates.
    *   **Next Up:** Build the logic to load a template into a user's library.
    *   **Planned:** Design a "First-Time User" onboarding screen to select a program.
    *   **Planned:** Add an option to auto-schedule the selected program onto the calendar.

*   **Part 3: Premium Tier & Expansion** - **Planned**
    *   With the core engine and free templates in place, we will build out a premium subscription offering.
    *   **Planned:** Expanded Template Library (e.g., Kettlebell, Strength-Focus, Competition Prep).
    *   **Planned:** Advanced analytics and personalized progress insights.
    *   **Planned:** Video demonstrations for exercises.

## 🚀 Features

### 1. Guided Program Templates
- **Instant Start:** Choose from professionally designed, multi-week programs (e.g., "Bodyweight Blast") to instantly populate your workout library and calendar.
- **Perfect Starting Point:** Eliminates the "blank page" problem by providing immediate, actionable workout plans. Fully customizable after loading.

### 2. Custom Workout Builder
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
- **Workout Planner:** Click on any future date to assign one of your custom-built or template-based workouts.
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