import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Chip, Button
} from '@mui/material';

const AdminViewComplaints = () => {
  const navigate = useNavigate();//change the page
  const [complaints, setComplaints] = useState([]);//complaint variable to store complaints data
  const [users, setUsers] = useState([]);//users variable to store users data

  useEffect(() => {
    const allComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setComplaints(allComplaints);//put complaints data in complaints variable
    setUsers(allUsers);//put users data in users variable
  }, []);

  const getStudentName = (userId) => {               //function to get student name from user id
    const user = users.find(u => u.id === userId);
    return user? user.name : 'Unknown Student';
  };

  const getStatusColor = (status) => {
    if (status === 'Resolved') return 'success';
    if (status === 'In Progress') return 'warning';
    return 'default'; // Pending
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        All Student Complaints
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Student Name</strong></TableCell>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="center"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {complaints.length === 0? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No complaints submitted yet
                </TableCell>
              </TableRow>
            ) : (
              complaints.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.id}</TableCell>
                  <TableCell>{getStudentName(c.userId)}</TableCell>
                  <TableCell>{c.title}</TableCell>
                  <TableCell>{c.category}</TableCell>
                  <TableCell>{c.date}</TableCell>
                  <TableCell>
                    <Chip 
                      label={c.status} 
                      color={getStatusColor(c.status)} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button 
                      size="small" 
                      variant="contained"
                      onClick={() => navigate(`/admin-complaint-details/${c.id}`)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminViewComplaints;
