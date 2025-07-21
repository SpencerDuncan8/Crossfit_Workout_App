// /api/searchUsers.js

import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

const db = admin.firestore();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { username } = req.body;
    const sanitizedUsername = username.toLowerCase().trim();

    // 1. VALIDATION: Ensure a username was provided
    if (!sanitizedUsername) {
      return res.status(400).json({ error: 'Username is required.' });
    }

    // 2. SEARCH: Look for the username in the `usernames` collection
    const usernameRef = db.collection('usernames').doc(sanitizedUsername);
    const usernameDoc = await usernameRef.get();

    if (!usernameDoc.exists) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // 3. FETCH USER DATA: Get the user's UID from the username document
    const { uid } = usernameDoc.data();
    const userDocRef = db.collection('users').doc(uid);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      // This is an edge case, but good to handle. It means the username exists
      // but the corresponding user document does not.
      return res.status(404).json({ message: 'User data not found.' });
    }

    const userData = userDoc.data();

    // 4. RETURN PUBLIC DATA: Only send back information that is safe to be public.
    // NEVER send back the user's email or other sensitive data.
    const publicUserData = {
      uid: userDoc.id,
      username: userData.username,
      // We can add more public fields later, like a profile picture URL
    };

    res.status(200).json(publicUserData);

  } catch (error) {
    console.error('Error searching for user:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
}