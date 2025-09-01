const express = require("express");
const userRoutes = require("./userRoutes");

const router = express.Router();
router.get("/", (req, res) => res.send({ message: "Welcome to Stackhub Express 🚀" }));
router.use("/users", userRoutes);

module.exports = router;
