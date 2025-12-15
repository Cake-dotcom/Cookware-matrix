// ===============================
// IMPORTS & SETUP
// ===============================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express(); // ✅ MUST COME FIRST
const PORT = process.env.PORT || 5000;

// ===============================
// MIDDLEWARE
// ===============================
app.use(express.json());
app.use(cors());

// ===============================
// DATABASE CONNECTION
// ===============================
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/cookwareDB")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// ===============================
// ROUTES
// ===============================
app.get("/", (req, res) => {
  res.send("🔥 Cookware Matrix API is running");
});

// ✅ AUTH ROUTES (NOW CORRECT)
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Cookware routes
const cookwareRoutes = require("./routes/cookwareRoutes");
app.use("/api/cookware", cookwareRoutes);

// ===============================
// START SERVER
// ===============================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
