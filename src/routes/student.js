const express = require('express');

const router = express.Router();
const studentsController = require('../controllers/studentController');

router.get('/', studentsController.getStudents);
router.get('/:id', studentsController.getStudentById);
router.post('/', studentsController.postAddStudent);
router.put('/', studentsController.putEditStudent);
router.delete('/:id', studentsController.deleteStudentById);
module.exports = router;