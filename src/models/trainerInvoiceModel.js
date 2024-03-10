// models/trainerModel.js

const mongoose = require("mongoose");

const trainerInvoiceSchema = new mongoose.Schema({
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trainer",
    required: true,
  },
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
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  amount: { type: String, required: true },
  contactNumber: { type: String, required: true },
  raiseStatus: { type: Boolean, required: true, default: true },
  paymentStatus: { type: Boolean, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

module.exports = mongoose.model("TrainerInvoice", trainerInvoiceSchema);
