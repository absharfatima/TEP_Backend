// models/trainerModel.js

const mongoose = require("mongoose");

// Define Company schema
const companySchema = new mongoose.Schema({
  uniqueId: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  domain: { type: String, required: true },
  role: { type: String, default: "company" },
});

module.exports = mongoose.model("Company", companySchema);
