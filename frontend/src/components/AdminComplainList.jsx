import { useState } from 'react';
import {
  Box, Card, Typography, Button, Chip,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem, TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CAT_ICONS, STATUS_LIST } from '../utils/Constants';
import statusChip from '../utils/Helpers';

const AdminComplaintList = ({ complaints, users, onUpdateComplaint, onDeleteComplaint }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);   // complaint being edited
  const [newStatus, setNewStatus] = useState('');
  const [resolution, setResolution] = useState('');

  const openDialog = (c) => {
    setSelected(c);
    setNewStatus(c.status);
    setResolution(c.resolution || '');
  };

  const closeDialog = () => setSelected(null);

  const handleSave = () => {
    if (!selected) return;
    onUpdateComplaint({ ...selected, status: newStatus, resolution });
    closeDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this complaint?')) onDeleteComplaint(id);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>All Complaints</Typography>
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
            {complaints.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">No complaints yet.</TableCell>
              </TableRow>
            ) : (
              complaints
                .slice()
                .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
                .map(c => {
                  const who = users.find(u => u.id === c.createdBy);
                  return (
                    <TableRow key={c.id} hover>
                      <TableCell>{c.id}</TableCell>
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
                          <Button size="small" variant="contained"
                            onClick={() => openDialog(c)}>
                            Update
                          </Button>
                          <Button size="small" variant="outlined" color="error"
                            onClick={() => handleDelete(c.id)}>
                            Delete
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

      {/* Status update dialog */}
      <Dialog open={!!selected} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>Update Complaint — {selected?.id}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <Typography variant="body2"><b>Title:</b> {selected?.title}</Typography>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={newStatus} label="Status" onChange={e => setNewStatus(e.target.value)}>
              {STATUS_LIST.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField
            label="Resolution Note"
            multiline
            rows={3}
            value={resolution}
            onChange={e => setResolution(e.target.value)}
            placeholder="Describe what was done to resolve the issue..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminComplaintList;
