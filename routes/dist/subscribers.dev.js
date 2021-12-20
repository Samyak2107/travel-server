"use strict";

var express = require("express");

var router = express.Router();

var _require = require("express-validator"),
    check = _require.check,
    validationResult = _require.validationResult,
    body = _require.body;
/* Controllers */


var subsController = require("../controllers/subscribers");

router.post("/email", [check("email").isEmail()], function (req, res) {
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  subsController.handleSubscriber(req, res);
});
module.exports = router;