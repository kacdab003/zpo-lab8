const Student = require("../models/Student");
const {
  getStudents,
  getStudentById,
  createStudent,
  editStudent,
  deleteStudent,
} = require("./students");

let student1;
let student2;

beforeAll(async () => {
  student1 = new Student({
    name: "student-1",
    surname: "test-surname-1",
    indexNumber: 1234,
  });
  student2 = await student1.save();

  student2 = new Student({
    name: "student-2",
    surname: "test-surname-2",
    indexNumber: 4321,
  });
  student2 = await student2.save();
});

afterAll(async () => Student.deleteMany({}));

describe("students -> getStudents", () => {
  it("should return all students", async () => {
    const students = await getStudents();

    expect(students).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "student-1" }),
        expect.objectContaining({ name: "student-2" }),
      ])
    );
  });
});

describe("students -> getStudentById", () => {
  it("should throw if no _id", async () => {
    await expect(getStudentById({})).rejects.toEqual(
      new Error("No required credentials were provided")
    );
  });

  it("should return student with given _id", async () => {
    const student = await getStudentById({ id: student1._id });

    expect(student).toEqual(
      expect.objectContaining({
        name: "student-1",
        surname: "test-surname-1",
        indexNumber: 1234,
      })
    );
  });
});
describe("students -> postAddStudent", () => {
  it("Should create a student with valid _id", async () => {
    const studentsCredentials = {
      name: "Testowy",
      surname: "Student",
      indexNumber: 113018,
    };
    const studentToCreate = await createStudent(studentsCredentials);

    expect(studentToCreate).toHaveProperty("_id");
  });
  it("Should throw if name is not passed", async () => {
    const studentsCredentials = {
      surname: "Student",
      indexNumber: 113018,
    };
    await expect(createStudent(studentsCredentials)).rejects.toEqual(
      new Error("No required credentials provided!")
    );
  });
  it("Should throw if surname is not passed", async () => {
    const studentsCredentials = {
      name: "Testowy",
      indexNumber: 113018,
    };
    await expect(createStudent(studentsCredentials)).rejects.toEqual(
      new Error("No required credentials provided!")
    );
  });
  it("Should throw if IndexNumber is not passed", async () => {
    const studentsCredentials = {
      name: "Testowy",
      surname: "Student",
    };

    await expect(createStudent(studentsCredentials)).rejects.toEqual(
      new Error("No required credentials provided!")
    );
  });
});
describe("students -> putEditStudent", () => {
  it("Should throw an error if no id is provided to the function", async () => {
    const studentCredentials = {
      name: "Name",
      surname: "ToChange",
      indexNumber: 1234,
    };
    await expect(editStudent(studentCredentials)).rejects.toEqual(
      new Error("No ID was provided")
    );
  });
  it("Should modify students name in a database", async () => {
    const studentsCredentials = {
      id: student1._id,
      name: "Passed",
    };
    const studentToModify = await editStudent(studentsCredentials);
    await studentToModify.save();
    const modifiedStudent = await getStudentById({
      id: studentsCredentials.id,
    });
    expect(modifiedStudent.name).toEqual("Passed");
  });
  it("Should modify students surname in a database", async () => {
    const studentsCredentials = {
      id: student1._id,
      surname: "Passed",
    };
    const studentToModify = await editStudent(studentsCredentials);
    await studentToModify.save();
    const modifiedStudent = await getStudentById({
      id: studentsCredentials.id,
    });
    expect(modifiedStudent.surname).toEqual("Passed");
  });
  it("Should modify students name in a database", async () => {
    const studentsCredentials = {
      id: student1._id,
      indexNumber: 9999,
    };
    const studentToModify = await editStudent(studentsCredentials);
    await studentToModify.save();
    const modifiedStudent = await getStudentById({
      id: studentsCredentials.id,
    });
    expect(modifiedStudent.indexNumber).toEqual(9999);
  });
});
describe("students -> deleteStudent", () => {
  it("should throw if no id is provided", async () => {
    const dummyObjectWithoutID = {
      list: [],
      object: {},
      string: "I have no ID what am I doing",
    };
    await expect(deleteStudent(dummyObjectWithoutID)).rejects.toEqual(
      new Error("No ID was provided")
    );
  });
  it("should return true if student was deleted", async () => {
    console.log(student1._id);

    const studentToDelete = {
      id: student1._id.toString(),
    };
    const isRemoved = await deleteStudent(studentToDelete);
    console.log(isRemoved);

    await expect(isRemoved).toEqual(true);
  });
  it("should return false if student was not deleted", async () => {
    const studentToDelete = {
      id: "5ec6df0b2d58dc25f30b9090", //dummy id, user wont be found
    };
    const isRemoved = await deleteStudent(studentToDelete);
    console.log(isRemoved);

    await expect(isRemoved).toEqual(false);
  });
});
