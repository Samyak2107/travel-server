const Contact = require("../models/contact");

const handleContact = async (req, res, next) => {
  const { name, email, message } = req.body;
  if (!email || !name || !message) {
    res.status(400).json({ message: "Please provide all fields" });
  } else {
    try {
      const newContact = new Contact({
        name: name,
        email: email,
        message: message,
      });
      newContact
        .save()
        .then((contact) => {
          res.status(201).json({
            error: false,
            data: contact,
            message: "Thankyou for contacting us!",
          });
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = { handleContact };
