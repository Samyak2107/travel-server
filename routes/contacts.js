const express = require("express");
const router = express.Router();

/* Controllers */
const contactController = require("../controllers/contacts");

router.post("/contact-info", (req, res) => {
  contactController.handleContact(req, res);
});

module.exports = router;
