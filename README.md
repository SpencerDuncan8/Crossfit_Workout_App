# BlockFit: Workout Tracker & Builder

A premium web application to guide your fitness journey. Get started immediately with professionally designed programs or use the powerful editor to create, plan, and track your own custom functional fitness workouts.

## 🎯 Current Status: Cloud Sync Implemented ☁️

The application now supports both local-only use for free-tier users and full cloud synchronization for registered members. This hybrid approach allows new users to get started immediately without an account, with a seamless path to upgrade and sync their data across devices.

-   **Goal:** Provide a full-featured experience without requiring immediate sign-up, while enabling powerful cross-device synchronization for registered users.
-   **Method:** The free tier of the app saves all user-generated data directly to their browser's **`localStorage`**. This allows for a complete, single-device experience. When a user creates a permanent account, the app performs a **one-time migration** of all their local data to **Cloud Firestore**, linking it to their new account for cloud sync.
-   **Next Step:** Integrating Stripe for premium features and monetization.

## 🗺️ Project Roadmap

The project is being developed in distinct phases to ensure a high-quality, user-centric product.

*   **Phase 1: Core Engine & Local Storage** - ✅ **Complete**
    *   **Complete:** A full-featured, program-based architecture.
    *   **Complete:** A powerful workout editor and interactive workout experience.
    *   **Complete:** Calendar and progress tracking features.
    *   **Complete:** Initial user testing with a local-storage-based version.

*   **Phase 2: User Authentication & Cloud Sync** - ✅ **Complete**
    *   **Complete:** Implemented user accounts using **Firebase Authentication**.
    *   **Complete:** Implemented a one-time data migration for free-tier users who sign up, moving their data from `localStorage` to **Cloud Firestore** to enable cross-device data synchronization.

*   **Phase 3: Premium Tier & Monetization** - **Next Up**
    *   **Planned:** Integrate **Stripe** for secure payment processing.
    *   **Planned:** Launch a "Premium" subscription tier that unlocks advanced features.

*   **Phase 4: Social & Community Features** - **Future**
    *   **Planned:** Ability for premium users to share their custom programs with the community.
    *   **Planned:** Leaderboards for benchmark workouts.

## 💰 Monetization & Business Model

The application will follow a **Freemium** model to allow users to experience the core value of the app before committing to a subscription.

*   **Free Tier:**
    *   Full access to the workout editor, calendar, and all tracking features.
    *   A limited number of custom programs (e.g., 3).
    *   Access to a small selection of template programs.
    *   **All data is stored locally in the browser's `localStorage`**.

*   **Premium Tier ($4.99/month - tentative):**
    *   **Cloud Data Sync:** All data (programs, logs, progress) is migrated from your local device and then saved to the cloud, making it accessible on any device.
    *   **Unlimited Custom Programs:** Create and save as many workout programs as you want.
    *   **Full Template Library:** Unlock the complete library of professionally designed program templates.
    *   **Future Social Features:** Access to community features like program sharing and leaderboards as they are released.

## 🚀 Features

### 1. Comprehensive Program Management
- **Template Library:** Browse pre-built programs like "Bodyweight Blast". Load them into your library or create an editable copy.
- **Load & Auto-Schedule:** A "quick start" option instantly adds a template to your library and intelligently schedules its workouts onto your calendar.
- **Create From Scratch:** Build your own custom programs from the ground up. *(Free tier limited to 3 programs)*.
- **Full Customization:** For any program you own, easily rename the program, create new workouts, edit existing ones, or delete workouts.

### 2. Powerful Workout Editor
- **Modular Blocks:** Build workouts using a variety of block types: Warm-up, Strength, Bodyweight, Accessory / Carry, Cardio, Cool-down, and multiple Conditioning formats.
- **Strength Blocks:** Define exercises with unique sets, reps, and load. Supports percentage-based loading which automatically calculates weight based on your saved 1-Rep Max.
- **Conditioning Blocks:**
  - **AMRAP (As Many Rounds As Possible):** Set a time, list the exercises, and log your final score (total rounds + reps) to track performance.
  - **RFT (Rounds for Time):** Define rounds and exercises, backed by a lap timer to record split times.
  - **Chipper:** Create a high-rep list of exercises to be completed once for time.
  - **Tabata:** A true Tabata protocol (8 rounds of 20s work, 10s rest). Log reps for each of the 8 rounds to automatically calculate your official Tabata score (lowest reps).
  - **EMOM (Every Minute On the Minute):** Customize minute-by-minute tasks for high-intensity training.
  - **Intervals:** A flexible HIIT block where you can customize work time, rest time, and total rounds.

### 3. Interactive Workout Experience
- **Live Tracking & Timers:** Log sets/reps in real-time and use context-aware timers (Stopwatch, Countdown, AMRAP, EMOM, Tabata, Intervals) that launch automatically for the block you're on.
- **Live Feedback & Score Logging:** Log round times for RFTs, record final times for Chippers, enter your total reps/rounds for AMRAPs, and log reps for each round of a Tabata to save detailed performance data with your workout results.
- **1RM Percentage Calculation:** The app displays the calculated target weight based on your saved 1-Rep Max.
- **Seamless Navigation:** Use arrow buttons in the Workout View and Calendar modals to easily flip between days.

### 4. Full-Featured Calendar & Logbook
- **Multi-Workout Scheduling:** Add multiple workouts to a single day and track each one's completion status individually.
- **Interactive Day Modal:** Click a day to view all scheduled workouts, start a new one, or review completed sessions with a full performance summary.
- **Detailed Logbook:** Completed workouts are marked on the calendar, offering a review of all logged data, including times and scores.

### 5. Advanced Progress Tracking
- **At-a-Glance Dashboard:** Displays key metrics like total workouts, lifetime lbs lifted, and total reps.
- **1-Rep Max (1RM) Tracking:** A dedicated editor to log your personal bests for key lifts, powering percentage-based calculations.
- **Weight & Photo Logging:** Track your body weight and visualize it on a chart. Upload progress photos and compare them side-by-side.

### 6. Quality of Life Features
- **In-App Explanations:** Click the help icon next to any conditioning workout type (AMRAP, RFT, Tabata, etc.) to get a detailed explanation of the rules and scoring.
- **Light & Dark Mode:** Toggle between a sleek dark theme and a clean light theme.
- **Responsive Design:** A mobile-first design ensures a seamless experience on any device.

## 💻 Technical Stack
- **Framework:** React
- **State Management:** React Context API (with custom hooks for persistent state)
- **Bundler:** Vite
- **Styling:** CSS with variables for theming
- **Backend:** Firebase (Authentication & Cloud Firestore)
- **Planned Payments:** Stripe
- **Libraries:**
  - `recharts` for progress charts
  - `lucide-react` for icons
  - `react-compare-slider` for photo comparison
  - `react-confetti` for workout completion celebration