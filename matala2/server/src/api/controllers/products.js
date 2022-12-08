
const Product = require('../models/products');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const products = await Product.find();
      res.send(products);
    } catch (error) {
      console.log(error);
      res.status(400);
    }
  },
  create: async (req, res) => {
  let id = Math.round(Math.random() * (99999 - 9999));
  let newProduct = { ...req.body, id};
  const product = new Product(newProduct);

  product.save().then(() => {
    res.send(newProduct)
  }).catch((error) => {
    console.log(error);
    res.status(500).json({
      error
    });
  });
},
};
