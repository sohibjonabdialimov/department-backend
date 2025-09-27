const Teacher = require('../models/Teacher');
const Group = require('../models/Group');

// CREATE
exports.createTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.create(req.body);
    res.status(201).json({ success: true, data: teacher });
  } catch (err) {
    next(err);
  }
};

// GET ALL (with optional pagination)
exports.getTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find().populate('groups');
    res.json({ success: true, data: teachers });
  } catch (err) {
    next(err);
  }
};

// GET BY ID
exports.getTeacherById = async (req, res, next) => {
  try {
    const t = await Teacher.findById(req.params.id).populate('groups');
    if (!t) return res.status(404).json({ success: false, message: 'Teacher topilmadi' });
    res.json({ success: true, data: t });
  } catch (err) {
    next(err);
  }
};

// UPDATE
exports.updateTeacher = async (req, res, next) => {
  try {
    const t = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!t) return res.status(404).json({ success: false, message: 'Teacher topilmadi' });
    res.json({ success: true, data: t });
  } catch (err) {
    next(err);
  }
};

// DELETE
exports.deleteTeacher = async (req, res, next) => {
  try {
    const t = await Teacher.findByIdAndDelete(req.params.id);
    if (!t) return res.status(404).json({ success: false, message: 'Teacher topilmadi' });

    // groups ichidan o'chirish
    await Group.updateMany(
      { teachers: t._id },
      { $pull: { teachers: t._id } }
    );

    res.json({ success: true, message: 'O\'qituvchi o\'chirildi' });
  } catch (err) {
    next(err);
  }
};
