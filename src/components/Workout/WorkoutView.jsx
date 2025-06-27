// src/components/Workout/WorkoutView.jsx

import React, { useContext, useState, useEffect } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { TimerContext } from '../../context/TimerContext.jsx';
import WorkoutSection from './WorkoutSection.jsx';
import WorkoutDetailView from '../Program/WorkoutDetailView.jsx';
import { CheckCircle, AlertTriangle, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import './Workout.css';

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const WorkoutView = ({ setActiveView }) => {
  const { appState, allWorkouts, completeWorkout, navigateToDate, navigateToPrevScheduled, navigateToNextScheduled, getScheduledDates } = useContext(AppStateContext);
  const { timer, startTimer, stopTimer } = useContext(TimerContext);
  const [exerciseProgress, setExerciseProgress] = useState({});
  const [blockProgress, setBlockProgress] = useState({});

  const daySchedule = appState.workoutSchedule[appState.viewingDate] || [];
  const scheduleEntry = daySchedule.find(item => item.scheduleId === appState.viewingScheduleId);

  const workoutId = scheduleEntry?.workoutId;
  const activeWorkout = allWorkouts.find(w => w.id === workoutId);
  const isCompleted = !!scheduleEntry?.completedData;


  // --- START OF THE FIX ---
  // This effect ensures that if a workout is scheduled for the current day,
  // it's automatically selected when navigating directly to this view.
  useEffect(() => {
    // If a date is being viewed but no specific workout is selected yet
    if (appState.viewingDate && !appState.viewingScheduleId) {
      const scheduleForDate = appState.workoutSchedule[appState.viewingDate] || [];
      // If there's at least one workout on this day, select the first one automatically
      if (scheduleForDate.length > 0) {
        navigateToDate(appState.viewingDate, scheduleForDate[0].scheduleId);
      }
    }
  }, [appState.viewingDate, appState.viewingScheduleId, appState.workoutSchedule, navigateToDate]);
  // --- END OF THE FIX ---


  useEffect(() => {
    if (timer.recordedTime !== null) {
      const chipperBlock = activeWorkout?.blocks.find(b => b.type === 'Conditioning: Chipper');
      if (chipperBlock) {
        setBlockProgress(prev => ({
          ...prev,
          [chipperBlock.id]: {
            ...prev[chipperBlock.id],
            recordedTime: formatTime(timer.recordedTime),
          }
        }));
      }
    }
  }, [timer.recordedTime, activeWorkout]);
  
  useEffect(() => {
    if (!timer.isActive && timer.laps.length > 0) {
      const rftBlock = activeWorkout?.blocks.find(b => b.type === 'Conditioning: RFT');
      if (rftBlock) {
        setBlockProgress(prev => ({
          ...prev,
          [rftBlock.id]: {
            ...prev[rftBlock.id],
            laps: [...timer.laps], 
          }
        }));
      }
    }
  }, [timer.isActive, timer.laps, activeWorkout]);


  useEffect(() => {
    if (activeWorkout) {
      const initialProgress = {};
      activeWorkout.blocks.forEach(block => {
        if (block.type === 'Strength' && block.exercises) {
          block.exercises.forEach(exercise => {
            const exerciseId = `${block.id}-${exercise.id}`;
            const oneRepMax = appState.oneRepMaxes[exercise.id] || 0;
            initialProgress[exerciseId] = { sets: exercise.sets.map(set => { let targetWeight = ''; let percentageInfo = null; const loadStr = String(set.load || ''); if (loadStr.includes('%')) { const percentage = parseFloat(loadStr.replace('%', '')) / 100; if (!isNaN(percentage)) { percentageInfo = { percent: percentage * 100, oneRepMax: oneRepMax }; if (oneRepMax > 0) { const calculatedWeight = oneRepMax * percentage; targetWeight = String(Math.round(calculatedWeight / 5) * 5); } else { targetWeight = '0'; } } } else { targetWeight = loadStr; } return { id: set.id, completed: false, weight: targetWeight, reps: set.reps, percentageInfo: percentageInfo, }; }) };
          });
        }
        if (block.type === 'Bodyweight' && block.exercises) { block.exercises.forEach(exercise => { const exerciseId = `${block.id}-${exercise.id}`; initialProgress[exerciseId] = { completed: false }; }); }
        if (block.type === 'Accessory / Carry' && block.exercises) { block.exercises.forEach(exercise => { const exerciseId = `${block.id}-${exercise.id}`; const numSets = parseInt(exercise.sets, 10) || 1; initialProgress[exerciseId] = { sets: Array.from({ length: numSets }, (_, i) => ({ id: `${exerciseId}-set-${i}`, completed: false })) }; }); }
      });
      setExerciseProgress(initialProgress);
      setBlockProgress({});
    } else {
      setExerciseProgress({});
      setBlockProgress({});
    }
  }, [activeWorkout?.id, appState.oneRepMaxes]);

  const handleSetUpdate = (exerciseId, setIndex, field, value) => {
    setExerciseProgress(currentProgress => {
      const newProgress = { ...currentProgress };
      if (newProgress[exerciseId] && newProgress[exerciseId].sets && newProgress[exerciseId].sets[setIndex] !== undefined) {
        const newSets = [...newProgress[exerciseId].sets];
        newSets[setIndex] = { ...newSets[setIndex], [field]: value };
        newProgress[exerciseId] = { ...newProgress[exerciseId], sets: newSets };
      }
      else if (newProgress[exerciseId] && field === 'completed') {
        newProgress[exerciseId] = { ...newProgress[exerciseId], completed: value };
      }
      return newProgress;
    });
  };
  
  const handleBlockProgressUpdate = (blockId, field, value) => {
    setBlockProgress(prev => ({
      ...prev,
      [blockId]: {
        ...prev[blockId],
        [field]: value,
      },
    }));
  };

  const handleFinishWorkout = () => {
    let sessionStats = { sets: 0, reps: 0, weight: 0, blockTimes: {} };
    Object.keys(exerciseProgress).forEach(exerciseId => {
      const progress = exerciseProgress[exerciseId];
      if (progress && progress.sets) { progress.sets.forEach(set => { if (set.completed) { sessionStats.sets++; if (set.reps && set.weight) { const reps = parseInt(set.reps, 10) || 0; const weight = parseInt(set.weight, 10) || 0; sessionStats.reps += reps; sessionStats.weight += reps * weight; } } }); }
      else if (progress && progress.completed) { sessionStats.sets++; }
    });
    
    sessionStats.blockTimes = blockProgress;

    Object.values(blockProgress).forEach(blockData => {
        if (blockData.laps && blockData.laps.length > 0) {
            const lastLapTime = blockData.laps[blockData.laps.length - 1];
            if (typeof lastLapTime === 'number') {
                sessionStats.totalTime = formatTime(lastLapTime);
            }
        }
    });

    const isChipperRunning = activeWorkout.blocks.some(b => b.type === 'Conditioning: Chipper') && timer.isActive && timer.type === 'stopwatch' && timer.totalLaps === 0;
    if (isChipperRunning) {
        const chipperBlock = activeWorkout.blocks.find(b => b.type === 'Conditioning: Chipper');
        if (chipperBlock) {
          sessionStats.blockTimes[chipperBlock.id] = { recordedTime: formatTime(timer.time) };
        }
        stopTimer();
    }

    completeWorkout(appState.viewingDate, scheduleEntry.scheduleId, sessionStats);
    setActiveView('calendar');
  };

  const scheduledDates = getScheduledDates();
  const currentIndex = scheduledDates.indexOf(appState.viewingDate);
  const isPrevDisabled = currentIndex <= 0;
  const isNextDisabled = currentIndex >= scheduledDates.length - 1;

  if (!activeWorkout || !scheduleEntry) {
    return (
      <div className="workout-view-container">
        <div className="rest-day-content" style={{ backgroundColor: 'var(--bg-tertiary)'}}>
          <AlertTriangle size={48} color="#facc15" />
          <h2 style={{marginTop: '16px'}}>No Workout Selected</h2>
          <p>Go to the Calendar and select a scheduled workout to begin.</p>
          <button className="day-nav-btn" onClick={() => setActiveView('calendar')} style={{marginTop: '20px', padding: '10px 20px', borderRadius: '8px', background: 'var(--bg-primary)'}}>
            <ArrowLeft size={20}/> Go to Calendar
          </button>
        </div>
      </div>
    );
  }

  const viewingDate = new Date(appState.viewingDate);
  const formattedDate = viewingDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' });

  if (isCompleted) {
    return (
      <div className="workout-view-container">
        <div className="workout-header">
          <div className="workout-header-nav">
            <button onClick={navigateToPrevScheduled} disabled={isPrevDisabled} className="day-nav-btn">
              <ChevronLeft size={28} />
            </button>
            <div className="workout-header-title">
              <span className="workout-day-badge">{formattedDate}</span>
              <h1>{activeWorkout.name}</h1>
            </div>
            <button onClick={navigateToNextScheduled} disabled={isNextDisabled} className="day-nav-btn">
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
        <WorkoutDetailView workout={activeWorkout} completedData={scheduleEntry.completedData} />
        <div className="finish-workout-container">
            <button 
              className="finish-workout-button" 
              onClick={() => setActiveView('calendar')} 
              style={{background: 'var(--bg-tertiary)', color: 'var(--text-primary)'}}
            >
                <ArrowLeft size={24} /> Back to Calendar
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="workout-view-container">
      <div className="workout-header"><div className="workout-header-nav"><button onClick={navigateToPrevScheduled} disabled={isPrevDisabled} className="day-nav-btn"><ChevronLeft size={28} /></button><div className="workout-header-title"><span className="workout-day-badge">{formattedDate}</span><h1>{activeWorkout.name}</h1></div><button onClick={navigateToNextScheduled} disabled={isNextDisabled} className="day-nav-btn"><ChevronRight size={28} /></button></div></div>
      
      {activeWorkout.blocks.map(block => (
          <WorkoutSection 
            key={block.id} 
            block={block} 
            progress={exerciseProgress} 
            onSetUpdate={handleSetUpdate}
            onBlockProgressUpdate={handleBlockProgressUpdate}
            blockProgress={blockProgress[block.id]}
            startTimer={startTimer}
            setActiveView={setActiveView}
            timer={timer}
          />
      ))}
      <div className="finish-workout-container"><button className="finish-workout-button" onClick={handleFinishWorkout}><CheckCircle size={24} /> Finish Workout & Log</button></div>
    </div>
  );
};

export default WorkoutView;