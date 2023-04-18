const mongoose = require('mongoose');

const connectDB = (mongoStr)=> {
    return mongoose.connect(mongoStr)
}


module.exports = {
    connectDB
}
