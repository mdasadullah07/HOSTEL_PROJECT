const Hostel = require('../models/hostel');

// Get all hostels
exports.getAllHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.json(hostels);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hostels' });
  }
};

// Create a new hostel
exports.createHostel = async (req, res) => {
  try {
    const hostel = new Hostel(req.body);
    await hostel.save();
    res.status(201).json(hostel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a hostel
exports.updateHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hostel) return res.status(404).json({ error: 'Hostel not found' });
    res.json(hostel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a hostel
exports.deleteHostel = async (req, res) => {
  try {
    const result = await Hostel.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'Hostel not found' });
    res.json({ message: 'Hostel deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete hostel' });
  }
};
