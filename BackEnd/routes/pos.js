const express = require('express');
const router = express.Router();
const productController = require('../controllers/posControllers');

// Get all products
router.get('/', productController.getAllProducts);

// Add a new product
router.post('/', productController.addProduct);

// Delete a product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
