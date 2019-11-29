const express = require("express");
const router = express.Router();
const Beer = require("../models/Beer.js");
const User = require("../models/User.js");
const Comment = require("../models/Comments.js");

/* GET home page */

// router.get('/:country', (req, res, next) => {
//   res.render('beers/list');
// });

// router.get('/:id', (req, res, next) => {
//   res.render('beers/details');
// });

router.get("/", (req, res) => {
  Beer.find().then(beers => {
    res.render("beers/list", { beers: beers, user: req.user });
  });
});

router.get("/details/:id", (req, res, next) => {
  Beer.findById(req.params.id)
    .populate([
      {
        path: "comments",
        model: "Comment"
      },
      {
        // todo
        path: "author",
        model: "User"
      }
    ])
    .then(beers => res.render("beers/details", {beers: beers, user: req.user}));
});

router.post("/details/:id", (req, res, next) => {
  Comment.create({
    comment: req.body.comment,
    author: req.user._id
  })
    .then(comment => {
      return Beer.findByIdAndUpdate(
        req.params.id,
        { $push: { comments: comment._id } },
        { new: true }
      );
    })
    .then(() => res.redirect("/"));
});

router.post("/favorites/", (req, res, next) => {
  console.log(req.body)
  User.findByIdAndUpdate(req.user._id,{$push:{favoriteBeers:req.body.url}},{new:true})
  .then(user => {
    console.log(user)
  })
  .catch(err => console.log(err));

});

module.exports = router;
