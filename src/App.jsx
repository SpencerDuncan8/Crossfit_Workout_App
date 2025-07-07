// src/App.jsx

import React, { useState, useContext, useEffect } from 'react';
import { Home, Calendar, TrendingUp, Dumbbell, Moon, Sun, BookOpen, LogOut, Cloud, UserCheck, Crown, Star } from 'lucide-react';
import { ThemeContext, AppStateContext } from './context/AppContext.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import WorkoutView from './components/Workout/WorkoutView.jsx';
import CalendarView from './components/Calendar/CalendarView.jsx';
import ProgressView from './components/Progress/ProgressView.jsx';
import ProgramOverview from './components/Program/ProgramOverview.jsx';
import TimerBar from './components/Common/TimerBar.jsx';
import ExerciseDetailModal from './components/Common/ExerciseDetailModal.jsx';
import WorkoutEditor from './components/Program/WorkoutEditor.jsx';
import Modal from './components/Common/Modal.jsx';
import Confetti from 'react-confetti';
import { useWindowSize } from './hooks/useWindowSize.jsx';
import InfoModal from './components/Common/InfoModal.jsx';
import Auth from './components/Auth/Auth.jsx';
import LoadingSpinner from './components/Common/LoadingSpinner.jsx';

import './App.css';
import './components/Dashboard/Dashboard.css';
import './components/Workout/Workout.css';
import './components/Common/TimerBar.css';
import './components/Common/ExerciseDetailModal.css';
import './components/Calendar/Calendar.css';
import './components/Common/Modal.css';
import './components/Progress/Progress.css';
import './components/Program/ProgramOverview.css';
import './components/Program/WorkoutEditor.css';
import './components/Common/InfoModal.css';
import './components/Auth/Auth.css';
import './components/Common/LoadingSpinner.css';

const NavItem = ({ icon: Icon, label, isActive, onClick, isMobile }) => {
  const baseStyle = { display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start', padding: isMobile ? '12px' : '12px 16px', borderRadius: '12px', transition: 'all 0.3s ease', cursor: 'pointer', border: 'none', background: isActive ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 'transparent', color: isActive ? '#ffffff' : 'var(--text-tertiary)', boxShadow: isActive ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none', transform: isActive ? 'scale(1.02)' : 'scale(1)', width: '100%', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '4px' : '12px', position: 'relative', overflow: 'hidden' };
  const labelStyle = { fontSize: isMobile ? '10px' : '14px', fontWeight: '500', display: isMobile && !isActive ? 'none' : 'block' };
  return ( <button onClick={onClick} style={baseStyle} onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'; e.currentTarget.style.color = 'var(--text-primary)'; } }} onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-tertiary)'; } }} > <Icon size={isMobile ? 22 : 20} style={{ animation: isActive ? 'pulse 2s infinite' : 'none' }} /> <span style={labelStyle}>{label}</span> {isActive && ( <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', opacity: 0.2, filter: 'blur(20px)', zIndex: -1 }} /> )} </button> );
};

const ThemeToggle = ({ isMobile }) => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const buttonStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '12px', borderRadius: '8px', backgroundColor: 'var(--bg-tertiary)', border: 'none', cursor: 'pointer', transition: 'all 0.2s ease', gap: '8px' };
  const spanStyle = { fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)' };
  if (isMobile) { return ( <button onClick={toggleTheme} style={{...buttonStyle, width: '44px', height: '44px'}}> {darkMode ? <Sun size={20} style={{ color: '#fbbf24' }} /> : <Moon size={20} style={{ color: '#3b82f6' }} />} </button> ); }
  return ( <button onClick={toggleTheme} style={buttonStyle} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'} > {darkMode ? ( <> <Sun size={20} style={{ color: '#fbbf24' }} /> <span style={spanStyle}>Light Mode</span> </> ) : ( <> <Moon size={20} style={{ color: '#3b82f6' }} /> <span style={spanStyle}>Dark Mode</span> </> )} </button> );
};

