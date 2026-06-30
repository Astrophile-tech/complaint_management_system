
import {
  Box, Card, Typography, Button, Chip,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CAT_ICONS } from '../utils/Constants';
import statusChip from '../utils/Helpers';

const AdminComplaintList = ({ complaints, users }) => {
  const navigate = useNavigate();
  
  const sorted = [...complaints].sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));

  return (
    <Box p={3}>
      <Typography variant="h5" sx={{ flexGrow: 1, textAlign: '', fontWeight: 'bold', fontFamily: 'Playfair Display', letterSpacing: 2 }}>All Complaints</Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        {complaints.length} total complaint{complaints.length !== 1 ? 's' : ''}
      </Typography>

       

      <TableContainer component={Card}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#f0f4f8' }}>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Category</b></TableCell>
              <TableCell><b>Student</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">No complaints yet.</TableCell>
              </TableRow>
            ) : (
              
                sorted.map(c => {
                  const who = users.find(u => String(u.id) === String(c.createdBy));
                  return (
                    <TableRow key={c.id} hover>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{String(c.id).slice(-6).toUpperCase()}</TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{c.title}</TableCell>
                      <TableCell>
                        <Chip
                          label={`${CAT_ICONS[c.category] ?? '📋'} ${c.category}`}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{who?.name || '—'}</TableCell>
                      <TableCell>{c.createdDate}</TableCell>
                      <TableCell>{statusChip(c.status)}</TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <Button size="small" variant="outlined"
                            onClick={() => navigate('/details', { state: c })}>
                            View
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminComplaintList;
