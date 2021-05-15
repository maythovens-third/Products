const { Client } = require('pg');
// const connectionString = 'postgres://ln:postgres@localhost:5432/products';
// const client = new Client({
//     connectionString: connectionString
// });

const client = new Client({
    user: '',
    host: '',
    database: 'products',
    password: '',
    port: 5432,
  })
client.connect();

module.exports = { client };
