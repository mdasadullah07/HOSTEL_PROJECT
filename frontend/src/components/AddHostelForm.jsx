import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Divider,
  Box,
  MenuItem,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const hostelTypes = ["Boys", "Girls", "Co-ed"];
const roomTypes = ["Single", "Double", "Triple"];
const defaultInfrastructure = ["Bed", "Table", "Chair", "Fan", "Light"];

const AddHostelForm = ({ fetchHostels, onClose }) => {
  // Function to reset the form to its initial state
  const resetForm = () => {
    setInstitution("");
    setHostel({ name: "", type: "", capacity: 0, warden: "", guards: "" });
    setFloors([{ floorNumber: 1, rooms: 1 }]);
    setRooms([
      {
        roomNumber: "",
        floorNumber: 1,
        type: "Single",
        infrastructure: [...defaultInfrastructure],
      },
    ]);
  };

  const [institution, setInstitution] = useState("");
  const [hostel, setHostel] = useState({
    name: "",
    type: "",
    capacity: 0,
    warden: "",
    guards: "", // This will be a comma-separated string like "Raju Day, Kishan Night"
  });

  const [floors, setFloors] = useState([{ floorNumber: 1, rooms: 1 }]); // 'rooms' here is number of rooms on floor
  const [rooms, setRooms] = useState([
    {
      roomNumber: "",
      floorNumber: 1,
      type: "Single",
      infrastructure: [...defaultInfrastructure],
    },
  ]);

  const handleFloorChange = (index, key, value) => {
    const updatedFloors = [...floors];
    updatedFloors[index][key] = value;
    setFloors(updatedFloors);
  };

  const handleAddFloor = () => {
    setFloors([...floors, { floorNumber: floors.length + 1, rooms: 1 }]);
  };

  const handleRemoveFloor = (index) => {
    const updatedFloors = floors.filter((_, i) => i !== index);
    setFloors(updatedFloors);
  };

  const handleRoomChange = (index, key, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[index][key] = value;
    setRooms(updatedRooms);
  };

  const handleInfraChange = (index, infraIndex, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[index].infrastructure[infraIndex] = value;
    setRooms(updatedRooms);
  };

  const handleAddInfra = (index) => {
    const updatedRooms = [...rooms];
    updatedRooms[index].infrastructure.push("");
    setRooms(updatedRooms);
  };

  const handleRemoveInfra = (index, infraIndex) => {
    const updatedRooms = [...rooms];
    updatedRooms[index].infrastructure.splice(infraIndex, 1);
    setRooms(updatedRooms);
  };

  const handleAddRoom = () => {
    setRooms([
      ...rooms,
      {
        roomNumber: "",
        floorNumber: 1,
        type: "Single",
        infrastructure: [...defaultInfrastructure],
      },
    ]);
  };

  // Corrected and consolidated handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const guardsArray = hostel.guards
      .split(",")
      .map((guardString) => {
        const parts = guardString.trim().split(" ");
        if (parts.length < 2) return null;

        const shift = parts.pop();
        const name = parts.join(" ");
        return { name, shift };
      })
      .filter((g) => g !== null && g.name && g.shift);

    const processedFloors = floors.map((floorInfo) => {
      const roomsForThisFloor = rooms.filter(
        (room) => parseInt(room.floorNumber) === parseInt(floorInfo.floorNumber)
      );

      return {
        floorNumber: parseInt(floorInfo.floorNumber),
        numberOfRooms: parseInt(floorInfo.rooms),
        rooms: roomsForThisFloor.map((r) => ({
          roomNumber: r.roomNumber,
          type: r.type,
          infrastructure: r.infrastructure.filter((item) => item.trim() !== ""),
        })),
      };
    });

    const payload = {
      institution: institution,
      name: hostel.name,
      type: hostel.type,
      capacity: parseInt(hostel.capacity),
      warden: hostel.warden,
      guards: guardsArray,
      floors: processedFloors,
    };

    try {
      await axios.post("http://localhost:5000/api/hostels", payload);
      alert("Hostel added successfully!");
      resetForm();
      if (fetchHostels) {
        fetchHostels();
      }
    } catch (err) {
      console.error("Error adding hostel:", err);
      const errorMessage =
        err.response?.data?.message ||
        "Failed to add hostel. Please check the data.";
      alert(errorMessage);
    }
  };

  const handleCancel = () => {
    resetForm();
    if (onClose) onClose(); // 👈 this hides the form in Dashboard
  };

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Card
        sx={{
          width: 750,
          maxHeight: "90vh",
          overflowY: "auto",
          p: 3,
          boxShadow: 5,
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom textAlign="center">
            🏫 Add Institution & Hostel Details
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Institution Name"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              fullWidth
              margin="normal"
              required
            />

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">🏨 Hostel Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Hostel Name"
                  value={hostel.name}
                  onChange={(e) =>
                    setHostel({ ...hostel, name: e.target.value })
                  }
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  label="Type"
                  value={hostel.type}
                  onChange={(e) =>
                    setHostel({ ...hostel, type: e.target.value })
                  }
                  fullWidth
                  required
                >
                  {hostelTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Capacity"
                  type="number"
                  value={hostel.capacity}
                  onChange={(e) =>
                    setHostel({ ...hostel, capacity: e.target.value })
                  }
                  fullWidth
                  required
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Warden"
                  value={hostel.warden}
                  onChange={(e) =>
                    setHostel({ ...hostel, warden: e.target.value })
                  }
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Guard Name & Shift (e.g., Raju Day, Kishan Night)"
                  value={hostel.guards}
                  onChange={(e) =>
                    setHostel({ ...hostel, guards: e.target.value })
                  }
                  fullWidth
                  required
                  helperText="Enter guard names and shifts separated by commas (e.g., Raju Day, Kishan Night)"
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6">📶 Floors</Typography>
            {floors.map((floor, i) => (
              <Grid
                container
                spacing={2}
                key={i}
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Grid item xs={5}>
                  <TextField
                    label="Floor Number"
                    type="number"
                    value={floor.floorNumber}
                    onChange={(e) =>
                      handleFloorChange(i, "floorNumber", e.target.value)
                    }
                    fullWidth
                    required
                    inputProps={{ min: 1 }}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    label="Rooms on Floor"
                    type="number"
                    value={floor.rooms}
                    onChange={(e) =>
                      handleFloorChange(i, "rooms", e.target.value)
                    }
                    fullWidth
                    required
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    onClick={() => handleRemoveFloor(i)}
                    disabled={floors.length === 1}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button onClick={handleAddFloor} startIcon={<AddIcon />}>
              Add Floor
            </Button>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6">🛏️ Rooms</Typography>
            {rooms.map((room, i) => (
              <Paper key={i} variant="outlined" sx={{ mb: 2, p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TextField
                      label="Room Number"
                      value={room.roomNumber}
                      onChange={(e) =>
                        handleRoomChange(i, "roomNumber", e.target.value)
                      }
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label="Floor Number"
                      type="number"
                      value={room.floorNumber}
                      onChange={(e) =>
                        handleRoomChange(i, "floorNumber", e.target.value)
                      }
                      fullWidth
                      required
                      inputProps={{ min: 1 }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      select
                      label="Room Type"
                      value={room.type}
                      onChange={(e) =>
                        handleRoomChange(i, "type", e.target.value)
                      }
                      fullWidth
                      required
                    >
                      {roomTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        const updatedRooms = rooms.filter(
                          (_, idx) => idx !== i
                        );
                        setRooms(updatedRooms);
                      }}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Grid>
                </Grid>
                <Typography mt={2}>Infrastructure:</Typography>
                {room.infrastructure.map((item, j) => (
                  <Grid container spacing={1} key={j} alignItems="center">
                    <Grid item xs={10}>
                      <TextField
                        label={`Item ${j + 1}`}
                        value={item}
                        onChange={(e) =>
                          handleInfraChange(i, j, e.target.value)
                        }
                        fullWidth
                        margin="dense"
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton
                        onClick={() => handleRemoveInfra(i, j)}
                        disabled={room.infrastructure.length === 1 && j === 0}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Button
                  onClick={() => handleAddInfra(i)}
                  startIcon={<AddIcon />}
                  size="small"
                >
                  Add Item
                </Button>
              </Paper>
            ))}
            <Button onClick={handleAddRoom} startIcon={<AddIcon />}>
              Add Room
            </Button>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  onClick={handleCancel}
                  variant="outlined"
                  color="primary"
                  fullWidth
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
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddHostelForm;
