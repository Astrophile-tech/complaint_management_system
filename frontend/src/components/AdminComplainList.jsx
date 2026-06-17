import { useState } from 'react';
import {
  Box, Card, Typography, Button, Chip,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem, TextField,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CAT_ICONS, STATUS_LIST } from '../utils/Constants';
import statusChip from '../utils/Helpers';

const AdminComplaintList = ({ complaints, users, onUpdateComplaint, onDeleteComplaint }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);   // complaint being edited
  const [newStatus, setNewStatus] = useState('');
  const [resolution, setResolution] = useState('');
  const [saving,     setSaving]     = useState(false);
  const [saveError,  setSaveError]  = useState('');
  const [deleteError, setDeleteError] = useState('');

  const openDialog = (c) => {
    setSelected(c);
    setNewStatus(c.status);
    setResolution(c.resolution || '');
    setSaveError('');
  };

  const closeDialog = () => { setSelected(null); setSaveError(''); };

  const handleSave = async () => {
   if (!selected) return;
    setSaving(true);
    setSaveError('');
    try {
      await onUpdateComplaint({ ...selected, status: newStatus, resolution });
      closeDialog();
    } catch (err) {
      setSaveError(err.message || 'Failed to update complaint.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this complaint?')) return;
    setDeleteError('');
    try {
      await onDeleteComplaint(id);
    } catch (err) {
      setDeleteError(err.message || 'Failed to delete complaint.');
    }
  };

  const sorted = [...complaints].sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>All Complaints</Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        {complaints.length} total complaint{complaints.length !== 1 ? 's' : ''}
      </Typography>

       {deleteError && <Alert severity="error" sx={{ mb: 2 }}>{deleteError}</Alert>}

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
        <DialogTitle>Update Complaint — {String(selected?.id).slice(-6).toUpperCase()}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          {saveError && <Alert severity="error">{saveError}</Alert>}
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
          <Button onClick={closeDialog} disabled={saving}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={saving} startIcon={saving && <CircularProgress size={14} color="inherit" />}>{saving ? 'Saving…' : 'Save'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminComplaintList;
