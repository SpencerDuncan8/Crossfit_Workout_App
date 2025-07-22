# BlockFit: Workout Tracker & Builder

A premium web application to guide your fitness journey. Get started immediately with professionally designed programs from the Template Library or use the powerful editor to create, plan, and track your own custom functional fitness workouts.

## 🎯 Current Status: Now with Community Features & Sharing ✅

The application is fully featured with a freemium model, secure payment processing, a filterable Template Library, and a complete social system for premium users.

-   **Goal:** Provide a full-featured experience without requiring immediate sign-up, while enabling powerful cross-device synchronization and community interaction for paid subscribers.
-   **Method:** The free tier saves all user data in **`localStorage`**. Premium users get **Firebase Authentication** + **Cloud Firestore** sync, plus the ability to add friends and share programs.
-   **Security:** Users only gain cloud access **after** successful payment completion. Email addresses are captured for follow-up even if payment is abandoned.

## 🗺️ Project Roadmap

The project is being developed in distinct phases to ensure a high-quality, user-centric product.

*   **Phase 1: Core Engine & Local Storage** - ✅ **Complete**
    *   A full-featured, program-based architecture.
    *   A powerful workout editor and interactive workout experience.
    *   Calendar and progress tracking features.
    *   Initial user testing with a local-storage-based version.

*   **Phase 2: User Authentication & Cloud Sync** - ✅ **Complete**
    *   Implemented user accounts using **Firebase Authentication**.
    *   Implemented a one-time data migration for premium users, moving their data from `localStorage` to **Cloud Firestore**.

*   **Phase 3: Premium Tier & Monetization** - ✅ **Complete**
    *   Integrated **Stripe** for secure payment processing.
    *   Launched "Premium" subscription tier ($4.99/month) that unlocks cloud sync.

*   **Phase 4: Template Library & Community Features** - ✅ **Complete**
    *   ✅ **Complete:** Built a filterable **Template Library** with programs by skill, goal, and equipment.
    *   ✅ **Complete:** Added new program types including **Benchmarks (The Girls)**, **Hero WODs**, and skill-based **Challenges**.
    *   ✅ **Complete:** Premium users can now create a unique username, add friends, view their activity, and share their custom programs.
    *   **Planned:** Leaderboards for benchmark workouts.

## 💰 Monetization & Business Model

The application follows a **Freemium** model with a secure payment gateway to prevent unauthorized access.

*   **Free Tier:**
    *   Full access to the workout editor, calendar, and all tracking features.
    *   Limited to 3 custom programs.
    *   Access to the full Template Library, but can only add programs if under the 3-program limit.
    *   **All data is stored locally in the browser's `localStorage`**.
    *   No account required - immediate access to core functionality.

*   **Premium Tier ($4.99/month):**
    *   **Secure Account Creation:** Firebase user account created only after successful payment.
    *   **Cloud Data Sync:** All local data is automatically migrated to the cloud upon signup.
    *   **Cross-Device Access:** Access your programs, logs, and progress from any device.
    *   **Unlimited Custom Programs:** Create and save as many workout programs as you want.
    *   **Full Template Library Access:** Load and schedule any template without program-count restrictions.
    *   **Community & Sharing:** Add friends, view their workout calendar, and share your custom programs with them.
    *   **Advanced Analytics:** Access the progress dashboard and track historical performance on lifts and workouts.

## 🔒 Payment Security

*   **Stripe Integration:** Industry-standard payment processing with PCI compliance.
*   **No Premature Access:** Users cannot access premium features before payment completion.
*   **Email Capture:** User emails are stored for marketing follow-up even if payment is abandoned.
*   **One-Time Migration:** Local data is seamlessly transferred to cloud storage upon successful payment.
*   **Automatic Premium Status:** User accounts are immediately activated with premium features post-payment.

## 🚀 Features

### 1. Program Management & Template Library
- **Intelligent Program Design:** Templates are designed with specific goals and durations in mind (e.g., 4-week strength cycles, 30-day skill challenges).
- **Filterable Template Library:** Discover the perfect program by filtering a rich library of templates by Program Type, Skill Level, Goal, and Equipment.
- **Load & Auto-Schedule:** A "quick start" option instantly adds a template to your library and intelligently schedules its workouts onto your calendar.
- **Create From Scratch:** Build your own custom programs from the ground up. *(Free tier limited to 3 programs)*.
- **Full Customization:** For any program you own, easily rename it, create new workouts, or edit existing ones.

