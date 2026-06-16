const mongoose = require('mongoose');

// Single-document collection holding the pre-set admin password (hashed)
const adminConfigSchema = new mongoose.Schema({
  passwordHash: { type: String, required: true },
  name: { type: String, default: 'Admin' },
  email: { type: String, default: 'admin@college.edu' },
}, { timestamps: true });

module.exports = mongoose.model('AdminConfig', adminConfigSchema);