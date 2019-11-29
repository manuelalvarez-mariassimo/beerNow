const express = require('express');
const router  = express.Router();
const Beer = require("../models/Beer.js");
const Comment = require("../models/Comments.js");

/* GET home page */

// router.get('/:country', (req, res, next) => {
//   res.render('beers/list');
// });

// router.get('/:id', (req, res, next) => {
//   res.render('beers/details');
// });

router.get("/", (req, res) => {
  Beer.find()
    .then(beers => {
      res.render('beers/list', { beers });
    });
});

router.get("/details/:id", (req, res, next) => {
  Beer.findById(req.params.id)
    .then(beers =>
      res.render('beers/details',  beers )
    );
});

router.post("/details/:id", (req, res, next) => {
  Comment.create({
    comment: req.body.comment,
    author: req.user._id
  }).then((comment) => {
    return Beer.findByIdAndUpdate( 
      req.params.id, 
      {$push: {comments: comment._id}},
      {new: true})
  })
  .then(() => res.redirect("/"));
});


module.exports = router;