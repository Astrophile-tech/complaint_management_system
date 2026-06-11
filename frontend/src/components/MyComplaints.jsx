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
import { useNavigate } from "react-router-dom";

function MyComplaints() {
  const navigate = useNavigate();

  const complaints = [
    {
      id: 101,
      title: "Network Issue",
      category: "Technical",
      description: "Internet connection is not working properly.",
      dateSubmitted: "08-06-2026",
      status: "Pending",
    },
    {
      id: 102,
      title: "Water Leakage",
      category: "Maintenance",
      description: "Water leaking from ceiling.",
      dateSubmitted: "07-06-2026",
      status: "In Progress",
    },
    {
      id: 103,
      title: "Street Light Damage",
      category: "Infrastructure",
      description: "Street light not working.",
      dateSubmitted: "05-06-2026",
      status: "Resolved",
    },
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
    <Box sx={{ minHeight: "100vh", bgcolor: "#f4f6f8", p: 4 }}>
      <Card sx={{ maxWidth: 1100, mx: "auto", borderRadius: 3, boxShadow: 5 }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
            My Complaints
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Click on a complaint to view full details
          </Typography>

          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f0f0f0" }}>
                  <TableCell><b>ID</b></TableCell>
                  <TableCell><b>Title</b></TableCell>
                  <TableCell><b>Category</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {complaints.map((c) => (
                  <TableRow
                    key={c.id}
                    hover
                    onClick={() =>
                      navigate("/details", { state: c })
                    }
                    sx={{
                      cursor: "pointer",
                      transition: "0.2s",
                      "&:hover": { backgroundColor: "#f9fafb" },
                    }}
                  >
                    <TableCell>{c.id}</TableCell>
                    <TableCell>{c.title}</TableCell>
                    <TableCell>{c.category}</TableCell>
                    <TableCell>
                      <Chip
                        label={c.status}
                        color={getStatusColor(c.status)}
                        size="small"
                        sx={{ fontWeight: 600 }}
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