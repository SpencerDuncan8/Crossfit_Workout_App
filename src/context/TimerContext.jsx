// src/context/TimerContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import { usePersistentState } from '../hooks/usePersistentState.jsx';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timer, setTimer, clearTimer] = usePersistentState('crossfitTimerState', {
    isActive: false, type: null, key: 0, duration: 0, time: 0, 
    tabata: { totalRounds: 0, currentRound: 0, isWorkPhase: true, work: 20, rest: 10 },
    emom: { totalMinutes: 0, currentMinute: 0 }
  });

  const startTimer = ({ type, duration = 0, tabataRounds = 8, tabataWork = 20, tabataRest = 10 }) => {
    setTimer(prev => {
      let newTimerState = { 
        isActive: true, type, key: prev.key + 1, duration, time: 0, 
        tabata: { totalRounds: tabataRounds, currentRound: 1, isWorkPhase: true, work: tabataWork, rest: tabataRest }, 
        emom: { totalMinutes: duration / 60, currentMinute: 1 } 
      };
      if (type === 'countdown' || type === 'amrap') newTimerState.time = duration;
      if (type === 'emom') newTimerState.time = 59; 
      if (type === 'tabata') newTimerState.time = tabataWork;
      return newTimerState;
    });
  };

  const stopTimer = () => setTimer(prev => ({ ...prev, isActive: false }));

  useEffect(() => {
    if (!timer.isActive) return;
    const interval = setInterval(() => {
      setTimer(prev => {
        if (!prev.isActive) { clearInterval(interval); return prev; }
        
        const newTimer = { ...prev };
        switch (prev.type) {
          case 'amrap': case 'countdown': newTimer.time -= 1; if (newTimer.time < 0) { newTimer.isActive = false; newTimer.time = 0; } break;
          case 'stopwatch': newTimer.time += 1; break;
          case 'emom': newTimer.time -= 1; if (newTimer.time < 0) { const newMin = newTimer.emom.currentMinute + 1; if (newMin > newTimer.emom.totalMinutes) { newTimer.isActive = false; newTimer.time = 0; } else { newTimer.time = 59; newTimer.emom = { ...newTimer.emom, currentMinute: newMin }; } } break;
          case 'tabata': newTimer.time -= 1; if (newTimer.time < 0) { const nextIsWork = !newTimer.tabata.isWorkPhase; if (nextIsWork) { const newRound = newTimer.tabata.currentRound + 1; if (newRound > newTimer.tabata.totalRounds) { newTimer.isActive = false; newTimer.time = 0; } else { newTimer.tabata = { ...newTimer.tabata, isWorkPhase: true, currentRound: newRound }; newTimer.time = newTimer.tabata.work; } } else { newTimer.tabata = { ...newTimer.tabata, isWorkPhase: false }; newTimer.time = newTimer.tabata.rest; } } break;
          default: break;
        }
        return newTimer;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timer.isActive, timer.key, setTimer]);

  return (
    <TimerContext.Provider value={{ timer, startTimer, stopTimer, clearTimer }}>
      {children}
    </TimerContext.Provider>
  );
};