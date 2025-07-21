// /api/getUsersBatch.js

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
    const { uids } = req.body;

    if (!Array.isArray(uids) || uids.length === 0) {
      return res.status(200).json([]); // Return empty array if no UIDs are provided
    }

    // Firestore `in` queries are limited to 10 items.
    // If you expect more, you'd need to batch this, but for friend requests, 10 is plenty.
    const uniqueUids = [...new Set(uids)].slice(0, 10);

    const usersQuery = await db.collection('users').where(admin.firestore.FieldPath.documentId(), 'in', uniqueUids).get();
    
    const usersData = usersQuery.docs.map(doc => {
      const data = doc.data();
      // Return only public information
      return {
        uid: doc.id,
        username: data.username || 'Unknown User',
      };
    });

    res.status(200).json(usersData);

  } catch (error) {
    console.error('Error fetching users by UID batch:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
}