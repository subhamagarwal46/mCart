const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  orderId: { type: Number, required: [true, "Required Fields"] },
  cartId: { type: Number, required: [true, "Required Fields"] },
  orderAmount: { type: Number },
});
