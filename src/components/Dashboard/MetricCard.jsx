// src/components/Dashboard/MetricCard.jsx

import React, { useState, useEffect, useRef } from 'react';

const MetricCard = ({ icon: Icon, title, value, unit, color, iconElement }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const cardRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    // Ensure value is a number for animation
    const numericValue = typeof value === 'number' ? value : 0;
    
    let start = null;
    const duration = 1500;
    
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const newDisplayValue = Math.min((progress / duration) * numericValue, numericValue);
      setDisplayValue(newDisplayValue);
      if (progress < duration) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(numericValue);
      }
    };
    const observer = new IntersectionObserver( (entries) => { if (entries[0].isIntersecting) { start = null; animationRef.current = requestAnimationFrame(animate); observer.disconnect(); } }, { threshold: 0.5 } );
    if (cardRef.current) { observer.observe(cardRef.current); }
    
    setDisplayValue(0); // Reset for re-animation if value changes

    return () => { 
        if(animationRef.current) cancelAnimationFrame(animationRef.current);
        if(observer && observer.disconnect) observer.disconnect(); 
    };
  }, [value]);

  const formattedValue = (val) => {
    // Special handling for weight cards when value is 0 or less
    if (val <= 0 && (title.toLowerCase() === "current weight")) {
        return '---';
    }
    
    // Always round the value and format it. This removes the decimal.
    return Math.round(val).toLocaleString('en-US');
  };

  const showUnit = unit && ( (title.toLowerCase().includes("weight") && displayValue > 0) || !title.toLowerCase().includes("weight") );

  return (
    <div className="metric-card" ref={cardRef}>
      <div className="metric-card-icon" style={{ backgroundColor: color, boxShadow: `0 4px 14px 0 ${color}55` }}>
        {Icon && <Icon size={24} color="#ffffff" />}
        {iconElement && iconElement}
      </div>
      <div className="metric-card-content">
        <div className="metric-card-title">{title}</div>
        <div className="metric-card-value">
          {formattedValue(displayValue)}
          {showUnit && <span className="metric-card-unit">{unit}</span>}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;