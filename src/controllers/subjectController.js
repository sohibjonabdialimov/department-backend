const Subject = require('../models/Subject');
const Group = require('../models/Group');

exports.createSubject = async (req, res, next) => {
  try {
    const sub = await Subject.create(req.body);
    res.status(201).json({ success: true, data: sub });
  } catch (err) { next(err); }
};

exports.getSubjects = async (req, res, next) => {
  try {
    const subjects = await Subject.find().populate('groups');
    res.json({ success: true, data: subjects });
  } catch (err) { next(err); }
};

exports.getSubjectById = async (req, res, next) => {
  try {
    const s = await Subject.findById(req.params.id).populate('groups');
    if (!s) return res.status(404).json({ success: false, message: 'Subject topilmadi' });
    res.json({ success: true, data: s });
  } catch (err) { next(err); }
};

exports.updateSubject = async (req, res, next) => {
  try {
    const s = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!s) return res.status(404).json({ success: false, message: 'Subject topilmadi' });
    res.json({ success: true, data: s });
  } catch (err) { next(err); }
};

exports.deleteSubject = async (req, res, next) => {
  try {
    const s = await Subject.findByIdAndDelete(req.params.id);
    if (!s) return res.status(404).json({ success: false, message: 'Subject topilmadi' });
    await Group.updateMany({ subjects: s._id }, { $pull: { subjects: s._id } });
    res.json({ success: true, message: 'Fan o\'chirildi' });
  } catch (err) { next(err); }
};
