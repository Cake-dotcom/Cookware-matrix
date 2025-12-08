const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb://localhost:27017/cookware-matrix');

const sampleProducts = [
  {
    name: "Prestige Omega Deluxe Non-Stick Frying Pan",
    brand: "Prestige",
    category: "Frying Pan",
    material: "Non-Stick",
    size: "12 inch",
    price: 1599,
    originalPrice: 2499,
    discount: 36,
    rating: 4.5,
    reviews: 3421,
    image: "🍳",
    features: ["Granite Coating", "Metal Spoon Friendly", "Gas & Induction"],
    description: "Premium non-stick frying pan with granite coating",
    inStock: true,
    badge: "Best Seller",
    tags: ["non-stick", "frying", "pan", "induction"]
  },
  {
    name: "Hawkins Futura Hard Anodised Pressure Cooker",
    brand: "Hawkins",
    category: "Pressure Cooker",
    material: "Hard Anodised",
    size: "3.5 Liter",
    capacity: 3.5,
    price: 2299,
    originalPrice: 3299,
    discount: 30,
    rating: 4.7,
    reviews: 8932,
    image: "🍲",
    features: ["Hard Anodised", "Stay Cool Handles", "Energy Efficient"],
    description: "Durable hard anodised pressure cooker",
    inStock: true,
    badge: "Top Rated",
    tags: ["pressure cooker", "hawkins", "family size"]
  },
  // Add more products...
];

async function seedDatabase() {
  try {
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();