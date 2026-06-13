import './App.css';
import { Routes, Route, Navigate} from 'react-router-dom';

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
import AdminComplaintList from './components/AdminComplainList';
import StatusUpdateScreen from './components/StatusUpdateScreen';
import FilterInterface from './components/FilterInterface';
import Statistics from './components/Statistics';
import { useEffect, useState } from 'react';



const App = () => {
  // ── Seed localStorage on very first load, then use it as single source of truth ──
  
    const [complaints, setComplaints] = useState(() => {
      const stored = localStorage.getItem('complaints');
      if (stored) return JSON.parse(stored);
      // First visit: seed with initial data
      localStorage.setItem('complaints', JSON.stringify(INIT_COMPLAINTS));
      return INIT_COMPLAINTS;
    });

     const [users, setUsers] = useState(() => {
        const stored = localStorage.getItem('users');
        if (stored) return JSON.parse(stored);
        // First visit: seed with initial users
        localStorage.setItem('users', JSON.stringify(INIT_USERS));
        return INIT_USERS;
      });

      // Keep localStorage in sync whenever state changes
        useEffect(() => {
          localStorage.setItem('complaints', JSON.stringify(complaints));
        }, [complaints]);
      
        useEffect(() => {
          localStorage.setItem('users', JSON.stringify(users));
        }, [users]);

        // Helpers passed down so any child can update shared state
  const updateComplaint = (updatedComplaint) => {
    setComplaints(prev =>
      prev.map(c => c.id === updatedComplaint.id ? updatedComplaint : c)
    );
  };

  const addComplaint = (newComplaint) => {
    setComplaints(prev => [...prev, newComplaint]);
  };

  const deleteComplaint = (id) => {
    setComplaints(prev => prev.filter(c => c.id !== id));
  };

  const addUser = (newUser) => {
    setUsers(prev => [...prev, newUser]);
  };

  // Current logged-in user (read from session)
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const currentStudent = currentUser?.role === 'student'
    ? users.find(u => u.id === currentUser.id) ?? users.find(u => u.role === 'student')
    : users.find(u => u.role === 'student');
  return (
    
        <Routes>
          {/* Authentication */}
          <Route path="/login" element={<Login addUser={addUser}/>} />
          <Route path="/register" element={<Register addUser={addUser}/>} />
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Protected Dashboard Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/admindash" element={<AdminDashboard users={users} complaints={complaints} onUpdateComplaint={updateComplaint}/>} />
            <Route path="/studentdash" element={<StudentDashboard user={currentStudent} complaints={complaints} />} />
            <Route path="/admin-complaints" element={<AdminComplaintList complaints={complaints} users={users} onUpdateComplaint={updateComplaint} onDeleteComplaint={deleteComplaint}/>} />
            <Route path="/status-update" element={<StatusUpdateScreen complaints={complaints} onUpdateComplaint={updateComplaint}/>} />
            <Route path="/filter-interface" element={<FilterInterface complaints={complaints}/>} />
            <Route path='/statistics' element={<Statistics complaints={complaints} />} />
          

          {/* Complaint Flow */}
          <Route path="/submit" element={<SubmitComplaint addComplaint={addComplaint} complaints={complaints}/>} />
      
          <Route path="/complaint-details/:id" element={<ComplaintDetails />} />
          <Route path="/mycomplaints" element={<MyComplaints complaints={complaints} onDeleteComplaint={deleteComplaint}/>} />
          <Route path="/details" element={<ComplaintDetails />} />
          <Route path="/status" element={<ComplaintStatus complaints={complaints}/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
          
          </Route>
          
        </Routes>

      
  );
}

export default App;




