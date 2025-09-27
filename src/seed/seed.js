require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Subject = require('../models/Subject');
const Group = require('../models/Group');

const seed = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    // Tozalash
    await Teacher.deleteMany({});
    await Student.deleteMany({});
    await Subject.deleteMany({});
    await Group.deleteMany({});

    // Sample teachers
    const teachers = await Teacher.insertMany([
      { name: 'Dr. Ali Akbarov', email: 'ali.akbarov@example.com', department: 'CS', title: 'Professor' },
      { name: 'Nodira Xudoyberdieva', email: 'nodira.x@example.com', department: 'Math', title: 'Docent' }
    ]);

    // Sample students
    const students = await Student.insertMany([
      { name: 'Olimjon Tursunov', email: 'olimjon@example.com', studentId: 'S2025001', year: 1 },
      { name: 'Laylo Karimova', email: 'laylo@example.com', studentId: 'S2025002', year: 1 }
    ]);

    // Sample subjects
    const subjects = await Subject.insertMany([
      { name: 'Introduction to Programming', code: 'CS101', credits: 4, semester: 'Fall' },
      { name: 'Linear Algebra', code: 'MATH101', credits: 3, semester: 'Fall' }
    ]);

    // Sample group
    const group = await Group.create({
      name: 'CS-101',
      year: 2025,
      program: 'Computer Science',
      capacity: 30
    });

    // Assign teachers, students, subjects to group (update both sides)
    group.teachers = teachers.map(t => t._id);
    group.students = students.map(s => s._id);
    group.subjects = subjects.map(s => s._id);
    await group.save();

    await Teacher.updateMany({ _id: { $in: group.teachers } }, { $addToSet: { groups: group._id } });
    await Student.updateMany({ _id: { $in: group.students } }, { $addToSet: { groups: group._id } });
    await Subject.updateMany({ _id: { $in: group.subjects } }, { $addToSet: { groups: group._id } });

    console.log('Seeding tugadi. Namuna ma\'lumotlar yuklandi.');
    process.exit(0);
  } catch (err) {
    console.error('Seed xato:', err);
    process.exit(1);
  }
};

seed();
