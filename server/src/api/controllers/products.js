
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
  update: async (req, res) => {
  const { productId } = req.params;
  const updatedProduct = req.body;
  try {
    const fullProduct = await Product
        .findByIdAndUpdate(productId, updatedProduct, { new: true })
    res.json(fullProduct);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
},
    delete: async (req, res) => {
  const { productId } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    res.json(productId);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
},
    search: async (req, res) => {
  const { name } = req.params;
  const regexp = new RegExp(name, 'i');
  try {
    const filteredProducts = await Product
        .find({ name: regexp });
    res.send(filteredProducts);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}
};
