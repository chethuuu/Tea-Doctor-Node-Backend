// user.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for users
let user_tea = new Schema(
  {
    address: {
      required: true,
      type: String,
    },
    // senior , junior , intern etc
    type: {
      required: true,
      type: String,
    },
    email: {
      type: String,
    },

    password: {
      required: true,
      type: String,
    },

    mobile: {
      required: true,
      type: String,
      unique: true,
    },
    area_of_plantation: {
      type: String,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "user_tea",
  }
);

module.exports = mongoose.model("user_tea", user_tea);
