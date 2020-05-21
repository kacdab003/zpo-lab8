const Student = require('../models/Student');

const getStudents = async () => Student.find({});

const getStudentById = async ({ id }) => {
  if (!id) {
    throw new Error('No required credentials were provided');
  }

  return Student.findById(id);
};

const createStudent = async ({ name, surname, indexNumber }) => {
  if (!name || !surname || !indexNumber) {
    throw new Error('No required credentials provided!');
  }

  return new Student({ name, surname, indexNumber }).save();
};

const editStudent = async (id = null) => {

};

const deleteStudent = async (id = null) => {

};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  editStudent,
  deleteStudent,
};
