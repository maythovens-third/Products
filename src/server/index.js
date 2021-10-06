const app = require('./app.js');

app.listen(process.env.PORT || 3000, function () {
    console.log(`ExpressJS: The server is online at port ${process.env.PORT || 3000}.`);
});