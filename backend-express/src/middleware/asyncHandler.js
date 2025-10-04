/**
 * 🔄 ASYNC HANDLER WRAPPER
 * 
 * This utility wraps async functions to automatically catch errors and pass them to Express error handler.
 * Instead of writing try-catch in every controller, we use this wrapper!
 * 
 * Usage: asyncHandler(async (req, res, next) => { ... })
 */

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
