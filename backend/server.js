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
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));

// ===============================
// DATABASE CONNECTION
// ===============================
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/cookwareDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
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

// ✅ AUTH ROUTES
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// ✅ COOKWARE ROUTES
const cookwareRoutes = require("./routes/cookwareRoutes");
app.use("/api/cookware", cookwareRoutes);

// ✅ COMPARISON ROUTES
const comparisonRoutes = require("./routes/comparisonRoutes");
app.use("/api/comparisons", comparisonRoutes);

// ===============================
// ERROR HANDLING MIDDLEWARE
// ===============================
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// ===============================
// 404 HANDLER
// ===============================
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ===============================
// START SERVER
// ===============================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || "development"}`);
});