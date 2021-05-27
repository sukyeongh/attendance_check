const router = require('express').Router();
const Student = require('../models/students');

// Find All
router.get('/', (req, res) => {
  Student.findAll()
    .then((students) => {
      if (!students.length) return res.status(404).send({ err: 'Student not found' });
      res.send(`find successfully: ${students}`);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Find One by studentid
router.get('/:studentid', (req, res) => {
  Student.findOneByStudentid(req.params.studentid)
    .then((student) => {
      if (!student) return res.status(404).send({ err: 'Student not found' });
      res.send(`findOne successfully: ${student}`);
    })
    .catch((err) => res.status(500).send(err));
});

// Create new student document
router.post('/', (req, res) => {
  Student.create(req.body)
    .then((student) => res.send(student))
    .catch((err) => res.status(500).send(err));
});

// Update by studentid
router.put('/:studentid', (req, res) => {
  Student.updateByStudentid(req.params.studentid, req.body)
    .then((student) => res.send(student))
    .catch((err) => res.status(500).send(err));
});

// Delete by studentid
router.delete('/:studentid', (req, res) => {
  Student.deleteByStudentid(req.params.studentid)
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
