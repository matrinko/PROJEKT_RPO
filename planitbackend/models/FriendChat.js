const mongoose = require('mongoose');

const friendChatSchema = new mongoose.Schema(
    {
        posiljatelj: { type: String, required: true },
        text: { type: String, required: true },
        udelezenca: { type: Array, required: true},
    },
    { timestamps: true } 
);

module.exports = mongoose.model('Pogovor', friendChatSchema);
