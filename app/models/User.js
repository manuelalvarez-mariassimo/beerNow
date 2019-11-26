const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    picture: { type: String, default: "https://i.ibb.co/gSbgf9K/male-placeholder.jpg" },
    favoriteBars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bar' }],
    favoriteBeers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Beer' }]
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
