const Complaint = require('../models/Complaint');

const formatComplaint = (c) => ({
  id: c._id,
  title: c.title,
  category: c.category,
  location: c.location,
  description: c.description,
  status: c.status,
  resolution: c.resolution,
  createdBy: c.createdBy,
  createdDate: c.createdDate,
  dateSubmitted: c.dateSubmitted,
});

// POST /api/complaints
exports.createComplaint = async (req, res) => {
  try {
    const { title, category, location, description } = req.body;
    if (!title || !category || !location || !description) {
      return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    const now = new Date();
    const complaint = await Complaint.create({
      title, category, location, description,
      createdBy: req.user.id,
      createdDate: now.toISOString().split('T')[0],
      dateSubmitted: now.toLocaleDateString('en-GB'),
      status: 'Pending',
      resolution: '',
    });

    res.status(201).json(formatComplaint(complaint));
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/complaints  (admin: all, student: own)
exports.getComplaints = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { createdBy: req.user.id };
    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });
    res.json(complaints.map(formatComplaint));
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/complaints/:id
exports.getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found.' });

    if (req.user.role !== 'admin' && complaint.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this complaint.' });
    }
    res.json(formatComplaint(complaint));
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PUT /api/complaints/:id  (admin: update status/resolution)
exports.updateComplaint = async (req, res) => {
  try {
    const { status, resolution } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found.' });

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admin can update complaint status.' });
    }

    if (status) complaint.status = status;
    if (resolution !== undefined) complaint.resolution = resolution;

    await complaint.save();
    res.json(formatComplaint(complaint));
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE /api/complaints/:id  (admin: any, student: own)
exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found.' });

    if (req.user.role !== 'admin' && complaint.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this complaint.' });
    }

    await complaint.deleteOne();
    res.json({ message: 'Complaint deleted.', id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/complaints/stats  (admin dashboard stats)
exports.getStats = async (req, res) => {
  try {
    const all = await Complaint.find();
    const total = all.length;
    const pending = all.filter(c => c.status === 'Pending').length;
    const inProgress = all.filter(c => c.status === 'In Progress').length;
    const resolved = all.filter(c => c.status === 'Resolved').length;
    res.json({ total, pending, inProgress, resolved });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};