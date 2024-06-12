// models/feedbackModel.js

const mongoose = require("mongoose");

// Define the feedback schema
const feedbackSchema = new mongoose.Schema({
  companyName: String, 
  trainerName: String,
  stars: Number,
  feedbackDescription: String,
});

module.exports = mongoose.model("Feedback", feedbackSchema);
