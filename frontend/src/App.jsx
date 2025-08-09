// Updated App.jsx with cleaner layout and no extra 240px margin
import React, { useState } from "react";
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  AppBar,
  CssBaseline,
} from "@mui/material";
import Dashboard from "./components/Dashboard";
import StudentDashboard from "./components/Students/StudentDashboard";

const drawerWidth = 240;

const App = () => {
  const [tab, setTab] = useState(0);

  const tabs = [
    "Hostel",
    "Students",
    "Staff",
    "Attendance",
    "Meals",
    "Guest & Vacation",
  ];

  const renderTabContent = () => {
    switch (tab) {
      case 0:
        return <Dashboard />;
      case 1:
        return <StudentDashboard />;
      case 2:
        return <Typography variant="h6">Staff Management Coming Soon</Typography>;
      case 3:
        return <Typography variant="h6">Attendance Tracking Coming Soon</Typography>;
      case 4:
        return <Typography variant="h6">Meal Management Coming Soon</Typography>;
      case 5:
        return <Typography variant="h6">Guest & Vacation Handling Coming Soon</Typography>;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "#1e1e2d" }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
             Hostel Management System
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#1e1e2d",
            color: "#ffffff",
          },
        }}
      >
        <Toolbar />
        <List>
          {tabs.map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton selected={tab === index} onClick={() => setTab(index)}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "#f4f6f8",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        {renderTabContent()}
      </Box>
    </Box>
  );
};

export default App;
