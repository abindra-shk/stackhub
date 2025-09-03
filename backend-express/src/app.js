const express = require("express");
const routes = require("./routes");
const swaggerDocs = require("./swagger");
const connectDB = require("./config/db");

const app = express();

// ✅ Parse JSON bodies
app.use(express.json());

// Connect database
connectDB();

// Routes
app.use("/api", routes);

// Swagger
swaggerDocs(app);

module.exports = app;
