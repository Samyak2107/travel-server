const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  isPaid: Boolean,
  amount: Number,
  razorpay: {
    orderId: String,
    paymentId: String,
    signature: String,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
// const Order = mongoose.model("Order", OrderSchema);
