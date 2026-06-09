import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function MyComplaints() {
  const complaints = [
    { id: 101, title: "Network Issue", status: "Pending" },
    { id: 102, title: "Water Leakage", status: "In Progress" },
    { id: 103, title: "Street Light Damage", status: "Resolved" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "success";
      case "In Progress":
        return "warning";
      default:
        return "error";
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
        p: 4,
      }}
    >
      <Card
        sx={{
          maxWidth: 1000,
          mx: "auto",
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            My Complaints
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            View and track all complaints submitted by you.
          </Typography>

          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f3f4f6" }}>
                  <TableCell>
                    <strong>Complaint ID</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Complaint Title</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Status</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {complaints.map((complaint) => (
                  <TableRow
                    key={complaint.id}
                    hover
                    sx={{
                      cursor: "pointer",
                      transition: "0.2s",
                    }}
                  >
                    <TableCell>{complaint.id}</TableCell>

                    <TableCell>{complaint.title}</TableCell>

                    <TableCell>
                      <Chip
                        label={complaint.status}
                        color={getStatusColor(complaint.status)}
                        size="small"
                        sx={{ fontWeight: "bold" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}

export default MyComplaints;