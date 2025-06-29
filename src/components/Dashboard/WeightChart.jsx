// src/components/Dashboard/WeightChart.jsx

import React, { useContext } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AppStateContext } from '../../context/AppContext.jsx';
import { lbsToKg, getUnitLabel } from '../../utils/unitUtils.js';

const WeightChart = () => {
  const { appState } = useContext(AppStateContext);
  const { weightHistory, unitSystem } = appState;

  const isMetric = unitSystem === 'metric';
  const unitLabel = getUnitLabel(unitSystem);

  // This custom tooltip component can now access the unitLabel from its parent scope.
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const fullDate = payload[0].payload.date;
      const weightValue = payload[0].value;
      const formattedWeight = Math.round(weightValue); // Round to whole number

      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`Date: ${fullDate}`}</p>
          <p className="tooltip-intro">{`Weight: ${formattedWeight} ${unitLabel}`}</p>
        </div>
      );
    }
    return null;
  };

  // Convert the data for the chart based on the selected unit system.
  const data = weightHistory.map((entry) => {
    const dateObj = new Date(entry.date);
    const shortDate = dateObj.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC'
    });
    
    // Convert weight for display
    const displayWeight = isMetric ? lbsToKg(entry.weight) : entry.weight;

    return {
      date: entry.date, // Keep original date for the tooltip
      displayWeight: displayWeight, // Use this converted value for the chart
      shortDate: shortDate
    };
  });

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
            dataKey="shortDate" 
            tick={{ fill: textColor, fontSize: 12 }} 
            tickLine={{ stroke: textColor }}
            axisLine={{ stroke: gridColor }}
            interval="preserveStartEnd"
          />
          <YAxis 
            tick={{ fill: textColor, fontSize: 12 }}
            tickLine={{ stroke: textColor }}
            axisLine={{ stroke: gridColor }}
            domain={['dataMin - 2', 'dataMax + 2']}
            tickFormatter={(tick) => Math.round(tick)} // Round Y-axis labels
          />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="displayWeight" stroke="#10b981" strokeWidth={2} fill="url(#colorWeight)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeightChart;