// src/components/Dashboard/MetricCard.jsx

import React, { useState, useEffect, useRef } from 'react';

const MetricCard = ({ icon: Icon, title, value, unit, color, iconElement }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const cardRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const newDisplayValue = Math.min((progress / duration) * value, value);
      setDisplayValue(newDisplayValue);
      if (progress < duration) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };
    const observer = new IntersectionObserver( (entries) => { if (entries[0].isIntersecting) { start = null; animationRef.current = requestAnimationFrame(animate); observer.disconnect(); } }, { threshold: 0.5 } );
    if (cardRef.current) { observer.observe(cardRef.current); }
    return () => { cancelAnimationFrame(animationRef.current); if(observer && observer.disconnect) { observer.disconnect(); } };
  }, [value]);

  let start = null;
  const duration = 1500;

  // THE CHANGE IS HERE: Add number formatting
  const formattedValue = (val) => {
    if (val % 1 !== 0) return val.toFixed(1);
    return Math.round(val).toLocaleString('en-US');
  };

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
          {unit && <span className="metric-card-unit">{unit}</span>}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;