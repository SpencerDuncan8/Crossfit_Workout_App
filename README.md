# BlockFit: Workout Tracker & Builder

A premium web application to guide your fitness journey. Get started immediately with professionally designed programs or use the powerful editor to create, plan, and track your own custom functional fitness workouts.

## 🎯 Current Status: Major Features Complete! 🚀

The application is now built on a flexible, program-based architecture that serves both beginners and experienced athletes.

*   **Phase 1: Core Engine** - ✅ **Complete**
*   **Phase 2: Guided Programs & Onboarding** - ✅ **Complete**
    *   A full-featured, program-based architecture has been implemented.
    *   Users can load pre-built template programs (e.g., "Bodyweight Blast") into their personal library.
    *   A "quick start" option automatically schedules loaded programs onto the calendar based on a defined frequency (e.g., 3 or 5 days/week).
    *   Users can create their own custom programs from scratch.
    *   All user-owned programs can be renamed, and their workouts can be created, edited, and deleted.
    *   Template programs can be copied to create a fully editable, custom version.

*   **Phase 3: Premium Tier & Expansion** - **Next Up**
    *   **Planned:** Add more diverse program templates (e.g., Kettlebell, Strength-Focus).
    *   **Planned:** Implement a "premium" tier to unlock the full template library.
    *   **Planned:** Add advanced analytics and personalized progress insights.

## 🚀 Features

### 1. Comprehensive Program Management
- **Template Library:** Browse pre-built programs like "Bodyweight Blast". Load them into your library or create an editable copy with a single tap.
- **Load & Auto-Schedule:** A "quick start" option instantly adds a template to your library and intelligently schedules its workouts onto your calendar, providing an immediate, structured plan.
- **Create From Scratch:** Build your own custom programs from the ground up, adding as many unique workouts as you need.
- **Full Customization:** For any program you own, easily rename the program, create new workouts, edit existing ones, or delete workouts you no longer need.

### 2. Powerful Workout Editor
- **Modular Blocks:** Build workouts using a variety of block types: Warm-up, Strength, Bodyweight, Accessory / Carry, Cardio, Cool-down, and multiple Conditioning formats.
- **Strength Blocks:** Define exercises with unique sets, reps, and load for each (e.g., 5x5, pyramid sets). Supports percentage-based loading (e.g., "5 reps at 85%") which automatically calculates weight based on your saved 1-Rep Max.
- **Bodyweight Blocks:** Track exercises by a target number of reps (e.g., 15 Push-ups) or by time (e.g., a 60-second Plank).
- **Accessory / Carry Blocks:** Specifically designed for accessory work, allowing you to define sets, weight, and distance or time (e.g., "3 sets of 50lb Farmer's Carry for 100 meters").
- **Conditioning Blocks:**
  - **AMRAP:** Set a time and list the exercises to perform.
  - **RFT (Rounds for Time):** Define a number of rounds and the exercises within each, backed by a full-featured lap timer.
  - **Chipper:** Create a high-rep list of exercises to be completed once for time, with a dedicated block timer to record your final score.
  - **EMOM (Every Minute On the Minute):** Define a unique task for every minute of the workout.
  - **Tabata:** Customize work/rest intervals and total rounds for high-intensity training.

### 3. Interactive Workout Experience
- **Dynamic Display:** The workout view automatically renders any workout you've scheduled, presenting it in clear, actionable cards.
- **Live Strength Tracking:** Log weight and reps for each set with easy +/- buttons. A checkbox marks the set as complete, providing visual progress.
- **1RM Percentage Calculation:** For percentage-based sets, the app displays the calculated target weight based on your saved 1-Rep Max, taking the guesswork out of training.
- **Context-Aware Integrated Timers:**
  - **Smart Start:** The app automatically launches the correct timer (Stopwatch, Countdown, AMRAP, EMOM, Tabata) based on the workout block you're on. A dedicated rest timer can be started between sets.
  - **Lap Timer for RFT:** For "Rounds for Time" workouts, a "Time Round" button appears on the timer bar, allowing you to log the time for each round.
  - **Dedicated Chipper Timer:** Chippers get a simple stopwatch with a "Record Time" button on the timer bar, letting you log the block's total time independently before moving on.
  - **Live Feedback:** Round times for RFTs and the final recorded time for Chippers are displayed in real-time directly within the relevant workout block.

### 4. Full-Featured Calendar & Logbook
- **Visual Workout Planner:** Click on any future date to open a modal and assign a workout from any program in your library. An indicator shows which workout is currently assigned.
- **Interactive Day Modal:** Click a scheduled day to either start the workout or change it.
- **Detailed Logbook:** After completing a workout, the calendar entry is marked as complete. Clicking it opens a review modal showing a summary of your performance, including total sets, reps, volume, and a detailed breakdown of any logged round times or final block scores.
- **Direct Navigation:** Easily jump between your scheduled workouts directly from the main Workout View using previous/next day buttons.

### 5. Advanced Progress Tracking
- **At-a-Glance Dashboard:** The dashboard displays key metrics: total workouts completed, lifetime lbs lifted, total reps, current weight, and weight lost.
- **1-Rep Max (1RM) Tracking:** A dedicated editor on the Progress screen to log your personal bests for key lifts (Squat, Bench Press, Deadlift, Overhead Press). This data directly powers the percentage-based calculations in your workouts.
- **Weight Logging & Charting:** Log your body weight over time and visualize your progress on a responsive chart that displays your journey with clear date labels.
- **Photo Progress Comparison:** Upload progress photos and compare your first and latest pictures side-by-side with an interactive slider.
- **Data Management:** A "Danger Zone" option allows you to reset all app data to start fresh.

### 6. Quality of Life Features
- **Light & Dark Mode:** Toggle between a sleek dark theme and a clean light theme to match your preference.
- **Responsive Design:** A mobile-first design ensures a seamless experience on any device, with dedicated layouts for mobile (bottom navigation) and desktop (sidebar).

## 💻 Technical Stack
- **Framework:** React
- **State Management:** React Context API (with custom hooks for persistent state and timers)
- **Bundler:** Vite
- **Styling:** CSS with variables for theming
- **Libraries:**
  - `recharts` for progress charts
  - `lucide-react` for icons
  - `react-compare-slider` for photo comparison
  - `react-confetti` for workout completion celebration