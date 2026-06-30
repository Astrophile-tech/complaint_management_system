import { useEffect, useState } from 'react'
import { Box, Typography, TextField, MenuItem, Button, Card, CardContent, Alert, CircularProgress } from '@mui/material'
import { CATEGORIES, PRIMARY, PRIMARY_DARK } from '../utils/Constants'
import { useLocation, useNavigate } from 'react-router-dom'

function SubmitComplaint({ addComplaint, updateComplaint }) {
  const navigate = useNavigate();
  const location = useLocation();
  const editComplaint = location.state?.editComplaint;
  const isEditMode = Boolean(editComplaint);
  
  const [values, setValues] = useState({ title: '', category: '', location: '', description: '' })
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editComplaint) {
      setValues({
        title: editComplaint.title || '',
        category: editComplaint.category || '',
        location: editComplaint.location || '',
        description: editComplaint.description || '',
      });
    } else {
      setValues({ title: '', category: '', location: '', description: '' });
    }
  }, [editComplaint]);

  const handleChange = field => event => {          //update the form state
    setValues(prev => ({...prev, [field]: event.target.value }))
  }

  const handleSubmit = async event => {
    event.preventDefault()

     if (!values.title || !values.category || !values.location || !values.description) {
      setError('Please fill in all fields.');
      return;
    }

     setLoading(true);              // disable submit button to prevent double clicks
    try {
      if (isEditMode) {
        await updateComplaint({ id: editComplaint.id, ...values });
      } else {
        await addComplaint(values);       // handled in App.jsx → api.post('/complaints', ...)
      }
      navigate('/mycomplaints');
    } catch (err) {
      setError(err.message || 'Failed to submit complaint.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        bgcolor: PRIMARY, 
        color: '#ffffff', 
        p: 3, 
        mb: 3, 
        borderRadius: 2,
        boxShadow: 2
      }}>
        <Typography variant="h5" mb={1}>{isEditMode ? 'Edit Complaint' : 'Submit a New Complaint'}</Typography>
        <Typography variant="body2">
          {isEditMode ? 'Update the complaint details below.' : 'Fill in the details below to add a complaint to the system.'}
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
            
            <Button type="submit" variant="contained" disabled={loading} startIcon={loading && <CircularProgress size={16} color="inherit" />}
             sx={{ bgcolor: PRIMARY, '&:hover': { bgcolor: PRIMARY_DARK } }}>
               {loading ? (isEditMode ? 'Updating…' : 'Submitting…') : (isEditMode ? 'Update Complaint' : 'Submit Complaint')}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default SubmitComplaint