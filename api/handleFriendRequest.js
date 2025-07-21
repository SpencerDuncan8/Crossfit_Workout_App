// /api/handleFriendRequest.js

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
    const { currentUserUid, requesterUid, action } = req.body; // action can be "accept" or "decline"

    if (!currentUserUid || !requesterUid || !action) {
      return res.status(400).json({ error: 'Missing required parameters.' });
    }

    const currentUserRef = db.collection('users').doc(currentUserUid);
    const requesterRef = db.collection('users').doc(requesterUid);

    const batch = db.batch();

    // Always remove the request from both users' lists regardless of action
    batch.update(currentUserRef, {
      friendRequestsReceived: admin.firestore.FieldValue.arrayRemove(requesterUid)
    });
    batch.update(requesterRef, {
      friendRequestsSent: admin.firestore.FieldValue.arrayRemove(currentUserUid)
    });

    // If the action is "accept", add each user to the other's friends list
    if (action === 'accept') {
      batch.update(currentUserRef, {
        friends: admin.firestore.FieldValue.arrayUnion(requesterUid)
      });
      batch.update(requesterRef, {
        friends: admin.firestore.FieldValue.arrayUnion(currentUserUid)
      });
    }

    await batch.commit();

    const message = action === 'accept' ? 'Friend request accepted!' : 'Friend request declined.';
    res.status(200).json({ success: true, message });

  } catch (error) {
    console.error(`Error handling friend request for action "${req.body.action}":`, error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
}