import {Box, Typography, Grid, Card, CardContent, Button, TableContainer, Table, TableCell, TableRow, TableBody, TableHead} from '@mui/material'
import { PieChart, Pie, Legend, Tooltip as RTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from 'recharts';


const StudentDashboard = ({user, complaints}) => {
  // Mock data for design preview
  const mockComplaints = [
    { id: 1, title: "Broken Projector in Classroom A2", category: "Infrastructure", location: "Building A, Room 201", createdDate: "2024-12-08", status: "Pending", createdBy: 1 },
    { id: 2, title: "Loud Noise from Construction", category: "Noise Pollution", location: "Campus Grounds", createdDate: "2024-12-07", status: "In Progress", createdBy: 1 },
    { id: 3, title: "Library Air Conditioning Issue", category: "Maintenance", location: "Central Library", createdDate: "2024-12-05", status: "Resolved", createdBy: 1 },
    { id: 4, title: "Cafeteria Food Quality", category: "Food Service", location: "Main Cafeteria", createdDate: "2024-12-03", status: "Pending", createdBy: 1 },
    { id: 5, title: "Broken Staircase Railing", category: "Safety", location: "Building C, Staircase 3", createdDate: "2024-12-01", status: "In Progress", createdBy: 1 },
  ];

  const mockUser = { id: 1, name: "John Student" };
  
  const actualUser = user || mockUser;
  const actualComplaints = complaints && complaints.length > 0 ? complaints : mockComplaints;

  const mine = actualComplaints.filter(c => c.createdBy === actualUser.id);
  const pending = mine.filter(c => c.status === "Pending").length;
  const inProgress = mine.filter(c => c.status === "In Progress").length;
  const resolved = mine.filter(c => c.status === "Resolved").length;
  const recent = [...mine].sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)).slice(0, 5);

  const pieData = [
    { name: "Pending", value: pending },
    { name: "In Progress", value: inProgress },
    { name: "Resolved", value: resolved },
  ].filter(d=> d.value > 0);

  const categoryMap = {
    "Infrastructure": 2,
    "Noise Pollution": 1,
    "Maintenance": 1,
    "Food Service": 1,
    "Safety": 1
  };

  const barData = Object.entries(categoryMap)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([name, value]) => ({ name: name.length > 10 ? name.slice(0, 9) + "…" : name, value }));

  const stats = [
    { label: "Total Raised", value: mine.length, color: "#3B82F6", sub: "All time" },
    { label: "Pending", value: pending, color: "#3B82F6", sub: "Awaiting action" },
    { label: "In Progress", value: inProgress, color: "#3B82F6", sub: "Being resolved" },
    { label: "Resolved", value: resolved, color: "#3B82F6", sub: "Completed" },
  ];
  
  return (
    <div>
      <Box>
        <Box mb={3}>
          <Typography variant='h5'>My Dashboard</Typography>
          <Typography variant="body2" color="text.secondary">Overview of your complaint activity</Typography>
        </Box>

        <Grid container spacing={3} mb={3}>
          {stats.map(s => (
            <Grid item xs={12} md={6} key={s.label}>
              <Card>
                <CardContent sx={{ pb: "16px !important" }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem" }}>{s.sub}</Typography>
                  <Typography variant="h6" sx={{ my: 0.5, fontWeight: 600, color: s.color }}>{s.value}</Typography>
                  <Typography variant="body2" sx={{ fontSize: "0.85rem", fontWeight: 500 }}>{s.label}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={5}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>Status Breakdown</Typography>
                {mine.length === 0? (
                  <Box textAlign="center" py={3}>
                    <Typography color="text.secondary" fontSize="0.85rem">No complaints submitted yet.</Typography>
                    </Box>
                ) : (
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value" fill="#3B82F6">
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.name === "Pending" ? "#EF4444" : entry.name === "In Progress" ? "#F59E0B" : "#10B981"} />
                        ))}
                      </Pie>
                      <Legend />
                      <RTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
        </Grid>

        <Grid item xs={12} mb={7}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>Complaints by Category</Typography>
                {barData.length === 0? (
                  <Box>
                    <Typography color="text.secondary" fontSize="0.85rem">No data yet</Typography>
                  </Box>
                ) : (
                  <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={barData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                    <RTooltip />
                    <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                  )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

        <Card>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="subtitle2">Recent Complaints</Typography>
              <Button size="small" sx={{textTransform: "none"}}>
                View All
              </Button>
             </Box>
            {recent.length === 0 ? (
              <Box textAlign="center" py={3}>
                <Typography color="text.secondary">No complaints submitted yet.</Typography>
                <Button variant="contained" size="small" sx={{mt: 1.5}}>
                  Submit Your First Complaint
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
                    <TableRow key={c.id} hover>
                      <TableCell sx={{ fontWeight: 500 }}>{c.title}</TableCell>
                      <TableCell>
                        <Box sx={{ fontSize: "0.85rem", backgroundColor: "#F0F4F8", padding: "4px 8px", borderRadius: "4px", width: "fit-content" }}>
                          {c.category}
                        </Box>
                      </TableCell>
                      <TableCell>{c.location}</TableCell>
                      <TableCell>{new Date(c.createdDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Box sx={{ 
                          fontSize: "0.85rem", 
                          padding: "4px 8px", 
                          borderRadius: "4px",
                          backgroundColor: c.status === "Resolved" ? "#D1FAE5" : c.status === "In Progress" ? "#FEF3C7" : "#FEE2E2",
                          color: c.status === "Resolved" ? "#065F46" : c.status === "In Progress" ? "#92400E" : "#991B1B",
                          fontWeight: 500
                        }}>
                          {c.status}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </Box>
    </div>
  )
}

export default StudentDashboard