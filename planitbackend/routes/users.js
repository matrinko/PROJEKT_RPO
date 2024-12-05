const express = require('express');
const router = express.Router();
const User = require('../models/User');

// dodaj userja
/*
router.post('/', async (req, res) => {
  try {
    const { ime, lastnik, rok, opis, stanje, id_projekt, ime_projekta } = req.body;
    const novaNaloga = new Naloga({ ime, lastnik, rok, opis, stanje, id_projekt, ime_projekta });
    await novaNaloga.save();
    res.status(201).json(novaNaloga);
  } catch (err) {
    res.status(500).json({ message: 'Napaka pri shranjevanju naloge.', error: err });
  }
});
*/

// pridobi userja
router.get('/', async (req, res) => {  //req.body
  try {
    const { name } = req.query
    console.log(name)
    let user = await User.find({username : name });
    res.status(200).json(user);
    console.log(user)
  } catch (err) {
    res.status(500).json({ message: 'Napaka pri pridobivanju userja.', error: err });
  }
});

module.exports = router;
