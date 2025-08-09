// StudentForm.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Divider,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const StudentForm = ({ onClose, onSubmit,fetchStudents }) => {
  const [formData, setFormData] = useState({
    name: "",
    admissionNo: "",
    contact: "",
    email: "",
    dob: "",
    className: "",
    section: "",
    fatherName: "",
    motherName: "",
    gender: "",
    address: "",
    pincode: "",
  });
  // ✅ Input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Form submit handler
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://localhost:5000/api/students", formData);
    console.log("Student created:", response.data);
    alert("Student added successfully!");

    if (fetchStudents) fetchStudents(); // Refresh list
    setFormData({  // Reset form
      name: "",
      admissionNo: "",
      contact: "",
      email: "",
      dob: "",
      class: "",
      section: "",
      fatherName: "",
      motherName: "",
      gender: "",
      address: "",
      pincode: "",
    });
   

    if (onClose) onClose();
  } catch (error) {
    console.error("Error adding student:", error);
    alert(error.response?.data?.error || "Failed to add student.");
  }
};


  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Card sx={{ width: 800, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h5" mb={2} color="primary">
            Add New Student
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  name="name"
                  label="Student Name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="admissionNo"
                  label="Admission No."
                  value={formData.admissionNo}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="contact"
                  label="Contact"
                  value={formData.contact}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="dob"
                  label="Date of Birth"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="className"
                  label="ClassName"
                  value={formData.className}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="section"
                  label="Section"
                  value={formData.section}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="fatherName"
                  label="Father's Name"
                  value={formData.fatherName}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="motherName"
                  label="Mother's Name"
                  value={formData.motherName}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  name="gender"
                  label="Gender"
                  value={formData.gender}
                  onChange={handleChange}
                  fullWidth
                  required
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="address"
                  label="Address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                  multiline
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="pincode"
                  label="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentForm;
