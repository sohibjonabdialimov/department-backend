const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');
const groupCtrl = require('../controllers/groupController');

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Guruh nomi kerak')
  ],
  validateRequest,
  groupCtrl.createGroup
);

router.get('/', groupCtrl.getGroups);
router.get('/:id', groupCtrl.getGroupById);
router.put('/:id', groupCtrl.updateGroup);
router.delete('/:id', groupCtrl.deleteGroup);

/* Assignment endpoints */
router.post('/:id/teachers', [
  body('teacherIds').notEmpty().withMessage('teacherIds kerak (array yoki id)')
], validateRequest, groupCtrl.addTeachersToGroup);
router.delete('/:id/teachers/:teacherId', groupCtrl.removeTeacherFromGroup);

router.post('/:id/students', [
  body('studentIds').notEmpty().withMessage('studentIds kerak (array yoki id)')
], validateRequest, groupCtrl.addStudentsToGroup);
router.delete('/:id/students/:studentId', groupCtrl.removeStudentFromGroup);

router.post('/:id/subjects', [
  body('subjectIds').notEmpty().withMessage('subjectIds kerak (array yoki id)')
], validateRequest, groupCtrl.addSubjectsToGroup);
router.delete('/:id/subjects/:subjectId', groupCtrl.removeSubjectFromGroup);

module.exports = router;
