// src/App.jsx

import React, { useState, useContext, useEffect } from 'react';
import { Home, Calendar, TrendingUp, Dumbbell, Moon, Sun, Menu, X, BookOpen } from 'lucide-react';
import { ThemeContext, AppStateContext } from './context/AppContext.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import WorkoutView from './components/Workout/WorkoutView.jsx';
import CalendarView from './components/Calendar/CalendarView.jsx';
import ProgressView from './components/Progress/ProgressView.jsx';
import ProgramOverview from './components/Program/ProgramOverview.jsx';
import TimerBar from './components/Common/TimerBar.jsx';
import ExerciseDetailModal from './components/Common/ExerciseDetailModal.jsx';
import Confetti from 'react-confetti'; // CORRECTED IMPORT
import { useWindowSize } from './hooks/useWindowSize.jsx';
import './App.css';
import './components/Dashboard/Dashboard.css';
import './components/Workout/Workout.css';
import './components/Common/TimerBar.css';
import './components/Common/ExerciseDetailModal.css';
import './components/Calendar/Calendar.css';
import './components/Common/Modal.css';
import './components/Progress/Progress.css';
import './components/Program/ProgramOverview.css';

const NavItem = ({ icon: Icon, label, isActive, onClick, isMobile }) => {
  const baseStyle = { display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start', padding: isMobile ? '12px' : '12px 16px', borderRadius: '12px', transition: 'all 0.3s ease', cursor: 'pointer', border: 'none', background: isActive ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 'transparent', color: isActive ? '#ffffff' : 'var(--text-tertiary)', boxShadow: isActive ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none', transform: isActive ? 'scale(1.02)' : 'scale(1)', width: '100%', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '4px' : '12px', position: 'relative', overflow: 'hidden' };
  const labelStyle = { fontSize: isMobile ? '10px' : '14px', fontWeight: '500', display: isMobile && !isActive ? 'none' : 'block' };
  return ( <button onClick={onClick} style={baseStyle} onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'; e.currentTarget.style.color = 'var(--text-primary)'; } }} onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-tertiary)'; } }} > <Icon size={isMobile ? 22 : 20} style={{ animation: isActive ? 'pulse 2s infinite' : 'none' }} /> <span style={labelStyle}>{label}</span> {isActive && ( <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', opacity: 0.2, filter: 'blur(20px)', zIndex: -1 }} /> )} </button> );
};

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const buttonStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: 'var(--bg-tertiary)', border: 'none', cursor: 'pointer', transition: 'all 0.2s ease', gap: '8px' };
  return ( <button onClick={toggleTheme} style={buttonStyle} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'} > {darkMode ? ( <> <Sun size={20} style={{ color: '#fbbf24' }} /> <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)' }}>Light Mode</span> </> ) : ( <> <Moon size={20} style={{ color: '#3b82f6' }} /> <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)' }}>Dark Mode</span> </> )} </button> );
};

export default function App() {
  const { appState } = useContext(AppStateContext);
  const [activeView, setActiveView] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'workout', label: 'Workout', icon: Dumbbell },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'program', label: 'Program', icon: BookOpen },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard setActiveView={setActiveView} />;
      case 'workout': return <WorkoutView setActiveView={setActiveView} />;
      case 'calendar': return <CalendarView />;
      case 'progress': return <ProgressView />;
      case 'program': return <ProgramOverview />;
      default: return <Dashboard setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="app">
      {appState.showConfetti && <Confetti width={width} height={height} recycle={false} onConfettiComplete={(confetti) => confetti.reset()} />}

      {isMobile ? (
        <>
          <div className="mobile-header">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 'bold', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CrossFit Tracker</h1>
              <ThemeToggle />
            </div>
          </div>
          <main className="main-content">{renderView()}</main>
          <div className="mobile-nav">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', padding: '8px' }}>
              {navItems.map(item => (<NavItem key={item.id} icon={item.icon} label={item.label} isActive={activeView === item.id} onClick={() => setActiveView(item.id)} isMobile={true} />))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="sidebar">
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CrossFit Tracker</h1>
                <p style={{ fontSize: '14px', color: 'var(--text-tertiary)', marginTop: '4px' }}>60-Day Transformation</p>
              </div>
              <nav style={{ flex: 1, padding: '0 16px' }}>
                {navItems.map(item => (<div key={item.id} style={{ marginBottom: '8px' }}> <NavItem icon={item.icon} label={item.label} isActive={activeView === item.id} onClick={() => setActiveView(item.id)} isMobile={false} /> </div>))}
              </nav>
              <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)' }}>
                <ThemeToggle />
              </div>
            </div>
          </div>
          <main className="main-content">{renderView()}</main>
        </>
      )}

      {appState.isModalOpen && <ExerciseDetailModal />}
      <TimerBar />
    </div>
  );
}