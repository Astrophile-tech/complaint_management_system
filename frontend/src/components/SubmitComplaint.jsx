import { useState } from 'react'
import { Box, Typography, TextField, MenuItem, Button, Card, CardContent, Alert } from '@mui/material'
import { CATEGORIES } from '../utils/Constants'
import { useNavigate } from 'react-router-dom'

function SubmitComplaint({addComplaint, complaints}) {
  const navigate = useNavigate();
  
  const [values, setValues] = useState({ title: '', category: '', location: '', description: '' })
  const [error, setError] = useState('');

  const handleChange = field => event => {
    setValues(prev => ({...prev, [field]: event.target.value }))
  }

  const handleSubmit = event => {
    event.preventDefault()

     if (!values.title || !values.category || !values.location || !values.description) {
      setError('Please fill in all fields.');
      return;
    }

    // Get current logged-in user so complaint is linked to them
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

    // Generate unique ID based on current list length
    const nextNumber = (complaints?.length ?? 0) + 1;
    const complaintId = `C${String(nextNumber).padStart(3, '0')}`;

    const newComplaint = {
      id: complaintId,
      ...values,
      createdBy: currentUser?.id ?? 'unknown',
      createdDate: new Date().toISOString().split('T')[0],   // YYYY-MM-DD for sorting
      dateSubmitted: new Date().toLocaleDateString('en-GB'),  // DD/MM/YYYY for display
      status: 'Pending',
      resolution: '',
    };

     // Update shared state in App (which also syncs localStorage)
    addComplaint(newComplaint);

    navigate('/mycomplaints');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        bgcolor: '#012243', 
        color: '#ffffff', 
        p: 3, 
        mb: 3, 
        borderRadius: 2,
        boxShadow: 2
      }}>
        <Typography variant="h5" mb={1}>Submit a New Complaint</Typography>
        <Typography variant="body2">
          Fill in the details below to add a complaint to the system.
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Card>
        <CardContent>
          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
            
            <TextField
              label="Complaint Title"
              value={values.title}
              onChange={handleChange('title')}
              required
            />
            
            <TextField
              select
              label="Category"
              value={values.category}
              onChange={handleChange('category')}
              required
            >
              {CATEGORIES.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            
            <TextField
              label="Location"
              value={values.location}
              onChange={handleChange('location')}
              required
            />
            
            <TextField
              label="Description"
              multiline
              rows={4}
              value={values.description}
              onChange={handleChange('description')}
              required
            />
            
            <Button type="submit" variant="contained">Submit</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default SubmitComplaint