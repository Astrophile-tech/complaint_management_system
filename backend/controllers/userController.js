const bcrypt = require('bcryptjs');
const User = require('../models/User');
const AdminConfig = require('../models/AdminConfig');

// GET /api/users/profile
exports.getProfile = async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      const config = await AdminConfig.findOne();
      return res.json({ id: 'admin', name: config.name, email: config.email, role: 'admin' });
    }
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PUT /api/users/profile  (update name/email, optional password change)
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, currentPassword, newPassword } = req.body;

    if (req.user.role === 'admin') {
      const config = await AdminConfig.findOne();
      if (name) config.name = name;
      if (email) config.email = email;

      if (newPassword) {
        if (!currentPassword) return res.status(400).json({ message: 'Current password required.' });
        const match = await bcrypt.compare(currentPassword, config.passwordHash);
        if (!match) return res.status(401).json({ message: 'Current password incorrect.' });
        if (newPassword.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters.' });
        config.passwordHash = await bcrypt.hash(newPassword, 10);
      }
      await config.save();
      return res.json({ id: 'admin', name: config.name, email: config.email, role: 'admin' });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    if (email && email.toLowerCase() !== user.email) {
      const exists = await User.findOne({ email: email.toLowerCase() });
      if (exists) return res.status(400).json({ message: 'Email already in use.' });
      user.email = email.toLowerCase();
    }
    if (name) user.name = name;

    if (newPassword) {
      if (!currentPassword) return res.status(400).json({ message: 'Current password required.' });
      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) return res.status(401).json({ message: 'Current password incorrect.' });
      if (newPassword.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters.' });
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();
    res.json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/users  (admin only - list students, for "Registered Students" stat)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    const mapped = users.map(u => ({ id: u._id, name: u.name, email: u.email, role: u.role }));
    mapped.push({ id: 'admin', name: 'Admin', email: 'admin@college.edu', role: 'admin' });
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};