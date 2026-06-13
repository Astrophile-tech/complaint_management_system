import { useState } from 'react';
import {
  Box, Typography, FormControl, InputLabel, Select, MenuItem,
  Button, Card, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Dialog,
  DialogTitle, DialogContent, DialogActions, Alert,
} from '@mui/material';
import { STATUS_LIST } from '../utils/Constants';
import statusChip from '../utils/Helpers';

const StatusUpdateScreen = ({ complaints, onUpdateComplaint }) => {
  const [selected, setSelected] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [resolution, setResolution] = useState('');
  const [saved, setSaved] = useState(false);

  const openDialog = (c) => {
    setSelected(c);
    setNewStatus(c.status);
    setResolution(c.resolution || '');
    setSaved(false);
  };

  const closeDialog = () => setSelected(null);

  const handleSave = () => {
    if (!selected) return;
    onUpdateComplaint({ ...selected, status: newStatus, resolution });
    setSaved(true);
    setTimeout(closeDialog, 800);
  };

  // Show only pending/in-progress — things that need action
  const actionable = complaints.filter(c => c.status !== 'Resolved');

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>Manage & Resolve Complaints</Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        {actionable.length} complaint{actionable.length !== 1 ? 's' : ''} need attention
      </Typography>

      <TableContainer component={Card}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#f0f4f8' }}>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Category</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Current Status</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {actionable.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">All complaints are resolved 🎉</TableCell>
              </TableRow>
            ) : (
              actionable.map(c => (
                <TableRow key={c.id} hover>
                  <TableCell>{c.id}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{c.title}</TableCell>
                  <TableCell>{c.category}</TableCell>
                  <TableCell>{c.createdDate}</TableCell>
                  <TableCell>{statusChip(c.status)}</TableCell>
                  <TableCell>
                    <Button size="small" variant="contained" onClick={() => openDialog(c)}>
                      Update Status
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update dialog */}
      <Dialog open={!!selected} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>Update Status — {selected?.id}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          {saved && <Alert severity="success">Saved!</Alert>}
          <Typography variant="body2"><b>Title:</b> {selected?.title}</Typography>
          <Typography variant="body2"><b>Description:</b> {selected?.description}</Typography>
          <FormControl fullWidth>
            <InputLabel>New Status</InputLabel>
            <Select value={newStatus} label="New Status" onChange={e => setNewStatus(e.target.value)}>
              {STATUS_LIST.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField
            label="Resolution Note"
            multiline
            rows={3}
            value={resolution}
            onChange={e => setResolution(e.target.value)}
            placeholder="Describe the action taken..."
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

export default StatusUpdateScreen;
