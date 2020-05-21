const Student = require("../models/Student");
const {
  getStudents,
  getStudentById,
  createStudent,
  editStudent,
  deleteStudent,
} = require("../modules/students");

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
  try {
    const studentAfterEdit = await editStudent(req.body).save();
    return res.status(200).send(studentAfterEdit);
  } catch (e) {
    return next(e);
  }
};

exports.deleteStudentById = async (req, res, next) => {
  try {
    const isRemoved = await deleteStudent(req.params);
    if (isRemoved) {
      return res
        .status(200)
        .send({ message: "Student was deleted successfully" });
    }
    return res
      .status(400)
      .send({ message: "Student was not removed (Maybe was not found?)" });
  } catch (e) {
    next(e);
  }
};
