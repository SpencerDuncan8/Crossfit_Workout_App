// src/components/Progress/PhotoProgress.jsx

import React, { useContext, useRef } from 'react';
import { AppStateContext } from '../../context/AppContext.jsx';
import { Camera, Image as ImageIcon } from 'lucide-react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

const PhotoProgress = () => { // Removed isInitialSetup as it's no longer needed
  const { appState, addPhotoEntry } = useContext(AppStateContext);
  
  const validPhotos = appState.photos.filter(p => p.url && p.url.startsWith('data:image'));
  
  const fileInputRef = useRef(null);

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

  const firstPhoto = validPhotos[0];
  const lastPhoto = validPhotos.length > 1 ? validPhotos[validPhotos.length - 1] : null;
  const imageStyle = { objectFit: 'contain', backgroundColor: 'var(--bg-primary)' };

  return (
    <div className="progress-card">
      <div className="progress-card-header">
        <div className="progress-card-icon" style={{ backgroundColor: '#8b5cf6' }}>
          <ImageIcon size={24} color="white" />
        </div>
        <h3 className="progress-card-title">Photo Progress</h3>
      </div>
      
      <div className="photo-progress-container">
        {validPhotos.length < 2 ? (
          <div className="photo-placeholder">
            {firstPhoto ? (
              <img src={firstPhoto.url} alt={`Photo from ${firstPhoto.date}`} className="single-photo-preview" />
            ) : (
              <p>Upload at least two photos to see your comparison.</p>
            )}
          </div>
        ) : (
          <ReactCompareSlider
            itemOne={<ReactCompareSliderImage src={firstPhoto.url} alt={`Photo from ${firstPhoto.date}`} style={imageStyle} />}
            itemTwo={<ReactCompareSliderImage src={lastPhoto.url} alt={`Photo from ${lastPhoto.date}`} style={imageStyle} />}
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