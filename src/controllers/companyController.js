const Company = require("../models/companyModel");
const bcrypt = require("bcrypt");
const BusinessRequest = require("../models/businessRequestModel");
const BusinessInvoice = require("../models/businessInvoiceModel");
const Invoice = require("../models/invoiceModel");
const Feedback = require("../models/feedbackModel");

exports.registerCompany = async (req, res) => {
  try {
    const { email } = req.body;
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const { uniqueId, companyName, location, phone, password, domain } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCompany = new Company({
      uniqueId,
      companyName,
      location,
      phone,
      email,
      password: hashedPassword,
      domain,
    });
    await newCompany.save();
    res.status(201).json({ message: "Company registered successfully" });
  } catch (error) {
    console.error("Error registering company:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const { email: updatedEmail } = req.params;
    let company = await Company.findOne({ email: updatedEmail });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    const { password, companyName, email, location, phone, domain } = req.body;
    if (password) {
      company.password = password;
    }
    if (companyName) {
      company.companyName = companyName;
    }
    if (email) {
      company.email = email;
    }
    if (location) {
      company.location = location;
    }
    if (phone) {
      company.phone = phone;
    }
    if (domain) {
      company.domain = domain;
    }
    company = await company.save();
    res.status(200).json({ message: "Company updated successfully", company });
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCompanyByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    console.error("Error finding company:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const email = req.params.email;
    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    await company.deleteOne();
    res.json({ message: "Company deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.checkEmailExistence = async (req, res) => {
  try {
    const { email } = req.query;
    const emailExists = await Company.exists({ email });
    res.json({ exists: emailExists });
  } catch (error) {
    console.error("Error checking email existence:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// exports.submitBusinessRequest = async (req, res) => {
//   try {
//     const { user } = req;
//     const companyDocument = await Company.findById(user._id);
//     const companyUniqueId = companyDocument._id;
//     if (!companyUniqueId) {
//       return res.status(400).json({ error: "Company uniqueId is required." });
//     }
//     const newBusinessRequest = await BusinessRequest.create({
//       ...req.body,
//       uniqueId: companyUniqueId,
//     });
//     console.log(
//       "Business Request Data inserted successfully:",
//       newBusinessRequest
//     );
//     return res
//       .status(200)
//       .json({ message: "Business Request Data submitted successfully" });
//   } catch (error) {
//     console.error("Error inserting data into MongoDB:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

exports.submitBusinessRequest = async (req, res) => {
  try {
    console.log(req);
    // Extract the company's uniqueId from the authenticated user
    const companyDocument = await Company.findById(req.user.id);
    const companyUniqueId = companyDocument._id;

    // Ensure that the authenticated user is a company and has a uniqueId
    if (!companyUniqueId) {
      return res.status(400).json({ error: "Company uniqueId is required." });
    }

    // Create a new business request with the company's uniqueId
    const newBusinessRequest = await BusinessRequest.create({
      ...req.body,
      uniqueId: companyUniqueId,
    });

    console.log(
      "Business Request Data inserted successfully:",
      newBusinessRequest
    );

    return res
      .status(200)
      .json({ message: "Business Request Data submitted successfully" });
  } catch (error) {
    console.error("Error inserting data into MongoDB:", error);
    console.log(req.uniqueId);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getBusinessInvoices = async (req, res) => {
  try {
    const { businessEmail } = req.params;
    const businessInvoices = await BusinessInvoice.find({ businessEmail });
    res.json(businessInvoices);
  } catch (error) {
    console.error("Error fetching business invoices:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.acceptInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Accepting invoice. ID:", id);
    const updatedInvoice = await BusinessInvoice.findByIdAndUpdate(
      id,
      { paymentStatus: true },
      { new: true }
    );
    if (!updatedInvoice) {
      console.log("Invoice not found");
      return res.status(404).json({ message: "Business invoice not found" });
    }
    console.log("Invoice accepted successfully:", updatedInvoice);
    res.json(updatedInvoice);
  } catch (error) {
    console.error("Error updating business invoice:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCurrentInvoices = async (req, res) => {
  try {
    const { businessEmail } = req.params;
    const invoices = await Invoice.find({ businessEmail });
    res.json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.submitFeedback = async (req, res) => {
  const feedbackData = req.body;
  try {
    const newFeedback = new Feedback(feedbackData);
    await newFeedback.save();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
