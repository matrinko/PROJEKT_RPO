const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// dodaj projekt
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

// pridobi vse projekte
router.get('/', async (req, res) => {
  try {
    const projekti = await Project.find({ udelezenci: "martin" });
    res.status(200).json(projekti);
  } catch (err) {
    res.status(500).json({ message: 'Napaka pri pridobivanju projektov.', error: err });
  }
});

router.get('/:id', async (req, res) => {  //req.body
  try {
    const { id } = req.params
    console.log(id)
    let projekt = await Project.findOne({_id : id});
    res.status(200).json(projekt);
    console.log(projekt)
  } catch (err) {
    res.status(500).json({ message: 'Napaka pri pridobivanju nalog.', error: err });
  }
});

module.exports = router;
