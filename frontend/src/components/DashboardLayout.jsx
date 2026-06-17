import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography, Tooltip, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Sidebar from './Sidebar';
import api from '../utils/api';

const DashboardLayout = () => {
  const navigate = useNavigate();// can go to another page
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('currentUser') || 'null'); // Get current user from browser Storage
  
  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true }); // Redirect to login if not authenticated
    }
  }, [token, navigate]); //check if user is logged in, if not redirect to login page

  if (!token) return null; // Don't render while redirecting

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout', {});
    } catch (err) {
      // ignore — we clear client state regardless
      console.error(err)
    }
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    navigate('/login', { replace: true });
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#0e1c2c' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Playfair Display' }}>
            CAMPUS COMPLAINT MANAGEMENT SYSTEM
          </Typography>

          <Tooltip title="Profile">
            <IconButton color="inherit" onClick={() => navigate('/profile')}>
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
 
          <Tooltip title="Logout">
            <IconButton color="inherit" onClick={handleLogout} sx={{ ml: 0.5 }}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 64px)', bgcolor: '#F7FAFC' }}>
        <Sidebar role={user?.role?.toLowerCase()} />
        <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 3 } }}>
          <Outlet /> {/* Your dashboard pages render here */}
        </Box>
      </Box>
    </>
  );
};

export default DashboardLayout;