const router = require('express').Router();
const Lecture = require('../models/lectures');

// Find All
router.get('/', (req, res) => {
  Lecture.findAll()
    .then((lectures) => {
      if (!lectures.length) return res.status(200).send({ err: 'Lecture not found' });
      res.send(lectures);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get('/:lectureid', (req, res) => {
  Lecture.findOneByLectureid(req.params.lectureid)
    .then((lecture) => {
      if (!lecture) return res.status(200).send({ err: 'Lecture not found' });
      res.send(lecture);
    })
    .catch((err) => res.status(500).send(err));
});

router.post('/', (req, res) => {
  Lecture.create(req.body)
    .then((lecture) => res.send(lecture))
    .catch((err) => res.status(500).send(err));
});

router.put('/:lectureid', (req, res) => {
  Lecture.updateByLectureid(req.params.lectureid, req.body)
    .then((student) => res.send(student))
    .catch((err) => res.status(500).send(err));
});

router.delete('/:lectureid', (req, res) => {
  Lecture.deleteByectureid(req.params.lectureid)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
