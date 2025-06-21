// src/components/Dashboard/Dashboard.jsx

import React, { useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import ProgressRing from './ProgressRing.jsx';
import MetricCard from './MetricCard.jsx';
import WeightChart from './WeightChart.jsx';
import './Dashboard.css';
import { Weight, TrendingDown, Target, Flame, Dumbbell, Repeat, BarChart } from 'lucide-react';

const Dashboard = ({ setActiveView }) => {
  const { appState } = useContext(AppStateContext);

  // THE FIX IS HERE: The percentage is now based on completed workouts, not the current day.
  const programCompletion = (appState.workoutsCompleted.length / 50) * 100; // 50 workouts over 60 days
  const weightLost = appState.startingWeight - appState.currentWeight;

  const metricCardsData = [
    { icon: TrendingDown, title: "Weight Lost", value: weightLost > 0 ? weightLost : 0, unit: "lbs", color: "#10b981" },
    { icon: Flame, title: "Current Streak", value: appState.currentStreak, unit: "days", color: "#fb923c", iconElement: <Flame size={24} color="#ffffff" className="fire-icon" /> },
    { icon: Dumbbell, title: "Total Lbs Lifted", value: appState.totalLbsLifted, unit: "lbs", color: "#3b82f6" },
    { icon: Repeat, title: "Total Reps", value: appState.totalReps, unit: "", color: "#8b5cf6" },
    { icon: BarChart, title: "Total Sets", value: appState.totalSets, unit: "", color: "#ef4444" },
  ];

  // The rest of the component is unchanged
  const workoutCardStyle = { /* ... */ };
  const buttonStyle = { /* ... */ };
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
      <div style={{...workoutCardStyle, backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', padding: '24px', boxShadow: 'var(--shadow)', border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: 'var(--text-primary)' }}>Today's Workout</h3>
        <div>
          <p style={{ fontWeight: '600', fontSize: '18px', color: '#FF6B35' }}>Time to train!</p>
          <p style={{ marginTop: '8px', fontSize: '16px', color: 'var(--text-tertiary)' }}>Ready for Day {appState.currentDay}?</p>
          <button style={{ ...buttonStyle, marginTop: '16px', padding: '10px 20px', background: 'linear-gradient(135deg, #FF6B35 0%, #f74d0e 100%)', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', fontSize: '16px' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(255, 107, 53, 0.4)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }} onClick={() => setActiveView('workout')}>
            Go to Workout →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;