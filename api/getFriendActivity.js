// /api/getFriendActivity.js

import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { friendUid } = req.body;

    if (!friendUid) {
      return res.status(400).json({ error: 'Friend User ID is required.' });
    }

    const userDocRef = db.collection('users').doc(friendUid);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const userData = userDoc.data();

    // Prepare a safe, public version of the user's data
    // Crucially, we are ONLY sending the username and workoutSchedule.
    const publicFriendData = {
      username: userData.username || 'Unknown User',
      workoutSchedule: userData.workoutSchedule || {},
    };

    res.status(200).json(publicFriendData);

  } catch (error) {
    console.error('Error fetching friend activity:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
}