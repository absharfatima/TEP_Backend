const mongoose = require('mongoose');
const PurchaseOrder = require('../models/purchaseOrdersModel');

describe('PurchaseOrder Model Test', () => {
    // Connect to a test database if needed
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });


  afterAll(async () => {
    // Disconnect from the test database if needed
    await mongoose.connection.close();
  });

  it('should insert purchase order into collection', async () => {
    const mockPurchaseOrder = {
      businessRequestId: new mongoose.Types.ObjectId(),
      trainer: new mongoose.Types.ObjectId(),
      trainerEmail: 'test@example.com',
      amount: 1000,
      status: true,
      startDate: new Date(),
      endDate: new Date(),
    };

    const insertedPurchaseOrder = await PurchaseOrder.create(mockPurchaseOrder);
    expect(insertedPurchaseOrder._id).toBeDefined();
    expect(insertedPurchaseOrder.businessRequestId).toBe(mockPurchaseOrder.businessRequestId);
    expect(insertedPurchaseOrder.trainer).toBe(mockPurchaseOrder.trainer);
    expect(insertedPurchaseOrder.trainerEmail).toBe(mockPurchaseOrder.trainerEmail);
    expect(insertedPurchaseOrder.amount).toBe(mockPurchaseOrder.amount);
    expect(insertedPurchaseOrder.status).toBe(mockPurchaseOrder.status);
    expect(insertedPurchaseOrder.startDate).toEqual(mockPurchaseOrder.startDate);
    expect(insertedPurchaseOrder.endDate).toEqual(mockPurchaseOrder.endDate);
  });

  it('should not insert purchase order with missing required fields', async () => {
    // Omitting required fields from the mock purchase order
    const mockPurchaseOrder = {};

    try {
      await PurchaseOrder.create(mockPurchaseOrder);
    } catch (error) {
      expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    }
  });

  it('should retrieve purchase order from collection', async () => {
    // Insert a mock purchase order into the collection
    const mockPurchaseOrder = {
      businessRequestId: new mongoose.Types.ObjectId(),
      trainer: new mongoose.Types.ObjectId(),
      trainerEmail: 'test@example.com',
      amount: 1000,
      status: true,
      startDate: new Date(),
      endDate: new Date(),
    };
    const insertedPurchaseOrder = await PurchaseOrder.create(mockPurchaseOrder);

    // Retrieve the purchase order from the collection
    const retrievedPurchaseOrder = await PurchaseOrder.findById(insertedPurchaseOrder._id);
    expect(retrievedPurchaseOrder._id).toEqual(insertedPurchaseOrder._id);
    expect(retrievedPurchaseOrder.businessRequestId).toEqual(insertedPurchaseOrder.businessRequestId);
    expect(retrievedPurchaseOrder.trainer).toEqual(insertedPurchaseOrder.trainer);
    expect(retrievedPurchaseOrder.trainerEmail).toEqual(insertedPurchaseOrder.trainerEmail);
    expect(retrievedPurchaseOrder.amount).toEqual(insertedPurchaseOrder.amount);
    expect(retrievedPurchaseOrder.status).toEqual(insertedPurchaseOrder.status);
    expect(retrievedPurchaseOrder.startDate).toEqual(insertedPurchaseOrder.startDate);
    expect(retrievedPurchaseOrder.endDate).toEqual(insertedPurchaseOrder.endDate);
  });



});
