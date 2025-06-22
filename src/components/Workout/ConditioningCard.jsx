// src/components/Workout/ConditioningCard.jsx

import React, { useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx'; // Still needed for openExerciseModal
import { Play, HelpCircle } from 'lucide-react';

// THE DEFINITIVE FIX: Accept `startTimer` as a prop, not from context.
const ConditioningCard = ({ block, startTimer }) => {
  const { openExerciseModal } = useContext(AppStateContext);
  
  // Destructure all possible properties from the 'block' prop
  const { type, exercises, duration, rounds, work, rest, minutes } = block;

  const handleStartWOD = () => {
    if (!startTimer) {
      console.error("startTimer function not provided to ConditioningCard!");
      return;
    }

    if (type === 'Conditioning: AMRAP') {
        startTimer({ type: 'amrap', duration: (duration || 0) * 60 });
    } else if (type === 'Conditioning: Tabata') {
        startTimer({ type: 'tabata', tabataRounds: rounds, tabataWork: work, tabataRest: rest });
    } else if (type === 'Conditioning: EMOM') {
        startTimer({ type: 'emom', duration: (minutes?.length || 0) * 60 });
    } else { // For RFT and Chipper
      startTimer({ type: 'stopwatch' });
    }
  };
  
  const handleExerciseClick = (exercise) => {
    if (exercise.id) {
      openExerciseModal(exercise.id);
    }
  };

  const getButtonInfo = () => {
    switch(type) {
      case 'Conditioning: AMRAP': return { text: "Start AMRAP", style: "amrap-button" };
      case 'Conditioning: RFT':
      case 'Conditioning: Chipper': return { text: "Start Timer", style: "fortime-button" };
      case 'Conditioning: EMOM': return { text: "Start EMOM", style: "emom-button" };
      case 'Conditioning: Tabata': return { text: "Start Tabata", style: "tabata-button" };
      default: return { text: "Start Timer", style: "fortime-button" };
    }
  };

  const buttonInfo = getButtonInfo();
  
  const formatBadge = () => {
      if (type === 'Conditioning: AMRAP') return `${duration || 0} Min AMRAP`;
      if (type === 'Conditioning: RFT') return `${rounds || 0} Rounds For Time`;
      if (type === 'Conditioning: Chipper') return 'For Time';
      if (type === 'Conditioning: EMOM') return `EMOM for ${minutes?.length || 0} Mins`;
      if (type === 'Conditioning: Tabata') return `${rounds || 0} Rounds (${work || 0}s/${rest || 0}s)`;
      return type;
  }

  return (
    <div className="conditioning-card">
      <div className="conditioning-header">
        <h3>{type.replace('Conditioning: ', '')}</h3>
        <span className="wod-format-badge">{formatBadge()}</span>
      </div>
      
      <ul className="exercise-list">
        {minutes?.map((min, index) => (
            <li key={index} className="exercise-list-item">
                <span className="exercise-list-reps">{`Min ${index + 1}`}</span>
                <span className="exercise-list-name">{min.task}</span>
            </li>
        ))}
        {exercises?.map((ex, index) => (
          <li key={index} className="exercise-list-item clickable" onClick={() => handleExerciseClick(ex)}>
            <div className="exercise-list-main">
              {ex.reps && <span className="exercise-list-reps">{ex.reps}</span>}
              <span className="exercise-list-name">{ex.name}</span>
            </div>
            {ex.id && <HelpCircle size={18} className="help-icon" />}
          </li>
        ))}
      </ul>

      <button className={`start-wod-button ${buttonInfo.style}`} onClick={handleStartWOD}>
        <Play size={20} />
        {buttonInfo.text}
      </button>
    </div>
  );
};

export default ConditioningCard;