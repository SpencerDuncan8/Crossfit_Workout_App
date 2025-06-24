// src/components/Progress/OneRepMaxEditor.jsx

import React, { useContext, useState, useEffect } from 'react';
import { AppStateContext } from '../../context/AppContext';
import { Target } from 'lucide-react';

// --- THE FIX: Export this array so other components can use it. ---
export const trackedLifts = [
  { id: 'squat', name: 'Squat' },
  { id: 'bench_press', name: 'Bench Press' },
  { id: 'deadlift', name: 'Deadlift' },
  { id: 'overhead_press', name: 'Overhead Press' },
];

const OneRepMaxEditor = () => {
  const { appState, updateOneRepMax } = useContext(AppStateContext);
  
  const [localMaxes, setLocalMaxes] = useState(appState.oneRepMaxes || {});

  useEffect(() => {
    setLocalMaxes(appState.oneRepMaxes || {});
  }, [appState.oneRepMaxes]);

  const handleInputChange = (exerciseId, value) => {
    setLocalMaxes(prev => ({
      ...prev,
      [exerciseId]: value,
    }));
  };
  
  const handleBlur = (exerciseId) => {
    const value = localMaxes[exerciseId];
    updateOneRepMax(exerciseId, value);
  };
  
  return (
    <div className="progress-card">
      <div className="progress-card-header">
        <h3 className="progress-card-title">One-Rep Maxes</h3>
        <Target size={24} className="progress-card-icon" />
      </div>
      <p className="danger-zone-text" style={{margin: 0}}>
        Enter your current one-rep max for these lifts. This will be used for percentage-based training calculations.
      </p>
      <div className="one-rep-max-list">
        {trackedLifts.map(lift => (
          <div key={lift.id} className="one-rep-max-row">
            <span className="orm-exercise-name">{lift.name}</span>
            <div className="orm-input-group">
              <input
                type="number"
                className="orm-input"
                placeholder="0"
                value={localMaxes[lift.id] || ''}
                onChange={(e) => handleInputChange(lift.id, e.target.value)}
                onBlur={() => handleBlur(lift.id)}
              />
              <span className="orm-unit-label">lbs</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OneRepMaxEditor;