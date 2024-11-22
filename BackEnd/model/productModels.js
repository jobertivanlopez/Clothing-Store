// models/productModel.js
const mongoose = require('mongoose');

// Create a schema for product items
const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    stocks: {
        type: Number,
        required: true,
    },
    month: {
        type: String,
        required: true,
    }
}, { timestamps: true });  // Timestamps will add 'createdAt' and 'updatedAt' automatically

// Create the Clothing model based on the schema
const product = mongoose.model('product', productSchema);

module.exports = Product;