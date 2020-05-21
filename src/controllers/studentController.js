const Student = require('../models/Student');
const {
  getStudents,
  getStudentById,
  createStudent,
} = require('../modules/students');

exports.getStudents = async (req, res) => {
  const students = await getStudents();

  return res.status(200).send(students);
};

exports.getStudentById = async (req, res, next) => {
  let student = null;

  try {
    student = await getStudentById(req.params);
  } catch (e) {
    return next(e);
  }

  return res.status(200).send(student);
};

exports.postAddStudent = async (req, res, next) => {
  let createdStudent;

  try {
    createdStudent = await createStudent(req.body);
  } catch (e) {
    return next(e);
  }

  res.status(201).send(createdStudent);
};

exports.putEditStudent = async (req, res) => {
  const {
    id, name, surname, indexNumber,
  } = req.body;
  if (!id) {
    return res.status(400).send('No required credentials were provided');
  }
  const studentToEdit = await Student.findById(id);
  if (!studentToEdit) {
    return res.status(404).send({ message: 'Student was not found.' });
  }
  let isEdited = false;
  if (name) {
    studentToEdit.name = name;
    isEdited = true;
  }
  if (surname) {
    studentToEdit.surname = surname;
    isEdited = true;
  }
  if (indexNumber) {
    studentToEdit.indexNumber = indexNumber;
    isEdited = true;
  }
  if (!isEdited) {
    return res.status(200).send(studentToEdit);
  }
  const savedStudent = await studentToEdit.save();
  return res.status(200).send(savedStudent);
};

exports.deleteStudentById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send('No required credentials were provided');
  }
  const studentToDelete = await Student.findById(id);
  if (!studentToDelete) {
    return res.status(404).send({ message: 'Student was not found.' });
  }
  await studentToDelete.delete();

  return res.status(200).send({ message: 'Student was deleted successfully' });
};
