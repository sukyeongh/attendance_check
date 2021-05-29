const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentid: {
    type: Number,
  },
  studentname: {
    type: String,
  },
  lectureid: {
    type: Number,
  },
});

attendanceSchema.statics.create = function (payload) {
  const attendance = new this(payload);
  return attendance.save();
};

// Find All
attendanceSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find({});
};

attendanceSchema.statics.findOneByLectureid = function (lectureid) {
  return this.find({ lectureid });
};

// Create Model & Export
module.exports = mongoose.model('Attendance', attendanceSchema);
