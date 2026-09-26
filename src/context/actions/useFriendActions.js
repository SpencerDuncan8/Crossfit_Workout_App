// src/context/actions/useFriendActions.js

import { useCallback, useMemo } from 'react';

export const useFriendActions = ({ appState, currentUser, updateAppState }) => {
  const sendFriendRequest = useCallback(async (receiverUid) => {
    if (!currentUser) throw new Error("Not logged in.");

    const response = await fetch('/api/sendFriendRequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senderUid: currentUser.uid, receiverUid }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to send friend request.');
    }

    // Optimistically update local state for instant feedback
    updateAppState({
      friendRequestsSent: [...(appState.friendRequestsSent || []), receiverUid]
    });

    return data; // Return success data
  }, [currentUser, appState.friendRequestsSent, updateAppState]);

  const handleFriendRequest = useCallback(async (requesterUid, action) => {
    if (!currentUser) throw new Error("Not logged in.");

    const response = await fetch('/api/handleFriendRequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentUserUid: currentUser.uid, requesterUid, action }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || `Failed to ${action} request.`);
    }

    // Optimistically update local state
    const updatedRequests = (appState.friendRequestsReceived || []).filter(uid => uid !== requesterUid);
    if (action === 'accept') {
      const updatedFriends = [...(appState.friends || []), requesterUid];
      updateAppState({
        friendRequestsReceived: updatedRequests,
        friends: updatedFriends,
      });
    } else { // decline
      updateAppState({
        friendRequestsReceived: updatedRequests,
      });
    }

    return data;
  }, [currentUser, appState.friendRequestsReceived, appState.friends, updateAppState]);

  return useMemo(() => ({
    sendFriendRequest, handleFriendRequest,
  }), [
    sendFriendRequest, handleFriendRequest,
  ]);
};