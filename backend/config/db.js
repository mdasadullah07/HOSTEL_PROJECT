// db.js
const mongoose = require('mongoose');
require('dotenv').config(); // .env se URI mileg


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // App band ho jaaye agar DB connect na ho
  }
};

module.exports = connectDB;
