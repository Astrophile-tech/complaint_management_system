import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Card, CardContent, Typography, TextField, Button,
  Alert, Divider, Avatar
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import api from '../utils/api';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: '', email: '', role: '' });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await api.get('/users/profile');
        setProfile({ name: data.name, email: data.email, role: data.role });
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setError(''); setSuccess('');
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
    setError(''); setSuccess('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');

    if (passwords.newPassword && passwords.newPassword !== passwords.confirmPassword) {
      setError('New passwords do not match.'); return;
    }
    if (passwords.newPassword && passwords.newPassword.length < 6) {
      setError('New password must be at least 6 characters.'); return;
    }

    setLoading(true);
    try {
      const body = { name: profile.name, email: profile.email };
      if (passwords.newPassword) {
        body.currentPassword = passwords.currentPassword;
        body.newPassword = passwords.newPassword;
      }

      const data = await api.put('/users/profile', body);
      setProfile({ name: data.name, email: data.email, role: data.role });

      // keep currentUser in sync for sidebar/dashboard
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      localStorage.setItem('currentUser', JSON.stringify({ ...currentUser, name: data.name, email: data.email }));

      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setSuccess('Profile updated successfully.');
    } catch (err) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout', {});
    } catch (err) {
      // ignore network errors on logout
      console.error(err)
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      navigate('/login', { replace: true });
    }
  };

  return (
    <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ width: '100%', maxWidth: 600, borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <Avatar sx={{ bgcolor: '#0f5f56', width: 56, height: 56 }}>
              <PersonIcon fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight="bold">{profile.name || 'Profile'}</Typography>
              <Typography variant="body2" color="text.secondary" textTransform="capitalize">
                {profile.role}
              </Typography>
            </Box>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <Box component="form" onSubmit={handleSave} sx={{ display: 'grid', gap: 2 }}>
            <TextField
              label="Name"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleProfileChange}
              fullWidth
            />

            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2" color="text.secondary">
              Change Password (optional)
            </Typography>

            <TextField
              label="Current Password"
              name="currentPassword"
              type="password"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
              fullWidth
            />
            <TextField
              label="New Password"
              name="newPassword"
              type="password"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              fullWidth
            />
            <TextField
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              fullWidth
            />

            <Button type="submit" variant="contained" disabled={loading} sx={{ bgcolor: '#0f5f56', '&:hover': { bgcolor: '#0c4a43' } }}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>

            <Button
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;