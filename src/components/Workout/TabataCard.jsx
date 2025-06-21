// src/components/Workout/TabataCard.jsx

import React, { useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { Play } from 'lucide-react';

const TabataCard = ({ data }) => {
  const { startTimer } = useContext(AppStateContext);
  const { name, format, rounds } = data;

  const handleStartWOD = () => {
    startTimer({ type: 'tabata', tabataRounds: rounds.length * 2 }); // Each entry is 2 rounds of 20/10
  };

  return (
    <div className="conditioning-card">
      <div className="conditioning-header">
        <h3>{name}</h3>
        <span className="wod-format-badge">{format}</span>
      </div>
      <ul className="exercise-list">
        {rounds.map((r, index) => (
          <li key={index} className="exercise-list-item">
            <span className="exercise-list-name">{r.exercise}</span>
            <span className="exercise-list-reps tabata-rounds-badge">{`Rounds ${r.round}`}</span>
          </li>
        ))}
      </ul>
      <button className="start-wod-button tabata-button" onClick={handleStartWOD}>
        <Play size={20} />
        Start Tabata
      </button>
    </div>
  );
};

export default TabataCard;