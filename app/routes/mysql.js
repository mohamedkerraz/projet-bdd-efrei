const express = require('express');
const router = express.Router();
const Product = require('../models/mysql/product');

router.get('/products', async (req, res) => {
  try {
    const products = await Product.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ajoutez d'autres routes (GET /:id, PUT /:id, DELETE /:id) de la même manière

module.exports = router;