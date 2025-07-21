// src/components/Community/CommunityView.jsx

import React, { useState, useContext, useEffect } from 'react';
import { AppStateContext } from '../../context/AppContext';
import { Search, UserPlus, Check, Clock, UserCheck, UserX, User } from 'lucide-react'; // NEW: Added User icon

const CommunityView = () => {
  const { appState, currentUser, sendFriendRequest, handleFriendRequest } = useContext(AppStateContext);
  
  // States for search
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

  // States for friend requests
  const [requestUsers, setRequestUsers] = useState([]);
  const [isLoadingRequests, setIsLoadingRequests] = useState(true);
  
  // --- NEW: States for the friends list ---
  const [friendUsers, setFriendUsers] = useState([]);
  const [isLoadingFriends, setIsLoadingFriends] = useState(true);

  // useEffect for friend requests (existing)
  useEffect(() => {
    const fetchRequestUsers = async () => {
      const requestUids = appState.friendRequestsReceived;
      if (requestUids && requestUids.length > 0) {
        setIsLoadingRequests(true);
        try {
          const response = await fetch('/api/getUsersBatch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uids: requestUids }),
          });
          const data = await response.json();
          if (response.ok) setRequestUsers(data);
        } catch (error) {
          console.error("Failed to fetch request user data:", error);
        } finally {
          setIsLoadingRequests(false);
        }
      } else {
        setRequestUsers([]);
        setIsLoadingRequests(false);
      }
    };
    fetchRequestUsers();
  }, [appState.friendRequestsReceived]);

  // --- NEW: useEffect to fetch data for the friends list ---
  useEffect(() => {
    const fetchFriendUsers = async () => {
      const friendUids = appState.friends;
      if (friendUids && friendUids.length > 0) {
        setIsLoadingFriends(true);
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
          console.error("Failed to fetch friend user data:", error);
        } finally {
          setIsLoadingFriends(false);
        }
      } else {
        setFriendUsers([]);
        setIsLoadingFriends(false);
      }
    };

    fetchFriendUsers();
  }, [appState.friends]); // This runs whenever the friends list changes

  // ... (handleSearch, handleSendRequest, handleRequestAction, renderSearchResults functions remain exactly the same) ...
  const handleSearch = async (e) => { e.preventDefault(); if (searchTerm.trim().length < 3) { setSearchError('Please enter at least 3 characters to search.'); return; } setIsSearching(true); setSearchError(''); setSearchResults(null); try { const response = await fetch('/api/searchUsers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: searchTerm }), }); const data = await response.json(); if (!response.ok) { setSearchError(data.message || 'No user found.'); } else { setSearchResults(data); } } catch (err) { setSearchError(err.message); } finally { setIsSearching(false); } };
  const handleSendRequest = async (receiverUid) => { try { await sendFriendRequest(receiverUid); setSearchResults(prev => ({ ...prev, requestSent: true })); } catch (err) { alert(err.message); } };
  const handleRequestAction = async (requesterUid, action) => { try { await handleFriendRequest(requesterUid, action); } catch (err) { alert(err.message); } };
  const renderSearchResults = () => { if (isSearching) return <p className="search-status-text">Searching...</p>; if (searchError) return <p className="search-status-text error">{searchError}</p>; if (searchResults) { const isSelf = searchResults.uid === currentUser?.uid; const isFriend = appState.friends?.includes(searchResults.uid); const requestSent = appState.friendRequestsSent?.includes(searchResults.uid) || searchResults.requestSent; const requestReceived = appState.friendRequestsReceived?.includes(searchResults.uid); let button; if (isSelf) { button = <button className="add-friend-btn" disabled>This is you</button>; } else if (isFriend) { button = <button className="add-friend-btn is-friend" disabled><Check size={18} /> Friends</button>; } else if (requestSent) { button = <button className="add-friend-btn is-pending" disabled><Clock size={18} /> Request Sent</button>; } else if (requestReceived) { button = <button className="add-friend-btn is-pending" disabled>Check Requests</button>; } else { button = ( <button className="add-friend-btn" onClick={() => handleSendRequest(searchResults.uid)}><UserPlus size={18} /> Add Friend</button> ); } return ( <div className="search-result-item"> <div className="user-info"><span className="username">{searchResults.username}</span></div> {button} </div> ); } return null; };

  return (
    <div className="community-view-container">
      <div className="page-header">
        <h1>Community</h1>
        <p>Find friends to view their progress and share workouts.</p>
      </div>

      <div className="community-section">
        <h3 className="community-section-title">Friend Requests ({requestUsers.length})</h3>
        {isLoadingRequests ? (
          <p className="search-status-text">Loading requests...</p>
        ) : requestUsers.length > 0 ? (
          <div className="friend-request-list">
            {requestUsers.map(user => (
              <div key={user.uid} className="friend-request-item">
                <span className="username">{user.username}</span>
                <div className="request-actions">
                  <button className="request-btn decline" onClick={() => handleRequestAction(user.uid, 'decline')}><UserX size={16} /></button>
                  <button className="request-btn accept" onClick={() => handleRequestAction(user.uid, 'accept')}><UserCheck size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="search-status-text">You have no pending friend requests.</p>
        )}
      </div> 

      {/* --- NEW: My Friends Section --- */}
      <div className="community-section">
        <h3 className="community-section-title">My Friends ({friendUsers.length})</h3>
        {isLoadingFriends ? (
          <p className="search-status-text">Loading friends...</p>
        ) : friendUsers.length > 0 ? (
          <div className="friends-list">
            {friendUsers.map(user => (
              <div key={user.uid} className="friend-item">
                <div className="user-info">
                  <div className="friend-avatar"><User size={20} /></div>
                  <span className="username">{user.username}</span>
                </div>
                {/* This button will be used in the next phase */}
                <button className="view-profile-btn">View</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="search-status-text">You haven't added any friends yet.</p>
        )}
      </div> 

      <div className="community-section">
        <h3 className="community-section-title">Find Friends</h3>
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input type="text" placeholder="Search by exact username..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input"/>
          </div>
          <button type="submit" className="search-button" disabled={isSearching}> Search </button>
        </form>
        <div className="search-results-container">
          {renderSearchResults()}
        </div>
      </div>
    </div>
  );
};

export default CommunityView;