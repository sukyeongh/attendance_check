const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  lectureid: {
    type: Number,
  },
  title: {
    type: String,
  },
  day: {
    type: String,
  },
  professor: {
    type: String,
  },
});

lectureSchema.statics.create = function (payload) {
  const lecture = new this(payload);
  return lecture.save();
};

lectureSchema.statics.findAll = function () {
  // V4부터 exec() 필요없음
  return this.find({});
};

lectureSchema.statics.findOneByLectureid = function (lectureid) {
  return this.findOne({ lectureid });
};

lectureSchema.statics.updateByLectureid = function (lectureid, payload) {
  return this.findOneAndUpdate({ lectureid }, payload, { new: true });
};

lectureSchema.statics.deleteByLectureid = function (lectureid) {
  return this.remove({ lectureid });
};

module.exports = mongoose.model('Lecture', lectureSchema);
