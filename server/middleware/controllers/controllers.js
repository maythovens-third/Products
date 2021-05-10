const models = require('../../models/models.js');

getDefaultAmount = (req, res) => {
  models.getDefaultAmount((err, result) => {
    if(err) res.status(400).send(err);
    res.status(200).send(result.rows);
  })
}

getCustomAmount = (req, res) => {
  const offset = (req.params.amount * (req.params.page - 1));
  console.log(offset);
  const pageAndQty = [offset, req.params.amount];
  models.getCustomAmount(pageAndQty, (err, result) => {
    if(err) res.status(400).send(err);
    res.status(200).send(result.rows);
  })
}

getSpecificProduct = (req, res) => {
  const productId = req.params.product_id;
  models.getSpecificProduct(productId, (err, result) => {
    if(err) res.status(400).send(err);
    res.status(200).send(result.rows);
  })
}

getProductStyles = (req, res) => {
  const productId = req.params.product_id;
  models.getProductStyles(productId, (err, result) => {
    if(err) res.status(400).send(err);
    res.status(200).send(result.rows);
  })
}

module.exports = {
  getDefaultAmount,
  getCustomAmount,
  getSpecificProduct,
  getProductStyles,
};