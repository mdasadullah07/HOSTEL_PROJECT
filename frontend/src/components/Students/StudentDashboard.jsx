// StudentDashboard.jsx

import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, TextField, Button } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import AddStudentForm from "./AddStudentForm";
import ViewStudents from "./ViewStudent";
import axios from "axios";

const StudentDashboard = () => {
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/students");
      setStudents(res.data);
    } catch (err) {
      console.error("Failed to fetch students:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Box p={4}>
      {/* Header */}
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
          <SchoolIcon color="primary" sx={{ fontSize: 32 }} />
        </Box>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Student Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Efficiently manage and track student information
          </Typography>
        </Box>
      </Box>

      {/* Search + Add Button */}
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
            placeholder="Search students by name, mobile, class, etc."
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
              onClick={() => setIsAddingStudent(true)}
            >
              Add New Student
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Form or List */}
      {isAddingStudent ? (
        <AddStudentForm
          fetchStudents={fetchStudents}
          onClose={() => setIsAddingStudent(false)}
        />
      ) : (
        <ViewStudents students={students} fetchStudents={fetchStudents} />
      )}
    </Box>
  );
};

export default StudentDashboard;
