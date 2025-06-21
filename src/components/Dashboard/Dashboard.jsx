// src/components/Dashboard/Dashboard.jsx

import React, { useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import ProgressRing from './ProgressRing.jsx';
import MetricCard from './MetricCard.jsx';
import WeightChart from './WeightChart.jsx';
import WeightLogger from '../Progress/WeightLogger.jsx';
import PhotoProgress from '../Progress/PhotoProgress.jsx';
import InitialSetup from './InitialSetup.jsx'; // <-- IMPORT THE NEW COMPONENT
import './Dashboard.css';
import { Weight, TrendingDown, Target, Flame, Dumbbell, Repeat, BarChart, PlayCircle, CheckCircle } from 'lucide-react';

const Dashboard = ({ setActiveView }) => {
  const { appState, startChallenge } = useContext(AppStateContext);

  // VIEW 1: Challenge has not started
  if (!appState.challengeStartDate) {
    return (
      <div className="dashboard-container">
        <div className="overview-card" style={{ textAlign: 'center', padding: '40px', backgroundColor: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)'}}>
            <PlayCircle size={60} color="#FF6B35" style={{ marginBottom: '20px' }}/>
            <h2 className="overview-card-title" style={{ fontSize: '28px', color: 'var(--text-primary)' }}>Start Your 60-Day Transformation</h2>
            <p className="overview-card-subtitle" style={{ maxWidth: '450px', margin: '0 auto 24px auto', color: 'var(--text-tertiary)' }}>
                You're one click away from beginning a new chapter. When you're ready, start the challenge to begin tracking your progress.
            </p>
            <button 
                onClick={startChallenge}
                style={{ padding: '12px 32px', background: 'linear-gradient(135deg, #FF6B35 0%, #f74d0e 100%)', color: '#ffffff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease', fontSize: '18px', boxShadow: '0 8px 20px -5px rgba(255, 107, 53, 0.5)'}} 
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                Begin Challenge
            </button>
        </div>
      </div>
    );
  }

  // VIEW 2: User just started, needs to do initial setup
  if (appState.isFirstTimeSetup) {
      return <InitialSetup />;
  }

  // VIEW 3: Regular Dashboard for an ongoing challenge
  const isTodayWorkoutCompleted = appState.workoutsCompleted.includes(appState.currentDay);
  const programCompletion = (appState.workoutsCompleted.length / 50) * 100;
  const weightLost = appState.startingWeight > 0 ? appState.startingWeight - appState.currentWeight : 0;

  const metricCardsData = [
    { icon: TrendingDown, title: "Weight Lost", value: weightLost > 0 ? weightLost : 0, unit: "lbs", color: "#10b981" },
    { icon: Flame, title: "Current Streak", value: appState.currentStreak, unit: "days", color: "#fb923c", iconElement: <Flame size={24} color="#ffffff" className="fire-icon" /> },
    { icon: Dumbbell, title: "Total Lbs Lifted", value: appState.totalLbsLifted, unit: "lbs", color: "#3b82f6" },
    { icon: Repeat, title: "Total Reps", value: appState.totalReps, unit: "", color: "#8b5cf6" },
    { icon: BarChart, title: "Total Sets", value: appState.totalSets, unit: "", color: "#ef4444" },
  ];

  return (
    <div className="dashboard-container">
      <div className="hero-section">
        <ProgressRing percentage={programCompletion} size={140} />
        <div>
          <h2>Day {appState.currentDay} of 60</h2>
          <p>You're doing great. Keep up the momentum!</p>
        </div>
      </div>
      <div className="metrics-grid">
        {metricCardsData.map((card, index) => ( <MetricCard key={index} {...card} /> ))}
      </div>
      <WeightChart />
      <div style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', padding: '24px', boxShadow: 'var(--shadow)', border: '1px solid var(--border-color)' }}>
        {isTodayWorkoutCompleted ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <CheckCircle size={48} color="#10b981" />
            <div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-primary)' }}>Workout Complete!</h3>
                <p style={{ marginTop: '4px', fontSize: '16px', color: 'var(--text-tertiary)' }}>
                    Awesome job on finishing Day {appState.currentDay}. Rest up and see you tomorrow!
                </p>
            </div>
          </div>
        ) : (
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: 'var(--text-primary)' }}>Today's Workout</h3>
            <p style={{ fontWeight: '600', fontSize: '18px', color: '#FF6B35' }}>Time to train!</p>
            <p style={{ marginTop: '8px', fontSize: '16px', color: 'var(--text-tertiary)' }}>Ready for Day {appState.currentDay}?</p>
            <button style={{ marginTop: '16px', padding: '10px 20px', background: 'linear-gradient(135deg, #FF6B35 0%, #f74d0e 100%)', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', fontSize: '16px' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(255, 107, 53, 0.4)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }} onClick={() => setActiveView('workout')}>
              Go to Workout →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;