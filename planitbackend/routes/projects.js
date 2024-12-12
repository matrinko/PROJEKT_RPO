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
router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const projekti = await Project.find({ udelezenci: username });
    res.status(200).json(projekti);
  } catch (err) {
    res.status(500).json({ message: 'Napaka pri pridobivanju projektov.', error: err });
  }
});

router.get('/dobi/:id', async (req, res) => {  //req.body
  try {
    const { id } = req.params;
    let projekt = await Project.findOne({_id : id});
    res.status(200).json(projekt);
  } catch (err) {
    res.status(500).json({ message: 'Napaka pri pridobivanju nalog.', error: err });
  }
});

router.put('/dodaj/:ime/:id', async (req, res) => {
  try {
    const { ime, id } = req.params; 
    const projekt = await Project.findOneAndUpdate(
      { _id: id },
      { $addToSet: { udelezenci: ime } }, 
      { new: true }
    );
    res.status(200).json(projekt);
  } catch (err) {
    console.error('Napaka pri dodajanju imena v udeležence:', err);
    res.status(500).json({ message: 'Napaka pri posodabljanju projekta.', error: err });
  }
});


module.exports = router;
