import './App.css';
import { Routes, Route, Navigate} from 'react-router-dom';

import MyComplaints from './components/MyComplaints';
import ComplaintDetails from './components/ComplaintDetails';
import ComplaintStatus from './components/ComplaintStatus';
import AdminDashboard from './components/adminDashboard';
import StudentDashboard from './components/studentDashboard';
import SubmitComplaint from './components/SubmitComplaint';
import Login from './components/LOGIN';
import DashboardLayout from './components/DashboardLayout';
import Register from './components/Register';
import AdminComplaintList from './components/AdminComplainList';
import StatusUpdateScreen from './components/StatusUpdateScreen';
import FilterInterface from './components/FilterInterface';
import Statistics from './components/Statistics';
import ForgotPassword from './components/ForgotPassword';
import { useEffect, useState, useCallback, useRef } from 'react';
import api from './utils/api';
import ProfilePage from './components/ProfilePage';
import Home from './components/Home';

// ─── Route Guards ─────────────────────────────────────────────────────────────
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

const RoleRoute = ({ role, children }) => {
  const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admindash' : '/studentdash'} replace />;
  }
  return children;
};

function App () {
  const [complaints, setComplaints] = useState([]);
  const [users, setUsers]           = useState([]);
  const hasFetched = useRef(false);
 
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const isLoggedIn  = Boolean(localStorage.getItem('token'));
 
  // ── Fetch all data the dashboards need ──────────────────────────────────────
  const fetchData = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      // Always fetch complaints
      const complaintsData = await api.get('/complaints');
      setComplaints(complaintsData);

      // Only fetch users if admin (requires adminOnly permission on backend)
      if (currentUser?.role === 'admin') {
        const usersData = await api.get('/users');
      setUsers(usersData);
      }
    } catch (err) {
      console.error('Failed to load data:', err.message);
    }
  }, [isLoggedIn, currentUser?.role]);

  useEffect(() => {
    if (isLoggedIn && !hasFetched.current) {
      hasFetched.current = true;
      fetchData();
    }
  }, [isLoggedIn, fetchData]);
 
  // ── Complaint CRUD handlers ──────────────────────────────────────────────────
  const addComplaint = async (complaintData) => {
    try {
      const created = await api.post('/complaints', complaintData);
      setComplaints(prev => [created, ...prev]);
      return created;
    } catch (err) {
      throw new Error(
        err.message || "Failed to submit complaint.",
        { cause: err }
      );
    }
  };
 
  const updateComplaint = async (updated) => {
    try {
      const payload = {};
      if (updated.title !== undefined) payload.title = updated.title;
      if (updated.category !== undefined) payload.category = updated.category;
      if (updated.location !== undefined) payload.location = updated.location;
      if (updated.description !== undefined) payload.description = updated.description;
      if (updated.status !== undefined) payload.status = updated.status;
      if (updated.resolution !== undefined) payload.resolution = updated.resolution;

      const saved = await api.put(`/complaints/${updated.id}`, payload);
      setComplaints(prev => prev.map(c => (c.id === saved.id ? saved : c)));
      return saved;
    } catch (err) {
      throw new Error(
        err.message || 'Failed to update complaint.',
        { cause: err }
      );
    }
  };
 
  const deleteComplaint = async (id) => {
    try {
      await api.del(`/complaints/${id}`);
      setComplaints(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      throw new Error(err.message || 'Failed to delete complaint.', {cause: err});
    }
  };
  return (
    
        <Routes>
          {/* Authentication */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login onLoginSuccess={fetchData}/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Protected Dashboard Routes */}
          <Route element={<PrivateRoute><DashboardLayout user={currentUser}/></PrivateRoute>}>

            {/* Student routes */}
            <Route path="/studentdash" element={
                <RoleRoute role="student">
                  <StudentDashboard user={currentUser} complaints={complaints} />
                </RoleRoute>
            } />
            
            <Route path="/submit" element={
                <RoleRoute role="student">
                  <SubmitComplaint addComplaint={addComplaint} updateComplaint={updateComplaint} />
                </RoleRoute>
            } />

            <Route path="/mycomplaints" element={
                <RoleRoute role="student">
                  <MyComplaints complaints={complaints} onDeleteComplaint={deleteComplaint} />
                </RoleRoute>
            } />

            {/* Admin routes */}
             <Route path="/admindash" element={
                <RoleRoute role="admin">
                  <AdminDashboard complaints={complaints} users={users} />
                </RoleRoute>
            } />

            <Route path="/admin-complaints" element={
                <RoleRoute role="admin">
                  <AdminComplaintList
                    complaints={complaints}
                    users={users}
                  />
                </RoleRoute>
            } />

            <Route path="/status-update" element={
                <RoleRoute role="admin">
                  <StatusUpdateScreen complaints={complaints} onUpdateComplaint={updateComplaint} />
                </RoleRoute>
            } />

            <Route path="/statistics" element={
                <RoleRoute role="admin">
                  <Statistics complaints={complaints} />
                </RoleRoute>
            } />

             <Route path="/filter" element={
                <RoleRoute role="admin">
                  <FilterInterface complaints={complaints} />
                </RoleRoute>
            } />

             {/* Shared routes */}
          <Route path="/details" element={<ComplaintDetails />} />
          <Route path="/status"  element={<ComplaintStatus  />} />
          <Route path="/profile" element={<ProfilePage onProfileUpdate={fetchData} />} />
          
          
          </Route>
          
        </Routes>

      
  );
}

export default App;




