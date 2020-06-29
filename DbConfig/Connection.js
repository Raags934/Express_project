"use strict"
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Configuring the database
const dbConfig = require('./DbConfig');
const {MongodbConnectionMessage,MongodbErrorConnection,} = require('../Config/responseMessage');
// Connecting to the database
const db = mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(MongodbConnectionMessage);

}).catch(err => {
    console.log(`${MongodbErrorConnection} ${error}`);
    process.exit();
});

module.exports = db;