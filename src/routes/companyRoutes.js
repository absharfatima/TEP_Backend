const express = require("express");
const router = express.Router();
const {
  registerCompany,
  updateCompany,
  getCompanyByEmail,
  deleteCompanyByEmail,
  checkEmailExistence,
  submitBusinessRequest,
  getBusinessInvoices,
  acceptInvoice,
  getCurrentInvoices,
  submitFeedback,
  getTrainerEmails,
  checkUnpaidStatus,
  rejectInvoice,
  requestDeletion
} = require("../controllers/companyController");
const { authenticateJWT, authorizeRole } = require("../config/auth");
 
// Company registration endpoint
router.post("/companies", registerCompany);
 
// Update company by email endpoint
router.put("/companies/:email", updateCompany);
 
// Find company by email endpoint
router.get("/companies/:email", getCompanyByEmail);
  
// Check if an email exists endpoint
router.get("/check-email", checkEmailExistence);
 
// Business request endpoint
router.post("/businessrequest", authenticateJWT, submitBusinessRequest);
 
// Get business invoices endpoint
router.get("/businessinvoices/:businessEmail", getBusinessInvoices);
 
// Accept invoice endpoint
router.put("/businessinvoices/:id/accept", acceptInvoice);
 
//reject invoice
router.delete("/businessinvoices/:id/reject", rejectInvoice);
 
// Get current invoices endpoint
router.get("/finalinvoices/:businessEmail", getCurrentInvoices);
 
// Submit feedback endpoint
router.post("/feedback", submitFeedback);
 
// Fetching trainer email
router.get("/trainers", getTrainerEmails);
 
router.get("/finalinvoices/:businessEmail", getCurrentInvoices);
 
//check unpaid status invoices
router.get("/businessinvoices/unpaid/:email", checkUnpaidStatus);

// Trainer request deletion endpoint
router.post("/companies/requestDeletion/:email", requestDeletion);

// Delete a trainer account endpoint
router.delete("/company/:email", deleteCompanyByEmail)
 
module.exports = router;
 