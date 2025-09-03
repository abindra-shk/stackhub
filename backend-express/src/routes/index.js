const express = require("express");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");

const router = express.Router();

// Welcome route
router.get("/", (req, res) =>
  res.send({ message: "Welcome to Stackhub Express 🚀" }),
);

// Auth routes
router.use("/auth", authRoutes);

// User routes
router.use("/users", userRoutes);

module.exports = router;
