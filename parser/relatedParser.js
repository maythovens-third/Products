const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');

const { Client } = require('pg');
const connectionString = 'postgres://lesliengo:postgres@localhost:5432/products';
const client = new Client({
    connectionString: connectionString
});
client.connect();

const relatedDataPath = path.join(__dirname, '..', 'csv', 'testCSV', 'relatedTestBreak.csv');

let stream = fs.createReadStream(relatedDataPath);
let csvData = [];
let csvStream = fastcsv
  .parse({ headers: true })
  .on("data", function(row) {
    if ((row.length === 3) && (!row.includes('0')) && (!row.includes(''))) {
      const toInt = [];
      row.forEach((field) => {
        toInt.push(parseInt(field));
      })
      csvData.push(toInt);
    }
  })
  .on("end", function() {
    csvData.shift();
    csvData.forEach((row) => {
      const query = {
        text: 'INSERT INTO related_join(id, productId, relatedId) VALUES($1, $2, $3)',
        values: [row[0], row[1], row[2]],
      }
      client
        .query(query)
        .then(result => console.log(result))
        .catch(e => console.error(e.stack))
    })

  });


stream.pipe(csvStream);
