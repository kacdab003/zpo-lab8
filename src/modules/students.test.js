const Student = require('../models/Student');
const { getStudents, getStudentById } = require('./students');

let student1;
let student2;

beforeAll(async () => {
  student1 = new Student({
    name: 'student-1', surname: 'test-surname-1', indexNumber: 1234,
  });
  await student1.save();

  student2 = await new Student({
    name: 'student-2', surname: 'test-surname-2', indexNumber: 4321,
  }).save();
});

afterAll(async () => Student.deleteMany({}));

describe('students -> getStudents', () => {
  it('should return all students', async () => {
    const students = await getStudents();

    expect(students).toEqual(
      expect.arrayContaining(
        [
          expect.objectContaining({ name: 'student-1' }),
          expect.objectContaining({ name: 'student-2' }),
        ],
      ),
    );
  });
});

describe('students -> getStudentById', () => {
  it('should throw if no _id', async () => {
    await expect(getStudentById({})).rejects.toEqual(new Error('No required credentials were provided'));
  });

  it('should return student with given _id', async () => {
    const student = await getStudentById({ id: student1._id });

    expect(student).toEqual(expect.objectContaining({
      name: 'student-1', surname: 'test-surname-1', indexNumber: 1234,
    }));
  });
});
