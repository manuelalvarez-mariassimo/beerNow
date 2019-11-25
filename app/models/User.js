const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    favoriteBeers: { type: mongoose.Schema.Types.ObjectId, ref: 'Beers' },
    favoriteBars: { type: mongoose.Schema.Types.ObjectId, ref: 'Bars' },
    picture: { type: String, default: "https://i.ibb.co/gSbgf9K/male-placeholder.jpg" },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
