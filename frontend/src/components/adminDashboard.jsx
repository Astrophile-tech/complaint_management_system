import {Box, Typography, Grid, Card, CardContent, TableContainer, Table, TableCell, TableRow, TableBody, TableHead} from '@mui/material'
import { PieChart, Pie, Legend, Tooltip as RTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from 'recharts';
import LinearProgress from '@mui/material/LinearProgress';
import PersonIcon from '@mui/icons-material/Person';
import Chip from '@mui/material/Chip';
import { CATEGORIES, CAT_ICONS, PIE_COLORS, BAR_COLORS } from '../utils/Constants';
import StatCard from '../utils/StatCard';
import statusChip from '../utils/Helpers';




const AdminDashboard = ({ complaints, users }) => {
  const total      = complaints.length;
  const pending    = complaints.filter(c => c.status === "Pending").length;
  const inProgress = complaints.filter(c => c.status === "In Progress").length;
  const resolved   = complaints.filter(c => c.status === "Resolved").length;
  const resRate    = total > 0 ? Math.round((resolved / total) * 100) : 0;
  const students   = users.filter(u => u.role === "student").length;

  const pieData = [
    { name: "Pending",     value: pending    },
    { name: "In Progress", value: inProgress },
    { name: "Resolved",    value: resolved   },
  ].filter(d => d.value > 0);

  const catMap = {};
  CATEGORIES.forEach(c => { catMap[c] = complaints.filter(x => x.category === c).length; });
  const barData = Object.entries(catMap)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name: name.length > 10 ? name.slice(0, 9) + "…" : name, value }));

  const recent = [...complaints]
    .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
    .slice(0, 5);

  const stats = [
    { label: "Total Complaints", value: total,      icon: "📂", color: "#3B82F6", sub: "All time"       },
    { label: "Pending",          value: pending,     icon: "⏳", color: "#38BDF8", sub: "Need attention" },
    { label: "In Progress",      value: inProgress,  icon: "🔄", color: "#F59E0B", sub: "Being handled"  },
    { label: "Resolved",         value: resolved,    icon: "✅", color: "#10B981", sub: "Completed"      },
  ];

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h5">Admin Dashboard</Typography>
        <Typography variant="body2" color="text.secondary">
          System-wide complaint overview •{" "}
          {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </Typography>
      </Box>

      {/* Stat cards */}
      <Grid container spacing={2} mb={3}>
        {stats.map(s => (
          <Grid item xs={6} md={3} key={s.label}>
            <StatCard {...s} />
          </Grid>
        ))}
      </Grid>

      {/* KPI row */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="caption" color="text.secondary" fontWeight={700}
                sx={{ textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Resolution Rate
              </Typography>
              <Typography variant="h4" color="success.main" mt={0.5}>{resRate}%</Typography>
              <LinearProgress variant="determinate" value={resRate} color="success"
                sx={{ mt: 1.5, borderRadius: 4, height: 6 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="caption" color="text.secondary" fontWeight={700}
                sx={{ textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Registered Students
              </Typography>
              <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                <PersonIcon color="primary" />
                <Typography variant="h4" color="primary.main">{students}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="caption" color="text.secondary" fontWeight={700}
                sx={{ textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Needs Action
              </Typography>
              <Typography variant="h4" color="error.main" mt={0.5}>{pending + inProgress}</Typography>
              <Typography variant="caption" color="text.secondary">Pending + In Progress</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={7}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>Complaints by Category</Typography>
              {barData.length === 0 ? (
                <Box textAlign="center" py={4}><Typography color="text.secondary">No data</Typography></Box>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
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
        <Grid item xs={12} md={5}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>Status Distribution</Typography>
              {total === 0 ? (
                <Box textAlign="center" py={4}><Typography color="text.secondary">No data</Typography></Box>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
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
      </Grid>

      {/* Recent table */}
      <Card>
        <CardContent>
          <Typography variant="subtitle2" gutterBottom>Latest Complaints</Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Student</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recent.map(c => {
                  const who = users.find(u => u.id === c.createdBy);
                  return (
                    <TableRow key={c.id} hover>
                      <TableCell sx={{ fontWeight: 500 }}>{c.title}</TableCell>
                      <TableCell>
                        <Chip label={`${CAT_ICONS[c.category]} ${c.category}`} size="small" variant="outlined" />
                      </TableCell>
                      <TableCell>{who?.name || "—"}</TableCell>
                      <TableCell>{c.createdDate}</TableCell>
                      <TableCell>{statusChip(c.status)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AdminDashboard;