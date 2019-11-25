// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
  .connect(`mongodb://localhost/${process.env.DB}`, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

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
]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.catch(err => {
  mongoose.disconnect()
  throw err
})