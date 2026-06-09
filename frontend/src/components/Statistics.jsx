import {Box, Typography, Grid, Card, CardContent, TableContainer, Table, TableCell, TableRow, TableBody, TableHead, Chip} from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, Legend, ResponsiveContainer } from 'recharts';
import { CATEGORIES, CAT_ICONS } from '../utils/Constants';
import LinearProgress from '@mui/material/LinearProgress';




function Statistics({ complaints }) {
  const catData = CATEGORIES.map(cat => ({
    name: cat.length > 10 ? cat.slice(0, 9) + "…" : cat,
    fullName: cat,
    total:      complaints.filter(c => c.category === cat).length,
    pending:    complaints.filter(c => c.category === cat && c.status === "Pending").length,
    inProgress: complaints.filter(c => c.category === cat && c.status === "In Progress").length,
    resolved:   complaints.filter(c => c.category === cat && c.status === "Resolved").length,
  }));

  const dateMap = {};
  complaints.forEach(c => { dateMap[c.createdDate] = (dateMap[c.createdDate] || 0) + 1; });
  const dateData = Object.entries(dateMap)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-7)
    .map(([date, count]) => ({ date: date.slice(5), count }));

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h5">Statistics</Typography>
        <Typography variant="body2" color="text.secondary">Detailed breakdown of all complaint data.</Typography>
      </Box>

      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>Complaints by Category (Stacked)</Typography>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={catData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                  <RTooltip />
                  <Legend />
                  <Bar dataKey="pending"    name="Pending"     fill="#3B82F6" radius={[0, 0, 0, 0]} stackId="a" />
                  <Bar dataKey="inProgress" name="In Progress" fill="#F59E0B" stackId="a" />
                  <Bar dataKey="resolved"   name="Resolved"    fill="#10B981" radius={[4, 4, 0, 0]} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>Daily Volume (last 7 dates)</Typography>
              {dateData.length === 0 ? (
                <Box textAlign="center" py={4}><Typography color="text.secondary">No data</Typography></Box>
              ) : (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={dateData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                    <RTooltip />
                    <Bar dataKey="count" name="Complaints" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="subtitle2" gutterBottom>Summary by Category</Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell align="center">Total</TableCell>
                  <TableCell align="center">Pending</TableCell>
                  <TableCell align="center">In Progress</TableCell>
                  <TableCell align="center">Resolved</TableCell>
                  <TableCell>Resolution Rate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {catData.filter(r => r.total > 0).map(row => (
                  <TableRow key={row.fullName} hover>
                    <TableCell>
                      <Chip label={`${CAT_ICONS[row.fullName]} ${row.fullName}`} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell align="center"><strong>{row.total}</strong></TableCell>
                    <TableCell align="center">{row.pending}</TableCell>
                    <TableCell align="center">{row.inProgress}</TableCell>
                    <TableCell align="center">{row.resolved}</TableCell>
                    <TableCell sx={{ minWidth: 140 }}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <LinearProgress variant="determinate"
                          value={row.total > 0 ? Math.round((row.resolved / row.total) * 100) : 0}
                          color="success" sx={{ flex: 1, borderRadius: 4, height: 6 }} />
                        <Typography variant="caption" fontWeight={600}>
                          {row.total > 0 ? Math.round((row.resolved / row.total) * 100) : 0}%
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Statistics;