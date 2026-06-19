import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Box, Button, TextField, Typography, Paper, Checkbox,
  FormControlLabel, InputAdornment,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import api from '../utils/api';
import { PRIMARY, PRIMARY_DARK, BG_LIGHT } from '../utils/Constants';

const Login = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState('student'); // 'student' | 'admin'
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLoginTypeChange = (e, value) => {
    if (value) {
      setLoginType(value);
      setFormData({ email: '', password: '' });
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

     try {
      let data;
      if (loginType === 'admin') {
        data = await api.post('/auth/admin-login', { password: formData.password });
      } else {
        data = await api.post('/auth/login', { email: formData.email, password: formData.password });
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
    
    
    if (data.user.role === 'admin') {
        navigate('/admindash');
      } else {
        navigate('/studentdash');
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box sx={{
      minHeight: '100vh',
    display: 'flex',
    width: '100%',
    }}>
      {/* Left green panel */}
      <Box sx={{
        flex: 1,
        bgcolor: PRIMARY,
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
        bgcolor: BG_LIGHT,
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
      color: PRIMARY,
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
           {/* Login type toggle */}
            <Box display="flex" justifyContent="center" mb={2}>
              <ToggleButtonGroup
                value={loginType}
                exclusive
                onChange={handleLoginTypeChange}
                size="small"
              >
                <ToggleButton value="student" sx={{ px: 3 }}>Student</ToggleButton>
                <ToggleButton value="admin" sx={{ px: 3 }}>Admin</ToggleButton>
              </ToggleButtonGroup>
            </Box>

          {error && (
            <Typography color="error" variant="body2" textAlign="center" mb={2}>
              {error}
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            {loginType === 'student' && (
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
            )}
            <TextField
              fullWidth
              placeholder={loginType === 'admin' ? 'Admin Password' : 'Password'}
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
{loginType === 'student' && (
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
)}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 2, mb: 2, py: 1.2,
                bgcolor: PRIMARY,
                '&:hover': { bgcolor: PRIMARY_DARK },
                fontWeight: 600,
                letterSpacing: 1
              }}
            >
              {loading ? 'LOGGING IN...' : 'LOG IN'}
            </Button>
          </Box>

        {loginType === 'student' && (
        <Typography align="center" variant="body2">
        Don't have an account?{' '}

          <Link to="/register" style={{ color: PRIMARY, fontWeight: 700, textDecoration: 'none' }}>
              Register Now
        </Link>
          </Typography>
        )}
        </Paper>
      </Box>
    </Box>
    </>
  );
};

export default Login;