const express = require('express');
const router = express.Router();
const {
  createComplaint, getComplaints, getComplaintById,
  updateComplaint, deleteComplaint, getStats,
} = require('../controllers/complaintController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', protect, createComplaint);
router.get('/', protect, getComplaints);
router.get('/stats', protect, adminOnly, getStats);
router.get('/:id', protect, getComplaintById);
router.put('/:id', protect, adminOnly, updateComplaint);
router.delete('/:id', protect, deleteComplaint);

module.exports = router;