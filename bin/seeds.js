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
            alcohol : 7.0,
            image : "https://cdn.shopify.com/s/files/1/1968/6329/products/IMG_7789_800x.jpg?v=1567143075",
            comments : [
              commentsArr[3]._id,
              commentsArr[4]._id
            ],
          },
          {
            name : "Peroni  Nastro Azurro",
            country : "Italy",
            style : "Pale Lager",
            description : "Peroni Nastro Azzurro is a crisp and refreshing beer crafted with passion and flair to offer a delicate balance of bitterness and subtle citrus aromatic notes.",
            rate: 4.7,
            alcohol : 5.1,
            image : "https://res.cloudinary.com/ratebeer/image/upload/e_trim:1/d_beer_img_default.png,f_auto/beer_3029",
            comments : [
              commentsArr[3]._id,
              commentsArr[4]._id
            ],
          },
          {
            name : "Dreher",
            country : "Italy",
            style : "Light Pale Lager",
            description : "Good clearness, golden color, little white head but taste is watery..little bitter,  metallic and cardboard hints. Nothing that could get even close to a lager",
            rate: 2.5,
            alcohol : 4.7,
            image : "https://i.pinimg.com/originals/4c/ab/85/4cab8536538d2cbb81f87a97f1662b40.jpg",
            comments : [
              commentsArr[3]._id,
              commentsArr[4]._id
            ],
          },
          {
            name : "Forst Sixtus",
            country : "Italy",
            style : "Bock - DoppelBock",
            description : "The famous, highly popular strong Forst Beer. The special malts used and the specific production process help to create its unique caramel flavour. It is immensely, unforgettably satisfying from the first sip. Its dark colour and delicate hoppy notes evoke memories of the original strong beers and the traditional art of beer making in monasteries. Suggested serving temperature 7°C.",
            rate: 4.5,
            alcohol : 6.5,
            image : "https://www.wine-searcher.com/images/labels/65/16/10616516.jpg",
            comments : [
              commentsArr[2]._id,
              commentsArr[4]._id
            ],
          },
          {
            name : "Poretti 4 Luppoli Originale",
            country : "Italy",
            style : "Pale Lager",
            description : "4 Luppoli Originale (Original beer with 4 hops varieties) is a low fermentation lager with a particularly harmonious flavour. Fruity aromatic notes sweeten its moderately bitter taste.",
            rate: 4.2,
            alcohol : 5.5,
            image : "https://cdn.shopify.com/s/files/1/1968/6329/products/IMG_7789_800x.jpg?v=1567143075",
            comments : [
              commentsArr[3]._id,
              commentsArr[4]._id
            ],
          },
          {
            name : "Menabrea Bionda",
            country : "Italy",
            style : "Pale Lager",
            description : "Menabrea is matured gently in the perfect temperature of our cave cellars for a taste of superior clarity. This 4.8% ABV pale lager is well balanced between citrus, bitter tones and floral, fruity undertones giving a consistent and refined flavour. It has a complicated malty, hoppy taste with an exceptional head retention due to the quality of our ingredients and maturation process.",
            rate: 3.5,
            alcohol : 4.8,
            image : "https://cdn.shopify.com/s/files/1/1968/6329/products/IMG_7790_800x.jpg?v=1558759315",
            comments : [
              commentsArr[3]._id,
              commentsArr[4]._id
            ],
          },
          // Spanish beers
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
          {
            name : "San Miguel",
            country : "Spain",
            style : "Light Pale Lager",
            description : "Clear golden appearance with thick frothy white head. Strong aroma of typical lager. Quite a sweet taste.",
            rate: 2.13,
            alcohol : 4.8,
            image : "https://birrapedia.com/img/modulos/cerveza/75f/san-miguel-especial_15114329045921_t.jpg",
            comments : [              
              commentsArr[1]._id,
              commentsArr[5]._id
            ],         
          },
          {
            name : "Heineken",
            country : "Spain",
            style : "Lager - Euro Pale",
            description : "Born in 1972 as “Especial Rivera”, it would soon become Company’s most representative beer.  Brewed by Hijos de Rivera’s Brewmasters in the only Company’s brewery placed in A Coruña. It takes a whole month to be brewed, half of it inside the maturing tanks. Golden color. Clean and bright. Excellent aromatic balance between malts and hops. Lightly floral and herbal flavors, with a moderate warm mouthfeel, and an intense hoppy bitter taste that lingers in the mouth.",
            rate: 3,
            alcohol : 4.3,
            image : "Heineken is a 5% ABV euro pale lager, made by Heineken International since 1873. It is available in a 4.3% alcohol by volume, in countries such as Ireland. It is the flagship product of the company and is made of purified water, malted barley, hops, and yeast.",
            comments : [              
              commentsArr[4]._id,
              commentsArr[5]._id
            ],         
          },
          {
            name : "Mahou Cinco Estrellas",
            country : "Spain",
            style : "Lager- Pale",
            description : " Las mejores variedades de lúpulo y levadura se concentran en Mahou Cinco Estrellas. Una cerveza dorada, de espuma cremosa y consistente, con un sabor característico, moderado y fino, de aroma afrutado.",
            rate: 4.4,
            alcohol : 40,
            image : "https://www.encopadebalon.com/3548-large_default/cerveza-mahou-5-estrellas-pack-24-botellines.jpg",
            comments : [              
              commentsArr[4]._id,
              commentsArr[5]._id
            ],         
          },
          {
            name : "Estrella Levante",
            country : "Spain",
            style : "Pilsen Lager",
            description : " Se recomiendo el consumo en cañas cortas y a una temperatura de entre 4º y 6ºC. Se comercializa en botella de 20cl, 25cl, 33cl, 100cl y barril. Su ESP es de 11,6%.",
            rate: 5.0,
            alcohol : 4.8,
            image : "http://www.estrelladelevante.es/wp-content/uploads/2013/05/TClasic.png",
            comments : [              
              commentsArr[4]._id,
              commentsArr[5]._id
            ],         
          },
          {
            name : "Alhambra 1925",
            country : "Spain",
            style : "Pale Lager",
            description : "Reserved for the most demanding palate. Alhambra Reserva 1925 is a high quality beer crafted to perfection. With its deep, exquisite taste and exclusive masterpiece in bottle design.",
            rate: 4.6,
            alcohol : 6.4,
            image : "https://www.encopadebalon.com/3542-thickbox_default/cerveza-alhambra-reserva-1925-pack-24-botellas.jpg",
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
 
    return Bar.deleteMany()
    .then(() => {
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

