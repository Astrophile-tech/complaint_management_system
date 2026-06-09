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

function ComplaintStatus() {
  const steps = [
    "Complaint Submitted",
    "Under Review",
    "In Progress",
    "Resolved",
  ];

  const activeStep = 2; // 0-based index (currently "In Progress")

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 800,
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Complaint Status
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Track the current progress of your complaint.
          </Typography>

          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box
            sx={{
              mt: 5,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Chip
              label="In Progress"
              color="warning"
              size="medium"
              sx={{
                fontWeight: "bold",
                fontSize: "0.95rem",
                px: 1,
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ComplaintStatus;