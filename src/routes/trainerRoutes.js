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
  deleteByEmail,
  getCountPoByEmail,
  getTrainingCount,
  getCurrentTrainings,
  checkTrainings,
  requestDeletion
} = require("../controllers/trainerController");

// router.post("/trainers", registerTrainer);
// router.get("/trainers", getAllTrainers);

// // Route to register a new trainer
// router.post('/register', registerTrainer);

// // Route to get all trainers
// router.get('/trainers', getAllTrainers);

// // Route to get trainer by email
// router.get('/trainers/:email', getTrainerByEmail);

// // Route to update trainer by email
// router.put('/trainers/:email', updateTrainerByEmail);

// // Route to get purchase orders by trainer email
// router.get('/purchase-orders/:email', getPoByEmail);

// // Route to get accepted purchase orders by trainer email
// router.get('/accepted-purchase-orders/:email', getAcceptedPoByEmail);

// // Route to accept a purchase order by ID
// router.put('/accept-purchase-order/:id', acceptPoById);

// // Route to reject a purchase order by ID
// router.put('/reject-purchase-order/:id', rejectPoById);

// // Route to raise an invoice for a purchase order by ID
// router.post('/raise-invoice/:id', raiseInvoiceByPoId);

// // Route to get invoices by trainer email
// router.get('/invoices/:email', getInvoiceByEmail);

// // Route to get invoice details by ID
// router.get('/invoices/:id/details', getInvoiceById);

// // Route to delete trainer by email
// router.delete('/delete-trainer/:email', deleteByEmail);

// // Route to get count of purchase orders by trainer email
// router.get('/purchase-orders/count/:trainerEmail', getCountPoByEmail);

// // Route to get total count of trainer orders by trainer email
// router.get('/trainer-orders/count/:trainerEmail', getTrainingCount);

// // Route to get current trainings by trainer email
// router.get('/current-trainings/:trainerEmail', getCurrentTrainings);

// Trainer registration endpoint

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

// Delete a trainer account endpoint
router.delete("/trainer/:email", deleteByEmail);

// Get the count of purchase orders for a trainer endpoint
router.get("/purchase-orders/count/:trainerEmail", getCountPoByEmail);

// Get the total count of accepted trainer orders endpoint
router.get("/total-trainers/:trainerEmail", getTrainingCount);

// Get current trainings for a trainer endpoint
router.get("/current-trainings/:trainerEmail", getCurrentTrainings);

// Delete a trainer account endpoint
// router.delete("/trainer/:email", deleteByEmail);
router.post("/trainer/requestDeletion/:email", requestDeletion);

//check PO before validating
router.get('/trainer/checkTrainings/:email', checkTrainings);

module.exports = router;
