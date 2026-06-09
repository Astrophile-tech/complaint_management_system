import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
} from "@mui/material";

function ComplaintDetails() {
  const complaint = {
    id: 101,
    title: "Network Issue",
    category: "Technical",
    description: "Internet connection is not working properly.",
    dateSubmitted: "08-06-2026",
    status: "Pending",
  };

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
          maxWidth: 700,
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            color="primary"
          >
            Complaint Details
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Complaint ID
            </Typography>
            <Typography variant="body1">{complaint.id}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Title
            </Typography>
            <Typography variant="body1">{complaint.title}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Category
            </Typography>
            <Typography variant="body1">{complaint.category}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Description
            </Typography>
            <Typography variant="body1">
              {complaint.description}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Date Submitted
            </Typography>
            <Typography variant="body1">
              {complaint.dateSubmitted}
            </Typography>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" mb={1}>
              Current Status
            </Typography>

            <Chip
              label={complaint.status}
              color="warning"
              sx={{
                fontWeight: "bold",
                px: 1,
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ComplaintDetails;