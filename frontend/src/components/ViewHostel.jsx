import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Button,
  Dialog
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import KingBedIcon from '@mui/icons-material/KingBed';
import axios from 'axios';
import EditHostelForm from './EditHostelForm';
import ViewHostelDetails from "./ViewHostelDetail";

// Hostel Card
const HostelPreviewCard = ({ hostel, fetchHostels, onEdit, onView }) => {
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${hostel.name}?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/hostels/${hostel._id}`);
        alert('Hostel deleted successfully!');
        fetchHostels();
      } catch (error) {
        console.error('Delete failed:', error);
        alert(error.response?.data?.error || 'Failed to delete hostel.');
      }
    }
  };

  return (
    <Card sx={{ display: 'flex', width: '100%', mb: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Grid container spacing={2} alignItems="center">
            {/* Info */}
            <Grid item xs={12} sm={5}>
              <Typography component="div" variant="h5" sx={{ fontWeight: 'bold' }}>
                {hostel.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                <HomeIcon fontSize="small" sx={{ mr: 1 }} />
                {hostel.institution}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <KingBedIcon fontSize="small" sx={{ mr: 1 }} />
                Type: {hostel.type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
                Warden: {hostel.warden}
              </Typography>
            </Grid>

            {/* Floors & Capacity */}
            <Grid item xs={12} sm={3}>
              <Typography variant="body2" color="text.secondary">
                Total Floors: {hostel.floors.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Capacity: {hostel.capacity}
              </Typography>
            </Grid>

            {/* Actions */}
            <Grid item xs={12} sm={4} sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
              <Button size="small" variant="outlined" onClick={() => onView(hostel)}>
                View
              </Button>
              <Button size="small" variant="outlined" color="primary" onClick={() => onEdit(hostel)}>
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
  );
};

// Main View
const ViewHostel = ({ hostels, fetchHostels }) => {
  const [selectedHostel, setSelectedHostel] = useState(null); // For Edit
  const [viewHostel, setViewHostel] = useState(null); // For View Details

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Hostel Previews
      </Typography>

      {hostels.length > 0 ? (
        hostels.map((hostel, index) => (
          <HostelPreviewCard
            key={index}
            hostel={hostel}
            fetchHostels={fetchHostels}
            onEdit={(h) => setSelectedHostel(h)}
            onView={(h) => setViewHostel(h)}
          />
        ))
      ) : (
        <Box sx={{ textAlign: 'center', py: 5, color: 'text.secondary' }}>
          No hostels found. Click "Add New Hostel" to get started.
        </Box>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!selectedHostel} onClose={() => setSelectedHostel(null)} maxWidth="md">
        {selectedHostel && (
          <EditHostelForm
            hostel={selectedHostel}
            fetchHostels={fetchHostels}
            onClose={() => setSelectedHostel(null)}
          />
        )}
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={!!viewHostel} onClose={() => setViewHostel(null)} maxWidth="md" fullWidth>
        {viewHostel && (
          <ViewHostelDetails
            hostel={viewHostel}
            onClose={() => setViewHostel(null)}
          />
        )}
      </Dialog>
    </Box>
  );
};

export default ViewHostel;
