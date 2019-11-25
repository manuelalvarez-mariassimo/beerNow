// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Bar = require("../models/Bar");
const Beer  = require("../models/Beer");
const Comment = require("../models/Comments");

const bcryptSalt = 10;

mongoose
  .connect(`mongodb://localhost/${process.env.DB}`, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

/* ----------- Users ----------- */

let users = [
  {
    username: "Maria",
    country: "Spain",
    city: "Murcia",
    password: bcrypt.hashSync("Maria", bcrypt.genSaltSync(bcryptSalt)),
    email: "mariasimo@gmail.com"
  },
  {
    username: "Manuee",
    country: "Spain",
    city: "Sevilla",
    password: bcrypt.hashSync("Manuee", bcrypt.genSaltSync(bcryptSalt)),
    email: "manualvarezrosado@gmail.com"
  }
];

User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(el => el._id));

    return Comment.deleteMany().then(() => {
      return Comment.insertMany([
        {
          comment: "Great bar",
          author: usersCreated[0]._id
        },
        {
          comment: "Great bar",
          author: usersCreated[1]._id
        }
      ]);
    });
  })
  .then(commentsCreated => {
    console.log(`${commentsCreated.length} comments created with the following id:`);
    console.log(commentsCreated.map(el => el._id));
 
    return Beer.deleteMany().then(() => {
      return Beer.insertMany(
        [
          {
            name : "Alhambra",
            country : "España",
            style : "Peperoni",
            description : "Lorem ipsun",
            rate: 3.5,
            alcohol : 40,
            image : "https://i.ibb.co/gSbgf9K/male-placeholder.jpg",
            comments : null,
            favoriteBy: null
          },
          {
            name : "Estrella Galicia",
            country : "España",
            style : "Queso",
            description : "Lorem ipsun",
            rate: 4.4,
            alcohol : 40,
            image : "https://i.ibb.co/gSbgf9K/male-placeholder.jpg",
            comments : null,
            favoriteBy: null
          },
        ]
      )
    })
  })
  .then(beersCreated => {
    console.log(`${beersCreated.length} beers created with the following id:`);
    console.log(beersCreated.map(el => el._id));
 
    return Bar.deleteMany().then(() => {
      return Bar.insertMany(
        [
          {
            name : "Bar 1",
            location: null,
            address : "St. 1, Rome, Italy",
            rate: 4.5,
            images : null,
            comments: null,
            favoriteBy : null
          },
          {
            name : "Bar 2",
            location: null,
            address : "St. 2, Rome, Italy",
            rate: 4.5,
            images : null,
            comments: null,
            favoriteBy : null
          },
        ]
      )
    })
  })
  .then(barsCreated => {
    console.log(`${barsCreated.length} bars created with the following id:`);
    console.log(barsCreated.map(el => el._id));
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });

