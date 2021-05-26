// ENV
require('dotenv').config();
// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

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
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to mongodb'))
  .catch((e) => console.error(e));

// ROUTERS
app.use('/students', require('./routes/students'));

app.listen(port, () => console.log(`Server listening on port ${port}`));