const controllers = require('./controllers/controllers.js')
const router = require('express').Router();

router.get('/products/:product_id/styles', controllers.getProductStyles);

router.get('/products/:product_id/related', controllers.getRelatedProducts);

router.get('/products/:page&:amount', controllers.getCustomAmount);

router.get('/products/:product_id', controllers.getSpecificProduct);

router.get('/products', controllers.getDefaultAmount);

module.exports = router;