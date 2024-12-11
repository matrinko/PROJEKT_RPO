const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Dodaj uporabnika
router.post('/register', async (req, res) => {
  try {
    const { username, email, prijatelji = [], password } = req.body;
    const novUser = new User({ username, email, prijatelji, password });
    await novUser.save();
    res.status(201).json(novUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Napaka pri shranjevanju projekta.', error: err });
  }
});

// Preveri prijavo
router.post('/login', async (req, res) => {
  try {
    const {username, password} = req.body;
    const users = await User.find({ username: username, password: password });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Napaka pri pridobivanju projektov.', error: err });
  }
});

// Pridobi uporabnika po id
router.post('/getuser', async (req, res) => {
  try {
    const {_id} = req.body;
    const users = await User.find({ _id:_id });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Napaka pri pridobivanju projektov.', error: err });
  }
});

module.exports = router;
