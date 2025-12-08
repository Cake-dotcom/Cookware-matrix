const express = require("express");
const router = express.Router();
const Cookware = require("../models/Cookware");


// @desc   Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Cookware.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc   Compare two cookware products
router.get("/compare", async (req, res) => {
  try {
    const { brand1, brand2, category } = req.query;

    if (!brand1 || !brand2 || !category) {
      return res.status(400).json({ error: "brand1, brand2 & category required" });
    }

    const result = await Cookware.find({
      brand: { $in: [brand1, brand2] },
      category
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// @desc   Create new cookware
router.post("/", async (req, res) => {
  try {
    const newProduct = await Cookware.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
