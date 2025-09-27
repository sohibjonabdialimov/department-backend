const Group = require('../models/Group');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Subject = require('../models/Subject');

// CRUD
exports.createGroup = async (req, res, next) => {
  try {
    const g = await Group.create(req.body);
    res.status(201).json({ success: true, data: g });
  } catch (err) { next(err); }
};

exports.getGroups = async (req, res, next) => {
  try {
    const groups = await Group.find()
      .populate('teachers')
      .populate('students')
      .populate('subjects');
    res.json({ success: true, data: groups });
  } catch (err) { next(err); }
};

exports.getGroupById = async (req, res, next) => {
  try {
    const g = await Group.findById(req.params.id)
      .populate('teachers')
      .populate('students')
      .populate('subjects');
    if (!g) return res.status(404).json({ success: false, message: 'Group topilmadi' });
    res.json({ success: true, data: g });
  } catch (err) { next(err); }
};

exports.updateGroup = async (req, res, next) => {
  try {
    const g = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!g) return res.status(404).json({ success: false, message: 'Group topilmadi' });
    res.json({ success: true, data: g });
  } catch (err) { next(err); }
};

exports.deleteGroup = async (req, res, next) => {
  try {
    const g = await Group.findByIdAndDelete(req.params.id);
    if (!g) return res.status(404).json({ success: false, message: 'Group topilmadi' });

    // Guruh o'chirilganda, tegishli modellardan uni olib tashlaymiz
    await Teacher.updateMany({ groups: g._id }, { $pull: { groups: g._id } });
    await Student.updateMany({ groups: g._id }, { $pull: { groups: g._id } });
    await Subject.updateMany({ groups: g._id }, { $pull: { groups: g._id } });

    res.json({ success: true, message: 'Guruh o\'chirildi' });
  } catch (err) { next(err); }
};

/* --- Assigment endpoints --- */

// Add teacher(s) to group
exports.addTeachersToGroup = async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const { teacherIds } = req.body; // expect array of ids or single id

    const ids = Array.isArray(teacherIds) ? teacherIds : [teacherIds];

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ success: false, message: 'Group topilmadi' });

    // add to group (avoid duplicates)
    ids.forEach(id => {
      if (!group.teachers.includes(id)) group.teachers.push(id);
    });
    await group.save();

    // add group ref to teacher docs
    await Teacher.updateMany(
      { _id: { $in: ids } },
      { $addToSet: { groups: group._id } }
    );

    const populated = await Group.findById(groupId).populate('teachers');
    res.json({ success: true, data: populated });
  } catch (err) { next(err); }
};

// Remove teacher from group
exports.removeTeacherFromGroup = async (req, res, next) => {
  try {
    const { id: groupId, teacherId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ success: false, message: 'Group topilmadi' });

    group.teachers.pull(teacherId);
    await group.save();

    await Teacher.findByIdAndUpdate(teacherId, { $pull: { groups: group._id } });

    res.json({ success: true, message: 'O\'qituvchi guruhdan yechildi' });
  } catch (err) { next(err); }
};

// Add students to group
exports.addStudentsToGroup = async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const { studentIds } = req.body;
    const ids = Array.isArray(studentIds) ? studentIds : [studentIds];

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ success: false, message: 'Group topilmadi' });

    ids.forEach(id => { if(!group.students.includes(id)) group.students.push(id); });
    await group.save();

    await Student.updateMany({ _id: { $in: ids } }, { $addToSet: { groups: group._id } });

    const populated = await Group.findById(groupId).populate('students');
    res.json({ success: true, data: populated });
  } catch (err) { next(err); }
};

// Remove student from group
exports.removeStudentFromGroup = async (req, res, next) => {
  try {
    const { id: groupId, studentId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ success: false, message: 'Group topilmadi' });

    group.students.pull(studentId);
    await group.save();

    await Student.findByIdAndUpdate(studentId, { $pull: { groups: group._id } });

    res.json({ success: true, message: 'Student guruhdan yechildi' });
  } catch (err) { next(err); }
};

// Add subjects to group
exports.addSubjectsToGroup = async (req, res, next) => {
  try {
    const groupId = req.params.id;
    const { subjectIds } = req.body;
    const ids = Array.isArray(subjectIds) ? subjectIds : [subjectIds];

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ success: false, message: 'Group topilmadi' });

    ids.forEach(id => { if(!group.subjects.includes(id)) group.subjects.push(id); });
    await group.save();

    await Subject.updateMany({ _id: { $in: ids } }, { $addToSet: { groups: group._id } });

    const populated = await Group.findById(groupId).populate('subjects');
    res.json({ success: true, data: populated });
  } catch (err) { next(err); }
};

// Remove subject from group
exports.removeSubjectFromGroup = async (req, res, next) => {
  try {
    const { id: groupId, subjectId } = req.params;
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ success: false, message: 'Group topilmadi' });

    group.subjects.pull(subjectId);
    await group.save();

    await Subject.findByIdAndUpdate(subjectId, { $pull: { groups: group._id } });

    res.json({ success: true, message: 'Fan guruhdan yechildi' });
  } catch (err) { next(err); }
};
