const express = require("express");
const router = express.Router();
const { check, validationResult, body } = require("express-validator");

/* Controllers */
const subsController = require("../controllers/subscribers");

router.post("/email", [check("email").isEmail()], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  subsController.handleSubscriber(req, res);
});

module.exports = router;
