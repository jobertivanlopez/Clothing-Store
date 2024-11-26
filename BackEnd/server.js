// Load environment variables first
const dotenv = require('dotenv');
dotenv.config({ path: './database/.env' });  // Make sure this points to the correct location of your .env file
const connectDatabase = require('./database/database');
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

// Use routers for specific routes
app.use('/api/products', productRoutes);  
app.use('/api/clothings', clothingRoutes);  

// Connect to the database
connectDatabase();

// Start the server
const server = app.listen(process.env.PORT, () => {
    console.log(`listening on Port: ${process.env.PORT}`);
});
