// src/components/Dashboard/Dashboard.jsx

import React, { useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import MetricCard from './MetricCard.jsx';
import WeightChart from './WeightChart.jsx';
import { Weight, TrendingDown, Repeat, BarChart, CheckCircle, Dumbbell } from 'lucide-react';
import './Dashboard.css';

const Dashboard = ({ setActiveView }) => {
  const { appState } = useContext(AppStateContext);

  const weightLost = appState.startingWeight > 0 ? appState.startingWeight - appState.currentWeight : 0;

  // THE FIX: Add "Total Workouts" to the main array
  const metricCardsData = [
    { icon: CheckCircle, title: "Total Workouts", value: appState.totalWorkoutsCompleted, unit: "Done", color: "#10b981" },
    { icon: Weight, title: "Current Weight", value: appState.currentWeight, unit: "lbs", color: "#3b82f6" },
    { icon: TrendingDown, title: "Weight Lost", value: weightLost, unit: "lbs", color: "#2dd4bf" },
    { icon: Dumbbell, title: "Total Lbs Lifted", value: appState.totalLbsLifted, unit: "lbs", color: "#fb923c" },
    { icon: BarChart, title: "Total Sets", value: appState.totalSets, unit: "", color: "#ef4444" },
    { icon: Repeat, title: "Total Reps", value: appState.totalReps, unit: "", color: "#8b5cf6" },
  ];

  return (
    <div className="dashboard-container">
      {/* THE FIX: Simplify the hero section */}
      <div className="hero-section" style={{alignItems: 'flex-start'}}>
        <div>
          <h2 style={{fontSize: '32px', marginBottom: '0'}}>Welcome Back!</h2>
          <p>Here's a snapshot of your current progress.</p>
        </div>
      </div>
      
      {/* THE FIX: The grid will now render 6 cards */}
      <div className="metrics-grid">
        {metricCardsData.map((card, index) => ( <MetricCard key={index} {...card} /> ))}
      </div>
      
      <WeightChart />

      <div style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', padding: '24px', boxShadow: 'var(--shadow)', border: '1px solid var(--border-color)' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: 'var(--text-primary)' }}>Ready to Train?</h3>
            <p style={{ marginTop: '8px', fontSize: '16px', color: 'var(--text-tertiary)' }}>Head over to the Program tab to create or start a workout.</p>
            <button style={{ marginTop: '16px', padding: '10px 20px', background: 'linear-gradient(135deg, #FF6B35 0%, #f74d0e 100%)', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', fontSize: '16px' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(255, 107, 53, 0.4)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }} onClick={() => setActiveView('program')}>
              Go to Program →
            </button>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;