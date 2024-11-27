const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    ime: { type: String, required: true },
    opis: { type: String },
    rok: { type: Date },
    udelezenci: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
