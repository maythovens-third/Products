const express = require('express');
var app = express();
var router = require('./routes.js');
app.set('port', process.env.PORT || 3000);

app.use('/', router);

app.listen(3000, function () {
    console.log('Leslie, the server is online at port 3000.');
});