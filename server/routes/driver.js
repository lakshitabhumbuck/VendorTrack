const express = require('express');
const Driver = require('../models/Driver');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Create driver
router.post('/', async (req, res) => {
  try {
    const driver = new Driver(req.body);
    await driver.save();
    res.status(201).json(driver);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upload document for a driver
router.post('/:id/document', upload.single('document'), async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) return res.status(404).json({ message: 'Driver not found' });
    driver.documents.push(req.file.filename);
    await driver.save();
    res.json({ message: 'Document uploaded', filename: req.file.filename });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Verify a document (stub)
router.post('/:id/document/:docIndex/verify', async (req, res) => {
  try {
    // In a real app, mark the document as verified in the DB
    res.json({ message: 'Document verified (stub)' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all drivers
router.get('/', async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update driver
router.put('/:id', async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(driver);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete driver
router.delete('/:id', async (req, res) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    res.json({ message: 'Driver deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 