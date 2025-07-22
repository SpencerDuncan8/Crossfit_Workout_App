// src/App.jsx

import React, { useState, useContext, useEffect } from 'react';
import { Home, Calendar, TrendingUp, Dumbbell, Moon, Sun, BookOpen, LogOut, Cloud, UserCheck, Crown, Star, User, Users } from 'lucide-react';
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
import PremiumModal from './components/Premium/PremiumModal.jsx';
import AccountModal from './components/Premium/AccountModal.jsx';
import ReactivationConfirmation from './components/Premium/ReactivationConfirmation.jsx';
import CommunityView from './components/Community/CommunityView.jsx';

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
import './components/Premium/PremiumModal.css';
import './components/Premium/AccountModal.css';
import './components/Community/CommunityView.css';

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

const ProfileSection = ({ currentUser, isPremium, onLogoutClick, setIsPremiumModalOpen, setIsAccountModalOpen }) => {
    if (currentUser) {
        return (
            <div style={{width:'100%', padding:'12px', background:'var(--bg-tertiary)', border:'1px solid var(--border-color)', borderRadius:'12px', cursor:'pointer'}} onClick={() => setIsAccountModalOpen(true)}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                        <div style={{background: isPremium ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' : 'var(--bg-primary)', borderRadius:'8px', padding:'8px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <User size={20} color={isPremium ? "white" : "var(--text-secondary)"} />
                        </div>
                        <div>
                            <p style={{fontWeight:'600', color:'var(--text-primary)', fontSize:'12px'}}>{isPremium ? 'Premium User:' : 'Signed in as:'}</p>
                            <p style={{fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '140px'}}>{currentUser.email}</p>
                        </div>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        {isPremium && <Crown size={16} style={{color: '#fbbf24'}} />}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <button onClick={() => setIsPremiumModalOpen(true)} style={{width:'100%', padding:'12px', background:'var(--bg-tertiary)', border:'1px solid var(--border-color)', borderRadius:'12px', cursor:'pointer', textAlign:'left'}}>
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

export default function App() {
  const { appState, authLoading, currentUser, logOut, closePremiumModal, refreshSubscriptionData } = useContext(AppStateContext);
  const { darkMode } = useContext(ThemeContext);
  const isPremium = appState.isPremium || currentUser?.isPremium;
  const [activeView, setActiveView] = useState('program');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { width, height } = useWindowSize();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isReactivationConfirmOpen, setIsReactivationConfirmOpen] = useState(false);

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

  const closeAccountModal = () => setIsAccountModalOpen(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'program', label: 'Program', icon: BookOpen },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'workout', label: 'Workout', icon: Dumbbell },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'community', label: 'Community', icon: Users },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard setActiveView={setActiveView} />;
      case 'workout': return <WorkoutView setActiveView={setActiveView} />;
      case 'calendar': return <CalendarView setActiveView={setActiveView} />;
      case 'progress': return <ProgressView />;
        case 'community': return <CommunityView />;
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
                    <button onClick={() => setIsAccountModalOpen(true)} style={{background:'none', border: 'none', color:'var(--text-primary)'}}><User size={22} /></button>
                 ) : (
                    <button onClick={() => setIsPremiumModalOpen(true)} style={{background:'none', border: 'none', color:'var(--text-primary)'}}><Crown size={22} /></button>
                 )}
                 <ThemeToggle isMobile={true} />
              </div>
            </div>
          </div>
          <main className="main-content">{renderView()}</main>
                    <div className="mobile-nav">
            {/* --- THIS IS THE CORRECTED FIX --- */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)', // Change from 5 to 6
              padding: '8px' 
            }}>
              {navItems.map(item => (
                <NavItem 
                  key={item.id} 
                  icon={item.icon} 
                  label={item.label} 
                  isActive={activeView === item.id} 
                  onClick={() => setActiveView(item.id)} 
                  isMobile={true} 
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="sidebar"><div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}><div style={{ padding: '24px' }}><h1 style={{ fontSize: '24px', fontWeight: 'bold', background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>BlockFit</h1></div><nav style={{ flex: 1, padding: '0 16px' }}>{navItems.map(item => (<div key={item.id} style={{ marginBottom: '8px' }}> <NavItem icon={item.icon} label={item.label} isActive={activeView === item.id} onClick={() => setActiveView(item.id)} isMobile={false} /> </div>))}</nav><div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', display:'flex', flexDirection:'column', gap:'12px' }}><ProfileSection 
    currentUser={currentUser} 
    isPremium={isPremium} 
    onLogoutClick={handleLogoutClick}
    setIsPremiumModalOpen={setIsPremiumModalOpen}
    setIsAccountModalOpen={setIsAccountModalOpen}
/><ThemeToggle isMobile={false} /></div></div></div>
          <main className="main-content">{renderView()}</main>
        </>
      )}

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

      <PremiumModal 
        isOpen={isPremiumModalOpen || appState.isPremiumModalOpen}
        onClose={() => {
          setIsPremiumModalOpen(false);
          closePremiumModal();
        }}
      />

      <AccountModal 
  isOpen={isAccountModalOpen}
  onClose={closeAccountModal}
  currentUser={currentUser}
  isPremium={isPremium}
  onLogout={handleLogoutClick}
  stripeCustomerId={appState.stripeCustomerId}
  subscriptionCancelAtPeriodEnd={appState.subscriptionCancelAtPeriodEnd}
  subscriptionCurrentPeriodEnd={appState.subscriptionCurrentPeriodEnd}
  subscriptionStatus={appState.subscriptionStatus}
  refreshSubscriptionData={refreshSubscriptionData}
  setIsPremiumModalOpen={setIsPremiumModalOpen}
  setIsReactivationConfirmOpen={setIsReactivationConfirmOpen}
/>
      <Modal
        isOpen={isReactivationConfirmOpen}
        onClose={() => setIsReactivationConfirmOpen(false)}
        title="Confirm Your Subscription"
      >
        <ReactivationConfirmation 
          onConfirm={() => {
            setIsReactivationConfirmOpen(false);
      refreshSubscriptionData(); 
          }}
          onCancel={() => setIsReactivationConfirmOpen(false)}
        />
      </Modal>
      
      {appState.isWorkoutEditorOpen && <WorkoutEditor />}
      {appState.isModalOpen && <ExerciseDetailModal />}
      {appState.isInfoModalOpen && <InfoModal content={appState.infoModalContent} />}
      <TimerBar />
    </div>
  );
}