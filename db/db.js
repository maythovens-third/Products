const { Client } = require('pg');

const client = new Client({
    user: '',
    host: '',
    database: 'products',
    password: '',
    port: 5432,
  })
client.connect();

module.exports = { client };
