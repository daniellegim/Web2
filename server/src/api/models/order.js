const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
    Id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    Notes: { type: String },
    address: { type: String, required: true },
    total: { type: String, required: true },
    products: { type: Array, required: true },
    time: { type : Date, default: Date.now }
});

module.exports = mongoose.model('OrderMatala', orderSchema);
