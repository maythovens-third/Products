const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');

const { Client } = require('pg');
const connectionString = 'postgres://lesliengo:postgres@localhost:5432/testproducts';
const client = new Client({
    connectionString: connectionString
});
client.connect();

const relatedDataPath = path.join(__dirname, '..', 'csv', 'related.csv');

let stream = fs.createReadStream(relatedDataPath);
let count = 0;
let csvStream = fastcsv
  .parse()
  .on("data", function(row) {

    if ((row.length === 3) && (!row.includes('0')) && (!row.includes('')) && (!row.includes('id'))) {

      const product = [
        parseInt(row[0]),
        parseInt(row[1]),
        parseInt(row[2])
      ]

const q = 'INSERT INTO related_join(id, productId, relatedId) VALUES($1, $2, $3)';

      client.query(q, product)
        .catch(e => console.error(e.stack));

      count++;
    }
    console.log(count);
  })
  .on("end", function() {});


stream.pipe(csvStream);

// csvData.forEach((row) => {
//   const query = {
//     text: 'INSERT INTO related_join(id, productId, relatedId) VALUES($1, $2, $3)',
//     values: [row[0], row[1], row[2]],
//   }
//   client
//     .query(query)
//     .then(result => console.log(result))
//     .catch(e => console.error(e.stack))
// })
