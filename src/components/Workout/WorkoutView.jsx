// src/components/Workout/WorkoutView.jsx

import React, { useContext, useState, useEffect } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { TimerContext } from '../../context/TimerContext.jsx';
import WorkoutSection from './WorkoutSection.jsx';
import { CheckCircle, AlertTriangle, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import './Workout.css';

const WorkoutView = ({ setActiveView }) => {
  const { appState, allWorkouts, completeWorkout, navigateToDate, navigateToPrevScheduled, navigateToNextScheduled, getScheduledDates } = useContext(AppStateContext);
  const { startTimer } = useContext(TimerContext);
  const [exerciseProgress, setExerciseProgress] = useState({});

  const scheduleEntry = appState.workoutSchedule[appState.viewingDate];
  const workoutId = scheduleEntry?.workoutId;
  const activeWorkout = allWorkouts.find(w => w.id === workoutId);

  // --- THE DEFINITIVE FIX IS HERE ---
  // This useEffect now correctly listens for changes to `activeWorkout.id`.
  // This ensures the progress state is ONLY reset when you navigate to a completely different workout.
  // It will no longer be reset by simple re-renders caused by the timer.
  useEffect(() => {
    if (activeWorkout) {
      const initialProgress = {};
      activeWorkout.blocks.forEach(block => {
        if (block.type === 'Strength' && block.exercises) {
          block.exercises.forEach(exercise => {
            const exerciseId = `${block.id}-${exercise.id}`;
            initialProgress[exerciseId] = { sets: exercise.sets.map(set => ({ id: set.id, completed: false, weight: '', reps: set.reps })) };
          });
        }
      });
      setExerciseProgress(initialProgress);
    } else {
      setExerciseProgress({});
    }
  }, [activeWorkout?.id]); // The dependency is now the ID of the workout itself.

  const handleSetUpdate = (exerciseId, setIndex, field, value) => {
    setExerciseProgress(currentProgress => {
      const newProgress = { ...currentProgress };
      if (newProgress[exerciseId] && newProgress[exerciseId].sets[setIndex]) {
        const newSets = [...newProgress[exerciseId].sets];
        newSets[setIndex] = { ...newSets[setIndex], [field]: value };
        newProgress[exerciseId] = { ...newProgress[exerciseId], sets: newSets };
      }
      return newProgress;
    });
  };
  
  const handleFinishWorkout = () => {
    let sessionStats = { sets: 0, reps: 0, weight: 0 };
    Object.values(exerciseProgress).forEach(progress => {
      if(progress && progress.sets){
        progress.sets.forEach(set => {
          if (set.completed) {
            sessionStats.sets++;
            const reps = parseInt(set.reps, 10) || 0;
            const weight = parseInt(set.weight, 10) || 0;
            sessionStats.reps += reps;
            sessionStats.weight += reps * weight;
          }
        });
      }
    });
    completeWorkout(appState.viewingDate, sessionStats);
    setActiveView('calendar');
  };

  const scheduledDates = getScheduledDates();
  const currentIndex = scheduledDates.indexOf(appState.viewingDate);
  const isPrevDisabled = currentIndex <= 0;
  const isNextDisabled = currentIndex >= scheduledDates.length - 1;

  if (!activeWorkout) {
    return (
      <div className="workout-view-container">
        <div className="rest-day-content" style={{ backgroundColor: 'var(--bg-tertiary)'}}>
          <AlertTriangle size={48} color="#facc15" />
          <h2 style={{marginTop: '16px'}}>No Workout Scheduled</h2>
          <p>Go to the Calendar tab to assign a workout for this day.</p>
          <button className="day-nav-btn" onClick={() => setActiveView('calendar')} style={{marginTop: '20px', padding: '10px 20px', borderRadius: '8px', background: 'var(--bg-primary)'}}><ArrowLeft size={20}/> Back to Calendar</button>
        </div>
      </div>
    );
  }

  const viewingDate = new Date(appState.viewingDate);
  const formattedDate = viewingDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' });

  return (
    <div className="workout-view-container">
      <div className="workout-header"><div className="workout-header-nav"><button onClick={navigateToPrevScheduled} disabled={isPrevDisabled} className="day-nav-btn"><ChevronLeft size={28} /></button><div className="workout-header-title"><span className="workout-day-badge">{formattedDate}</span><h1>{activeWorkout.name}</h1></div><button onClick={navigateToNextScheduled} disabled={isNextDisabled} className="day-nav-btn"><ChevronRight size={28} /></button></div></div>
      {activeWorkout.blocks.map(block => (
          <WorkoutSection 
            key={block.id} 
            block={block} 
            progress={exerciseProgress} 
            onSetUpdate={handleSetUpdate} 
            startTimer={startTimer}
          />
      ))}
      <div className="finish-workout-container"><button className="finish-workout-button" onClick={handleFinishWorkout}><CheckCircle size={24} /> Finish Workout & Log</button></div>
    </div>
  );
};

export default WorkoutView;