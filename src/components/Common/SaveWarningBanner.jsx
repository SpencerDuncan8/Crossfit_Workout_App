// src/components/Common/SaveWarningBanner.jsx

import React, { useContext, useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { useSaveStatus } from '../../utils/saveStatus.js';

const CLOUD_MESSAGES = {
  'too-large':
    'Your data has grown too large to back up to the cloud, so new changes are only saved on this device. Download a backup so nothing is lost.',
  permission:
    'Cloud backup is not accepting saves right now, so new changes are only saved on this device. Download a backup, and contact support if this keeps happening.',
  quota:
    'Cloud backup is temporarily unavailable. Your changes are saved on this device and will sync when it is back.',
  'signed-out':
    'You have been signed out of cloud backup. Your changes are saved on this device. Log out and back in to resume syncing.',
  'item-too-large':
    'One item (usually a large photo) is too big to back up to the cloud. Everything else is backing up normally. Open Progress and use Change Before / Change After to re-select the photo and it will be shrunk automatically.',
  'load-failed':
    'We could not load your cloud data, so cloud backup is paused to protect it. Your data on this device is safe. Refresh the page to try again.',
  unknown:
    'We could not save your latest changes to the cloud. They are saved on this device, and we will try again with your next change.',
};

const LOCAL_MESSAGE =
  'This device is out of storage space, so your latest changes may be lost if you refresh or close the app. Download a backup now.';

const SaveWarningBanner = ({ onOpenBackup }) => {
  const { currentUser } = useContext(AppStateContext);
  const status = useSaveStatus();
  const [dismissedKey, setDismissedKey] = useState(null);

  // Device storage problems are the most serious, so they win over cloud problems.
  let key = null;
  let message = null;
  let urgent = false;
  if (status.local) {
    key = 'local:' + status.local.kind;
    message = LOCAL_MESSAGE;
    urgent = true;
  } else if (status.cloud && currentUser) {
    key = 'cloud:' + status.cloud.kind;
    message = CLOUD_MESSAGES[status.cloud.kind] || CLOUD_MESSAGES.unknown;
    urgent = status.cloud.kind === 'too-large';
  }

  // Once things are saving again, forget the dismissal so a future problem shows up again.
  useEffect(() => {
    if (!key) setDismissedKey(null);
  }, [key]);

  if (!key || dismissedKey === key) return null;

  const background = urgent ? '#b91c1c' : '#b45309';
  const isPhotoProblem = key === 'cloud:item-too-large';
  const showBackupButton = urgent || key.startsWith('cloud:permission') || isPhotoProblem;

  return (
    <div
      role="alert"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 3000,
        background,
        color: '#ffffff',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '14px',
        lineHeight: 1.4,
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }}
    >
      <AlertTriangle size={20} style={{ flexShrink: 0 }} />
      <span style={{ flex: 1 }}>{message}</span>
      {showBackupButton && onOpenBackup && (
        <button
          type="button"
          onClick={onOpenBackup}
          style={{
            background: '#ffffff',
            color: background,
            border: 'none',
            borderRadius: '6px',
            padding: '6px 10px',
            fontWeight: 600,
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {isPhotoProblem ? 'Open Progress' : 'Go to Backup'}
        </button>
      )}
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => setDismissedKey(key)}
        style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', display: 'flex', padding: '4px', flexShrink: 0 }}
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default SaveWarningBanner;