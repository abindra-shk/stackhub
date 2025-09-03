const express = require("express");
const { getUsers, getUserById } = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * GET /api/users
 * @summary Get all users (protected)
 * @tags Users
 * @security BearerAuth
 */
router.get("/", auth, getUsers);

/**
 * GET /api/users/{id}
 * @summary Get user by ID (protected)
 * @tags Users
 * @security BearerAuth
 * @param {string} id.path.required - User ID
 */
router.get("/:id", auth, getUserById);

module.exports = router;
