const express = require('express');
const router  = express.Router();

// Google apis
let apiUrl;
let apiKey = process.env.GOOGLE_MAPS_API_KEY;


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/location', (req, res, next) => {
  res.json(req.body)
});


router.post('/results', (req, res, next) => {
  apiUrl=`https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
  res.render("results", {apiUrl});
});

router.get('/landing', (req, res, next) => {
  res.render('landing');
});

module.exports = router;
