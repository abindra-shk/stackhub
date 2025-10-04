const express = require("express");
const routes = require("./routes");
const swaggerDocs = require("./swagger");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./config/logger");
const { generalLimiter, securityHeaders, cors } = require("./middleware/security");

const app = express();

// 🛡️ Security middleware (should be early in the chain)
app.use(securityHeaders);
app.use(cors);

// 🚦 Rate limiting
app.use(generalLimiter);

// ✅ Parse JSON bodies (with size limit for security)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 📝 Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  next();
});

// Connect database
connectDB();

// 🏠 Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'StackHub API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Routes
app.use("/api", routes);

// Swagger
swaggerDocs(app);

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`
  });
});

// 🛡️ Global Error Handler (must be last middleware)
app.use(errorHandler);

module.exports = app;
