// src/components/Dashboard/ProgressRing.jsx

import React from 'react';

const ProgressRing = ({ percentage, size = 120 }) => {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const ringStyle = {
    transition: 'stroke-dashoffset 0.8s ease-out',
    transform: 'rotate(-90deg)',
    transformOrigin: '50% 50%',
  };

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg
        width={size}
        height={size}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {/* Background Circle */}
        <circle
          stroke="var(--bg-tertiary)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress Circle */}
        <circle
          stroke="url(#progressGradient)"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={ringStyle}
        />
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-primary)',
        }}
      >
        <span style={{ fontSize: size * 0.25, fontWeight: 'bold' }}>
          {`${Math.round(percentage)}%`}
        </span>
        <span style={{ fontSize: size * 0.1, color: 'var(--text-tertiary)' }}>
          Done
        </span>
      </div>
    </div>
  );
};

export default ProgressRing;