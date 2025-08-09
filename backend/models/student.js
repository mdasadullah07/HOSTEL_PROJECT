const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  admissionNo: {
    type: String,
    unique: true,
    required: true, 
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
  className: {
    type: String,
    
  },
  section: {
    type: String,
   
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
