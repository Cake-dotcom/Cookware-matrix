// Import required packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// 1️⃣ Connect to MongoDB with deployment-friendly URL
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/cookwareDB")
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

/* -------------------------
     Mongoose Schema + Model
---------------------------*/
// 2️⃣ Updated schema with new fields
const cookwareSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brand: String,
  category: String,
  releaseYear: Number,   // NEW - for "Release Date" field
  material: String,
  dimensions: String,
  weight: Number,
  heatCompatibility: String,
  durability: String,
  efficiency: String,    // NEW - for "Energy Efficiency" field
  specialFeatures: String,
  price: Number,
  rating: Number,
  image: String,
  sourceUrl: String
});

const Cookware = mongoose.model("Cookware", cookwareSchema);

/* -------------------------
            ROUTES
---------------------------*/

// Root test route
app.get("/", (req, res) => {
  res.send("Welcome to the Cookware Matrix API!");
});

// Get all cookware
app.get("/api/cookware", async (req, res) => {
  try {
    const allCookware = await Cookware.find();
    res.json(allCookware);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single cookware by ID
app.get("/api/cookware/:id", async (req, res) => {
  try {
    const item = await Cookware.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Cookware not found" });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4️⃣ Compare two cookware items with sorting
app.get("/api/cookware/compare", async (req, res) => {
  try {
    const { brand1, brand2, category } = req.query;

    if (!brand1 || !brand2 || !category) {
      return res.status(400).json({
        message: "brand1, brand2, and category are required query parameters",
      });
    }

    const results = await Cookware.find({
      category,
      brand: { $in: [brand1, brand2] },
    }).sort({ brand: 1 });

    if (results.length < 2) {
      return res
        .status(404)
        .json({ message: "Not enough products found for comparison" });
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 5️⃣ Search cookware by title
app.get("/api/cookware/search", async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: "Search query 'q' is required" });
    }
    
    const results = await Cookware.find({
      title: { $regex: q, $options: "i" }
    });
    
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3️⃣ Seed sample database with updated data
app.post("/api/cookware/seed", async (req, res) => {
  try {
    const sampleData = [
      {
        title: "Prestige Cooker",
        brand: "Prestige",
        category: "Pressure Cooker",
        price: 1500,
        releaseYear: 2023,
        efficiency: "A+",
        material: "Stainless Steel",
        dimensions: "5 Litre",
        weight: 2.5,
        heatCompatibility: "Gas, Electric",
        durability: "High",
        specialFeatures: "Ergonomic Handle",
        rating: 4.5,
        image: "https://via.placeholder.com/150",
        sourceUrl: "https://example.com/prestige",
      },
      {
        title: "Pigeon Cooker",
        brand: "Pigeon",
        category: "Pressure Cooker",
        price: 1200,
        releaseYear: 2022,
        efficiency: "A",
        material: "Aluminium",
        dimensions: "5 Litre",
        weight: 2.2,
        heatCompatibility: "Gas, Induction",
        durability: "Medium",
        specialFeatures: "Safety Valve",
        rating: 4.2,
        image: "https://via.placeholder.com/150",
        sourceUrl: "https://example.com/pigeon",
      },
    ];

    await Cookware.deleteMany(); // makes reseeding easy
    await Cookware.insertMany(sampleData);

    res.status(201).json({ message: "Sample data seeded successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});