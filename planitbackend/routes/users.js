const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Dodaj uporabnika
router.post('/register', async (req, res) => {
  try {
    const { username, email, prijatelji = [], password } = req.body;
    //tukaj ustvarimo novega uporabnika z uporabo besede new
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
    //tu preveri prijavo tako da mongo poisce ce obstaja uporabnik z imenom in geslom
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

//pridobi uporabnika po imenu
router.post('/getuser', async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.find({username : username });
    //vrne status 200 ko je uspesno
    res.status(200).json(user);
  } catch (err) {
    //ce je napaka na bazi vrne status 500
    res.status(500).json({ message: 'Napaka pri pridobivanju userja.', error: err });
  }
});

//nastavi profilno sliko po imenu
router.post('/setprofileimage', async (req, res) => {
  try {
    const { username, image } = req.body;
    //to je funkcija preko mongodb ki najde uporabnika in mu spremeni profilno sliko na podano sliko
    const user = await User.findOneAndUpdate(
      { username: username },
      { $set: { image: image } },
      { new: true }
    );
    if (user) {
      //vrne status 200 ko je uspesno
      res.status(200).json({ success: true, message: 'Profilna slika posodobljena.', user });
    } else {
      //vrne status 404 ko uporabnisko ime ni pravilo aka ne obstaja
      res.status(404).json({ success: false, message: 'Uporabnik ni najden.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Napaka pri posodabljanju profilne slike.', error: err });
  }
});

//dobi profilno sliko po imenu
router.post('/getprofileimage', async (req, res) => {
  try {
    const { username } = req.body;
    //najde uporabnika po imenu in vrne string na sliko
    const user = await User.findOne({ username: username });
    if (user && user.image) {
      res.status(200).json({ success: true, image: user.image });
    } else {
      res.status(404).json({ success: false, message: 'Profilna slika ni najdena.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Napaka pri pridobivanju profilne slike.', error: err });
  }
});

router.get('/users/all', async (req, res) => {
  try {
    const users = await User.find({}, 'username prijatelji');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
