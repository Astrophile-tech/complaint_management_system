import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Box, Button, TextField, Typography, Paper, MenuItem, Alert, Container 
} from '@mui/material';


import { FormControl, InputLabel, Select,  } from '@mui/material';


const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });
     const [error, setError] = useState('');
      const [success, setSuccess] = useState('');
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
        };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
    if (users.find(u => u.email === formData.email)) {
      setError('Email already registered');
      return;
    }

    // Create new user with ID
    const newUser = {
      id: `U${users.length + 1}`,
      ...formData
    };

    // Save to localStorage
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    
    setSuccess('Registration successful! Redirecting to login...');
    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
<FormControl fullWidth margin="normal">
  <InputLabel>Role</InputLabel>
  <Select
    name="role"
    value={formData.role}
    onChange={handleChange}
    label="Role"
  >
    <MenuItem value="student">student</MenuItem>
    <MenuItem value="admin">admin</MenuItem>
  </Select>
</FormControl>
     
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>

          <Typography align="center">
            Already have an account?{' '}
            <Link to="/login" style={{ textDecoration: 'none' }}>
              Login here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;