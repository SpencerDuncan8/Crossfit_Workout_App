// src/components/Program/ShareProgramModal.jsx

import React, { useState, useEffect, useContext } from 'react';
import { AppStateContext } from '../../context/AppContext';
import { User, Send, CheckCircle, XCircle } from 'lucide-react';
import Modal from '../Common/Modal.jsx';

const ShareProgramModal = ({ isOpen, onClose, programToShare }) => {
  const { appState, currentUser } = useContext(AppStateContext);
  const [friendUsers, setFriendUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shareStatus, setShareStatus] = useState({}); // Tracks status per friend { friendUid: 'sending' | 'success' | 'error' }

  useEffect(() => {
    if (!isOpen) {
      setShareStatus({}); // Reset status when modal is closed/reopened
      return;
    }
    
    const fetchFriends = async () => {
      setIsLoading(true);
      const friendUids = appState.friends || [];
      if (friendUids.length > 0) {
        try {
          const response = await fetch('/api/getUsersBatch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uids: friendUids }),
          });
          const data = await response.json();
          if (response.ok) {
            setFriendUsers(data);
          }
        } catch (error) {
          console.error("Failed to fetch friends:", error);
        }
      }
      setIsLoading(false);
    };

    fetchFriends();
  }, [isOpen, appState.friends]);

  const handleShare = async (recipient) => {
    if (!currentUser || !programToShare) return;

    setShareStatus(prev => ({ ...prev, [recipient.uid]: 'sending' }));

    try {
      const response = await fetch('/api/shareProgram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderUid: currentUser.uid,
          recipientUid: recipient.uid,
          programId: programToShare.id
        }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to share program.');
      }

      setShareStatus(prev => ({ ...prev, [recipient.uid]: 'success' }));

    } catch (error) {
      console.error(error);
      setShareStatus(prev => ({ ...prev, [recipient.uid]: 'error' }));
    }
  };

  const renderShareButton = (friend) => {
    const status = shareStatus[friend.uid];
    if (status === 'sending') {
      return <button className="share-btn sending" disabled>Sending...</button>;
    }
    if (status === 'success') {
      return <button className="share-btn success" disabled><CheckCircle size={16} /> Sent</button>;
    }
    if (status === 'error') {
      return <button className="share-btn error" onClick={() => handleShare(friend)}><XCircle size={16} /> Retry</button>;
    }
    return (
      <button className="share-btn" onClick={() => handleShare(friend)}>
        <Send size={16} /> Share
      </button>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Share "${programToShare?.name}"`}>
      <div className="share-modal-content">
        {isLoading ? (
          <p className="search-status-text">Loading friends...</p>
        ) : friendUsers.length > 0 ? (
          <ul className="share-friend-list">
            {friendUsers.map(friend => (
              <li key={friend.uid} className="share-friend-item">
                <div className="user-info">
                  <div className="friend-avatar"><User size={20} /></div>
                  <span className="username">{friend.username}</span>
                </div>
                {renderShareButton(friend)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="search-status-text">You have no friends to share with yet. Add friends in the Community tab.</p>
        )}
      </div>
    </Modal>
  );
};

export default ShareProgramModal;