// src/utils/idUtils.js

// A simple but effective function to generate unique IDs.
export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};