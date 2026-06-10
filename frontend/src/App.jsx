import './App.css';
import { Box } from '@mui/material';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import MyComplaints from './components/MyComplaints';
import ComplaintDetails from './components/ComplaintDetails';
import ComplaintStatus from './components/ComplaintStatus';
import AdminDashboard from './components/adminDashboard';
import StudentDashboard from './components/studentDashboard';
import SubmitComplaint from './components/SubmitComplaint';
import { INIT_USERS, INIT_COMPLAINTS } from './utils/Constants';

const App = () => {
  const location = useLocation();
  const role = location.pathname.startsWith('/admin') ? 'admin' : 'student';
  const users = INIT_USERS;
  const complaints = INIT_COMPLAINTS;
  const currentStudent = users.find(user => user.role === 'student') ?? users[0];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F7FAFC' }}>
      <Sidebar role={role} />
      <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 3 } }}>
        <Routes>
          <Route path="/admindash" element={<AdminDashboard complaints={complaints} users={users} />} />
          <Route path="/studentdash" element={<StudentDashboard user={currentStudent} complaints={complaints} />} />
          <Route path="/submit" element={<SubmitComplaint />} />
          
          <Route path="/" element={<MyComplaints complaints={complaints.filter(c => c.createdBy === currentStudent.id)} />} />
          <Route path="/details" element={<ComplaintDetails />} />
          <Route path="/status" element={<ComplaintStatus />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;




