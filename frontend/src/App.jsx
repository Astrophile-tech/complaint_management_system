import './App.css';
import { Routes, Route } from 'react-router-dom';

import MyComplaints from './components/MyComplaints';
import ComplaintDetails from './components/ComplaintDetails';
import ComplaintStatus from './components/ComplaintStatus';
import AddComplaint from './components/AddComplaint';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';


function App() {
  return (
    <Routes>
      <Route path='/admindash' element={<AdminDashboard/>}/>
      <Route path='/studentdash' element={<StudentDashboard/>}/>
      <Route path="/" element={<MyComplaints />} />
      <Route path="/details" element={<ComplaintDetails />} />
      <Route path="/status" element={<ComplaintStatus />} />
      <Route path="/add" element={<AddComplaint />} />
    </Routes>
  );
}

export default App;




