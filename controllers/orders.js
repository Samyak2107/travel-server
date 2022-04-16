const mongoose = require("mongoose");
const Order = require("../models/order");
const Razorpay = require("razorpay");

const createNewOrder = async (req, res) => {
  try {
    // const instance = new Razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID,
    //   key_secret: process.env.RAZORPAY_SECRET,
    // });
    var instance = new Razorpay({
      key_id: "rzp_test_rdCgzPbEFKxWCO",
      key_secret: "4T2sR2QYpJkMhYbs0FvW3Gqr",
    });
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      reciept: req.body.receipt,
      //payment_capture: 1,
    };
    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send("Some error occured");
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

const storePaidOrder = async (req, res) => {
  try {
    const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
      req.body;
    const newOrder = Order({
      isPaid: true,
      amount: amount,
      razorpay: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
    });
    await newOrder.save();
    res.send({
      msg: "Payment was successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const fetchAllOrders = async (req, res) => {
  const orders = await Order.find();
  res.send(orders);
};

module.exports = {
  createNewOrder,
  storePaidOrder,
  fetchAllOrders,
};
