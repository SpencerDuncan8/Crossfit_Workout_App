// src/components/Community/CommunityView.jsx

import React, { useState, useContext } from 'react'; // Import useContext
import { AppStateContext } from '../../context/AppContext'; // Import AppStateContext
import { Search, UserPlus, Check, Clock } from 'lucide-react';

const CommunityView = () => {
  const { appState, currentUser } = useContext(AppStateContext); // Get app state and current user
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim().length < 3) {
      setError('Please enter at least 3 characters to search.');
      return;
    }
    setIsLoading(true);
    setError('');
    setSearchResults(null);

    try {
      const response = await fetch('/api/searchUsers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: searchTerm }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          setError(data.message || 'No user found with that username.');
        } else {
          throw new Error(data.error || 'An error occurred during search.');
        }
      } else {
        setSearchResults(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- NEW FUNCTION to send a friend request ---
  const handleSendRequest = async (receiverUid) => {
    if (!currentUser) {
      alert("You must be logged in to send friend requests.");
      return;
    }

    // Disable the button to prevent multiple clicks
    const originalButtonText = document.querySelector('.add-friend-btn').innerHTML;
    document.querySelector('.add-friend-btn').disabled = true;
    document.querySelector('.add-friend-btn').innerHTML = 'Sending...';

    try {
      const response = await fetch('/api/sendFriendRequest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderUid: currentUser.uid, receiverUid: receiverUid }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send request.');
      }

      // Optimistically update the UI
      setSearchResults(prev => ({ ...prev, requestSent: true }));

    } catch (err) {
      alert(err.message); // Show error to user
      // Re-enable button on failure
      document.querySelector('.add-friend-btn').disabled = false;
      document.querySelector('.add-friend-btn').innerHTML = originalButtonText;
    }
  };

  const renderSearchResults = () => {
    if (isLoading) return <p className="search-status-text">Searching...</p>;
    if (error) return <p className="search-status-text error">{error}</p>;

    if (searchResults) {
      // Check friendship status
      const isSelf = searchResults.uid === currentUser?.uid;
      const isFriend = appState.friends?.includes(searchResults.uid);
      const requestSent = appState.friendRequestsSent?.includes(searchResults.uid) || searchResults.requestSent;
      
      let button;
      if (isSelf) {
        button = <button className="add-friend-btn" disabled>This is you</button>;
      } else if (isFriend) {
        button = <button className="add-friend-btn is-friend" disabled><Check size={18} /> Friends</button>;
      } else if (requestSent) {
        button = <button className="add-friend-btn is-pending" disabled><Clock size={18} /> Request Sent</button>;
      } else {
        button = (
          <button className="add-friend-btn" onClick={() => handleSendRequest(searchResults.uid)}>
            <UserPlus size={18} />
            Add Friend
          </button>
        );
      }

      return (
        <div className="search-result-item">
          <div className="user-info">
            <span className="username">{searchResults.username}</span>
          </div>
          {button}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="community-view-container">
      <div className="page-header">
        <h1>Community</h1>
        <p>Find friends to view their progress and share workouts.</p>
      </div>

      {/* Friend Requests Section - We will build this out next */}
      {/* 
      <div className="community-section">
        <h3 className="community-section-title">Friend Requests (0)</h3>
        <p className="search-status-text">You have no pending friend requests.</p>
      </div> 
      */}

      {/* My Friends Section - We will build this out next */}
      {/* 
      <div className="community-section">
        <h3 className="community-section-title">My Friends (0)</h3>
        <p className="search-status-text">You haven't added any friends yet.</p>
      </div> 
      */}

      <div className="community-section">
        <h3 className="community-section-title">Find Friends</h3>
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-input-wrapper">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search by exact username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button type="submit" className="search-button" disabled={isLoading}>
            Search
          </button>
        </form>
        <div className="search-results-container">
          {renderSearchResults()}
        </div>
      </div>
    </div>
  );
};

export default CommunityView;