const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const companyRoutes = require("./routes/companyRoutes");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");

const PORT = process.env.PORT || 3001;
const uri = "mongodb+srv://avinash:avinash@cluster0.rlhitli.mongodb.net/";
//const uri = "mongodb://localhost:27017/";


const router = express();

// Middleware
router.use(cors());
router.use(express.json());

// Routes
router.use(authRoutes);
router.use(trainerRoutes);
router.use(companyRoutes);
router.use(adminRoutes);
router.use(contactRoutes);

// Connect to MongoDB Atlas
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "registration_db",
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

// Start the server
router.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
