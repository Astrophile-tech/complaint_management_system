import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Paper, Chip,
  Divider, Grid
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AdminComplaintDetails = () => {
  const { id } = useParams(); // Gets the complaint ID from the URL
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    // 1. Get all complaints from localStorage
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');

    // 2. Find the specific complaint by ID
    const foundComplaint = complaints.find(c => c.id === id);
    setComplaint(foundComplaint);

    // 3. Get student name using userId
    if (foundComplaint) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const student = users.find(u => u.id === foundComplaint.userId);
      setStudentName(student? student.name : 'Unknown Student');
    }
  }, [id]);

  if (!complaint) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6">Complaint not found</Typography>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back
      </Button>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5">Complaint Details</Typography>
          <Chip
            label={complaint.status}
            color={
              complaint.status === 'Resolved'? 'success' :
              complaint.status === 'In Progress'? 'warning' : 'default'
            }
          />
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Complaint ID</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{complaint.id}</Typography>

            <Typography variant="subtitle2" color="text.secondary">Submitted By</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{studentName}</Typography>

            <Typography variant="subtitle2" color="text.secondary">Date Submitted</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{complaint.date}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Category</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{complaint.category}</Typography>

            <Typography variant="subtitle2" color="text.secondary">Location</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{complaint.location}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="text.secondary">Title</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{complaint.title}</Typography>

            <Typography variant="subtitle2" color="text.secondary">Description</Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
              {complaint.description}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AdminComplaintDetails;