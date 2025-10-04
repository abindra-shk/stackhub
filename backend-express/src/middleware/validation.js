/**
 * 🔍 VALIDATION MIDDLEWARE
 * 
 * This middleware provides common validation functions for your API endpoints.
 * It helps ensure data integrity and provides clear error messages to clients.
 */

const validator = require('validator');

// Email validation
const validateEmail = (email) => {
  if (!email) return 'Email is required';
  if (!validator.isEmail(email)) return 'Please provide a valid email';
  return null;
};

// Password validation
const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
  }
  return null;
};

// Name validation
const validateName = (name) => {
  if (!name) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters';
  if (name.length > 50) return 'Name cannot exceed 50 characters';
  return null;
};

// Generic required field validation
const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} is required`;
  }
  return null;
};

// Validation middleware factory
const validate = (validationRules) => {
  return (req, res, next) => {
    const errors = [];

    validationRules.forEach(rule => {
      const { field, validator: validatorFn, message } = rule;
      const value = req.body[field];
      
      const error = validatorFn(value);
      if (error) {
        errors.push(message || error);
      }
    });

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors
      });
    }

    next();
  };
};

// Pre-built validation rules
const registerValidation = validate([
  { field: 'name', validator: validateName },
  { field: 'email', validator: validateEmail },
  { field: 'password', validator: validatePassword }
]);

const loginValidation = validate([
  { field: 'email', validator: validateEmail },
  { field: 'password', validator: (password) => validateRequired(password, 'Password') }
]);

module.exports = {
  validate,
  validateEmail,
  validatePassword,
  validateName,
  validateRequired,
  registerValidation,
  loginValidation
};
