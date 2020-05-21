require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

const app = express();
const studentsRoutes = require('./routes/student');

app.use(bodyParser.json());
app.use('/students', studentsRoutes);

app.listen(PORT, () => {
  console.log(`App runs on port ${PORT}`);
});
