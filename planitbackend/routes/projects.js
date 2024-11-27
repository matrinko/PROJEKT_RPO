const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Dodaj projekt
router.post('/', async (req, res) => {
  try {
    const { ime, opis, rok, udelezenci } = req.body;
    const novProjekt = new Project({ ime, opis, rok, udelezenci });
    await novProjekt.save();
    res.status(201).json(novProjekt);
  } catch (err) {
    res.status(500).json({ message: 'Napaka pri shranjevanju projekta.', error: err });
  }
});

// Pridobi vse projekte
router.get('/', async (req, res) => {
  try {
    const projekti = await Project.find({ udelezenci: "martin" });
    res.status(200).json(projekti);
  } catch (err) {
    res.status(500).json({ message: 'Napaka pri pridobivanju projektov.', error: err });
  }
});

module.exports = router;
