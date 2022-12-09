const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  imgUrl: { type: String, required: false },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  priceUnits: { type: String, required: true },
  availability: { type: Boolean, required: true },
  quantityPerPrice: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('ProductMatala', productSchema);
