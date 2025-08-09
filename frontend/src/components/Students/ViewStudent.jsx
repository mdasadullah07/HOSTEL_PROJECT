// ViewStudent.jsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import axios from "axios";

// Student Card Component
const StudentPreviewCard = ({ student, fetchStudents }) => {
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({ ...student });

  // Delete Student
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/students/${student._id}`);
      fetchStudents();
    } catch (error) {
      console.error("Failed to delete student", error);
    }
  };

  // Update Student
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/students/${student._id}`, editData);
      fetchStudents();
      setOpenEdit(false);
    } catch (error) {
      console.error("Failed to update student", error);
    }
  };

  return (
    <>
      <Card sx={{ display: "flex", width: "100%", mb: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={1}>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  {student.name?.charAt(0).toUpperCase()}
                </Avatar>
              </Grid>

              {/* Student Info */}
              <Grid item xs={12} sm={5}>
                <Typography variant="h6" fontWeight="bold">
                  {student.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                  Admission No: {student.admissionNo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
                  {student.contact}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <EmailIcon fontSize="small" sx={{ mr: 1 }} />
                  {student.email}
                </Typography>
              </Grid>

              {/* Class & Hostel */}
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" color="text.secondary">
                  Class: {student.class} - {student.section}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gender: {student.gender}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pincode: {student.pincode}
                </Typography>
              </Grid>

              {/* Actions */}
              <Grid item xs={12} sm={2} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Button size="small" variant="outlined" onClick={() => setOpenView(true)}>
                  View
                </Button>
                <Button size="small" variant="contained" color="primary" onClick={() => setOpenEdit(true)}>
                  Edit
                </Button>
                <Button size="small" variant="outlined" color="error" onClick={handleDelete}>
                  Delete
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Box>
      </Card>

      {/* View Details Modal */}
      <Dialog open={openView} onClose={() => setOpenView(false)} fullWidth>
        <DialogTitle>Student Details</DialogTitle>
        <DialogContent dividers>
          <Typography><b>Name:</b> {student.name}</Typography>
          <Typography><b>Admission No:</b> {student.admissionNo}</Typography>
          <Typography><b>Contact:</b> {student.contact}</Typography>
          <Typography><b>Email:</b> {student.email}</Typography>
          <Typography><b>DOB:</b> {student.dob?.slice(0, 10)}</Typography>
          <Typography><b>Class:</b> {student.class} - {student.section}</Typography>
          <Typography><b>Father's Name:</b> {student.fatherName}</Typography>
          <Typography><b>Mother's Name:</b> {student.motherName}</Typography>
          <Typography><b>Gender:</b> {student.gender}</Typography>
          <Typography><b>Address:</b> {student.address}</Typography>
          <Typography><b>Pincode:</b> {student.pincode}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenView(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {Object.keys(editData).map((key) => (
              key !== "_id" && (
                <Grid item xs={12} sm={6} key={key}>
                  <TextField
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={editData[key] || ""}
                    onChange={(e) => setEditData({ ...editData, [key]: e.target.value })}
                    fullWidth
                  />
                </Grid>
              )
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

// ViewStudent List
const ViewStudent = ({ students, fetchStudents }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Student Previews
      </Typography>
      {students?.length > 0 ? (
        students.map((student) => (
          <StudentPreviewCard
            key={student._id}
            student={student}
            fetchStudents={fetchStudents}
          />
        ))
      ) : (
        <Box sx={{ textAlign: "center", py: 5, color: "text.secondary" }}>
          No students found. Click "Add New Student" to get started.
        </Box>
      )}
    </Box>
  );
};

export default ViewStudent;
