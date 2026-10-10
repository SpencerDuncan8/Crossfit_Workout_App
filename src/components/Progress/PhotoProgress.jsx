// src/components/Progress/PhotoProgress.jsx

import React, { useContext, useRef } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { Camera, Image as ImageIcon, Trash2 } from 'lucide-react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

// Only two photos are ever stored: one "before" and one "after".
// Either one can be replaced (or removed) at any time.

// Phone photos are several MB. Stored as base64 inside the app state they blow past the
// browser's ~5MB localStorage limit (the save fails silently, so the photo vanishes on refresh)
// and the 1MB Firestore document limit. Shrink every photo before it is stored.
const compressImage = (file, maxSize = 1000, quality = 0.75) =>
  new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(objectUrl);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error('Could not read image')); };
    img.src = objectUrl;
  });

const isValid = (p) => p && p.url && p.url.startsWith('data:image');

const PhotoProgress = () => {
  const { appState, setProgressPhoto, removeProgressPhoto } = useContext(AppStateContext);

  // Photos saved by the older multi-photo version still show until the first change
  // (setProgressPhoto folds them into the two slots and clears the old list).
  const legacy = (appState.photos || []).filter(isValid);
  const beforePhoto = isValid(appState.beforePhoto) ? appState.beforePhoto : (legacy[0] || null);
  const afterPhoto = isValid(appState.afterPhoto) ? appState.afterPhoto : (legacy.length >= 2 ? legacy[legacy.length - 1] : null);

  const fileInputRef = useRef(null);
  const slotRef = useRef('before');

  const handleChoose = (slot) => {
    slotRef.current = slot;
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    event.target.value = ''; // lets you pick the same file again later
    if (!file) return;
    try {
      const compressed = await compressImage(file);
      setProgressPhoto(slotRef.current, compressed);
    } catch (error) {
      console.error("Error processing photo:", error);
      alert("Sorry, that photo couldn't be processed. Please try a different image.");
    }
  };

  const imageStyle = { objectFit: 'contain', backgroundColor: 'var(--bg-primary)' };
  const singlePhoto = beforePhoto || afterPhoto;
  const singleLabel = beforePhoto ? 'Before' : 'After';

  const slotButtonStyle = { flex: 1, minWidth: 0 };
  const slotDateStyle = { fontSize: '12px', color: 'var(--text-tertiary)', textAlign: 'center', marginTop: '4px' };
  const removeBtnStyle = {
    background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '12px', marginTop: '4px', padding: 0,
  };

  const renderSlot = (slot, label, photo) => (
    <div style={{ flex: 1, minWidth: 0 }}>
      <button className="upload-photo-btn" style={slotButtonStyle} onClick={() => handleChoose(slot)}>
        <Camera size={18} />
        {photo ? `Change ${label}` : `Add ${label}`}
      </button>
      <div style={slotDateStyle}>
        {photo ? photo.date : 'No photo yet'}
        {photo && (
          <div>
            <button style={removeBtnStyle} onClick={() => removeProgressPhoto(slot)}>
              <Trash2 size={12} /> Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="progress-card">
      <div className="progress-card-header">
        <div className="progress-card-icon" style={{ backgroundColor: '#8b5cf6' }}>
          <ImageIcon size={24} color="white" />
        </div>
        <h3 className="progress-card-title">Photo Progress</h3>
      </div>

      <div className="photo-progress-container">
        {beforePhoto && afterPhoto ? (
          <ReactCompareSlider
            itemOne={<ReactCompareSliderImage src={beforePhoto.url} alt={`Before photo from ${beforePhoto.date}`} style={imageStyle} />}
            itemTwo={<ReactCompareSliderImage src={afterPhoto.url} alt={`After photo from ${afterPhoto.date}`} style={imageStyle} />}
            className="comparison-slider"
          />
        ) : (
          <div className="photo-placeholder">
            {singlePhoto ? (
              <>
                <img src={singlePhoto.url} alt={`${singleLabel} photo from ${singlePhoto.date}`} className="single-photo-preview" />
                <p>Add your {beforePhoto ? 'After' : 'Before'} photo to see the comparison.</p>
              </>
            ) : (
              <p>Add a Before and an After photo to see your comparison.</p>
            )}
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <div style={{ display: 'flex', gap: '12px' }}>
        {renderSlot('before', 'Before', beforePhoto)}
        {renderSlot('after', 'After', afterPhoto)}
      </div>
    </div>
  );
};

export default PhotoProgress;