const { Client } = require('pg');
const connectionString = 'postgres://lesliengo:postgres@localhost:5432/products';
const client = new Client({
    connectionString: connectionString
});
client.connect();

module.exports = { client };