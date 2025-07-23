const express = require('express');
const Vehicle = require('../models/Vehicle');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Create vehicle
router.post('/', async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upload document for a vehicle
router.post('/:id/document', upload.single('document'), async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    vehicle.documents.push(req.file.filename);
    await vehicle.save();
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

// Get all vehicles
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update vehicle
router.put('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete vehicle
router.delete('/:id', async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vehicle deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 