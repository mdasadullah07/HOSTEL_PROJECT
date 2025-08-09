// EditHostelForm.jsx
import React, { useState, useEffect } from "react";
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

const defaultInfrastructure = ["Bed", "Table", "Chair", "Fan", "Light"];

const EditHostelForm = ({ hostel, fetchHostels, onClose }) => {
  const [institution, setInstitution] = useState("");
  const [hostelData, setHostelData] = useState({
    name: "",
    type: "",
    capacity: 0,
    warden: "",
    guards: "",
  });
  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);

  // Pre-fill existing hostel details
  useEffect(() => {
    if (hostel) {
      setInstitution(hostel.institution || "");
      setHostelData({
        name: hostel.name || "",
        type: hostel.type || "",
        capacity: hostel.capacity || 0,
        warden: hostel.warden || "",
        guards: hostel.guards
          ? hostel.guards.map((g) => `${g.name} ${g.shift}`).join(", ")
          : "",
      });

      setFloors(
        hostel.floors?.map((f) => ({
          floorNumber: f.floorNumber,
          rooms: f.numberOfRooms,
        })) || []
      );

      setRooms(
        hostel.floors?.flatMap((f) =>
          f.rooms.map((r) => ({
            roomNumber: r.roomNumber,
            floorNumber: f.floorNumber,
            type: r.type,
            infrastructure: r.infrastructure || [],
          }))
        ) || []
      );
    }
  }, [hostel]);

  // Handlers
  const handleHostelChange = (e) => {
    setHostelData({ ...hostelData, [e.target.name]: e.target.value });
  };

  const handleFloorChange = (index, field, value) => {
    const updated = [...floors];
    updated[index][field] = value;
    setFloors(updated);
  };

  const handleRoomChange = (index, field, value) => {
    const updated = [...rooms];
    updated[index][field] = value;
    setRooms(updated);
  };

  const toggleInfrastructure = (roomIndex, item) => {
    const updatedRooms = [...rooms];
    if (updatedRooms[roomIndex].infrastructure.includes(item)) {
      updatedRooms[roomIndex].infrastructure = updatedRooms[roomIndex].infrastructure.filter(
        (i) => i !== item
      );
    } else {
      updatedRooms[roomIndex].infrastructure.push(item);
    }
    setRooms(updatedRooms);
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const guardsArray = hostelData.guards
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean)
        .map((g) => {
          const [name, shift] = g.split(" ");
          return { name, shift };
        });

      const payload = {
        institution,
        name: hostelData.name,
        type: hostelData.type,
        capacity: hostelData.capacity,
        warden: hostelData.warden,
        guards: guardsArray,
        floors: floors.map((f) => ({
          floorNumber: f.floorNumber,
          numberOfRooms: f.rooms,
          rooms: rooms
            .filter((r) => r.floorNumber === f.floorNumber)
            .map((r) => ({
              roomNumber: r.roomNumber,
              type: r.type,
              infrastructure: r.infrastructure,
            })),
        })),
      };

      await axios.put(`http://localhost:5000/api/hostels/${hostel._id}`, payload);

      alert("Hostel updated successfully!");
      if (fetchHostels) fetchHostels();
      if (onClose) onClose();
    } catch (err) {
      console.error("Error updating hostel:", err);
      alert("Failed to update hostel.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Card sx={{ width: 900, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h5" mb={2} color="primary">
            Edit Hostel
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Institution Name */}
              <Grid item xs={12}>
                <TextField
                  label="Institution Name"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>

              {/* Hostel Info */}
              <Grid item xs={6}>
                <TextField
                  name="name"
                  label="Hostel Name"
                  value={hostelData.name}
                  onChange={handleHostelChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  name="type"
                  label="Type"
                  value={hostelData.type}
                  onChange={handleHostelChange}
                  fullWidth
                  required
                >
                  <MenuItem value="Boys">Boys</MenuItem>
                  <MenuItem value="Girls">Girls</MenuItem>
                  <MenuItem value="Co-ed">Co-ed</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="capacity"
                  label="Capacity"
                  type="number"
                  value={hostelData.capacity}
                  onChange={handleHostelChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="warden"
                  label="Warden"
                  value={hostelData.warden}
                  onChange={handleHostelChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="guards"
                  label="Guard Name & Shift"
                  helperText="Raju Day, Kishan Night"
                  value={hostelData.guards}
                  onChange={handleHostelChange}
                  fullWidth
                />
              </Grid>

              {/* Floors */}
              {floors.map((f, i) => (
                <React.Fragment key={i}>
                  <Grid item xs={6}>
                    <TextField
                      label="Floor Number"
                      type="number"
                      value={f.floorNumber}
                      onChange={(e) =>
                        handleFloorChange(i, "floorNumber", parseInt(e.target.value))
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Rooms on Floor"
                      type="number"
                      value={f.rooms}
                      onChange={(e) =>
                        handleFloorChange(i, "rooms", parseInt(e.target.value))
                      }
                      fullWidth
                    />
                  </Grid>
                </React.Fragment>
              ))}

              {/* Rooms */}
              {rooms.map((r, i) => (
                <React.Fragment key={i}>
                  <Grid item xs={3}>
                    <TextField
                      label="Room Number"
                      value={r.roomNumber}
                      onChange={(e) => handleRoomChange(i, "roomNumber", e.target.value)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Floor Number"
                      type="number"
                      value={r.floorNumber}
                      onChange={(e) =>
                        handleRoomChange(i, "floorNumber", parseInt(e.target.value))
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      select
                      label="Room Type"
                      value={r.type}
                      onChange={(e) => handleRoomChange(i, "type", e.target.value)}
                      fullWidth
                    >
                      <MenuItem value="Single">Single</MenuItem>
                      <MenuItem value="Double">Double</MenuItem>
                      <MenuItem value="Triple">Triple</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body2">Infrastructure:</Typography>
                    {defaultInfrastructure.map((item) => (
                      <label key={item} style={{ display: "block" }}>
                        <input
                          type="checkbox"
                          checked={r.infrastructure.includes(item)}
                          onChange={() => toggleInfrastructure(i, item)}
                        />
                        {item}
                      </label>
                    ))}
                  </Grid>
                </React.Fragment>
              ))}

              {/* Buttons */}
              <Grid item xs={6}>
                <Button variant="outlined" fullWidth onClick={onClose}>
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Update Hostel
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditHostelForm;
