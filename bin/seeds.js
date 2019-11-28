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
  .connect(`${process.env.DB}`, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

/* ----------- Users ----------- */
let commentsArr = null;
let beersArr = null;

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
  },
  {
    username: "Anne",
    country: "UK",
    city: "Brighton",
    password: bcrypt.hashSync("Anne", bcrypt.genSaltSync(bcryptSalt)),
    email: "anne.doe@gmail.com"
  },
  {
    username: "Francesco",
    country: "Italy",
    city: "Milan",
    password: bcrypt.hashSync("Francesco", bcrypt.genSaltSync(bcryptSalt)),
    email: "francesco.doe@gmail.com"
  },
  {
    username: "Benoît",
    country: "France",
    city: "Lyon",
    password: bcrypt.hashSync("Benoît", bcrypt.genSaltSync(bcryptSalt)),
    email: "benoit.doe@gmail.com"
  }
];

return User.deleteMany()
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
          comment: "We found this bar in BeerNow. Beer's expensive but the place and the people are very cool. They also have live music shows!",
          author: usersCreated[1]._id
        },
        {
          comment: "Small bar very good prices for Rome. They had Peronni",
          author: usersCreated[2]._id
        },
        {
          comment: "Pours golden with thin white head, medium carbonation. Taste has a lemon and orange taste. Finish is bxready malts",
          author: usersCreated[2]._id
        }, 
        {
          comment: "We had it in our last trip to Italy! Very famous there",
          author: usersCreated[2]._id
        },
        {
          comment: "One of my favorites!",
          author: usersCreated[3]._id
        },
        {
          comment: "It is a real enjoyable beer. Clear and lightly colour and a bright sparks. Definitely a very good european lager. Taste it.",
          author: usersCreated[3]._id
        },
        {
          comment: "One of my favorites places!",
          author: usersCreated[4]._id
        },
      ]);
    });
  })
  .then(commentsCreated => {
    console.log(`${commentsCreated.length} comments created with the following id:`);
    console.log(commentsCreated.map(el => el._id));
 
    commentsArr = commentsCreated;

    return Beer.deleteMany().then(() => {
      return Beer.insertMany(
        [
          {
            name : "Moretti La Rossa",
            country : "Italy",
            style : "Traditional German-Style Bock",
            description : "Birra Moretti La Rossa is a double boch beer produced using high quality 100% malted barley, giving it a rich sweet taste and an intense fragrance of roasted malt. The amber color that characterizes the beer, comes from the kind of malt used in the recipe (malt is dried, roasted barley). Another key ingredient is hops, the variety used is particularly aromatic, giving a characteristic bitter aftertaste and a delicate fragrance to the beer. The Master Brewers advise a service temperature between 10° and 12°C.",
            rate: 3.5,
            alcohol : 40,
            image : "https://cdn.shopify.com/s/files/1/1968/6329/products/IMG_7789_800x.jpg?v=1567143075",
            comments : [
              commentsArr[3]._id,
              commentsArr[4]._id
            ],
          },
          {
            name : "Estrella Galicia",
            country : "Spain",
            style : "Pale Lager",
            description : "Born in 1972 as “Especial Rivera”, it would soon become Company’s most representative beer.  Brewed by Hijos de Rivera’s Brewmasters in the only Company’s brewery placed in A Coruña. It takes a whole month to be brewed, half of it inside the maturing tanks. Golden color. Clean and bright. Excellent aromatic balance between malts and hops. Lightly floral and herbal flavors, with a moderate warm mouthfeel, and an intense hoppy bitter taste that lingers in the mouth.",
            rate: 4.4,
            alcohol : 40,
            image : "https://res.cloudinary.com/ratebeer/image/upload/e_trim:1/d_beer_img_default.png,f_auto/beer_11325",
            comments : [              
              commentsArr[4]._id,
              commentsArr[5]._id
            ],         
          },
        ]
      )
    })
  })
  .then(beersCreated => {
    console.log(`${beersCreated.length} beers created with the following id:`);
    console.log(beersCreated.map(el => el._id));

    beersArr = beersCreated;
 
    return Bar.deleteMany().then(() => {
      return Bar.insertMany(
        [
          {
            name : "Bar San Calisto",
            location: {"type" : "Point", coordinates : [40.392904, -3.690681]},
            address : "Calle Circonita, 15A 28045 Madrid",
            rate: 4.5,
            images : null,
            comments : [
              commentsArr[0]._id,
              commentsArr[1]._id
            ]
          },
          {
            name : "Mr. Brown Pub",
            location: {"type" : "Point", coordinates : [40.395378, -3.699408]},  
            address : "Calle Aldea del Fresno, 25 28045 Madrid",
            rate: 4.5,
            images : null,
            comments : [
              commentsArr[2]._id,
              commentsArr[7]._id
            ]
          },
        ]
      )
    })
  })
  .then(barsCreated => {
    console.log(`${barsCreated.length} bars created with the following id:`);
    console.log(barsCreated.map(el => el._id));

    return User.updateMany(
      {$set : {favoriteBars: [barsCreated[0]._id, barsCreated[1]._id], favoriteBeers: [beersArr[0]._id, beersArr[1]._id]}}
    )
  })
  .then(updatedUsers => {
    console.log(`Users updated with favorite bars and beers`);
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });

