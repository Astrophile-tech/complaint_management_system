import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  const navigate = useNavigate();// can go to another page
  const user = JSON.parse(localStorage.getItem('currentUser')); // Get current user from browser Storage
  
  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true }); // Redirect to login if not authenticated
    }
  }, [user, navigate]); //check if user is logged in, if not redirect to login page

  if (!user) return null; // Don't render while redirecting

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F7FAFC' }}>
      <Sidebar role={user.role.toLowerCase()} />
      <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 3 } }}>
        <Outlet /> {/* Your dashboard pages render here */}
      </Box>
    </Box>
  );
};

export default DashboardLayout;