### 2. Powerful Workout Editor
- **Modular Blocks:** Build workouts using a variety of block types: Warm-up, Strength, Conditioning, Cardio, and more.
- **Strength Blocks:** Define exercises with unique sets, reps, and load. Supports percentage-based loading which automatically calculates weight based on your saved 1-Rep Max.
- **Conditioning Blocks:** AMRAP, RFT, Chipper, Tabata, EMOM, and custom Intervals.

### 3. Interactive Workout Experience
- **Live Tracking & Timers:** Log sets/reps in real-time and use context-aware timers (Stopwatch, Countdown, AMRAP, etc.).
- **Live Feedback & Score Logging:** Log round times, record final times, and enter reps/rounds to save detailed performance data.
- **1RM Percentage Calculation:** Automatically displays the target weight based on your saved 1-Rep Max.

### 4. Full-Featured Calendar & Logbook
- **Multi-Workout Scheduling:** Add multiple workouts to a single day and track completion status individually.
- **Interactive Day Modal:** Click a day to view all scheduled workouts, start a new one, or review completed sessions with a full performance summary.
- **Detailed Logbook:** Completed workouts are marked on the calendar, offering a review of all logged data.

### 5. Advanced Progress Tracking
- **At-a-Glance Dashboard:** Displays key metrics like total workouts, lifetime volume lifted, and total reps.
- **1-Rep Max (1RM) Tracking:** A dedicated editor to log your personal bests for key lifts.
- **Historical Performance:** Automatically view your previous performance for a given exercise or benchmark WOD when you start a workout.
- **Weight & Photo Logging:** Track your body weight and visualize it on a chart. Upload and compare progress photos side-by-side.

### 6. Community & Social Features (Premium)
- **Unique Usernames:** Create a public username to connect with others in the BlockFit community.
- **Build Your Network:** Search for other users by their username and send friend requests to build your fitness circle.
- **View Friend Activity:** Once connected, you can view your friends' workout calendars to see what they've completed and what's coming up, helping with motivation and accountability.
- **Share Your Genius:** Share any of your custom-built workout programs with a friend with a single click. They receive a full, independent copy of your program to use in their own training.

### 7. Quality of Life Features
- **In-App Explanations:** Click the help icon next to any conditioning workout type (AMRAP, RFT, etc.) to get a detailed explanation.
- **Light & Dark Mode:** Toggle between a sleek dark theme and a clean light theme.
- **Responsive Design:** A mobile-first design ensures a seamless experience on any device.

## 💻 Technical Stack
- **Framework:** React 18 with Vite bundler
- **State Management:** React Context API (with custom hooks for persistent state)
- **Styling:** CSS with variables for theming
- **Backend:** Firebase (Authentication & Cloud Firestore)
- **Payments:** Stripe (SetupIntent + Subscriptions API)
- **Deployment:** Vercel (Frontend + Serverless Functions for API)
- **Libraries:**
  - `recharts` for progress charts
  - `lucide-react` for icons
  - `react-compare-slider` for photo comparison
  - `react-confetti` for workout completion celebration
  - `@stripe/stripe-js` and `@stripe/react-stripe-js` for payment processing

## 🏗️ Architecture

### Payment Flow
1. **Free Usage:** Users can immediately use all features with localStorage
2. **Signup:** Email/password collected but no Firebase account created
3. **Payment:** Stripe processes payment and stores customer data
4. **Account Creation:** Firebase user created only after successful payment
5. **Data Migration:** Local data automatically synced to cloud storage
6. **Premium Access:** Full cross-device synchronization and social features activated

### Data Storage
- **Free Tier:** Browser localStorage for single-device persistence
- **Premium Tier:** Firebase Firestore for cloud synchronization
- **Migration:** Seamless one-time transfer from local to cloud storage

## 🚀 Getting Started

### For Users
1. Visit the app and start using it immediately (no signup required).
2. Browse the **Template Library** to find a program that fits your goals.
3. When ready for cloud sync, unlimited programs, and social features, upgrade to Premium.
4. Create your unique username, add friends, and start sharing your fitness journey!

### For Developers
1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables for Firebase and Stripe
4. Run development server: `npm run dev`
5. Deploy to Vercel for production

## 📱 Mobile Support
- Progressive Web App (PWA) capabilities
- Responsive design optimized for mobile devices
- Touch-friendly interface for workout tracking
- Offline functionality for free tier users

---

**BlockFit** - Transform your fitness journey with intelligent program design and effortless progress tracking.