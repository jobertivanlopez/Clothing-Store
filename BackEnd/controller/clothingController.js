const Product = require('../model/clothingModels');  // Import Product model
const mongoose = require('mongoose');

// Create a new product item
const createProduct = async (req, res) => {
    const { ProductName, UnitInvestment, UnitPrice, QuantityinHand, QuantityinSold, TotalInvestment, TotalSale, ProfitStatus } = req.body;

    try {
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

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single product by ID
const getProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};
const updateProduct = async (req, res) => {
    const { productId } = req.params; // Get productId from URL parameter
    const { ProductName, UnitInvestment, UnitPrice, QuantityinHand, QuantityinSold, TotalInvestment, TotalSale, ProfitStatus } = req.body;

    console.log(`Updating product with ID: ${productId}`); // Debugging log

    try {
        // Check if the productId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            console.log(`Invalid Product ID format: ${productId}`); // Log invalid productId
            return res.status(400).json({ error: 'Invalid Product ID format' });
        }

        // Update the product
        const product = await Product.findByIdAndUpdate(
            productId,
            { ProductName, UnitInvestment, UnitPrice, QuantityinHand, QuantityinSold, TotalInvestment, TotalSale, ProfitStatus },
            { new: true } // Return the updated product
        );

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error updating product:', error); // Log the error
        res.status(500).json({ error: error.message });
    }
};



// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();  // Get all products from the database

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    getAllProducts
};
