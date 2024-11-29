const express = require('express');
const router = express.Router();

const { createProduct, getProduct, updateProduct, getAllProducts } = require('../controller/clothingController');

// POST route to add a new product
router.post('/new', createProduct);

// GET route to get a specific product by ID
router.get('/:id', getProduct);

// PATCH route to update a product by ID


// PATCH request for updating a product
router.patch('/:id/:productId', updateProduct);

// GET route to get all products
router.get('/', getAllProducts); // New route to get all products

module.exports = router;
