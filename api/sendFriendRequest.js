// /api/sendFriendRequest.js

import admin from 'firebase-admin';

if (!admin.apps.length) {
  // Initialize Firebase Admin SDK
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
    const { senderUid, receiverUid } = req.body;

    if (!senderUid || !receiverUid) {
      return res.status(400).json({ error: 'Sender and receiver UIDs are required.' });
    }
    
    if (senderUid === receiverUid) {
        return res.status(400).json({ error: 'You cannot send a friend request to yourself.' });
    }

    // Get references to both user documents
    const senderRef = db.collection('users').doc(senderUid);
    const receiverRef = db.collection('users').doc(receiverUid);

    // Use a batch write to update both documents atomically
    const batch = db.batch();

    // Add receiver's UID to the sender's 'friendRequestsSent' array
    batch.update(senderRef, {
      friendRequestsSent: admin.firestore.FieldValue.arrayUnion(receiverUid)
    });

    // Add sender's UID to the receiver's 'friendRequestsReceived' array
    batch.update(receiverRef, {
      friendRequestsReceived: admin.firestore.FieldValue.arrayUnion(senderUid)
    });

    await batch.commit();

    res.status(200).json({ success: true, message: 'Friend request sent!' });

  } catch (error) {
    console.error('Error sending friend request:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
}