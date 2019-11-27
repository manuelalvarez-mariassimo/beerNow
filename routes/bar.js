const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/:location', (req, res, next) => {
  res.render('/bars/list');
});

router.get('/:id', (req, res, next) => {
  res.render('/bars/details');
});

router.put('/:id/update', (req, res, next) => {
  res.render('/bars/details');
});

module.exports = router;
