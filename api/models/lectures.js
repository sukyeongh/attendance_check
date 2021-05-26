const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
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

lectureSchema.statics.create = function (payload) {
  const student = new this(payload);
  return student.save();
};

// Find All
lectureSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find({});
};

// Find One by studentid
lectureSchema.statics.findOneByStudentid = function (studentid) {
  return this.findOne({ studentid });
};

// Update by studentid
lectureSchema.statics.updateByStudentid = function (studentid, payload) {
  // { new: true }: return the modified document rather than the original. defaults to false
  return this.findOneAndUpdate({ studentid }, payload, { new: true });
};

// Delete by studentid
lectureSchema.statics.deleteByStudentid = function (studentid) {
  return this.remove({ studentid });
};

// Create Model & Export
module.exports = mongoose.model('Lecture', lectureSchema);
