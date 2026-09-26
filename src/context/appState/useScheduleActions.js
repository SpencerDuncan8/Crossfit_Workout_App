// src/context/actions/useScheduleActions.js

import { useCallback, useMemo } from 'react';
import { generateUniqueId } from '../../utils/idUtils.js';

export const useScheduleActions = ({ appState, setAppState, updateAppState }) => {
  const scheduleWorkoutForDate = useCallback((date, workoutId) => {
    const dateString = date.toISOString().split('T')[0];
    const newEntry = { workoutId, scheduleId: generateUniqueId() };
    setAppState(prev => {
      const newSchedule = { ...prev.workoutSchedule };
      if (!newSchedule[dateString]) newSchedule[dateString] = [];
      newSchedule[dateString] = [...newSchedule[dateString], newEntry];
      return { ...prev, workoutSchedule: newSchedule, workoutToScheduleId: null };
    });
  }, [setAppState]);

  const navigateToDate = useCallback((dateString, scheduleId = null) => {
    updateAppState({ viewingDate: dateString, viewingScheduleId: scheduleId });
  }, [updateAppState]);

  const getScheduledDates = useCallback(() => {
    return Object.keys(appState.workoutSchedule)
      .filter(date => appState.workoutSchedule[date]?.length > 0)
      .sort();
  }, [appState.workoutSchedule]);

  const navigateToPrevScheduled = useCallback(() => {
    const dates = getScheduledDates();
    const currentIndex = dates.indexOf(appState.viewingDate);
    if (currentIndex > 0) {
      const prevDateString = dates[currentIndex - 1];
      const prevDaySchedule = appState.workoutSchedule[prevDateString];
      if (prevDaySchedule?.length > 0) {
        navigateToDate(prevDateString, prevDaySchedule[0].scheduleId);
      }
    }
  }, [getScheduledDates, appState.viewingDate, appState.workoutSchedule, navigateToDate]);

  const navigateToNextScheduled = useCallback(() => {
    const dates = getScheduledDates();
    const currentIndex = dates.indexOf(appState.viewingDate);
    if (currentIndex > -1 && currentIndex < dates.length - 1) {
      const nextDateString = dates[currentIndex + 1];
      const nextDaySchedule = appState.workoutSchedule[nextDateString];
      if (nextDaySchedule?.length > 0) {
        navigateToDate(nextDateString, nextDaySchedule[0].scheduleId);
      }
    }
  }, [getScheduledDates, appState.viewingDate, appState.workoutSchedule, navigateToDate]);

  const selectWorkoutToSchedule = useCallback((workoutId) => {
    updateAppState({ workoutToScheduleId: workoutId });
  }, [updateAppState]);

  const clearWorkoutToSchedule = useCallback(() => {
    updateAppState({ workoutToScheduleId: null });
  }, [updateAppState]);

  const removeWorkoutFromSchedule = useCallback((date, scheduleId) => {
    const dateString = date.toISOString().split('T')[0];
    setAppState(prev => {
      const daySchedule = (prev.workoutSchedule[dateString] || []).filter(item => item.scheduleId !== scheduleId);
      const newSchedule = { ...prev.workoutSchedule };
      if (daySchedule.length > 0) newSchedule[dateString] = daySchedule;
      else delete newSchedule[dateString];
      return { ...prev, workoutSchedule: newSchedule };
    });
  }, [setAppState]);

  const autoScheduleProgram = useCallback((workouts, selectedDays) => {
    if (!selectedDays || selectedDays.length === 0) return;
    setAppState(prev => {
      const newSchedule = { ...prev.workoutSchedule };
      let scheduleDate = new Date();
      scheduleDate.setHours(0, 0, 0, 0);
      for (const workout of workouts) {
        while (true) {
          const dayOfWeek = scheduleDate.getDay();
          const dateString = scheduleDate.toISOString().split('T')[0];
          const dayIsOccupied = newSchedule[dateString]?.length > 0;
          if (selectedDays.includes(dayOfWeek) && !dayIsOccupied) {
            newSchedule[dateString] = [{ workoutId: workout.id, scheduleId: generateUniqueId() }];
            break;
          }
          scheduleDate.setDate(scheduleDate.getDate() + 1);
        }
        scheduleDate.setDate(scheduleDate.getDate() + 1);
      }
      return { ...prev, workoutSchedule: newSchedule };
    });
  }, [setAppState]);

  const getPreviousExercisePerformance = useCallback((exerciseId, currentDateString) => {
    if (!exerciseId) return null;

    const completedWorkouts = Object.entries(appState.workoutSchedule)
      .filter(([date]) => date < currentDateString)
      .flatMap(([date, schedule]) => schedule.filter(item => item.completedData).map(item => ({ ...item, date })))
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    for (const completed of completedWorkouts) {
      const detailedProgress = completed.completedData?.detailedProgress;
      if (detailedProgress) {
        for (const progressKey in detailedProgress) {
          if (progressKey.endsWith(`-${exerciseId}`)) {
            const exerciseProgress = detailedProgress[progressKey];
            if (exerciseProgress && exerciseProgress.sets) {
              return exerciseProgress;
            }
          }
        }
      }
    }
    return null;
  }, [appState.workoutSchedule]);

  const getPreviousBlockPerformance = useCallback((blockId, blockType, currentDateString) => {
    if (!blockId) return null;

    const completedWorkouts = Object.entries(appState.workoutSchedule)
      .filter(([date, schedule]) => date < currentDateString && schedule.some(item => item.completedData))
      .flatMap(([date, schedule]) => schedule.filter(item => item.completedData))
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    for (const completed of completedWorkouts) {
      // Check for the new data structure (inside `stats`) first,
      // then fall back to the old structure for backward compatibility.
      const blockTimes = completed.completedData?.stats?.blockTimes || completed.completedData?.blockTimes;

      if (blockTimes && blockTimes[blockId]) {
        const result = blockTimes[blockId];
        if (result.recordedTime) {
          return { type: 'TIME', time: result.recordedTime };
        }
        if (result.score) {
          return { type: 'SCORE', score: result.score, rounds: result.rounds };
        }
      }
    }
    return null;
  }, [appState.workoutSchedule]);

  const completeWorkout = useCallback((dateString, scheduleId, stats, callback) => {
    setAppState(prev => {
      const workoutDef = prev.programs.flatMap(p => p.workouts).find(w => {
        const daySchedule = prev.workoutSchedule[dateString] || [];
        const scheduleEntry = daySchedule.find(item => item.scheduleId === scheduleId);
        return scheduleEntry && w.id === scheduleEntry.workoutId;
      });

      const finalCompletedData = {
        stats: stats,
        workoutSnapshot: workoutDef ? JSON.parse(JSON.stringify(workoutDef)) : null
      };

      let cardioMinutes = 0;
      if (workoutDef) {
        const cardioBlocks = workoutDef.blocks.filter(b => b.type === 'Cardio');
        for (const block of cardioBlocks) {
          if (block.exercises) {
            for (const exercise of block.exercises) {
              cardioMinutes += parseInt(exercise.duration, 10) || 0;
            }
          }
        }
      }

      const newSchedule = { ...prev.workoutSchedule };
      const daySchedule = (newSchedule[dateString] || []).map(item =>
        item.scheduleId === scheduleId ? { ...item, completedData: finalCompletedData } : item
      );
      newSchedule[dateString] = daySchedule;

      return {
        ...prev,
        workoutSchedule: newSchedule,
        totalWorkoutsCompleted: prev.totalWorkoutsCompleted + 1,
        totalSets: prev.totalSets + (stats.sets || 0),
        totalReps: prev.totalReps + (stats.reps || 0),
        totalLbsLifted: prev.totalLbsLifted + (stats.weight || 0),
        totalCardioMinutes: (prev.totalCardioMinutes || 0) + cardioMinutes,
        showConfetti: true,
      };
    });

    if (callback) {
      callback();
    }
    setTimeout(() => updateAppState({ showConfetti: false }), 5000);
  }, [setAppState, updateAppState]);

  return useMemo(() => ({
    scheduleWorkoutForDate, navigateToDate, getScheduledDates,
    navigateToPrevScheduled, navigateToNextScheduled, selectWorkoutToSchedule,
    clearWorkoutToSchedule, removeWorkoutFromSchedule, autoScheduleProgram,
    getPreviousExercisePerformance, getPreviousBlockPerformance, completeWorkout,
  }), [
    scheduleWorkoutForDate, navigateToDate, getScheduledDates,
    navigateToPrevScheduled, navigateToNextScheduled, selectWorkoutToSchedule,
    clearWorkoutToSchedule, removeWorkoutFromSchedule, autoScheduleProgram,
    getPreviousExercisePerformance, getPreviousBlockPerformance, completeWorkout,
  ]);
};