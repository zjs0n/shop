const express = require('express');
const app = express();
const morgan = require('morgan')
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');
const mongoose = require('mongoose');
require("dotenv").config();
mongoose.connect(
    'mongodb+srv://admin:'+ 
    process.env.MONGO_ATLAS_PW + 
    '@cluster0.w4ukz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true    
    });

app.use(morgan('dev'));
app.use(express.urlencoded());
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods',
         'PUT', 'POST', 'PATCH', 'DELETE', 'GET');
         return res.status(200).json({});
    }
    next()
});
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});
module.exports = app;