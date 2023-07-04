const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: false,
  },
  Email: {
    type: String,
    required: true,
  },
  ContactNo: {
    type: Number,
    required: false,
  },
  CompanyName: {
    type: String,
    required: false,
  },
  City: {
    type: String,
    required: false,
  },
  Country: {
    type: String,
    required: false,
  },
  Message: {
    type: String,
    required: false,
  },
  Status: {
    type: String,
    required: false,
    default: "Pending",
  },
});

module.exports = mongoose.model("contactus", aboutSchema);
