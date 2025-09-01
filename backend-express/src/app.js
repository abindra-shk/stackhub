const express = require("express");
const connectDB = require("./config/db");
const routes = require("./routes");
const swaggerDocs = require("./swagger");

const app = express();
app.use(express.json());
connectDB();
app.use("/api", routes);
swaggerDocs(app);

module.exports = app;
