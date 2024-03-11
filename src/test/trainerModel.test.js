const mongoose = require('mongoose');
const Trainer = require('../models/trainerModel');
 
describe('Trainer Model', () => {
  beforeAll(async () => {
    // Connect to a test database if needed
    await mongoose.connect('mongodb://localhost:27017/testDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
 
  afterEach(async () => {
    // Clear the collection after each test
    await Trainer.deleteMany();
  });
 
  afterAll(async () => {
    // Disconnect from the test database if needed
    await mongoose.connection.close();
  });
 
  it('should create a new trainer', async () => {
    const testData = {
      password: 'Test@1234',
      name: 'Test Trainer',
      email: 'test@example.com',
      contactNumber: '1234567890',
    };
 
    const trainer = new Trainer(testData);
    const savedTrainer = await trainer.save();
    expect(savedTrainer._id).toBeDefined();
    expect(savedTrainer.name).toBe(testData.name);
    expect(savedTrainer.email).toBe(testData.email);
  });
 
  it('should require password, name, email, contactNumber, skills, and city fields', async () => {
    const trainer = new Trainer({});
    let error;
 
    try {
      await trainer.validate();
    } catch (e) {
      error = e;
    }
 
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.password).toBeDefined();
    expect(error.errors.name).toBeDefined();
    expect(error.errors.email).toBeDefined();
    expect(error.errors.contactNumber).toBeDefined();
  });
});
 