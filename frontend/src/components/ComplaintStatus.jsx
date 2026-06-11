import {
  Box,
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Chip,
} from "@mui/material";
import { useLocation } from "react-router-dom";

function ComplaintStatus() {
  const location = useLocation();
  const complaint = location.state;

  const steps = [
    "Submitted",
    "Under Review",
    "In Progress",
    "Resolved",
  ];

  const statusMap = {
    Pending: 0,
    "Under Review": 1,
    "In Progress": 2,
    Resolved: 3,
  };

  const activeStep = statusMap[complaint?.status] ?? 0;

  if (!complaint) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>No complaint data found.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f6f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Card sx={{ width: "100%", maxWidth: 850, borderRadius: 3, boxShadow: 5 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Complaint Tracking
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Track real-time progress of your complaint
          </Typography>

          <Typography sx={{ mb: 1 }}>
            <b>ID:</b> {complaint.id}
          </Typography>

          <Typography sx={{ mb: 3 }}>
            <b>Title:</b> {complaint.title}
          </Typography>

          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <Chip
              label={complaint.status}
              color="primary"
              sx={{ fontWeight: 600, px: 1 }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ComplaintStatus;