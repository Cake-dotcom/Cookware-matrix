const mongoose = require("mongoose");
const Cookware = require("../models/Cookware");
const connectDB = require("../config/db");

connectDB();

const seedItems = [
  {
    title: "Prestige Cooker",
    brand: "Prestige",
    category: "Pressure Cooker",
    releaseYear: 2023,
    material: "Stainless Steel",
    dimensions: "5L",
    weight: 2.5,
    heatCompatibility: "Gas, Electric",
    durability: "High",
    efficiency: "A+",
    price: 3500,
    rating: 4.5,
    image: "https://example.com/prestige.jpg",
    sourceUrl: "https://example.com/shop/prestige"
  },
  {
    title: "Pigeon Cooker",
    brand: "Pigeon",
    category: "Pressure Cooker",
    releaseYear: 2022,
    material: "Aluminum",
    dimensions: "5L",
    weight: 2.2,
    heatCompatibility: "Gas, Induction",
    durability: "Medium",
    efficiency: "A",
    price: 2800,
    rating: 4.2,
    image: "https://example.com/pigeon.jpg",
    sourceUrl: "https://example.com/shop/pigeon"
  }
];

(async () => {
  await Cookware.deleteMany();
  await Cookware.insertMany(seedItems);
  console.log("🌱 Data Seeded Successfully!");
  mongoose.connection.close();
})();
