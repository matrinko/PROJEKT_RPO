const mongoose = require('mongoose');

const podopraviloSchema = new mongoose.Schema(
    {
        id_naloge: {type: String, required: true},
        opis: {type: String, required: true },
        stanje: {type: String, required: true},
    },
    { timestamps: true } 
);

module.exports = mongoose.model('Podopravilo', podopraviloSchema);
