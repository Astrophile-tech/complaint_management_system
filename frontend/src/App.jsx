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
import { INIT_USERS,INIT_COMPLAINTS } from './utils/Constants';
import Login from './components/LOGIN';
import DashboardLayout from './components/DashboardLayout';
import Register from './components/Register';
import AdminViewComplaints from './components/AdminViewComplaints';
import AdminComplaintDetails from './components/AdminComplaintDetails';
const App = () => {
  const location = useLocation();
  const role=location.pathname.startsWith('/admin') ? 'admin' : 'student';
  const complaints = INIT_COMPLAINTS;
  const user = INIT_USERS;
  const currentStudent=user.find(user=>user.role==="student") ?? user[0];
  return (
    
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route element={<DashboardLayout />}>
          <Route path="/admindash" element={<AdminDashboard user={user} complaints={complaints} />} />
          <Route path="/studentdash" element={<StudentDashboard user={currentStudent} complaints={complaints} />} />
          <Route path="/submit" element={<SubmitComplaint />} />
          <Route path="/complaint-details/:id" element={<ComplaintDetails />} />
          <Route path="/mycomplaints" element={<MyComplaints/>} />
          <Route path="/details" element={<ComplaintDetails />} />
          <Route path="/status" element={<ComplaintStatus />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/adminview" element={<AdminViewComplaints />} />
          <Route path="/admin-complaint-details/:id" element={<AdminComplaintDetails />} />
          </Route>
          
        </Routes>

      
  );
}

export default App;




