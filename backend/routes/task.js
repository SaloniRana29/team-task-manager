const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');

// Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json("No token");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json("Invalid token");
  }
};

// CREATE TASK
router.post('/create', authMiddleware, async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user.id
    });
    res.json(task);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// GET TASKS (user-wise)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;