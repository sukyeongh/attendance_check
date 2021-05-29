const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentid: {
    type: Number,
  },
  pw: {
    type: String,
  },
  name: {
    type: String,
  },
});

studentSchema.statics.create = function (payload) {
  const student = new this(payload);
  return student.save();
};

// Find All
studentSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find({});
};

// Find One by studentid
studentSchema.statics.findOneByStudentidAndPW = function (studentid, pw) {
  return this.findOne({ studentid, pw });
};

// Find One by studentid
studentSchema.statics.findOneByStudentid = function (studentid) {
  return this.findOne({ studentid });
};

// Update by studentid
studentSchema.statics.updateByStudentid = function (studentid, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ studentid }, payload, { new: true });
};

// Delete by studentid
studentSchema.statics.deleteByStudentid = function (studentid) {
  return this.remove({ studentid });
};

// Create Model & Export
module.exports = mongoose.model('Student', studentSchema);
