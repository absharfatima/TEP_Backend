const Trainer = require("../models/trainerModel");

const bcrypt = require("bcrypt");

const PurchaseOrder = require("../models/purchaseOrdersModel");

const TrainerInvoice = require("../models/trainerInvoiceModel");


const registerTrainer = async (req, res) => {
  try {
    const {
      // username,
      password,
      name,
      email,
      contactNumber,
      // skills,
      city,
      // chargePerDay,
    } = req.body;
 
    const hashedPassword = await bcrypt.hash(password, 10);
 
    const newTrainer = new Trainer({
      // username,
      password: hashedPassword,
      name,
      email,
      contactNumber,
      // skills,
      city,
      // chargePerDay,
    });
 
    await newTrainer.save();
    res.status(201).json({ message: "Trainer registered successfully" });
  } catch (error) {
    console.error("Error registering trainer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json(trainers);
  } catch (error) {
    console.error("Error fetching trainers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Find trainer by email endpoint
const getTrainerByEmail = async (req, res) => {
  const { email } = req.params;
  // console.log(username)
  try {
    // Find the trainer by username
    const trainer = await Trainer.findOne({ email });
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    // Check if the trainer has requested deletion
    if (trainer.requestDeletion) {
      return res.status(403).json({ message: "This account has requested deletion and cannot be accessed." });
    }
 
    res.status(200).json(trainer);
  } catch (error) {
    console.error("Error finding trainer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateTrainerByEmail = async (req, res) => {
  const { email: updatedEmail } = req.params; // Rename 'email' to 'updatedEmail'

  try {
    // Find the trainer by email
    let trainer = await Trainer.findOne({ email: updatedEmail });
    if (!trainer) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    // Update trainer fields
    const {
      name,
      contactNumber,
      city,
      trainerType,
      openToTravel,
      deliveryMode,
      clients,
      Resume,
      linkedInUrl,
      skills // Extract skills from req.body
    } = req.body;
  
    if (name) {
      trainer.name = name;
    }
    if (contactNumber) {
      trainer.contactNumber = contactNumber;
    }
    if (city) {
      trainer.city = city;
    }
    if (trainerType !== undefined) {
      trainer.trainerType = trainerType;
    }
    if (openToTravel !== undefined) {
      trainer.openToTravel = openToTravel;
    }
    if (deliveryMode !== undefined) {
      trainer.deliveryMode = deliveryMode;
    }
    if (clients) {
      trainer.clients = clients;
    }
    if (Resume) {
      trainer.Resume = Resume;
    }
    if (linkedInUrl) {
      trainer.linkedInUrl = linkedInUrl;
    }
  
    // Update the skills
    // if (skills) {
    //   trainer.skills = { ...trainer.skills, ...skills }; // Merge existing skills with new ones
    // }

    if (skills) {
      trainer.skills = skills;
    }

    // Save the updated trainer
    trainer = await trainer.save();

    res.status(200).json({ message: "Trainer updated successfully", trainer });
  } catch (error) {
    console.error("Error updating trainer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//get purchase order
const getPoByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const purchaseOrders = await PurchaseOrder.find({ trainerEmail: email })
      .populate({
        path: 'businessRequestId',
        populate: {
          path: 'uniqueId', // Assuming uniqueId refers to the Company collection
          select: 'email', // Only select the email field from the Company collection
        },
      })
      .exec();

    res.status(200).json(purchaseOrders);
  } catch (error) {
    console.error('Error fetching purchase orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// fetched trainer accepted trainings i.e feching my training for particular trainer
const getAcceptedPoByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const purchaseOrders = await PurchaseOrder.find({
      trainerEmail: email,
      status: true,
    });
    res.json(purchaseOrders);
    console.log('purchaseOrders >> ', JSON.stringify(purchaseOrders));
  } catch (error) {
    console.error("Error fetching purchase orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT route to accept a purchase order
const acceptPoById = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedOrder = await PurchaseOrder.findByIdAndUpdate(
      id,
      { status: true },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Purchase order not found" });
    }
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating purchase order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT route to reject a purchase order
const rejectPoById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await PurchaseOrder.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Purchase order not found" });
    }
    res.json({ message: "Purchase order rejected and deleted successfully" });
  } catch (error) {
    console.error("Error deleting purchase order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT route to raise an invoice for a purchase order
const raiseInvoiceByPoId = async (req, res) => {
  const purchaseOrderId = req.params.id;

  try {
    // Fetch the purchase order from the database
    const purchaseOrder = await PurchaseOrder.findById(purchaseOrderId);
    if (!purchaseOrder) {
      return res.status(404).json({ error: "Purchase order not found." });
    }

    // Fetch the trainer details from the database using the trainer's email from the purchase order
    const trainer = await Trainer.findOne({
      email: purchaseOrder.trainerEmail,
    });
    if (!trainer) {
      return res.status(404).json({ error: "Trainer not found." });
    }

    // Create a new TrainerInvoice document
    const newInvoice = new TrainerInvoice({
      trainerId: trainer._id,
      poId: purchaseOrder._id,
      businessId: purchaseOrder.businessRequestId,
      companyEmail: purchaseOrder.companyEmail,
      name: trainer.name,
      email: trainer.email,
      batchName: purchaseOrder.batchName,
      technology: purchaseOrder.technology,
      amount: purchaseOrder.amount,
      contactNumber: trainer.contactNumber,
      raiseStatus: true,
      paymentStatus: false, // Set paymentStatus to false initially
      startDate: purchaseOrder.startDate,
      endDate: purchaseOrder.endDate,
    });

    // Save the new invoice to the database
    await newInvoice.save();

    res.status(200).json({ message: "Invoice raised successfully." });
  } catch (error) {
    console.error("Error raising invoice:", error);
    res
      .status(500)
      .json({ error: "An error occurred while raising the invoice." });
  }
};


// GET Trainer Invoice by email
const getInvoiceByEmail = async (req, res) => {
  try {
    const trainerInvoices = await TrainerInvoice.find({
      email: req.params.email,
    });
    if (!trainerInvoices || trainerInvoices.length === 0) {
      return res.status(404).json({ message: "Trainer invoices not found" });
    }
    res.json(trainerInvoices);
  } catch (error) {
    console.error("Error fetching trainer invoices:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET invoice details by ID
const getInvoiceById = async (req, res) => {
  try {
    const trainingId = req.params.id;
    const training = await TrainerInvoice.findById(trainingId);
    if (!training) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.json(training);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// To get the count of purchase order
const getCountPoByEmail = async (req, res) => {
  const trainerEmail = req.params.trainerEmail;

  try {
    const count = await PurchaseOrder.countDocuments({ trainerEmail });
    res.json({ count });
  } catch (error) {
    console.error("Error retrieving count of purchase orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//To get the total count of total trainer orders
const getTrainingCount = async (req, res) => {
  const trainerEmail = req.params.trainerEmail;

  try {
    const count = await PurchaseOrder.countDocuments({
      trainerEmail,
      status: true,
    });
    res.json({ count });
  } catch (error) {
    console.error("Error retrieving count of trainers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Current trainngs dashboard
const getCurrentTrainings = async (req, res) => {
  const trainerEmail = req.params.trainerEmail;
 
  try {
    const currentDate = new Date(); // Get the current date
    const currentTrainings = await PurchaseOrder.aggregate([
      {
        $match: {
          trainerEmail,
          startDate: { $lte: currentDate }, // Start date should be less than or equal to current date
          endDate: { $gte: currentDate }, // End date should be greater than or equal to current date
          status: true,
        }
      },
      {
        $lookup: {
          from: 'businessrequests', // Name of the collection to perform the lookup
          localField: 'businessRequestId',
          foreignField: '_id',
          as: 'businessRequest'
        }
      },
      {
        $unwind: '$businessRequest' // Unwind the array created by lookup
      },
      {
        $lookup: {
          from: 'companies', // Name of the collection to perform the lookup
          localField: 'businessRequest.uniqueId',
          foreignField: '_id',
          as: 'company'
        }
      },
      {
        $unwind: '$company' // Unwind the array created by lookup
      }
    ]);
 
    res.json({ currentTrainings });
  } catch (error) {
    console.error('Error retrieving current trainings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//check the PO of training before deleting the account
const checkTrainings = async (req, res) => {
  try {
    const email = req.params.email;
 
    // Query purchase orders to check for ongoing or upcoming trainings
    const currentDate = new Date();
    const hasOngoingOrUpcomingTrainings = await PurchaseOrder.exists({
      trainerEmail: email,
      endDate: { $gte: currentDate },
    });
 
    return res.status(200).json({ hasOngoingOrUpcomingTrainings });
  } catch (error) {
    console.error('Error checking trainings:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

//api for request deletion
const requestDeletion = async (req, res) => {
  try {
    const email = req.params.email; // Extract email from the request parameters
    // Find the trainer by their email
    const trainer = await Trainer.findOne({ email });
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
 
    // Update the requestDeletion field to true
    trainer.requestDeletion = true;
    await trainer.save();
 
    // Send response
    return res.status(200).json({ message: 'Request for deletion sent to admin' });
  } catch (error) {
    console.error('Error requesting deletion:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

//Api for deleting a trainer account
const deleteTrainerByEmail = async (req, res) => {
  const email = req.params.email;

  try {
    // Find the trainer by ID
    const trainer = await Trainer.findOne({ email });

    if (!trainer) {
      return res.status(404).json({ error: "Trainer not found" });
    }

    // Perform additional checks if needed (e.g., ensure the request is coming from the authenticated trainer)

    // Delete the trainer
    await trainer.deleteOne();

    res.json({ message: "Trainer account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
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
};
