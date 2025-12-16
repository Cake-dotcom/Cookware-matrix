const express = require("express");
const router = express.Router();
const Comparison = require("../models/Comparison");

// SAVE COMPARISON
router.post("/", async (req, res) => {
  try {
    const { userId, product1, product2, category } = req.body;

    const comparison = await Comparison.create({
      user: userId,
      product1,
      product2,
      category
    });

    res.status(201).json(comparison);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
