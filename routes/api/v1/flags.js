const express = require('express');
const Flag = require('../../../models').Flag;

const router = express.Router();

/**
 * Get all valid flags
 * GET /api/v1/flags/
 */
router.get('/', (req, res) => {
  const responseData = {};

  Flag.find().exec((err, flags) => {
    if (err) {
      console.log('----------------------------------------');
      console.log(err);

      responseData.status = 500;
      responseData.message = 'Error querying for flags';

      res.status(responseData.status);
      res.json(responseData);
    } else {
      responseData.status = 200;
      responseData.flags = flags;

      res.status(responseData.status);
      res.json(responseData);
    }
  });
});

/**
 * Create a flag
 * POST /api/v1/flags/
 */
router.post('/', (req, res) => {
  const responseData = {};

  Flag.create({
    type: req.body.flag.type,
    start_date: new Date()
  }, (err) => {
    if (err) {
      console.log('----------------------------------------');
      console.log(err);

      responseData.status = 500;
      responseData.message = 'Error creating flag';

      res.status(responseData.status);
      res.json(responseData);
    } else {
      responseData.status = 201;

      res.status(responseData.status);
      res.json(responseData);
    }
  });
});

/**
 * Update a flag
 * PUT /api/v1/flags/:flagId/
 */
router.put('/:flagId/', (req, res) => {
  const responseData = {};

  Flag.findOneAndUpdate({ _id: req.params.flagId }, { type: req.body.flag.type }, {}, (err) => {
    if (err) {
      console.log('----------------------------------------');
      console.log(err);

      responseData.status = 500;
      responseData.message = 'Error updating flag';

      res.status(responseData.status);
      res.json(responseData);
    } else {
      responseData.status = 200;

      res.status(responseData.status);
      res.json(responseData);
    }
  });
});

/**
 * Delete a flag
 * DELETE /api/v1/flags/:flagId/
 */
router.delete('/:flagId/', (req, res) => {
  const responseData = {};

  Flag.remove({ _id: req.params.flagId }, (err) => {
    if (err) {
      console.log('----------------------------------------');
      console.log(err);

      responseData.status = 500;
      responseData.message = 'Error deleting flag';

      res.status(responseData.status);
      res.json(responseData);
    } else {
      responseData.status = 200;

      res.status(responseData.status);
      res.json(responseData);
    }
  });
});

module.exports = router;
