const express = require('express');
const router = express.Router();
const PodOpravilo = require('../models/PodOpravilo');

router.post('/:id_naloge/:opis/:stanje/:prioriteta', async (req, res) => {  //req.body
  try {
    const { id_naloge, opis, stanje, prioriteta } = req.params
    const novoOpravilo = new PodOpravilo({ id_naloge, opis, stanje, prioriteta });
    await novoOpravilo.save();
    res.status(201).json(novoOpravilo);
  } catch (err) {
    res.status(500).json({ message: 'Napaka pri shranjevanju projekta.', error: err });
  }
});

router.get('/', async (req, res) => {  //req.body
    try {
      const { id_naloge } = req.query
      let opravila = await PodOpravilo.find({id_naloge});
      res.status(200).json(opravila);
      console.log(opravila)
    } catch (err) {
      res.status(500).json({ message: 'Napaka pri pridobivanju nalog.', error: err });
    }
  });

  router.put('/posodobi/:id/:stanje', async (req, res) => {  //req.body
    try {
      const { id, stanje } = req.params
      let opravilo = await PodOpravilo.findOneAndUpdate({_id : id}, {stanje}, {new:true});
      res.status(200).json(opravilo);
      console.log(opravilo)
    } catch (err) {
      res.status(500).json({ message: 'Napaka pri pridobivanju nalog.', error: err });
    }
  });
  router.put('/posodobi/prioriteta/:id/:prioriteta', async (req, res) => {  //req.body
    try {
      const { id, prioriteta } = req.params
      let opravilo = await PodOpravilo.findOneAndUpdate({_id : id}, {prioriteta}, {new:true});
      res.status(200).json(opravilo);
      console.log(opravilo)
    } catch (err) {
      res.status(500).json({ message: 'Napaka pri pridobivanju nalog.', error: err });
    }
  });

  router.delete('/delete/:id', async (req, res) => { 
    try {
      const { id } = req.params
      console.log('Pridobljen ID:', id);
      const opravilo = await PodOpravilo.findOneAndDelete({ _id: id });
      res.status(200).json(opravilo);
      console.log('uspesno')
    } catch (err) {
      res.status(500).json({ message: 'Napaka pri pridobivanju nalog.', error: err });
    }
    }
  );



module.exports = router;
