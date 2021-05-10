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

getProductStyles = (productId, cb) => {
  const q = 'SELECT * from product_styles, photos, skus WHERE product_styles.styleid = photos.styleid AND product_styles.styleid = skus.styleid AND productId = $1';
  client.query(q, [productId], (err, result) => {
    if(err) cb(err);
    cb(null, result);
  })
};

module.exports = {
  getDefaultAmount,
  getCustomAmount,
  getSpecificProduct,
  getProductStyles,
};