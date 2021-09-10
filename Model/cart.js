const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
  cartId: { type: Number, unique: true, required: [true, "Required Fields"] },
  username: { type: String, required: [true, "Required field"] },
  productsInCart: { type: Array },
  statusOfCart: {
    type: String,
    required: true,
    validate: [statusValidate, "Status can only be 'Open' or 'Closed'"],
  },
});

function statusValidate(value) {
  return value === "Open" || value === "Closed";
}
