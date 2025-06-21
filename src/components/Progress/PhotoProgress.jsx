// src/components/Progress/PhotoProgress.jsx

import React, { useContext, useRef } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { Camera, Image as ImageIcon } from 'lucide-react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

const PhotoProgress = () => {
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

  // THE FIX: Define a style object to make sure the image is contained, not cropped.
  const imageStyle = {
    objectFit: 'contain',
    backgroundColor: 'var(--bg-primary)' // Match the background
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
        {photos.length < 2 ? (
          <div className="photo-placeholder">
            <p>Upload at least two photos to see your comparison.</p>
            {firstPhoto && <img src={firstPhoto.url} alt={`Day ${firstPhoto.day}`} className="single-photo-preview" />}
          </div>
        ) : (
          <ReactCompareSlider
            // Apply the style to both images in the slider
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
        Upload Today's Photo
      </button>
    </div>
  );
};

export default PhotoProgress;