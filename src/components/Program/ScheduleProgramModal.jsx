import React, { useState } from 'react';
import Modal from '../Common/Modal.jsx';
import './ProgramOverview.css'; // We'll add the new styles here

const ScheduleProgramModal = ({ isOpen, onClose, onConfirm, programToSchedule }) => {
  // Days are 0 (Sun) to 6 (Sat)
  const [selectedDays, setSelectedDays] = useState([1, 2, 3, 4, 5]); // Default Mon-Fri
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (!isOpen || !programToSchedule) return null;

  const handleDayToggle = (dayIndex) => {
    setSelectedDays(prevDays => {
      const newDays = prevDays.includes(dayIndex)
        ? prevDays.filter(d => d !== dayIndex)
        : [...prevDays, dayIndex].sort();

      // Ensure at least one day is always selected
      return newDays.length === 0 ? prevDays : newDays;
    });
  };

  const handleConfirmClick = () => {
    onConfirm(selectedDays);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Auto-Schedule Program">
      <div className="modal-form-container">
        <p className="modal-confirm-text" style={{ textAlign: 'left' }}>
          You're about to schedule "<strong>{programToSchedule.name}</strong>".
          <br /><br />
          Please select your preferred workout days below. The program will be scheduled on these days consecutively.
        </p>

        <div className="day-selector-container">
          {daysOfWeek.map((day, index) => (
            <button
              key={index}
              className={`day-selector-btn ${selectedDays.includes(index) ? 'active' : ''}`}
              onClick={() => handleDayToggle(index)}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="modal-actions">
          <button type="button" className="action-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="action-btn schedule-btn" onClick={handleConfirmClick}>
            Schedule Program
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ScheduleProgramModal;