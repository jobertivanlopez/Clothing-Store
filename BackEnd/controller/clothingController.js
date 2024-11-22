// controllers/clothingController.js
const productRoutes = require('../routes/clothing');

// Create a new product item
const createProduct = async (req, res) => {
    const { id, name, stocks, month } = req.body;  

    try {
        const product = await Product.create({ ProductName, UnitInvestment,  UnitPrice,  QuantityinHand,  QuantityinSold,  TotalInvestment, TotalSale,  ProfitStatus});  
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a product 
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, stocks, month } = req.body;

    try {
        const clothing = await Product.findByIdAndUpdate({ ProductName, UnitInvestment,  UnitPrice,  QuantityinHand,  QuantityinSold,  TotalInvestment, TotalSale,  ProfitStatus }, { new: true });  
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
    createProduct,
    updateProduct
};
