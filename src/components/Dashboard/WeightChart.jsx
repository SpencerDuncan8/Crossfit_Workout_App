// src/components/Dashboard/WeightChart.jsx

import React, { useContext } from 'react';
// CORRECTED IMPORT: Removed Defs and LinearGradient from this line
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AppStateContext } from '../../context/AppContext.jsx';

// Custom Tooltip for a better look
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{`Day ${label}`}</p>
        <p className="tooltip-intro">{`Weight: ${payload[0].value.toFixed(1)} lbs`}</p>
      </div>
    );
  }
  return null;
};

const WeightChart = () => {
  const { appState } = useContext(AppStateContext);
  const data = appState.weightHistory;

  const gridColor = 'var(--border-color)';
  const textColor = 'var(--text-tertiary)';

  return (
    <div className="chart-container">
      <h3 className="chart-title">Weight Progress</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: -10,
            bottom: 5,
          }}
        >
          {/* This JSX is correct, even without the explicit import */}
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
            label={{ value: 'Day', position: 'insideBottom', offset: -5, fill: textColor, fontSize: 12 }}
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