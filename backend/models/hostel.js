// backend/models/Hostel.js
const mongoose = require("mongoose");

// Schema for individual guards
const guardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shift: { type: String, required: true },
});

// Schema for individual rooms
const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  type: {
    type: String,
    enum: ["Single", "Double", "Triple"],
    required: true,
  },
  infrastructure: [String],
});

// Schema for each floor, containing rooms
const floorSchema = new mongoose.Schema({
  floorNumber: { type: Number, required: true },
  numberOfRooms: { type: Number, required: true },
  rooms: [roomSchema],
});

// Main schema for the hostel
const hostelSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ["Boys", "Girls", "Co-ed"],
    required: true,
  },
  capacity: {
    type: Number,
    min: 0,
  },
  warden: String,
  guards: [guardSchema], // Using the new structured guardSchema
  floors: [floorSchema],
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model("Hostel", hostelSchema);
