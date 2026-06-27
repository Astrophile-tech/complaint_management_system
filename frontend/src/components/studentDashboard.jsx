import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Grid, Card, CardContent, Button, TableContainer, Table, TableCell, TableRow, TableBody, TableHead, Chip } from '@mui/material'
import { PieChart, Pie, Legend, Tooltip as RTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from 'recharts';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CATEGORIES, CAT_ICONS, PIE_COLORS, BAR_COLORS, PRIMARY, PRIMARY_DARK } from '../utils/Constants';
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
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 4 }}>
      <Box sx={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, #0a4a42 100%)`, color: '#fff', p: 4, mb: 4, borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ flexGrow: 1, textAlign: '', fontWeight: 'bold', fontFamily: 'Playfair Display', letterSpacing: 2 }}>Welcome{user?.name ? `, ${user.name}` : ''}! Here's your complaint activity</Typography>
        </Box>
        <Button variant="contained" size="large" startIcon={<AddCircleIcon />} onClick={() => navigate('/submit')} sx={{ bgcolor: '#fff', color: PRIMARY, fontWeight: 700, '&:hover': { bgcolor: '#f0f0f0' } }}>
          New Complaint
        </Button>
      </Box>
    
    <Box sx={{ display: 'flex', justifyContent: "center"  }}>
     <Grid container spacing={20} justifyContent="center" sx={{ mb: 4, px: 2 }}>
        {stats.map(s => (
          <Grid item xs={12} sm={6} md={3} key={s.label}>
            <StatCard {...s} />
          </Grid>
        ))}
      </Grid>
    </Box> 
    
    
    <Box sx={{ display: 'flex', justifyContent: 'center' }} >
      <Grid container spacing={4} sx={{ mb: 3, px: 2 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', height: '100%',width:355, transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 32px rgba(0,0,0,0.12)' } }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>Status Breakdown</Typography>
              {mine.length === 0 ? (
                <Box textAlign="center" py={3}>
                  <Typography color="text.secondary" fontSize="0.85rem">No complaints yet</Typography>
                </Box>
              ) : (
              <Box sx={{display:'flex', justifyContent:'center', mt: 1}}>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80}
                      paddingAngle={3} dataKey="value">
                      {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                    </Pie>
                    <Legend align='center' verticalAlign='bottom' />
                    <RTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }} display="flex" justifyContent="center">
          <Card sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', height: '100%',width: 355, transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 12px 32px rgba(0,0,0,0.12)' } }}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>Complaints by Category</Typography>
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

      <Card sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mx: 2, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: '0 12px 32px rgba(0,0,0,0.12)' } }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={700}>Recent Complaints</Typography>
            {recent.length > 0 && (
              <Button size="small" onClick={() => navigate('/mycomplaints')} sx={{ color: PRIMARY, textTransform: 'none', fontWeight: 600 }}>
                View all →
              </Button>
            )}
          </Box>
          {recent.length === 0 ? (
            <Box textAlign="center" py={4}>
              <Typography color="text.secondary" mb={2}>No complaints submitted yet.</Typography>
              <Button variant="contained" size="large" startIcon={<AddCircleIcon />} onClick={() => navigate('/submit')} sx={{ bgcolor: PRIMARY, '&:hover': { bgcolor: PRIMARY_DARK } }}>
                Submit Your First Complaint
              </Button>
            </Box>
          ) : (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f0f4f8' }}>
                    <TableCell sx={{ fontWeight: 700, color: PRIMARY }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: PRIMARY }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: PRIMARY }}>Location</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: PRIMARY }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 700, color: PRIMARY }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recent.map(c => (
                    <TableRow key={c.id} hover sx={{ cursor: 'pointer', '&:hover': { bgcolor: '#f8fafc' } }} onClick={() => navigate('/details', { state: c })}>
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