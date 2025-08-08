const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// Load env variables
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const hostelRoutes = require('./routes/hostelRoutes');
app.use('/api/hostels', hostelRoutes);

//student routes
const studentRoutes = require('./routes/studentRoutes');
app.use('/api/students', studentRoutes);

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));