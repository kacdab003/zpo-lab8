
const {Schema,model} = require('mongoose');

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    indexNumber: {
        type: Number,
        required: true
    }
})
module.exports = model('Student',studentSchema);
