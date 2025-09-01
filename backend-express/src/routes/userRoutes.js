const express = require("express");
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController");
const router = express.Router();

/**
 * @summary Get all users
 * @tags Users
 */
router.get("/", getUsers);

/**
 * @summary Get user by ID
 * @tags Users
 */
router.get("/:id", getUserById);

/**
 * @summary Create new user
 * @tags Users
 */
router.post("/", createUser);

/**
 * @summary Update user by ID
 * @tags Users
 */
router.put("/:id", updateUser);

/**
 * @summary Delete user by ID
 * @tags Users
 */
router.delete("/:id", deleteUser);

module.exports = router;
