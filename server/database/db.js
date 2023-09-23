const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect("MONGODBINFO")

    mongoose.connection.on('open', () => {
        console.log('MongoDb connected');
    })

    mongoose.connection.on('error', (err) => {
        console.log('MongoDb Error', err);
    })

    mongoose.Promise = global.Promise;
}