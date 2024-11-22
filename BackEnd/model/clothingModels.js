// models/clothingModel.js
const mongoose = require('mongoose');

// Create a schema for product items
const clothingSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        required: true,
    },

    UnitInvestment: {
        type: Number,
        required: true,
    },

    UnitPrice: {
        type: Number,
        required: true,
    },

    QuantityinHand: {
        type: Number,
        required: true, 
    },

    QuantityinSold: {
        type: Number,
        required: true, 
    },

    TotalInvestment: {
        type: Number,
        required: true, 
    },

    TotalSale: {
        type: Number,
        required: true, 
    },

    ProfitStatus: {
        type: Number,
        required: true, 
    },

    
}, { timestamps: true });  // Timestamps will add 'createdAt' and 'updatedAt' automatically

// Create the Product model based on the schema
const clothing = mongoose.model('clothing', clothingSchema);

module.exports = Clothing;