const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
    productCode: { type: String, required: true },
    productName: { type: String, required: true },
    stock: { type: Number, required: true },
    qtySold: { type: Number, required: true },
    qtyLeft: { type: Number, required: true },
    investment: { type: Number, required: true },
    sale: { type: Number, required: true },
    totalSale: { type: Number, required: true },
});

module.exports = mongoose.model('Sale', SaleSchema);
