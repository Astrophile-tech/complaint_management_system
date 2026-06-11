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

const App = () => {
  const location = useLocation();
  const role=location.pathname.startsWith('/admin') ? 'admin' : 'student';
  const complaints = INIT_COMPLAINTS;
  const user = INIT_USERS;
  const currentStudent=user.find(user=>user.role==="student") ?? user[0];
  return (
    
        <Routes>
          //Authentication
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<Navigate to="/login" />} />
          //Dashboards
          <Route element={<DashboardLayout />}>
          <Route path="/admindash" element={<AdminDashboard user={user} complaints={complaints} />} />
          <Route path="/studentdash" element={<StudentDashboard user={currentStudent} complaints={complaints} />} />

          //Complaint Flow
          <Route path="/submit" element={<SubmitComplaint />} />
      
          <Route path="/complaint-details/:id" element={<ComplaintDetails />} />
          <Route path="/mycomplaints" element={<MyComplaints/>} />
          <Route path="/details" element={<ComplaintDetails />} />
          <Route path="/status" element={<ComplaintStatus />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          
          </Route>
          
        </Routes>

      
  );
}

export default App;




