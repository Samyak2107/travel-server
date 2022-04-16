const express = require("express");
const router = express.Router();
const { check, validationResult, body } = require("express-validator");
const orderController = require("../controllers/orders");

app.post("/create-order", async (req, res) => {
  orderController.createNewOrder(req, res);
});

app.post("/pay-order", async (req, res) => {
  orderController.storePaidOrder(req, res);
});

app.get("/list-orders", async (req, res) => {
  orderController.fetchAllOrders(req, res);
});

app.get("/get-razorpay-key", (req, res) => {
  res.send({ key: process.env.RAZORPAY_KEY_ID });
});
