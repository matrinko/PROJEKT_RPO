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
    res.status(500).json({ message: 'Napaka pri ustvarjanju uporabnika.', error: err });
  }
});

// Preveri prijavo
router.post('/login', async (req, res) => {
  try {
    const {username, password} = req.body;
    const users = await User.find({ username: username, password: password });
    if (users && users.length > 0) {
      res.status(200).json({ success: true, username: users[0].username, _id: users[0]._id });
    } else {
      res.status(200).json({ success: false, message: 'Napacno uporabnisko ime ali geslo' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Napaka pri prijavi.', error: err });
  }
});

// Pridobi uporabnika po imenu
router.post('/getuser', async (req, res) => {
  try {
    const { username } = req.body;
    let user = await User.find({username : username });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Napaka pri pridobivanju userja.', error: err });
  }
});

module.exports = router;
