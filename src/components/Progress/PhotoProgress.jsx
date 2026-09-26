// src/components/Progress/PhotoProgress.jsx

import React, { useContext, useRef, useState } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { Camera, Image as ImageIcon } from 'lucide-react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

const PhotoProgress = () => {
  const { appState, addPhotoEntry } = useContext(AppStateContext);

  const validPhotos = appState.photos.filter(p => p.url && p.url.startsWith('data:image'));

  const fileInputRef = useRef(null);

  // null means "auto" — before tracks the oldest photo, after tracks the
  // newest one, so uploading a new photo keeps working like before unless
  // the person has deliberately picked a specific photo on that side.
  const [beforeIdx, setBeforeIdx] = useState(null);
  const [afterIdx, setAfterIdx] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => { addPhotoEntry(e.target.result); };
      reader.onerror = (error) => { console.error("Error reading file:", error); };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => { fileInputRef.current.click(); };

  const oldestPhoto = validPhotos[0];
  const newestPhoto = validPhotos[validPhotos.length - 1];

  const beforePhoto = (beforeIdx !== null && validPhotos[beforeIdx]) ? validPhotos[beforeIdx] : oldestPhoto;
  const afterPhoto = (afterIdx !== null && validPhotos[afterIdx]) ? validPhotos[afterIdx] : newestPhoto;

  const imageStyle = { objectFit: 'contain', backgroundColor: 'var(--bg-primary)' };

  return (
    <div className="progress-card">
      <div className="progress-card-header">
        <div className="progress-card-icon" style={{ backgroundColor: '#8b5cf6' }}>
          <ImageIcon size={24} color="white" />
        </div>
        <h3 className="progress-card-title">Photo Progress</h3>
      </div>

      {validPhotos.length >= 2 && (
        <div className="photo-compare-controls">
          <div className="photo-compare-field">
            <label className="photo-compare-label">Before</label>
            <select
              className="photo-compare-select"
              value={beforeIdx === null ? '' : beforeIdx}
              onChange={(e) => setBeforeIdx(e.target.value === '' ? null : Number(e.target.value))}
            >
              <option value="">Oldest (Auto)</option>
              {validPhotos.map((p, idx) => (
                <option key={idx} value={idx}>{p.date}</option>
              ))}
            </select>
          </div>
          <div className="photo-compare-field">
            <label className="photo-compare-label">After</label>
            <select
              className="photo-compare-select"
              value={afterIdx === null ? '' : afterIdx}
              onChange={(e) => setAfterIdx(e.target.value === '' ? null : Number(e.target.value))}
            >
              <option value="">Most Recent (Auto)</option>
              {validPhotos.map((p, idx) => (
                <option key={idx} value={idx}>{p.date}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="photo-progress-container">
        {validPhotos.length < 2 ? (
          <div className="photo-placeholder">
            {oldestPhoto ? (
              <img src={oldestPhoto.url} alt={`Photo from ${oldestPhoto.date}`} className="single-photo-preview" />
            ) : (
              <p>Upload at least two photos to see your comparison.</p>
            )}
          </div>
        ) : (
          <ReactCompareSlider
            itemOne={<ReactCompareSliderImage src={beforePhoto.url} alt={`Photo from ${beforePhoto.date}`} style={imageStyle} />}
            itemTwo={<ReactCompareSliderImage src={afterPhoto.url} alt={`Photo from ${afterPhoto.date}`} style={imageStyle} />}
            className="comparison-slider"
          />
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button className="upload-photo-btn" onClick={handleUploadClick}>
        <Camera size={20} />
        {validPhotos.length === 0 ? 'Upload First Photo' : "Upload Today's Photo"}
      </button>
    </div>
  );
};

export default PhotoProgress;