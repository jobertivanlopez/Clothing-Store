const Product = require('../model/clothingModels');  // Import Product model

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

// Update a product
const updateProduct = async (req, res) => {
    const { productId } = req.params;  // Assuming you're using product ID in the URL
    const { ProductName, UnitInvestment, UnitPrice, QuantityinHand, QuantityinSold, TotalInvestment, TotalSale, ProfitStatus } = req.body;

    try {
        // Find the product by ID and update it
        const product = await Product.findByIdAndUpdate(productId, {
            ProductName,
            UnitInvestment,
            UnitPrice,
            QuantityinHand,
            QuantityinSold,
            TotalInvestment,
            TotalSale,
            ProfitStatus
        }, { new: true });

        // If product not found
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Return the updated product
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Export the functions to be used in routes
module.exports = {
    createProduct,
    updateProduct
};
