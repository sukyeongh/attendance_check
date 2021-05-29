const router = require('express').Router();
const Professor = require('../models/professors');

// Find All
router.get('/', (req, res) => {
  Professor.findAll()
    .then((professors) => {
      if (!professors.length) return res.status(200).send({ err: 'Professor not found' });
      res.send(professors);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get('/:professorid', (req, res) => {
  Professor.findOneByProfessorid(req.params.professorid, req.query.pw)
    .then((professor) => {
      if (!professor) return res.status(200).send({ err: 'Professor not found' });
      res.send(true);
    })
    .catch((err) => res.status(500).send(err));
});

router.post('/', (req, res) => {
  Professor.create(req.body)
    .then((professor) => res.send(professor))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
