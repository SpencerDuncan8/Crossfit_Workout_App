// /utils/idUtils.js

// This function is identical to the one in src/utils, but it's a CommonJS module
// so our Node.js serverless functions can use it.
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

module.exports = { generateUniqueId };