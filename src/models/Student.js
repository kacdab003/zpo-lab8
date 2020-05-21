
const mongoose = require('../libs/mongoose');

const { Schema, model } = mongoose;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  indexNumber: {
    type: Number,
    required: true,
  },
});

module.exports = model('Student', studentSchema);
