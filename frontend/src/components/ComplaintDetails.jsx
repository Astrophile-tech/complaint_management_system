import {
  Box, Card, CardContent, Typography, Chip,
  Divider, Stack, Button,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { CAT_ICONS } from '../utils/Constants';
import statusChip from '../utils/Helpers';

function ComplaintDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const complaint = location.state;

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const isAdmin = currentUser?.role === 'admin';

  if (!complaint) {
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ maxWidth: 500, width: '100%', p: 3, borderRadius: 3 }}>
          <Typography variant="h6" color="text.secondary" textAlign="center">
            No complaint selected.
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => navigate(isAdmin ? '/admin-complaints' : '/mycomplaints')}
          >
            Go Back
          </Button>
        </Card>
      </Box>
    );
  }

  const shortId = String(complaint.id).slice(-6).toUpperCase();

  return (
    <Box sx={{
      minHeight: '100vh', bgcolor: '#f4f6f8',
      display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
      p: 3, pt: 5,
    }}>
      <Card sx={{ width: '100%', maxWidth: 750, borderRadius: 3, boxShadow: 5 }}>
        <CardContent sx={{ p: 4 }}>

          {/* ── Header ── */}
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
            <Box>
              <Typography variant="h4" fontWeight="bold" color="primary">
                Complaint Details
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Full information about this complaint
              </Typography>
            </Box>
            {statusChip(complaint.status)}
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* ── Details ── */}
          <Stack spacing={2}>
            <Box display="flex" gap={1}>
              <Typography fontWeight={700} minWidth={120}>ID</Typography>
              <Typography color="text.secondary" fontFamily="monospace">#{shortId}</Typography>
            </Box>

            <Box display="flex" gap={1}>
              <Typography fontWeight={700} minWidth={120}>Title</Typography>
              <Typography>{complaint.title}</Typography>
            </Box>

            <Box display="flex" gap={1} alignItems="center">
              <Typography fontWeight={700} minWidth={120}>Category</Typography>
              <Chip
                label={`${CAT_ICONS[complaint.category] ?? '📋'} ${complaint.category}`}
                size="small"
                variant="outlined"
              />
            </Box>

            <Box display="flex" gap={1}>
              <Typography fontWeight={700} minWidth={120}>Location</Typography>
              <Typography>{complaint.location || '—'}</Typography>
            </Box>

            <Box display="flex" gap={1}>
              <Typography fontWeight={700} minWidth={120}>Date Submitted</Typography>
              <Typography>{complaint.dateSubmitted || complaint.createdDate || '—'}</Typography>
            </Box>

            <Box>
              <Typography fontWeight={700} mb={0.5}>Description</Typography>
              <Box sx={{
                bgcolor: '#f8fafc', borderRadius: 2, p: 2,
                border: '1px solid', borderColor: 'divider',
              }}>
                <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                  {complaint.description}
                </Typography>
              </Box>
            </Box>

            {/* Resolution note — shown only when resolved */}
            {complaint.resolution && (
              <Box>
                <Typography fontWeight={700} mb={0.5} color="success.main">
                  ✅ Resolution Note
                </Typography>
                <Box sx={{
                  bgcolor: '#f0fdf4', borderRadius: 2, p: 2,
                  border: '1px solid', borderColor: '#bbf7d0',
                }}>
                  <Typography variant="body2" color="text.secondary" lineHeight={1.7}>
                    {complaint.resolution}
                  </Typography>
                </Box>
              </Box>
            )}
          </Stack>

          <Divider sx={{ my: 3 }} />

          {/* ── Actions ── */}
          <Box display="flex" gap={2} flexWrap="wrap">
            <Button
              variant="outlined"
              onClick={() => navigate(isAdmin ? '/admin-complaints' : '/mycomplaints')}
              sx={{ flex: 1 }}
            >
              ← Back to List
            </Button>

            {/* Students can track status; admins go to manage page */}
            {!isAdmin && (
              <Button
                variant="contained"
                sx={{ flex: 1, bgcolor: '#0f5f56', '&:hover': { bgcolor: '#0c4a43' } }}
                onClick={() => navigate('/status', { state: complaint })}
              >
                Track Status
              </Button>
            )}

            {isAdmin && complaint.status !== 'Resolved' && (
              <Button
                variant="contained"
                sx={{ flex: 1, bgcolor: '#0f5f56', '&:hover': { bgcolor: '#0c4a43' } }}
                onClick={() => navigate('/status-update')}
              >
                Manage Complaint
              </Button>
            )}
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
}

export default ComplaintDetails;