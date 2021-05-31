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

attendanceSchema.statics.findOneByLectureAndStudentid = function (lectureid, studentid) {
  return this.findOne({ lectureid, studentid });
};

attendanceSchema.statics.deleteByLectureid = function (lectureid, studentid) {
  return this.deleteOne({ lectureid, studentid });
};

attendanceSchema.statics.deleteByLectureidOnReset = function (lectureid) {
  return this.deleteMany({ lectureid });
};

// Create Model & Export
module.exports = mongoose.model('Attendance', attendanceSchema);
