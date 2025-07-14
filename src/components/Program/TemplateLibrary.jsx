// src/components/Program/TemplateLibrary.jsx

import React, { useContext, useState } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { programTemplates } from '../../data/programTemplates.js';
import { Check, Copy, XCircle, Filter } from 'lucide-react';
import ScheduleProgramModal from './ScheduleProgramModal.jsx';
import Modal from '../Common/Modal.jsx';

import './TemplateLibrary.css'; 

const filterCategories = {
  type: ['Structured Program', 'WODs', 'Challenges'],
  level: ['Beginner', 'Intermediate', 'Advanced'],
  goal: ['General Fitness', 'Get Strong', 'Build Muscle', 'Lose Weight'],
  equipment: ['Bodyweight', 'Dumbbells', 'Kettlebells', 'Full Gym'],
};

const TemplateLibrary = () => {
  const { appState, currentUser, loadProgramTemplate, autoScheduleProgram, openPremiumModal } = useContext(AppStateContext);
  const [scheduleConfirm, setScheduleConfirm] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  const initialFilters = { type: 'Structured Program', level: null, goal: null, equipment: null };
  const [activeFilters, setActiveFilters] = useState(initialFilters);

  const isPremium = appState.isPremium || currentUser?.isPremium;
  const programCount = appState.programs.filter(p => !p.isTemplate).length;
  const maxPrograms = 3;

  const handleFilterClick = (category, value) => {
    setActiveFilters(prev => {
      if (prev[category] === value && category !== 'type') {
        return { ...prev, [category]: null };
      }
      return { ...prev, [category]: value };
    });
  };

  const handleLoadAndSchedule = (template) => {
    if (!isPremium && programCount >= maxPrograms) { openPremiumModal(); return; }
    const isAlreadyLoaded = appState.programs.some(p => p.id === template.id);
    if (!isAlreadyLoaded) { loadProgramTemplate(template); }
    setScheduleConfirm(template);
  };

  const handleAddTemplate = (template) => {
    if (!isPremium && programCount >= maxPrograms) { openPremiumModal(); return; }
    loadProgramTemplate(template);
  };

  const handleConfirmSchedule = (days) => {
    if (scheduleConfirm) {
      autoScheduleProgram(scheduleConfirm.workouts, days);
      setShowSuccessModal(true);
      setScheduleConfirm(null);
    }
  };

  const filteredTemplates = programTemplates.filter(template => {
    return Object.keys(activeFilters).every(category => {
      if (activeFilters[category] === null) return true;
      return template.meta?.[category] === activeFilters[category];
    });
  });

  const getTagColors = (category) => {
    switch (category) {
      case 'level':     return { color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.1)' };
      case 'goal':      return { color: '#10b981', bgColor: 'rgba(16, 185, 129, 0.1)' };
      case 'equipment': return { color: '#fb923c', bgColor: 'rgba(251, 146, 60, 0.1)' };
      case 'type':      return { color: '#8b5cf6', bgColor: 'rgba(139, 92, 246, 0.1)' };
      default:          return { color: 'var(--text-tertiary)', bgColor: 'var(--bg-tertiary)' };
    }
  };
  
  const activeFilterList = Object.entries(activeFilters).filter(([key, value]) => value !== null && key !== 'type');

  return (
    <>
      <div className="page-header" style={{ marginTop: '24px' }}>
        <div className="library-header">
          <h2>Template Library</h2>
          <button className="filter-open-btn" onClick={() => setIsFilterModalOpen(true)}>
            <Filter size={16} />
            Filter
            {activeFilterList.length > 0 && <span className="filter-count-badge">{activeFilterList.length}</span>}
          </button>
        </div>
        <p>Find the perfect program by filtering by type, skill, goal, and equipment.</p>
        
        {/* --- NEW: Show active filter tags --- */}
        {activeFilterList.length > 0 && (
          <div className="active-filters-display">
            {activeFilterList.map(([category, value]) => (
               <span key={value} className="meta-tag" style={{'--tag-color': getTagColors(category).color, '--tag-bg-color': getTagColors(category).bgColor}}>
                 {value}
               </span>
            ))}
          </div>
        )}
      </div>

      <div className="programs-list">
        {filteredTemplates.map(template => {
          const isLoaded = appState.programs.some(p => p.id === template.id);
          return (
            <div key={template.id} className="program-card template">
              <div style={{ flexGrow: 1 }}>
                <h3 className="program-card-title">{template.name}</h3>
                <p className="program-card-description">{template.description}</p>
                <div className="template-meta-tags">
                  {Object.entries(template.meta).map(([category, value]) => {
                      const { color, bgColor } = getTagColors(category);
                      return (
                        <span 
                          key={category} 
                          className="meta-tag" 
                          style={{'--tag-color': color, '--tag-bg-color': bgColor}}
                        >
                          {value}
                        </span>
                      );
                  })}
                </div>
              </div>
              <div className="template-actions">
                <button className="action-btn load-btn" onClick={() => handleLoadAndSchedule(template)}>
                  Load & Schedule
                </button>
                <button
                  className={`action-btn copy-btn ${isLoaded ? 'disabled' : ''}`}
                  onClick={() => !isLoaded && handleAddTemplate(template)}
                  disabled={isLoaded}
                >
                  {isLoaded ? <><Check size={16} /> Added</> : <><Copy size={16} /> Add to Library</>}
                </button>
              </div>
            </div>
          )
        })}
        {filteredTemplates.length === 0 && (
          <div className="no-templates-found">
            <h4>No Programs Found</h4>
            <p>Try adjusting your filters to find the perfect workout program.</p>
          </div>
        )}
      </div>
      
      {/* --- NEW: Filter Modal --- */}
      <Modal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} title="Filter Programs">
        <div className="template-filters">
          {Object.entries(filterCategories).map(([category, options]) => (
            <div key={category} className="filter-group">
              <h4 className="filter-group-title">{category}</h4>
              <div className="filter-options">
                {options.map(option => {
                  const isActive = activeFilters[category] === option;
                  const { color, bgColor } = getTagColors(category); 
                  return (
                    <button
                      key={option}
                      className={`filter-btn ${isActive ? 'active' : ''}`}
                      onClick={() => handleFilterClick(category, option)}
                      style={isActive ? {'--tag-color': color, '--tag-bg-color': bgColor} : {}}
                    >
                      {option}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
           <div className="modal-actions" style={{justifyContent: 'space-between', marginTop: '16px'}}>
              <button className="clear-filters-btn" onClick={() => setActiveFilters(initialFilters)}>
                <XCircle size={16} /> Clear All
              </button>
              <button className="action-btn schedule-btn" onClick={() => setIsFilterModalOpen(false)}>
                Apply Filters
              </button>
           </div>
        </div>
      </Modal>

      <ScheduleProgramModal
        isOpen={!!scheduleConfirm}
        onClose={() => setScheduleConfirm(null)}
        onConfirm={handleConfirmSchedule}
        programToSchedule={scheduleConfirm}
      />

      <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} title="Success">
        <div className="modal-form-container">
          <p className="modal-confirm-text">
            Your program has been scheduled! <br />
            Check the Calendar tab to see your plan.
          </p>
          <div className="modal-actions" style={{ justifyContent: 'center' }}>
            <button type="button" className="action-btn schedule-btn" onClick={() => setShowSuccessModal(false)} style={{ flexGrow: 0, padding: '10px 40px' }}>
              OK
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TemplateLibrary;