const Student = require("../models/Student");

const getStudents = async () => Student.find({});

const getStudentById = async ({ id }) => {
  if (!id) {
    throw new Error("No required credentials were provided");
  }

  return Student.findById(id);
};

const createStudent = async ({ name, surname, indexNumber }) => {
  if (!name || !surname || !indexNumber) {
    throw new Error("No required credentials provided!");
  }

  return new Student({ name, surname, indexNumber }).save();
};

const editStudent = async ({ id, name, surname, indexNumber }) => {
  let studentToEdit = null;

  if (!id) throw new Error("No ID was provided");

  studentToEdit = await Student.findById(id);
  if (!studentToEdit) {
    throw new Error({ message: "Student was not found." });
  }
  if (name) {
    studentToEdit.name = name;
  }
  if (surname) {
    studentToEdit.surname = surname;
  }
  if (indexNumber) {
    studentToEdit.indexNumber = indexNumber;
  }
  return studentToEdit;
};

const deleteStudent = async ({ id }) => {
  if (!id) {
    throw new Error("No ID was provided");
  }
  const studentToDelete = await Student.findById(id);
  console.log(studentToDelete,"Student do usunięcia");
  
  if (!studentToDelete) {
    return false;
  }
  await studentToDelete.delete();
  return true;
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  editStudent,
  deleteStudent,
};
