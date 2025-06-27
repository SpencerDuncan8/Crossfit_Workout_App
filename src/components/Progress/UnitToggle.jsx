// src/components/Progress/UnitToggle.jsx

import React, { useContext } from 'react';
import { AppStateContext } from '../../context/AppContext';

const UnitToggle = () => {
  const { appState, toggleUnitSystem } = useContext(AppStateContext);
  const { unitSystem } = appState;

  const isImperial = unitSystem === 'imperial';

  return (
    <div className="progress-card">
        <div className="progress-card-header">
            <h3 className="progress-card-title">Unit System</h3>
        </div>
        <p className="danger-zone-text" style={{margin: '0 0 16px 0'}}>
            Select your preferred unit of measurement for weight.
        </p>
        <div className="unit-toggle-container">
            <button
                className={`unit-toggle-btn ${isImperial ? 'active' : ''}`}
                onClick={!isImperial ? toggleUnitSystem : undefined}
            >
                Imperial (lbs)
            </button>
            <button
                className={`unit-toggle-btn ${!isImperial ? 'active' : ''}`}
                onClick={isImperial ? toggleUnitSystem : undefined}
            >
                Metric (kg)
            </button>
        </div>
    </div>
  );
};

export default UnitToggle;