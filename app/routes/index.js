const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/results', (req, res, next) => {
  res.render('results');
});

router.get('/landing', (req, res, next) => {
  res.render('landing');
});

module.exports = router;
