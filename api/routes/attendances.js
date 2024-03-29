const router = require('express').Router();
const Attendance = require('../models/attendances');

// Find All
router.get('/', (req, res) => {
  Attendance.findAll()
    .then((attendances) => {
      if (!attendances.length) return res.status(200).send({ err: 'Attendance not found' });
      res.send(attendances);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.post('/', (req, res) => {
  Attendance.create(req.body)
    .then((attendance) => res.send(true))
    .catch((err) => res.status(500).send(err));
});

router.get('/:lectureid', (req, res) => {
  Attendance.findOneByLectureid(req.params.lectureid)
    .then((attendance) => {
      if (!attendance) return res.status(200).send({ err: 'Lecture not found' });
      res.send(attendance);
    })
    .catch((err) => res.status(500).send(err));
});

router.get('/attend/:lectureid', (req, res) => {
  Attendance.findOneByLectureAndStudentid(req.params.lectureid, req.query.studentid)
    .then((attendance) => {
      if (!attendance) return res.status(200).send(false);
      res.send(true);
    })
    .catch((err) => res.status(500).send(err));
});

router.delete('/:lectureid', (req, res) => {
  Attendance.deleteByLectureid(req.params.lectureid, req.query.studentid)
    .then(() => res.send(true))
    .catch((err) => res.status(500).send(err));
});

router.delete('/reset/:lectureid', (req, res) => {
  Attendance.deleteByLectureidOnReset(req.params.lectureid)
    .then(() => res.send(true))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
