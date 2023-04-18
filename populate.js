
const { connectDB } = require('./db/connect');
require('dotenv').config();

const { Product } = require('./models/products');

const jsonProducts = require('./products.json');


const populate = async()=> {
    try {
        await connectDB(process.env.MONGODB_STR);
        await Product.deleteMany();
        await Product.create(jsonProducts);
        console.log('added successfully ...');
        process.exit(0);
    } catch (error) {
        console.log(error.message);
    }

}


populate();