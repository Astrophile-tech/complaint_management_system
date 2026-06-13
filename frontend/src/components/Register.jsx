import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box, Button, TextField, Typography, Paper,
  Radio, RadioGroup, FormControlLabel, InputAdornment, Alert
} from '@mui/material';

import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';

const greenInput = {
  mb: 1.5,
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#fff',
    '& fieldset': { borderColor: '#0f766e' },
    '&:hover fieldset': { borderColor: '#115e59' },
    '&.Mui-focused fieldset': { borderColor: '#0f766e', borderWidth: '2px' },
  }
};

const greenRadio = {
  color: '#0f766e',
  '&.Mui-checked': { color: '#0f766e' }
};

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fristName: '',
    lastName:'',
    email: '',    
    role: '',
    password: '',
    confirmPassword: ''
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

     if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    
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
    <>
      <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: '#f8fafc', // Ultra-clean, modern background tint
      p: 2
    }}>
      <Paper 
        elevation={4} 
        sx={{ 
          p: 4.5, 
          width: '100%', 
          maxWidth: 440, 
          borderRadius: 4,
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.06)'
        }}
      >
        {/* Centered Header branding block */}
        <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" mb={3}>
          {/* Logo Icon on top, Text underneath */}
        <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    mb: 2
  }}
>
  <SecurityIcon
    sx={{
      fontSize: 62,
      color: '#0f766e',
      mr: 1
    }}
  />

  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    <Typography
      sx={{
        color: '#0f766e',
        fontWeight: 800,
        fontSize: '1.35rem',
        lineHeight: 1.05,
        letterSpacing: '1px'
      }}
    >
      COMPLAINT
    </Typography>

    <Typography
      sx={{
        color: '#0f766e',
        fontWeight: 800,
        fontSize: '1.35rem',
        lineHeight: 1.05,
        letterSpacing: '1px'
      }}
    >
      CONNECT
    </Typography>
  </Box>
</Box>
       <Typography variant="h5" fontWeight={700} color="#1e293b">
            Create An Account
          </Typography>
        </Box>
          

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
           {/* First & Last Name row split */}
          <Box display="flex" gap={2}>
            <TextField
              fullWidth
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              sx={greenInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon fontSize="small" sx={{ color: '#94a3b8' }} />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              fullWidth
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              sx={greenInput}
            />
          </Box>

          {/* Email Address */}
          <TextField
            fullWidth
            placeholder="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}           
            required
            sx={greenInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon fontSize="small" sx={{ color: '#94a3b8' }} />
                </InputAdornment>
              )
            }}
          />

        {/* Role selector block */}
          <Box sx={{ mb: 1.5, px: 0.5 }}>
            <Typography variant="body2" fontWeight={600} color="#475569" mb={0.5}>
              Register As
            </Typography>
            <RadioGroup
              row
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <FormControlLabel 
                value="student" 
                control={<Radio size="small" sx={greenRadio} />} 
                label={<Typography variant="body2" color="#334155" fontWeight={500}>Student</Typography>} 
              />
              <FormControlLabel 
                value="admin" 
                control={<Radio size="small" sx={greenRadio} />} 
                label={<Typography variant="body2" color="#334155" fontWeight={500}>Authority</Typography>} 
              />
            </RadioGroup>
          </Box>

          {/* Password Input */}
          <TextField
            fullWidth
            placeholder="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            sx={greenInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon fontSize="small" sx={{ color: '#94a3b8' }} />
                </InputAdornment>
              )
            }}
          />

          {/* Confirm Password Input */}
       <TextField
            fullWidth 
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}  
            onChange={handleChange}
            required
          sx={greenInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon fontSize="small" sx={{ color: '#94a3b8' }} />
                </InputAdornment>
              )
            }}
          />

          {/* Form Submit Action Button */}
     
          <Button
            type="submit"
            fullWidth
            variant="contained"
           elevation={0}
            sx={{
              mt: 1, mb: 2.5, py: 1.2,
              borderRadius: '8px',
              bgcolor: '#0f766e',
              '&:hover': { bgcolor: '#115e59' },
              fontWeight: 700,
              fontSize: '0.95rem',
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}
          >
            Register
          </Button>

         {/* Core Navigation Toggle Link */}
          <Typography align="center" variant="body2" color="#64748b">
            Already have an account?{' '}
           <Link to="/login" style={{ color: '#0f766e', fontWeight: 700, textDecoration: 'none' }}>
              Log In
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
    </>
  );
};

export default Register;