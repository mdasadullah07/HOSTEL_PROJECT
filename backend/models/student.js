const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  admissionNo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  contact: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  dob: {
    type: Date,
  },
  class: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
  },
  motherName: {
    type: String,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  address: {
    type: String,
  },
  
  pincode: {
    type: String,
  },
 

}, {
  timestamps: true,
});

module.exports = mongoose.model('Student', studentSchema);
