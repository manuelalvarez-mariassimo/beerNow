const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const Bar = require("../models/Bar");
const Comment = require("../models/Comments");
const Beer = require("../models/Beer");

/* GET home page */
router.get("/:id", (req, res, next) => {
  Bar.findById(req.params.id)
    .populate([{
      path: "comments",
      model : "Comment"
    }, {
      // todo
      path : "author",
      model : "User"
    }])
    .then(barFound => {
      res.render("bars/details", barFound);
    });
});

router.post("/details/:id", (req, res, next) => {
  let barID = req.params.id;
  Comment.create({
    comment: req.body.comment,
    author: req.user._id
  })
    .then(comment => {
      return Bar.findByIdAndUpdate(
        req.params.id,
        { $push: { comments: comment._id } },
        { new: true }
      );
    })
    .then(() => res.redirect(`/bars/${barID}`));
});

router.get("/:lat/:long", (req, res, next) => {
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.params.lat},${req.params.long}&radius=1500&type=bar&opennow=true&key=AIzaSyD_zFC1JIj0EgKS8Fp0GZw3MiXR1wiDxEg`
    )
    .then(payLoad => {
      let newBar = payLoad.data.results;

      Promise.all(
        newBar.map(bar => {
          return Bar.create({
            name: bar.name,
            location: {
              type: "Point",
              coordinates: [
                bar.geometry.location.lat,
                bar.geometry.location.lng
              ]
            },
            address: bar.vicinity,
            rate: bar.rating,
            images: addImages()
            // comments: [null]
          });

          function addImages() {
            let arr = [];
            bar.photos.forEach(el => {
              arr.push(el.photo_reference);
            });
            return arr;
          }
        })
      )
        .then(bars => {
          res.render("bars/list", { bars });
        })
        .catch(err => console.log(err));
    });
});

module.exports = router;
