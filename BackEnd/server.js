require('dotenv').config()

const express = require('express')
const productRoutes = require('./routes/product.js');


const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/products',productRoutes) 


//listen for requests
app.listen(process.env.Port, () =>{
    console.log('Listening on port', process.env.Port)
})
