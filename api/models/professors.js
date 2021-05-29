const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
  professorid: {
    type: Number,
  },
  pw: {
    type: String,
  },
  name: {
    type: String,
  },
});

professorSchema.statics.create = function (payload) {
  const professor = new this(payload);
  return professor.save();
};

// Find All
professorSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find({});
};

professorSchema.statics.findOneByProfessorid = function (professorid, pw) {
  return this.findOne({ professorid, pw });
};

professorSchema.statics.updateByProfessorid = function (professorid, payload) {
  return this.findOneAndUpdate({ professorid }, payload, { new: true });
};

professorSchema.statics.deleteByProfessorid = function (professorid) {
  return this.remove({ professorid });
};

module.exports = mongoose.model('Professor', professorSchema);
