const mongoose = require("mongoose");
const userSchema = require("./user");
const productSchema = require("./product");
const orderSchema = require("./order");
const cartSchema = require("./cart");

mongoose
  .connect("mongodb://localhost:27017/mcart", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Db connection successful!"));

const userModel = mongoose.model("user", userSchema);
const productModel = mongoose.model("product", productSchema);
const orderModel = mongoose.model("order", orderSchema);
const cartModel = mongoose.model("cart", cartSchema);

module.exports = { userModel, productModel, orderModel, cartModel };
