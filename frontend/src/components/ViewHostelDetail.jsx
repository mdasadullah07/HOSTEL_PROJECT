import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import KingBedIcon from "@mui/icons-material/KingBed";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SecurityIcon from "@mui/icons-material/Security";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import TableChartIcon from "@mui/icons-material/TableChart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

// --- Helper Components for Bed Details Dialog (No changes here) ---

const BedIcon = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    fill="none"
    viewBox="0 0 24 24"
    stroke={color}
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    />
  </svg>
);

const RoomBedStatus = ({ room }) => {
  // Add a check here as well for safety
  if (!room?.beds)
    return <Typography>No bed information available for this room.</Typography>;

  return (
    <Box>
      <Typography variant="body1" color="text.secondary" mb={2}>
        {room.isAC ? "AC Room" : "Non-AC Room"} |{" "}
        {room.hasTable ? "Has Table" : "No Table"}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 4,
          flexWrap: "wrap",
        }}
      >
        {room.beds.map((bed) => {
          const isVacant = bed.status === "vacant";
          const bgColor = isVacant ? "#e8f5e9" : "#ffebee";
          const borderColor = isVacant ? "success.main" : "error.main";
          const iconColor = isVacant ? "success.dark" : "error.dark";
          const occupantText = isVacant ? "Vacant" : bed.occupantName;

          return (
            <Card
              key={bed.id}
              sx={{
                width: 180,
                height: 180,
                bgcolor: bgColor,
                border: `2px solid ${borderColor}`,
                borderRadius: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 3,
              }}
            >
              <BedIcon color={iconColor} />
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mt: 1, color: iconColor }}
              >
                Bed {bed.number}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {occupantText}
              </Typography>
            </Card>
          );
        })}
      </Box>
      <Stack direction="row" justifyContent="center" spacing={3} sx={{ mt: 4 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            sx={{
              width: 16,
              height: 16,
              bgcolor: "success.light",
              borderRadius: "50%",
              border: "1px solid",
              borderColor: "success.main",
            }}
          />
          <Typography variant="body2" color="text.secondary">
            Vacant
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            sx={{
              width: 16,
              height: 16,
              bgcolor: "error.light",
              borderRadius: "50%",
              border: "1px solid",
              borderColor: "error.main",
            }}
          />
          <Typography variant="body2" color="text.secondary">
            Occupied
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

const RoomDetailsDialog = ({ open, onClose, currentRoom }) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
    <DialogTitle sx={{ m: 0, p: 2 }}>
      Room {currentRoom?.roomNumber} - Bed Status
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent dividers>
      {currentRoom ? (
        <RoomBedStatus room={currentRoom} />
      ) : (
        <Typography>No room data available.</Typography>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
);

// --- Main Component ---

const ViewHostelDetails = ({ hostel, onClose }) => {
  const [openRoomDetailsDialog, setOpenRoomDetailsDialog] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);

  if (!hostel) return null;

  const handleViewBedsClick = (room) => {
    setCurrentRoom(room);
    setOpenRoomDetailsDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenRoomDetailsDialog(false);
    setCurrentRoom(null);
  };

  const handleEditRoomClick = (room) => console.log("Edit room:", room);
  const handleDeleteRoom = (roomId) => console.log("Delete room:", roomId);

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ boxShadow: 4 }}>
        <CardContent>
          {/* Header and Guards sections are unchanged */}
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {hostel.name}
          </Typography>
          <Stack spacing={0.5} sx={{ mb: 2 }}>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <HomeIcon sx={{ mr: 1 }} />
              Institution: {hostel.institution}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <KingBedIcon sx={{ mr: 1 }} />
              Type: {hostel.type}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Capacity: {hostel.capacity}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <SupervisorAccountIcon sx={{ mr: 1 }} />
              Warden: {hostel.warden}
            </Typography>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", alignItems: "center" }}
          >
            <SecurityIcon sx={{ mr: 1 }} />
            Guards
          </Typography>
          {hostel.guards?.length > 0 ? (
            <List dense sx={{ py: 0, pl: 2 }}>
              {hostel.guards.map((g, i) => (
                <ListItem key={i} sx={{ py: 0, px: 0 }}>
                  <ListItemText primary={`${g.name} (${g.shift})`} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography color="text.secondary">No guards assigned</Typography>
          )}

          {/* Floors & Rooms (CORRECTED SECTION) */}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Floors & Rooms
          </Typography>
          {hostel.floors?.length > 0 ? (
            hostel.floors.map((floor) => (
              <Box key={floor.floorNumber} sx={{ mb: 3 }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{
                    borderBottom: "2px solid",
                    borderColor: "divider",
                    pb: 1,
                    mb: 2,
                  }}
                >
                  Floor {floor.floorNumber}
                </Typography>
                <Grid container spacing={3}>
                  {floor.rooms.map((room) => {
                    // *** FIX IS HERE ***
                    // Safely calculate occupancy using optional chaining (?.) and provide a fallback of 0.
                    const occupiedBeds =
                      room.beds?.filter((b) => b.status === "occupied")
                        .length || 0;
                    const totalBeds = room.beds?.length || 0;
                    // *** END OF FIX ***

                    const isFull = totalBeds > 0 && occupiedBeds === totalBeds;
                    const occupancyColor = isFull
                      ? "error.main"
                      : "success.main";

                    return (
                      <Grid item xs={12} sm={6} md={4} key={room.id}>
                        <Card
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: 3,
                            boxShadow: 4,
                            background:
                              "linear-gradient(135deg, #ffffffff, #ffffffff)",
                            transition:
                              "transform 0.25s ease, box-shadow 0.25s ease",
                            "&:hover": {
                              transform: "translateY(-5px)",
                              boxShadow: 8,
                            },
                          }}
                        >
                          <CardContent sx={{ flexGrow: 1 }}>
                            {/* Room Header */}
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="flex-start"
                              mb={1}
                            >
                              <Typography
                                variant="h6"
                                fontWeight="bold"
                                sx={{ color: "#489de8ff" }}
                              >
                                🛏 Room {room.roomNumber}
                              </Typography>
                              <Stack direction="row" spacing={1}>
                                {room.isAC && (
                                  <AcUnitIcon
                                    sx={{ color: "#656a6cff" }}
                                    titleAccess="AC Room"
                                  />
                                )}
                                {room.hasTable && (
                                  <TableChartIcon
                                    sx={{ color: "#8d6e63" }}
                                    titleAccess="Has Table"
                                  />
                                )}
                              </Stack>
                            </Stack>

                            {/* Capacity */}
                            <Typography
                              variant="body2"
                              sx={{ color: "#1a1f20ff", mb: 1 }}
                            >
                              Capacity: <strong>{totalBeds}</strong> beds
                            </Typography>

                            {/* Occupancy with badge-like style */}
                            {totalBeds > 0 && (
                              <Typography
                                fontWeight="bold"
                                sx={{
                                  display: "inline-block",
                                  px: 1.5,
                                  py: 0.5,
                                  borderRadius: "12px",
                                  backgroundColor:
                                    occupancyColor === "green"
                                      ? "#000000ff"
                                      : occupancyColor === "red"
                                      ? "#fa6b6bff"
                                      : "#0c0c0aff",
                                  color:
                                    occupancyColor === "green"
                                      ? "#1b5e20"
                                      : occupancyColor === "red"
                                      ? "#b71c1c"
                                      : "#f57f17",
                                }}
                              >
                                Occupancy: {occupiedBeds}/{totalBeds}
                              </Typography>
                            )}
                          </CardContent>

                          {/* Footer */}
                          <Box
                            sx={{
                              p: 1.5,
                              bgcolor: "rgba(3, 2, 2, 0.03)",
                              borderTop: "1px solid",
                              borderColor: "divider",
                            }}
                          >
                            <Stack
                              direction="row"
                              justifyContent="flex-end"
                              spacing={1}
                            >
                              <Button
                                size="small"
                                variant="contained"
                        
                                sx={{
                                  background:
                                    "linear-gradient(45deg, #fdfdfdff, #ffffffff)",
                                  "&:hover": {
                                    background:
                                      "linear-gradient(45deg, #c54b4bff, #ad3636ff)",
                                  },
                                }}
                                onClick={() => handleViewBedsClick(room)}
                                disabled={totalBeds === 0}
                              >
                                View Beds
                              </Button>
                              <IconButton
                                size="small"
                                sx={{ color: "#5b8fddff" }}
                                onClick={() => handleEditRoomClick(room)}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                sx={{ color: "#ef5350" }}
                                onClick={() => handleDeleteRoom(room.id)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Stack>
                          </Box>
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            ))
          ) : (
            <Typography color="text.secondary">No floors available</Typography>
          )}

          {/* Close Button */}
          <Divider sx={{ my: 2 }} />
          <Box textAlign="right">
            <Button variant="contained" onClick={onClose}>
              Close
            </Button>
          </Box>
        </CardContent>
      </Card>

      <RoomDetailsDialog
        open={openRoomDetailsDialog}
        onClose={handleCloseDialog}
        currentRoom={currentRoom}
      />
    </Box>
  );
};

export default ViewHostelDetails;
