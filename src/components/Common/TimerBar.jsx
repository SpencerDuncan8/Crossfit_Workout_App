// src/components/Common/TimerBar.jsx

import React, { useContext } from 'react';
// THE DEFINITIVE FIX: Import from the new, correct file path
import { TimerContext } from '../../context/TimerContext.jsx'; 
import { Timer, X } from 'lucide-react';
import './TimerBar.css';

const TimerBar = () => {
  // Use the new TimerContext
  const { timer, stopTimer } = useContext(TimerContext);

  if (!timer.isActive) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getTitle = () => {
    switch (timer.type) {
      case 'amrap': return 'AMRAP'; 
      case 'countdown': return 'REST';
      case 'stopwatch': return 'WOD TIMER';
      case 'emom': return `EMOM - MINUTE ${timer.emom.currentMinute} / ${timer.emom.totalMinutes}`;
      case 'tabata': return `TABATA - ROUND ${timer.tabata.currentRound} / ${timer.tabata.totalRounds}`;
      default: return 'TIMER';
    }
  };

  return (
    <div className="timer-bar" key={timer.key}>
      {(timer.type === 'countdown' || timer.type === 'amrap') && (
        <div className="timer-progress" style={{ animationDuration: `${timer.duration}s` }}></div>
      )}
      
      <div className="timer-content">
        <div className="timer-info">
          <Timer size={20} />
          <span>{getTitle()}</span>
        </div>

        <div className="timer-time-cluster">
          {timer.type === 'tabata' && (
            <span className={`tabata-phase-badge ${timer.tabata.isWorkPhase ? 'work' : 'rest'}`}>
              {timer.tabata.isWorkPhase ? 'WORK' : 'REST'}
            </span>
          )}
          <div className="timer-time">{formatTime(timer.time)}</div>
        </div>

        <button className="timer-close-btn" onClick={stopTimer}>
          <X size={22} />
        </button>
      </div>
    </div>
  );
};

export default TimerBar;