// models/trainerModel.js

const mongoose = require("mongoose");

// Define Trainer schema
const trainerSchema = new mongoose.Schema({
  // username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },

  city: { type: String,  },
  // chargePerDay: { type: String, required: true },
  trainerType: { type: String, default: "full-time" },
  openToTravel: { type: String, default: "Yes" },
  deliveryMode: { type: String, default: "Offline" },
  clients: { type: String, default: "" },
  Resume: { type: String, default: "" },
  linkedInUrl: { type: String, default: "" },
  role: { type: String, default: "trainer" },
  requestDeletion: {type:Boolean, default:false},
  skills: { type: Object, default: { }  },  
}, { minimize: false });

module.exports = mongoose.model("Trainer", trainerSchema);
