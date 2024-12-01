const Sale = require('../model/saleModel');

// Get all sales
const getAllSales = async (req, res) => {
    try {
        const sales = await Sale.find();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new sale
const createSale = async (req, res) => {
    const sale = new Sale(req.body);
    try {
        const newSale = await sale.save();
        res.status(201).json(newSale);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllSales,
    createSale
}