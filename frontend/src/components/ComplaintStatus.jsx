import {
  Box, Card, CardContent, Typography,
  Stepper, Step, StepLabel, Button, Divider,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import statusChip from '../utils/Helpers';
 
const STEPS = ['Submitted', 'Under Review', 'In Progress', 'Resolved'];
 
const STATUS_STEP_MAP = {
  'Pending':      0,
  'Under Review': 1,
  'In Progress':  2,
  'Resolved':     3,
};
 
const STATUS_MESSAGES = {
  'Pending':      'Your complaint has been received and is waiting to be reviewed.',
  'Under Review': 'An administrator is currently reviewing your complaint.',
  'In Progress':  'Action is being taken to resolve your complaint.',
  'Resolved':     'Your complaint has been resolved. Check the resolution note for details.',
};
 
function ComplaintStatus() {
  const location = useLocation();
  const navigate  = useNavigate();
  const complaint = location.state;
 
  if (!complaint) {
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ maxWidth: 500, width: '100%', p: 3, borderRadius: 3 }}>
          <Typography variant="h6" color="text.secondary" textAlign="center">
            No complaint data found.
          </Typography>
          <Button fullWidth variant="outlined" sx={{ mt: 2 }} onClick={() => navigate('/mycomplaints')}>
            Go to My Complaints
          </Button>
        </Card>
      </Box>
    );
  }
 
  const activeStep = STATUS_STEP_MAP[complaint.status] ?? 0;
  const shortId    = String(complaint.id).slice(-6).toUpperCase();
 
  return (
    <Box sx={{
      minHeight: '100vh', bgcolor: '#f4f6f8',
      display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
      p: 3, pt: 5,
    }}>
      <Card sx={{ width: '100%', maxWidth: 850, borderRadius: 3, boxShadow: 5 }}>
        <CardContent sx={{ p: 4 }}>
 
          {/* ── Header ── */}
          <Typography variant="h4" color='primary' sx={{ flexGrow: 1, textAlign: '', fontWeight: 'bold', fontFamily: 'Playfair Display', letterSpacing: 2 }}>
            Complaint Tracking
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Real-time progress of your complaint
          </Typography>
 
          <Divider sx={{ mb: 3 }} />
 
          {/* ── Info ── */}
          <Box sx={{display:"flex", gap:4, flexWrap:"wrap", mb:3, justifyContent:'center'}}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" fontWeight={700}
                sx={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <b>Complaint ID</b>
              </Typography>
              <Typography fontFamily="monospace" fontWeight={600}>#{shortId}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" fontWeight={700}
                sx={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <b>Title</b>
              </Typography>
              <Typography fontWeight={600}>{complaint.title}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" fontWeight={700}
                sx={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <b>Current Status</b>
              </Typography>
              <Box mt={0.5}>{statusChip(complaint.status)}</Box>
            </Box>
          </Box>
 
          {/* ── Stepper ── */}
          <Box sx={{ bgcolor: '#f8fafc', borderRadius: 2, p: 3, mb: 3 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {STEPS.map((label, idx) => (
                <Step key={label} completed={idx < activeStep}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
 
          {/* ── Status message ── */}
          <Box sx={{
            bgcolor: complaint.status === 'Resolved' ? '#f0fdf4' : '#eff6ff',
            border: '1px solid',
            borderColor: complaint.status === 'Resolved' ? '#bbf7d0' : '#bfdbfe',
            borderRadius: 2, p: 2, mb: 3,
          }}>
            <Typography variant="body2" color="text.secondary">
              {STATUS_MESSAGES[complaint.status] || STATUS_MESSAGES['Pending']}
            </Typography>
          </Box>
 
          {/* ── Resolution note (if resolved) ── */}
          {complaint.resolution && (
            <Box sx={{
              bgcolor: '#f0fdf4', borderRadius: 2, p: 2, mb: 3,
              border: '1px solid', borderColor: '#bbf7d0',
            }}>
              <Typography variant="subtitle2" color="success.main" mb={0.5}>
                ✅ Resolution Note
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {complaint.resolution}
              </Typography>
            </Box>
          )}
 
          {/* ── Back button ── */}
          <Button
            variant="outlined"
            onClick={() => navigate('/details', { state: complaint })}
          >
            ← Back to Details
          </Button>
 
        </CardContent>
      </Card>
    </Box>
  );
}
 
export default ComplaintStatus;