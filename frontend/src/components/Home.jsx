import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Paper } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import { PRIMARY, PRIMARY_DARK } from '../utils/Constants';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f7f8' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          minHeight: '100vh'
        }}
      >
        <Box
          sx={{
            flex: 1,
            bgcolor: PRIMARY,
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 6, md: 8 },
            textAlign: 'center'
          }}
        >
          <SecurityIcon sx={{ fontSize: 72, mb: 2 }} />
          <Typography variant="h3" fontWeight={800} letterSpacing={1.5}>
            COMPLAINT CONNECT
          </Typography>
          <Typography variant="h6" sx={{ mt: 3, maxWidth: 520, color: '#d5f6ec' }}>
            A smarter way for students and administrators to resolve campus issues fast.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, maxWidth: 480, color: '#d5f6ec' }}>
            Raise concerns, track status, and keep your campus community connected.
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 4, md: 8 }
          }}
        >
          <Paper elevation={8} sx={{ width: '100%', maxWidth: 520, borderRadius: 4, p: { xs: 4, md: 5 } }}>
            <Typography variant="overline" sx={{ color: PRIMARY, letterSpacing: 2, fontWeight: 700 }}>
              WELCOME TO COMPLAINT CONNECT
            </Typography>
            <Typography variant="h4" fontWeight={800} sx={{ mt: 2, mb: 2, lineHeight: 1.05 }}>
              Start resolving complaints with clarity and confidence.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Use the Complaint Management System to submit concerns, follow progress, and ensure every issue is heard.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 4 }}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                onClick={() => navigate('/login')}
                sx={{
                  bgcolor: PRIMARY,
                  '&:hover': { bgcolor: PRIMARY_DARK },
                  fontWeight: 700,
                  py: 1.5
                }}
              >
                Get Started
              </Button>
              <Button
                fullWidth
                size="large"
                variant="contained"
                onClick={() => navigate('/register')}
                sx={{
                  borderColor: PRIMARY,
                  '&:hover': {borderColor: PRIMARY_DARK }
                }}
              >
                Create Account
              </Button>
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2
              }}
            >
              <Box sx={{ p: 3, bgcolor: '#f7fafc', borderRadius: 3 }}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1, color: PRIMARY }}>
                  Fast submission
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Report issues in seconds with a simple complaint form.
                </Typography>
              </Box>
              <Box sx={{ p: 3, bgcolor: '#f7fafc', borderRadius: 3 }}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1, color: PRIMARY }}>
                  Real-time updates
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Monitor the status of every request from one dashboard.
                </Typography>
              </Box>
              <Box sx={{ p: 3, bgcolor: '#f7fafc', borderRadius: 3 }}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1, color: PRIMARY }}>
                  Secure access
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Keep student and admin workflows protected by design.
                </Typography>
              </Box>
              <Box sx={{ p: 3, bgcolor: '#f7fafc', borderRadius: 3 }}>
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1, color: PRIMARY }}>
                  Campus collaboration
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Help teams resolve issues faster with clear communication.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
