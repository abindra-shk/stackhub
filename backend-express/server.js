require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
const routes = require("./src/routes");
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
