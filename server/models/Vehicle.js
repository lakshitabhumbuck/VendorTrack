const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  registrationNumber: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  documents: [{ type: String }],
  assignedDriverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema); 