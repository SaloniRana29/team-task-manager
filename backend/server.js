const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Test Route (check API)
app.get('/', (req, res) => {
  res.send("API Running 🚀");
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/task'));

// ✅ Railway PORT (IMPORTANT)
const PORT = process.env.PORT;

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