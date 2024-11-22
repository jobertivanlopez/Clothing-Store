require('dotenv').config();

const express = require('express');
const productRoutes = require('./routes/product');  
const clothingRoutes = require('./routes/clothing');  

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Middleware for logging request paths and methods
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Use routers for specific routes
app.use('/api/products', productRoutes);  
app.use('/api/clothings', clothingRoutes);  

// Listen for incoming requests
app.listen(process.env.Port, () => {
    console.log('Listening on port', process.env.Port);
});
