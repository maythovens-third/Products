const app = require('./app.js');

app.listen(process.env.PORT || 3000, function () {
    console.log(`Leslie, the server is online at port ${process.env.PORT || 3000}.`);
});