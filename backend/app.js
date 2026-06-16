require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AdminConfig = require('./models/AdminConfig');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const complaintRoutes = require('./routes/complaintRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/complaints', complaintRoutes);

const seedAdmin = async () => {
  const existing = await AdminConfig.findOne();
  if (!existing) {
    const passwordHash = await bcrypt.hash(process.env.ADMIN_INITIAL_PASSWORD || 'admin123', 10);
    await AdminConfig.create({ passwordHash, name: 'Admin', email: 'admin@college.edu' });
    console.log('Admin config seeded with default password.');
  }
};

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    await seedAdmin();
    app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000}`));
  })
  .catch(err => console.error(err));