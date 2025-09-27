const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');
const teacherCtrl = require('../controllers/teacherController');

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name kerak'),
    body('email').isEmail().withMessage('Valid email kiriting')
  ],
  validateRequest,
  teacherCtrl.createTeacher
);

router.get('/', teacherCtrl.getTeachers);
router.get('/:id', teacherCtrl.getTeacherById);
router.put('/:id', teacherCtrl.updateTeacher);
router.delete('/:id', teacherCtrl.deleteTeacher);

module.exports = router;
