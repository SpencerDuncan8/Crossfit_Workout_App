// src/components/Workout/WorkoutView.jsx

import React, { useContext, useState, useEffect, useMemo } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { TimerContext } from '../../context/TimerContext.jsx';
import WorkoutSection from './WorkoutSection.jsx';
import WorkoutDetailView from '../Program/WorkoutDetailView.jsx';
import { CheckCircle, AlertTriangle, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { calculateAndRoundTargetWeight, kgToLbs } from '../../utils/unitUtils.js';
import './Workout.css';

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const WorkoutView = ({ setActiveView }) => {
  const { appState, allWorkouts, completeWorkout, navigateToDate, navigateToPrevScheduled, navigateToNextScheduled, getScheduledDates, getPreviousExercisePerformance, getPreviousBlockPerformance } = useContext(AppStateContext);
  const { timer, startTimer, stopTimer } = useContext(TimerContext);
  const [exerciseProgress, setExerciseProgress] = useState({});
  const [blockProgress, setBlockProgress] = useState({});

  const daySchedule = appState.workoutSchedule[appState.viewingDate] || [];
  const scheduleEntry = daySchedule.find(item => item.scheduleId === appState.viewingScheduleId);

  const workoutId = scheduleEntry?.workoutId;
  const activeWorkout = allWorkouts.find(w => w.id === workoutId);
  const isCompleted = !!scheduleEntry?.completedData;

  const enrichedActiveWorkout = useMemo(() => {
    if (!activeWorkout) return null;
    return {
      ...activeWorkout,
      blocks: activeWorkout.blocks.map(block => ({
        ...block,
        previousPerformance: getPreviousBlockPerformance(block.id, block.type, appState.viewingDate),
        exercises: block.exercises?.map(ex => ({
          ...ex,
          previousPerformance: getPreviousExercisePerformance(ex.id, appState.viewingDate)
        }))
      }))
    };
  }, [activeWorkout, appState.viewingDate, appState.workoutSchedule]);

  useEffect(() => {
    if (appState.viewingDate && !appState.viewingScheduleId) {
      const scheduleForDate = appState.workoutSchedule[appState.viewingDate] || [];
      if (scheduleForDate.length > 0) {
        navigateToDate(appState.viewingDate, scheduleForDate[0].scheduleId);
      }
    }
  }, [appState.viewingDate, appState.viewingScheduleId, appState.workoutSchedule, navigateToDate]);

  useEffect(() => {
    if (timer.recordedTime !== null) {
      const chipperBlock = activeWorkout?.blocks.find(b => b.type === 'Conditioning: Chipper');
      if (chipperBlock) {
        handleBlockProgressUpdate(chipperBlock.id, 'recordedTime', formatTime(timer.recordedTime));
      }
    }
  }, [timer.recordedTime, activeWorkout]);
  
  useEffect(() => {
    if (!timer.isActive && timer.laps.length > 0) {
      const rftBlock = activeWorkout?.blocks.find(b => b.type === 'Conditioning: RFT');
      if (rftBlock) {
        handleBlockProgressUpdate(rftBlock.id, 'laps', [...timer.laps]);
      }
    }
  }, [timer.isActive, timer.laps, activeWorkout]);

  useEffect(() => {
    if (activeWorkout) {
      const initialProgress = {};
      activeWorkout.blocks.forEach(block => {
        if ((block.type === 'Strength' || block.type === 'Bodyweight') && block.exercises) {
          block.exercises.forEach(exercise => {
            const exerciseId = `${block.id}-${exercise.id}`;
            const oneRepMaxLbs = appState.oneRepMaxes[exercise.id] || 0;
            initialProgress[exerciseId] = {
              sets: exercise.sets.map(set => {
                let progressSet = { id: set.id, completed: false };
                if (block.type === 'Strength') {
                  let targetWeight = '';
                  let percentageInfo = null;
                  const loadStr = String(set.load || '');
                  if (loadStr.includes('%')) {
                    const percentage = parseFloat(loadStr.replace('%', '')) / 100;
                    if (!isNaN(percentage)) {
                      percentageInfo = { percent: percentage * 100, oneRepMax: oneRepMaxLbs };
                      targetWeight = String(calculateAndRoundTargetWeight(oneRepMaxLbs, percentage, appState.unitSystem));
                    }
                  } else {
                    targetWeight = loadStr;
                  }
                  progressSet = { ...progressSet, weight: targetWeight, reps: set.reps, percentageInfo };
                } else if (block.type === 'Bodyweight') {
                  // --- START OF FIX ---
                  // This was the missing piece. We now correctly initialize the progress
                  // state with the value and tracking type from the exercise definition.
                  progressSet = { ...progressSet, value: set.value, trackingType: set.trackingType };
                  // --- END OF FIX ---
                }
                return progressSet;
              })
            };
          });
        }
        if (block.type === 'Accessory / Carry' && block.exercises) { block.exercises.forEach(exercise => { const exerciseId = `${block.id}-${exercise.id}`; const numSets = parseInt(exercise.sets, 10) || 1; initialProgress[exerciseId] = { sets: Array.from({ length: numSets }, (_, i) => ({ id: `${exerciseId}-set-${i}`, completed: false })) }; }); }
      });
      setExerciseProgress(initialProgress);
      setBlockProgress({});
    } else {
      setExerciseProgress({});
      setBlockProgress({});
    }
  }, [activeWorkout?.id, appState.oneRepMaxes, appState.unitSystem]);

  const handleSetUpdate = (exerciseId, setIndex, field, value) => {
    setExerciseProgress(currentProgress => {
      const newProgress = { ...currentProgress };
      if (newProgress[exerciseId] && newProgress[exerciseId].sets && newProgress[exerciseId].sets[setIndex] !== undefined) {
        const newSets = [...newProgress[exerciseId].sets];
        newSets[setIndex] = { ...newSets[setIndex], [field]: value };
        newProgress[exerciseId] = { ...newProgress[exerciseId], sets: newSets };
      }
      return newProgress;
    });
  };
  
  const handleBlockProgressUpdate = (blockId, fieldOrData, value) => {
    setBlockProgress(prev => {
        if (typeof fieldOrData === 'object' && fieldOrData !== null) {
            return {
                ...prev,
                [blockId]: {
                    ...(prev[blockId] || {}),
                    ...fieldOrData
                }
            };
        }
        return {
            ...prev,
            [blockId]: {
                ...(prev[blockId] || {}),
                [fieldOrData]: value,
            },
        };
    });
  };

  const handleFinishWorkout = () => {
    let sessionStats = {
      sets: 0,
      reps: 0,
      weight: 0,
      blockTimes: {},
      detailedProgress: exerciseProgress,
    };

    Object.keys(exerciseProgress).forEach(exerciseId => {
      const progress = exerciseProgress[exerciseId];
      if (progress && progress.sets) {
        const [blockId] = exerciseId.split('-');
        const block = activeWorkout.blocks.find(b => b.id === blockId);

        progress.sets.forEach((progressSet) => {
          if (progressSet.completed) {
            sessionStats.sets++;

            if (block.type === 'Strength') {
              const reps = parseInt(progressSet.reps, 10) || 0;
              let weightInLbs = parseFloat(progressSet.weight) || 0;
              if (appState.unitSystem === 'metric') {
                weightInLbs = kgToLbs(weightInLbs);
              }
              sessionStats.reps += reps;
              sessionStats.weight += reps * weightInLbs;
            } else if (block.type === 'Bodyweight') {
              // --- START OF FIX ---
              // The calculation now correctly reads from the live `progressSet`
              // which was properly initialized in the `useEffect` hook above.
              if (progressSet.trackingType === 'reps') {
                const reps = parseInt(progressSet.value, 10) || 0;
                sessionStats.reps += reps;
              }
              // --- END OF FIX ---
            }
          }
        });
      }
    });
    
    const finalBlockProgress = { ...blockProgress };
    Object.keys(finalBlockProgress).forEach(blockId => {
      const blockData = finalBlockProgress[blockId];
      const blockDefinition = activeWorkout.blocks.find(b => b.id === blockId);
      
      if (blockDefinition?.type === 'Conditioning: RFT' && blockData.laps && blockData.laps.length > 0) {
        const lastLapTimeInSeconds = blockData.laps[blockData.laps.length - 1];
        blockData.recordedTime = formatTime(lastLapTimeInSeconds);
      }
    });

    sessionStats.blockTimes = finalBlockProgress;

    const isChipperRunning = activeWorkout.blocks.some(b => b.type === 'Conditioning: Chipper') && timer.isActive && timer.type === 'stopwatch' && timer.totalLaps === 0;
    if (isChipperRunning) {
        const chipperBlock = activeWorkout.blocks.find(b => b.type === 'Conditioning: Chipper');
        if (chipperBlock) {
          sessionStats.blockTimes[chipperBlock.id] = { ...sessionStats.blockTimes[chipperBlock.id], recordedTime: formatTime(timer.time) };
        }
        stopTimer();
    }

    completeWorkout(appState.viewingDate, scheduleEntry.scheduleId, sessionStats);
    setActiveView('dashboard');
  };

  const scheduledDates = getScheduledDates();
  const currentIndex = scheduledDates.indexOf(appState.viewingDate);
  const isPrevDisabled = currentIndex <= 0;
  const isNextDisabled = currentIndex >= scheduledDates.length - 1;

  if (!enrichedActiveWorkout || !scheduleEntry) {
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
      <div className="workout-header"><div className="workout-header-nav"><button onClick={navigateToPrevScheduled} disabled={isPrevDisabled} className="day-nav-btn"><ChevronLeft size={28} /></button><div className="workout-header-title"><span className="workout-day-badge">{formattedDate}</span><h1>{enrichedActiveWorkout.name}</h1></div><button onClick={navigateToNextScheduled} disabled={isNextDisabled} className="day-nav-btn"><ChevronRight size={28} /></button></div></div>
      
      {enrichedActiveWorkout.blocks.map(block => (
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