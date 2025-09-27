const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, unique: true },
  credits: { type: Number, default: 3 },
  semester: { type: String },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subject', SubjectSchema);
