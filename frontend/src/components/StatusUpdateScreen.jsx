import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
} from "@mui/material";

const StatusUpdateScreen = () => {
  const [status, setStatus] = useState("Pending");

  return (
    <Box p={4}>
      <Card>
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
          >
            Status Update Screen
          </Typography>

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>

            <Select
              value={status}
              label="Status"
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >
              <MenuItem value="Pending">
                Pending
              </MenuItem>

              <MenuItem value="In Progress">
                In Progress
              </MenuItem>

              <MenuItem value="Resolved">
                Resolved
              </MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            sx={{ mt: 3 }}
          >
            Update Status
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StatusUpdateScreen;