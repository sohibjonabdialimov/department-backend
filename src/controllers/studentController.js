const Student = require('../models/Student');
const Group = require('../models/Group');

exports.createStudent = async (req, res, next) => {
  try {
    const st = await Student.create(req.body);
    res.status(201).json({ success: true, data: st });
  } catch (err) { next(err); }
};

exports.getStudents = async (req, res, next) => {
  try {
    const students = await Student.find().populate('groups');
    res.json({ success: true, data: students });
  } catch (err) { next(err); }
};

exports.getStudentById = async (req, res, next) => {
  try {
    const s = await Student.findById(req.params.id).populate('groups');
    if (!s) return res.status(404).json({ success: false, message: 'Student topilmadi' });
    res.json({ success: true, data: s });
  } catch (err) { next(err); }
};

exports.updateStudent = async (req, res, next) => {
  try {
    const s = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!s) return res.status(404).json({ success: false, message: 'Student topilmadi' });
    res.json({ success: true, data: s });
  } catch (err) { next(err); }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    const s = await Student.findByIdAndDelete(req.params.id);
    if (!s) return res.status(404).json({ success: false, message: 'Student topilmadi' });
    await Group.updateMany({ students: s._id }, { $pull: { students: s._id } });
    res.json({ success: true, message: 'Student o\'chirildi' });
  } catch (err) { next(err); }
};
