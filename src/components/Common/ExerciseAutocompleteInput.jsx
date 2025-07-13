// src/components/Common/ExerciseAutocompleteInput.jsx

import React, { useState, useEffect, useRef } from 'react';
import { searchExercises } from '../../data/exerciseDatabase.js';
import { X } from 'lucide-react';
import './ExerciseAutocompleteInput.css';

// This is now a "controlled" component. It does not manage its own text value.
const ExerciseAutocompleteInput = ({ value, onChange, onSelect, placeholder }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);

  useEffect(() => {
    if (value && value.length >= 2 && isFocused) {
      const results = searchExercises(value).slice(0, 10);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
    setActiveIndex(-1);
  }, [value, isFocused]);

  const handleSelect = (exercise) => {
    onSelect(exercise);
    setSuggestions([]);
    setIsFocused(false);
  };

  const handleBlur = () => {
    // A short delay allows a click on a suggestion to register before the blur closes the list.
    setTimeout(() => {
      if (isFocused) {
        // If the user blurs without selecting, treat it as a custom entry.
        onSelect({ id: null, name: value });
        setIsFocused(false);
      }
    }, 200);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex > -1 && suggestions[activeIndex]) {
        handleSelect(suggestions[activeIndex]);
      } else {
        // Treat Enter like a blur for custom entries
        onSelect({ id: null, name: value });
        setIsFocused(false);
      }
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      setIsFocused(false);
    }
  };

  const clearInput = () => {
    onChange(''); // Tell the parent to clear the value
  };

  return (
    <div className="autocomplete-container" ref={containerRef}>
      <div className="autocomplete-input-wrapper">
        <input
          type="text"
          value={value} // The value is now controlled by the parent
          onChange={(e) => onChange(e.target.value)} // Report changes up to the parent
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Search exercises..."}
          className="autocomplete-input"
        />
        {value && (
            <button type="button" className="clear-btn" onClick={clearInput}>
                <X size={16} />
            </button>
        )}
      </div>
      {isFocused && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((exercise, index) => (
            <li
              key={exercise.id}
              className={`suggestion-item ${index === activeIndex ? 'active' : ''}`}
              // Use onMouseDown to fire before the input's onBlur event
              onMouseDown={() => handleSelect(exercise)}
            >
              {exercise.name}
              <span className="suggestion-category">{exercise.category}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExerciseAutocompleteInput;