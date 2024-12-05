const express = require('express');
const router = express.Router();
const GroupChat = require('../models/GroupChat')

// dodaj groupchat

router.post('/', async (req, res) => {
  try {
    const { id_skupina, text, posiljatelj } = req.body;
    const novGroupChat = new GroupChat({ id_skupina, text, posiljatelj });
    await novGroupChat.save();
    res.status(201).json(novGroupChat);
  } catch (err) {
    res.status(500).json({ message: 'Napaka pri shranjevanju prijateljskih pogovorov.', error: err });
  }
});


// pridobi vse groupchate
router.get('/', async (req, res) => {  //req.body
  try {
    const { id_skupina } = req.query
    let groupchats = await GroupChat.find({id_skupina});
    res.status(200).json(groupchats);
    console.log(groupchats)
  } catch (err) {
    res.status(500).json({ message: 'Napaka pri pridobivanju prijateljskih pogovorov.', error: err });
  }
});

module.exports = router;
