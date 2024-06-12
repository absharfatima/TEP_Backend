// models/purchaseOrderModel.js

const mongoose = require("mongoose");

// Purchase Order Schema
const purchaseOrdersSchema = new mongoose.Schema({
  businessRequestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BusinessRequest",
    required: true,
  },
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trainer",
    required: true,
  },
  trainerEmail: { type: String, required: true },
  companyEmail: { type: String, required: true }, 
  amount: { type: Number, required: true },
  status: { type: Boolean, required: true },
  endDate: { type: Date, required: true },
  startDate: { type: Date, required: true },
});

module.exports = mongoose.model("PurchaseOrder", purchaseOrdersSchema);
