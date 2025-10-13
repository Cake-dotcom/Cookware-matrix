// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware to handle JSON data and enable CORS for all requests
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/cookwareDB')
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Define the schema for a single cookware item
const cookwareSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brand: String,
  price: Number,
  material: String,
  dimensions: String,
  weight: Number,
  heatCompatibility: String,
  durability: String,
  specialFeatures: String,
});

// Create a model from the schema
const Cookware = mongoose.model('Cookware', cookwareSchema);

// ---- API Endpoints ----

// Endpoint for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Cookware Matrix API!');
});

// Endpoint to get all cookware items for the "Let's Get Started" page
app.get('/api/cookware', async (req, res) => {
  try {
    const allCookware = await Cookware.find();
    res.json(allCookware);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to get a single cookware item by its ID for the "Comparison" page
app.get('/api/cookware/:id', async (req, res) => {
  try {
    const item = await Cookware.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Cookware not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to add sample data to your database (run this once)
app.post('/api/cookware/seed', async (req, res) => {
  try {
    const sampleData = [
      {
        title: "Prestige Cooker",
        brand: "Prestige",
        price: 1500,
        material: "Stainless Steel",
        dimensions: "5 Litre",
        weight: 2.5, // Changed to a number
        heatCompatibility: "Gas, Electric",
        durability: "High",
        specialFeatures: "Ergonomic Handle"
      },
      {
        title: "Pigeon Cooker",
        brand: "Pigeon",
        price: 1200,
        material: "Aluminium",
        dimensions: "5 Litre",
        weight: 2.2, // Changed to a number
        heatCompatibility: "Gas, Induction",
        durability: "Medium",
        specialFeatures: "Safety Valve"
      }
    ];
    await Cookware.insertMany(sampleData);
    res.status(201).json({ message: 'Sample data seeded successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});