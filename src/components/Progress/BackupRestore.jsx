// src/components/Progress/BackupRestore.jsx

import React, { useContext, useRef, useState } from 'react';
import { AppStateContext } from '../../context/AppContext';
import Modal from '../Common/Modal.jsx';
import { Download, Upload } from 'lucide-react';
import {
  downloadBackup,
  getLastBackupDate,
  parseBackup,
  summarizeBackupData,
} from '../../utils/backup.js';

const BackupRestore = () => {
  const { appState, updateAppState } = useContext(AppStateContext);
  const fileInputRef = useRef(null);

  const [lastBackup, setLastBackup] = useState(() => getLastBackupDate());
  const [pending, setPending] = useState(null); // { data, summary, exportedAt }
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text }

  const handleExport = () => {
    try {
      downloadBackup(appState);
      setLastBackup(new Date());
      setMessage({ type: 'success', text: 'Backup downloaded. Keep the file somewhere safe (cloud drive, email to yourself, etc.).' });
    } catch (error) {
      console.error('Backup export failed:', error);
      setMessage({ type: 'error', text: 'Could not create the backup file. Please try again.' });
    }
  };

  const handleFileChosen = async (event) => {
    const file = event.target.files && event.target.files[0];
    // Reset so choosing the same file twice still triggers onChange.
    event.target.value = '';
    if (!file) return;

    setMessage(null);
    try {
      const text = await file.text();
      const { data, exportedAt } = parseBackup(text);
      setPending({ data, exportedAt, summary: summarizeBackupData(data) });
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Could not read that file.' });
    }
  };

  const handleConfirmRestore = () => {
    if (!pending) return;
    updateAppState(pending.data);
    setPending(null);
    setMessage({ type: 'success', text: 'Backup restored. Your data has been replaced with the contents of the file.' });
  };

  const formatDate = (value) => {
    if (!value) return null;
    const date = value instanceof Date ? value : new Date(value);
    return isNaN(date.getTime()) ? null : date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const lastBackupText = formatDate(lastBackup);

  return (
    <>
      <div className="progress-card">
        <div className="progress-card-header">
          <h3 className="progress-card-title">Backup &amp; Restore</h3>
        </div>
        <p className="danger-zone-text" style={{ marginBottom: '16px' }}>
          Download all your programs, workouts, weight history, photos and settings as a file, and restore them any time.
          Free for everyone. {lastBackupText ? `Last backup on this device: ${lastBackupText}.` : 'You have not made a backup on this device yet.'}
        </p>

        <div className="modal-actions" style={{ marginTop: 0 }}>
          <button type="button" className="action-btn schedule-btn" onClick={handleExport}>
            <Download size={16} /> Download Backup
          </button>
          <button type="button" className="action-btn" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
            <Upload size={16} /> Restore from File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            onChange={handleFileChosen}
            style={{ display: 'none' }}
          />
        </div>

        {message && (
          <p
            className={message.type === 'error' ? 'auth-error' : 'danger-zone-text'}
            style={{ marginTop: '12px' }}
          >
            {message.text}
          </p>
        )}
      </div>

      <Modal isOpen={!!pending} onClose={() => setPending(null)} title="Restore Backup">
        {pending && (
          <div className="modal-form-container">
            <p className="modal-confirm-text" style={{ textAlign: 'left' }}>
              This will <strong>replace</strong> your current programs, workouts, weight history, photos and settings with the
              contents of this backup{formatDate(pending.exportedAt) ? ` (made on ${formatDate(pending.exportedAt)})` : ''}.
            </p>
            <ul style={{ margin: '12px 0 20px 20px', lineHeight: 1.7 }}>
              <li>{pending.summary.programs} program(s)</li>
              <li>{pending.summary.workoutsCompleted} workout(s) completed</li>
              <li>{pending.summary.weightEntries} weight entr{pending.summary.weightEntries === 1 ? 'y' : 'ies'}</li>
              <li>{pending.summary.customExercises} custom exercise(s)</li>
              <li>{pending.summary.photos} photo(s)</li>
            </ul>
            <p className="modal-confirm-text" style={{ textAlign: 'left' }}>
              Tip: download a backup of your current data first if you might want it back.
            </p>
            <div className="modal-actions">
              <button type="button" className="action-btn" onClick={() => setPending(null)}>
                Cancel
              </button>
              <button type="button" className="action-btn danger-btn" onClick={handleConfirmRestore}>
                Replace My Data
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default BackupRestore;