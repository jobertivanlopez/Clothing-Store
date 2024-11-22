const express = require('express');
const router = express.Router();

// POST route to add a new product
router.post('/', (req, res) => {
    res.json({message: 'POST a new product',
        
     });


});

//POST route to update a new product
router.patch('/:id', (req, res) => {
    const productId = req.params.id;  
    res.json({ message: `UPDATE product with ID ${productId}` });
});


module.exports = router;
