const Student = require('../models/Student')
exports.getStudents = async (req, res, next) => {
    const students = await Student.find({});
    return res.status(200).send(students);
}
exports.getStudentById = async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send('No required credentials were provided');
    }
    const student = await Student.findById(id);
    if (!student) {
        return res.status(404).send({message: 'Student with this id was not found.'})
    }
    return res.status(200).send(student);
}

exports.postAddStudent = async (req, res, next) => {
    const {name, surname, indexNumber} = req.body;
    if (!name || !surname || !indexNumber) {
        return res.status(400).send('No required credentials were provided');
    }
    const student = new Student({name, surname, indexNumber});
    const savedStudent = await student.save();
    res.status(201).send(savedStudent);
}
exports.putEditStudent = async (req, res, next) => {
    const {id, name, surname, indexNumber} = req.body;
    if (!id) {
        return res.status(400).send('No required credentials were provided');
    }
    const studentToEdit = await Student.findById(id);
    if (!studentToEdit) {
        return res.status(404).send({message: 'Student was not found.'})
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


}
exports.deleteStudentById = async (req, res, next) => {
    const {id} = req.params;
    if (!id) {
        return res.status(400).send('No required credentials were provided');
    }
    const studentToDelete = await Student.findById(id);
    if (!studentToDelete) {
        return res.status(404).send({message: 'Student was not found.'})
    }
    await studentToDelete.delete();

    return res.status(200).send({message: 'Student was deleted successfully'})

}