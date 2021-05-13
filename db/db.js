const { Client } = require('pg');
// const connectionString = 'postgres://ln:postgres@localhost:5432/products';
// const client = new Client({
//     connectionString: connectionString
// });

const client = new Client({
    user: 'ubuntu',
    host: '18.144.174.135',
    database: 'products',
    password: 'ubuntu',
    port: 5432,
  })
client.connect();

module.exports = { client };