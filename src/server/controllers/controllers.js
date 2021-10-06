const models = require('../models/models.js');
const { productStylesDataShaper, specificProductDataShaper, validateParameters } = require('./helpers');

getDefaultAmount = (req, res) => {
  models.getDefaultAmount((err, result) => {
    if(err) res.status(400).send(err);
    res.status(200).send(result.rows);
  })
}

getCustomAmount = (req, res) => {
  let { amount, page } = req.params;
  const offset = (amount * (page - 1));
  const pageAndQty = [offset, amount];

  if(!validateParameters(amount, page)) return res.status(400).send('Invalid parameters.');
  models.getCustomAmount(pageAndQty, (err, result) => {
    if(err) res.status(400).send(err);
    res.status(200).send(result.rows);
  })
}

getSpecificProduct = (req, res) => {
  const productId = req.params.product_id;
  if(!validateParameters(productId)) return res.status(400).send('Invalid parameter.');

  const productPromise = models.getSpecificProduct(productId);
  const featuresPromise = models.getProductFeatures(productId);

  Promise.all([productPromise, featuresPromise])
  .then((data) => specificProductDataShaper(data))
  .catch((err) => {res.status(400).send(err)})
  .then((product) => {res.status(200).send(product)});
}

getRelatedProducts = (req, res) => {
  const productId = req.params.product_id;
  if(!validateParameters(productId)) return res.status(400).send('Invalid parameter.');
  models.getRelatedProducts(productId, (err, products) => {
    if(err) res.status(400).send(err);
    res.status(200).send(products.rows);
  })
}

getProductStyles = (req, res) => {
  const productId = req.params.product_id;
  if(!validateParameters(productId)) return res.status(400).send('Invalid parameter.');
  const stylesPromise = models.getProductStyles(productId);
  const photosPromise = models.getPhotos(productId);
  const skusPromise = models.getSkus(productId);

  Promise.all([stylesPromise, photosPromise, skusPromise])
  .then(data => productStylesDataShaper(data))
  .catch((err) => {res.status(400).send(err)})
  .then((styles) => {res.status(200).send(styles)});
}

module.exports = {
  getDefaultAmount,
  getCustomAmount,
  getSpecificProduct,
  getRelatedProducts,
  getProductStyles,
};