const AccountStatus = ({ openAuthModal, onLogoutClick }) => {
    const { currentUser, appState, openPremiumModal } = useContext(AppStateContext);
    const isPremium = appState.isPremium || currentUser?.isPremium;

    if (currentUser) {
        return (
            <div style={{padding: '12px 16px', background: 'var(--bg-tertiary)', borderRadius: '12px'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div>
                        <p style={{fontSize: '12px', color: 'var(--text-tertiary)'}}>{isPremium ? 'Premium User:' : 'Signed in as:'}</p>
                        <p style={{fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '140px'}}>{currentUser.email}</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        {isPremium && <Crown size={16} style={{color: '#fbbf24'}} />}
                        <button onClick={onLogoutClick} title="Logout" style={{background:'none', border:'none', color:'var(--text-tertiary)', cursor:'pointer', padding:'8px', borderRadius:'50%'}} onMouseEnter={e => e.currentTarget.style.color = '#ef4444'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}><LogOut size={20}/></button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <button onClick={openPremiumModal} style={{width:'100%', padding:'12px', background:'var(--bg-tertiary)', border:'1px solid var(--border-color)', borderRadius:'12px', cursor:'pointer', textAlign:'left'}}>
            <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                <div style={{background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', borderRadius:'8px', padding:'8px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <Crown size={20} color="white" />
                </div>
                <div>
                    <p style={{fontWeight:'600', color:'var(--text-primary)'}}>Upgrade to Premium</p>
                    <p style={{fontSize:'12px', color:'var(--text-tertiary)'}}>Unlimited programs + sync</p>
                </div>
            </div>
        </button>
    )
}

// NEW: Premium Modal Component
const PremiumModal = ({ isOpen, onClose }) => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    
    const handleUpgradeClick = () => {
        onClose();
        setIsAuthModalOpen(true);
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} title="Upgrade to Premium">
                <div className="modal-form-container">
                    <div style={{textAlign: 'center', marginBottom: '24px'}}>
                        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '16px'}}>
                            <div style={{background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', borderRadius: '50%', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Crown size={32} color="white" />
                            </div>
                        </div>
                        <h3 style={{fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px'}}>
                            Program Limit Reached
                        </h3>
                        <p style={{color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.5', marginBottom: '24px'}}>
                            You've reached the free limit of 3 custom programs. Upgrade to Premium to unlock unlimited programs and cloud sync.
                        </p>
                    </div>

                    <div style={{background: 'var(--bg-secondary)', borderRadius: '12px', padding: '20px', marginBottom: '24px'}}>
                        <h4 style={{fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}>
                            <Star size={20} style={{color: '#fbbf24'}} />
                            Premium Features
                        </h4>
                        <ul style={{listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)'}}>
                            <li style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                                <div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#10b981'}}></div>
                                <span>Unlimited custom programs</span>
                            </li>
                            <li style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                                <div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#10b981'}}></div>
                                <span>Cloud sync across all devices</span>
                            </li>
                            <li style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                                <div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#10b981'}}></div>
                                <span>Access your data anywhere</span>
                            </li>
                            <li style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                                <div style={{width: '6px', height: '6px', borderRadius: '50%', background: '#10b981'}}></div>
                                <span>Future premium features</span>
                            </li>
                        </ul>
                    </div>

                    <div style={{textAlign: 'center', marginBottom: '20px'}}>
                        <div style={{fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)'}}>
                            $4.99<span style={{fontSize: '16px', fontWeight: 'normal', color: 'var(--text-secondary)'}}>/month</span>
                        </div>
                        <p style={{fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px'}}>
                            Cancel anytime
                        </p>
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="action-btn" onClick={onClose}>Maybe Later</button>
                        <button 
                            type="button" 
                            className="action-btn schedule-btn" 
                            onClick={handleUpgradeClick}
                            style={{background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', borderColor: '#fbbf24'}}
                        >
                            Upgrade Now
                        </button>
                    </div>
                </div>
            </Modal>
            
            <Modal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)}>
                <Auth closeModal={() => setIsAuthModalOpen(false)} />
            </Modal>
        </>
    );
};

export default function App() {
  const { appState, authLoading, currentUser, logOut, closePremiumModal } = useContext(AppStateContext);
  const [activeView, setActiveView] = useState('program');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { width, height } = useWindowSize();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogoutClick = () => {
    setIsLogoutConfirmOpen(true);
  };

  const handleConfirmLogout = () => {
    logOut();
    setIsLogoutConfirmOpen(false);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'program', label: 'Program', icon: BookOpen },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'workout', label: 'Workout', icon: Dumbbell },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard setActiveView={setActiveView} />;
      case 'workout': return <WorkoutView setActiveView={setActiveView} />;
      case 'calendar': return <CalendarView setActiveView={setActiveView} />;
      case 'progress': return <ProgressView />;
      case 'program': return <ProgramOverview setActiveView={setActiveView} />;
      default: return <ProgramOverview setActiveView={setActiveView} />;
    }
  };

  if (authLoading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="app">
      {appState.showConfetti && <Confetti width={width} height={height} recycle={false} onConfettiComplete={(confetti) => confetti.reset()} />}
      
      {isMobile ? (
        <>
          <div className="mobile-header">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 'bold', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>BlockFit</h1>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                 {currentUser ? (
                    <button onClick={handleLogoutClick} style={{background:'none', border: 'none', color:'var(--text-tertiary)'}}><LogOut size={22} /></button>
                 ) : (
                    <button onClick={() => setIsAuthModalOpen(true)} style={{background:'none', border: 'none', color:'var(--text-primary)'}}><UserCheck size={22} /></button>
                 )}
                 <ThemeToggle isMobile={true} />
              </div>
            </div>
          </div>
          <main className="main-content">{renderView()}</main>
          <div className="mobile-nav"><div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', padding: '8px' }}>{navItems.map(item => (<NavItem key={item.id} icon={item.icon} label={item.label} isActive={activeView === item.id} onClick={() => setActiveView(item.id)} isMobile={true} />))}</div></div>
        </>
      ) : (
        <>
          <div className="sidebar"><div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}><div style={{ padding: '24px' }}><h1 style={{ fontSize: '24px', fontWeight: 'bold', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>BlockFit</h1></div><nav style={{ flex: 1, padding: '0 16px' }}>{navItems.map(item => (<div key={item.id} style={{ marginBottom: '8px' }}> <NavItem icon={item.icon} label={item.label} isActive={activeView === item.id} onClick={() => setActiveView(item.id)} isMobile={false} /> </div>))}</nav><div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', display:'flex', flexDirection:'column', gap:'12px' }}><AccountStatus openAuthModal={() => setIsAuthModalOpen(true)} onLogoutClick={handleLogoutClick} /><ThemeToggle isMobile={false} /></div></div></div>
          <main className="main-content">{renderView()}</main>
        </>
      )}

      <Modal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)}>
         <Auth closeModal={() => setIsAuthModalOpen(false)} />
      </Modal>

      <Modal isOpen={isLogoutConfirmOpen} onClose={() => setIsLogoutConfirmOpen(false)} title="Confirm Logout">
        <div className="modal-form-container">
            <p className="modal-confirm-text">
                Are you sure you want to log out? Any unsynced data will be lost.
            </p>
            <div className="modal-actions">
                <button type="button" className="action-btn" onClick={() => setIsLogoutConfirmOpen(false)}>Cancel</button>
                <button type="button" className="action-btn danger-btn" onClick={handleConfirmLogout}>Log Out</button>
            </div>
        </div>
      </Modal>

      {/* NEW: Premium Modal */}
      <PremiumModal 
        isOpen={appState.isPremiumModalOpen} 
        onClose={closePremiumModal} 
      />

      {appState.isWorkoutEditorOpen && <WorkoutEditor />}
      {appState.isExerciseModalOpen && <ExerciseDetailModal exercise={appState.selectedExercise} />}
      {appState.isInfoModalOpen && <InfoModal content={appState.infoModalContent} />}
      <TimerBar />
    </div>
  );
}