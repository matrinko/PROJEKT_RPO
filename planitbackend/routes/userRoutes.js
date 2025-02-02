const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/users/getallusers', async (req, res) => {
    try {
      const users = await User.find({}, 'username prijatelji');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  