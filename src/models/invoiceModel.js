// models/trainerModel.js

const mongoose = require("mongoose");

//current training schema
const invoiceSchema = new mongoose.Schema({
  poId: String,
  businessId: String,
  companyName: String,
  amount: Number,
  batches: String,
  startDate: Date,
  endDate: Date,
  technologies: String,
  paymentStatus: Boolean,
  businessEmail: String,
});

module.exports = mongoose.model("Invoice", invoiceSchema);
