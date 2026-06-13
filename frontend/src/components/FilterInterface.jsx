import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";

const FilterInterface = () => {
  const [category, setCategory] =
    useState("");

  const [status, setStatus] =
    useState("");

  return (
    <Box p={4}>
      <Card>
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
          >
            Filter Interface
          </Typography>

          <FormControl
            fullWidth
            sx={{ mb: 3 }}
          >
            <InputLabel>
              Category
            </InputLabel>

            <Select
              value={category}
              label="Category"
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
            >
              <MenuItem value="">
                All
              </MenuItem>

              <MenuItem value="Classroom">
                Classroom
              </MenuItem>

              <MenuItem value="Hostel">
                Hostel
              </MenuItem>

              <MenuItem value="Library">
                Library
              </MenuItem>

              <MenuItem value="Internet">
                Internet
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>
              Status
            </InputLabel>

            <Select
              value={status}
              label="Status"
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
            >
              <MenuItem value="">
                All
              </MenuItem>

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
        </CardContent>
      </Card>
    </Box>
  );
};

export default FilterInterface;