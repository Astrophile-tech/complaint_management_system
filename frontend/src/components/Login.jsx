import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Box, Button, TextField, Typography, Paper, Checkbox,
  FormControlLabel, InputAdornment
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';

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
    <>
      <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      margin: 0,
    }}>
      {/* Left green panel */}
      <Box sx={{
        flex: 1,
        bgcolor: '#0f5f56',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        p: 4
      }}>
       <SecurityIcon sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h3" fontWeight={800} letterSpacing={2}>
          COMPLAINT CONNECT
        </Typography>
        <Typography variant="body1" color="#000" textAlign="center" mt={4}>
          EFFORTLESS RESOLUTION
        </Typography>
        <Typography variant="body1" color="#000" textAlign="center">
          STARTS HERE.
        </Typography>
      </Box>

      {/* Right form panel */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#e8eaed',
        p: 3
      }}>
        <Paper elevation={3} sx={{ p: 5, width: '100%', maxWidth: 420, borderRadius: 3 }}>
          <Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    mb: 3
  }}
>
  <SecurityIcon
    sx={{
      fontSize: 55,
      color: '#0f5f56',
      mb: 1
    }}
  />

  <Typography
    variant="h4"
    fontWeight={800}
    textAlign="center"
    color="#000"
  >
    Welcome Back
  </Typography>

  <Typography
    variant="body2"
    color="text.secondary"
    textAlign="center"
    mt={1}
  >
    Sign in to manage your submissions
  </Typography>
</Box>
          <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
            Sign in to manage your submissions
          </Typography>

          {error && (
            <Typography color="error" variant="body2" textAlign="center" mb={2}>
              {error}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              placeholder="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon fontSize="small" color="action" />
                  </InputAdornment>
                )
              }}
            />
            <TextField
              fullWidth
              placeholder="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon fontSize="small" color="action" />
                  </InputAdornment>
                )
              }}
            />

            <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    mt: 1
  }}
>
  <FormControlLabel
    sx={{ m: 0 }}
    control={<Checkbox size="small" />}
    label="Remember me"
  />
<Link
    to="/forgot-password"
    style={{
      color: '#0f5f56',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: 500
    }}
  >
    Forgot Password?
  </Link>

</Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2, mb: 2, py: 1.2,
                bgcolor: '#0f5f56',
                '&:hover': { bgcolor: '#0c4a43' },
                fontWeight: 600,
                letterSpacing: 1
              }}
            >
              LOG IN
            </Button>
          </Box>
        <Typography align="center" variant="body2">
        Don't have an account?{' '}

        <Link to="/register" style={{ color: '#0f5f56', fontWeight: 700, textDecoration: 'none' }}>
              Register Now
        </Link>
          </Typography>
        </Paper>
      </Box>
    </Box>
    </>
  );
};

export default Login;