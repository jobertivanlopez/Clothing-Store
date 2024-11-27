const Product = require('../model/clothingModels');  // Import Product model
const mongoose = require('mongoose');

// Create a new product item
const createProduct = async (req, res) => {
    const { ProductName, UnitInvestment, UnitPrice, QuantityinHand, QuantityinSold, TotalInvestment, TotalSale, ProfitStatus } = req.body;

    try {
        // Create a new product
        const product = new Product({
            ProductName,
            UnitInvestment,
            UnitPrice,
            QuantityinHand,
            QuantityinSold,
            TotalInvestment,
            TotalSale,
            ProfitStatus
        });

        // Save the product to the database
        await product.save();

        // Respond with the created product
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// GET a Product
// Controller function to get a product by ID
const getProduct = async (req, res) => {
    try {
        // Retrieve the product ID from URL parameters
        const productId = req.params.id; // Assuming the product ID is passed in the URL
        
        // If no ID is provided, return a 400 error
        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        // Find the product by ID in the database
        const product = await Product.findById(productId);

        // If the product is not found, return a 404 error
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Return the product data in the response
        res.status(200).json({ product });
    } catch (error) {
        // Handle any errors and return a 500 status code
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};


const updateProduct = async (req, res) => {
    const { productId } = req.params;
    console.log('Received productId:', productId); // Log productId for debugging

    const { ProductName, UnitInvestment, UnitPrice, QuantityinHand, QuantityinSold, TotalInvestment, TotalSale, ProfitStatus } = req.body;

    try {
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            console.log('Invalid Product ID format:', productId);
            return res.status(400).json({ error: 'Invalid Product ID format' });
        }

        const product = await Product.findByIdAndUpdate(
            productId,
            { ProductName, UnitInvestment, UnitPrice, QuantityinHand, QuantityinSold, TotalInvestment, TotalSale, ProfitStatus },
            { new: true } // Return the updated product
        );

        if (!product) {
            console.log('Product not found for productId:', productId);
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).json({ error: error.message });
    }
};


// Export the functions to be used in routes
module.exports = {
    createProduct,
    updateProduct,
    getProduct
};