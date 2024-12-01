const express = require('express');
const router = express.Router();
const { getAllSales, createSale } = require('../controller/saleController');

// Routes
router.get('/', getAllSales);
router.post('/', createSale);

module.exports = router;
