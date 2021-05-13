const db = require('../../db/db.js');
const { client } = db;

getDefaultAmount = (cb) => {
    const q = 'SELECT * FROM products ORDER BY productId LIMIT 5';
    client.query(q, (err, result) => {
        if (err) cb(err);
        cb(null, result);
    });
};

getCustomAmount = (pageAndQty, cb) => {
  const q = 'SELECT * FROM products ORDER BY productId LIMIT $2 OFFSET $1';
  client.query(q, pageAndQty, (err, result) => {
    if (err) cb(err);
    cb(null, result);
  });

};

getSpecificProduct = (productId, cb) => {
  const q = 'SELECT * FROM products WHERE productId = $1';
  client.query(q, [productId], (err, result) => {
    if (err) cb(err);
    cb(null, result);
  })
};

getRelatedProducts = (productId, cb) => {
  const q = 'SELECT ARRAY (SELECT relatedId FROM related_join WHERE productId = $1)';
  client.query(q, [productId], (err, result) => {
    if (err) cb(err);
    cb(null, result);
  })
}

getProductStyles = (productId) => {
  const q = 'SELECT * FROM product_styles WHERE productId = $1';
  return client.query(q, [productId]);
};

getPhotos = (productId) => {
  const q = 'SELECT * FROM photos WHERE styleId IN (SELECT styleId FROM product_styles WHERE productId = $1)';
  return client.query(q, [productId]);
};

getSkus = (productId) => {
  const q = 'SELECT * FROM SKUs WHERE styleId IN (SELECT styleId FROM product_styles WHERE productId = $1)';
  return client.query(q, [productId]);
};


module.exports = {
  getDefaultAmount,
  getCustomAmount,
  getSpecificProduct,
  getRelatedProducts,
  getProductStyles,
  getPhotos,
  getSkus,
};