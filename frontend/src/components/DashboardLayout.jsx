import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
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
    <>
      <AppBar position="static" sx={{ bgcolor: '#0e1c2c' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Playfair Display' }}>
            CAMPUS COMPLAINT MANAGEMENT SYSTEM
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 64px)', bgcolor: '#F7FAFC' }}>
        <Sidebar role={user.role.toLowerCase()} />
        <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 3 } }}>
          <Outlet /> {/*  dashboard pages render here */}
        </Box>
      </Box>
    </>
  );
};

export default DashboardLayout;