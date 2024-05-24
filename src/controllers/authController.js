//authControler
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { secretKey } = require("../config/auth");
const Trainer = require("../models/trainerModel");
const Company = require("../models/companyModel");

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if the provided credentials are for the admin
//     if (email === "admin@gmail.com" && password === "admin") {
//       // Generate token for admin as well
//       const token = jwt.sign({ email, role: "admin" }, secretKey, {
//         expiresIn: "1h",
//       });
//       return res.status(200).json({ role: "admin", token }); // Return admin role and token
//     }

//     // Proceed with regular user login for trainer or company
//     let user = await Trainer.findOne({ email });
//     let role = "trainer";

//     if (!user) {
//       user = await Company.findOne({ email });
//       role = "company";
//     }

//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (isPasswordValid) {
//       // Generate token
//       const token = jwt.sign({ email: user.email, role }, secretKey, {
//         expiresIn: "1h",
//       });
//       res.status(200).json({ role, token }); // Send the token to the client
//     } else {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    // Check if the provided credentials are for the admin
    if (email == "admin@gmail.com" && password == "admin") {
      // Generate token for admin as well
      const token = jwt.sign({ email, role: "admin" }, secretKey, {
        expiresIn: "1h",
      });
      return res.status(200).json({ role: "admin", token }); // Return admin role and token
    }

    // Proceed with regular user login for trainer or company
    let user = await Trainer.findOne({ email });
    let role = "trainer";

    if (!user) {
      user = await Company.findOne({ email });
      role = "company";
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if the user has requested account deletion for trainer
    if (role === "trainer" && user.requestDeletion) {
      return res.status(403).json({ message: "This account has requested deletion and cannot be accessed." });
    }

    // Check if the user has requested account deletion for company
    if (role === "company" && user.requestDeletion) {
      return res.status(403).json({ message: "This account has requested deletion and cannot be accessed." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      // Generate token with addiional uniqueId for company users
      const tokenPayload = { email: user.email, role, id: user._id };

      const token = jwt.sign(tokenPayload, secretKey, {
        expiresIn: "1h",
      });

      res.status(200).json({ role, token }); // Send the token to the client
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  login,
};
