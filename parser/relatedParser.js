const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');

const { Client } = require('pg');
const connectionString = 'postgres://lesliengo:postgres@localhost:5432/testproducts';
const client = new Client({
    connectionString: connectionString
});
client.connect();

// CSV too large, had to chunk from terminal:
const relatedDataPath1 = path.join(__dirname, '..', 'csv','relatedChunks', 'xaa.csv');
const relatedDataPath2 = path.join(__dirname, '..', 'csv','relatedChunks', 'xab.csv');
const relatedDataPath3 = path.join(__dirname, '..', 'csv','relatedChunks', 'xac.csv');
const relatedDataPath4 = path.join(__dirname, '..', 'csv','relatedChunks', 'xad.csv');
const relatedDataPath5 = path.join(__dirname, '..', 'csv','relatedChunks', 'xae.csv');

let stream = fs.createReadStream(relatedDataPath1); // switch chunks here.
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

const q = `EXPLAIN ANALYZE INSERT INTO related_join(id, productId, relatedId) VALUES(${product[0]}, ${product[1]}, ${product[2]}) ON CONFLICT ON CONSTRAINT related_join_pkey DO NOTHING`;

      client.query(q, product)
        .then(count++)
        .then(result => console.log(result))
        .catch(e => console.error(e.stack));

    }
    if (count % 100 === 0)
      {console.log(count);}

  })
  .on("end", function() {});

  stream.pipe(csvStream);
