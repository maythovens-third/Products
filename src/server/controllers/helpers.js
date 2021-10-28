function productStylesDataShaper(values) {
  const styles = values[0].rows;
  const photos = values[1].rows;
  const skus = values[2].rows;

  for (let i = 0; i < styles.length; i++) {
    styles[i].photos = [];
    styles[i].skus = {};
    photos.forEach((photo) => {
      if(photo.styleid === styles[i].styleid) {
        styles[i].photos.push({url: photo.url, thumbnail_url: photo.thumbnail_url});
      }
    });
    skus.forEach((sku) => {
      if(sku.styleid === styles[i].styleid) {
        styles[i].skus[sku.id] = {size: sku.size, quantity: sku.quantity};
      }
    });
  };

  return styles;
};

function specificProductDataShaper(values) {
  const product = values[0].rows;
  const features = values[1].rows;

  product[0].features = [];

  for (let i = 0; i < features.length; i++) {
    product[0].features.push({feature: features[i].featurename, value: features[i].featurevalue});
  };

  return product[0];
};

function validateParameters() {
  let args = Array.from(arguments);
  return args.every(arg => {
    return parseInt(arg) && parseInt(arg) >= 1;
  });
};

module.exports = {
  productStylesDataShaper,
  specificProductDataShaper,
  validateParameters,
};