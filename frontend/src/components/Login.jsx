import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Box, Button, TextField, Typography, Paper, Alert, Container 
} from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find matching user
    const user = users.find(
      u => u.email === formData.email && u.password === formData.password
    );

    if (!user) {
      setError('Invalid email or password. Only registered users can login.');
      return;
    }

    // Save current user session
    localStorage.setItem('currentUser', JSON.stringify(user));

    // role based login
    if (user.role === 'admin') {
      navigate('/admindash');
    } else {
      navigate('/studentdash'); // Student dashboard
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

       
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>} { /* Display error if error exists */}

        <Box component="form" onSubmit={handleSubmit}> 
            {/* Form fields */ }
          <TextField fullWidth label="Email"name="email" type="email" value={formData.email} onChange={handleChange} margin="normal" required/>
          <TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} margin="normal"required />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
          {/* Register link */ }
          <Typography align="center">
            Don't have an account?{' '}
            <Link to="/register" style={{ textDecoration: 'none' }}>
              Register here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;