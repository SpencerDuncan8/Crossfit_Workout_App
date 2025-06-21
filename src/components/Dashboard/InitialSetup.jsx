// src/components/Dashboard/InitialSetup.jsx

import React, { useContext } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import WeightLogger from '../Progress/WeightLogger.jsx';
import PhotoProgress from '../Progress/PhotoProgress.jsx';
import { Rocket } from 'lucide-react';

const InitialSetup = () => {
    const { completeInitialSetup } = useContext(AppStateContext);

    return (
        <div className="initial-setup-container">
            <div className="overview-card" style={{ textAlign: 'center' }}>
                <Rocket size={48} color="#10b981" style={{ marginBottom: '16px' }}/>
                <h2 className="overview-card-title" style={{ fontSize: '24px' }}>Let's Get You Set Up!</h2>
                <p className="overview-card-subtitle" style={{ maxWidth: '450px', margin: '0 auto 24px auto' }}>
                    Log your starting weight and upload your "Day 1" photo to begin tracking your transformation.
                </p>
            </div>

            <WeightLogger />
            
            {/* We pass the new isInitialSetup prop here */}
            <PhotoProgress isInitialSetup={true} />

            <div style={{ marginTop: '16px' }}>
                <button 
                    onClick={completeInitialSetup}
                    style={{ 
                        width: '100%',
                        padding: '16px', 
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
                        color: '#ffffff', 
                        border: 'none', 
                        borderRadius: '12px', 
                        fontWeight: 'bold', 
                        cursor: 'pointer', 
                        transition: 'all 0.3s ease', 
                        fontSize: '18px',
                        boxShadow: '0 8px 20px -5px rgba(16, 185, 129, 0.4)'
                    }} 
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    Finish Setup & View Dashboard
                </button>
            </div>
        </div>
    );
};

export default InitialSetup;