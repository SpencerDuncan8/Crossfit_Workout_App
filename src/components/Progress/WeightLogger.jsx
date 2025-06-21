// src/components/Progress/WeightLogger.jsx

import React, { useState, useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { TrendingUp } from 'lucide-react';

const WeightLogger = () => {
  const { addWeightEntry } = useContext(AppStateContext);
  const [weight, setWeight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newWeight = parseFloat(weight);
    if (!isNaN(newWeight) && newWeight > 0) {
      addWeightEntry(newWeight);
      setWeight(''); // Clear input after submission
    }
  };

  return (
    <div className="progress-card">
      <div className="progress-card-header">
        <div className="progress-card-icon" style={{ backgroundColor: '#3b82f6' }}>
          <TrendingUp size={24} color="white" />
        </div>
        <h3 className="progress-card-title">Log Your Weight</h3>
      </div>
      <form className="weight-logger-form" onSubmit={handleSubmit}>
        <input
          type="number"
          step="0.1"
          className="weight-input"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter current weight"
        />
        <button type="submit" className="log-weight-btn">Log</button>
      </form>
    </div>
  );
};

export default WeightLogger;