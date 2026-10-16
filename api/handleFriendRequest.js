// /api/handleFriendRequest.js

import { admin, db } from '../server/firebaseAdmin.js';
import { createHandler, HttpError, requireString } from '../server/http.js';

export default createHandler(async (req, res) => {
  const currentUserUid = req.user.uid; // from the verified login token
  const requesterUid = requireString(req.body.requesterUid, 'Requester UID');
  const action = req.body.action;

  if (action !== 'accept' && action !== 'decline') {
    throw new HttpError(400, 'Action must be "accept" or "decline".');
  }

  const currentUserRef = db.collection('users').doc(currentUserUid);
  const requesterRef = db.collection('users').doc(requesterUid);
  const currentUserDoc = await currentUserRef.get();

  // You can only answer a request that was actually sent to you.
  if (!currentUserDoc.exists || !(currentUserDoc.data().friendRequestsReceived || []).includes(requesterUid)) {
    throw new HttpError(400, 'There is no pending friend request from that user.');
  }

  const batch = db.batch();
  batch.update(currentUserRef, { friendRequestsReceived: admin.firestore.FieldValue.arrayRemove(requesterUid) });
  batch.update(requesterRef, { friendRequestsSent: admin.firestore.FieldValue.arrayRemove(currentUserUid) });

  if (action === 'accept') {
    batch.update(currentUserRef, { friends: admin.firestore.FieldValue.arrayUnion(requesterUid) });
    batch.update(requesterRef, { friends: admin.firestore.FieldValue.arrayUnion(currentUserUid) });
  }

  await batch.commit();

  res.status(200).json({
    success: true,
    message: action === 'accept' ? 'Friend request accepted!' : 'Friend request declined.',
  });
});