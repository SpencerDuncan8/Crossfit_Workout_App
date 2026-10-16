# BlockFit: Workout Tracker & Builder

A web app to guide your fitness journey. Get started immediately with professionally designed programs from the Template Library, or use the powerful editor to create, plan, and track your own custom functional fitness workouts.

## 🎯 Current Status

The app is fully featured: a program-based workout engine, a filterable Template Library, secure payment processing, automatic cloud backup & sync, and a social system for premium users.

-   **Goal:** Give everyone a full-featured tracker with no sign-up required, and offer paid cloud backup, sync across devices, and community features.
-   **Free tier:** All data is kept in the browser's **`localStorage`**. A free **backup file** (download / restore) is available on the Progress page.
-   **Premium tier:** **Firebase Authentication** + **Cloud Firestore** give automatic backup and cross-device sync, plus friends and program sharing.
-   **Security:** Cloud accounts are created only **after** a successful payment method is confirmed. Billing and social data can only be changed by the server, never by the browser.

## 🗺️ Project Roadmap

*   **Phase 1: Core Engine & Local Storage** - ✅ **Complete**
    *   Program-based architecture, workout editor, interactive workout experience.
    *   Calendar and progress tracking.

*   **Phase 2: User Authentication & Cloud Sync** - ✅ **Complete**
    *   User accounts with **Firebase Authentication**.
    *   Local data moves to **Cloud Firestore** automatically when a user signs up or signs in.

*   **Phase 3: Premium Tier & Monetization** - ✅ **Complete**
    *   **Stripe** subscriptions ($4.99/month) unlock cloud backup & sync and community features.

*   **Phase 4: Template Library & Community Features** - ✅ **Complete**
    *   Filterable **Template Library** (skill, goal, equipment), including Benchmarks, Hero WODs and Challenges.
    *   Usernames, friends, friend activity, and program sharing for premium users.
    *   **Planned:** Leaderboards for benchmark workouts.

*   **Phase 5: Hardening & Scale** - ✅ **Complete**
    *   Every server endpoint verifies the caller's Firebase login token.
    *   Firestore security rules protect billing and social fields.
    *   Cloud data is split into small documents so history can grow without limit (see Data Storage).
    *   Visible warnings when a save fails, and a free backup/restore file.

## 💰 Monetization & Business Model

*   **Free Tier:**
    *   Full access to the workout editor, calendar, progress dashboard and all tracking features.
    *   **Unlimited custom programs** and the full Template Library.
    *   **All data is stored locally in the browser's `localStorage`** (this device only).
    *   Free **Download Backup / Restore from File** on the Progress page.
    *   No account required.

*   **Premium Tier ($4.99/month):**
    *   **Automatic cloud backup & sync:** programs, full workout history, weight log and photos are saved to the cloud and available on any device.
    *   **Community & Sharing:** a unique username, friends, view friends' recent activity, and share programs with friends.
    *   **Secure account creation:** the Firebase account is created only after the payment method is confirmed.

## 🔒 Security

*   **Verified API calls:** Every endpoint in `api/` (except sign-up, which has no account yet) requires a Firebase ID token (`Authorization: Bearer ...`). The server takes the user's identity from the token and ignores any user ID in the request body.
*   **Friend checks:** A user can only see another user's activity or share a program with them if the *other* user's friends list contains them.
*   **Stripe ownership:** Customers are tagged with the owning user ID, and billing endpoints refuse customers or payment methods that belong to someone else.
*   **Firestore rules** (`firestore.rules`): users can only read/write their own documents, and can never write billing or social fields (`isPremium`, Stripe IDs, `username`, `friends`, requests). Those are written only by the server (Admin SDK).
*   **Webhook:** `api/stripe-webhook.js` verifies Stripe's signature.
*   **CORS** is limited to the site's own origins.
*   **Payment flow:** Stripe stores the card; the app never sees card numbers.

## 🚀 Features

### 1. Program Management & Template Library
- **Intelligent Program Design:** Templates have specific goals and durations (e.g., 4-week strength cycles, 30-day skill challenges, the Home Iron series).
- **Filterable Template Library:** Filter by Program Type, Skill Level, Goal, and Equipment.
- **Load & Auto-Schedule:** Add a template to your library and schedule its workouts onto your calendar in one step.
- **Create From Scratch:** Build as many custom programs as you like.
- **Full Customization:** Rename programs, create new workouts, edit existing ones.

### 2. Powerful Workout Editor
- **Modular Blocks:** Warm-up, Strength, Conditioning, Cardio, and more.
- **Strength Blocks:** Sets, reps and load per exercise, including percentage-based loads calculated from your saved 1-Rep Max.
- **Conditioning Blocks:** AMRAP, RFT, Chipper, Tabata, EMOM and custom Intervals.

### 3. Interactive Workout Experience
- **Live Tracking & Timers:** Log sets/reps in real time with context-aware timers.
- **Score Logging:** Record round times, final times, and reps/rounds.
- **1RM Percentage Calculation:** Target weights shown from your saved 1-Rep Max.

### 4. Calendar & Logbook
- **Multi-Workout Scheduling:** Several workouts per day, tracked individually.
- **Interactive Day Modal:** Review scheduled and completed sessions with a full performance summary.
- **Completed workouts keep a snapshot** of what you did, so history stays correct even if you later edit the program.

