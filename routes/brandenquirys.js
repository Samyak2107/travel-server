const express = require("express");
const router = express.Router();

/* Controllers */
const brandEnquiryController = require("../controllers/brandenquirys");

router.post("/contact-info", (req, res) => {
  brandEnquiryController.handleBrandEnquiry(req, res);
});

module.exports = router;
