require('dotenv').config();

const { errorHandler } = require('./middlewares/errorHandler');
const { notFoundRoute } = require('./middlewares/notFound');
const { connectDB } = require('./db/connect');
require('express-async-errors');


const productRoutes = require('./routes/products')
const express = require('express');


const app = express();
const PORT = process.env.PORT || 3000;

let connection = null;

app.use(express.json());


// home

app.get('/', (req, res)=> {
    res.send('<h1>Store API</h1> <a href="/api/v1/store">store api link</a>')
})

// main routes
app.use('/api/v1/products', productRoutes);


// middlewares
app.use(notFoundRoute);
app.use(errorHandler);

const start = async()=> {
    try {
        connection = await connectDB(process.env.MONGODB_STR);
        app.listen(PORT, ()=> console.log(`server start at PORT[${PORT}]`));
    } catch (error) {
        console.log(error);
    }
}

start();