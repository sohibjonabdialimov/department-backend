const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');
const subjectCtrl = require('../controllers/subjectController');

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name kerak')
  ],
  validateRequest,
  subjectCtrl.createSubject
);

router.get('/', subjectCtrl.getSubjects);
router.get('/:id', subjectCtrl.getSubjectById);
router.put('/:id', subjectCtrl.updateSubject);
router.delete('/:id', subjectCtrl.deleteSubject);

module.exports = router;
