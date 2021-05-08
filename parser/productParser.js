const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');

const { Client } = require('pg');
const connectionString = 'postgres://lesliengo:postgres@localhost:5432/testproducts';
const client = new Client({
    connectionString: connectionString
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
  .parse() //{ headers: true }
  .on("data", function(row) {
    const product = [
      parseInt(row[0]),
      row[1],
      row[2] || 'no slogan',
      row[3] || 'no description',
      priceParse(row[5])
    ]
    const [ id, name, slogan, description, default_price ] = product;
    // console.log(typeof id, typeof name, typeof slogan, typeof description, typeof default_price);
    if (id && name && default_price) {
      const q = `INSERT INTO products(productid, name, slogan, description, defaultprice) VALUES($1, $2, $3, $4, $5) ON CONFLICT ON CONSTRAINT products_pkey DO NOTHING`;
      client.query(q, product, (err) => {
          if (err) {
              throw err
          }
          // console.log(product);
      })
      count++;
    }
    console.log(count);
  })
  .on("end", function() {
  });


stream.pipe(csvStream);


  // .on("end", function() {
  //   csvData.forEach((row) => {
  //     const query = {
  //       text: 'INSERT INTO products(productId, name, slogan, description, defaultPrice) VALUES($1, $2, $3, $4, $5)',
  //       values: [row[0], row[1], row[2], row[3], row[4]],
  //     }
  //     client
  //       .query(query)
  //       .then(result => console.log(result))
  //       .catch(e => console.error(e.stack))
  //   })
  // });

      //   console.log(csvData);
      // const query = 'INSERT INTO products (productId, name, slogan, description, defaultPrice) VALUES ?'

      // client.query(query, [csvData], (err, res) => {
      //   if (err) throw err
      //   console.log(res)
      // })
