// Dashboard.jsx

import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, TextField, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import AddHostelForm from "./AddHostelForm";
import ViewHostel from "./ViewHostel";
import axios from "axios";

const Dashboard = () => {
  const [isAddingHostel, setIsAddingHostel] = useState(false);
  const [hostels, setHostels] = useState([]);

  // Fetch hostels from API
  const fetchHostels = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/hostels");
      setHostels(res.data);
    } catch (err) {
      console.error("Failed to fetch hostels:", err);
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  return (
    <Box p={4}>
      {/* Header Section */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box
          sx={{
            bgcolor: "primary.light",
            opacity: 0.1,
            p: 2,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 2,
          }}
        >
          <HomeIcon color="primary" sx={{ fontSize: 32 }} />
        </Box>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Hostel Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Efficiently manage and track hostel information
          </Typography>
        </Box>
      </Box>

      {/* Search + Add Hostel Button */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Search hostels by name, location, room type..."
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ color: "action.active", mr: 1 }} />
              ),
            }}
          />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              onClick={() => setIsAddingHostel(true)}
            >
              Add New Hostel
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Conditionally Render AddHostelForm */}
      {isAddingHostel ? (
        <AddHostelForm
          fetchHostels={fetchHostels}
          onClose={() => setIsAddingHostel(false)}
        />
      ) : (
        <ViewHostel hostels={hostels} fetchHostels={fetchHostels} />
      )}
    </Box>
  );
};

export default Dashboard;
