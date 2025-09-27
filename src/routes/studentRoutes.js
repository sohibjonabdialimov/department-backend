const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');
const studentCtrl = require('../controllers/studentController');

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name kerak'),
    body('studentId').notEmpty().withMessage('studentId kerak')
  ],
  validateRequest,
  studentCtrl.createStudent
);

router.get('/', studentCtrl.getStudents);
router.get('/:id', studentCtrl.getStudentById);
router.put('/:id', studentCtrl.updateStudent);
router.delete('/:id', studentCtrl.deleteStudent);

module.exports = router;
