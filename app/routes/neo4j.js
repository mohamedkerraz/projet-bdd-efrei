const express = require('express');
const router = express.Router();
const Product = require('../models/neo4j/product');

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new product
router.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific product
router.get('/products/:name', async (req, res) => {
  try {
    const product = await Product.getByName(req.params.name);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a product
router.put('/products/:name', async (req, res) => {
  try {
    const product = await Product.update(req.params.name, req.body);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a product
router.delete('/products/:name', async (req, res) => {
  try {
    await Product.delete(req.params.name);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;