const express = require('express');
const app = express();
const router = require('./routes.js');
// app.set('port', process.env.PORT || 3000);

app.use('/', router);

module.exports = app;