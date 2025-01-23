const express = require('express');
const router = express.Router();
const Naloga = require('../models/Naloga');



router.post('/', async (req, res) => {
  try {
    const { ime, opis, rok, stanje, lastnik, id_projekt, ime_projekta } = req.body;
    
    const novaNaloga = new Naloga({
      ime,
      opis,
      rok,
      stanje,
      lastnik,
      id_projekt,
      ime_projekta
    });
    
    await novaNaloga.save();
    
    res.status(201).json(novaNaloga);
  } catch (error) {
    res.status(500).json({ sporočilo: 'Napaka pri dodajanju naloge', error });
  }
});

router.get("/dobiIdPoImenu/:ime", async (req, res) => {
  try {
    const ime = req.params.ime; // Ime, ki ga uporabnik izbere
    const projekt = await Projekt.findOne({ ime: ime }); // Poiščite projekt po imenu

    if (!projekt) {
      return res.status(404).json({ message: "Projekt ni bil najden." });
    }

    // Vrne samo ID projekta
    res.json({ id: projekt._id });
  } catch (err) {
    console.error("Napaka pri iskanju projekta:", err);
    res.status(500).json({ message: "Napaka pri iskanju projekta.", error: err });
  }
});

// pridobi vse projekte
router.get('/', async (req, res) => {  //req.body
  try {
    const { lastnik } = req.query
    let naloge = await Naloga.find({lastnik});
    res.status(200).json(naloge);
    console.log(naloge)
  } catch (err) {
    res.status(500).json({ message: 'Napaka pri pridobivanju nalog.', error: err });
  }
});

router.get('/:id', async (req, res) => {  //req.body
  try {
    const { id } = req.params
    console.log(id)
    let naloga = await Naloga.findOne({_id : id});
    res.status(200).json(naloga);
    console.log(naloga)
  } catch (err) {
    res.status(500).json({ message: 'Napaka pri pridobivanju nalog.', error: err });
  }
});

router.get('/projekt/:id_projekt', async (req, res) => {  //req.body
  try {
    const { id_projekt } = req.params
    let naloge = await Naloga.find({id_projekt});
    res.status(200).json(naloge);
    console.log(naloge)
  } catch (err) {
    res.status(500).json({ message: 'Napaka pri pridobivanju nalog.', error: err });
  }
});

router.put('/stanje/:id', async (req, res) => {  //req.body
  try {
    const { id } = req.params
    let naloga = await Naloga.findOneAndUpdate({_id: id}, {stanje:'končano'}, {new:true});
    res.status(200).json(naloga);
    console.log(naloga)
  } catch (err) {
    res.status(500).json({ message: 'Napaka pri pridobivanju nalog.', error: err });
  }
});

module.exports = router;
