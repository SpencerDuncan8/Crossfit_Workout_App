// /api/sendFriendRequest.js

import { admin, db } from '../server/firebaseAdmin.js';
import { createHandler, HttpError, requireString } from '../server/http.js';

export default createHandler(async (req, res) => {
  const senderUid = req.user.uid; // from the verified login token, not the request body
  const receiverUid = requireString(req.body.receiverUid, 'Receiver UID');

  if (senderUid === receiverUid) {
    throw new HttpError(400, 'You cannot send a friend request to yourself.');
  }

  const senderRef = db.collection('users').doc(senderUid);
  const receiverRef = db.collection('users').doc(receiverUid);
  const [senderDoc, receiverDoc] = await Promise.all([senderRef.get(), receiverRef.get()]);

  if (!receiverDoc.exists) throw new HttpError(404, 'User not found.');
  if (!senderDoc.exists) throw new HttpError(400, 'Your account is not set up yet. Please try again in a moment.');

  if ((senderDoc.data().friends || []).includes(receiverUid)) {
    throw new HttpError(400, 'You are already friends.');
  }

  const batch = db.batch();
  batch.update(senderRef, { friendRequestsSent: admin.firestore.FieldValue.arrayUnion(receiverUid) });
  batch.update(receiverRef, { friendRequestsReceived: admin.firestore.FieldValue.arrayUnion(senderUid) });
  await batch.commit();

  res.status(200).json({ success: true, message: 'Friend request sent!' });
});