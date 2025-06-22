// src/components/Dashboard/WeightChart.jsx

import React, { useContext } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AppStateContext } from '../../context/AppContext.jsx';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{`Entry ${label}`}</p>
        <p className="tooltip-intro">{`Weight: ${payload[0].value.toFixed(1)} lbs`}</p>
      </div>
    );
  }
  return null;
};

const WeightChart = () => {
  const { appState } = useContext(AppStateContext);
  
  // THE FIX: Create a 'day' number for the chart's x-axis from the history index
  const data = appState.weightHistory.map((entry, index) => ({
      ...entry,
      day: index + 1
  }));

  const gridColor = 'var(--border-color)';
  const textColor = 'var(--text-tertiary)';

  return (
    <div className="chart-container">
      <h3 className="chart-title">Weight Progress</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis 
            dataKey="day" 
            tick={{ fill: textColor, fontSize: 12 }} 
            tickLine={{ stroke: textColor }}
            axisLine={{ stroke: gridColor }}
            label={{ value: 'Entry', position: 'insideBottom', offset: -5, fill: textColor, fontSize: 12 }}
          />
          <YAxis 
            tick={{ fill: textColor, fontSize: 12 }}
            tickLine={{ stroke: textColor }}
            axisLine={{ stroke: gridColor }}
            domain={['dataMin - 2', 'dataMax + 2']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={2} fill="url(#colorWeight)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeightChart;