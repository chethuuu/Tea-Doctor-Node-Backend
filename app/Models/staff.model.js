// Admin.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Admins
let Admin_tea = new Schema(
  {
    username: {
      required: true,
      unique: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },

    type: {
      required: true,

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
    collection: "Admin_tea",
  }
);

module.exports = mongoose.model("Admin_tea", Admin_tea);
