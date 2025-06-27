// src/components/Progress/OneRepMaxEditor.jsx

import React, { useContext, useState, useEffect } from 'react';
import { AppStateContext } from '../../context/AppContext';
import { Target } from 'lucide-react';
import { lbsToKg, kgToLbs, getUnitLabel } from '../../utils/unitUtils.js';

export const trackedLifts = [
  { id: 'squat', name: 'Squat' },
  { id: 'bench_press', name: 'Bench Press' },
  { id: 'deadlift', name: 'Deadlift' },
  { id: 'overhead_press', name: 'Overhead Press' },
];

const OneRepMaxEditor = () => {
  const { appState, updateOneRepMax } = useContext(AppStateContext);
  const { oneRepMaxes, unitSystem } = appState;
  
  const [localMaxes, setLocalMaxes] = useState({});

  useEffect(() => {
    const convertedMaxes = {};
    for (const lift of trackedLifts) {
      const weightLbs = oneRepMaxes[lift.id] || '';
      if (unitSystem === 'metric' && weightLbs) {
        convertedMaxes[lift.id] = parseFloat(lbsToKg(weightLbs).toFixed(1));
      } else {
        convertedMaxes[lift.id] = weightLbs;
      }
    }
    setLocalMaxes(convertedMaxes);
  }, [oneRepMaxes, unitSystem]);

  const handleInputChange = (exerciseId, value) => {
    setLocalMaxes(prev => ({
      ...prev,
      [exerciseId]: value,
    }));
  };
  
  const handleBlur = (exerciseId) => {
    const value = localMaxes[exerciseId];
    let weightInLbs = parseFloat(value);
    
    if (isNaN(weightInLbs)) {
      weightInLbs = 0;
    }
    
    if (unitSystem === 'metric') {
      weightInLbs = kgToLbs(weightInLbs);
    }
    updateOneRepMax(exerciseId, weightInLbs);
  };

  const unitLabel = getUnitLabel(unitSystem);
  
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
                step="0.1"
                className="orm-input"
                placeholder="0"
                value={localMaxes[lift.id] || ''}
                onChange={(e) => handleInputChange(lift.id, e.target.value)}
                onBlur={() => handleBlur(lift.id)}
              />
              <span className="orm-unit-label">{unitLabel}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OneRepMaxEditor;