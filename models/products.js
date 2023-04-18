const { Schema, model} = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "should provide the 'name'"]
    }, 
    price: {
        type: Number,
        required: [true, "should provide the 'price'"]
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message:  '{VALUE} is not supported'
        }
    }
});

const Product = model('Product', productSchema);

module.exports = {
    Product
}