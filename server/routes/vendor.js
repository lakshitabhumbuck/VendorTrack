const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Helper to build tree from flat list
function buildVendorTree(vendors, parentId = null) {
  return vendors
    .filter(v => String(v.parentVendorId) === String(parentId))
    .map(v => ({
      ...v.toObject(),
      children: buildVendorTree(vendors, v._id)
    }));
}

// GET /api/vendors/tree - Get full vendor hierarchy as a tree
router.get('/tree', async (req, res) => {
  try {
    const vendors = await User.find();
    const tree = buildVendorTree(vendors, null);
    res.json(tree);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 