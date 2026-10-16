// /api/getUsersBatch.js

import { admin, db } from '../server/firebaseAdmin.js';
import { createHandler } from '../server/http.js';

export default createHandler(async (req, res) => {
  const callerUid = req.user.uid; // from the verified login token
  const requested = Array.isArray(req.body.uids) ? req.body.uids.filter(u => typeof u === 'string' && u) : [];
  if (requested.length === 0) return res.status(200).json([]);

  // You can only look up people you are connected to: friends and pending requests.
  const callerDoc = await db.collection('users').doc(callerUid).get();
  const callerData = callerDoc.exists ? callerDoc.data() : {};
  const allowed = new Set([
    ...(callerData.friends || []),
    ...(callerData.friendRequestsReceived || []),
    ...(callerData.friendRequestsSent || []),
  ]);

  const uids = [...new Set(requested)].filter(uid => allowed.has(uid)).slice(0, 50);
  if (uids.length === 0) return res.status(200).json([]);

  // Firestore "in" queries accept at most 10 ids at a time.
  const results = [];
  for (let i = 0; i < uids.length; i += 10) {
    const chunk = uids.slice(i, i + 10);
    const snapshot = await db.collection('users')
      .where(admin.firestore.FieldPath.documentId(), 'in', chunk)
      .get();
    snapshot.docs.forEach(doc => {
      results.push({ uid: doc.id, username: doc.data().username || 'Unknown User' });
    });
  }

  res.status(200).json(results);
});