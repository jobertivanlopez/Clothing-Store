// controllers/productController.js
const productRoutes = require('../routes/product');

// Get all product items
const getProducts = async (req, res) => {
    try {
        const product = await Product.find().sort({ createdAt: -1 });  
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single [product] item by name
const getProduct = async (req, res) => {
    const { name } = req.params;  

    try {
        const product = await Product.findByName(name);  
        if (!clothing) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Create a new product item
const createProduct = async (req, res) => {
    const { id, name, stocks, month } = req.body;  

    try {
        const product = await Product.create({ id, name, stocks, month });  
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a product item by ID
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);  
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: '   Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a product item by ID
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, stocks, month } = req.body;

    try {
        const product = await Product.findByIdAndUpdate(id, { name, stocks, month }, { new: true });  
        if (!clothing) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Exporting the functions to be used in routes
module.exports = {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct
};