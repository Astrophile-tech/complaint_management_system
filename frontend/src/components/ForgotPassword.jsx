import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Button, TextField, Typography, Paper, InputAdornment
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import SecurityIcon from '@mui/icons-material/Security';

const greenInput = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: '#0f5f56' },
    '&:hover fieldset': { borderColor: '#0f5f56' },
    '&.Mui-focused fieldset': { borderColor: '#0f5f56' },
  }
};

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    // TODO: connect to backend later
    setSent(true);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: '#e8eaed',
      p: 3
    }}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 420, borderRadius: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" mb={2} width="100%">
          <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mb: 2
  }}
>
  <SecurityIcon
    sx={{
      fontSize: 60,
      color: '#0f5f56',
      mr: 1
    }}
  />

  <Box>
    <Typography
      sx={{
        color: '#0f5f56',
        fontWeight: 800,
        fontSize: '1.4rem',
        lineHeight: 1,
        letterSpacing: '1px'
      }}
    >
      COMPLAINT
    </Typography>

    <Typography
      sx={{
        color: '#0f5f56',
        fontWeight: 800,
        fontSize: '1.4rem',
        lineHeight: 1,
        letterSpacing: '1px'
      }}
    >
      CONNECT
    </Typography>
  </Box>
</Box>
          <Typography variant="h5" fontWeight={700} mt={2} color="#000">
            Reset Your Password
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Enter the email associated with your account and we'll send instructions.
          </Typography>
        </Box>

        {sent ? (
          <Typography color="success.main" variant="body2" textAlign="center" mb={2}>
            If an account exists for {email}, a reset link has been sent.
          </Typography>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              placeholder="Account Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="dense"
              required
              sx={greenInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon fontSize="small" color="action" />
                  </InputAdornment>
                )
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2, mb: 1.5, py: 1,
                bgcolor: '#0f5f56',
                '&:hover': { bgcolor: '#0c4a43' },
                fontWeight: 600,
                letterSpacing: 1
              }}
            >
              SEND RESET LINK
            </Button>
          </Box>
        )}

        <Typography align="center" variant="body2">
          Remembered your password?{' '}
          <Link to="/login" style={{ color: '#0f5f56', fontWeight: 700, textDecoration: 'none' }}>
            Back to Log In
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default ForgetPassword;