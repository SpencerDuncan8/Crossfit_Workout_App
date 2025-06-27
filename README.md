# BlockFit: Workout Tracker & Builder

A premium web application to guide your fitness journey. Get started immediately with professionally designed programs or use the powerful editor to create, plan, and track your own custom functional fitness workouts.

## 🎯 Current Status: User Testing - Phase 1 🧪

The application is currently in its first phase of user testing. The focus is on gathering feedback for the core workout building and tracking experience using **local browser storage**.

-   **Goal:** Validate the core features, find usability issues, and gather initial feedback.
-   **Method:** Testers are using a version of the app that saves all data directly to their browser's `localStorage`. This allows for a full-featured, single-device experience without requiring user accounts.
-   **Next Step:** Based on feedback from this phase, the core experience will be refined before moving to Phase 2, which includes implementing user authentication and cloud storage.

## 🗺️ Project Roadmap

The project is being developed in distinct phases to ensure a high-quality, user-centric product.

*   **Phase 1: Core Engine & Local Testing** - ✅ **In Progress**
    *   **Complete:** A full-featured, program-based architecture.
    *   **Complete:** A powerful workout editor and interactive workout experience.
    *   **Complete:** Calendar and progress tracking features.
    *   **Current:** User testing with a small, trusted group to refine the core app.

*   **Phase 2: User Authentication & Cloud Sync** - **Next Up**
    *   **Planned:** Implement user accounts using **Firebase Authentication**.
    *   **Planned:** Migrate data storage from `localStorage` to **Cloud Firestore** to enable cross-device data synchronization.
    *   **Planned:** Implement a one-time data migration for free-tier users who upgrade to a premium account.

*   **Phase 3: Premium Tier & Monetization** - **Planned**
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
    *   All data is stored locally in the browser.

*   **Premium Tier ($4.99/month - tentative):**
    *   **Cloud Data Sync:** All data (programs, logs, progress) is saved to the cloud and accessible on any device.
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
  - **AMRAP:** Set a time, list the exercises, and log your final score to track performance.
  - **RFT (Rounds for Time):** Define rounds and exercises, backed by a lap timer.
  - **Chipper:** Create a high-rep list of exercises to be completed once for time.
  - **EMOM & Tabata:** Customize intervals for high-intensity training.

### 3. Interactive Workout Experience
- **Live Tracking & Timers:** Log sets/reps in real-time and use context-aware timers (Stopwatch, Countdown, AMRAP, EMOM) that launch automatically for the block you're on.
- **Live Feedback & Score Logging:** Log round times for RFTs, record final times for Chippers, and enter your total reps/rounds for AMRAPs to save with your workout results.
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
- **Light & Dark Mode:** Toggle between a sleek dark theme and a clean light theme.
- **Responsive Design:** A mobile-first design ensures a seamless experience on any device.

## 💻 Technical Stack
- **Framework:** React
- **State Management:** React Context API (with custom hooks for persistent state)
- **Bundler:** Vite
- **Styling:** CSS with variables for theming
- **Planned Backend:** Firebase (Authentication & Cloud Firestore)
- **Planned Payments:** Stripe
- **Libraries:**
  - `recharts` for progress charts
  - `lucide-react` for icons
  - `react-compare-slider` for photo comparison
  - `react-confetti` for workout completion celebration