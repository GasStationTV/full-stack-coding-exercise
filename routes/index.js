const express = require('express');

const router = express.Router();

/**
 * Serve react app
 * GET /
 */
router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
