const express = require('express');
const router = express.Router();
const FriendChat = require('../models/FriendChat');
const GroupChat = require('../models/GroupChat');

router.post('/friends', async (req, res) => {
    try {
        const { username } = req.body;
        console.log('Iščem prijateljska sporočila za uporabnika:', username);
        
        const messages = await FriendChat.find({
            udelezenca: { $in: [username] }
        }).sort({ createdAt: -1 });
        
        console.log(`Najdenih ${messages.length} prijateljskih sporočil`);
        res.json(messages);
    } catch (error) {
        console.error('Napaka pri iskanju prijateljskih sporočil:', error);
        res.status(500).json({ 
            message: 'Napaka pri iskanju prijateljskih sporočil',
            error: error.message 
        });
    }
});

router.post('/groups', async (req, res) => {
    try {
        const { username } = req.body;
        console.log('Iščem skupinska sporočila za uporabnika:', username);
        
        const messages = await GroupChat.find({
            posiljatelj: username
        }).sort({ createdAt: -1 });
        
        console.log(`Najdenih ${messages.length} skupinskih sporočil`);
        res.json(messages);
    } catch (error) {
        console.error('Napaka pri iskanju skupinskih sporočil:', error);
        res.status(500).json({ 
            message: 'Napaka pri iskanju skupinskih sporočil',
            error: error.message 
        });
    }
});

module.exports = router;