import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";


function ComplaintDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const complaint = location.state;

  if (!complaint) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>No complaint selected.</Typography>
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
      <Card sx={{ width: "100%", maxWidth: 750, borderRadius: 3, boxShadow: 5 }}>
        <CardContent sx={{ p: 4 }}>
           <Typography variant="h4" fontWeight="bold" color="primary">
            Complaint Details
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Full information about your complaint
          </Typography>

           <Divider sx={{ mb: 3 }} />

         <Stack spacing={1}>
            <Typography><b>ID:</b> {complaint.id}</Typography>
            <Typography><b>Title:</b> {complaint.title}</Typography>
            <Typography><b>Category:</b> {complaint.category}</Typography>
            <Typography><b>Description:</b> {complaint.description}</Typography>
            <Typography><b>Date:</b> {complaint.dateSubmitted}</Typography>
          </Stack>

          <Chip
            label={complaint.status}
            color="warning"
            sx={{ mt: 3, fontWeight: 600 }}
          />

            <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3, py: 1.2, fontWeight: 600 }}
            onClick={() =>
              navigate("/status", { state: complaint })
            }
          >
            Track Complaint Status
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ComplaintDetails;