import { useState, useEffect } from 'react'
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function MyComplaints() {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);

  //  Read from localStorage 
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('complaints') || '[]');
    setComplaints(stored);
  }, []);

  const getStatusColor = (status) => {
    if (status === 'Pending') return 'warning';
    if (status === 'Resolved') return 'success';
    return 'default';
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ bgcolor: '#1976d2',  color: 'white',  p: 3, mb: 3, borderRadius: 2,boxShadow: 2 }}>
        <Typography variant="h5" mb={1}>My Complaints</Typography>
        <Typography variant="body2">
          Total complaints: {complaints.length}
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Complaint ID</strong></TableCell>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
              <TableCell><strong></strong></TableCell>
          
            </TableRow>
          </TableHead>
          <TableBody>
            {complaints.length === 0 ? (
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
              complaints.map((complaint) => (             //loop through each complaint and display in table
                <TableRow key={complaint.id}>
                  <TableCell>{complaint.id}</TableCell>
                  <TableCell>{complaint.title}</TableCell>
                  <TableCell>{complaint.category}</TableCell>
                  <TableCell>{complaint.date}</TableCell>
                  <TableCell>
                    <Chip label={complaint.status} color={getStatusColor(complaint.status)} size="small" />
                  </TableCell>
                  <TableCell>
                    <Button  size="small"  variant="outlined"onClick={() => navigate(`/complaint-details/${complaint.id}`)}>
                      View
                    </Button>
                    <Button  size="small"  variant="outlined"onClick={() => navigate(`/submit/${complaint.id}`)}>
                      Delete
                    </Button>
                    
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default MyComplaints