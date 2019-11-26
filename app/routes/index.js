const express = require('express');
const router  = express.Router();
const Bar = require("../models/Bar");


// Google apis
let apiUrl;
let apiKey = process.env.GOOGLE_MAPS_API_KEY;


// Google apis
let apiUrl;
let apiKey = process.env.GOOGLE_MAPS_API_KEY;


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/location', (req, res, next) => {
 
  apiUrl=`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&key=${apiKey}`
  res.json({apiUrl})
});


router.get('/results', (req, res, next) => {
  apiUrl=`https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
  res.render("results", {apiUrl});
});

router.get('/landing', (req, res, next) => {
  res.render('landing');
});

module.exports = router;
