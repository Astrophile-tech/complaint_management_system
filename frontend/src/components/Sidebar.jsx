import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Avatar } from '@mui/material'
import { NavLink } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import BuildIcon from '@mui/icons-material/Build';
import BarChartIcon from '@mui/icons-material/BarChart';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { DRAWER_W, PRIMARY } from '../utils/Constants';






const STUDENT_NAV = [
  { id: 'dashboard',     label: 'Dashboard',      icon: <DashboardIcon />, path: '/studentdash' },
  { id: 'submit',        label: 'New Complaint',  icon: <AddCircleIcon />, path: '/submit' },
  { id: 'my-complaints', label: 'My Complaints',  icon: <ListAltIcon />, path: '/mycomplaints' },
  
  
];
const ADMIN_NAV = [
  { id: 'dashboard',      label: 'Dashboard',        icon: <DashboardIcon />, path: '/admindash' },
  { id: 'all-complaints', label: 'All Complaints',   icon: <FolderOpenIcon />, path: '/admin-complaints' },
  { id: 'manage',         label: 'Manage & Resolve', icon: <BuildIcon />, path: '/status-update' },
  { id: 'filter',         label: 'Filter Complaints', icon: <ManageSearchIcon />, path: '/filter' },
  { id: 'statistics',     label: 'Statistics',       icon: <BarChartIcon />, path: '/statistics' },
];

const PROFILE_ITEM = { id: 'profile', label: 'Profile', icon: <AccountCircleIcon />, path: '/profile' };


function Sidebar({ role, user}) {
  const items = role === 'admin' ? ADMIN_NAV : STUDENT_NAV;

  const buttonStyles={mx:1.5, mb: 0.5, borderRadius: 2, transition: 'all 0.2s ease', '&:hover':{bgcolor: PRIMARY, transform: 'translateX(4px)',},
                      '&.active': {bgcolor: PRIMARY,  color: '#fff', '&:hover':{bgcolor: PRIMARY,},'& .MuiListItemIcon-root':{color: '#fff',}}}
  return (
    <Box sx={{ width: DRAWER_W, flexShrink: 0, borderRight: '1px solid #e5e7eb',bgcolor: '#fafbfc', borderColor: 'divider', minHeight: '100vh', pt: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <Box>
      <Typography variant="caption" color="text.secondary" fontWeight={700}
        sx={{ px: 3, pb: 1.5, display: 'block', textTransform: 'uppercase', letterSpacing: '0.8px', fontSize: '0.7rem' }}>
        Navigation
      </Typography>
      <List dense disablePadding>
        {items.map(item => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              component={NavLink}       
              to={item.path}         
              end
              sx={buttonStyles}
            >
              <ListItemIcon sx={{ minWidth: 40,color: 'text.secondary' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.9rem',fontWeight: 500 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>

        {/* Bottom Section: User Info + Profile */}
      <Box sx={{ mt: 'auto' }}>
        <Divider sx={{ mx: 2, mb: 2 }} />

        {/* User Info Card */}
        {user && (
          <Box sx={{
            mx: 1.5,
            mb: 1,
            p: 1.5,
            borderRadius: 2,
            bgcolor: '#fff',
            border: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5
          }}>
            <Avatar
              src={user?.avatar}
              sx={{ width: 36, height: 36, bgcolor: PRIMARY }}
            >
              {user?.name?.[0]?.toUpperCase()}
            </Avatar>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                fontWeight={600}
                noWrap
                sx={{ fontSize: '0.875rem', lineHeight: 1.2 }}
              >
                {user?.name || 'User'}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontSize: '0.75rem',
                  textTransform: 'capitalize',
                  lineHeight: 1
                }}
              >
                {role}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Profile Button */}
        <List dense disablePadding>
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to={PROFILE_ITEM.path}
              sx={buttonStyles}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                {PROFILE_ITEM.icon}
              </ListItemIcon>
              <ListItemText
                primary={PROFILE_ITEM.label}
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                  fontWeight: 500
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default Sidebar;