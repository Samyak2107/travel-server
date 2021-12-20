"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var subscriberSchema = new Schema({
  email: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model("Subscriber", subscriberSchema);