const mongoose = require('mongoose');

const connectDb = () => {
    mongoose.connect(process.env.MONGODB_URL);
    const myDb = mongoose.connection;
    myDb.on('error', console.error.bind(console, 'Database connection error!'))
    myDb.once('open', () => {
        console.log('Connection to db successfully opened!');
    })
}

module.exports = connectDb;