import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { NavLink } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import BuildIcon from '@mui/icons-material/Build';
import BarChartIcon from '@mui/icons-material/BarChart';
import { DRAWER_W } from '../utils/Constants';






const STUDENT_NAV = [
  { id: 'dashboard',     label: 'Dashboard',      icon: <DashboardIcon />, path: '/studentdash' },
  { id: 'submit',        label: 'New Complaint',  icon: <AddCircleIcon />, path: '/submit' },
  { id: 'my-complaints', label: 'My Complaints',  icon: <ListAltIcon />, path: '/' },
  { id: 'tracking',      label: 'Track Status',   icon: <TrackChangesIcon />, path: '/status' },
];
const ADMIN_NAV = [
  { id: 'dashboard',      label: 'Dashboard',        icon: <DashboardIcon />, path: '/admindash' },
  { id: 'all-complaints', label: 'All Complaints',   icon: <FolderOpenIcon />, path: '/' },
  { id: 'manage',         label: 'Manage & Resolve', icon: <BuildIcon />, path: '/status' },
  { id: 'statistics',     label: 'Statistics',       icon: <BarChartIcon />, path: '/admindash' },
];

function Sidebar({ role }) {
  const items = role === 'admin' ? ADMIN_NAV : STUDENT_NAV;
  return (
    <Box sx={{ width: DRAWER_W, flexShrink: 0, borderRight: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', minHeight: '100vh', pt: 2 }}>
      <Typography variant="caption" color="text.secondary" fontWeight={700}
        sx={{ px: 2.5, pb: 1, display: 'block', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
        Navigation
      </Typography>
      <List dense>
        {items.map(item => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              end
              sx={{ '&.active .MuiListItemText-primary': { fontWeight: 700 } }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: '0.875rem' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Sidebar;