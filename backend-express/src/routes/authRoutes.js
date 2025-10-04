const express = require("express");
const { register, login } = require("../controllers/authController");
const { registerValidation, loginValidation } = require("../middleware/validation");
const { authLimiter } = require("../middleware/security");
const router = express.Router();

// Apply strict rate limiting to all auth routes
router.use(authLimiter);

/**
 * POST /api/auth/register
 * @summary Register a new user
 * @tags Auth
 * @param {object} request.body.required - User info
 * @property {string} request.body.name.required - User's name - example: John Doe
 * @property {string} request.body.email.required - User's email - example: john@example.com
 * @property {string} request.body.password.required - User's password - example: mypassword123
 * @return {object} 201 - created user
 */
router.post("/register", registerValidation, register);

/**
 * POST /api/auth/login
 * @summary Login and get JWT
 * @tags Auth
 * @param {object} request.body.required - Login info
 * @property {string} request.body.email.required - User's email - example: john@example.com
 * @property {string} request.body.password.required - User's password - example: mypassword123
 * @return {object} 200 - { token, user }
 */
router.post("/login", loginValidation, login);

module.exports = router;
