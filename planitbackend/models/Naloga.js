const mongoose = require('mongoose');

const nalogaSchema = new mongoose.Schema(
    {
        ime: { type: String, required: true },
        lastnik: {type: String, required: true},
        rok: { type: String, required: true },
        opis: {type: String, required: true },
        stanje: {type: String, required: true},
        id_projekt: {type:String, required: true},
        ime_projekta: {type: String, required: true},
    },
    { timestamps: true } 
);

module.exports = mongoose.model('Naloga', nalogaSchema);
