const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  studentId: { type: String, required: true, unique: true },
  phone: { type: String },
  year: { type: Number }, // kurs/ta'lim yili
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', StudentSchema);
