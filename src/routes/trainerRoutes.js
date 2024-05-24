// trainerRoutes.js
const express = require("express");
const router = express.Router();
const {
  registerTrainer,
  getAllTrainers,
  getTrainerByEmail,
  updateTrainerByEmail,
  getPoByEmail,
  getAcceptedPoByEmail,
  acceptPoById,
  rejectPoById,
  raiseInvoiceByPoId,
  getInvoiceByEmail,
  getInvoiceById,
  deleteTrainerByEmail,
  getCountPoByEmail,
  getTrainingCount,
  getCurrentTrainings,
  checkTrainings,
  requestDeletion,
} = require("../controllers/trainerController");


router.post("/login");
router.post("/trainers", registerTrainer);

// Find trainer by email endpoint
router.get("/trainers/:email", getTrainerByEmail);

// Update trainer by email endpoint
router.put("/trainers/:email", updateTrainerByEmail);

// Get all purchase orders for a particular trainer endpoint
router.get("/purchase-orders/:email", getPoByEmail);

// Get accepted training orders for a particular trainer endpoint
router.get("/training-orders/:email", getAcceptedPoByEmail);

// Accept a purchase order endpoint
router.put("/purchase-orders/:id/accept", acceptPoById);

// Reject a purchase order endpoint
router.put("/purchase-orders/:id/reject", rejectPoById);

// Raise an invoice for a purchase order endpoint
router.put("/raise-invoice/:id", raiseInvoiceByPoId);

// Get Trainer Invoice by email endpoint
router.get("/invoices/:email", getInvoiceByEmail);

// Get invoice details by ID endpoint
router.get("/invoices/:id/download", getInvoiceById);

// Get the count of purchase orders for a trainer endpoint
router.get("/purchase-orders/count/:trainerEmail", getCountPoByEmail);

// Get the total count of accepted trainer orders endpoint
router.get("/total-trainers/:trainerEmail", getTrainingCount);

// Get current trainings for a trainer endpoint
router.get("/current-trainings/:trainerEmail", getCurrentTrainings);

//check PO before validating
router.get('/trainer/checkTrainings/:email', checkTrainings);

// Trainer request deletion endpoint
router.post("/trainer/requestDeletion/:email", requestDeletion);

// Delete a trainer account endpoint
router.delete("/trainer/:email", deleteTrainerByEmail);

module.exports = router;
