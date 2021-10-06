const { Client } = require('pg');

const client = new Client({
  user: (process.env.DB_USERNAME || 'postgres'),
  host: process.env.HOST,
  database: 'products',
  password: (process.env.DB_PASSWORD || '1234'),
  port: 5432,
})

client
  .connect()
  .then(() => console.log('PG: Client connected.'))
  .catch(err => console.error('PG: connection error', err.stack));

module.exports = { client };
