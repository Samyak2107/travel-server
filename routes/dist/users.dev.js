"use strict";

var express = require("express");

var router = express.Router();

var _require = require("express-validator"),
    check = _require.check,
    validationResult = _require.validationResult,
    body = _require.body;
/* Controllers */


var usersController = require("../controllers/users");

router.post("/sign-up", [check("email").isEmail(), check("password").isLength({
  min: 6
})], function (req, res) {
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  usersController.handleNewUser(req, res);
});
router.post("/login", function (req, res) {
  usersController.handleLogin(req, res);
});
router.post("/refresh", function (req, res) {
  usersController.handleRefreshToken(req, res);
});
module.exports = router;