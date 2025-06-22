// src/components/Workout/ConditioningCard.jsx

import React, { useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { Play, HelpCircle } from 'lucide-react';

const ConditioningCard = ({ data }) => {
  const { startTimer, openExerciseModal } = useContext(AppStateContext);
  const { name, type, format, exercises, note, rounds, description } = data;

  const handleStartWOD = () => {
    if (type === 'amrap') {
      const durationMinutes = parseInt(format, 10);
      if (!isNaN(durationMinutes)) {
        // THE FIX: Use a dedicated 'amrap' type for clarity.
        startTimer({ type: 'amrap', duration: durationMinutes * 60 });
      }
    } else if (type === 'tabata') {
      const workRounds = data.rounds.length;
      startTimer({ type: 'tabata', tabataRounds: workRounds });
    } else if (type === 'emom') {
      const durationMinutes = parseInt(format, 10);
      if (!isNaN(durationMinutes)) {
        startTimer({ type: 'emom', duration: durationMinutes * 60 });
      }
    } else { 
      startTimer({ type: 'stopwatch' });
    }
  };
  
  const handleExerciseClick = (exercise) => {
    if (exercise.id) {
      openExerciseModal(exercise.id);
    }
  };

  const WOD_BUTTON_MAP = {
    amrap: { text: "Start AMRAP", style: "amrap-button" },
    fortime: { text: "Start Timer", style: "fortime-button" },
    emom: { text: "Start EMOM", style: "emom-button" },
    tabata: { text: "Start Tabata", style: "tabata-button" },
  };
  const buttonInfo = WOD_BUTTON_MAP[type] || { text: "Start Timer", style: "fortime-button" };

  return (
    <div className="conditioning-card">
      <div className="conditioning-header">
        <h3>{name}</h3>
        <span className="wod-format-badge">{format}</span>
      </div>
      {description && <p className="conditioning-description">{description}</p>}
      <ul className="exercise-list">
        {exercises?.map((ex, index) => (
          <li key={index} className="exercise-list-item clickable" onClick={() => handleExerciseClick(ex)}>
            <div className="exercise-list-main">
              <span className="exercise-list-reps">{ex.reps || ex.distance || ex.duration}</span>
              <span className="exercise-list-name">{ex.name || ex.exercise}</span>
            </div>
            {ex.id && <HelpCircle size={18} className="help-icon" />}
          </li>
        ))}
        {rounds?.map((r, i) => (
          <li key={i} className="exercise-list-item clickable" onClick={() => handleExerciseClick(r)}>
            <div className="exercise-list-main">
              <span className="exercise-list-reps">{r.round}</span>
              <span className="exercise-list-name">{r.exercise}</span>
            </div>
            {r.id && <HelpCircle size={18} className="help-icon" />}
          </li>
        ))}
      </ul>
      {note && <p className="exercise-note">{note}</p>}
      <button className={`start-wod-button ${buttonInfo.style}`} onClick={handleStartWOD}>
        <Play size={20} />
        {buttonInfo.text}
      </button>
    </div>
  );
};

export default ConditioningCard;