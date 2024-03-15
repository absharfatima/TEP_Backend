// models/trainerModel.js

const mongoose = require("mongoose");

// Define the feedback schema
const feedbackSchema = new mongoose.Schema({
  company_id: String, 
  trainer_name: String,
  trainer_id: String,
  stars: Number,
  feedback_description: String,
});

module.exports = mongoose.model("Feedback", feedbackSchema);
