// src/components/Workout/TabataCard.jsx

import React, { useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { Play } from 'lucide-react';

const TabataCard = ({ data }) => {
  const { startTimer } = useContext(AppStateContext);
  const { name, format, rounds } = data;

  const handleStartWOD = () => {
    // THE FIX: Be more specific about where to get the round count from.
    // This assumes the format will be like "8 Rounds Tabata".
    // It defaults to the old calculation if no number is found.
    const totalRounds = parseInt(format.match(/\d+/)?.[0], 10) || rounds.length;
    startTimer({ type: 'tabata', tabataRounds: totalRounds });
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