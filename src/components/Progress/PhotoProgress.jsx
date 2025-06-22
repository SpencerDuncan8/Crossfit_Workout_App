// src/components/Progress/PhotoProgress.jsx

import React, { useContext, useRef } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { Camera, Image as ImageIcon } from 'lucide-react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

const PhotoProgress = ({ isInitialSetup = false }) => {
  const { appState, addPhotoEntry } = useContext(AppStateContext);
  
  // THE FIX: Filter the photos array to only include valid, persistent Base64 URLs.
  // This prevents the component from crashing on dead blob URLs.
  const validPhotos = appState.photos.filter(p => p.url && p.url.startsWith('data:image'));
  
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoUrl = e.target.result;
        addPhotoEntry(photoUrl);
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Now, use the "safe" validPhotos array for all logic and rendering.
  const firstPhoto = validPhotos[0];
  const lastPhoto = validPhotos.length > 1 ? validPhotos[validPhotos.length - 1] : null;

  const imageStyle = {
    objectFit: 'contain',
    backgroundColor: 'var(--bg-primary)'
  };

  return (
    <div className="progress-card">
      <div className="progress-card-header">
        <div className="progress-card-icon" style={{ backgroundColor: '#8b5cf6' }}>
          <ImageIcon size={24} color="white" />
        </div>
        <h3 className="progress-card-title">Photo Progress</h3>
      </div>
      
      <div className="photo-progress-container">
        {validPhotos.length < 2 && !isInitialSetup ? (
          <div className="photo-placeholder">
            <p>Upload at least two photos to see your comparison.</p>
            {firstPhoto && <img src={firstPhoto.url} alt={`Day ${firstPhoto.day}`} className="single-photo-preview" />}
          </div>
        ) : validPhotos.length === 0 && isInitialSetup ? (
          <div className="photo-placeholder">
            <p>Upload your 'Day 1' photo to get started.</p>
          </div>
        ) : validPhotos.length > 0 && (validPhotos.length < 2 || isInitialSetup) ? (
            <img src={validPhotos[validPhotos.length - 1].url} alt={`Day ${validPhotos[validPhotos.length - 1].day}`} style={{...imageStyle, width: '100%', height: '100%'}} className="single-photo-preview" />
        ) : (
          <ReactCompareSlider
            itemOne={<ReactCompareSliderImage src={firstPhoto.url} alt={`Day ${firstPhoto.day}`} style={imageStyle} />}
            itemTwo={<ReactCompareSliderImage src={lastPhoto.url} alt={`Day ${lastPhoto.day}`} style={imageStyle} />}
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
        {validPhotos.length === 0 && isInitialSetup ? 'Upload Day 1 Photo' : "Upload Today's Photo"}
      </button>
    </div>
  );
};

export default PhotoProgress;