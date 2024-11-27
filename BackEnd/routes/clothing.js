const express = require('express');
const router = express.Router();

const { createProduct,getProduct,updateProduct } = require('../controller/clothingController')

// POST route to add a new product
router.route('/new').post(createProduct)

// GET route to get the new product
router.route('/id/:id').get(getProduct); 

// PATCH route to update a product
router.route('/id/:productId').patch(updateProduct);


module.exports = router;