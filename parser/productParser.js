const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');

const { Client } = require('pg');
const connectionString = 'postgres://lesliengo:postgres@localhost:5432/products';
const client = new Client({
    connectionString: connectionString
});
client.connect();

const productDataPath = path.join(__dirname, '..', 'csv', 'product.csv');
let count = 0;
let end = 0;
let stream = fs.createReadStream(productDataPath);
let csvData = [];
let csvStream = fastcsv
  .parse({ headers: true }) //
  .on("data", function(row) {
    const { id, name, slogan, description, default_price } = row;
    if (parseInt(id) && name && parseInt(default_price)) {
      const cleanRow = [];
      cleanRow.push(parseInt(id), name, slogan, description, parseInt(default_price))
      csvData.push(cleanRow);
      count++;
    }
  })
  .on("end", function() {
    csvData.forEach((row) => {
      const query = {
        text: 'INSERT INTO products(productId, name, slogan, description, defaultPrice) VALUES($1, $2, $3, $4, $5)',
        values: [row[0], row[1], row[2], row[3], row[4]],
      }
      end++;
      client
        .query(query)
        .then(result => console.log(count, end, result))
        .catch(e => console.error(e.stack))
    })
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

        // console.log(csvData);
      // const query = 'INSERT INTO products (productId, name, slogan, description, defaultPrice) VALUES ?'

      // client.query(query, [csvData], (err, res) => {
      //   if (err) throw err
      //   console.log(res)
      // })
