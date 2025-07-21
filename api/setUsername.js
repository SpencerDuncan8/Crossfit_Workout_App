// /api/setUsername.js

import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
// This code ensures we don't try to re-initialize the app on every function call in a development environment.
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Replace escaped newlines with actual newlines for the private key
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

const db = admin.firestore();

export default async function handler(req, res) {
  // We only want to accept POST requests for this action
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { uid, username } = req.body;

    // 1. VALIDATION: Ensure we have the necessary data
    if (!uid || !username) {
      return res.status(400).json({ error: 'User ID and username are required.' });
    }

    // 2. SANITIZATION: Clean up the username to ensure it's valid
    const sanitizedUsername = username.toLowerCase().trim();
    if (sanitizedUsername.length < 3 || sanitizedUsername.length > 15) {
      return res.status(400).json({ error: 'Username must be 3-15 characters long.' });
    }
    if (!/^[a-z0-9_]+$/.test(sanitizedUsername)) {
      return res.status(400).json({ error: 'Username can only contain lowercase letters, numbers, and underscores.' });
    }

    // 3. FIRESTORE TRANSACTION: This is a crucial step for security.
    // A transaction ensures that all database operations (checking and writing) either
    // succeed together or fail together, preventing two users from claiming the same name simultaneously.
    await db.runTransaction(async (transaction) => {
      // Check if the desired username already exists in our `usernames` collection
      const usernameRef = db.collection('usernames').doc(sanitizedUsername);
      const usernameDoc = await transaction.get(usernameRef);

      if (usernameDoc.exists) {
        // If the document exists, the name is taken. We throw an error to stop the transaction.
        throw new Error('Username is already taken. Please choose another.');
      }

      // If the name is available, we'll proceed.
      const userDocRef = db.collection('users').doc(uid);

      // Create the new username record, linking it to the user's UID.
      transaction.set(usernameRef, { uid: uid });

      // Update the user's profile document with their new username.
      transaction.update(userDocRef, { username: sanitizedUsername });
    });

    // 4. SUCCESS RESPONSE: If the transaction completes without errors, send a success message back.
    res.status(200).json({ success: true, message: 'Username set successfully!' });

  } catch (error) {
    // 5. ERROR HANDLING: If anything goes wrong, send back a clear error message.
    console.error('Error setting username:', error);
    // The error message from our `throw new Error(...)` above will be sent here.
    res.status(400).json({ error: error.message || 'An unexpected error occurred.' });
  }
}