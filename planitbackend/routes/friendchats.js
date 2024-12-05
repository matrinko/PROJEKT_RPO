const express = require('express');
const router = express.Router();
const FriendChat = require('../models/FriendChat')

// dodaj projekt

router.post('/', async (req, res) => {
  try {
    const { posiljatelj, text, udelezenca } = req.body;
    const novFriendChat = new FriendChat({ posiljatelj, text, udelezenca });
    await novFriendChat.save();
    res.status(201).json(novFriendChat);
  } catch (err) {
    res.status(500).json({ message: 'Napaka pri shranjevanju prijateljskih pogovorov.', error: err });
  }
});


// pridobi vse projekte
router.get('/', async (req, res) => {  //req.body
  try {
    const { udelezenca } = req.query
    let friendchats = await FriendChat.find({udelezenca: { $all: udelezenca }});
    res.status(200).json(friendchats);
    console.log(friendchats)
  } catch (err) {
    res.status(500).json({ message: 'Napaka pri pridobivanju prijateljskih pogovorov.', error: err });
  }
});

module.exports = router;
