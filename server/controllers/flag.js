const express = require('express');
const router = express.Router();
const Flag = require('../models/flag');

router.get('/allflags', (req, res) => {
  Flag.find({}, (error, flags) => {
    if (error) {
      res.send(error);
    } else {
      res.status(200).json(flags);
    }

  });
});

router.get('/flag/:id', (req, res) => {
  Flag.findById(req.params.id, (error, flag) => {
    if (error) {
      res.send(error);
    } else {
      res.status(200).json(flag);
    }

  });
});

router.post('/flag', (req, res) => {
  const newFlag = Flag({
    flagType: req.body.flagType,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });
  newFlag.save(error => {
    if (error) {
      res.send(error);
    } else {
      res.status(200).send();
    }
  });
});

router.put('/flag/:id', (req, res) => {
  Flag.findByIdAndUpdate(req.params.id, {
    flagType: req.body.flagType,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  }, error => {
    if (error) {
      res.send(error);
    } else {
      res.status(200).send();
    }
  });
});

router.delete('/flag/:id', (req, res) => {
  Flag.findByIdAndRemove(req.params.id, error => {
    if (error) {
      res.send(error);
    } else {
      res.status(200).send();
    }

  });
});

module.exports = router;
