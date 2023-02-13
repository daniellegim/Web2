const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  imgUrl: { type: String, required: false },
  price: { type: Number, required: true },
  description: { type: String, required: false },
  priceUnits: { type: String, required: false },
  availability: { type: Boolean, required: false },
  quantityPerPrice: { type: Number, required: false },
  isKosher: { type: Boolean, required: false },
  productType: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('ProductMatala', productSchema);
