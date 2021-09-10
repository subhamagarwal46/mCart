const dbModel = require("../Model/dbconnect");

exports.getLogin = async (req, res) => {
  try {
    const user = await dbModel.userModel.find({
      username: req.body.username,
      password: req.body.password,
    });
    console.log(user);
    if (user.length > 0) {
      res.status(200).json({
        status: "success",
        result: true,
      });
    } else {
      res.status(401).json({
        status: "invalid user",
        result: false,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      result: error,
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const user = await dbModel.userModel.find({ username: req.body.username });
    if (user.length > 0) {
      res.status(500).json({
        status: "error",
        message: "User already registered",
      });
    } else {
      const newUser = await dbModel.userModel.create(req.body);
      res.status(201).json({
        status: "success",
        data: newUser,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getTablets = async (req, res) => {
  try {
    const tablet = await dbModel.productModel.find({ productCode: /TAB-.*/ });
    if (tablet.length > 0) {
      res.status(200).json({
        status: "Success",
        results: tablet.length,
        data: tablet,
      });
    } else {
      res.status(200).json({
        status: "Success",
        data: [],
        message: "No data found",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: "Unknown error",
    });
  }
};

exports.getMobiles = async (req, res) => {
  try {
    const mobiles = await dbModel.productModel.find({ productCode: /MOB-.*/ });
    if (mobiles.length > 0) {
      res.status(200).json({
        status: "success",
        results: mobiles.length,
        data: mobiles,
      });
    } else {
      res.status(200).json({
        status: "success",
        data: [],
        message: "No data found",
      });
    }
  } catch (error) {
    res.status(200).json({
      status: "fail",
      message: "Network error",
    });
  }
};

exports.getAllCart = async (req, res) => {
  try {
    const carts = await dbModel.cartModel.find();
    if (carts.length > 0) {
      res.status(200).json({
        results: carts.length,
        status: "Success",
        data: carts,
      });
    } else {
      res.status(200).json({
        message: "No Data Found",
        status: "Success",
        data: [],
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: "Network error",
    });
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const userCart = await dbModel.cartModel.find({
      username: req.params.username,
    });
    if (userCart.length > 0) {
      res.status(200).json({
        results: userCart.length,
        status: "Success",
        data: userCart,
      });
    } else {
      res.status(200).json({
        message: "No Data Found",
        status: "Success",
        data: [],
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: "Network error",
    });
  }
};

exports.addNewCart = async (req, res) => {
  try {
    const checkCart = await dbModel.cartModel.find({
      username: req.body.username,
    });
    if (checkCart.length > 0) {
      res.status(500).json({
        status: "Success",
        message: "User's cart is already available, append to the same cart",
      });
    } else {
      const maxIndexItem = await dbModel.cartModel.find().sort({ cartId: -1 });
      const cartIndex =
        maxIndexItem.length == 0 ? 1 : maxIndexItem[0].cartId + 1;
      req.body["cartId"] = cartIndex;
      const newCartItem = await dbModel.cartModel.create(req.body);
      res.status(200).json({
        status: "created",
        data: newCartItem,
        message: `New items got inserted into the cart with the ID : ${newCartItem.cartId}`,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const presentCart = await dbModel.cartModel.findOneAndUpdate(
      { username: req.params.username },
      req.body,
      {
        new: true, //to return new doc back
        runValidators: true, //to run the validators which specified in the model
      }
    );
    if (presentCart != null) {
      res.status(200).json({
        status: "success",
        message: `CartId : ${presentCart.cartId} is updated`,
        data: presentCart,
      });
    } else {
      res.status(200).json({
        status: "success",
        message: `User's cart is not available`,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.newOrder = async (req, res) => {
  try {
    const cartDetail = await dbModel.cartModel.find({
      username: req.params.username,
    });
    if (cartDetail.length > 0) {
      const maxOrderIdDetail = await dbModel.orderModel
        .find()
        .sort({ orderId: -1 });
      const maxOrderIndex =
        maxOrderIdDetail.length == 0 ? 1 : maxOrderIdDetail[0].orderId + 1;
      const newOrderDetail = await dbModel.orderModel.create({
        orderId: maxOrderIndex,
        cartId: cartDetail[0].cartId,
        orderAmount: req.body.orderAmount,
      });
      if (newOrderDetail != null) {
        const updatedCartDetails = await dbModel.cartModel.findOneAndUpdate(
          { username: req.params.username },
          { statusOfCart: "Closed" }
        );
        res.status(200).json({
          status: "Created",
          message: `New order placed with the ID : ${newOrderDetail.orderId}`,
          data: newOrderDetail,
        });
      } else {
        res.status(200).json({
          status: "Success",
          message: `Some unknown issue`,
        });
      }
    } else {
      res.status(200).json({
        status: "Success",
        message: `User's cart is not available`,
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await dbModel.productModel.deleteOne({
      productId: req.params.productId,
    });
    if (deletedProduct.deletedCount == 1) {
      res.status(200).json({
        status: "message",
        message: `Product removed successfully`,
      });
    } else {
      res.status(500).json({
        status: "Success",
        message: "Product not available",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.invalid = async (req, res) => {
  res.status(404).json({
    status: "Fail",
    message: "Invalid path/ Url",
  });
};
