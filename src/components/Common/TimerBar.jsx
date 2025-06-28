// src/components/Common/TimerBar.jsx

import React, { useContext } from 'react';
import { TimerContext } from '../../context/TimerContext.jsx'; 
import { Timer, X, Flag, CheckCircle } from 'lucide-react';
import './TimerBar.css';

const TimerBar = () => {
  const { timer, stopTimer, lapTimer, recordAndStopTimer } = useContext(TimerContext);

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
      case 'stopwatch': 
        if (timer.totalLaps > 0) {
          return `Round ${timer.laps.length + 1} / ${timer.totalLaps}`;
        }
        if (timer.isRecordable) {
            return 'CHIPPER';
        }
        return 'WOD TIMER';
      case 'emom': return `EMOM - MINUTE ${timer.emom.currentMinute} / ${timer.emom.totalMinutes}`;
      // --- FIX: Differentiate between Tabata and Intervals ---
      case 'tabata': 
        return `TABATA - ROUND ${timer.tabata.currentRound} / ${timer.tabata.totalRounds}`;
      case 'intervals':
        return `INTERVALS - ROUND ${timer.tabata.currentRound} / ${timer.tabata.totalRounds}`;
      default: return 'TIMER';
    }
  };

  const renderActionButton = () => {
    if (timer.type !== 'stopwatch') return null;

    if (timer.totalLaps > 0) { // RFT
      const currentLap = timer.laps.length + 1;
      const buttonText = currentLap < timer.totalLaps ? `Time Round ${currentLap}` : 'Finish Final Round';
      return (
        <button className="timer-lap-btn" onClick={lapTimer}>
            <Flag size={20} />
            {buttonText}
        </button>
      );
    }
    
    if (timer.isRecordable) { // Chipper
        return (
            <button className="timer-record-btn" onClick={recordAndStopTimer}>
                <CheckCircle size={20} />
                Record Time
            </button>
        );
    }

    return null;
  };
  
  const hasActionButton = timer.type === 'stopwatch' && (timer.totalLaps > 0 || timer.isRecordable);
  const isIntervalType = timer.type === 'tabata' || timer.type === 'intervals';

  return (
    <div className="timer-bar" key={timer.key}>
      {(timer.type === 'countdown' || timer.type === 'amrap') && (
        <div className="timer-progress" style={{ animationDuration: `${timer.duration}s` }}></div>
      )}
      
      <div className={`timer-content ${hasActionButton ? 'has-action-btn' : ''}`}>
        <div className="timer-info">
          <Timer size={20} />
          <span>{getTitle()}</span>
        </div>

        {renderActionButton()}
        
        <div className="timer-time-cluster">
            {isIntervalType && (
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