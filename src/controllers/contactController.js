// /controllers/contactController.js

const ContactUs = require('../models/contactModel');
const bcrypt = require("bcrypt");

const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new ContactUs({
      name,
      email,
      message
    });

    await newContact.save();

    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { submitContactForm };
