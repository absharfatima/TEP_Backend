const express = require("express");
const router = express.Router();
const {
  registerCompany,
  updateCompany,
  getCompanyByEmail,
  deleteCompany,
  checkEmailExistence,
  submitBusinessRequest,
  getBusinessInvoices,
  acceptInvoice,
  getCurrentInvoices,
  submitFeedback,
} = require("../controllers/companyController");
const { authenticateJWT, authorizeRole } = require("../config/auth");

// Company registration endpoint
router.post("/companies", registerCompany);

// Update company by email endpoint
router.put("/companies/:email", updateCompany);

// Find company by email endpoint
router.get("/companies/:email", getCompanyByEmail);

// Delete company by email endpoint
router.delete("/companies/:email", deleteCompany);

// Check if an email exists endpoint
router.get("/check-email", checkEmailExistence);

// Business request endpoint
router.post("/businessrequest", authenticateJWT, submitBusinessRequest);

// Get business invoices endpoint
router.get("/businessinvoices/:businessEmail", getBusinessInvoices);

// Accept invoice endpoint
router.put("/businessinvoices/:id/accept", acceptInvoice);

// Get current invoices endpoint
router.get("/finalinvoices/:businessEmail", getCurrentInvoices);

// Submit feedback endpoint
router.post("/feedback", submitFeedback);

module.exports = router;
