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
  businessEmail: { type: String, required: true },
  batchName: { type: String, required: true },
  technology: { type: String, required: true },
  amount: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  paymentStatus: { type: Boolean, required: true, default: false },

});

module.exports = mongoose.model("BusinessInvoice", businessInvoiceSchema);