### 5. Progress Tracking (free for everyone)
- **Dashboard:** Total workouts, lifetime volume, total reps, streaks.
- **1-Rep Max tracking** for key lifts.
- **Historical performance:** See your previous results for an exercise when you start a workout.
- **Weight & Photo logging:** Body-weight chart, plus one **before** and one **after** photo you can change any time (photos are compressed before saving).
- **Backup & Restore:** Download all your data as a file and restore it later.

### 6. Community & Social Features (Premium)
- **Unique Usernames**, friend search and requests.
- **View Friend Activity:** your friends' current-month calendar and completed workouts.
- **Share Programs:** send a full, independent copy of any program to a friend.

### 7. Quality of Life
- **In-App Explanations** for conditioning types.
- **Light & Dark Mode.**
- **Responsive design** that works on phones, tablets and desktops.
- **Save warnings:** a banner appears if data can't be saved to the device or to the cloud, so nothing fails silently.

## 💻 Technical Stack
- **Framework:** React 18 with Vite
- **State Management:** React Context API (custom hooks per feature, `usePersistentState` for `localStorage`)
- **Styling:** CSS with variables for theming
- **Backend:** Firebase (Authentication & Cloud Firestore); Firebase Admin in the serverless functions
- **Payments:** Stripe (SetupIntent + Subscriptions API)
- **Deployment:** Vercel (frontend + serverless functions in `api/`)
- **Libraries:** `recharts`, `lucide-react`, `react-compare-slider`, `react-confetti`, `@stripe/stripe-js`, `@stripe/react-stripe-js`

## 🏗️ Architecture

### Project layout
- `src/` – the React app.
- `api/` – Vercel serverless endpoints (each file is a URL).
- `server/` – helpers shared by the endpoints (Firebase Admin, auth/CORS handling, Stripe helpers, user-data reading). Kept outside `api/` so they are **not** exposed as URLs.
- `shared/` – plain JavaScript used by **both** the app and the server (how cloud data is split into documents).
- `firestore.rules` – the Firestore security rules (copy into Firebase Console → Firestore → Rules and publish; this file is not deployed automatically).

### Payment Flow
1. **Free usage:** everything works immediately with `localStorage`.
2. **Sign-up:** email/password are collected; no Firebase account yet.
3. **Payment:** Stripe confirms the payment method.
4. **Account creation:** the Firebase user is created only after that succeeds.
5. **Subscription:** the app calls `/api/complete-subscription` with the new user's login token.
6. **Webhook:** Stripe events keep the user's subscription status up to date in Firestore.

### Data Storage
- **Free tier:** browser `localStorage` (about 5 MB per browser).
- **Premium tier:** Cloud Firestore, split into small documents because Firestore limits one document to 1 MB:
  - `users/{uid}` – small data: totals, weight history, settings, billing/social fields, `storageVersion: 2`, `programOrder`.
  - `users/{uid}/chunks/s_YYYY-MM` – one document per month of workout history.
  - `users/{uid}/chunks/p_{programId}` – one document per program.
  - `users/{uid}/chunks/photo_beforePhoto` / `photo_afterPhoto` – the two progress photos.
- **Saving:** only the documents that changed are written. Saving is refused if the cloud data could not be loaded first, so a failed read can never overwrite good data.
- **Migration:** accounts that still use the old single-document layout are moved automatically on their next sign-in. Old fields are removed only after the new documents are read back and verified to match.
- **Friends' view:** the server sends only the current month (and neighbouring months) and only the workouts used in them.

## 🛠️ For Developers

1. Clone the repository and run `npm install`.
2. Create environment variables:
   - **Frontend (Vite):** `VITE_API_KEY`, `VITE_AUTH_DOMAIN`, `VITE_PROJECT_ID`, `VITE_STORAGE_BUCKET`, `VITE_MESSAGING_SENDER_ID`, `VITE_APP_ID`, `VITE_STRIPE_PUBLISHABLE_KEY`.
   - **Server (Vercel):** `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `STRIPE_WEBHOOK_SECRET`.
   - **Optional (server):** `SITE_URL` and/or `ALLOWED_ORIGINS` (comma-separated) if the site is served from a domain other than `blockfit.app` / `www.blockfit.app`.
3. Run the dev server with `npm run dev`. The `/api` routes only run on Vercel (or `vercel dev`), not in the plain Vite dev server.
4. Publish `firestore.rules` in the Firebase Console.
5. Deploy to Vercel.

### Deploying changes safely
- Publish new Firestore rules **before** deploying code that needs them.
- Use the Firebase Console **Rules Playground** to check rules.
- Close or refresh open BlockFit tabs on every device after a deploy so they stop running old code.
- Keep the Firebase project on the **Blaze** (pay-as-you-go) plan with a budget alert, so a busy day can't hit a hard limit.

## 📱 Mobile Support
- Responsive, mobile-first design with a touch-friendly interface.
- The app is a normal website (not an installable PWA) and needs a connection to load. Once loaded, your data is kept on the device.

---

**BlockFit** - Intelligent program design and effortless progress tracking.