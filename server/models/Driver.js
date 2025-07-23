const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  documents: [{ type: String }],
  assignedVehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Driver', driverSchema); 