const express = require('express');
const router = express.Router();

const { createProduct } = require('../controller/clothingController')

// POST route to add a new product
router.route('/new').post(createProduct)

//POST route to update a new product
router.patch('/:id', (req, res) => {
    const productId = req.params.id;  
    res.json({ message: `UPDATE product with ID ${productId}` });
});


module.exports = router;
