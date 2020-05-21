const express = require('express');

const router = express.Router();
const studentsController = require('../controllers/studentController');
const errorMiddleware = require('../middlewares/errorMiddleware');

router.get('/', studentsController.getStudents);
router.get('/:id', studentsController.getStudentById);
router.post('/', studentsController.postAddStudent);
router.put('/', studentsController.putEditStudent);
router.delete('/:id', studentsController.deleteStudentById);
router.use(errorMiddleware);

module.exports = router;
