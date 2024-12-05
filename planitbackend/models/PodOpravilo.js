const mongoose = require('mongoose');

const podopraviloSchema = new mongoose.Schema(
    {
        id_naloge: {type: String, required: true},
        opis: {type: String, required: true },
        stanje: {type: String, required: true},
        prioriteta: {type: String, required: true} //nepomembno, srednje-pomembno, pomembno, nujno
    },
    { timestamps: true } 
);

module.exports = mongoose.model('Podopravilo', podopraviloSchema);
