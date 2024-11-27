const mongoose = require('mongoose');

const groupChatSchema = new mongoose.Schema(
    {
        id_skupina: { type: String, required: true },
        username: { type: String, required: true },
        text: { type: String, required: true },
        posiljatelj: { type: String, required: true},
    },
    { timestamps: true } 
);

module.exports = mongoose.model('GroupChat', groupChatSchema);
