const { app } = require("../src/app");
const request = require("supertest");
beforeAll(() => {
  process.env.NODE_ENV = "test";
});
test("create student", async () => {
  const studentToCreate = JSON.stringify({
    name: "Kacper",
    surname: "Dąbrowski",
    indexNumber: 113018,
  });
  const res = await request(app)
    .post("/students/")
    .set("Accept", /application\/json/)
    .send(studentToCreate)
    .expect(200);
    console.log(res);
});


