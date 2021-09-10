const express = require("express");
const router = express.Router();
const cartController = require("../Controller/cart");

router.get("/login", cartController.getLogin);

router.post("/signup", cartController.signup);

router.get("/tablets", cartController.getTablets);

router.get("/mobiles", cartController.getMobiles);

router.get("/carts", cartController.getAllCart);

router.get("/carts/:username", cartController.getUserCart);

router.post("/carts", cartController.addNewCart);

router.put("/carts/:username", cartController.updateCart);

router.post("/orders/:username", cartController.newOrder);

router.delete("/products/:productId", cartController.deleteProduct);

router.all("*", cartController.invalid);

module.exports = router;
