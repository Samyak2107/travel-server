const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BrandEnquirySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  companyName: { type: String, required: true },
  companyPost: { type: String, required: true },
  companySector: { type: String, required: true },
  contactPurpose: { type: String, required: true },
});

module.exports = mongoose.model("BrandEnquiry", BrandEnquirySchema);
