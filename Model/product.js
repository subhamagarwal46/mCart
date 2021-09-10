const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  productId: {
    type: Number,
    unique: true,
    required: [true, "Required Fields"],
  },
  productName: { type: String, required: [true, "Required field"] },
  productCode: { type: String, required: [true, "Required field"] },
  description: { type: String },
  price: { type: Number, required: [true, "Required field"] },
  rating: { type: Number, min: 1, max: 5, required: [true, "Required field"] },
  manufacturer: { type: String, required: [true, "Required field"] },
  osType: { type: String, required: [true, "Required field"] },
});
