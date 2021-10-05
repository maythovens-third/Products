const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');

const { Client } = require('pg');
const DB_CONNECTION_STRING = 'postgres://lesliengo:postgres@localhost:5432/products';
const client = new Client({
    connectionString: DB_CONNECTION_STRING
});
client.connect();

const productTestDataPath = path.join(__dirname, '..', 'csv', 'testCSV', 'productTest.csv');
const productDataPath = path.join(__dirname, '..', 'csv', 'product.csv');

let stream = fs.createReadStream(productDataPath);
let count = 0;

const priceParse = value => {
  if (value === undefined) {
    return null;
  } else if (value[0] === '$') {
    return value.slice(1);
  } else {
    return parseInt(value);
  }
}

let csvStream = fastcsv
  .parse()
  .on("data", function(row) {
    const product = [
      parseInt(row[0]),
      row[1],
      row[2] || 'no slogan',
      row[3] || 'no description',
      row[4] || 'no category',
      priceParse(row[5])
    ]
    const [ id, name, slogan, description, category, default_price ] = product;
    if (id && name && default_price) {
      const q = `INSERT INTO products(productid, name, slogan, description, category, defaultprice) VALUES($1, $2, $3, $4, $5, $6) ON CONFLICT ON CONSTRAINT products_pkey DO NOTHING`;
      client.query(q, product, (err) => {
          if (err) {
              throw err
          }
      })
      count++;
    }
    console.log(count);
  })
  .on("end", function() {
  });


stream.pipe(csvStream);

