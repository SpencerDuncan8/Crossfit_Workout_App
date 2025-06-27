// src/utils/unitUtils.js

const LBS_TO_KG_FACTOR = 0.453592;
const KG_TO_LBS_FACTOR = 2.20462;

/**
 * Converts pounds to kilograms.
 * @param {number} lbs - The weight in pounds.
 * @returns {number} The weight in kilograms.
 */
export const lbsToKg = (lbs) => {
  if (typeof lbs !== 'number' || isNaN(lbs)) return 0;
  return lbs * LBS_TO_KG_FACTOR;
};

/**
 * Converts kilograms to pounds.
 * @param {number} kg - The weight in kilograms.
 * @returns {number} The weight in pounds.
 */
export const kgToLbs = (kg) => {
  if (typeof kg !== 'number' || isNaN(kg)) return 0;
  return kg * KG_TO_LBS_FACTOR;
};

/**
 * Returns the correct unit label ('lbs' or 'kg') based on the system.
 * @param {string} unitSystem - 'imperial' or 'metric'.
 * @returns {string} The unit label.
 */
export const getUnitLabel = (unitSystem) => {
  return unitSystem === 'metric' ? 'kg' : 'lbs';
};

/**
 * Rounds a weight value appropriately for its unit system.
 * @param {number} weight - The weight value.
 * @param {string} unitSystem - 'imperial' or 'metric'.
 * @returns {number} The rounded weight.
 */
export const roundWeight = (weight, unitSystem) => {
  if (unitSystem === 'metric') {
    // Round to the nearest 2.5 kg
    return Math.round(weight / 2.5) * 2.5;
  }
  // Round to the nearest 5 lbs for imperial
  return Math.round(weight / 5) * 5;
};

/**
 * Calculates the target weight from a 1RM percentage, converts if necessary, and rounds it.
 * @param {number} oneRepMaxLbs - The user's 1RM stored in pounds.
 * @param {number} percentage - The percentage to calculate (e.g., 0.85 for 85%).
 * @param {string} unitSystem - 'imperial' or 'metric'.
 * @returns {number} The final, rounded target weight for display.
 */
export const calculateAndRoundTargetWeight = (oneRepMaxLbs, percentage, unitSystem) => {
    if (oneRepMaxLbs <= 0 || percentage <= 0) return 0;
    
    const targetWeightLbs = oneRepMaxLbs * percentage;

    if (unitSystem === 'metric') {
        const targetWeightKg = lbsToKg(targetWeightLbs);
        return roundWeight(targetWeightKg, 'metric');
    }

    return roundWeight(targetWeightLbs, 'imperial');
};