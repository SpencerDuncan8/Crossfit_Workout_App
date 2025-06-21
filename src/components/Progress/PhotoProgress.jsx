// src/components/Progress/PhotoProgress.jsx

import React, { useContext, useRef } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { Camera, Image as ImageIcon } from 'lucide-react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

// Accept a new prop `isInitialSetup` which defaults to false
const PhotoProgress = ({ isInitialSetup = false }) => {
  const { appState, addPhotoEntry } = useContext(AppStateContext);
  const { photos } = appState;
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const photoUrl = URL.createObjectURL(file);
      addPhotoEntry(photoUrl);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const firstPhoto = photos[0];
  const lastPhoto = photos.length > 1 ? photos[photos.length - 1] : null;

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
        {photos.length < 2 && !isInitialSetup ? (
          // This is the view for the regular Progress tab with 0 or 1 photo
          <div className="photo-placeholder">
            <p>Upload at least two photos to see your comparison.</p>
            {firstPhoto && <img src={firstPhoto.url} alt={`Day ${firstPhoto.day}`} className="single-photo-preview" />}
          </div>
        ) : photos.length === 0 && isInitialSetup ? (
          // THIS IS THE NEW VIEW: For initial setup when no photo is uploaded yet
          <div className="photo-placeholder">
            <p>Upload your 'Day 1' photo to get started.</p>
          </div>
        ) : photos.length > 0 && (photos.length < 2 || isInitialSetup) ? (
            // This is the view for when the first photo has been uploaded (during setup or otherwise)
            <img src={photos[photos.length - 1].url} alt={`Day ${photos[photos.length - 1].day}`} style={{...imageStyle, width: '100%', height: '100%'}} className="single-photo-preview" />
        ) : (
          // This is the comparison view, shown on the Progress tab when there are 2+ photos
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
        {/* Change button text based on context */}
        {photos.length === 0 && isInitialSetup ? 'Upload Day 1 Photo' : "Upload Today's Photo"}
      </button>
    </div>
  );
};

export default PhotoProgress;