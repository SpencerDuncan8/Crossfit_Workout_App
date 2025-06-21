// src/components/Workout/WorkoutView.jsx

import React, { useContext, useState, useEffect } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { getWorkoutByDay } from '../../data/workoutProgram.js';
import WorkoutSection from './WorkoutSection.jsx';
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import './Workout.css';

const WorkoutView = ({ setActiveView }) => {
  const { appState, completeWorkout } = useContext(AppStateContext);
  const [viewingDay, setViewingDay] = useState(appState.currentDay);
  const [workoutData, setWorkoutData] = useState(null);
  const [exerciseProgress, setExerciseProgress] = useState({});

  useEffect(() => {
    setViewingDay(appState.currentDay);
  }, [appState.currentDay]);

  useEffect(() => {
    const workout = getWorkoutByDay(viewingDay);
    setWorkoutData(workout);
    
    if (viewingDay === appState.currentDay) {
      const initialProgress = {};
      if (workout && !workout.isRestDay) {
        ['warmup', 'strength', 'conditioning'].forEach(sectionKey => {
          const section = workout[sectionKey];
          if (section && section.exercises) {
            section.exercises.forEach((exercise, index) => {
              const exerciseId = `${sectionKey}-${index}`;
              if (exercise.sets) {
                initialProgress[exerciseId] = { sets: Array(exercise.sets).fill({ completed: false, weight: '', reps: exercise.reps }) };
              }
            });
          }
        });
      }
      setExerciseProgress(initialProgress);
    } else {
      setExerciseProgress({});
    }
  }, [viewingDay, appState.currentDay]);

  const handleSetUpdate = (exerciseId, setIndex, field, value) => {
    if (viewingDay !== appState.currentDay) return;
    setExerciseProgress(prevProgress => {
      const newProgress = { ...prevProgress };
      const exerciseToUpdate = { ...newProgress[exerciseId] };
      const newSets = [...exerciseToUpdate.sets];
      newSets[setIndex] = { ...newSets[setIndex], [field]: value };
      exerciseToUpdate.sets = newSets;
      newProgress[exerciseId] = exerciseToUpdate;
      return newProgress;
    });
  };
  
  const handleFinishWorkout = () => {
    let sessionSets = 0, sessionReps = 0, sessionWeight = 0;
    Object.values(exerciseProgress).forEach(exercise => {
      if (exercise.sets) {
        exercise.sets.forEach(set => {
          if (set.completed) {
            sessionSets += 1;
            const reps = parseInt(set.reps, 10) || 0;
            const weight = parseInt(set.weight, 10) || 0;
            sessionReps += reps;
            sessionWeight += reps * weight;
          }
        });
      }
    });
    completeWorkout({ sets: sessionSets, reps: sessionReps, weight: sessionWeight, });
    setActiveView('dashboard');
  };

  const handlePrevDay = () => { if (viewingDay > 1) setViewingDay(prev => prev - 1); };
  const handleNextDay = () => { if (viewingDay < 60) setViewingDay(prev => prev + 1); }; // Corrected from prev - 1
  
  const isViewingCurrentDay = viewingDay === appState.currentDay;

  if (!workoutData) return <div>Loading workout...</div>;
  
  const { type, actualDay } = workoutData;
  
  if (workoutData.isRestDay) {
    return (
      <div className="workout-view-container">
        <div className="workout-header">
          <div className="workout-header-nav">
            <button onClick={handlePrevDay} disabled={viewingDay <= 1} className="day-nav-btn"><ChevronLeft size={28} /></button>
            <div className="workout-header-title rest-day-header"><h2>{workoutData.type}</h2><p>Day {actualDay}</p></div>
            <button onClick={handleNextDay} disabled={viewingDay >= 60} className="day-nav-btn"><ChevronRight size={28} /></button>
          </div>
        </div>
        <div className="rest-day-content"><p>{workoutData.description}</p></div>
      </div>
    );
  }

  return (
    <div className="workout-view-container">
      <div className="workout-header">
        <div className="workout-header-nav">
          <button onClick={handlePrevDay} disabled={viewingDay <= 1} className="day-nav-btn"><ChevronLeft size={28} /></button>
          <div className="workout-header-title">
            <span className="workout-day-badge">Day {actualDay}</span>
            <h1>{type}</h1>
          </div>
          <button onClick={handleNextDay} disabled={viewingDay >= 60} className="day-nav-btn"><ChevronRight size={28} /></button>
        </div>
      </div>
      
      {workoutData.warmup && <WorkoutSection title="Warm-up" sectionKey="warmup" data={workoutData.warmup} progress={exerciseProgress} onSetUpdate={handleSetUpdate} isEditable={isViewingCurrentDay} />}
      {workoutData.strength && <WorkoutSection title="Strength" sectionKey="strength" data={workoutData.strength} progress={exerciseProgress} onSetUpdate={handleSetUpdate} isEditable={isViewingCurrentDay} />}
      {workoutData.conditioning && <WorkoutSection title="Conditioning" sectionKey="conditioning" data={workoutData.conditioning} progress={exerciseProgress} onSetUpdate={handleSetUpdate} isEditable={isViewingCurrentDay} />}
      {workoutData.cooldown && <WorkoutSection title="Cool-down" data={workoutData.cooldown} />}
      
      {isViewingCurrentDay && (
        <div className="finish-workout-container">
          <button className="finish-workout-button" onClick={handleFinishWorkout}><CheckCircle size={24} /> Finish Workout</button>
        </div>
      )}
    </div>
  );
};

// THE MISSING LINE THAT CAUSED THE ERROR
export default WorkoutView;