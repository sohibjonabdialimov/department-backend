const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "CS-101"
  year: { type: Number }, // 2025
  program: { type: String }, // e.g., "Computer Science"
  capacity: { type: Number },
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Group', GroupSchema);
