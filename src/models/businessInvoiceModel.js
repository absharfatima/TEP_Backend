// models/trainerModel.js

const mongoose = require("mongoose");

const businessInvoiceSchema = new mongoose.Schema({
  poId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PurchaseOrder",
    required: true,
  },
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  companyName: { type: String, required: true },
  amount: { type: Number, required: true },
  batches: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  technologies: { type: String, required: true },
  paymentStatus: { type: Boolean, required: true, default: false },
  businessEmail: { type: String, required: true },
});

module.exports = mongoose.model("BusinessInvoice", businessInvoiceSchema);
