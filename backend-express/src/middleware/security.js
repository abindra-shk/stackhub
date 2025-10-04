/**
 * 🛡️ SECURITY MIDDLEWARE
 * 
 * This file contains various security middleware to protect your API from common attacks:
 * - Rate limiting to prevent brute force attacks
 * - CORS configuration for cross-origin requests
 * - Security headers
 */

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

// 🚦 Rate limiting configuration
const createRateLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      error: message
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// General API rate limit
const generalLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  100, // limit each IP to 100 requests per windowMs
  'Too many requests from this IP, please try again later.'
);

// Strict rate limit for auth endpoints
const authLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  5, // limit each IP to 5 requests per windowMs
  'Too many authentication attempts, please try again later.'
);

// 🌐 CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000', // React dev server
      'http://localhost:3001', // Alternative React port
      'http://127.0.0.1:3000',
      // Add your production frontend URL here
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 200
};

// 🔒 Security headers using Helmet
const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false, // Disable for API
});

module.exports = {
  generalLimiter,
  authLimiter,
  corsOptions,
  securityHeaders,
  cors: cors(corsOptions)
};
