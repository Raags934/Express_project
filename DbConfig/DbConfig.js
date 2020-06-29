"use strict"
const db = "Raags";
const host = "localhost";
const port = 27017;

const uri = `mongodb://${host}:${port}/${db}`;


console.log("check the uri of mongo db",uri)

module.exports = uri;

