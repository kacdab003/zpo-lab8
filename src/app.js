const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const app = express();
const studentsRoutes = require('./routes/student');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/students', studentsRoutes);
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(result => {
    app.listen(port, () => {
        console.log('App runs on port ' + port);
    });
})
//5e9172c29e58b24b53c23c68