const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const relatedDataPath = path.join(__dirname, '..', 'csv', 'testCSV', 'relatedTest.csv');

fs.createReadStream(relatedDataPath)
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => console.log(row))
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));