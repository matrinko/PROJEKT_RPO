const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { username, friend } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Uporabnik ne obstaja.',
      });
    }

    if (user.prijatelji.includes(friend)) {
      return res.status(400).json({
        success: false,
        message: 'Prijatelj je že dodan.',
      });
    }

    await User.findOneAndUpdate(
      { username: username },
      { $addToSet: { prijatelji: friend } },
      { new: true }
    );

    const friendUser = await User.findOne({ username: friend });
    if (!friendUser) {
      return res.status(404).json({
        success: false,
        message: 'Prijatelj ne obstaja.',
      });
    }

    await User.findOneAndUpdate(
      { username: friend },
      { $addToSet: { prijatelji: username } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Prijatelj uspešno dodan za oba uporabnika.',
    });
  } catch (error) {
    console.error('Napaka na strežniku:', error);
    res.status(500).json({
      success: false,
      message: 'Napaka na strežniku.',
      error: error.message,
    });
  }
});

module.exports = router;


module.exports = router;
