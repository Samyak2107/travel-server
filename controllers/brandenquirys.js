const BrandEnquiry = require("../models/brandenquiry");

const handleBrandEnquiry = async (req, res, next) => {
  const {
    name,
    email,
    companyName,
    companyPost,
    companySector,
    contactPurpose,
  } = req.body;
  if (
    !name ||
    !email ||
    !companyName ||
    !companyPost ||
    !companySector ||
    !contactPurpose
  ) {
    res.status(400).json({ message: "Please provide all fields" });
  } else {
    try {
      const newBrandEnquiry = new BrandEnquiry({
        name: name,
        email: email,
        companyName: companyName,
        companyPost: companyPost,
        companySector: companySector,
        contactPurpose: contactPurpose,
      });
      newBrandEnquiry
        .save()
        .then((contact) => {
          res.status(201).json({
            error: false,
            data: contact,
            message: "Your brand enquiry has been recieved",
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

module.exports = { handleBrandEnquiry };
