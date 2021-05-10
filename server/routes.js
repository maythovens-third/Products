const controllers = require('./middleware/controllers/controllers.js')
var router = require('express').Router();

router.get('/products', controllers.getDefaultAmount);

router.get('/products/:page/:amount', controllers.getCustomAmount);

router.get('/products/:product_id', controllers.getSpecificProduct);

router.get('/products/:product_id/styles', controllers.getProductStyles);

module.exports = router;