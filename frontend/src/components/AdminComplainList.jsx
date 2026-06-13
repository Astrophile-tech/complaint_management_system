import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

const complaints = [
  {
    id: 1,
    title: "Fan Not Working",
    category: "Classroom",
    status: "Pending",
  },
  {
    id: 2,
    title: "WiFi Issue",
    category: "Internet",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Water Leakage",
    category: "Hostel",
    status: "Resolved",
  },
];

const AdminComplaintList = () => {
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Admin Complaint List
      </Typography>

      {complaints.map((complaint) => (
        <Card sx={{ mb: 2 }} key={complaint.id}>
          <CardContent>
            <Typography variant="h6">
              {complaint.title}
            </Typography>

            <Typography>
              Category: {complaint.category}
            </Typography>

            <Typography>
              Status: {complaint.status}
            </Typography>

            <Button
              variant="contained"
              sx={{ mt: 2 }}
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default AdminComplaintList;