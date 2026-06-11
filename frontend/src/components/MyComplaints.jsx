import { useState, useEffect } from 'react'
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Button, Card, CardContent } from '@mui/material'
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
    switch (status) {
      case "Resolved":
        return "success";
      case "In Progress":
        return "warning";
      default:
        return "error";
    }
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8", p: 4}}>
      <Card sx={{ maxWidth: 1100, mx: "auto", borderRadius: 3, boxShadow: 5  }}>
        <CardContent>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>My Complaints</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Total complaints: {complaints.length}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Click on a complaint to view full details
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
              <TableCell></TableCell>
          
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
              complaints.map((c) => (             //loop through each complaint and display in table
                <TableRow key={c.id} hover onClick={()=> navigate("/details", {state: c})
                }
                sx={{
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": {backgroundColor: "#f9fafb"},
                }}
                >
                  <TableCell>{c.id}</TableCell>
                  <TableCell>{c.title}</TableCell>
                  <TableCell>{c.category}</TableCell>
                  <TableCell>{c.dateSubmitted}</TableCell>
                  <TableCell>
                    <Chip label={c.status} color={getStatusColor(c.status)} size="small" sx={{ fontWeight: 600 }} />
                  </TableCell>
                  <TableCell>
                    
                    <Button  size="small"  variant="outlined"onClick={() => navigate(`/submit/${c.id}`)}>
                      Delete
                    </Button>
                    
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      </CardContent>
    </Card>
    </Box>
  )
}

export default MyComplaints