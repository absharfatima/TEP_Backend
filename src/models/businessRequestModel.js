const express = require("express");
const mongoose = require("mongoose");

const businessRequestSchema = new mongoose.Schema({
  uniqueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company", // Reference to the 'Company' collection
    required: true,
  },
  batchName: { type: String, required: true },
  technology: { type: String, required: true },
  numberOfTrainees: { type: Number, required: true },
  durationOfTraining: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  trainingBudget: { type: Number, required: true },
});

module.exports = mongoose.model("BusinessRequest", businessRequestSchema);
