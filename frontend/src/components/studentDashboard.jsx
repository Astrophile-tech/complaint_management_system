import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Grid, Card, CardContent, Button, TableContainer, Table, TableCell, TableRow, TableBody, TableHead, Chip } from '@mui/material'
import { PieChart, Pie, Legend, Tooltip as RTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from 'recharts';
import { CATEGORIES, CAT_ICONS, PIE_COLORS, BAR_COLORS } from '../utils/Constants';
import StatCard from '../utils/StatCard';
import statusChip from '../utils/Helpers';


const StudentDashboard = ({ user, complaints = [] }) => {
  const navigate = useNavigate();
  
   // Filter to only this student's complaints
    const mine = useMemo(
      () => complaints.filter(c => String(c.createdBy) === String(user?.id)),
      [complaints, user?.id]
    );

  const pending    = mine.filter(c => c.status === 'Pending').length;
  const inProgress = mine.filter(c => c.status === "In Progress").length;
  const resolved   = mine.filter(c => c.status === "Resolved").length;
  const recent     = [...mine].sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)).slice(0, 5);

  const pieData = [
    { name: "Pending",     value: pending    },
    { name: "In Progress", value: inProgress },
    { name: "Resolved",    value: resolved   },
  ].filter(d => d.value > 0);

  const catMap = {};
  CATEGORIES.forEach(c => { catMap[c] = mine.filter(x => x.category === c).length; });
  const barData = Object.entries(catMap)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name: name.length > 10 ? name.slice(0, 9) + "…" : name, value }));

  const stats = [
    { label: "Total Raised",  value: mine.length, icon: "📋", color: "#3B82F6", sub: "All time"        },
    { label: "Pending",       value: pending,      icon: "⏳", color: "#38BDF8", sub: "Awaiting action" },
    { label: "In Progress",   value: inProgress,   icon: "🔄", color: "#F59E0B", sub: "Being resolved"  },
    { label: "Resolved",      value: resolved,     icon: "✅", color: "#10B981", sub: "Completed"       },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 3 }}>
        <Typography variant="h5">My Dashboard</Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome {user?.name ? `, ${user.name}` : ''}! Here's your complaint activity
        </Typography>
      </Box>
     
     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 3 }}>
      <Grid container spacing={10} mb={3}>
        {stats.map(s => (
          <Grid item xs={12} sm={6} md={4} key={s.label}>
            <StatCard {...s} />
          </Grid>
        ))}
      </Grid>
    </Box>
    
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 3,  }}>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={5}>
          <Card sx={{ width: 355 }}>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>Status Breakdown</Typography>
              {mine.length === 0 ? (
                <Box textAlign="center" py={3}>
                  <Typography color="text.secondary" fontSize="0.85rem">No complaints yet</Typography>
                </Box>
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80}
                      paddingAngle={3} dataKey="value">
                      {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                    </Pie>
                    <Legend />
                    <RTooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          <Card sx={{ width: 355 }}>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>Complaints by Category</Typography>
              {barData.length === 0 ? (
                <Box textAlign="center" py={3}>
                  <Typography color="text.secondary" fontSize="0.85rem">No data yet</Typography>
                </Box>
              ) : (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={barData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                    <RTooltip />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {barData.map((_, i) => <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>

      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="subtitle2">Recent Complaints</Typography>
            <Button size="small" onClick={() => navigate('/mycomplaints')} sx={{ textTransform: 'none' }}>
              View all →
            </Button>
          </Box>
          {recent.length === 0 ? (
            <Box textAlign="center" py={3}>
              <Typography color="text.secondary">No complaints submitted yet.</Typography>
              <Button variant="contained" size="small" sx={{ mt: 1.5 }} onClick={() => navigate('/submit')}>
                Submit your first complaint
              </Button>
            </Box>
          ) : (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recent.map(c => (
                    <TableRow key={c.id} hover hover sx={{ cursor: 'pointer' }}
                     onClick={() => navigate('/details', { state: c })}>
                      <TableCell sx={{ fontWeight: 500 }}>{c.title}</TableCell>
                      <TableCell>
                        <Chip label={`${CAT_ICONS[c.category]} ${c.category}`} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>{c.location}</TableCell>
                      <TableCell>{c.createdDate}</TableCell>
                      <TableCell>{statusChip(c.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default StudentDashboard;