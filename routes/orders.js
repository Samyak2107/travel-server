const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orders");

router.post("/create-order", (req, res) => {
  orderController.createOrder(req, res);
});

router.post("/pay-order", (req, res) => {
  orderController.storePaidOrder(req, res);
});

router.get("/list-orders", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  orderController.fetchAllOrders(req, res);
});

router.get("/get-razorpay-key", (req, res) => {
  res.send({ key: process.env.RAZORPAY_KEY_ID });
});

module.exports = router;
