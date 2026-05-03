const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Test Route (pehle rakhna safe hota hai)
app.get('/', (req, res) => {
  res.send("API Running 🚀");
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/task'));

// ✅ PORT fix (Railway compatible)
const PORT = process.env.PORT || 5000;

// ✅ MongoDB connect + server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB Error ❌", err);
  });