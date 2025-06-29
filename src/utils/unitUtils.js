// src/utils/unitUtils.js

export const lbsToKg = (lbs) => lbs * 0.453592;
export const kgToLbs = (kg) => kg / 0.453592;

export const getUnitLabel = (unitSystem) => unitSystem === 'metric' ? 'kg' : 'lbs';

export const calculateAndRoundTargetWeight = (oneRepMaxLbs, percentage, unitSystem) => {
  const targetLbs = oneRepMaxLbs * percentage;
  if (unitSystem === 'metric') {
    const targetKg = lbsToKg(targetLbs);
    // Round to the nearest 2.5 for metric plates
    return Math.round(targetKg / 2.5) * 2.5;
  }
  // Round to the nearest 5 for imperial plates
  return Math.round(targetLbs / 5) * 5;
};

/**
 * Formats a large number into a compact, abbreviated string (e.g., 12.3K, 1.5M).
 * @param {number} num The number to format.
 * @returns {string} The formatted number string.
 */
export const formatLargeNumber = (num) => {
  if (num === null || num === undefined) return '0';

  const absNum = Math.abs(num);

  if (absNum >= 1.0e+9) { // Billions
    return (num / 1.0e+9).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (absNum >= 1.0e+6) { // Millions
    return (num / 1.0e+6).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (absNum >= 1.0e+3) { // Thousands
    return (num / 1.0e+3).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  
  // Return number with commas for values under 1000
  return Math.round(num).toLocaleString('en-US');
};