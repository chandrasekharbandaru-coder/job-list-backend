const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const contestRoutes = require("./Routes/contest.routes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/contests", contestRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("API is running");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
