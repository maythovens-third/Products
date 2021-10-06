const express = require('express');
const app = express();
const router = require('./routes.js');

app.use('/', router);

module.exports = app;