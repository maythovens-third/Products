const express = require('express');
const { Client } = require('pg');
const connectionString = 'postgres://lesliengo:postgres@localhost:5432/products';
const client = new Client({
    connectionString: connectionString
});
client.connect();
var app = express();
app.set('port', process.env.PORT || 3000);
app.get('/', function (req, res, next) {
    client.query('SELECT * FROM Employee where id = $1', [1], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });
});
app.listen(3000, function () {
    console.log('Server is running.. on Port 3000');
});