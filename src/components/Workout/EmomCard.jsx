// src/components/Workout/EmomCard.jsx

import React, { useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { Play } from 'lucide-react';

const EmomCard = ({ data }) => {
  const { startTimer } = useContext(AppStateContext);
  const { name, format, exercises } = data;

  const handleStartWOD = () => {
    const durationMinutes = parseInt(format.match(/\d+/)[0], 10);
    startTimer({ type: 'emom', duration: durationMinutes });
  };

  return (
    <div className="conditioning-card">
      <div className="conditioning-header">
        <h3>{name}</h3>
        <span className="wod-format-badge">{format}</span>
      </div>
      <ul className="exercise-list">
        {exercises.map((ex, index) => (
          <li key={index} className="exercise-list-item">
            <span className="exercise-list-name">{ex.name}</span>
            <span className="exercise-list-reps emom-reps">{ex.reps}</span>
          </li>
        ))}
      </ul>
      <button className="start-wod-button emom-button" onClick={handleStartWOD}>
        <Play size={20} />
        Start EMOM
      </button>
    </div>
  );
};

export default EmomCard;