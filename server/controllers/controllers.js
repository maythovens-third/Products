const models = require('../../models/models.js');
const { productStylesDataShaper, specificProductDataShaper } = require('./helpers');

getDefaultAmount = (req, res) => {
  models.getDefaultAmount((err, result) => {
    if(err) res.status(400).send(err);
    res.status(200).send(result.rows);
  })
}

getCustomAmount = (req, res) => {
  const offset = (req.params.amount * (req.params.page - 1));
  const pageAndQty = [offset, req.params.amount];
  models.getCustomAmount(pageAndQty, (err, result) => {
    if(err) res.status(400).send(err);
    res.status(200).send(result.rows);
  })
}

getSpecificProduct = (req, res) => {
  const productId = req.params.product_id;

  const productPromise = models.getSpecificProduct(productId);
  const featuresPromise = models.getProductFeatures(productId);

  Promise.all([productPromise, featuresPromise])
  .then(specificProductDataShaper(data))
  .catch((err) => {res.status(400).send(err)})
  .then((product) => {res.status(200).send(product)});
}

getRelatedProducts = (req, res) => {
  const productId = req.params.product_id;
  models.getRelatedProducts(productId, (err, result) => {
    if(err) res.status(400).send(err);
    res.status(200).send(result.rows[0].array);
  })
}

getProductStyles = (req, res) => {
  const productId = req.params.product_id;

  const stylesPromise = models.getProductStyles(productId);
  const photosPromise = models.getPhotos(productId);
  const skusPromise = models.getSkus(productId);

  Promise.all([stylesPromise, photosPromise, skusPromise])
  .then(productStylesDataShaper(data))
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

