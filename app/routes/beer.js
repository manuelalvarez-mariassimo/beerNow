const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('beers/list');
});

router.get('/:country', (req, res, next) => {
  res.render('beers/list');
});

router.get('/:id', (req, res, next) => {
  res.render('/beers/details');
});

router.put('/:id/update', (req, res, next) => {
  res.render('beers/details');
});

module.exports = router;