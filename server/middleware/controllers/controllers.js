const models = require('../../models/models.js');

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

  Promise.all([productPromise, featuresPromise]).then((values) => {
    const product = values[0].rows;
    const features = values[1].rows;

    product[0].features = [];

    for (let i=0; i<features.length; i++) {
      product[0].features.push({feature: features[i].featurename, value: features[i].featurevalue});
    }

    return product[0];
  })
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

  Promise.all([stylesPromise, photosPromise, skusPromise]).then((values) => {
    const styles = values[0].rows;
    const photos = values[1].rows;
    const skus = values[2].rows;

    for (let i=0; i<styles.length; i++) {
      styles[i].photos = [];
      styles[i].skus = {};
      photos.forEach((photo) => {
        if(photo.styleid === styles[i].styleid) {
          styles[i].photos.push({url: photo.url, thumbnail_url: photo.thumbnail_url});
        }
      })
      skus.forEach((sku) => {
        if(sku.styleid === styles[i].styleid) {
          styles[i].skus[sku.id] = {size: sku.size, quantity: sku.quantity};
        }
      })
    }
    return styles;
  })
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

