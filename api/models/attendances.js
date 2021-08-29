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

attendanceSchema.statics.findAll = function () {
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

module.exports = mongoose.model('Attendance', attendanceSchema);
