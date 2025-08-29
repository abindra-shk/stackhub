const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ message: "Welcome to Stackhub Express Backend 🚀" });
});

module.exports = router;
