// src/components/Community/CommunityView.jsx

import React, { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';

const CommunityView = () => {
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
        // If the user is not found (404), we'll get a message. Otherwise, throw an error.
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

  const renderSearchResults = () => {
    if (isLoading) {
      return <p className="search-status-text">Searching...</p>;
    }
    if (error) {
      return <p className="search-status-text error">{error}</p>;
    }
    if (searchResults) {
      return (
        <div className="search-result-item">
          <div className="user-info">
            <span className="username">{searchResults.username}</span>
          </div>
          <button className="add-friend-btn">
            <UserPlus size={18} />
            Add Friend
          </button>
        </div>
      );
    }
    return null; // Don't show anything if there's no search performed yet
  };

  return (
    <div className="community-view-container">
      <div className="page-header">
        <h1>Community</h1>
        <p>Find friends to view their progress and share workouts.</p>
      </div>

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