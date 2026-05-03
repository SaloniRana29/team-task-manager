const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

// ✅ MongoDB Connection (FIXED)
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));

// Test Route
app.get('/', (req, res) => {
  res.send("API Running 🚀");
});

// Server Start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
app.use('/api/tasks', require('./routes/task'));