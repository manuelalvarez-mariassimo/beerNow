const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Bar = require("../models/Bar");


const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login", {layout: false});
});



router.get("/profile/:id", (req, res, next) => {
  Bar.find().then(b=>console.log(b))
  User.findById(req.params.id)
  .populate('favoriteBars')
  .populate('favoriteBeers')
   .then(user => {
     console.log(user)
      // res.json(user.favoriteBeers[0].name)
      res.render('auth/profile', {user: user, layout: false} )
   })
   .catch(err => console.log(err))
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});



router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const country = req.body.country;
  const city = req.body.city;
  const password = req.body.password;



  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

      const newUser = new User({
        username,
        email,
        country,
        city,
        password: hashPass
      });
  
    newUser.save()

    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});


passport.use(
  new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({
          googleID: profile.id
        })
        .then(user => {
          if (user) {
            done(null, user);
            return;
          }
          console.log(profile)
          const newUser = {
            username: profile.name.givenName,
            password: profile.id,
            email: profile.emails[0].value,
            country: null,
            city: null,
            picture: profile.photos[0].value,
          }
          User.create(newUser)
            .then(newUser => {
              done(null, newUser);
            })
            .catch(err => done(err)); // closes User.create()
        })
        .catch(err => done(err)); // closes User.findOne()
    }
  )
);

router.get("/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/" // here you would redirect to the login page using traditional login approach
  })
);


module.exports = router;
