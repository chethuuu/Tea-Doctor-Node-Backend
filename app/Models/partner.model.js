// partner.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for partners
let partner = new Schema(
  {
    company: {
      required: true,
      type: String,
    },
    // senior , junior , intern etc
    type: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },

    password: {
      required: true,
      type: String,
    },
    mobile: {
      required: true,
      type: String,
    },
    designation: {
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
    collection: "partner",
  }
);

module.exports = mongoose.model("partner", partner);
