var express = require('express');
var app = express();

const userrouter = require('./Routes/user');
const supplierrouters = require('./Routes/supplier');
const {ServerSuccess} = require('./Config/responseMessage')


app.use(userrouter);
app.use(supplierrouters);


var db = require('./DbConfig/Connection');// ADD THESE TWO LINES

var port = process.env.PORT || 3000;
app.listen(port, function() {
      console.log(`${ServerSuccess} ${port}`);
    });

module.exports = app;   