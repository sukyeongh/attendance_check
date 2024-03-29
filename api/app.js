// ENV
require('dotenv').config();
// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Static File Service
app.use(express.static('public'));
// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Node의 native Promise 사용
mongoose.Promise = global.Promise;

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/attendance')
  .then(() => console.log('Successfully connected to mongodb'))
  .catch((e) => console.error(e));

app.all('/*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
  next();
});

// ROUTERS
app.use('/api/students', require('./routes/students'));
app.use('/api/professors', require('./routes/professors'));
app.use('/api/lectures', require('./routes/lectures'));
app.use('/api/attendances', require('./routes/attendances'));

app.listen(port, () => console.log(`Server listening on port ${port}`));
