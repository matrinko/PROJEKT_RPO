const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { username, friend } = req.body;
  console.log(username + friend)

  try {
    const user = await User.findOneAndUpdate(
        {username: username},
        { $addToSet: { prijatelji: friend } },
        { new: true }
    )
    const user2 = await User.findOneAndUpdate(
        {username: friend},
        { $addToSet: { prijatelji: username } },
        { new: true }
    )

    if (user.prijatelji.includes(friend)) {
      return res.status(400).json({
        success: false,
        message: 'Prijatelj je že dodan.',
      });
    }

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
