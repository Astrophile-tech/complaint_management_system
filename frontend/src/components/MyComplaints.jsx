
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Button, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../utils/api'

function MyComplaints({complaints, onComplaintDelete}) {
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  const [complaintToDelete, setComplaintToDelete] = useState(null);
  const [myComplaints, setMyComplaints] = useState([]);

  // Initialize local state with complaints
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (currentUser) {
      const userComplaints = complaints.filter(c => String(c.createdBy) === String(currentUser.id));
      setMyComplaints(userComplaints);
    }
  }, [complaints]);

  // Show only this student's complaints
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  
  // Update local state when complaints prop changes
  const mine = currentUser
    ? myComplaints.length > 0 ? myComplaints : complaints.filter(c => String(c.createdBy) === String(currentUser.id))
    : myComplaints.length > 0 ? myComplaints : complaints;

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "success";
      case "In Progress":
        return "warning";
      default:
        return "error";
    }
  }

  const handleEdit = (e, complaint) => {
    e.stopPropagation();
    navigate('/submit', { state: { editComplaint: complaint } });
  };

  const handleDeleteClick = (e, complaint) => {
    e.stopPropagation();
    setComplaintToDelete(complaint);
    setOpenDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.del(`/complaints/${complaintToDelete.id}`);
      // Remove deleted complaint from local state
      setMyComplaints(myComplaints.filter(c => c.id !== complaintToDelete.id));
      setOpenDelete(false);
      setComplaintToDelete(null);
      // Call parent callback if provided
      if (onComplaintDelete) {
        onComplaintDelete(complaintToDelete.id);
      }
    } catch (error) {
      console.error('Error deleting complaint:', error);
      alert('Failed to delete complaint: ' + error.message);
    }
  };

  const handleCancelDelete = () => {
    setOpenDelete(false);
    setComplaintToDelete(null);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8", p: 4}}>
      <Card sx={{ maxWidth: 1100, mx: "auto", borderRadius: 3, boxShadow: 5  }}>
        <CardContent>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom sx={{ flexGrow: 1, textAlign: '', fontWeight: 'bold', fontFamily: 'Playfair Display', letterSpacing: 2 }}>My Complaints</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          <b>Total complaints: {mine.length}</b>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          <b>Click on a complaint to view full details</b>
        </Typography>
      
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f0f0f0" }}>
              <TableCell><b>Complaint ID</b></TableCell>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Category</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mine.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No complaints submitted yet. 
                  <Button onClick={() => navigate('/submit')}>
                    Submit one now
                  </Button>
                </TableCell>
              </TableRow>
            ) : 
            (
              mine.map((c) => (             //loop through each complaint and display in table
                <TableRow key={c.id} hover onClick={()=> navigate("/details", {state: c})
                }
                sx={{
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": {backgroundColor: "#f9fafb"},
                }}
                >
                  <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{String(c.id).slice(-6).toUpperCase()}</TableCell>
                  <TableCell>{c.title}</TableCell>
                  <TableCell>{c.category}</TableCell>
                  <TableCell>{c.dateSubmitted || c.createdDate}</TableCell>
                  <TableCell>
                    <Chip label={c.status} color={getStatusColor(c.status)} size="small" sx={{ fontWeight: 600 }} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button size="small" variant="outlined" color="primary" onClick={e => handleEdit(e, c)}>
                        Edit
                      </Button>
                      <Button size="small" variant="outlined" color="error" onClick={e => handleDeleteClick(e, c)}>
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      </CardContent>
    </Card>

    <Dialog open={openDelete} onClose={handleCancelDelete}>
      <DialogTitle>Delete Complaint</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this complaint? This action cannot be undone.
        {complaintToDelete && (
          <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
            Complaint ID: {String(complaintToDelete.id).slice(-6).toUpperCase()} - {complaintToDelete.title}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancelDelete} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
    </Box>
  )
}

export default MyComplaints