const express = require("express");
const router = express.Router();
const {
  authenticateJWT,
  authorizeRole,
} = require("../middleware/authMiddleware"); // Import authentication middleware
const adminController = require("../controllers/adminController");
 
router.post("/login");
router.get(
  "/admin-dashboard",
  authenticateJWT, // Apply authentication middleware
  authorizeRole(["admin"]), // Apply authorization middleware
  adminController.getAdminDashboard
);
 
router.get(
  "/trainer-dashboard",
  authenticateJWT,
  authorizeRole(["trainer"]),
  adminController.getTrainerDashboard
);
 
router.get(
  "/business-dashboard",
  authenticateJWT,
  authorizeRole(["company"]),
  adminController.getBusinessDashboard
);
 
router.get("/admintrainers", async (req, res) => {
  await adminController.getTrainers(req, res);
});
 
router.get("/admincompanies", async (req, res) => {
  await adminController.getCompanies(req, res);
});
 
router.put("/admintrainers/:id", async (req, res) => {
  await adminController.updateTrainer(req, res);
});
 
router.delete("/admintrainers/:id", async (req, res) => {
  await adminController.deleteTrainer(req, res);
});
 
router.put("/admincompanies/:id", async (req, res) => {
  await adminController.updateCompany(req, res);
});
 
router.delete("/admincompanies/:id", async (req, res) => {
  await adminController.deleteCompany(req, res);
});
 
router.get("/adminbusinessrequests", async (req, res) => {
  await adminController.getBusinessRequests(req, res);
});
 
router.get("/adminpurchase-orders", async (req, res) => {
  await adminController.getPurchaseOrders(req, res);
});
 
router.post("/adminpurchase-orders", async (req, res) => {
  await adminController.createPurchaseOrder(req, res);
});
 
router.delete("/adminbusinessrequests/:id", async (req, res) => {
  await adminController.deleteBusinessRequest(req, res);
});
 
router.get("/adminpurchase-orders-details", async (req, res) => {
  await adminController.getPurchaseOrderDetails(req, res);
});
 
router.get("/admintrainerinvoices", async (req, res) => {
  await adminController.getTrainerInvoices(req, res);
});
 
router.post("/adminbusinessinvoices", async (req, res) => {
  await adminController.createBusinessInvoice(req, res);
});
 
router.get("/adminTechnologySell", async (req, res) => {
  await adminController.getTechnologySell(req, res);
});
 
router.get("/adminbusinessrequestsGraph", async (req, res) => {
  await adminController.getBusinessRequestsGraph(req, res);
});
 
router.get("/checkPurchaseOrders/:email", async (req, res) => {
  await adminController.checkPurchaseOrders(req, res);
});
 
router.get('/admincompanydeleterequest', async (req, res) => {
  await adminController.getCompaniesWithDeletionRequest(req, res);
});
 
router.get('/admintrainerdeleterequest', async (req, res) => {
  await adminController.getTrainersWithDeletionRequest(req, res);
});
 
router.delete('/admindeleterequest/:id', async (req, res) => {
  await adminController.deleteAdminCompany(req, res);
});
 
router.get("/admindeletetrainers", async (req, res) => {
  await adminController.getDeleteTrainers(req, res);
});
 
router.delete("/admindeletetrainers/:id", async (req, res) => {
  await adminController.deleteTrainer(req, res);
});
 
module.exports = router;
 